"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { UniversalInvoiceTemplate, type DocumentData } from "@/components/universal-invoice-template"
import { purchaseOrders } from "@/data/purchase-orders"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { convertToUniversalFormat } from "@/utils/invoice-data-converter"

export default function PurchaseOrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [document, setDocument] = useState<DocumentData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call to fetch the purchase order
    const id = params.id as string
    const order = purchaseOrders.find((order) => order.id === id)

    if (order) {
      // Transform the purchase order data to match the UniversalInvoiceData interface
      const transformedOrder = convertToUniversalFormat({
        ...order,
        invoiceType: "Purchase Order",
        invoiceNumber: order.poNumber,
        date: order.date,
        customerName: order.consigneeName || order.supplierName,
        customerAddress: order.consigneeAddress || order.supplierAddress,
        customerContact: order.consigneeContact,
        customerPhone: order.consigneeContact,
        customerGstin: order.consigneeGstin || order.supplierGstin,
        items: order.items,
        subtotal: order.subtotal,
        cgst: order.cgst,
        sgst: order.sgst,
        grandTotal: order.totalAmount,
        amountInWords: order.amountInWords,
        notes: order.remarks,
      })

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
        <h1 className="text-2xl font-bold mb-6">Purchase Order: {document.documentNumber}</h1>
        <UniversalInvoiceTemplate data={document} basePath="/admin/purchase-orders" />
        <Toaster />
      </div>
    </AdminLayout>
  )
}
