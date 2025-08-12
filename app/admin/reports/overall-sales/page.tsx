"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Download, Calendar, TrendingUp, DollarSign, Target, Award } from "lucide-react"
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// Mock data for overall sales
const overallSalesData = [
  { month: "Jan", sales: 145000, target: 120000, orders: 45, growth: 8.5 },
  { month: "Feb", sales: 162000, target: 130000, orders: 52, growth: 11.7 },
  { month: "Mar", sales: 138000, target: 125000, orders: 48, growth: 10.4 },
  { month: "Apr", sales: 185000, target: 140000, orders: 61, growth: 15.2 },
  { month: "May", sales: 171000, target: 135000, orders: 55, growth: 12.8 },
  { month: "Jun", sales: 198000, target: 150000, orders: 67, growth: 16.3 },
]

const salesChannels = [
  { name: "Direct Sales", value: 45, amount: 445500 },
  { name: "Online Platform", value: 30, amount: 297000 },
  { name: "Partner Network", value: 15, amount: 148500 },
  { name: "Retail Stores", value: 10, amount: 99000 },
]

const performanceMetrics = [
  { metric: "Revenue Growth", value: 85, fullMark: 100 },
  { metric: "Customer Satisfaction", value: 92, fullMark: 100 },
  { metric: "Market Share", value: 78, fullMark: 100 },
  { metric: "Product Quality", value: 95, fullMark: 100 },
  { metric: "Delivery Time", value: 88, fullMark: 100 },
  { metric: "Cost Efficiency", value: 82, fullMark: 100 },
]

const quarterlyData = [
  { quarter: "Q1 2023", sales: 445000, profit: 89000, margin: 20 },
  { quarter: "Q2 2023", sales: 554000, profit: 121880, margin: 22 },
  { quarter: "Q3 2023", sales: 612000, profit: 147000, margin: 24 },
  { quarter: "Q4 2023", sales: 689000, profit: 172250, margin: 25 },
]

const COLORS = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"]

export default function OverallSalesReportsPage() {
  const [dateRange, setDateRange] = useState("1year")
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      const csvContent = [
        ["Month", "Sales", "Target", "Orders", "Growth %"],
        ...overallSalesData.map((data) => [data.month, data.sales, data.target, data.orders, data.growth]),
      ]
        .map((row) => row.join(","))
        .join("\n")

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "overall-sales-report.csv"
      link.click()
    }, 1500)
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Overall Sales Reports</h1>
            <p className="text-gray-600">Comprehensive overview of total sales performance across all channels</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
                <option value="2years">Last 2 Years</option>
              </select>
            </div>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-purple-700 disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Export Report
                </>
              )}
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Revenue</p>
                <p className="text-2xl font-bold">₹9.99L</p>
                <p className="text-blue-100 text-sm flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +24.5% YoY
                </p>
              </div>
              <div className="bg-blue-400 bg-opacity-30 p-3 rounded-full">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Target Achievement</p>
                <p className="text-2xl font-bold">132%</p>
                <p className="text-green-100 text-sm flex items-center mt-1">
                  <Award className="w-3 h-3 mr-1" />
                  Above target
                </p>
              </div>
              <div className="bg-green-400 bg-opacity-30 p-3 rounded-full">
                <Target className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Avg Growth Rate</p>
                <p className="text-2xl font-bold">12.5%</p>
                <p className="text-purple-100 text-sm flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Monthly average
                </p>
              </div>
              <div className="bg-purple-400 bg-opacity-30 p-3 rounded-full">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Total Orders</p>
                <p className="text-2xl font-bold">328</p>
                <p className="text-orange-100 text-sm flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +18.7% increase
                </p>
              </div>
              <div className="bg-orange-400 bg-opacity-30 p-3 rounded-full">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales vs Target Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Sales Performance vs Target</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={overallSalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="target" fill="#e5e7eb" name="Target" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="sales" fill="#3b82f6" name="Actual Sales" radius={[4, 4, 0, 0]} />
                  <Line type="monotone" dataKey="growth" stroke="#10b981" strokeWidth={3} name="Growth %" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sales Channels Distribution */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Sales Channel Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesChannels}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {salesChannels.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name, props) => [
                      `${value}% (₹${props.payload.amount.toLocaleString()})`,
                      "Channel Share",
                    ]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Performance Radar and Quarterly Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Radar Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={performanceMetrics}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar
                    name="Performance"
                    dataKey="value"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quarterly Trends */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Quarterly Performance</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={quarterlyData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="quarter" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="url(#colorSales)"
                    name="Sales"
                  />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stackId="2"
                    stroke="#10b981"
                    fill="url(#colorProfit)"
                    name="Profit"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Monthly Performance Summary</h3>
            <p className="text-sm text-gray-600">Detailed breakdown of sales performance metrics</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Month
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Target
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Achievement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {overallSalesData.map((data, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{data.month}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{data.sales.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{data.target.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          data.sales >= data.target ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {Math.round((data.sales / data.target) * 100)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{data.orders}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        +{data.growth}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
