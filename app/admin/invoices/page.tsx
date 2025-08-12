"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { DocumentList } from "@/components/document-list"
import { invoicesData } from "@/data/invoices"

export default function InvoicesPage() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call to fetch invoices
    // Filter out proforma invoices
    const taxInvoices = invoicesData.filter((invoice) => !invoice.isProforma)
    setDocuments(taxInvoices)
    setLoading(false)
  }, [])

  const statusOptions = ["Draft", "Sent", "Paid", "Overdue", "Cancelled"]

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
            documentType="Tax Invoice"
            basePath="/admin/invoices"
            statusOptions={statusOptions}
          />
        )}
      </div>
    </AdminLayout>
  )
}
