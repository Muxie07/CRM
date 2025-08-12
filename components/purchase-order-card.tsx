import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate, formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { FileText, ArrowRight } from "lucide-react"
import type { PurchaseOrder } from "@/types/purchase-order"

interface PurchaseOrderCardProps {
  order: PurchaseOrder
}

export function PurchaseOrderCard({ order }: PurchaseOrderCardProps) {
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "received":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card className="overflow-hidden border-2 border-gray-200 hover:border-gray-300 transition-all">
      <CardContent className="p-0">
        <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-lg">{order.poNumber}</h3>
          </div>
          <Badge className={`${getStatusColor(order.status)} font-medium`}>{order.status}</Badge>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Supplier</p>
              <p className="font-medium">{order.supplierName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{formatDate(order.date)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Amount</p>
              <p className="font-medium">₹{formatCurrency(order.totalAmount)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Items</p>
              <p className="font-medium">{order.items.length} items</p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50 p-4 border-t border-gray-200">
        <Link
          href={`/admin/purchase-orders/${order.id}`}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center ml-auto"
        >
          View Details
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </CardFooter>
    </Card>
  )
}
