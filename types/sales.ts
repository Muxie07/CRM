export type DocumentType = "Quotation" | "PurchaseOrder" | "ProformaInvoice" | "TaxInvoice" | "Receipt"

export interface SalesDocument {
  id: string
  documentType: DocumentType
  documentNumber: string
  clientId: string
  date: string
  items: SalesItem[]
  subtotal: number
  tax: number
  total: number
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface SalesItem {
  id: string
  productId: string
  description: string
  quantity: number
  unitPrice: number
  tax: number
  total: number
}
