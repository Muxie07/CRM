"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Download, Calendar, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Import the visualization components
import {
  MonthlySalesChart,
  MonthlyRevenueChart,
  ProductDistributionChart,
  ServiceTypeChart,
  CustomerAcquisitionChart,
  RevenueBreakdownChart,
} from "@/components/dashboard-charts"

// Mock data for reports
const reportsData = [
  {
    id: "1",
    name: "Monthly Client Sales Report",
    description: "Summary of all client sales for the current month",
    lastGenerated: "2023-05-15",
    format: "Excel",
    category: "Client-Sales",
  },
  {
    id: "2",
    name: "Vendor Purchase Analysis",
    description: "Detailed analysis of purchases from vendors",
    lastGenerated: "2023-05-14",
    format: "PDF",
    category: "Vendor-Purchase",
  },
  {
    id: "3",
    name: "Overall Sales Performance",
    description: "Comprehensive overview of all sales activities",
    lastGenerated: "2023-05-13",
    format: "Excel",
    category: "Overall-Sales",
  },
  {
    id: "4",
    name: "Overall Purchase Summary",
    description: "Summary of all purchases across vendors",
    lastGenerated: "2023-05-12",
    format: "PDF",
    category: "Overall-Purchase",
  },
  {
    id: "5",
    name: "Brand-wise Sales Analysis",
    description: "Sales performance broken down by brand",
    lastGenerated: "2023-05-11",
    format: "Excel",
    category: "Brand-Wise",
  },
  {
    id: "6",
    name: "Brand-wise Purchase Report",
    description: "Purchase statistics categorized by brand",
    lastGenerated: "2023-05-10",
    format: "Excel",
    category: "Brand-Wise",
  },
]

export default function AdminReportsPage() {
  const router = useRouter()
  const [reports, setReports] = useState(reportsData)
  const [activeCategory, setActiveCategory] = useState("all")
  const [dateRange, setDateRange] = useState("month")
  const [isGenerating, setIsGenerating] = useState<string | null>(null)

  const handleExport = (reportId: string) => {
    setIsGenerating(reportId)

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(null)

      // Create a dummy CSV for demonstration
      const report = reports.find((r) => r.id === reportId)
      if (!report) return

      const headers = ["Date", "Category", "Amount"]
      const rows = [
        ["2023-05-01", "Electrical Terminals", "₹250000"],
        ["2023-05-02", "Overhead Distribution", "₹120000"],
        ["2023-05-03", "Networking", "₹80000"],
        ["2023-05-04", "Mechanical Tools", "₹350000"],
        ["2023-05-05", "Grounding Connectors", "₹150000"],
      ]

      const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

      // Create blob and download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", `${report.name.replace(/\s+/g, "_")}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }, 1500)
  }

  const filterReportsByCategory = (category: string) => {
    setActiveCategory(category)
    if (category === "all") {
      setReports(reportsData)
    } else {
      setReports(
        reportsData.filter((report) => report.category.toLowerCase() === category.toLowerCase().replace("-", "")),
      )
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Reports</h1>
          <div className="flex items-center gap-4">
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
            <Link
              href="/admin/reports/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              New Report
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportsData.map((report) => (
                <div key={report.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium">{report.name}</h3>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-200">{report.category}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                    </div>
                    <button
                      onClick={() => handleExport(report.id)}
                      disabled={isGenerating === report.id}
                      className="flex items-center gap-1 px-3 py-1 bg-black text-white rounded-md text-xs hover:bg-gray-800 disabled:opacity-50"
                    >
                      {isGenerating === report.id ? (
                        <>
                          <svg className="animate-spin h-3 w-3 mr-1" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download className="w-3 h-3" />
                          Export {report.format}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-bold">Custom Report</h2>
            <p className="text-sm text-gray-500">Generate a custom report by selecting parameters below</p>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">
                  Report Type
                </label>
                <select
                  id="reportType"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="client-sales">Client Sales Report</option>
                  <option value="vendor-purchase">Vendor Purchase Report</option>
                  <option value="overall-sales">Overall Sales Report</option>
                  <option value="overall-purchase">Overall Purchase Report</option>
                  <option value="brand-wise-sales">Brand-wise Sales Report</option>
                  <option value="brand-wise-purchase">Brand-wise Purchase Report</option>
                </select>
              </div>

              <div>
                <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-1">
                  Format
                </label>
                <select
                  id="format"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="excel">Excel</option>
                  <option value="pdf">PDF</option>
                  <option value="csv">CSV</option>
                </select>
              </div>

              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                Generate Custom Report
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mt-6">
          <div className="p-6 border-b">
            <h2 className="text-lg font-bold">Visual Reports</h2>
            <p className="text-sm text-gray-500">Interactive visualizations of key metrics</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-md font-semibold mb-4">Monthly Sales</h3>
                <div className="h-64">
                  <MonthlySalesChart />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-md font-semibold mb-4">Monthly Revenue</h3>
                <div className="h-64">
                  <MonthlyRevenueChart />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-md font-semibold mb-4">Product Distribution</h3>
                <div className="h-64">
                  <ProductDistributionChart />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-md font-semibold mb-4">Service Types</h3>
                <div className="h-64">
                  <ServiceTypeChart />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-md font-semibold mb-4">Customer Acquisition</h3>
                <div className="h-64">
                  <CustomerAcquisitionChart />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-md font-semibold mb-4">Revenue Breakdown</h3>
                <div className="h-64">
                  <RevenueBreakdownChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
