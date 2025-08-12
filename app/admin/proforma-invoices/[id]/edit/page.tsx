"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { UniversalInvoiceForm } from "@/components/universal-invoice-form"
import { proformaInvoices } from "@/data/proforma-invoices"
import { useToast } from "@/components/ui/use-toast"
import type { DocumentData } from "@/components/universal-invoice-template"
import { clients } from "@/data/clients"

export default function EditProformaInvoicePage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [document, setDocument] = useState<DocumentData | null>(null)
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchInvoice = () => {
      setLoading(true)
      const foundInvoice = proformaInvoices.find((inv) => inv.id === params.id)

      if (foundInvoice) {
        // Convert the invoice data to our universal document format
        const documentData: DocumentData = {
          id: foundInvoice.id,
          documentType: "Proforma Invoice",
          documentNumber: foundInvoice.number,
          date: foundInvoice.date,
          referenceNumber: foundInvoice.referenceNumber || foundInvoice.id,
          modeOfPayment: "Bank Transfer",

          // Company information
          companyName: "DIAC Engineering",
          companyAddress: "C-124, MMDA Colony\nArumbakkam, Chennai - 600 106",
          companyGstin: "33AAWFD9550G1Z1",
          companyEmail: "diacengineering@gmail.com",
          companyPhone: "+9144 46902054 /+91 9741811177",
          companyPan: "AAWFD9550G",
          companyBankDetails: {
            accountHolderName: "DIAC ENGINEERING",
            bankName: "HDFC BANK",
            accountNumber: "50100123456789",
            branchAndIfscCode: "CHENNAI & HDFC0001234",
          },

          // Consignee information
          consigneeName: foundInvoice.clientName,
          consigneeAddress: foundInvoice.clientAddress,
          consigneeContact: foundInvoice.clientPhone || "",
          consigneeGstin: foundInvoice.clientGstin || "",
          consigneeState: "Tamil Nadu",
          consigneeCode: "33",

          // Buyer information
          buyerName: foundInvoice.clientName,
          buyerAddress: foundInvoice.clientAddress,
          buyerContact: foundInvoice.clientPhone || "",
          buyerGstin: foundInvoice.clientGstin || "",
          buyerState: "Tamil Nadu",
          buyerCode: "33",

          // Items
          items: foundInvoice.items.map((item) => ({
            id: item.id,
            description: item.description,
            quantity: item.quantity,
            unit: "nos",
            unitPrice: item.unitPrice,
            amount: item.quantity * item.unitPrice,
          })),

          // Totals
          subtotal: foundInvoice.totalAmount - foundInvoice.tax,
          cgst: foundInvoice.tax / 2,
          sgst: foundInvoice.tax / 2,
          discount: foundInvoice.discount || 0,
          roundingOff: 0,
          grandTotal: foundInvoice.totalAmount,

          // Additional information
          amountInWords: `${foundInvoice.amountInWords || ""}`,
          taxAmountInWords: `${Math.round(foundInvoice.tax)} Only`,
          remarks: foundInvoice.notes,
          declaration:
            "We declare that this proforma invoice shows the actual price of the goods described and that all particulars are true and correct.",
          status: foundInvoice.status,

          // Terms
          termsOfDelivery: foundInvoice.terms || "Warranty 1 Year",
        }

        setDocument(documentData)
      } else {
        toast({
          title: "Error",
          description: "Proforma invoice not found.",
          variant: "destructive",
        })
        router.push("/admin/proforma-invoices")
      }

      setLoading(false)
    }

    fetchInvoice()
  }, [params.id, router, toast])

  const handleSubmit = (data: DocumentData) => {
    // In a real app, this would be an API call to update the proforma invoice
    console.log("Updating proforma invoice:", data)

    // Show success toast
    toast({
      title: "Success",
      description: `Proforma Invoice ${data.documentNumber} has been updated successfully.`,
    })

    // Redirect to the proforma invoice detail page
    router.push(`/admin/proforma-invoices/${data.id}`)
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

  if (!document) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Proforma Invoice Not Found</h2>
            <p className="text-gray-500 mb-4">
              The proforma invoice you are looking for does not exist or has been removed.
            </p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Proforma Invoice: {document.documentNumber}</h1>
        <UniversalInvoiceForm
          initialData={document}
          documentType="Proforma Invoice"
          clients={clientOptions}
          onSubmit={handleSubmit}
          basePath="/admin/proforma-invoices"
          isEditing={true}
        />
      </div>
    </AdminLayout>
  )
}
