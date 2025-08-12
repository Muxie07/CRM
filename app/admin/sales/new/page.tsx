"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function NewSalePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    productDetails: "",
    quantity: "1",
    unitPrice: "",
    totalAmount: "",
    paymentMethod: "Bank Transfer",
    salesperson: "",
    notes: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Update form data
    setFormData((prev) => {
      const newData = { ...prev, [name]: value }

      // Calculate total amount if both quantity and unit price are set
      if (name === "quantity" || name === "unitPrice") {
        const quantity = name === "quantity" ? Number.parseFloat(value) || 0 : Number.parseFloat(prev.quantity) || 0
        const unitPrice = name === "unitPrice" ? Number.parseFloat(value) || 0 : Number.parseFloat(prev.unitPrice) || 0

        if (quantity && unitPrice) {
          newData.totalAmount = (quantity * unitPrice).toString()
        }
      }

      return newData
    })

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

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Customer name is required"
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = "Phone number is required"
    }

    if (!formData.productDetails.trim()) {
      newErrors.productDetails = "Product details are required"
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = "Quantity is required"
    } else if (isNaN(Number(formData.quantity)) || Number(formData.quantity) <= 0) {
      newErrors.quantity = "Quantity must be a positive number"
    }

    if (!formData.unitPrice.trim()) {
      newErrors.unitPrice = "Unit price is required"
    } else if (isNaN(Number(formData.unitPrice)) || Number(formData.unitPrice) <= 0) {
      newErrors.unitPrice = "Unit price must be a positive number"
    }

    if (!formData.salesperson.trim()) {
      newErrors.salesperson = "Salesperson is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Add toast notification for successful sale creation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        // Show success message
        toast({
          title: "Sale recorded successfully",
          description: `Sale of ${formData.productDetails} to ${formData.customerName} has been recorded.`,
        })

        setIsSubmitting(false)
        router.push("/admin/sales")
      }, 1000)
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <Link href="/admin/sales" className="inline-flex items-center text-gray-600 hover:text-black">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sales
          </Link>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Record New Sale</h1>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name*
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.customerName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.customerName && <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>}
              </div>

              <div>
                <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Phone*
                </label>
                <input
                  type="text"
                  id="customerPhone"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.customerPhone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.customerPhone && <p className="mt-1 text-sm text-red-600">{errors.customerPhone}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="productDetails" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Details*
                </label>
                <input
                  type="text"
                  id="productDetails"
                  name="productDetails"
                  value={formData.productDetails}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.productDetails ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g. Aluminum Terminals 240mm (50 units)"
                />
                {errors.productDetails && <p className="mt-1 text-sm text-red-600">{errors.productDetails}</p>}
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity*
                </label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.quantity ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
              </div>

              <div>
                <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Unit Price (₹)*
                </label>
                <input
                  type="text"
                  id="unitPrice"
                  name="unitPrice"
                  value={formData.unitPrice}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.unitPrice ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.unitPrice && <p className="mt-1 text-sm text-red-600">{errors.unitPrice}</p>}
              </div>

              <div>
                <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700 mb-1">
                  Total Amount (₹)
                </label>
                <input
                  type="text"
                  id="totalAmount"
                  name="totalAmount"
                  value={formData.totalAmount}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method*
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Credit Card">Credit Card</option>
                </select>
              </div>

              <div>
                <label htmlFor="salesperson" className="block text-sm font-medium text-gray-700 mb-1">
                  Salesperson*
                </label>
                <input
                  type="text"
                  id="salesperson"
                  name="salesperson"
                  value={formData.salesperson}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.salesperson ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.salesperson && <p className="mt-1 text-sm text-red-600">{errors.salesperson}</p>}
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
                  placeholder="Any additional information about the sale"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Link href="/admin/sales" className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? "Recording..." : "Record Sale"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
