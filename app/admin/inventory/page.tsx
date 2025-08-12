"use client"

import type React from "react"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin-layout"
import { Search, Download, Plus, Filter } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ProductCard } from "@/components/product-card"

// Sample product data
const sampleProducts = [
  {
    id: "1",
    description: "Aluminum Compression Terminal - 70mm²",
    itemCode: "85369090",
    modelNumber: "AL70-10",
    brand: "Burndy",
    type: "Aluminum Compression Terminals",
    quantity: 250,
    prices: {
      tier2Price: "95",
      crpEndPrice: "105",
      customerPrice: "120",
    },
    status: "In Stock",
    createdAt: "2023-12-15T10:30:00Z",
    updatedAt: "2023-12-15T10:30:00Z",
    image: "/images/parts/aluminum-terminal-70mm.png",
  },
  {
    id: "2",
    description: "Copper Compression Terminal - 50mm²",
    itemCode: "85369090",
    modelNumber: "CU50-8",
    brand: "Thomas & Betts",
    type: "Copper Compression Terminals",
    quantity: 320,
    prices: {
      tier2Price: "180",
      crpEndPrice: "195",
      customerPrice: "210",
    },
    status: "In Stock",
    createdAt: "2023-12-05T14:20:00Z",
    updatedAt: "2023-12-05T14:20:00Z",
    image: "/images/parts/copper-terminal-50mm.png",
  },
  {
    id: "3",
    description: "Insulated Ring Terminal - Red",
    itemCode: "85366990",
    modelNumber: "IRR-2.5",
    brand: "Panduit",
    type: "Small Terminals",
    quantity: 1200,
    prices: {
      tier2Price: "6",
      crpEndPrice: "7",
      customerPrice: "8",
    },
    status: "In Stock",
    createdAt: "2023-12-10T09:15:00Z",
    updatedAt: "2023-12-10T09:15:00Z",
    image: "/images/parts/insulated-ring-red.png",
  },
  {
    id: "4",
    description: "Mechanical Bolted Connector - T-Type",
    itemCode: "85369090",
    modelNumber: "MBT-150",
    brand: "Hubbell",
    type: "Mechanical Bolted Connectors",
    quantity: 85,
    prices: {
      tier2Price: "320",
      crpEndPrice: "335",
      customerPrice: "350",
    },
    status: "In Stock",
    createdAt: "2023-12-01T11:45:00Z",
    updatedAt: "2023-12-01T11:45:00Z",
    image: "/images/parts/mechanical-t-connector.jpg",
  },
  {
    id: "5",
    description: "Wedge Clamp Connector - 50-150mm²",
    itemCode: "85369090",
    modelNumber: "WC-50-150",
    brand: "Burndy",
    type: "C-Wedge Connectors",
    quantity: 120,
    prices: {
      tier2Price: "250",
      crpEndPrice: "265",
      customerPrice: "280",
    },
    status: "In Stock",
    createdAt: "2023-11-20T16:30:00Z",
    updatedAt: "2023-11-20T16:30:00Z",
    image: null, // Changed from empty string to null
  },
  {
    id: "6",
    description: "Hydraulic Crimping Tool - 16-300mm²",
    itemCode: "84672900",
    modelNumber: "HCT-300",
    brand: "Molex",
    type: "Hydraulic Tools",
    quantity: 8,
    prices: {
      tier2Price: "11500",
      crpEndPrice: "12000",
      customerPrice: "12500",
    },
    status: "In Stock",
    createdAt: "2023-10-25T13:10:00Z",
    updatedAt: "2023-10-25T13:10:00Z",
    image: "/hydraulic-crimper-close-up.png",
  },
]

export default function AdminInventoryPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    status: "",
  })

  // Filter products when search query or filters change
  useEffect(() => {
    let results = [...sampleProducts]

    // Apply text search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase()
      results = results.filter(
        (product) =>
          product.description.toLowerCase().includes(lowerQuery) ||
          product.modelNumber.toLowerCase().includes(lowerQuery) ||
          product.brand.toLowerCase().includes(lowerQuery) ||
          product.type.toLowerCase().includes(lowerQuery),
      )
    }

    // Apply category filter
    if (filters.category) {
      results = results.filter((product) => product.type === filters.category)
    }

    // Apply brand filter
    if (filters.brand) {
      results = results.filter((product) => product.brand === filters.brand)
    }

    // Apply status filter
    if (filters.status) {
      results = results.filter((product) => product.status === filters.status)
    }

    setFilteredProducts(results)
  }, [searchQuery, filters])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already handled by the useEffect
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const resetFilters = () => {
    setFilters({
      category: "",
      brand: "",
      status: "",
    })
    setSearchQuery("")
  }

  const handleExport = () => {
    // Create CSV content
    const headers = ["Description", "Model", "Brand", "Type", "Quantity", "Price", "Status"]
    const csvContent = [
      headers.join(","),
      ...filteredProducts.map((product) =>
        [
          `"${product.description}"`,
          `"${product.modelNumber}"`,
          `"${product.brand}"`,
          `"${product.type}"`,
          product.quantity,
          product.prices.customerPrice,
          `"${product.status}"`,
        ].join(","),
      ),
    ].join("\n")

    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `inventory-export-${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Get unique brands and categories for filters
  const uniqueBrands = Array.from(new Set(sampleProducts.map((product) => product.brand)))
  const uniqueCategories = Array.from(new Set(sampleProducts.map((product) => product.type)))

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <Link
            href="/admin/inventory/new"
            className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
            <form onSubmit={handleSearch} className="relative flex-1">
              <input
                type="text"
                placeholder="Search inventory..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </form>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border rounded-md flex items-center gap-2 hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 border rounded-md flex items-center gap-2 hover:bg-gray-50"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="p-4 border-b bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option value="">All Categories</option>
                    {uniqueCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <select
                    id="brand"
                    name="brand"
                    value={filters.brand}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option value="">All Brands</option>
                    {uniqueBrands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option value="">All Statuses</option>
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button onClick={resetFilters} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
            <button onClick={resetFilters} className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              // Sanitize the image property to ensure it's never an empty string
              const sanitizedProduct = {
                ...product,
                // If image is empty string or only whitespace, set to null
                image:
                  product.image && typeof product.image === "string" && product.image.trim() !== ""
                    ? product.image
                    : null,
              }

              return <ProductCard key={product.id} product={sanitizedProduct} href={`/admin/inventory/${product.id}`} />
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
