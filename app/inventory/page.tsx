"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/providers"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Plus, Search, Filter, Edit, Trash2, Tag, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function InventoryPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [vehicles, setVehicles] = useState([])
  const [filteredVehicles, setFilteredVehicles] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    vehicleType: "",
    status: "",
    priceRange: "",
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else {
      // Fetch inventory data
      const inventoryData = [
        {
          id: 1,
          model: "Aluminum Terminal 240mm",
          type: "Electrical Terminal Lugs",
          color: "Silver",
          engineCapacity: "N/A",
          price: 450,
          status: "In Stock",
          quantity: 180,
          image: "/images/parts/aluminum-terminal-240mm.jpg",
          lastUpdated: "2023-05-15",
        },
        {
          id: 2,
          model: "Copper Terminal 95mm",
          type: "Copper Compression Terminals",
          color: "Copper",
          engineCapacity: "N/A",
          price: 380,
          status: "In Stock",
          quantity: 120,
          image: "/images/parts/copper-terminal-95mm.png",
          lastUpdated: "2023-05-16",
        },
        {
          id: 3,
          model: "Insulated Ring Terminal (Red)",
          type: "Small Terminals",
          color: "Red",
          engineCapacity: "N/A",
          price: 25,
          status: "In Stock",
          quantity: 500,
          image: "/images/parts/insulated-ring-red.png",
          lastUpdated: "2023-05-17",
        },
        {
          id: 4,
          model: "Mechanical T-Connector",
          type: "Mechanical Bolted Connectors",
          color: "Silver",
          engineCapacity: "N/A",
          price: 650,
          status: "Low Stock",
          quantity: 15,
          image: "/images/parts/mechanical-t-connector.jpg",
          lastUpdated: "2023-05-18",
        },
        {
          id: 5,
          model: "Overhead Line Connector",
          type: "Overhead Distribution Connectors",
          color: "Gray",
          engineCapacity: "N/A",
          price: 850,
          status: "Out of Stock",
          quantity: 0,
          image: "/overhead-line-connector-close-up.png",
          lastUpdated: "2023-05-19",
        },
        {
          id: 6,
          model: "Hydraulic Crimping Tool",
          type: "Mechanical & Powered Tools",
          color: "Yellow/Black",
          engineCapacity: "N/A",
          price: 12500,
          status: "In Stock",
          quantity: 8,
          image: "/hydraulic-crimper-close-up.png",
          lastUpdated: "2023-05-20",
        },
      ]
      setVehicles(inventoryData)
      setFilteredVehicles(inventoryData)
    }
  }, [user, isLoading, router])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    filterVehicles(searchQuery, filters)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    const newFilters = { ...filters, [name]: value }
    setFilters(newFilters)
    filterVehicles(searchQuery, newFilters)
  }

  const filterVehicles = (query: string, filterCriteria: typeof filters) => {
    let results = [...vehicles]

    // Apply text search
    if (query) {
      const lowerQuery = query.toLowerCase()
      results = results.filter(
        (vehicle: any) =>
          vehicle.model.toLowerCase().includes(lowerQuery) ||
          vehicle.type.toLowerCase().includes(lowerQuery) ||
          vehicle.color.toLowerCase().includes(lowerQuery),
      )
    }

    // Apply filters
    if (filterCriteria.vehicleType) {
      results = results.filter((vehicle: any) => vehicle.type === filterCriteria.vehicleType)
    }
    if (filterCriteria.status) {
      results = results.filter((vehicle: any) => vehicle.status === filterCriteria.status)
    }
    if (filterCriteria.priceRange) {
      switch (filterCriteria.priceRange) {
        case "under100":
          results = results.filter((vehicle: any) => vehicle.price < 100)
          break
        case "100-500":
          results = results.filter((vehicle: any) => vehicle.price >= 100 && vehicle.price <= 500)
          break
        case "500-1000":
          results = results.filter((vehicle: any) => vehicle.price > 500 && vehicle.price <= 1000)
          break
        case "above1000":
          results = results.filter((vehicle: any) => vehicle.price > 1000)
          break
      }
    }

    setFilteredVehicles(results)
  }

  const resetFilters = () => {
    setFilters({
      vehicleType: "",
      status: "",
      priceRange: "",
    })
    setSearchQuery("")
    setFilteredVehicles(vehicles)
  }

  const handleDeleteVehicle = (vehicleId: number) => {
    // In a real app, this would call an API to delete the vehicle
    const updatedVehicles = vehicles.filter((vehicle: any) => vehicle.id !== vehicleId)
    setVehicles(updatedVehicles)
    setFilteredVehicles(
      updatedVehicles.filter((vehicle: any) => filteredVehicles.some((v: any) => v.id === vehicle.id)),
    )
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow px-4 py-8 sm:py-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Inventory</h1>
            <p className="text-gray-600 text-sm">Manage your vehicle inventory</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <form onSubmit={handleSearch} className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search inventory..."
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
                <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Type
                </label>
                <select
                  id="vehicleType"
                  name="vehicleType"
                  value={filters.vehicleType}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                >
                  <option value="">All Types</option>
                  <option value="Electrical Terminal Lugs">Electrical Terminal Lugs</option>
                  <option value="Copper Compression Terminals">Copper Compression Terminals</option>
                  <option value="Small Terminals">Small Terminals</option>
                  <option value="Mechanical Bolted Connectors">Mechanical Bolted Connectors</option>
                  <option value="Overhead Distribution Connectors">Overhead Distribution Connectors</option>
                  <option value="Mechanical & Powered Tools">Mechanical & Powered Tools</option>
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
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
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
                  <option value="100-500">₹100 - ₹500</option>
                  <option value="500-1000">₹500 - ₹1,000</option>
                  <option value="above1000">Above ₹1,000</option>
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
            href="/inventory/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add New Vehicle
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No vehicles found. Try adjusting your search or filters.</p>
            </div>
          ) : (
            filteredVehicles.map((vehicle: any) => (
              <div key={vehicle.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={
                      vehicle.image ||
                      `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(vehicle.model)}`
                    }
                    alt={vehicle.model}
                    fill
                    className="object-cover"
                  />
                  <div
                    className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full ${
                      vehicle.status === "In Stock"
                        ? "bg-green-100 text-green-800"
                        : vehicle.status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {vehicle.status}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{vehicle.model}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <Tag className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-700">
                        ₹{vehicle.price.toLocaleString()} | {vehicle.color}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-700">
                        {vehicle.engineCapacity} | {vehicle.type}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-700">
                        Updated: {new Date(vehicle.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">
                      Quantity: <span className="font-bold">{vehicle.quantity}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        href={`/inventory/${vehicle.id}/edit`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteVehicle(vehicle.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
