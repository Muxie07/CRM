"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/providers"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewCustomerPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "",
    vehicleType: "",
    vehicleModel: "",
    chassisNumber: "",
    engineNumber: "",
    purchaseDate: "",
    dealerNotes: "",
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real implementation, you would send this data to your API
    // Simulate API call
    setTimeout(() => {
      // Show success message
      setSuccess(true)
      setIsSubmitting(false)

      // Redirect after success
      setTimeout(() => {
        router.push("/customers")
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

      <main className="flex-grow px-4 py-8 sm:py-12 max-w-6xl mx-auto w-full">
        <div className="mb-8">
          <Link href="/customers" className="inline-flex items-center text-gray-600 hover:text-black">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Customers
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-8">Add New Customer</h1>

        {success && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
            Customer added successfully! Redirecting to customers list...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Customer Information */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Customer Information</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number*
                  </label>
                  <div className="flex">
                    <select className="px-3 py-2 border border-gray-300 rounded-l-md">
                      <option>India (+91)</option>
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className="w-full px-3 py-2 border border-gray-300 rounded-r-md"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address*
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="123 Main St, Apartment 4B"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City*
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Chennai"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State*
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Tamil Nadu"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode*
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="600049"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Electrical Item Information */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Electrical Item Information</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-1">
                    Item Type*
                  </label>
                  <select
                    id="vehicleType"
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Item Type</option>
                    <option value="Connector">Connector</option>
                    <option value="Terminal">Terminal</option>
                    <option value="Tool">Tool</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-700 mb-1">
                    Item Model*
                  </label>
                  <select
                    id="vehicleModel"
                    name="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Model</option>
                    <option value="Aluminum Terminal 70mm">Aluminum Terminal 70mm</option>
                    <option value="Copper Terminal 95mm">Copper Terminal 95mm</option>
                    <option value="Insulated Ring Red">Insulated Ring Red</option>
                    <option value="Mechanical T-Connector">Mechanical T-Connector</option>
                    <option value="Parallel Groove Connector">Parallel Groove Connector</option>
                    <option value="C-Wedge Connector">C-Wedge Connector</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="chassisNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Serial Number*
                  </label>
                  <input
                    type="text"
                    id="chassisNumber"
                    name="chassisNumber"
                    value={formData.chassisNumber}
                    onChange={handleChange}
                    placeholder="SN12345678"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="engineNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Batch Number*
                  </label>
                  <input
                    type="text"
                    id="engineNumber"
                    name="engineNumber"
                    value={formData.engineNumber}
                    onChange={handleChange}
                    placeholder="BTC12345"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Purchase Date*
                  </label>
                  <input
                    type="date"
                    id="purchaseDate"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="dealerNotes" className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    id="dealerNotes"
                    name="dealerNotes"
                    value={formData.dealerNotes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any additional information about the customer or item"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-red-600 text-white rounded-full font-medium disabled:opacity-70"
            >
              {isSubmitting ? "Adding Customer..." : "Add Customer"}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
