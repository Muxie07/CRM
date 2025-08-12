import type { DocumentItem } from "@/components/universal-document-template"

export interface PurchaseOrder {
  id: string
  poNumber: string
  date: string
  referenceNumber: string
  modeOfPayment: string
  orderReferences: string

  // Company information is standard across all documents

  // Consignee information
  consigneeName: string
  consigneeAddress: string
  consigneeContact: string
  consigneeState: string
  consigneeCode: string

  // Supplier information
  supplierId?: string
  supplierName: string
  supplierAddress: string
  supplierEmail: string
  supplierGstin: string
  supplierState: string

  // Order details
  dispatchDocNo: string
  deliveryNoteDate: string
  dispatchedThrough: string
  termsOfDelivery: string
  warranty: string

  // Items and totals
  items: DocumentItem[]
  subtotal: number
  cgst: number
  sgst: number
  igst: number
  roundingOff: number
  totalAmount: number

  // Additional information
  amountInWords: string
  remarks: string
  status: "Pending" | "Approved" | "Received" | "Cancelled"
  createdAt: string
  updatedAt: string
}
