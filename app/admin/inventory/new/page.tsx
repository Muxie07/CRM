"use client"

import type React from "react"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ProductImageUploader } from "@/components/product-image-uploader"
import { toast } from "@/components/ui/use-toast"

interface ProductImage {
  id: string
  url: string
  file?: File
  isPrimary: boolean
}

export default function NewInventoryItemPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    description: "",
    itemCode: "",
    modelNumber: "",
    brand: "",
    type: "Electrical Terminal Lugs",
    quantity: "1",
    prices: {
      tier2Price: "",
      crpEndPrice: "",
      customerPrice: "",
    },
    status: "In Stock",
  })
  const [productImages, setProductImages] = useState<ProductImage[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Handle nested price fields
    if (name.startsWith("price.")) {
      const priceField = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        prices: {
          ...prev.prices,
          [priceField]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleImagesChange = (images: ProductImage[]) => {
    setProductImages(images)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.modelNumber.trim()) {
      newErrors.modelNumber = "Model number is required"
    }

    if (!formData.brand.trim()) {
      newErrors.brand = "Brand is required"
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = "Quantity is required"
    } else if (isNaN(Number(formData.quantity)) || Number(formData.quantity) < 0) {
      newErrors.quantity = "Quantity must be a positive number"
    }

    if (!formData.prices.customerPrice.trim()) {
      newErrors["price.customerPrice"] = "Customer price is required"
    } else if (isNaN(Number(formData.prices.customerPrice))) {
      newErrors["price.customerPrice"] = "Customer price must be a number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      try {
        // In a real implementation, you would:
        // 1. Upload images to storage service
        // 2. Create the product with the image URLs in your database

        // For now, we'll simulate this process
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Show success message
        toast({
          title: "Product added successfully",
          description: `${formData.description} has been added to your inventory.`,
        })

        router.push("/admin/inventory")
      } catch (error) {
        console.error("Error adding product:", error)
        toast({
          title: "Error adding product",
          description: "There was an error adding the product. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  // Get primary image URL or null if no images
  const getPrimaryImageUrl = (): string | null => {
    const primaryImage = productImages.find((img) => img.isPrimary)
    return primaryImage ? primaryImage.url : null
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <Link href="/admin/inventory" className="inline-flex items-center text-gray-600 hover:text-black">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Inventory
          </Link>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Add New Inventory Item</h1>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description*
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g. Aluminum Compression Terminal - 70mm²"
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>

              <div>
                <label htmlFor="itemCode" className="block text-sm font-medium text-gray-700 mb-1">
                  HSN Code
                </label>
                <input
                  type="text"
                  id="itemCode"
                  name="itemCode"
                  value={formData.itemCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="e.g. 85369090"
                />
              </div>

              <div>
                <label htmlFor="modelNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Model Number*
                </label>
                <input
                  type="text"
                  id="modelNumber"
                  name="modelNumber"
                  value={formData.modelNumber}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.modelNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g. AL70-10"
                />
                {errors.modelNumber && <p className="mt-1 text-sm text-red-600">{errors.modelNumber}</p>}
              </div>

              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                  Brand*
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.brand ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g. Burndy"
                />
                {errors.brand && <p className="mt-1 text-sm text-red-600">{errors.brand}</p>}
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
                  <optgroup label="Electrical Terminal Lugs / Power Connectors">
                    <option value="Aluminum Compression Terminals">Aluminum Compression Terminals</option>
                    <option value="Copper Compression Terminals">Copper Compression Terminals</option>
                    <option value="Small Terminals">Small Terminals</option>
                    <option value="Mechanical Bolted Connectors">Mechanical Bolted Connectors</option>
                  </optgroup>
                  <optgroup label="Overhead Distribution Connectors">
                    <option value="C-Wedge Connectors">C-Wedge Connectors</option>
                    <option value="Parallel Groove Connectors">Parallel Groove Connectors</option>
                    <option value="P-Tap Connectors">P-Tap Connectors</option>
                  </optgroup>
                  <optgroup label="Mechanical & Powered Tools">
                    <option value="Crimping & Cutting Tools">Crimping & Cutting Tools</option>
                    <option value="Hydraulic Tools">Hydraulic Tools</option>
                    <option value="Pneumatic Tools">Pneumatic Tools</option>
                  </optgroup>
                  <optgroup label="Grounding Connectors">
                    <option value="Rod Clamps">Rod Clamps</option>
                    <option value="Grounding Lugs">Grounding Lugs</option>
                    <option value="Exothermic Welding">Exothermic Welding</option>
                  </optgroup>
                  <optgroup label="Networking">
                    <option value="Connectors">Connectors</option>
                    <option value="Fiber Optics">Fiber Optics</option>
                    <option value="Patch Panels">Patch Panels</option>
                  </optgroup>
                  <optgroup label="Unified Communication">
                    <option value="Conference Systems">Conference Systems</option>
                    <option value="Headsets">Headsets</option>
                    <option value="Video Systems">Video Systems</option>
                  </optgroup>
                </select>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status*
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
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
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium mb-4">Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="price.tier2Price" className="block text-sm font-medium text-gray-700 mb-1">
                    Tier 2 Price (₹)
                  </label>
                  <input
                    type="text"
                    id="price.tier2Price"
                    name="price.tier2Price"
                    value={formData.prices.tier2Price}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="e.g. 85.00"
                  />
                </div>

                <div>
                  <label htmlFor="price.crpEndPrice" className="block text-sm font-medium text-gray-700 mb-1">
                    CRP End Price (₹)
                  </label>
                  <input
                    type="text"
                    id="price.crpEndPrice"
                    name="price.crpEndPrice"
                    value={formData.prices.crpEndPrice}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="e.g. 95.00"
                  />
                </div>

                <div>
                  <label htmlFor="price.customerPrice" className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Price (₹)*
                  </label>
                  <input
                    type="text"
                    id="price.customerPrice"
                    name="price.customerPrice"
                    value={formData.prices.customerPrice}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                      errors["price.customerPrice"] ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="e.g. 120.00"
                  />
                  {errors["price.customerPrice"] && (
                    <p className="mt-1 text-sm text-red-600">{errors["price.customerPrice"]}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium mb-4">Product Images</h3>
              <ProductImageUploader initialImages={productImages} onChange={handleImagesChange} />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
              <Link href="/admin/inventory" className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
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
                  "Add Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
