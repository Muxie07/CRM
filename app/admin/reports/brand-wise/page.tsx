"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Download, Calendar, TrendingUp, Package, Star, Award } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
} from "recharts"

// Mock data for brand-wise analysis
const brandPerformance = [
  { brand: "Schneider Electric", sales: 285000, purchases: 195000, margin: 31.6, growth: 15.2 },
  { brand: "ABB", sales: 245000, purchases: 168000, margin: 31.4, growth: 12.8 },
  { brand: "Siemens", sales: 198000, purchases: 142000, margin: 28.3, growth: 8.7 },
  { brand: "Legrand", sales: 167000, purchases: 125000, margin: 25.1, growth: 18.9 },
  { brand: "Honeywell", sales: 134000, purchases: 98000, margin: 26.9, growth: -2.1 },
  { brand: "Eaton", sales: 112000, purchases: 85000, margin: 24.1, growth: 22.3 },
]

const brandTrends = [
  { month: "Jan", schneider: 45000, abb: 38000, siemens: 32000, legrand: 25000 },
  { month: "Feb", schneider: 48000, abb: 41000, siemens: 34000, legrand: 28000 },
  { month: "Mar", schneider: 46000, abb: 39000, siemens: 31000, legrand: 26000 },
  { month: "Apr", schneider: 52000, abb: 44000, siemens: 36000, legrand: 30000 },
  { month: "May", schneider: 49000, abb: 42000, siemens: 33000, legrand: 29000 },
  { month: "Jun", schneider: 55000, abb: 46000, siemens: 38000, legrand: 32000 },
]

const marketShare = [
  { name: "Schneider Electric", value: 28, sales: 285000 },
  { name: "ABB", value: 24, sales: 245000 },
  { name: "Siemens", value: 19, sales: 198000 },
  { name: "Legrand", value: 16, sales: 167000 },
  { name: "Others", value: 13, sales: 132000 },
]

const brandCategories = [
  { brand: "Schneider Electric", electrical: 85, automation: 75, energy: 90, safety: 80 },
  { brand: "ABB", electrical: 80, automation: 95, energy: 85, safety: 75 },
  { brand: "Siemens", electrical: 90, automation: 88, energy: 82, safety: 85 },
  { brand: "Legrand", electrical: 95, automation: 60, energy: 70, safety: 90 },
]

const COLORS = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"]

export default function BrandWiseReportsPage() {
  const [dateRange, setDateRange] = useState("6months")
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      const csvContent = [
        ["Brand", "Sales", "Purchases", "Margin %", "Growth %"],
        ...brandPerformance.map((brand) => [brand.brand, brand.sales, brand.purchases, brand.margin, brand.growth]),
      ]
        .map((row) => row.join(","))
        .join("\n")

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "brand-wise-report.csv"
      link.click()
    }, 1500)
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Brand-wise Reports</h1>
            <p className="text-gray-600">Comprehensive analysis of brand performance across sales and purchases</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="1month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
            </div>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Brands</option>
              <option value="schneider">Schneider Electric</option>
              <option value="abb">ABB</option>
              <option value="siemens">Siemens</option>
              <option value="legrand">Legrand</option>
            </select>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-700 disabled:opacity-50"
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
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm font-medium">Top Brand Revenue</p>
                <p className="text-2xl font-bold">₹2.85L</p>
                <p className="text-indigo-100 text-sm flex items-center mt-1">
                  <Award className="w-3 h-3 mr-1" />
                  Schneider Electric
                </p>
              </div>
              <div className="bg-indigo-400 bg-opacity-30 p-3 rounded-full">
                <Star className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Best Margin</p>
                <p className="text-2xl font-bold">31.6%</p>
                <p className="text-green-100 text-sm flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Industry leading
                </p>
              </div>
              <div className="bg-green-400 bg-opacity-30 p-3 rounded-full">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Active Brands</p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-blue-100 text-sm flex items-center mt-1">
                  <Package className="w-3 h-3 mr-1" />
                  Portfolio diversity
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
                <p className="text-purple-100 text-sm font-medium">Fastest Growth</p>
                <p className="text-2xl font-bold">22.3%</p>
                <p className="text-purple-100 text-sm flex items-center mt-1">
                  <Award className="w-3 h-3 mr-1" />
                  Eaton
                </p>
              </div>
              <div className="bg-purple-400 bg-opacity-30 p-3 rounded-full">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Brand Performance Comparison */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Brand Performance Comparison</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={brandPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="brand" stroke="#666" angle={-45} textAnchor="end" height={100} interval={0} />
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
                  <Bar dataKey="sales" fill="#3b82f6" name="Sales (₹)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="purchases" fill="#10b981" name="Purchases (₹)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Market Share Distribution */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Market Share Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketShare}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {marketShare.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name, props) => [
                      `${value}% (₹${props.payload.sales.toLocaleString()})`,
                      "Market Share",
                    ]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Brand Trends and Category Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Brand Sales Trends */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Top Brand Sales Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={brandTrends}>
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
                  <Line
                    type="monotone"
                    dataKey="schneider"
                    stroke="#ef4444"
                    strokeWidth={3}
                    name="Schneider Electric"
                    dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="abb"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="ABB"
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="siemens"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Siemens"
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="legrand"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    name="Legrand"
                    dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Brand Category Performance */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Brand Category Strength</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" data={brandCategories[0]}>
                  <RadialBar
                    minAngle={15}
                    label={{ position: "insideStart", fill: "#fff" }}
                    background
                    clockWise
                    dataKey="electrical"
                    fill="#3b82f6"
                  />
                  <Legend iconSize={18} layout="vertical" verticalAlign="middle" align="right" />
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Brand Performance Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Brand Performance Summary</h3>
            <p className="text-sm text-gray-600">Detailed analysis of brand sales, purchases, margins, and growth</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purchases
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Margin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Growth
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {brandPerformance.map((brand, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{brand.brand}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{brand.sales.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{brand.purchases.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          brand.margin > 30
                            ? "bg-green-100 text-green-800"
                            : brand.margin > 25
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {brand.margin}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          brand.growth > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {brand.growth > 0 ? "+" : ""}
                        {brand.growth}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(brand.margin / 6) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
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
