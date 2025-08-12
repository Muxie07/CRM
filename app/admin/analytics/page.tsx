"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Download, Calendar, RefreshCw } from "lucide-react"
import { userData } from "@/data/users"
import { vehicleData } from "@/data/vehicles"
import { salesData } from "@/data/sales"
import { serviceData } from "@/data/services"

// Import the visualization components
import {
  MonthlyRevenueChart,
  VehicleDistributionChart,
  ServiceTypeChart,
  CustomerAcquisitionChart,
  CombinedSalesServiceChart,
  SalesByCategoryChart,
  SalesByMonthChart,
  SalesByRegionChart,
  SalesByCustomerTypeChart,
  SalesBySalespersonChart,
} from "@/components/dashboard-charts"

export default function AdminAnalyticsPage() {
  const [dateRange, setDateRange] = useState("month")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleExport = () => {
    // Create a simple CSV with analytics data
    const headers = ["Metric", "Value"]
    const data = [
      ["Total Users", userData.length],
      ["Active Users", userData.filter((user) => user.status === "Active").length],
      ["Total Vehicles", vehicleData.length],
      ["Total Sales", salesData.length],
      ["Total Revenue", salesData.reduce((sum, sale) => sum + sale.amount, 0)],
      ["Total Services", serviceData.length],
      ["Service Revenue", serviceData.reduce((sum, service) => sum + service.cost, 0)],
    ]

    const csvContent = [headers.join(","), ...data.map((row) => row.join(","))].join("\n")

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "analytics.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <div className="flex gap-2">
            <button
              onClick={handleRefresh}
              className="px-4 py-2 border rounded-md flex items-center gap-2 hover:bg-gray-50"
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Refreshing..." : "Refresh"}
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

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border-none focus:ring-0 text-sm font-medium"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Total Sales</div>
            <div className="text-3xl font-bold">
              ₹{salesData.reduce((sum, sale) => sum + sale.amount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-green-600 mt-2 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              12.5% from last {dateRange}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Vehicles Sold</div>
            <div className="text-3xl font-bold">{salesData.length}</div>
            <div className="text-sm text-green-600 mt-2 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              8.2% from last {dateRange}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Service Revenue</div>
            <div className="text-3xl font-bold">
              ₹{serviceData.reduce((sum, service) => sum + service.cost, 0).toLocaleString()}
            </div>
            <div className="text-sm text-red-600 mt-2 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              3.1% from last {dateRange}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">New Customers</div>
            <div className="text-3xl font-bold">{userData.length}</div>
            <div className="text-sm text-green-600 mt-2 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              5.3% from last {dateRange}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Sales by Model</h2>
            <div className="h-64">
              <VehicleDistributionChart />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Service Types</h2>
            <div className="h-64">
              <ServiceTypeChart />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Sales vs Service Comparison</h2>
            <div className="h-64">
              <CombinedSalesServiceChart />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Revenue Trends</h2>
            <div className="h-64">
              <MonthlyRevenueChart />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Customer Acquisition</h2>
            <div className="h-64">
              <CustomerAcquisitionChart />
            </div>
          </div>
        </div>

        {/* Add new charts here */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Sales by Category</h2>
            <div className="h-64">
              <SalesByCategoryChart />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Sales by Month</h2>
            <div className="h-64">
              <SalesByMonthChart />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Sales by Region</h2>
            <div className="h-64">
              <SalesByRegionChart />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Sales by Customer Type</h2>
            <div className="h-64">
              <SalesByCustomerTypeChart />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Sales by Salesperson</h2>
            <div className="h-64">
              <SalesBySalespersonChart />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-lg font-bold">Recent Sales</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehicle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {salesData.slice(0, 5).map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{sale.customerName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{sale.vehicleModel}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">₹{sale.amount.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{sale.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            sale.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : sale.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
