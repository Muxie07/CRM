"use client"

import AdminLayout from "@/components/admin-layout"
import { UniversalInvoiceForm } from "@/components/universal-invoice-form"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import type { DocumentData } from "@/components/universal-invoice-template"
import { clients } from "@/data/clients"
import { vendors } from "@/data/vendors"

export default function NewPurchaseOrderPage() {
  const router = useRouter()
  const { toast } = useToast()

  // Transform clients and vendors data to match the expected format
  const clientOptions = clients.map((client) => ({
    id: client.id,
    name: client.company_name,
    address: client.address,
    phone: client.phone,
    email: client.email,
    gstin: client.gst_number,
    state: client.state,
    stateCode: client.state_code || "33",
  }))

  const supplierOptions = vendors.map((vendor) => ({
    id: vendor.id,
    name: vendor.company_name,
    address: vendor.address,
    email: vendor.email,
    gstin: vendor.gst_number,
    state: vendor.state,
    stateCode: vendor.state_code || "33",
  }))

  const handleSubmit = (data: DocumentData) => {
    // In a real app, this would be an API call to save the purchase order
    console.log("Saving purchase order:", data)

    // Show success toast
    toast({
      title: "Success",
      description: `Purchase Order ${data.documentNumber} has been created successfully.`,
    })

    // Redirect to the purchase orders list page
    router.push("/admin/purchase-orders")
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Purchase Order</h1>
        <UniversalInvoiceForm
          documentType="Purchase Order"
          clients={clientOptions}
          suppliers={supplierOptions}
          onSubmit={handleSubmit}
          basePath="/admin/purchase-orders"
        />
      </div>
    </AdminLayout>
  )
}
