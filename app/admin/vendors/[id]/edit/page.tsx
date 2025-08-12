"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { VendorForm } from "@/components/vendor-form"
import { toast } from "@/components/ui/use-toast"
import type { Vendor } from "@/types/vendor"
import { vendors as initialVendors } from "@/data/vendors" // Import existing vendors
import { Loader2 } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function EditVendorPage() {
  const params = useParams()
  const router = useRouter()
  const vendorId = params.id as string
  const [vendor, setVendor] = useState<Vendor | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchVendor = () => {
      const foundVendor = initialVendors.find((v) => v.id === vendorId)
      if (foundVendor) {
        setVendor(foundVendor)
      } else {
        toast({
          title: "Vendor Not Found",
          description: `No vendor found with ID: ${vendorId}`,
          variant: "destructive",
        })
        router.push("/admin/vendors")
      }
      setLoading(false)
    }
    fetchVendor()
  }, [vendorId, router])

  const handleSubmit = (updatedVendorData: Vendor) => {
    setIsSubmitting(true)
    // Simulate API call to update vendor
    setTimeout(() => {
      const index = initialVendors.findIndex((v) => v.id === updatedVendorData.id)
      if (index !== -1) {
        initialVendors[index] = updatedVendorData // Update in-memory data for demonstration
      }
      toast({
        title: "Vendor Updated",
        description: `Vendor ${updatedVendorData.companyName} has been successfully updated.`,
      })
      router.push(`/admin/vendors/${updatedVendorData.id}`)
      setIsSubmitting(false)
    }, 1500)
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </AdminLayout>
    )
  }

  if (!vendor) {
    return null // Should not happen due to redirect, but for type safety
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <Link href={`/admin/vendors/${vendor.id}`} className="inline-flex items-center text-gray-600 hover:text-black">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Vendor Details
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6">Edit Vendor: {vendor.companyName}</h1>
        <VendorForm initialData={vendor} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </AdminLayout>
  )
}
