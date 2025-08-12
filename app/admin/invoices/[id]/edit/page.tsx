"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { InvoiceForm } from "@/components/invoice-form"
import type { Invoice } from "@/types/invoice"
import { useParams, useRouter } from "next/navigation"
import { invoicesData } from "@/data/invoices"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

// Mock data for customers and vehicles
const mockCustomers = [
  {
    id: "CUST-001",
    name: "Rajesh Kumar",
    phone: "9876543210",
    email: "rajesh.kumar@example.com",
    address: "123 Main Street, Bangalore, Karnataka",
  },
  {
    id: "CUST-002",
    name: "Priya Sharma",
    phone: "9876543211",
    email: "priya.sharma@example.com",
    address: "456 Park Avenue, Chennai, Tamil Nadu",
  },
  {
    id: "CUST-003",
    name: "Vikram Singh",
    phone: "9876543212",
    email: "vikram.singh@example.com",
    address: "789 Lake View, Mumbai, Maharashtra",
  },
]

const mockVehicles = [
  {
    id: "VEH-001",
    model: "TVS Apache RTR 160",
    registration: "KA-01-AB-1234",
  },
  {
    id: "VEH-002",
    model: "TVS Jupiter",
    registration: "TN-02-CD-5678",
  },
  {
    id: "VEH-003",
    model: "TVS Ntorq",
    registration: "MH-03-EF-9012",
  },
  {
    id: "VEH-004",
    model: "TVS Apache RTR 200",
    registration: "TS-04-GH-3456",
  },
]

export default function EditInvoicePage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchInvoice = () => {
      setLoading(true)
      const foundInvoice = invoicesData.find((inv) => inv.id === params.id)
      setInvoice(foundInvoice || null)
      setLoading(false)
    }

    fetchInvoice()
  }, [params.id])

  const handleSubmit = (updatedInvoice: Invoice) => {
    // In a real app, this would be an API call to update the invoice
    console.log("Updating invoice:", updatedInvoice)

    toast({
      title: "Success",
      description: `Invoice ${updatedInvoice.invoiceNumber} updated successfully.`,
    })

    // Redirect to the invoice detail page
    router.push(`/admin/invoices/${params.id}`)
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (!invoice) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Invoice Not Found</h2>
            <p className="text-gray-500 mb-4">The invoice you are looking for does not exist or has been removed.</p>
            <button
              onClick={() => router.push("/admin/invoices")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Back to Invoices
            </button>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Edit Invoice</h1>
          <p className="text-gray-500">Update the invoice details below</p>
        </div>

        <InvoiceForm
          initialInvoice={invoice}
          onSubmit={handleSubmit}
          customers={mockCustomers}
          vehicles={mockVehicles}
        />
        <Toaster />
      </div>
    </AdminLayout>
  )
}
