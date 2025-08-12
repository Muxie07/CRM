"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/providers"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowRight, Users, BikeIcon as Motorcycle, TrendingUp, ShoppingBag, PenToolIcon as Tool } from "lucide-react"
import Link from "next/link"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [recentCustomers, setRecentCustomers] = useState([])
  const [upcomingServices, setUpcomingServices] = useState([])

  // Chart data
  const salesData = [
    { name: "Jan", sales: 12 },
    { name: "Feb", sales: 19 },
    { name: "Mar", sales: 15 },
    { name: "Apr", sales: 22 },
    { name: "May", sales: 26 },
    { name: "Jun", sales: 18 },
  ]

  const serviceData = [
    { name: "Jan", services: 28 },
    { name: "Feb", services: 32 },
    { name: "Mar", services: 36 },
    { name: "Apr", services: 30 },
    { name: "May", services: 40 },
    { name: "Jun", services: 35 },
  ]

  const vehicleData = [
    { name: "Apache RTR", value: 35 },
    { name: "Jupiter", value: 25 },
    { name: "Ntorq", value: 20 },
    { name: "Raider", value: 15 },
    { name: "Others", value: 5 },
  ]

  const performanceData = [
    { name: "Jan", sales: 12, services: 28 },
    { name: "Feb", sales: 19, services: 32 },
    { name: "Mar", sales: 15, services: 36 },
    { name: "Apr", sales: 22, services: 30 },
    { name: "May", sales: 26, services: 40 },
    { name: "Jun", sales: 18, services: 35 },
  ]

  const vehicleColors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6"]

  // Scroll reveal animations
  const headerReveal = useScrollReveal()
  const statsReveal = useScrollReveal({ delay: 100 })
  const recentCustomersReveal = useScrollReveal({ delay: 200 })
  const upcomingServicesReveal = useScrollReveal({ delay: 300 })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else {
      // Fetch recent customers
      setRecentCustomers([
        { id: 1, name: "Rajesh Kumar", phone: "9876543210", vehicle: "TVS Apache RTR 160", date: "2023-05-15" },
        { id: 2, name: "Priya Sharma", phone: "9876543211", vehicle: "TVS Jupiter", date: "2023-05-16" },
        { id: 3, name: "Vikram Singh", phone: "9876543212", vehicle: "TVS Ntorq", date: "2023-05-17" },
      ])

      // Fetch upcoming services
      setUpcomingServices([
        { id: 1, customer: "Ananya Desai", vehicle: "TVS Apache RTR 160", date: "2023-05-20", time: "10:00 AM" },
        { id: 2, customer: "Rahul Sharma", vehicle: "TVS Jupiter", date: "2023-05-21", time: "11:30 AM" },
        { id: 3, customer: "Neha Gupta", vehicle: "TVS Ntorq", date: "2023-05-22", time: "02:00 PM" },
      ])
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow px-4 py-8 sm:py-12 max-w-7xl mx-auto w-full">
        <div
          ref={headerReveal.ref}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-600 text-sm sm:text-base">Welcome back, {user.name || user.email.split("@")[0]}</p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/customers/new"
              className="bg-red-600 text-white px-4 py-2 rounded-full inline-flex items-center justify-center gap-2 btn-hover-effect relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1200 ease-in-out pointer-events-none"></div>
              Add New Customer
            </Link>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div ref={statsReveal.ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-500 text-sm font-medium">Total Customers</div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-2 text-gray-900">1,245</div>
            <div className="flex items-center text-sm">
              <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span className="font-medium">12%</span>
              </div>
              <span className="text-gray-500 ml-2">vs last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-500 text-sm font-medium">Vehicles Sold</div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-xl group-hover:from-green-100 group-hover:to-green-200 transition-all duration-300">
                <Motorcycle className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-2 text-gray-900">87</div>
            <div className="flex items-center text-sm">
              <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span className="font-medium">8%</span>
              </div>
              <span className="text-gray-500 ml-2">vs last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-500 text-sm font-medium">Service Bookings</div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-xl group-hover:from-purple-100 group-hover:to-purple-200 transition-all duration-300">
                <Tool className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-2 text-gray-900">153</div>
            <div className="flex items-center text-sm">
              <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span className="font-medium">15%</span>
              </div>
              <span className="text-gray-500 ml-2">vs last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-500 text-sm font-medium">Parts Sales</div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-3 rounded-xl group-hover:from-yellow-100 group-hover:to-yellow-200 transition-all duration-300">
                <ShoppingBag className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-2 text-gray-900">₹2.4L</div>
            <div className="flex items-center text-sm">
              <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span className="font-medium">5%</span>
              </div>
              <span className="text-gray-500 ml-2">vs last month</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Enhanced Recent Customers */}
          <div
            ref={recentCustomersReveal.ref}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Recent Customers</h2>
                  <p className="text-sm text-gray-500 mt-1">Latest customer registrations</p>
                </div>
                <Link
                  href="/customers"
                  className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-200 group"
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Vehicle
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {recentCustomers.map((customer: any) => (
                    <tr key={customer.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{customer.vehicle}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {new Date(customer.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Enhanced Upcoming Services */}
          <div
            ref={upcomingServicesReveal.ref}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Upcoming Services</h2>
                  <p className="text-sm text-gray-500 mt-1">Scheduled appointments</p>
                </div>
                <Link
                  href="/service"
                  className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-200 group"
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Vehicle
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Schedule
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {upcomingServices.map((service: any) => (
                    <tr key={service.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{service.customer}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{service.vehicle}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm text-gray-900">
                            {new Date(service.date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                            })}
                          </div>
                          <div className="text-sm text-gray-500">{service.time}</div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Enhanced Data Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Sales Chart */}
          <div ref={recentCustomersReveal.ref} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Monthly Sales Performance</h2>
                <p className="text-sm text-gray-500 mt-1">Vehicle sales and revenue trends</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Sales</span>
                <div className="w-3 h-3 bg-blue-500 rounded-full ml-4"></div>
                <span className="text-xs text-gray-600">Revenue</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      fontSize: "14px",
                    }}
                  />
                  <Bar dataKey="sales" fill="#ef4444" radius={[4, 4, 0, 0]} name="Sales" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Service Bookings Trend */}
          <div ref={upcomingServicesReveal.ref} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Service Bookings Trend</h2>
                <p className="text-sm text-gray-500 mt-1">Monthly service appointments</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Bookings</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={serviceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      fontSize: "14px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="services"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: "#10b981" }}
                    name="Service Bookings"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Vehicle Distribution and Revenue Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Vehicle Sales Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Vehicle Distribution</h2>
              <p className="text-sm text-gray-500 mt-1">Sales by model</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vehicleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {vehicleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={vehicleColors[index % vehicleColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      fontSize: "14px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {vehicleData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: vehicleColors[index % vehicleColors.length] }}
                    ></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Performance Overview</h2>
              <p className="text-sm text-gray-500 mt-1">Key metrics comparison</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="serviceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      fontSize: "14px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#ef4444"
                    fillOpacity={1}
                    fill="url(#salesGradient)"
                    strokeWidth={2}
                    name="Sales"
                  />
                  <Area
                    type="monotone"
                    dataKey="services"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#serviceGradient)"
                    strokeWidth={2}
                    name="Services"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
