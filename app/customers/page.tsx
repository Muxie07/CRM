"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/providers"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Plus, Search, Filter, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function CustomersPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [customers, setCustomers] = useState([])
  const [filteredCustomers, setFilteredCustomers] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    itemType: "",
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else {
      // Simplified customer data structure with only essential fields
      const customersData = [
        {
          id: 1,
          name: "Rajesh Kumar",
          phone: "9876543210",
          email: "rajesh@example.com",
          address: "123 Main St, Chennai",
          itemType: "Aluminum Terminal",
        },
        {
          id: 2,
          name: "Priya Sharma",
          phone: "9876543211",
          email: "priya@example.com",
          address: "456 Park Ave, Chennai",
          itemType: "Copper Terminal",
        },
      ]
      setCustomers(customersData)
      setFilteredCustomers(customersData)
    }
  }, [user, isLoading, router])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    filterCustomers(searchQuery, filters)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    const newFilters = { ...filters, [name]: value }
    setFilters(newFilters)
    filterCustomers(searchQuery, newFilters)
  }

  const filterCustomers = (query: string, filterCriteria: typeof filters) => {
    let results = [...customers]

    // Apply text search
    if (query) {
      const lowerQuery = query.toLowerCase()
      results = results.filter(
        (customer: any) =>
          customer.name.toLowerCase().includes(lowerQuery) ||
          customer.phone.includes(lowerQuery) ||
          customer.email.toLowerCase().includes(lowerQuery) ||
          customer.itemType.toLowerCase().includes(lowerQuery),
      )
    }

    // Apply filters
    if (filterCriteria.itemType) {
      results = results.filter((customer: any) => customer.itemType.includes(filterCriteria.itemType))
    }

    setFilteredCustomers(results)
  }

  const resetFilters = () => {
    setFilters({
      itemType: "",
    })
    setSearchQuery("")
    setFilteredCustomers(customers)
  }

  const handleDeleteCustomer = (customerId: number) => {
    // In a real app, this would call an API to delete the customer
    const updatedCustomers = customers.filter((customer: any) => customer.id !== customerId)
    setCustomers(updatedCustomers)
    setFilteredCustomers(
      updatedCustomers.filter((customer: any) => filteredCustomers.some((c: any) => c.id === customer.id)),
    )
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  // Get unique vehicle types for filter dropdown
  const vehicleTypes = Array.from(new Set(customers.map((customer: any) => customer.vehicleType)))

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow px-4 py-8 sm:py-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Customers</h1>
            <p className="text-gray-600 text-sm">Manage your customer database</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <form onSubmit={handleSearch} className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search customers..."
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
                <label htmlFor="itemType" className="block text-sm font-medium text-gray-700 mb-1">
                  Item Type
                </label>
                <select
                  id="itemType"
                  name="itemType"
                  value={filters.itemType}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                >
                  <option value="">All Items</option>
                  <option value="Aluminum Terminal">Aluminum Terminal</option>
                  <option value="Copper Terminal">Copper Terminal</option>
                  <option value="Mechanical Connector">Mechanical Connector</option>
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
            href="/customers/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add New Customer
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Customer
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                  >
                    Contact
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                  >
                    Item
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                      No customers found. Try adjusting your search or filters.
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer: any) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 font-medium">
                              {customer.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{customer.address}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                        <div className="text-sm text-gray-900">{customer.phone}</div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <div className="text-sm text-gray-900">{customer.itemType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-3 justify-end">
                          <Link
                            href={`/customers/${customer.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="View customer"
                          >
                            View
                          </Link>
                          <Link
                            href={`/customers/${customer.id}/edit`}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit customer"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteCustomer(customer.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete customer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
