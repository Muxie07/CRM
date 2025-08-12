"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/providers"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Plus, Search, Filter } from "lucide-react"
import Link from "next/link"
import PartCard from "@/components/part-card"
import { parts } from "@/data/parts"
import type { Part } from "@/types/part"

export default function PartsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [allParts, setAllParts] = useState<Part[]>([])
  const [filteredParts, setFilteredParts] = useState<Part[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    color: "",
    priceRange: "",
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else {
      // Load parts data
      setAllParts(parts)
      setFilteredParts(parts)
    }
  }, [user, isLoading, router])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    filterParts(searchQuery, filters)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    const newFilters = { ...filters, [name]: value }
    setFilters(newFilters)
    filterParts(searchQuery, newFilters)
  }

  const filterParts = (query: string, filterCriteria: typeof filters) => {
    let results = [...allParts]

    // Apply text search
    if (query) {
      const lowerQuery = query.toLowerCase()
      results = results.filter(
        (part) =>
          part.name.toLowerCase().includes(lowerQuery) ||
          part.partNumber.toLowerCase().includes(lowerQuery) ||
          part.type?.toLowerCase().includes(lowerQuery) ||
          part.uses?.some((use) => use.toLowerCase().includes(lowerQuery)),
      )
    }

    // Apply type filter
    if (filterCriteria.type) {
      results = results.filter((part) => part.type === filterCriteria.type)
    }

    // Apply status filter
    if (filterCriteria.status) {
      results = results.filter((part) => part.status === filterCriteria.status)
    }

    // Apply color filter
    if (filterCriteria.color) {
      results = results.filter((part) => part.color === filterCriteria.color)
    }

    // Apply price range filter
    if (filterCriteria.priceRange) {
      switch (filterCriteria.priceRange) {
        case "under100":
          results = results.filter((part) => part.price < 100)
          break
        case "100-200":
          results = results.filter((part) => part.price >= 100 && part.price <= 200)
          break
        case "200-300":
          results = results.filter((part) => part.price > 200 && part.price <= 300)
          break
        case "above300":
          results = results.filter((part) => part.price > 300)
          break
      }
    }

    setFilteredParts(results)
  }

  const resetFilters = () => {
    setFilters({
      type: "",
      status: "",
      color: "",
      priceRange: "",
    })
    setSearchQuery("")
    setFilteredParts(allParts)
  }

  const handleDeletePart = (partId: number | string) => {
    // In a real app, this would call an API to delete the part
    const updatedParts = allParts.filter((part) => part.id !== partId)
    setAllParts(updatedParts)
    setFilteredParts(filteredParts.filter((part) => part.id !== partId))
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  // Get unique types, colors for filter dropdowns
  const types = Array.from(new Set(allParts.map((part) => part.type))).filter(Boolean) as string[]
  const colors = Array.from(new Set(allParts.map((part) => part.color))).filter(Boolean) as string[]
  const statuses = ["In Stock", "Low Stock", "Out of Stock"]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow px-4 py-8 sm:py-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Electrical Components</h1>
            <p className="text-gray-600 text-sm">Manage your electrical terminals and connectors inventory</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <form onSubmit={handleSearch} className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </button>
            </form>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filters</span>
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                >
                  <option value="">All Types</option>
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                >
                  <option value="">All Statuses</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <select
                  id="color"
                  name="color"
                  value={filters.color}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                >
                  <option value="">All Colors</option>
                  {colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <select
                  id="priceRange"
                  name="priceRange"
                  value={filters.priceRange}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                >
                  <option value="">All Prices</option>
                  <option value="under100">Under ₹100</option>
                  <option value="100-200">₹100 - ₹200</option>
                  <option value="200-300">₹200 - ₹300</option>
                  <option value="above300">Above ₹300</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-6">
          <Link
            href="/parts/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add New Component
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No components found. Try adjusting your search or filters.</p>
            </div>
          ) : (
            filteredParts.map((part) => <PartCard key={part.id} part={part} onDelete={handleDeletePart} />)
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
