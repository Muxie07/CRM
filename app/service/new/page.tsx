"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/providers"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewServicePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [customers, setCustomers] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState("")
  const [customerVehicles, setCustomerVehicles] = useState([])
  const [formData, setFormData] = useState({
    customerId: "",
    vehicleId: "",
    serviceDate: "",
    serviceTime: "",
    serviceType: "",
    description: "",
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else {
      // Fetch customers data
      const customersData = [
        {
          id: "1",
          name: "Rajesh Kumar",
          phone: "9876543210",
          vehicles: [{ id: "v1", model: "TVS Apache RTR 160", registrationNumber: "TN01AB1234" }],
        },
        {
          id: "2",
          name: "Priya Sharma",
          phone: "9876543211",
          vehicles: [{ id: "v2", model: "TVS Jupiter", registrationNumber: "TN01CD5678" }],
        },
        {
          id: "3",
          name: "Vikram Singh",
          phone: "9876543212",
          vehicles: [{ id: "v3", model: "TVS Ntorq", registrationNumber: "TN01EF9012" }],
        },
      ]
      setCustomers(customersData)
    }
  }, [user, isLoading, router])

  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const customerId = e.target.value
    setSelectedCustomer(customerId)
    setFormData((prev) => ({ ...prev, customerId }))

    // Find customer's vehicles
    const customer = customers.find((c: any) => c.id === customerId)
    if (customer) {
      setCustomerVehicles(customer.vehicles)
      // Reset vehicle selection
      setFormData((prev) => ({ ...prev, vehicleId: "" }))
    } else {
      setCustomerVehicles([])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSuccess(true)

      // Redirect after success
      setTimeout(() => {
        router.push("/service")
      }, 2000)
    }, 1000)
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow px-4 py-8 sm:py-12 max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <Link href="/service" className="inline-flex items-center text-gray-600 hover:text-black">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Service
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-8">Schedule New Service Appointment</h1>

        {success && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
            Service appointment scheduled successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <div className="space-y-6">
            <div>
              <label htmlFor="customerId" className="block text-sm font-medium text-gray-700 mb-1">
                Select Customer*
              </label>
              <select
                id="customerId"
                name="customerId"
                value={formData.customerId}
                onChange={handleCustomerChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                required
              >
                <option value="">Select a customer</option>
                {customers.map((customer: any) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} ({customer.phone})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="vehicleId" className="block text-sm font-medium text-gray-700 mb-1">
                Select Vehicle*
              </label>
              <select
                id="vehicleId"
                name="vehicleId"
                value={formData.vehicleId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                required
                disabled={!selectedCustomer}
              >
                <option value="">Select a vehicle</option>
                {customerVehicles.map((vehicle: any) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.model} ({vehicle.registrationNumber})
                  </option>
                ))}
              </select>
              {!selectedCustomer && <p className="text-sm text-gray-500 mt-1">Please select a customer first</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="serviceDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Service Date*
                </label>
                <input
                  type="date"
                  id="serviceDate"
                  name="serviceDate"
                  value={formData.serviceDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="serviceTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Service Time*
                </label>
                <select
                  id="serviceTime"
                  name="serviceTime"
                  value={formData.serviceTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                  required
                >
                  <option value="">Select a time</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
                Service Type*
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                required
              >
                <option value="">Select service type</option>
                <option value="Regular Service">Regular Service</option>
                <option value="Oil Change">Oil Change</option>
                <option value="Repair">Repair</option>
                <option value="Warranty Service">Warranty Service</option>
                <option value="Inspection">Inspection</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description / Notes
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe the service needed or add any special instructions"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-red-600 text-white rounded-full font-medium disabled:opacity-70"
              >
                {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
              </button>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
