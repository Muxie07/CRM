"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Download, Calendar, TrendingUp, Package, ShoppingCart, AlertTriangle } from "lucide-react"
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
  ScatterChart,
  Scatter,
} from "recharts"

// Mock data for overall purchases
const overallPurchaseData = [
  { month: "Jan", purchases: 185000, budget: 200000, orders: 25, savings: 15000 },
  { month: "Feb", purchases: 192000, budget: 210000, orders: 28, savings: 18000 },
  { month: "Mar", purchases: 178000, budget: 195000, orders: 24, savings: 17000 },
  { month: "Apr", purchases: 205000, budget: 220000, orders: 32, savings: 15000 },
  { month: "May", purchases: 198000, budget: 215000, orders: 29, savings: 17000 },
  { month: "Jun", purchases: 215000, budget: 230000, orders: 35, savings: 15000 },
]

const purchaseCategories = [
  { name: "Raw Materials", value: 40, amount: 486800 },
  { name: "Equipment", value: 25, amount: 304250 },
  { name: "Services", value: 20, amount: 243400 },
  { name: "Maintenance", value: 10, amount: 121700 },
  { name: "Others", value: 5, amount: 60850 },
]

const vendorPerformance = [
  { vendor: "Supplier A", cost: 85000, quality: 95, delivery: 92 },
  { vendor: "Supplier B", cost: 72000, quality: 88, delivery: 96 },
  { vendor: "Supplier C", cost: 68000, quality: 92, delivery: 89 },
  { vendor: "Supplier D", cost: 91000, quality: 87, delivery: 94 },
  { vendor: "Supplier E", cost: 76000, quality: 90, delivery: 91 },
]

const costAnalysis = [
  { quarter: "Q1 2023", planned: 555000, actual: 545000, variance: -10000 },
  { quarter: "Q2 2023", planned: 645000, actual: 618000, variance: -27000 },
  { quarter: "Q3 2023", planned: 720000, actual: 698000, variance: -22000 },
  { quarter: "Q4 2023", planned: 785000, actual: 756000, variance: -29000 },
]

const COLORS = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"]

export default function OverallPurchaseReportsPage() {
  const [dateRange, setDateRange] = useState("1year")
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      const csvContent = [
        ["Month", "Purchases", "Budget", "Orders", "Savings"],
        ...overallPurchaseData.map((data) => [data.month, data.purchases, data.budget, data.orders, data.savings]),
      ]
        .map((row) => row.join(","))
        .join("\n")

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "overall-purchase-report.csv"
      link.click()
    }, 1500)
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Overall Purchase Reports</h1>
            <p className="text-gray-600">Comprehensive analysis of procurement activities and cost management</p>
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
              className="bg-orange-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-orange-700 disabled:opacity-50"
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
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Total Purchases</p>
                <p className="text-2xl font-bold">₹11.73L</p>
                <p className="text-orange-100 text-sm flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8.2% from last period
                </p>
              </div>
              <div className="bg-orange-400 bg-opacity-30 p-3 rounded-full">
                <ShoppingCart className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Cost Savings</p>
                <p className="text-2xl font-bold">₹97K</p>
                <p className="text-green-100 text-sm flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  7.6% under budget
                </p>
              </div>
              <div className="bg-green-400 bg-opacity-30 p-3 rounded-full">
                <Package className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Active Vendors</p>
                <p className="text-2xl font-bold">47</p>
                <p className="text-blue-100 text-sm flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% new vendors
                </p>
              </div>
              <div className="bg-blue-400 bg-opacity-30 p-3 rounded-full">
                <Package className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Purchase Orders</p>
                <p className="text-2xl font-bold">173</p>
                <p className="text-purple-100 text-sm flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +15.3% increase
                </p>
              </div>
              <div className="bg-purple-400 bg-opacity-30 p-3 rounded-full">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Purchase vs Budget Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Purchase Performance vs Budget</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={overallPurchaseData}>
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
                  <Bar dataKey="budget" fill="#e5e7eb" name="Budget" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="purchases" fill="#f59e0b" name="Actual Purchases" radius={[4, 4, 0, 0]} />
                  <Line type="monotone" dataKey="savings" stroke="#10b981" strokeWidth={3} name="Savings" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Purchase Categories Distribution */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Purchase Category Breakdown</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={purchaseCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {purchaseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name, props) => [
                      `${value}% (₹${props.payload.amount.toLocaleString()})`,
                      "Purchase Share",
                    ]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Vendor Performance and Cost Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Vendor Performance Scatter Plot */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Vendor Performance Analysis</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={vendorPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" dataKey="quality" name="Quality Score" domain={[80, 100]} stroke="#666" />
                  <YAxis type="number" dataKey="delivery" name="Delivery Score" domain={[85, 100]} stroke="#666" />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    formatter={(value, name) => [value, name]}
                    labelFormatter={(label) => `Vendor: ${vendorPerformance[label]?.vendor || "Unknown"}`}
                  />
                  <Scatter dataKey="cost" fill="#3b82f6" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cost Analysis Trends */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Quarterly Cost Analysis</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={costAnalysis}>
                  <defs>
                    <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
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
                    dataKey="planned"
                    stackId="1"
                    stroke="#ef4444"
                    fill="url(#colorPlanned)"
                    name="Planned Cost"
                  />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stackId="2"
                    stroke="#10b981"
                    fill="url(#colorActual)"
                    name="Actual Cost"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Purchase Summary Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Monthly Purchase Summary</h3>
            <p className="text-sm text-gray-600">Detailed breakdown of purchase performance and budget utilization</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Month
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purchases
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Savings
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {overallPurchaseData.map((data, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{data.month}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{data.purchases.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{data.budget.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          data.purchases <= data.budget ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {Math.round((data.purchases / data.budget) * 100)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{data.orders}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ₹{data.savings.toLocaleString()}
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
