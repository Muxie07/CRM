"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { ArrowLeft, Edit, Trash2, Download, Upload } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getProductImage } from "@/utils/image-handler"

// Sample product data - in a real app, this would come from an API
const sampleProducts = [
  {
    id: "1",
    description: "Aluminum Compression Terminal - 70mm²",
    itemCode: "85369090",
    modelNumber: "AL70-10",
    brand: "Burndy",
    type: "Aluminum Compression Terminals",
    quantity: 250,
    prices: {
      tier2Price: "95",
      crpEndPrice: "105",
      customerPrice: "120",
    },
    status: "In Stock",
    createdAt: "2023-12-15T10:30:00Z",
    updatedAt: "2023-12-15T10:30:00Z",
    image: "/images/parts/aluminum-terminal-70mm.png",
    images: ["/images/parts/aluminum-terminal-70mm.png", "/images/parts/aluminum-terminal-70mm.png"],
    specifications: [
      { name: "Material", value: "Aluminum" },
      { name: "Size", value: "70mm²" },
      { name: "Stud Size", value: "10mm" },
      { name: "Length", value: "65mm" },
      { name: "Width", value: "25mm" },
      { name: "Weight", value: "45g" },
    ],
  },
  {
    id: "2",
    description: "Copper Compression Terminal - 50mm²",
    itemCode: "85369090",
    modelNumber: "CU50-8",
    brand: "Thomas & Betts",
    type: "Copper Compression Terminals",
    quantity: 320,
    prices: {
      tier2Price: "180",
      crpEndPrice: "195",
      customerPrice: "210",
    },
    status: "In Stock",
    createdAt: "2023-12-05T14:20:00Z",
    updatedAt: "2023-12-05T14:20:00Z",
    image: "/images/parts/copper-terminal-50mm.png",
    images: ["/images/parts/copper-terminal-50mm.png"],
    specifications: [
      { name: "Material", value: "Copper" },
      { name: "Size", value: "50mm²" },
      { name: "Stud Size", value: "8mm" },
      { name: "Length", value: "58mm" },
      { name: "Width", value: "22mm" },
      { name: "Weight", value: "52g" },
    ],
  },
  {
    id: "3",
    description: "Insulated Ring Terminal - Red",
    itemCode: "85366990",
    modelNumber: "IRR-2.5",
    brand: "Panduit",
    type: "Small Terminals",
    quantity: 1200,
    prices: {
      tier2Price: "6",
      crpEndPrice: "7",
      customerPrice: "8",
    },
    status: "In Stock",
    createdAt: "2023-12-10T09:15:00Z",
    updatedAt: "2023-12-10T09:15:00Z",
    image: "/images/parts/insulated-ring-red.png",
    images: ["/images/parts/insulated-ring-red.png"],
    specifications: [
      { name: "Material", value: "Copper with PVC Insulation" },
      { name: "Wire Size", value: "2.5mm²" },
      { name: "Color", value: "Red" },
      { name: "Stud Size", value: "4mm" },
      { name: "Temperature Rating", value: "-10°C to 75°C" },
    ],
  },
  {
    id: "4",
    description: "Mechanical Bolted Connector - T-Type",
    itemCode: "85369090",
    modelNumber: "MBT-150",
    brand: "Hubbell",
    type: "Mechanical Bolted Connectors",
    quantity: 85,
    prices: {
      tier2Price: "320",
      crpEndPrice: "335",
      customerPrice: "350",
    },
    status: "In Stock",
    createdAt: "2023-12-01T11:45:00Z",
    updatedAt: "2023-12-01T11:45:00Z",
    image: "/images/parts/mechanical-t-connector.jpg",
    images: ["/images/parts/mechanical-t-connector.jpg"],
    specifications: [
      { name: "Material", value: "Aluminum Alloy" },
      { name: "Main Conductor Range", value: "50-150mm²" },
      { name: "Tap Conductor Range", value: "16-95mm²" },
      { name: "Bolt Size", value: "M10" },
      { name: "Torque", value: "40 Nm" },
    ],
  },
  {
    id: "5",
    description: "Wedge Clamp Connector - 50-150mm²",
    itemCode: "85369090",
    modelNumber: "WC-50-150",
    brand: "Burndy",
    type: "C-Wedge Connectors",
    quantity: 120,
    prices: {
      tier2Price: "250",
      crpEndPrice: "265",
      customerPrice: "280",
    },
    status: "In Stock",
    createdAt: "2023-11-20T16:30:00Z",
    updatedAt: "2023-11-20T16:30:00Z",
    image: null,
    images: [],
    specifications: [
      { name: "Material", value: "Aluminum Alloy" },
      { name: "Conductor Range", value: "50-150mm²" },
      { name: "Installation", value: "C-Type Wedge" },
      { name: "Application", value: "Overhead Lines" },
      { name: "Standards", value: "IEC 61284" },
    ],
  },
  {
    id: "6",
    description: "Hydraulic Crimping Tool - 16-300mm²",
    itemCode: "84672900",
    modelNumber: "HCT-300",
    brand: "Molex",
    type: "Hydraulic Tools",
    quantity: 8,
    prices: {
      tier2Price: "11500",
      crpEndPrice: "12000",
      customerPrice: "12500",
    },
    status: "In Stock",
    createdAt: "2023-10-25T13:10:00Z",
    updatedAt: "2023-10-25T13:10:00Z",
    image: "/hydraulic-crimper-close-up.png",
    images: ["/hydraulic-crimper-close-up.png"],
    specifications: [
      { name: "Crimping Range", value: "16-300mm²" },
      { name: "Crimping Force", value: "60kN" },
      { name: "Weight", value: "3.8kg" },
      { name: "Length", value: "460mm" },
      { name: "Pressure", value: "700 bar" },
    ],
  },
]

export default function ProductDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("details")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    // In a real app, fetch the product from an API
    const productId = params.id as string

    // Find the product in the sample data
    const foundProduct = sampleProducts.find((p) => p.id === productId)

    if (foundProduct) {
      setProduct(foundProduct)
      setSelectedImage(foundProduct.images?.[0] || foundProduct.image || null)
    } else {
      // Product not found, redirect to inventory list
      router.push("/admin/inventory")
    }

    setLoading(false)
  }, [params.id, router])

  const handleDelete = () => {
    // In a real app, call an API to delete the product
    setShowDeleteModal(false)
    router.push("/admin/inventory")
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6 flex items-center justify-center min-h-screen">
          <div className="animate-pulse">Loading product details...</div>
        </div>
      </AdminLayout>
    )
  }

  if (!product) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Product not found</h3>
            <p className="text-gray-500 mb-4">The product you're looking for doesn't exist or has been removed</p>
            <Link href="/admin/inventory" className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
              Back to Inventory
            </Link>
          </div>
        </div>
      </AdminLayout>
    )
  }

  // Get the main image to display
  const mainImage = selectedImage || getProductImage(product)

  // Get all product images or use placeholder if none
  const productImages = product.images?.length
    ? product.images
    : product.image
      ? [product.image]
      : [getProductImage(product)]

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <Link href="/admin/inventory" className="inline-flex items-center text-gray-600 hover:text-black">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Inventory
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Product Images */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-80 bg-gray-100">
                <Image
                  src={mainImage && mainImage.trim() !== "" ? mainImage : "/placeholder.svg"}
                  alt={product.description || "Product detail"}
                  fill
                  className="object-contain p-4"
                />
              </div>

              {productImages.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {productImages.map((img: string, index: number) => (
                    <button
                      key={index}
                      className={`relative w-16 h-16 border-2 rounded overflow-hidden ${
                        selectedImage === img ? "border-black" : "border-transparent"
                      }`}
                      onClick={() => setSelectedImage(img)}
                    >
                      <Image
                        src={img && img.trim() !== "" ? img : "/placeholder.svg"}
                        alt={`Product image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-2xl font-bold">{product.description}</h1>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/inventory/${product.id}/edit`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.status === "In Stock"
                        ? "bg-green-100 text-green-800"
                        : product.status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.status}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                    {product.type}
                  </span>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                  <nav className="-mb-px flex space-x-8">
                    <button
                      className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "details"
                          ? "border-black text-black"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                      onClick={() => setActiveTab("details")}
                    >
                      Details
                    </button>
                    <button
                      className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "specifications"
                          ? "border-black text-black"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                      onClick={() => setActiveTab("specifications")}
                    >
                      Specifications
                    </button>
                    <button
                      className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "documents"
                          ? "border-black text-black"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                      onClick={() => setActiveTab("documents")}
                    >
                      Documents
                    </button>
                  </nav>
                </div>

                {/* Tab Content */}
                {activeTab === "details" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Basic Information</h3>
                        <dl className="space-y-3">
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Model Number</dt>
                            <dd className="text-sm text-gray-900">{product.modelNumber}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Brand</dt>
                            <dd className="text-sm text-gray-900">{product.brand}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">HSN Code</dt>
                            <dd className="text-sm text-gray-900">{product.itemCode}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Quantity</dt>
                            <dd className="text-sm text-gray-900">{product.quantity}</dd>
                          </div>
                        </dl>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Pricing</h3>
                        <dl className="space-y-3">
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Tier 2 Price</dt>
                            <dd className="text-sm text-gray-900">
                              ₹{Number.parseFloat(product.prices.tier2Price).toLocaleString()}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">CRP End Price</dt>
                            <dd className="text-sm text-gray-900">
                              ₹{Number.parseFloat(product.prices.crpEndPrice).toLocaleString()}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Customer Price</dt>
                            <dd className="text-sm text-gray-900 font-bold">
                              ₹{Number.parseFloat(product.prices.customerPrice).toLocaleString()}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Timestamps</h3>
                      <dl className="space-y-3">
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">Created</dt>
                          <dd className="text-sm text-gray-900">{new Date(product.createdAt).toLocaleString()}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                          <dd className="text-sm text-gray-900">{new Date(product.updatedAt).toLocaleString()}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                )}

                {activeTab === "specifications" && (
                  <div>
                    {product.specifications?.length ? (
                      <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Specification
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Value
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {product.specifications.map((spec: any, index: number) => (
                              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {spec.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{spec.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No specifications available for this product</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "documents" && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Product Documents</h3>
                      <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload Document
                      </button>
                    </div>

                    {/* Sample documents - in a real app, these would come from the product data */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-2 rounded mr-4">
                            <FileText className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Product Datasheet</h4>
                            <p className="text-sm text-gray-500">PDF • 2.4 MB</p>
                          </div>
                        </div>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-green-100 p-2 rounded mr-4">
                            <FileText className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Installation Guide</h4>
                            <p className="text-sm text-gray-500">PDF • 1.8 MB</p>
                          </div>
                        </div>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* If no documents */}
                    {false && (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No documents available for this product</p>
                        <button className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                          Upload First Document
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Product</h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

// FileText component for document icons
function FileText(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  )
}
