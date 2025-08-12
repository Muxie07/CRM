"use client"

import type React from "react"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Search, Download, Plus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { clients } from "@/data/clients"
import { ClientCard } from "@/components/client-card"

export default function AdminClientsPage() {
  const router = useRouter()
  const [filteredClients, setFilteredClients] = useState(clients)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    filterClients(searchQuery, categoryFilter)
  }

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category)
    filterClients(searchQuery, category)
  }

  const filterClients = (query: string, category: string) => {
    let results = [...clients]

    // Apply text search
    if (query) {
      const lowerQuery = query.toLowerCase()
      results = results.filter(
        (client) =>
          client.companyName.toLowerCase().includes(lowerQuery) ||
          client.contactPerson.toLowerCase().includes(lowerQuery) ||
          client.city.toLowerCase().includes(lowerQuery) ||
          client.state.toLowerCase().includes(lowerQuery) ||
          client.gstNumber.toLowerCase().includes(lowerQuery),
      )
    }

    // Apply category filter
    if (category !== "all") {
      results = results.filter((client) => client.category === category)
    }

    setFilteredClients(results)
  }

  const handleExport = () => {
    // Create CSV content
    const headers = [
      "Company Name",
      "Contact Person",
      "Contact Number",
      "Email",
      "City",
      "State",
      "GST Number",
      "Category",
    ]
    const csvContent = [
      headers.join(","),
      ...filteredClients.map((client) =>
        [
          client.companyName,
          client.contactPerson,
          client.contactNumber,
          client.contactEmail,
          client.city,
          client.state,
          client.gstNumber,
          client.category,
        ].join(","),
      ),
    ].join("\n")

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "clients.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Client Management</h1>
          <Link
            href="/admin/clients/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Client
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
            <form onSubmit={handleSearch} className="relative flex-1">
              <input
                type="text"
                placeholder="Search clients..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </form>
            <div className="flex gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="all">All Locations</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Other States">Other States</option>
              </select>
              <button
                onClick={handleExport}
                className="px-4 py-2 border rounded-md flex items-center gap-2 hover:bg-gray-50"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm">
            <div className="space-y-4">
              {filteredClients.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-100">
                  <p className="text-gray-500">No clients found. Try adjusting your search or filters.</p>
                </div>
              ) : (
                filteredClients.map((client, index) => (
                  <div
                    key={client.id}
                    className={`transition-all duration-300 hover:translate-x-1 hover:shadow-md ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } p-4 rounded-lg border-l-4 ${
                      client.category === "Tamil Nadu" ? "border-l-blue-500" : "border-l-amber-500"
                    } shadow-sm`}
                  >
                    <ClientCard key={client.id} client={client} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
