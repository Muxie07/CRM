"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { DocumentList } from "@/components/document-list"
import { purchaseOrders } from "@/data/purchase-orders"

export default function PurchaseOrdersPage() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call to fetch purchase orders
    setDocuments(purchaseOrders)
    setLoading(false)
  }, [])

  const statusOptions = ["Pending", "Approved", "Received", "Cancelled"]

  return (
    <AdminLayout>
      <div className="p-6">
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <DocumentList
            documents={documents}
            documentType="Purchase Order"
            basePath="/admin/purchase-orders"
            statusOptions={statusOptions}
          />
        )}
      </div>
    </AdminLayout>
  )
}
