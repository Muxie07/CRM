"use client"

import type React from "react"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Search, Download, Plus, Edit, CheckCircle, XCircle, MoreHorizontal, Filter } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock data for service appointments
const serviceData = [
  {
    id: "1",
    customer: "Rajesh Kumar",
    phone: "9876543210",
    vehicle: "TVS Apache RTR 160",
    date: "2023-05-20",
    time: "10:00 AM",
    serviceType: "Regular Service",
    status: "Scheduled",
    notes: "First service after purchase",
    technician: "Ganesh M",
    estimatedCost: 1200,
  },
  {
    id: "2",
    customer: "Priya Sharma",
    phone: "9876543211",
    vehicle: "TVS Jupiter",
    date: "2023-05-21",
    time: "11:30 AM",
    serviceType: "Oil Change",
    status: "Scheduled",
    notes: "",
    technician: "Ramesh K",
    estimatedCost: 800,
  },
  {
    id: "3",
    customer: "Vikram Singh",
    phone: "9876543212",
    vehicle: "TVS Ntorq",
    date: "2023-05-22",
    time: "02:00 PM",
    serviceType: "Repair",
    status: "Scheduled",
    notes: "Brake issue",
    technician: "Suresh L",
    estimatedCost: 1500,
  },
  {
    id: "4",
    customer: "Ananya Desai",
    phone: "9876543213",
    vehicle: "TVS Apache RTR 160",
    date: "2023-05-18",
    time: "09:30 AM",
    serviceType: "Regular Service",
    status: "Completed",
    notes: "",
    technician: "Ganesh M",
    estimatedCost: 1200,
  },
  {
    id: "5",
    customer: "Rahul Sharma",
    phone: "9876543214",
    vehicle: "TVS Jupiter",
    date: "2023-05-19",
    time: "03:00 PM",
    serviceType: "Repair",
    status: "Completed",
    notes: "Engine tuning",
    technician: "Ramesh K",
    estimatedCost: 2200,
  },
]

export default function AdminServicePage() {
  const router = useRouter()
  const [services, setServices] = useState(serviceData)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Filter services based on search query
    const filteredServices = serviceData.filter(
      (service) =>
        service.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.phone.includes(searchQuery) ||
        service.vehicle.toLowerCase().includes(searchQuery) ||
        service.serviceType.toLowerCase().includes(searchQuery),
    )
    setServices(filteredServices)
  }

  const handleExport = () => {
    // Create CSV content
    const headers = [
      "ID",
      "Customer",
      "Phone",
      "Vehicle",
      "Date",
      "Time",
      "Service Type",
      "Status",
      "Technician",
      "Estimated Cost",
    ]
    const csvContent = [
      headers.join(","),
      ...services.map((service) =>
        [
          service.id,
          service.customer,
          service.phone,
          service.vehicle,
          service.date,
          service.time,
          service.serviceType,
          service.status,
          service.technician,
          service.estimatedCost,
        ].join(","),
      ),
    ].join("\n")

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "service_appointments.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleStatusChange = (serviceId: string, newStatus: string) => {
    setServices(services.map((service) => (service.id === serviceId ? { ...service, status: newStatus } : service)))
  }

  const filterServicesByTab = (tab: string) => {
    setActiveTab(tab)
    if (tab === "all") {
      setServices(serviceData)
    } else {
      setServices(serviceData.filter((service) => service.status.toLowerCase() === tab))
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Service Management</h1>
          <Link
            href="/admin/service/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            New Appointment
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
            <form onSubmit={handleSearch} className="relative flex-1">
              <input
                type="text"
                placeholder="Search appointments..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </form>
            <div className="flex gap-2">
              <button
                onClick={() => router.push("/admin/service/filter")}
                className="px-4 py-2 border rounded-md flex items-center gap-2 hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                Filter
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

          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-4">
              <button
                onClick={() => filterServicesByTab("all")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "all"
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                All
              </button>
              <button
                onClick={() => filterServicesByTab("scheduled")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "scheduled"
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Scheduled
              </button>
              <button
                onClick={() => filterServicesByTab("completed")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "completed"
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Completed
              </button>
            </nav>
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
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Technician
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{service.customer}</div>
                      <div className="text-sm text-gray-500">{service.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{service.vehicle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(service.date).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-500">{service.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{service.serviceType}</div>
                      {service.notes && <div className="text-xs text-gray-500">{service.notes}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          service.status === "Scheduled"
                            ? "bg-blue-100 text-blue-800"
                            : service.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {service.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{service.technician}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => router.push(`/admin/service/${service.id}`)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {service.status === "Scheduled" && (
                          <>
                            <button
                              onClick={() => handleStatusChange(service.id, "Completed")}
                              className="text-green-600 hover:text-green-900"
                              title="Mark as completed"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(service.id, "Cancelled")}
                              className="text-red-600 hover:text-red-900"
                              title="Cancel appointment"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button className="text-gray-600 hover:text-gray-900">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{services.length}</span> of{" "}
              <span className="font-medium">{serviceData.length}</span> appointments
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded-md text-sm disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border rounded-md text-sm bg-black text-white">1</button>
              <button className="px-3 py-1 border rounded-md text-sm">2</button>
              <button className="px-3 py-1 border rounded-md text-sm">Next</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
