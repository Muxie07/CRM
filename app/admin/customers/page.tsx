"use client"

import type React from "react"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Search, Download, Plus, Edit, Trash2, MoreHorizontal, Filter } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock data for customers
const customersData = [
  {
    id: "1",
    name: "Rajesh Kumar",
    phone: "9876543210",
    email: "rajesh@example.com",
    vehicle: "TVS Apache RTR 160",
    lastService: "2023-04-10",
    nextService: "2023-07-10",
    status: "Active",
  },
  {
    id: "2",
    name: "Priya Sharma",
    phone: "9876543211",
    email: "priya@example.com",
    vehicle: "TVS Jupiter",
    lastService: "2023-05-15",
    nextService: "2023-08-15",
    status: "Active",
  },
  {
    id: "3",
    name: "Vikram Singh",
    phone: "9876543212",
    email: "vikram@example.com",
    vehicle: "TVS Ntorq",
    lastService: "2023-06-05",
    nextService: "2023-09-05",
    status: "Active",
  },
  {
    id: "4",
    name: "Ananya Desai",
    phone: "9876543213",
    email: "ananya@example.com",
    vehicle: "TVS Apache RTR 160",
    lastService: "2023-07-01",
    nextService: "2023-10-01",
    status: "Inactive",
  },
  {
    id: "5",
    name: "Rahul Sharma",
    phone: "9876543214",
    email: "rahul@example.com",
    vehicle: "TVS Jupiter",
    lastService: "2023-08-10",
    nextService: "2023-11-10",
    status: "Active",
  },
]

export default function AdminCustomersPage() {
  const router = useRouter()
  const [customers, setCustomers] = useState(customersData)
  const [searchQuery, setSearchQuery] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Filter customers based on search query
    const filteredCustomers = customersData.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery) ||
        customer.email.toLowerCase().includes(searchQuery) ||
        customer.vehicle.toLowerCase().includes(searchQuery),
    )
    setCustomers(filteredCustomers)
  }

  const handleExport = () => {
    // Create CSV content
    const headers = ["ID", "Name", "Phone", "Email", "Vehicle", "Last Service", "Next Service", "Status"]
    const csvContent = [
      headers.join(","),
      ...customers.map((customer) =>
        [
          customer.id,
          customer.name,
          customer.phone,
          customer.email,
          customer.vehicle,
          customer.lastService,
          customer.nextService,
          customer.status,
        ].join(","),
      ),
    ].join("\n")

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "customers.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDeleteClick = (customerId: string) => {
    setCustomerToDelete(customerId)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = () => {
    if (customerToDelete) {
      setCustomers(customers.filter((customer) => customer.id !== customerToDelete))
      setShowDeleteModal(false)
      setCustomerToDelete(null)
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Customer Management</h1>
          <Link
            href="/customers/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Customer
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
            <form onSubmit={handleSearch} className="relative flex-1">
              <input
                type="text"
                placeholder="Search customers..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </form>
            <div className="flex gap-2">
              <button
                onClick={() => router.push("/admin/customers/filter")}
                className="px-4 py-2 border rounded-md flex items-center gap-2 hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                Filter
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

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Next Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                          {customer.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{customer.phone}</div>
                      <div className="text-sm text-gray-500">{customer.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{customer.vehicle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(customer.lastService).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(customer.nextService).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          customer.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => router.push(`/admin/customers/${customer.id}`)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(customer.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{customers.length}</span> of{" "}
              <span className="font-medium">{customersData.length}</span> customers
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded-md text-sm disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border rounded-md text-sm bg-black text-white">1</button>
              <button className="px-3 py-1 border rounded-md text-sm">2</button>
              <button className="px-3 py-1 border rounded-md text-sm">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this customer? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
