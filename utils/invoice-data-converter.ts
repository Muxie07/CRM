import type { UniversalInvoiceData } from "@/components/universal-invoice-template"
import { numberToWords } from "@/utils/document-export"

// Convert existing invoice data to universal format
export function convertToUniversalFormat(invoiceData: any): UniversalInvoiceData {
  // Determine document type
  let invoiceType = "Tax Invoice"
  if (invoiceData.invoiceType) {
    invoiceType = invoiceData.invoiceType
  } else if (invoiceData.isProforma) {
    invoiceType = "Proforma Invoice"
  } else if (invoiceData.poNumber) {
    invoiceType = "Purchase Order"
  }

  // Convert items to universal format with better error handling
  const items = (invoiceData.items || []).map((item: any, index: number) => ({
    id: item.id || `item-${index}`,
    itemCode: item.itemCode || item.code,
    description: item.description || item.name || "Item",
    hsnSac: item.hsnSac || item.hsn || "85171890",
    quantity: Number(item.quantity) || 1,
    unit: item.unit || "nos",
    unitPrice: Number(item.unitPrice || item.price || item.rate) || 0,
    discount: Number(item.discount) || 0,
    amount: Number(
      item.total || item.amount || (item.quantity || 1) * (item.unitPrice || item.price || item.rate || 0),
    ),
    notes: item.notes || item.description,
  }))

  // Calculate totals with proper number handling
  const subtotal = Number(invoiceData.subtotal) || items.reduce((sum: number, item: any) => sum + item.amount, 0)
  const totalDiscount = items.reduce((sum: number, item: any) => sum + (item.discount || 0), 0)
  const taxableAmount = subtotal - totalDiscount

  // Tax calculations with fallbacks
  const cgst =
    Number(invoiceData.cgst) ||
    (invoiceData.taxTotal ? Number(invoiceData.taxTotal) / 2 : Math.round(taxableAmount * 0.09))
  const sgst =
    Number(invoiceData.sgst) ||
    (invoiceData.taxTotal ? Number(invoiceData.taxTotal) / 2 : Math.round(taxableAmount * 0.09))
  const igst = Number(invoiceData.igst) || 0

  const grandTotal = Number(invoiceData.grandTotal || invoiceData.totalAmount) || taxableAmount + cgst + sgst + igst

  return {
    id: invoiceData.id || `doc-${Date.now()}`,
    invoiceType: invoiceType as any,
    invoiceNumber: invoiceData.invoiceNumber || invoiceData.number || invoiceData.poNumber || "DOC-001",
    invoiceDate: invoiceData.date || invoiceData.invoiceDate || new Date().toISOString().split("T")[0],
    dueDate: invoiceData.dueDate,
    referenceNumber: invoiceData.referenceNumber || invoiceData.saleId,
    poNumber: invoiceData.poNumber,

    company: {
      name: "DIAC ENGINEERING",
      logo: "/diac-logo.jpg",
      address: "C-124, MMDA Colony\nArumbakkam, Chennai - 600 106",
      phone: "+9144 46902054 / +91 9741811177",
      email: "diacengineering@gmail.com",
      gstin: "33AAWFD9550G1Z1",
      pan: "AAWFD9550G",
    },

    customer: {
      name:
        invoiceData.customerName ||
        invoiceData.customer?.name ||
        invoiceData.consigneeName ||
        invoiceData.supplierName ||
        "Customer",
      contact: invoiceData.customerContact || invoiceData.customer?.contact || invoiceData.consigneeContact,
      address:
        invoiceData.customerAddress ||
        invoiceData.customer?.address ||
        invoiceData.consigneeAddress ||
        invoiceData.supplierAddress ||
        "Customer Address",
      phone: invoiceData.customerPhone || invoiceData.customer?.phone || invoiceData.consigneeContact,
      email: invoiceData.customerEmail || invoiceData.customer?.email || invoiceData.supplierEmail,
      gstin:
        invoiceData.customerGstin ||
        invoiceData.customer?.gstin ||
        invoiceData.consigneeGstin ||
        invoiceData.supplierGstin,
      customerCode: invoiceData.customerCode || invoiceData.customer?.customerCode,
      state: invoiceData.customerState || invoiceData.consigneeState || invoiceData.supplierState || "Tamil Nadu",
    },

    items,
    subtotal,
    totalDiscount,
    taxableAmount,
    taxes: {
      cgst,
      sgst,
      igst,
    },
    deliveryCharges: Number(invoiceData.deliveryCharges) || 0,
    grandTotal,
    amountInWords: invoiceData.amountInWords || `${numberToWords(Math.round(grandTotal))} Only`,

    notes: invoiceData.notes || invoiceData.remarks,
    termsAndConditions: invoiceData.termsAndConditions ? [invoiceData.termsAndConditions] : undefined,
    signature: invoiceData.signature,

    showItemCode: false,
    showHSN: true,
    showDiscount: false,
    currency: "₹",
  }
}
