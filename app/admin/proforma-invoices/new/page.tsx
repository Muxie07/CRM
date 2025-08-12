"use client"

import AdminLayout from "@/components/admin-layout"
import { UniversalInvoiceForm } from "@/components/universal-invoice-form"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import type { DocumentData } from "@/components/universal-invoice-template"
import { clients } from "@/data/clients"

export default function NewProformaInvoicePage() {
  const router = useRouter()
  const { toast } = useToast()

  // Transform clients data to match the expected format
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

  const handleSubmit = (data: DocumentData) => {
    // In a real app, this would be an API call to save the proforma invoice
    console.log("Saving proforma invoice:", data)

    // Show success toast
    toast({
      title: "Success",
      description: `Proforma Invoice ${data.documentNumber} has been created successfully.`,
    })

    // Redirect to the proforma invoices list page
    router.push("/admin/proforma-invoices")
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Proforma Invoice</h1>
        <UniversalInvoiceForm
          documentType="Proforma Invoice"
          clients={clientOptions}
          onSubmit={handleSubmit}
          basePath="/admin/proforma-invoices"
        />
      </div>
    </AdminLayout>
  )
}
