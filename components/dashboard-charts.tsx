"use client"
import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ReferenceLine,
  PieChart,
  Pie,
} from "recharts"

// Sales data by month
const monthlySalesData = [
  { name: "Jan", sales: 12, revenue: 1200000 },
  { name: "Feb", sales: 19, revenue: 1900000 },
  { name: "Mar", sales: 15, revenue: 1500000 },
  { name: "Apr", sales: 22, revenue: 2200000 },
  { name: "May", sales: 26, revenue: 2600000 },
  { name: "Jun", sales: 18, revenue: 1800000 },
  { name: "Jul", sales: 24, revenue: 2400000 },
  { name: "Aug", sales: 21, revenue: 2100000 },
  { name: "Sep", sales: 28, revenue: 2800000 },
  { name: "Oct", sales: 23, revenue: 2300000 },
  { name: "Nov", sales: 0, revenue: 0 },
  { name: "Dec", sales: 0, revenue: 0 },
]

// Sales data by product category for stacked chart
const salesByProductCategory = [
  { name: "Jan", terminals: 5, connectors: 3, networking: 2, tools: 1, other: 1 },
  { name: "Feb", terminals: 8, connectors: 5, networking: 3, tools: 2, other: 1 },
  { name: "Mar", terminals: 6, connectors: 4, networking: 3, tools: 1, other: 1 },
  { name: "Apr", terminals: 9, connectors: 6, networking: 4, tools: 2, other: 1 },
  { name: "May", terminals: 11, connectors: 7, networking: 5, tools: 2, other: 1 },
  { name: "Jun", terminals: 7, connectors: 5, networking: 3, tools: 2, other: 1 },
  { name: "Jul", terminals: 10, connectors: 6, networking: 5, tools: 2, other: 1 },
  { name: "Aug", terminals: 9, connectors: 5, networking: 4, tools: 2, other: 1 },
  { name: "Sep", terminals: 12, connectors: 8, networking: 5, tools: 2, other: 1 },
  { name: "Oct", terminals: 10, connectors: 6, networking: 4, tools: 2, other: 1 },
  { name: "Nov", terminals: 0, connectors: 0, networking: 0, tools: 0, other: 0 },
  { name: "Dec", terminals: 0, connectors: 0, networking: 0, tools: 0, other: 0 },
]

// Service data by month
const serviceData = [
  { name: "Jan", services: 28, revenue: 280000 },
  { name: "Feb", services: 32, revenue: 320000 },
  { name: "Mar", services: 36, revenue: 360000 },
  { name: "Apr", services: 30, revenue: 300000 },
  { name: "May", services: 40, revenue: 400000 },
  { name: "Jun", services: 35, revenue: 350000 },
  { name: "Jul", services: 38, revenue: 380000 },
  { name: "Aug", services: 33, revenue: 330000 },
  { name: "Sep", services: 42, revenue: 420000 },
  { name: "Oct", services: 37, revenue: 370000 },
  { name: "Nov", services: 0, revenue: 0 },
  { name: "Dec", services: 0, revenue: 0 },
]

// Product sales by model
const productData = [
  { name: "Electrical Terminals", value: 35, color: "#0088FE" },
  { name: "Overhead Distribution", value: 25, color: "#00C49F" },
  { name: "Mechanical Connectors", value: 20, color: "#FFBB28" },
  { name: "Grounding Connectors", value: 15, color: "#FF8042" },
  { name: "Networking", value: 5, color: "#8884d8" },
]

// Customer acquisition data
const customerData = [
  { name: "Jan", customers: 15 },
  { name: "Feb", customers: 20 },
  { name: "Mar", customers: 18 },
  { name: "Apr", customers: 25 },
  { name: "May", customers: 30 },
  { name: "Jun", customers: 22 },
  { name: "Jul", customers: 28 },
  { name: "Aug", customers: 24 },
  { name: "Sep", customers: 32 },
  { name: "Oct", customers: 27 },
]

// Multi-dimensional service data for scatter plot
const serviceMultiDimensionalData = [
  { name: "Installation", frequency: 45, satisfaction: 85, volume: 1200, category: "Maintenance", color: "#1e40af" },
  { name: "Repair", frequency: 65, satisfaction: 78, volume: 950, category: "Maintenance", color: "#1e40af" },
  { name: "Testing", frequency: 25, satisfaction: 92, volume: 450, category: "Repair", color: "#6b7280" },
  { name: "Calibration", frequency: 15, satisfaction: 88, volume: 320, category: "Performance", color: "#047857" },
  { name: "Replacement", frequency: 30, satisfaction: 75, volume: 680, category: "Repair", color: "#6b7280" },
  { name: "Inspection", frequency: 20, satisfaction: 82, volume: 380, category: "Repair", color: "#6b7280" },
  { name: "Maintenance", frequency: 18, satisfaction: 79, volume: 290, category: "Comfort", color: "#7c3aed" },
  {
    name: "Upgrade",
    frequency: 10,
    satisfaction: 90,
    volume: 180,
    category: "Performance",
    color: "#047857",
  },
  { name: "Consultation", frequency: 35, satisfaction: 86, volume: 520, category: "Maintenance", color: "#1e40af" },
  { name: "Emergency Repair", frequency: 12, satisfaction: 83, volume: 210, category: "Repair", color: "#6b7280" },
]

// Service type distribution
const serviceTypeData = [
  { name: "Installation", value: 45, color: "#0088FE" },
  { name: "Repairs", value: 25, color: "#00C49F" },
  { name: "Maintenance", value: 20, color: "#FFBB28" },
  { name: "Consultation", value: 7, color: "#FF8042" },
  { name: "Others", value: 3, color: "#8884d8" },
]

// Revenue breakdown data for diverging bar chart
const revenueBreakdownData = [
  { name: "Electrical Terminals", actual: 65, target: 60 },
  { name: "Overhead Distribution", actual: 20, target: 25 },
  { name: "Mechanical Connectors", actual: 10, target: 15 },
  { name: "Grounding Connectors", actual: 5, target: 10 },
  { name: "Networking", actual: 8, target: 5 },
  { name: "Unified Communication", actual: 7, target: 10 },
  { name: "Services", actual: 12, target: 8 },
]

// Combined sales and service data
const combinedData = monthlySalesData.map((item, index) => ({
  name: item.name,
  sales: item.sales,
  services: serviceData[index]?.services || 0,
}))

// Product comparison data for radar chart
const productComparisonData = [
  { attribute: "Quality", Terminals: 95, Distribution: 60, Connectors: 78, Grounding: 88 },
  { attribute: "Price", Terminals: 65, Distribution: 98, Connectors: 85, Grounding: 75 },
  { attribute: "Availability", Terminals: 70, Distribution: 92, Connectors: 85, Grounding: 80 },
  { attribute: "Durability", Terminals: 60, Distribution: 88, Connectors: 75, Grounding: 70 },
  { attribute: "Performance", Terminals: 98, Distribution: 70, Connectors: 90, Grounding: 85 },
  { attribute: "Compatibility", Terminals: 65, Distribution: 95, Connectors: 80, Grounding: 75 },
]

// Sample data for category, region, customer type, and salesperson charts
const categoryData = [
  { name: "Electrical Terminals", value: 35 },
  { name: "Overhead Distribution", value: 25 },
  { name: "Mechanical Connectors", value: 20 },
  { name: "Grounding Connectors", value: 15 },
  { name: "Networking", value: 5 },
]

const regionData = [
  { name: "North", value: 30 },
  { name: "South", value: 25 },
  { name: "East", value: 20 },
  { name: "West", value: 15 },
  { name: "Central", value: 10 },
]

const customerTypeData = [
  { name: "Corporate", value: 45 },
  { name: "Government", value: 30 },
  { name: "Small Business", value: 15 },
  { name: "Individual", value: 10 },
]

const salespersonData = [
  { name: "John", value: 28 },
  { name: "Sarah", value: 25 },
  { name: "Michael", value: 22 },
  { name: "Emily", value: 18 },
  { name: "David", value: 15 },
]

// New chart components
export function SalesByCategoryChart() {
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#A800FF"]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={categoryData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function SalesByMonthChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthlySalesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" name="Sales" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function SalesByRegionChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={regionData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" name="Sales" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function SalesByCustomerTypeChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={customerTypeData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {customerTypeData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={["#8884d8", "#82ca9d", "#ffc658", "#ff8042"][index % 4]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function SalesBySalespersonChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={salespersonData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" name="Sales" fill="#a4de6c" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function MonthlySalesChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={salesByProductCategory}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value, name) => {
            const formattedName = name.charAt(0).toUpperCase() + name.slice(1)
            return [`${value} units`, formattedName]
          }}
        />
        <Legend />
        <Bar dataKey="terminals" name="Terminals" stackId="a" fill="#1D4E89" /> {/* Royal blue */}
        <Bar dataKey="connectors" name="Connectors" stackId="a" fill="#9B2335" /> {/* Burgundy red */}
        <Bar dataKey="networking" name="Networking" stackId="a" fill="#014421" /> {/* Forest green */}
        <Bar dataKey="tools" name="Tools" stackId="a" fill="#0A1172" /> {/* Navy blue */}
        <Bar dataKey="other" name="Other" stackId="a" fill="#7E2811" /> {/* Dark red */}
      </BarChart>
    </ResponsiveContainer>
  )
}

export function MonthlyRevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={monthlySalesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => [`₹${(value / 100000).toFixed(1)}L`, "Revenue"]} />
        <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function ProductDistributionChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={productData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {productData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function VehicleDistributionChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart outerRadius={150} width={730} height={400} data={productComparisonData}>
        <PolarGrid gridType="polygon" stroke="#e0e0e0" strokeWidth={1} />
        <PolarAngleAxis
          dataKey="attribute"
          tick={{ fill: "#333", fontSize: 14, fontWeight: 500 }}
          stroke="#888"
          tickLine={false}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={{ fontSize: 12 }}
          stroke="#888"
          strokeWidth={1}
          tickCount={5}
        />
        <Radar name="Terminals" dataKey="Terminals" stroke="#0088FE" fill="#0088FE" fillOpacity={0.3} strokeWidth={3} />
        <Radar
          name="Distribution"
          dataKey="Distribution"
          stroke="#00C49F"
          fill="#00C49F"
          fillOpacity={0.3}
          strokeWidth={3}
        />
        <Radar
          name="Connectors"
          dataKey="Connectors"
          stroke="#FFBB28"
          fill="#FFBB28"
          fillOpacity={0.3}
          strokeWidth={3}
        />
        <Radar name="Grounding" dataKey="Grounding" stroke="#FF8042" fill="#FF8042" fillOpacity={0.3} strokeWidth={3} />
        <Legend
          iconSize={14}
          wrapperStyle={{
            fontSize: 14,
            fontWeight: 500,
            paddingTop: 20,
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            border: "none",
            padding: "10px 14px",
            fontSize: "14px",
          }}
          formatter={(value) => [`${value}/100`, ""]}
          labelFormatter={(label) => `${label}`}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export function ServiceTypeChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={serviceTypeData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {serviceTypeData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function CustomerAcquisitionChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={customerData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => [`${value} customers`, "New Customers"]} />
        <Line type="monotone" dataKey="customers" stroke="#00C49F" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function RevenueBreakdownChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart layout="vertical" data={revenueBreakdownData} margin={{ top: 20, right: 30, left: 100, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[-30, 70]} tickFormatter={(value) => `${Math.abs(value)}%`} />
        <YAxis type="category" dataKey="name" width={100} />
        <Tooltip
          formatter={(value, name) => {
            return [`${Math.abs(value)}%`, name === "actual" ? "Actual" : "Target"]
          }}
          labelFormatter={(label) => `${label}`}
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            border: "none",
          }}
        />
        <Legend verticalAlign="top" height={36} formatter={(value) => (value === "actual" ? "Actual" : "Target")} />
        <Bar
          dataKey="actual"
          fill="#1e40af" // High school blue
          name="actual"
          radius={[0, 4, 4, 0]}
        />
        <Bar
          dataKey="target"
          fill="#6b7280" // Grey
          name="target"
          radius={[0, 4, 4, 0]}
        />
        <ReferenceLine x={0} stroke="#000" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function CombinedSalesServiceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={combinedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" name="Product Sales" fill="#8884d8" />
        <Bar dataKey="services" name="Service Bookings" fill="#00C49F" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function DashboardCharts() {
  const [activeTab, setActiveTab] = useState("sales")

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-4">
            <button
              onClick={() => setActiveTab("sales")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "sales"
                  ? "border-blue-300 text-blue-400"
                  : "border-transparent text-gray-400 hover:text-gray-500 hover:border-gray-200"
              }`}
              title="Vertical bars showing sales quantities across time periods"
            >
              Sales (Vertical)
            </button>
            <button
              onClick={() => setActiveTab("revenue")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "revenue"
                  ? "border-blue-300 text-blue-400"
                  : "border-transparent text-gray-400 hover:text-gray-500 hover:border-gray-200"
              }`}
              title="Area chart showing continuous revenue trends"
            >
              Revenue Trends
            </button>
            <button
              onClick={() => setActiveTab("customers")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "customers"
                  ? "border-blue-300 text-blue-400"
                  : "border-transparent text-gray-400 hover:text-gray-500 hover:border-gray-200"
              }`}
              title="Line chart showing customer acquisition over time"
            >
              Customer Growth
            </button>
            <button
              onClick={() => setActiveTab("combined")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "combined"
                  ? "border-blue-300 text-blue-400"
                  : "border-transparent text-gray-400 hover:text-gray-500 hover:border-gray-200"
              }`}
              title="Grouped bar chart comparing sales and service metrics"
            >
              Grouped Comparison
            </button>
            <button
              onClick={() => setActiveTab("stacked")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "stacked"
                  ? "border-blue-300 text-blue-400"
                  : "border-transparent text-gray-400 hover:text-gray-500 hover:border-gray-200"
              }`}
              title="Stacked bar chart showing composition of revenue sources"
            >
              Stacked Analysis
            </button>
          </nav>
        </div>
        <div className="p-6">
          {activeTab === "sales" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Monthly Product Sales</h3>
              <MonthlySalesChart />
            </div>
          )}
          {activeTab === "revenue" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
              <MonthlyRevenueChart />
            </div>
          )}
          {activeTab === "customers" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Acquisition</h3>
              <CustomerAcquisitionChart />
            </div>
          )}
          {activeTab === "combined" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Sales vs Service Bookings</h3>
              <CombinedSalesServiceChart />
            </div>
          )}
          {activeTab === "stacked" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Revenue Composition by Source</h3>
              <p className="text-sm text-gray-500 mb-4">
                Stacked bars showing the breakdown of revenue sources for each month
              </p>
              <CombinedSalesServiceChart />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Product Model Comparison</h3>
            <VehicleDistributionChart />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Service Type Distribution</h3>
            <ServiceTypeChart />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Breakdown</h3>
          <RevenueBreakdownChart />
        </div>
      </div>
    </div>
  )
}
