"use client"

import type React from "react"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function NewServiceAppointmentPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    customer: "",
    phone: "",
    vehicle: "",
    date: "",
    time: "",
    serviceType: "Regular Service",
    notes: "",
    technician: "",
    estimatedCost: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.customer.trim()) {
      newErrors.customer = "Customer name is required"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    if (!formData.vehicle.trim()) {
      newErrors.vehicle = "Vehicle information is required"
    }

    if (!formData.date.trim()) {
      newErrors.date = "Date is required"
    }

    if (!formData.time.trim()) {
      newErrors.time = "Time is required"
    }

    if (!formData.technician.trim()) {
      newErrors.technician = "Technician is required"
    }

    if (!formData.estimatedCost.trim()) {
      newErrors.estimatedCost = "Estimated cost is required"
    } else if (isNaN(Number(formData.estimatedCost))) {
      newErrors.estimatedCost = "Estimated cost must be a number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // In a real implementation, you would send this data to your API
      // Simulate API call
      setTimeout(() => {
        // Show success message
        toast({
          title: "Service appointment scheduled",
          description: `Appointment for ${formData.customer} has been scheduled for ${formData.date} at ${formData.time}.`,
        })

        setIsSubmitting(false)
        router.push("/admin/service")
      }, 1000)
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <Link href="/admin/service" className="inline-flex items-center text-gray-600 hover:text-black">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Service Appointments
          </Link>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Schedule New Service Appointment</h1>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="customer" className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name*
                </label>
                <input
                  type="text"
                  id="customer"
                  name="customer"
                  value={formData.customer}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.customer ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.customer && <p className="mt-1 text-sm text-red-600">{errors.customer}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number*
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle*
                </label>
                <input
                  type="text"
                  id="vehicle"
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.vehicle ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g. TVS Apache RTR 160"
                />
                {errors.vehicle && <p className="mt-1 text-sm text-red-600">{errors.vehicle}</p>}
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="Regular Service">Regular Service</option>
                  <option value="Oil Change">Oil Change</option>
                  <option value="Repair">Repair</option>
                  <option value="Inspection">Inspection</option>
                  <option value="Warranty Work">Warranty Work</option>
                </select>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date*
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.date ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  Time*
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.time ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
              </div>

              <div>
                <label htmlFor="technician" className="block text-sm font-medium text-gray-700 mb-1">
                  Technician*
                </label>
                <input
                  type="text"
                  id="technician"
                  name="technician"
                  value={formData.technician}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.technician ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.technician && <p className="mt-1 text-sm text-red-600">{errors.technician}</p>}
              </div>

              <div>
                <label htmlFor="estimatedCost" className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Cost (₹)*
                </label>
                <input
                  type="text"
                  id="estimatedCost"
                  name="estimatedCost"
                  value={formData.estimatedCost}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.estimatedCost ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g. 1200"
                />
                {errors.estimatedCost && <p className="mt-1 text-sm text-red-600">{errors.estimatedCost}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="Any additional information about the service"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Link href="/admin/service" className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
