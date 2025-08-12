"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/providers"
import Header from "@/components/header"
import Footer from "@/components/footer"
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  BikeIcon as Motorcycle,
  PenToolIcon as Tool,
  CheckCircle,
  XCircle,
} from "lucide-react"
import Link from "next/link"

export default function ServicePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [appointments, setAppointments] = useState([])
  const [filteredAppointments, setFilteredAppointments] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    status: "",
    date: "",
    serviceType: "",
  })
  const [activeTab, setActiveTab] = useState("upcoming")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else {
      // Fetch service appointments data
      const appointmentsData = [
        {
          id: 1,
          customer: "Rajesh Kumar",
          phone: "9876543210",
          vehicle: "TVS Apache RTR 160",
          date: "2023-05-20",
          time: "10:00 AM",
          serviceType: "Regular Service",
          status: "Scheduled",
          notes: "First service after purchase",
        },
        {
          id: 2,
          customer: "Priya Sharma",
          phone: "9876543211",
          vehicle: "TVS Jupiter",
          date: "2023-05-21",
          time: "11:30 AM",
          serviceType: "Oil Change",
          status: "Scheduled",
          notes: "",
        },
        {
          id: 3,
          customer: "Vikram Singh",
          phone: "9876543212",
          vehicle: "TVS Ntorq",
          date: "2023-05-22",
          time: "02:00 PM",
          serviceType: "Repair",
          status: "Scheduled",
          notes: "Brake issue",
        },
        {
          id: 4,
          customer: "Ananya Desai",
          phone: "9876543213",
          vehicle: "TVS Apache RTR 160",
          date: "2023-05-18",
          time: "09:30 AM",
          serviceType: "Regular Service",
          status: "Completed",
          notes: "",
        },
        {
          id: 5,
          customer: "Rahul Sharma",
          phone: "9876543214",
          vehicle: "TVS Jupiter",
          date: "2023-05-19",
          time: "03:00 PM",
          serviceType: "Repair",
          status: "Completed",
          notes: "Engine tuning",
        },
        {
          id: 6,
          customer: "Neha Gupta",
          phone: "9876543215",
          vehicle: "TVS Ntorq",
          date: "2023-05-17",
          time: "01:00 PM",
          serviceType: "Regular Service",
          status: "Cancelled",
          notes: "Customer rescheduling",
        },
      ]
      setAppointments(appointmentsData)
      filterAppointmentsByTab(appointmentsData, activeTab)
    }
  }, [user, isLoading, router, activeTab])

  const filterAppointmentsByTab = (data: any[], tab: string) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let filtered
    switch (tab) {
      case "upcoming":
        filtered = data.filter(
          (appointment) => appointment.status === "Scheduled" && new Date(appointment.date) >= today,
        )
        break
      case "completed":
        filtered = data.filter((appointment) => appointment.status === "Completed")
        break
      case "cancelled":
        filtered = data.filter((appointment) => appointment.status === "Cancelled")
        break
      default:
        filtered = data
    }
    setFilteredAppointments(filtered)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    filterAppointments(searchQuery, filters)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    const newFilters = { ...filters, [name]: value }
    setFilters(newFilters)
    filterAppointments(searchQuery, newFilters)
  }

  const filterAppointments = (query: string, filterCriteria: typeof filters) => {
    let results = [...appointments]

    // First filter by tab
    filterAppointmentsByTab(results, activeTab)
    results = [...filteredAppointments]

    // Apply text search
    if (query) {
      const lowerQuery = query.toLowerCase()
      results = results.filter(
        (appointment: any) =>
          appointment.customer.toLowerCase().includes(lowerQuery) ||
          appointment.phone.includes(lowerQuery) ||
          appointment.vehicle.toLowerCase().includes(lowerQuery),
      )
    }

    // Apply filters
    if (filterCriteria.status && filterCriteria.status !== "all") {
      results = results.filter((appointment: any) => appointment.status === filterCriteria.status)
    }
    if (filterCriteria.date) {
      results = results.filter((appointment: any) => appointment.date.includes(filterCriteria.date))
    }
    if (filterCriteria.serviceType) {
      results = results.filter((appointment: any) => appointment.serviceType === filterCriteria.serviceType)
    }

    setFilteredAppointments(results)
  }

  const resetFilters = () => {
    setFilters({
      status: "",
      date: "",
      serviceType: "",
    })
    setSearchQuery("")
    filterAppointmentsByTab(appointments, activeTab)
  }

  const handleStatusChange = (appointmentId: number, newStatus: string) => {
    // In a real app, this would call an API to update the appointment status
    const updatedAppointments = appointments.map((appointment: any) =>
      appointment.id === appointmentId ? { ...appointment, status: newStatus } : appointment,
    )
    setAppointments(updatedAppointments)
    filterAppointmentsByTab(updatedAppointments, activeTab)
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  // Get unique service types for filter dropdown
  const serviceTypes = Array.from(new Set(appointments.map((appointment: any) => appointment.serviceType)))

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow px-4 py-8 sm:py-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Service Management</h1>
            <p className="text-gray-600 text-sm">Schedule and manage service appointments</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <form onSubmit={handleSearch} className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </button>
            </form>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filters</span>
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
                  Service Type
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={filters.serviceType}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                >
                  <option value="">All Types</option>
                  {serviceTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={filters.date}
                  onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-6">
          <Link
            href="/service/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            New Appointment
          </Link>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "upcoming"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "completed"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveTab("cancelled")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "cancelled"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Cancelled
            </button>
          </nav>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Customer
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                  >
                    Vehicle
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date & Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                  >
                    Service Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No appointments found. Try adjusting your search or filters.
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appointment: any) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{appointment.customer}</div>
                            <div className="text-sm text-gray-500">{appointment.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                        <div className="flex items-center">
                          <Motorcycle className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-sm text-gray-900">{appointment.vehicle}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="text-sm text-gray-900 flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            {new Date(appointment.date).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-gray-400" />
                            {appointment.time}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <div className="flex items-center">
                          <Tool className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-sm text-gray-900">{appointment.serviceType}</span>
                        </div>
                        {appointment.notes && <div className="text-xs text-gray-500 mt-1">{appointment.notes}</div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            appointment.status === "Scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : appointment.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-3 justify-end">
                          <Link href={`/service/${appointment.id}`} className="text-indigo-600 hover:text-indigo-900">
                            View
                          </Link>
                          {appointment.status === "Scheduled" && (
                            <>
                              <button
                                onClick={() => handleStatusChange(appointment.id, "Completed")}
                                className="text-green-600 hover:text-green-900"
                                title="Mark as completed"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleStatusChange(appointment.id, "Cancelled")}
                                className="text-red-600 hover:text-red-900"
                                title="Cancel appointment"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
