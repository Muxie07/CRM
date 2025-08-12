"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { UniversalInvoiceForm } from "@/components/universal-invoice-form"
import { purchaseOrders } from "@/data/purchase-orders"
import { useToast } from "@/components/ui/use-toast"
import type { DocumentData } from "@/components/universal-invoice-template"
import { clients } from "@/data/clients"
import { vendors } from "@/data/vendors"

export default function EditPurchaseOrderPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [document, setDocument] = useState<DocumentData | null>(null)
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    // In a real app, this would be an API call to fetch the purchase order
    const id = params.id as string
    const order = purchaseOrders.find((order) => order.id === id)

    if (order) {
      // Transform the purchase order data to match the DocumentData interface
      const transformedOrder: DocumentData = {
        id: order.id,
        documentType: "Purchase Order",
        documentNumber: order.poNumber,
        date: order.date,
        referenceNumber: order.referenceNumber,
        modeOfPayment: order.modeOfPayment,
        orderReferences: order.orderReferences,

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
        consigneeName: order.consigneeName,
        consigneeAddress: order.consigneeAddress,
        consigneeContact: order.consigneeContact,
        consigneeState: order.consigneeState,
        consigneeCode: order.consigneeCode,

        // Supplier information
        supplierName: order.supplierName,
        supplierAddress: order.supplierAddress,
        supplierEmail: order.supplierEmail,
        supplierGstin: order.supplierGstin,
        supplierState: order.supplierState,

        // Order details
        dispatchDocNo: order.dispatchDocNo,
        deliveryNoteDate: order.deliveryNoteDate,
        dispatchedThrough: order.dispatchedThrough,
        termsOfDelivery: order.termsOfDelivery,
        warranty: order.warranty,

        // Items and totals
        items: order.items.map((item) => ({
          id: item.id || `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          hsnSac: item.hsnSac,
          description: item.description,
          quantity: item.quantity,
          unit: item.unit,
          unitPrice: item.unitPrice || item.rate,
          amount: item.amount,
          serialNumber: item.serialNumber,
        })),
        subtotal: order.subtotal,
        cgst: order.cgst,
        sgst: order.sgst,
        roundingOff: order.roundingOff,
        grandTotal: order.totalAmount,

        // Additional information
        amountInWords: order.amountInWords,
        remarks: order.remarks,
        declaration:
          "We declare that this purchase order shows the actual price of the goods described and that all particulars are true and correct.",
        status: order.status,
      }

      setDocument(transformedOrder)
    } else {
      toast({
        title: "Error",
        description: "Purchase order not found.",
        variant: "destructive",
      })
      router.push("/admin/purchase-orders")
    }

    setLoading(false)
  }, [params.id, router, toast])

  const handleSubmit = (data: DocumentData) => {
    // In a real app, this would be an API call to update the purchase order
    console.log("Updating purchase order:", data)

    // Show success toast
    toast({
      title: "Success",
      description: `Purchase Order ${data.documentNumber} has been updated successfully.`,
    })

    // Redirect to the purchase order detail page
    router.push(`/admin/purchase-orders/${data.id}`)
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (!document) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Purchase Order Not Found</h2>
            <p className="mt-2 text-gray-500">The purchase order you're looking for doesn't exist.</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Purchase Order: {document.documentNumber}</h1>
        <UniversalInvoiceForm
          initialData={document}
          documentType="Purchase Order"
          clients={clientOptions}
          suppliers={supplierOptions}
          onSubmit={handleSubmit}
          basePath="/admin/purchase-orders"
          isEditing={true}
        />
      </div>
    </AdminLayout>
  )
}
