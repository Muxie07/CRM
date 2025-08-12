"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { DocumentList } from "@/components/document-list"
import { proformaInvoices } from "@/data/proforma-invoices"

export default function ProformaInvoicesPage() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call to fetch proforma invoices
    setDocuments(proformaInvoices)
    setLoading(false)
  }, [])

  const statusOptions = ["Draft", "Sent", "Accepted", "Rejected", "Converted"]

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
            documentType="Proforma Invoice"
            basePath="/admin/proforma-invoices"
            statusOptions={statusOptions}
          />
        )}
      </div>
    </AdminLayout>
  )
}
