"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import AdminLayout from "@/components/admin-layout"
import { VendorForm } from "@/components/vendor-form"
import type { Vendor } from "@/types/vendor"
import { vendors as initialVendors } from "@/data/vendors" // Import existing vendors

export default function NewVendorPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (newVendorData: Vendor) => {
    setIsSubmitting(true)
    // Simulate API call to add new vendor
    setTimeout(() => {
      const newId = `vendor-${(initialVendors.length + 1).toString().padStart(3, "0")}`
      const vendorToAdd = { ...newVendorData, id: newId }
      initialVendors.push(vendorToAdd) // Add to in-memory data for demonstration
      toast({
        title: "Vendor Added",
        description: `Vendor ${newVendorData.companyName} has been successfully added.`,
      })
      router.push("/admin/vendors")
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <Link href="/admin/vendors" className="inline-flex items-center text-gray-600 hover:text-black">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Vendors
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add New Vendor</CardTitle>
          </CardHeader>
          <CardContent>
            <VendorForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
