"use client"

import type React from "react"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Search, Download, Plus, Edit, MoreHorizontal, Filter, FileText } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock data for sales
const salesData = [
  {
    id: "1",
    customerName: "Reliance Industries",
    phone: "9876543210",
    productDetails: "Aluminum Terminals 240mm (50 units)",
    date: "2023-05-15",
    amount: 119000,
    paymentMethod: "Bank Transfer",
    salesperson: "Vikram Mehta",
    status: "Completed",
  },
  {
    id: "2",
    customerName: "Tata Power",
    phone: "9876543211",
    productDetails: "Copper Terminals 95mm (100 units)",
    date: "2023-05-16",
    amount: 75000,
    paymentMethod: "Cheque",
    salesperson: "Anita Desai",
    status: "Completed",
  },
  {
    id: "3",
    customerName: "Adani Electricity",
    phone: "9876543212",
    productDetails: "Mechanical Connectors (75 units)",
    date: "2023-05-17",
    amount: 89000,
    paymentMethod: "Bank Transfer",
    salesperson: "Vikram Mehta",
    status: "Pending",
  },
  {
    id: "4",
    customerName: "NTPC Limited",
    phone: "9876543213",
    productDetails: "Insulated Ring Terminals (200 units)",
    date: "2023-05-18",
    amount: 139000,
    paymentMethod: "Bank Transfer",
    salesperson: "Rahul Verma",
    status: "Completed",
  },
  {
    id: "5",
    customerName: "Larsen & Toubro",
    phone: "9876543214",
    productDetails: "Grounding Connectors (50 units)",
    date: "2023-05-19",
    amount: 75000,
    paymentMethod: "Cheque",
    salesperson: "Anita Desai",
    status: "Pending",
  },
]

export default function AdminSalesPage() {
  const router = useRouter()
  const [sales, setSales] = useState(salesData)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Filter sales based on search query
    const filteredSales = salesData.filter(
      (sale) =>
        sale.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sale.phone.includes(searchQuery) ||
        sale.productDetails.toLowerCase().includes(searchQuery) ||
        sale.salesperson.toLowerCase().includes(searchQuery),
    )
    setSales(filteredSales)
  }

  const handleExport = () => {
    // Create CSV content
    const headers = ["ID", "Customer", "Phone", "Products", "Date", "Amount", "Payment Method", "Salesperson", "Status"]
    const csvContent = [
      headers.join(","),
      ...sales.map((sale) =>
        [
          sale.id,
          sale.customerName,
          sale.phone,
          sale.productDetails,
          sale.date,
          sale.amount,
          sale.paymentMethod,
          sale.salesperson,
          sale.status,
        ].join(","),
      ),
    ].join("\n")

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "sales.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filterSalesByTab = (tab: string) => {
    setActiveTab(tab)
    if (tab === "all") {
      setSales(salesData)
    } else {
      setSales(salesData.filter((sale) => sale.status.toLowerCase() === tab))
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Sales Management</h1>
          <Link
            href="/admin/sales/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            New Sale
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
            <form onSubmit={handleSearch} className="relative flex-1">
              <input
                type="text"
                placeholder="Search sales..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </form>
            <div className="flex gap-2">
              <button
                onClick={() => router.push("/admin/sales/filter")}
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

          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-4">
              <button
                onClick={() => filterSalesByTab("all")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "all"
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                All
              </button>
              <button
                onClick={() => filterSalesByTab("completed")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "completed"
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => filterSalesByTab("pending")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "pending"
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Pending
              </button>
            </nav>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salesperson
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{sale.customerName}</div>
                      <div className="text-sm text-gray-500">{sale.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{sale.productDetails}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(sale.date).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{sale.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{sale.paymentMethod}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{sale.salesperson}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          sale.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {sale.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/admin/invoices/INV-00${sale.id}`}
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        View Invoice
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/invoices/new?saleId=${sale.id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FileText className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => router.push(`/admin/sales/${sale.id}`)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <Edit className="w-4 h-4" />
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
              Showing <span className="font-medium">{sales.length}</span> of{" "}
              <span className="font-medium">{salesData.length}</span> sales
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
    </AdminLayout>
  )
}
