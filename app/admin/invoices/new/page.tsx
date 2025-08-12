"use client"

import AdminLayout from "@/components/admin-layout"
import { UniversalInvoiceForm } from "@/components/universal-invoice-form"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import type { DocumentData } from "@/components/universal-invoice-template"

// Mock clients data - in a real app, this would come from your API
const clients = [
  {
    id: "client-001",
    name: "Tata Motors Ltd.",
    address: "Bombay House, 24 Homi Mody Street, Mumbai",
    phone: "022-66658282",
    email: "procurement@tatamotors.com",
    gstin: "27AAACT2727Q1ZW",
    state: "Maharashtra",
    stateCode: "27",
  },
  {
    id: "client-002",
    name: "Bharat Electronics",
    address: "Outer Ring Road, Nagavara, Bangalore",
    phone: "080-25039300",
    email: "info@bel.co.in",
    gstin: "29AAACB1361L1ZB",
    state: "Karnataka",
    stateCode: "29",
  },
  {
    id: "client-003",
    name: "DIAC ENGINEERING",
    address: "C-124, MMDA Colony\nArumbakkam, Chennai - 600 106",
    phone: "+9144 46902054",
    email: "diacengineering@gmail.com",
    gstin: "33AAWFD9550G1Z1",
    state: "Tamil Nadu",
    stateCode: "33",
  },
]

export default function NewInvoicePage() {
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = (data: DocumentData) => {
    // In a real app, this would be an API call to save the invoice
    console.log("Saving invoice:", data)

    // Show success toast
    toast({
      title: "Success",
      description: `Invoice ${data.documentNumber} has been created successfully.`,
    })

    // Redirect to the invoices list page
    router.push("/admin/invoices")
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Tax Invoice</h1>
        <UniversalInvoiceForm
          documentType="Tax Invoice"
          clients={clients}
          onSubmit={handleSubmit}
          basePath="/admin/invoices"
        />
      </div>
    </AdminLayout>
  )
}
