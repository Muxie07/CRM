"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/providers"
import AdminLayout from "@/components/admin-layout"
import { LinkIcon, PenToolIcon as Tool, Plus, Search, Filter } from "lucide-react"
import Link from "next/link"
import { InventoryCategoryCard } from "@/components/inventory-category-card"

export default function InventoryManagementPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: "",
    stockStatus: "",
  })

  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const resetFilters = () => {
    setFilters({
      category: "",
      stockStatus: "",
    })
    setSearchQuery("")
  }

  if (isLoading || !user || !user.isAdmin) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Inventory Management</h1>
            <p className="text-gray-600 text-xs sm:text-sm">Manage all product categories and inventory</p>
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
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                >
                  <option value="">All Categories</option>
                  <option value="electrical-terminals">Electrical Terminal Lugs / Power Connectors</option>
                  <option value="overhead-connectors">Overhead Distribution Connectors</option>
                  <option value="tools">Mechanical & Powered Tools</option>
                  <option value="grounding-connectors">Grounding Connectors</option>
                  <option value="networking">Networking</option>
                  <option value="unified-communication">Unified Communication</option>
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="stockStatus" className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Status
                </label>
                <select
                  id="stockStatus"
                  name="stockStatus"
                  value={filters.stockStatus}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                >
                  <option value="">All Statuses</option>
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
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
            href="/admin/inventory/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </Link>
        </div>

        {/* Inventory Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <InventoryCategoryCard
            title="ELECTRICAL TERMINAL LUGS / POWER CONNECTORS"
            href="/admin/inventory/electrical-terminals"
            icon={<LinkIcon className="w-5 h-5" />}
            count={247}
            growth={12}
            inStock={180}
            lowStock={42}
            outOfStock={25}
            color="red"
          />

          <InventoryCategoryCard
            title="OVERHEAD DISTRIBUTION CONNECTORS"
            href="/admin/inventory/overhead-connectors"
            icon={<LinkIcon className="w-5 h-5" />}
            count={183}
            growth={8}
            inStock={120}
            lowStock={38}
            outOfStock={25}
            color="blue"
          />

          <InventoryCategoryCard
            title="MECHANICAL & POWERED TOOLS"
            href="/admin/inventory/tools"
            icon={<Tool className="w-5 h-5" />}
            count={156}
            growth={15}
            inStock={98}
            lowStock={32}
            outOfStock={26}
            color="purple"
          />

          <InventoryCategoryCard
            title="GROUNDING CONNECTORS"
            href="/admin/inventory/grounding-connectors"
            icon={<LinkIcon className="w-5 h-5" />}
            count={128}
            growth={10}
            inStock={85}
            lowStock={28}
            outOfStock={15}
            color="green"
          />

          <InventoryCategoryCard
            title="NETWORKING"
            href="/admin/inventory/networking"
            icon={<LinkIcon className="w-5 h-5" />}
            count={215}
            growth={18}
            inStock={165}
            lowStock={35}
            outOfStock={15}
            color="orange"
          />

          <InventoryCategoryCard
            title="UNIFIED COMMUNICATION"
            href="/admin/inventory/unified-communication"
            icon={<LinkIcon className="w-5 h-5" />}
            count={92}
            growth={22}
            inStock={68}
            lowStock={15}
            outOfStock={9}
            color="teal"
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold mb-4">Recent Inventory Activity</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    Aluminum Terminal 240mm
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Electrical Terminal Lugs</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">Stock Added (+50)</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Rahul Sharma</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {new Date().toLocaleDateString()}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    Fiber Optic Cable 100m
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Networking</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600">Stock Removed (-5)</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Priya Patel</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {new Date(Date.now() - 86400000).toLocaleDateString()}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    Hydraulic Crimping Tool
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Mechanical & Powered Tools</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600">Updated Price</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Arjun Mehta</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {new Date(Date.now() - 172800000).toLocaleDateString()}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">IP Phone System</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Unified Communication</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-purple-600">New Product Added</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Neha Gupta</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {new Date(Date.now() - 259200000).toLocaleDateString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
