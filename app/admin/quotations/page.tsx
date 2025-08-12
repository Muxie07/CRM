import { Suspense } from "react"
import { DocumentList } from "@/components/document-list"
import { getQuotations } from "@/data/quotations"

export const metadata = {
  title: "Quotations | DIAC Engineering",
  description: "Manage your quotations",
}

export default function QuotationsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quotations</h1>
      </div>

      <Suspense fallback={<div>Loading quotations...</div>}>
        <QuotationsList />
      </Suspense>
    </div>
  )
}

async function QuotationsList() {
  const quotations = await getQuotations()

  return (
    <DocumentList
      documents={quotations}
      documentType="Quotation"
      basePath="/admin/quotations"
      createPath="/admin/quotations/new"
    />
  )
}
