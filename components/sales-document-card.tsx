import type { SalesDocument } from "@/types/sales"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Download, FileText } from "lucide-react"
import Link from "next/link"

interface SalesDocumentCardProps {
  document: SalesDocument
}

export function SalesDocumentCard({ document }: SalesDocumentCardProps) {
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "Quotation":
        return "default"
      case "PurchaseOrder":
        return "secondary"
      case "ProformaInvoice":
        return "outline"
      case "TaxInvoice":
        return "destructive"
      case "Receipt":
        return "success"
      default:
        return "default"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{document.documentNumber}</CardTitle>
          <Badge variant={getBadgeVariant(document.documentType)}>{document.documentType}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">{formatDate(document.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">{document.items.length} items</span>
          </div>
          <div className="font-medium text-right">{formatCurrency(document.total)}</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/sales/${document.id}`}>View</Link>
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          PDF
        </Button>
      </CardFooter>
    </Card>
  )
}
