import type { Invoice } from "@/types/invoice"
import { formatCurrency, formatDate, getDueStatus } from "@/utils/format"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { FileText, ArrowRight } from "lucide-react"
import Link from "next/link"

interface InvoiceCardProps {
  invoice: Invoice
  isProforma?: boolean
}

export function InvoiceCard({ invoice, isProforma = false }: InvoiceCardProps) {
  const statusColors = {
    Draft: "bg-gray-100 text-gray-800",
    Sent: "bg-blue-100 text-blue-800",
    Paid: "bg-green-100 text-green-800",
    Overdue: "bg-red-100 text-red-800",
    Cancelled: "bg-yellow-100 text-yellow-800",
    Converted: "bg-purple-100 text-purple-800",
  }

  const getStatusColor = (status: string) => {
    return statusColors[status as keyof typeof statusColors] || statusColors.Draft
  }

  const basePath = isProforma ? "/admin/proforma-invoices/" : "/admin/invoices/"

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="text-sm text-gray-500">{isProforma ? "Proforma Invoice" : "Invoice"}</div>
              <div className="text-lg font-bold">{invoice.invoiceNumber}</div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
              {invoice.status}
            </div>
          </div>
          <div className="text-sm">
            <div className="font-medium">{invoice.customerName}</div>
            <div className="text-gray-500 truncate">{invoice.customerEmail || invoice.customerPhone}</div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between mb-2">
            <div className="text-sm text-gray-500">Amount</div>
            <div className="text-sm font-bold">₹{formatCurrency(invoice.grandTotal)}</div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="text-sm text-gray-500">Issue Date</div>
            <div className="text-sm">{formatDate(invoice.date)}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm text-gray-500">Due Date</div>
            <div className="text-sm">{formatDate(invoice.dueDate)}</div>
          </div>
          <div className="mt-2 text-sm font-medium text-right">{getDueStatus(invoice.dueDate)}</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 bg-gray-50">
        <div className="flex items-center text-gray-500">
          <FileText className="w-4 h-4 mr-1" />
          <span className="text-xs">{invoice.items.length} items</span>
        </div>
        <div className="flex gap-2">
          {isProforma && invoice.status !== "Converted" && (
            <Link
              href={`${basePath}${invoice.id}/convert`}
              className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-md flex items-center"
            >
              <ArrowRight className="w-3 h-3 mr-1" />
              Convert
            </Link>
          )}
          <Link href={`${basePath}${invoice.id}`} className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
            View
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
