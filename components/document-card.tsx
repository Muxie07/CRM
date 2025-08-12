import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, User, FileText } from "lucide-react"
import { formatCurrency } from "@/utils/format"
import Link from "next/link"

interface DocumentCardProps {
  id: string
  title: string
  date: string
  status: string
  amount: number
  recipient: string
  description?: string
  documentType: "Purchase Order" | "Proforma Invoice" | "Tax Invoice" | "Quotation" | "Receipt"
  basePath: string
}

export function DocumentCard({
  id,
  title,
  date,
  status,
  amount,
  recipient,
  description,
  documentType,
  basePath,
}: DocumentCardProps) {
  // Get status color based on status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "received":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "sent":
        return "bg-purple-100 text-purple-800"
      case "paid":
        return "bg-emerald-100 text-emerald-800"
      case "overdue":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Link href={`${basePath}/${id}`} className="block">
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-medium">{title}</CardTitle>
            <Badge className={getStatusColor(status)}>{status}</Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{new Date(date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <User className="h-4 w-4 mr-2" />
              <span>{recipient}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <DollarSign className="h-4 w-4 mr-2" />
              <span>₹{formatCurrency(amount)}</span>
            </div>
            {description && (
              <div className="flex items-center text-sm text-gray-500">
                <FileText className="h-4 w-4 mr-2" />
                <span>{description}</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <div className="text-xs text-gray-400 w-full text-right">{documentType}</div>
        </CardFooter>
      </Card>
    </Link>
  )
}
