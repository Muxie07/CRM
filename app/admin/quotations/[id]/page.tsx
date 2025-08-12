import { notFound } from "next/navigation"
import { getQuotationById } from "@/data/quotations"
import { QuotationTemplate } from "@/components/quotation-template"

interface QuotationPageProps {
  params: {
    id: string
  }
}

export default async function QuotationPage({ params }: QuotationPageProps) {
  const quotation = await getQuotationById(params.id)

  if (!quotation) {
    notFound()
  }

  return (
    <div className="container mx-auto py-6">
      <QuotationTemplate data={quotation} basePath="/admin/quotations" />
    </div>
  )
}
