"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import AdminLayout from "@/components/admin-layout"

export default function NewReportPage() {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState({
    reportName: "",
    reportType: "client-sales",
    format: "excel",
    startDate: "",
    endDate: "",
    includeCharts: true,
    includeRawData: true,
    scheduledReport: false,
    frequency: "never",
    recipients: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    setFormData((prev) => ({ ...prev, [name]: newValue }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      router.push("/admin/reports")
    }, 2000)
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <Link href="/admin/reports" className="inline-flex items-center text-gray-600 hover:text-black">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Reports
          </Link>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Create New Report</h1>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="reportName" className="block text-sm font-medium text-gray-700 mb-1">
                  Report Name*
                </label>
                <input
                  type="text"
                  id="reportName"
                  name="reportName"
                  value={formData.reportName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="e.g. Monthly Sales Analysis - June 2023"
                />
              </div>

              <div>
                <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">
                  Report Type*
                </label>
                <select
                  id="reportType"
                  name="reportType"
                  value={formData.reportType}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="client-sales">Client Sales Report</option>
                  <option value="vendor-purchase">Vendor Purchase Report</option>
                  <option value="overall-sales">Overall Sales Report</option>
                  <option value="overall-purchase">Overall Purchase Report</option>
                  <option value="brand-wise-sales">Brand-wise Sales Report</option>
                  <option value="brand-wise-purchase">Brand-wise Purchase Report</option>
                  <option value="inventory">Inventory Report</option>
                  <option value="service">Service Report</option>
                </select>
              </div>

              <div>
                <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-1">
                  Format*
                </label>
                <select
                  id="format"
                  name="format"
                  value={formData.format}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="excel">Excel</option>
                  <option value="pdf">PDF</option>
                  <option value="csv">CSV</option>
                </select>
              </div>

              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date*
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date*
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="includeCharts"
                    name="includeCharts"
                    checked={formData.includeCharts}
                    onChange={handleChange}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <label htmlFor="includeCharts" className="text-sm font-medium text-gray-700">
                    Include charts and visualizations
                  </label>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="includeRawData"
                    name="includeRawData"
                    checked={formData.includeRawData}
                    onChange={handleChange}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <label htmlFor="includeRawData" className="text-sm font-medium text-gray-700">
                    Include raw data tables
                  </label>
                </div>
              </div>

              <div className="md:col-span-2 border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Report Scheduling (Optional)</h3>
                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="checkbox"
                    id="scheduledReport"
                    name="scheduledReport"
                    checked={formData.scheduledReport}
                    onChange={handleChange}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <label htmlFor="scheduledReport" className="text-sm font-medium text-gray-700">
                    Schedule this report to run automatically
                  </label>
                </div>
              </div>

              {formData.scheduledReport && (
                <>
                  <div>
                    <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                      Frequency
                    </label>
                    <select
                      id="frequency"
                      name="frequency"
                      value={formData.frequency}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="recipients" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Recipients (comma separated)
                    </label>
                    <input
                      type="text"
                      id="recipients"
                      name="recipients"
                      value={formData.recipients}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                      placeholder="e.g. user@example.com, manager@example.com"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Link href="/admin/reports" className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isGenerating}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <span className="inline-block mr-2">
                      <svg className="animate-spin h-4 w-4 inline-block" viewBox="0 0 24 24">
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
                    </span>
                    Generating Report...
                  </>
                ) : (
                  "Generate Report"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
