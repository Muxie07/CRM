"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

export default function NewPartPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    partNumber: "",
    description: "",
    price: "",
    quantity: "1",
    category: "ELECTRICAL TERMINAL LUGS / POWER CONNECTORS",
    type: "Aluminum Compression Terminals",
    color: "Silver",
    uses: [""],
    location: "",
    minStockLevel: "10",
    supplier: "",
    image: null,
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

  const handleUseChange = (index: number, value: string) => {
    const newUses = [...formData.uses]
    newUses[index] = value
    setFormData((prev) => ({ ...prev, uses: newUses }))
  }

  const addUse = () => {
    setFormData((prev) => ({ ...prev, uses: [...prev.uses, ""] }))
  }

  const removeUse = (index: number) => {
    const newUses = [...formData.uses]
    newUses.splice(index, 1)
    setFormData((prev) => ({ ...prev, uses: newUses.length ? newUses : [""] }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Component name is required"
    }

    if (!formData.partNumber.trim()) {
      newErrors.partNumber = "Part number is required"
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required"
    } else if (isNaN(Number(formData.price))) {
      newErrors.price = "Price must be a number"
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = "Quantity is required"
    } else if (isNaN(Number(formData.quantity))) {
      newErrors.quantity = "Quantity must be a number"
    }

    if (!formData.minStockLevel.trim()) {
      newErrors.minStockLevel = "Minimum stock level is required"
    } else if (isNaN(Number(formData.minStockLevel))) {
      newErrors.minStockLevel = "Minimum stock level must be a number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // In a real implementation, you would send this data to your API
      // const response = await fetch('/api/parts', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      // Simulate API call
      setTimeout(() => {
        // Display success message
        toast({
          title: "Component added successfully",
          description: `${formData.name} has been added to your inventory.`,
        })

        // Redirect to parts list
        setIsSubmitting(false)
        router.push("/parts")
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow px-4 py-8 sm:py-12 max-w-7xl mx-auto w-full">
        <div className="mb-6">
          <Link href="/parts" className="inline-flex items-center text-gray-600 hover:text-black">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Components
          </Link>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Add New Electrical Component</h1>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Component Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g. Aluminum Compression Terminal - 70mm²"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="partNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Part Number*
                </label>
                <input
                  type="text"
                  id="partNumber"
                  name="partNumber"
                  value={formData.partNumber}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.partNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g. ACT-70-10"
                />
                {errors.partNumber && <p className="mt-1 text-sm text-red-600">{errors.partNumber}</p>}
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type*
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="Aluminum Compression Terminals">Aluminum Compression Terminals</option>
                  <option value="Copper Compression Terminals">Copper Compression Terminals</option>
                  <option value="Small Terminals">Small Terminals</option>
                  <option value="Mechanical Bolted Connectors">Mechanical Bolted Connectors</option>
                </select>
              </div>

              <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                  Color*
                </label>
                <select
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="Silver">Silver</option>
                  <option value="Copper">Copper</option>
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Yellow">Yellow</option>
                  <option value="Green">Green</option>
                  <option value="Gray">Gray</option>
                  <option value="Black">Black</option>
                </select>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹)*
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g. 120"
                />
                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
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
                  placeholder="e.g. 100"
                />
                {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
              </div>

              <div>
                <label htmlFor="minStockLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Stock Level*
                </label>
                <input
                  type="text"
                  id="minStockLevel"
                  name="minStockLevel"
                  value={formData.minStockLevel}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.minStockLevel ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g. 20"
                />
                {errors.minStockLevel && <p className="mt-1 text-sm text-red-600">{errors.minStockLevel}</p>}
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Storage Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="e.g. Rack A-12"
                />
              </div>

              <div>
                <label htmlFor="supplier" className="block text-sm font-medium text-gray-700 mb-1">
                  Supplier
                </label>
                <input
                  type="text"
                  id="supplier"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="e.g. ElectroComp Industries"
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Component Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  accept="image/*"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Uses</label>
              {formData.uses.map((use, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={use}
                    onChange={(e) => handleUseChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="e.g. Power Distribution"
                  />
                  <button
                    type="button"
                    onClick={() => removeUse(index)}
                    className="ml-2 p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addUse}
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add another use
              </button>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Enter component description and specifications..."
              ></textarea>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Link href="/parts" className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2">
                      <svg className="animate-spin h-4 w-4 inline-block" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </span>
                    Adding...
                  </>
                ) : (
                  "Add Component"
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
