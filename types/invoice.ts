export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue" | "Cancelled"

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  taxRate: number
  discount: number
  total: number
}

export interface Invoice {
  id: string
  invoiceNumber: string
  saleId?: string
  customerId: string
  customerName: string
  customerAddress: string
  customerPhone: string
  customerEmail?: string
  date: string
  dueDate: string
  items: InvoiceItem[]
  subtotal: number
  taxTotal: number
  discountTotal: number
  grandTotal: number
  notes?: string
  terms?: string
  status: InvoiceStatus
  paymentDate?: string
  paymentMethod?: string
  createdAt: string
  updatedAt: string
  isProforma?: boolean
}
