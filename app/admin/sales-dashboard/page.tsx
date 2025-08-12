"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Download,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Target,
  Calendar,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  ScatterChartIcon as Scatter3D,
} from "lucide-react"
import {
  DashboardCharts,
  SalesByCategoryChart,
  SalesByMonthChart,
  SalesByRegionChart,
  SalesByCustomerTypeChart,
  SalesBySalespersonChart,
} from "@/components/dashboard-charts"

// Enhanced KPI data with trends
const kpiData = [
  {
    title: "Total Revenue",
    value: "₹24,567,890",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
    description: "vs previous year",
  },
  {
    title: "Total Orders",
    value: "1,245",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description: "vs previous year",
  },
  {
    title: "Average Order Value",
    value: "₹19,734",
    change: "+4.3%",
    trend: "up",
    icon: Target,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    description: "vs previous year",
  },
  {
    title: "Active Customers",
    value: "892",
    change: "-2.1%",
    trend: "down",
    icon: Users,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    description: "vs previous month",
  },
]

// Time period options
const timePeriods = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 3 months" },
  { value: "1y", label: "Last year" },
  { value: "custom", label: "Custom range" },
]

export default function SalesDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date())
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLastUpdated(new Date())
    setIsLoading(false)
  }

  const handleExport = () => {
    // Simulate export functionality
    console.log("Exporting dashboard data...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Sales Dashboard
            </h1>
            <p className="text-slate-600 mt-2">Comprehensive insights into your sales performance</p>
            <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
              <Calendar className="h-4 w-4" />
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timePeriods.map((period) => (
                  <SelectItem key={period.value} value={period.value}>
                    {period.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" onClick={handleExport} className="hover:bg-slate-100 transition-colors">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="hover:bg-slate-100 transition-colors"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon
            const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown

            return (
              <Card
                key={index}
                className="relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-600">{kpi.title}</p>
                      <p className="text-3xl font-bold text-slate-900">{kpi.value}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant={kpi.trend === "up" ? "default" : "destructive"} className="text-xs font-medium">
                          <TrendIcon className="h-3 w-3 mr-1" />
                          {kpi.change}
                        </Badge>
                        <span className="text-xs text-slate-500">{kpi.description}</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl ${kpi.bgColor}`}>
                      <Icon className={`h-6 w-6 ${kpi.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Dashboard Charts */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-slate-900">Sales Analytics</CardTitle>
                <CardDescription className="text-slate-600">
                  Interactive visualizations of your sales data
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Charts
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DashboardCharts />
          </CardContent>
        </Card>

        {/* Detailed Analytics Tabs */}
        <Tabs defaultValue="breakdown" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-100 p-1 rounded-xl">
            <TabsTrigger
              value="breakdown"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              <PieChart className="mr-2 h-4 w-4" />
              Breakdown
            </TabsTrigger>
            <TabsTrigger
              value="trends"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              <LineChart className="mr-2 h-4 w-4" />
              Trends
            </TabsTrigger>
            <TabsTrigger
              value="regions"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Regions
            </TabsTrigger>
            <TabsTrigger
              value="customers"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              <Users className="mr-2 h-4 w-4" />
              Customers
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              <Scatter3D className="mr-2 h-4 w-4" />
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="breakdown" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900">Sales by Category</CardTitle>
                  <CardDescription>Product category distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <SalesByCategoryChart />
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900">Customer Type Distribution</CardTitle>
                  <CardDescription>Sales breakdown by customer segments</CardDescription>
                </CardHeader>
                <CardContent>
                  <SalesByCustomerTypeChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">Monthly Sales Trends</CardTitle>
                <CardDescription>Sales performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <SalesByMonthChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="regions" className="space-y-6">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">Regional Performance</CardTitle>
                <CardDescription>Sales distribution across regions</CardDescription>
              </CardHeader>
              <CardContent>
                <SalesByRegionChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900">Customer Segments</CardTitle>
                  <CardDescription>Sales by customer type</CardDescription>
                </CardHeader>
                <CardContent>
                  <SalesByCustomerTypeChart />
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900">Top Performers</CardTitle>
                  <CardDescription>Sales by team members</CardDescription>
                </CardHeader>
                <CardContent>
                  <SalesBySalespersonChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">Performance Metrics</CardTitle>
                <CardDescription>Comprehensive performance analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                    <div className="text-2xl font-bold text-blue-700">94.2%</div>
                    <div className="text-sm text-blue-600">Target Achievement</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                    <div className="text-2xl font-bold text-green-700">₹2.4M</div>
                    <div className="text-sm text-green-600">Monthly Target</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                    <div className="text-2xl font-bold text-purple-700">15.3%</div>
                    <div className="text-sm text-purple-600">Growth Rate</div>
                  </div>
                </div>
                <SalesBySalespersonChart />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Top Products</CardTitle>
              <CardDescription>Best performing items this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Aluminum Terminal 240mm", sales: 120, change: "+15%" },
                  { name: "Mechanical T-Connector", sales: 95, change: "+8%" },
                  { name: "Copper Terminal 95mm", sales: 85, change: "+12%" },
                ].map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div>
                      <div className="font-medium text-slate-900">{product.name}</div>
                      <div className="text-sm text-slate-600">{product.sales} units sold</div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {product.change}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Recent Activity</CardTitle>
              <CardDescription>Latest sales activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { action: "New order", client: "TechCorp Ltd", amount: "₹45,000", time: "2 min ago" },
                  { action: "Quote sent", client: "PowerGrid Inc", amount: "₹78,500", time: "15 min ago" },
                  { action: "Payment received", client: "ElectroMax", amount: "₹32,000", time: "1 hour ago" },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div>
                      <div className="font-medium text-slate-900">{activity.action}</div>
                      <div className="text-sm text-slate-600">{activity.client}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-slate-900">{activity.amount}</div>
                      <div className="text-xs text-slate-500">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Goals & Targets</CardTitle>
              <CardDescription>Progress towards monthly goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { goal: "Monthly Revenue", current: 2.4, target: 2.5, unit: "M" },
                  { goal: "New Customers", current: 28, target: 30, unit: "" },
                  { goal: "Order Volume", current: 245, target: 250, unit: "" },
                ].map((goal, index) => {
                  const percentage = (goal.current / goal.target) * 100
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-slate-900">{goal.goal}</span>
                        <span className="text-slate-600">
                          {goal.current}
                          {goal.unit} / {goal.target}
                          {goal.unit}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                      <div className="text-xs text-slate-500">{percentage.toFixed(1)}% complete</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
