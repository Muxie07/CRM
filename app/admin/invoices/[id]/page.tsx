"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { invoicesData } from "@/data/invoices"
import type { UniversalInvoiceData } from "@/components/universal-invoice-template"
import { UniversalInvoiceTemplate } from "@/components/universal-invoice-template"
import { useParams, useRouter } from "next/navigation"
import { Toaster } from "@/components/ui/toaster"
import { convertToUniversalFormat } from "@/utils/invoice-data-converter"

export default function InvoiceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [document, setDocument] = useState<UniversalInvoiceData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInvoice = () => {
      setLoading(true)
      const foundInvoice = invoicesData.find((inv) => inv.id === params.id)

      if (foundInvoice) {
        // Use the converter to transform the data
        const documentData = convertToUniversalFormat(foundInvoice)
        setDocument(documentData)
      } else {
        setDocument(null)
      }

      setLoading(false)
    }

    fetchInvoice()
  }, [params.id])

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
        {document && <UniversalInvoiceTemplate data={document} basePath="/admin/invoices" />}
        <Toaster />
      </div>
    </AdminLayout>
  )
}
