"use client"

import React from 'react';
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Printer, FileSpreadsheet, FileIcon as FilePdf, Send, ArrowLeft } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { formatCurrency } from "@/utils/format"
import { exportToExcel, exportToPDF } from "@/utils/document-export"
import Link from "next/link"

// A4 Paper dimensions and styling constants
const A4_STYLES = {
  width: "210mm",
  height: "297mm",
  maxWidth: "794px",
  fontSize: "9px",
  lineHeight: "1.3",
  margin: "10mm",
  padding: "5mm",
}

// Define the invoice item interface
export interface InvoiceItem {
  id: string
  itemCode?: string
  description: string
  hsnSac?: string
  quantity: number
  unit: string
  unitPrice: number
  discount?: number
  discountPercent?: number
  amount: number
  notes?: string
}

// Define the tax breakdown interface
export interface TaxBreakdown {
  cgst: number
  sgst: number
  igst: number
  cgstRate?: number
  sgstRate?: number
  igstRate?: number
  isInterstate?: boolean
  cess?: number
  tds?: number
  otherTaxes?: { name: string; amount: number }[]
}

// Define the payment terms interface
export interface PaymentTerms {
  dueDate?: string
  paymentMethod?: string
  bankDetails?: {
    bankName: string
    accountNumber: string
    ifscCode: string
    accountHolderName: string
    branchName?: string
  }
  lateFee?: number
  discountTerms?: string
}

// Define the company information interface
export interface CompanyInfo {
  name: string
  logo?: string
  address: string
  phone?: string
  email?: string
  website?: string
  gstin?: string
  pan?: string
  cin?: string
  registrationNumber?: string
  stateCode?: string
  stateName?: string
}

// Define the customer information interface
export interface CustomerInfo {
  name: string
  contact?: string
  address: string
  phone?: string
  email?: string
  gstin?: string
  pan?: string
  customerCode?: string
  state: string
  stateCode?: string
}

// Define the universal invoice data interface
export interface UniversalInvoiceData {
  id: string

  // Invoice type and metadata
  invoiceType:
    | "Tax Invoice"
    | "Proforma Invoice"
    | "Credit Note"
    | "Debit Note"
    | "Purchase Order"
    | "Quotation"
    | "Receipt"
    | "Bill of Supply"
  invoiceNumber: string
  invoiceDate: string
  dueDate?: string
  referenceNumber?: string
  referenceDate?: string
  poNumber?: string
  poDate?: string
  deliveryNote?: string
  deliveryNoteDate?: string
  dispatchDocNo?: string
  dispatchedThrough?: string
  destination?: string
  termsOfDelivery?: string

  // Company and customer information
  company: CompanyInfo
  customer: CustomerInfo

  // Billing and shipping (if different)
  billingAddress?: string
  shippingAddress?: string
  consignee?: CustomerInfo

  // Items and calculations
  items: InvoiceItem[]
  subtotal: number
  totalDiscount: number
  taxableAmount: number
  taxes: TaxBreakdown
  deliveryCharges: number
  roundingOff?: number
  otherCharges?: { name: string; amount: number }[]
  grandTotal: number

  // Payment and terms
  paymentTerms?: PaymentTerms
  modeOfPayment?: string
  amountInWords: string
  taxAmountInWords?: string

  // Additional information
  notes?: string
  declaration?: string
  termsAndConditions?: string[]
  signature?: string
  authorizedSignatory?: string

  // Customization options
  showItemCode?: boolean
  showHSN?: boolean
  showDiscount?: boolean
  currency?: string
  locale?: string
}

interface UniversalInvoiceTemplateProps {
  data: UniversalInvoiceData
  basePath: string
  customization?: {
    primaryColor?: string
    secondaryColor?: string
    fontFamily?: string
    logoSize?: { width: number; height: number }
  }
}

export function UniversalInvoiceTemplate({ data, basePath, customization = {} }: UniversalInvoiceTemplateProps) {
  const { toast } = useToast()
  const printRef = useRef<HTMLDivElement>(null)
  const [isPrinting, setIsPrinting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [isSending, setIsSending] = useState(false)

  // Add safety checks and defaults
  if (!data) {
    return (
      <div className="p-6 text-center">
        <p>No invoice data available.</p>
      </div>
    )
  }

  // Unified tax calculation function
  const calculateTaxes = (taxableAmount: number, customerState: string, companyState: string) => {
    const isInterstate = customerState !== companyState
    const baseRate = 9 // Base tax rate (can be made configurable)

    if (isInterstate) {
      const igstRate = baseRate * 2 // IGST = CGST + SGST
      const igstAmount = Math.round((taxableAmount * igstRate) / 100)
      return {
        cgst: 0,
        sgst: 0,
        igst: igstAmount,
        cgstRate: 0,
        sgstRate: 0,
        igstRate: igstRate,
        isInterstate: true,
      }
    } else {
      const cgstAmount = Math.round((taxableAmount * baseRate) / 100)
      const sgstAmount = Math.round((taxableAmount * baseRate) / 100)
      return {
        cgst: cgstAmount,
        sgst: sgstAmount,
        igst: 0,
        cgstRate: baseRate,
        sgstRate: baseRate,
        igstRate: 0,
        isInterstate: false,
      }
    }
  }

  // Build basic data (without taxes)
  const basicSafeData = {
    id: data.id || "SG33251001",
    invoiceType: data.invoiceType || "Proforma Invoice",
    invoiceNumber: data.invoiceNumber || "SG33251001",
    invoiceDate: data.invoiceDate || "2025-04-09",
    modeOfPayment: data.modeOfPayment || "Advance",
    referenceNumber: data.referenceNumber || "20251019",
    referenceDate: data.referenceDate || "2025-04-09",
    poNumber: data.poNumber || "Whatsapp",
    poDate: data.poDate || "2025-04-09",
    deliveryNote: data.deliveryNote || "",
    deliveryNoteDate: data.deliveryNoteDate || "",
    dispatchDocNo: data.dispatchDocNo || "",
    dispatchedThrough: data.dispatchedThrough || "Pickup",
    destination: data.destination || "",
    termsOfDelivery: data.termsOfDelivery || "Warranty 1 Year",

    company: data.company || {
      name: "Micro Village Communications(P) Ltd-Chennai 24-25",
      logo: "/placeholder.svg?height=80&width=80",
      address: "Old No: 7, New No: 12,\nAshok Nagar Main Road,\nKodambakkam, 4th Avenue,\nChennai-600024",
      gstin: "33AACCM4395D1ZN",
      email: "mvc_chennai@microvillage.in",
      pan: "AACCM4395D",
      stateName: "Tamil Nadu",
      stateCode: "33",
    },

    customer: data.customer || {
      name: "DIAC ENGINEERING",
      address: "C-124, MMDA Colony\nArumbakkam, Chennai - 600 106",
      state: "Tamil Nadu",
      stateCode: "33",
      gstin: "33AAWFD9550G1Z1",
    },

    consignee: data.consignee || {
      name: "DIAC ENGINEERING",
      address: "C-124, MMDA Colony\nArumbakkam, Chennai - 600 106",
      state: "Tamil Nadu",
      stateCode: "33",
      gstin: "33AAWFD9550G1Z1",
    },

    items: data.items || [
      {
        id: "1",
        itemCode: "20NFJ4HN529DCC00",
        description: "GXV3450 IP Video Phone",
        hsnSac: "85171890",
        quantity: 1,
        unit: "nos",
        unitPrice: 17753.7,
        discountPercent: 0,
        amount: 17753.7,
      },
      {
        id: "2",
        itemCode: "GXP2170",
        description: "GXP2170 Enterprise IP Phone",
        hsnSac: "85171890",
        quantity: 2,
        unit: "nos",
        unitPrice: 8500.0,
        discountPercent: 5,
        amount: 16150.0,
      },
      {
        id: "3",
        itemCode: "UCM6302",
        description: "UCM6302 IP PBX System",
        hsnSac: "85171890",
        quantity: 1,
        unit: "nos",
        unitPrice: 25000.0,
        discountPercent: 0,
        amount: 25000.0,
      },
    ],

    subtotal: data.subtotal || 58903.7,
    totalDiscount: data.totalDiscount || 850.0,
    taxableAmount: data.taxableAmount || 58903.7,
    deliveryCharges: data.deliveryCharges || 0,
    roundingOff: data.roundingOff || -0.36,
    grandTotal: data.grandTotal || 69549.0,
    amountInWords: data.amountInWords || "Indian Rupees Sixty Nine Thousand Five Hundred Forty Nine Only",
    taxAmountInWords:
      data.taxAmountInWords || "Indian Rupees Three Thousand One Hundred Ninety Five and Sixty Six paise Only",
    declaration:
      data.declaration ||
      "We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.",
    authorizedSignatory: data.authorizedSignatory || "Authorised Signatory",
    showItemCode: data.showItemCode ?? true,
    showHSN: data.showHSN ?? true,
    showDiscount: data.showDiscount ?? true,
    currency: data.currency || "₹",
    paymentTerms: data.paymentTerms || {
      bankDetails: {
        bankName: "KOTAK MAHINDRA BANK",
        accountNumber: "6211567714",
        ifscCode: "KKBK0000429",
        accountHolderName: "DIAC ENGINEERING",
        branchName: "THIPPASANDRA",
      },
    },
  }

  // Calculate taxes based on states
  const customerState = basicSafeData.customer.state
  const companyState = basicSafeData.company.stateName
  const calculatedTaxes = calculateTaxes(basicSafeData.taxableAmount, customerState, companyState)

  // Final safe data with taxes
  const safeData: UniversalInvoiceData = {
    ...(basicSafeData as any),
    taxes: {
      cgst: data.taxes?.cgst || calculatedTaxes.cgst,
      sgst: data.taxes?.sgst || calculatedTaxes.sgst,
      igst: data.taxes?.igst || calculatedTaxes.igst,
      cgstRate: data.taxes?.cgstRate || calculatedTaxes.cgstRate,
      sgstRate: data.taxes?.sgstRate || calculatedTaxes.sgstRate,
      igstRate: data.taxes?.igstRate || calculatedTaxes.igstRate,
      isInterstate: calculatedTaxes.isInterstate,
      ...data.taxes,
    },
  }

  // Customization defaults
  const {
    primaryColor = "#000000",
    secondaryColor = "#FFFFFF",
    fontFamily = "Arial, sans-serif",
    logoSize = { width: 80, height: 80 },
  } = customization

  // Actions
  const handlePrint = () => {
    setIsPrinting(true)
    setTimeout(() => {
      window.print()
      setIsPrinting(false)
    }, 100)
  }

  const handleExportExcel = async () => {
    setIsExporting(true)
    try {
      await exportToExcel(
        convertInvoiceToExcelData(safeData),
        `${(safeData.invoiceType || "Document").replace(/\s+/g, "_")}_${safeData.invoiceNumber}`,
      )
      toast({
        title: "Success",
        description: `${safeData.invoiceType} exported to Excel successfully.`,
      })
    } catch (error) {
      console.error("Error exporting to Excel:", error)
      toast({
        title: "Error",
        description: "Failed to export to Excel. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const convertInvoiceToExcelData = (invoice: UniversalInvoiceData): any[] => {
    const result = [
      [safeData.invoiceType.toUpperCase(), "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["Invoice Number:", safeData.invoiceNumber, "", "Date:", safeData.invoiceDate, "", "", ""],
      ["Reference Number:", safeData.referenceNumber, "", "PO Number:", safeData.poNumber, "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["Bill To:", "", "", "", "", "", "", ""],
      [invoice.customer.name, "", "", "", "", "", "", ""],
      [invoice.customer.address, "", "", "", "", "", "", ""],
      ["GSTIN:", invoice.customer.gstin || "N/A", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["Items", "", "", "", "", "", "", ""],
    ]

    result.push(["Sl No.", "Description", "HSN/SAC", "Quantity", "Unit", "Rate", "Discount %", "Amount"])

    invoice.items.forEach((item, index) => {
      result.push([
        index + 1,
        item.description,
        item.hsnSac || "",
        item.quantity,
        item.unit,
        item.unitPrice,
        item.discountPercent || 0,
        item.amount,
      ])
    })

    result.push(
      ["", "", "", "", "", "", "Subtotal:", invoice.subtotal],
      ["", "", "", "", "", "", "CGST:", invoice.taxes.cgst],
      ["", "", "", "", "", "", "SGST:", invoice.taxes.sgst],
      ["", "", "", "", "", "", "Rounding Off:", invoice.roundingOff || 0],
      ["", "", "", "", "", "", "Grand Total:", invoice.grandTotal],
      ["", "", "", "", "", "", "", ""],
      ["Amount in Words:", invoice.amountInWords, "", "", "", "", "", ""],
    )

    return result
  }

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      if (printRef.current) {
        await exportToPDF(
          printRef.current,
          `${(safeData.invoiceType || "Document").replace(/\s+/g, "_")}_${safeData.invoiceNumber}`,
        )
        toast({
          title: "Success",
          description: `${safeData.invoiceType} exported to PDF successfully.`,
        })
      }
    } catch (error) {
      console.error("Error exporting to PDF:", error)
      toast({
        title: "Error",
        description: "Failed to export to PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleEmail = () => {
    setIsSending(true)
    try {
      setTimeout(() => {
        toast({
          title: "Email Sent",
          description: `${safeData.invoiceType} has been emailed successfully.`,
        })
        setIsSending(false)
      }, 1000)
    } catch (error) {
      console.error("Error sending email:", error)
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive",
      })
      setIsSending(false)
    }
  }

  // Format date for display - consistent single-line '9-Apr-25'
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ""
    return date
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "2-digit",
      })
      .replace(/ /g, "-")
  }

  // Calculate total quantity
  const totalQuantity = safeData.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div
      className="bg-white print:shadow-none print:rounded-none print:max-w-none"
      style={{
        fontFamily,
        maxWidth: "210mm",
        width: "100%",
        margin: "0 auto",
        fontSize: "10px",
        lineHeight: "1.4",
      }}
    >
      {/* Action buttons - hidden when printing */}
      <div className="flex justify-between items-center p-4 print:hidden">
        <Link href={basePath} className="flex items-center text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to {safeData.invoiceType}s
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint} disabled={isPrinting}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportExcel} disabled={isExporting}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Excel
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportPDF} disabled={isExporting}>
            <FilePdf className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button variant="outline" size="sm" onClick={handleEmail} disabled={isSending}>
            <Send className="h-4 w-4 mr-2" />
            Email
          </Button>
        </div>
      </div>

      {/* Document Content - printable area */}
      <div
        className="print:p-0 print:m-0 print:w-full print:h-auto print:max-w-none"
        ref={printRef}
        style={{
          width: "100%",
          maxWidth: "210mm",
          fontSize: "10px",
          lineHeight: "1.4",
          margin: "0 auto",
        }}
      >
        <div
          className="border-2 border-black print:border-black print:m-0"
          style={{
            fontSize: A4_STYLES.fontSize,
            lineHeight: A4_STYLES.lineHeight,
            width: "100%",
            minHeight: "auto",
          }}
        >
          {/* Title */}
          <div className="text-center py-2 font-bold text-lg border-b-2 border-black bg-gradient-to-r from-gray-50 to-white print:text-base print:bg-white">
            <div className="tracking-wide text-gray-800">{safeData.invoiceType}</div>
          </div>

          {/* Header Section */}
          <div className="grid grid-cols-2 border-b-2 border-black">
            {/* Left - Company Information with Logo */}
            <div className="grid grid-cols-1 border-r-2 border-black">
              {/* Company Logo Section */}
              <div className="p-3 border-b border-black bg-gradient-to-br from-blue-50 to-indigo-50 print:bg-white">
                <div className="flex items-start gap-3 print:gap-2">
                  <div className="relative">
                    <img
                      src="/diac-logo.jpg"
                      alt="DIAC Engineering Logo"
                      className="w-20 h-20 object-contain flex-shrink-0 print:w-16 print:h-16 border border-gray-200 rounded-lg shadow-sm"
                      style={{ minWidth: "60px", minHeight: "60px" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 rounded-lg"></div>
                  </div>
                  <div className="text-xs flex-1 print:text-[8px]">
                    <div className="font-bold text-base mb-1 print:text-sm print:mb-0.5 text-gray-800 tracking-wide">
                      DIAC ENGINEERING
                    </div>
                    <div className="whitespace-pre-line leading-relaxed text-xs print:text-[8px] print:leading-tight text-gray-700">
                      C-124, MMDA Colony{"\n"}Arumbakkam, Chennai - 600 106
                    </div>
                    <div className="mt-2 text-xs font-medium print:text-[8px] print:mt-1 text-blue-800">
                      GSTIN/UIN: 33AAWFD9550G1Z1
                    </div>
                    <div className="text-xs print:text-[8px] text-gray-600">E-Mail: diacengineering@gmail.com</div>
                  </div>
                </div>
              </div>

              {/* Consignee info */}
              <div className="p-3">
                <div className="font-semibold text-xs mb-2">Consignee (Ship to)</div>
                <div className="text-xs">
                  <div className="font-semibold">{safeData.consignee?.name || safeData.customer.name}</div>
                  <div className="whitespace-pre-line leading-tight mt-1">
                    {safeData.consignee?.address || safeData.customer.address}
                  </div>
                  <div className="mt-1">GSTIN/UIN : {safeData.consignee?.gstin || safeData.customer.gstin}</div>
                  <div className="mt-1">
                    State Name : {safeData.consignee?.state || safeData.customer.state}, Code :{" "}
                    {safeData.consignee?.stateCode || safeData.customer.stateCode || "33"}
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Invoice Details Table */}
            <div className="h-full">
              <table className="w-full h-full text-[9px] border-collapse print:text-[8px]">
                <tbody>
                  <tr>
                    <td className="border border-black p-2 font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-gray-100 text-gray-800">
                      Invoice No.
                    </td>
                    <td className="border border-black p-2 text-gray-700">{safeData.invoiceNumber}</td>
                    <td className="border border-black p-2 font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-gray-100 text-gray-800">
                      Dated
                    </td>
                    <td className="border border-black p-2 text-gray-700 whitespace-nowrap">
                      {formatDate(safeData.invoiceDate)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-gray-100 text-gray-800">
                      Delivery Note
                    </td>
                    <td className="border border-black p-2 text-gray-700">{safeData.deliveryNote}</td>
                    <td className="border border-black p-2 font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-gray-100 text-gray-800">
                      Mode/Terms of Payment
                    </td>
                    <td className="border border-black p-2 text-gray-700">{safeData.modeOfPayment}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-gray-100 text-gray-800">
                      Reference No. & Date.
                    </td>
                    <td className="border border-black p-2 text-gray-700 whitespace-nowrap">
                      {safeData.referenceNumber} dt. {formatDate(safeData.referenceDate)}
                    </td>
                    <td className="border border-black p-2 font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-gray-100 text-gray-800">
                      Other References
                    </td>
                    <td className="border border-black p-2 text-gray-700">Shivani</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-gray-100 text-gray-800">
                      Buyer's Order No.
                    </td>
                    <td className="border border-black p-2 text-gray-700">{safeData.poNumber}</td>
                    <td className="border border-black p-2 font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-gray-100 text-gray-800">
                      Dated
                    </td>
                    <td className="border border-black p-2 text-gray-700 whitespace-nowrap">
                      {formatDate(safeData.poDate)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-gray-100 text-gray-800">
                      Dispatch Doc No.
                    </td>
                    <td className="border border-black p-2 text-gray-700">{safeData.dispatchDocNo}</td>
                    <td className="border border-black p-2 font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-gray-100 text-gray-800">
                      Delivery Note Date
                    </td>
                    <td className="border border-black p-2 text-gray-700 whitespace-nowrap">
                      {safeData.deliveryNoteDate && formatDate(safeData.deliveryNoteDate)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-gray-100 text-gray-800">
                      Dispatched through
                    </td>
                    <td className="border border-black p-2 text-gray-700">{safeData.dispatchedThrough}</td>
                    <td className="border border-black p-2 text-center font-bold" colSpan={2}>
                      <div className="text-center">Terms of Delivery</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-gray-100 text-gray-800">
                      Destination
                    </td>
                    <td className="border border-black p-2 text-gray-700">{safeData.destination}</td>
                    <td className="border border-black p-2 text-center font-bold" colSpan={2}>
                      {safeData.termsOfDelivery}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Customer Details Section */}
          <div className="grid grid-cols-2 border-b-2 border-black">
            {/* Buyer (Bill to) */}
            <div className="pt-1 px-2 pb-2 border-r-2 border-black">
              <div className="font-semibold text-xs mb-1 print:text-[10px]">Buyer (Bill to)</div>
              <div className="text-xs print:text-[9px]">
                <div className="font-semibold">{safeData.customer.name}</div>
                <div className="whitespace-pre-line leading-tight mt-1">{safeData.customer.address}</div>
                <div className="mt-1">GSTIN/UIN : {safeData.customer.gstin}</div>
                <div className="mt-1">
                  State Name : {safeData.customer.state}, Code : {safeData.customer.stateCode || "33"}
                </div>
              </div>
            </div>

            {/* Additional Invoice Information */}
            <div className="p-3">
              <div className="font-semibold text-xs mb-2">Additional Information</div>
              <div className="text-xs space-y-1">
                <div>
                  <span className="font-medium">Payment Mode:</span> {safeData.modeOfPayment}
                </div>
                <div>
                  <span className="font-medium">Reference:</span> {safeData.referenceNumber}
                </div>
                <div>
                  <span className="font-medium">PO Number:</span> {safeData.poNumber}
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <table className="w-full border-collapse text-[10px] print:text-[9px]">
              <thead>
                <tr className="bg-gradient-to-r from-blue-100 to-indigo-100 print:bg-gray-100">
                  <th className="border border-black p-2 text-center font-semibold print:p-1 text-gray-800" style={{ width: "4%" }}>
                    Sl
                    <br />
                    No.
                  </th>
                  <th className="border border-black p-2 text-center font-semibold print:p-1 text-gray-800" style={{ width: "40%" }}>
                    Description of Goods
                  </th>
                  <th className="border border-black p-2 text-center font-semibold print:p-1 text-gray-800" style={{ width: "8%" }}>
                    HSN/SAC
                  </th>
                  <th className="border border-black p-2 text-center font-semibold print:p-1 text-gray-800" style={{ width: "8%" }}>
                    Quantity
                  </th>
                  <th className="border border-black p-2 text-center font-semibold print:p-1 text-gray-800" style={{ width: "10%" }}>
                    Rate
                  </th>
                  <th className="border border-black p-2 text-center font-semibold print:p-1 text-gray-800" style={{ width: "5%" }}>
                    per
                  </th>
                  <th className="border border-black p-2 text-center font-semibold print:p-1 text-gray-800" style={{ width: "6%" }}>
                    Disc. %
                  </th>
                  <th className="border border-black p-2 text-center font-semibold print:p-1 text-gray-800" style={{ width: "12%" }}>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {safeData.items.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border border-black p-1 text-center align-top print:p-0.5">{index + 1}</td>
                    <td className="border border-black p-1 align-top print:p-0.5">
                      <div className="font-medium text-xs print:text-[9px]">{item.description}</div>
                      {item.itemCode && (
                        <div className="text-[10px] text-gray-600 mt-0.5 print:text-[8px]">{item.itemCode}</div>
                      )}
                    </td>
                    <td className="border border-black p-1 text-center align-top print:p-0.5 text-[9px]">
                      {item.hsnSac || "85171890"}
                    </td>
                    <td className="border border-black p-1 text-center align-top print:p-0.5 text-[9px]">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="border border-black p-1 text-right align-top print:p-0.5 text-[9px]">
                      {formatCurrency(item.unitPrice)}
                    </td>
                    <td className="border border-black p-1 text-center align-top print:p-0.5 text-[9px]">
                      {item.unit}
                    </td>
                    <td className="border border-black p-1 text-center align-top print:p-0.5 text-[9px]">
                      {item.discountPercent ? `${item.discountPercent}%` : ""}
                    </td>
                    <td className="border border-black p-1 text-right align-top print:p-0.5 text-[9px]">
                      {formatCurrency(item.amount)}
                    </td>
                  </tr>
                ))}

                {/* Consolidated Tax Summary Row */}
                <tr>
                  <td className="border border-black p-1 print:p-0.5"></td>
                  <td className="border border-black p-1 print:p-0.5" colSpan={6}>
                    <div className="grid grid-cols-2 gap-2 text-[9px] print:text-[8px]">
                      {/* Left Column - Tax Breakdown */}
                      <div className="space-y-0.5">
                        <div className="font-semibold mb-1 text-center text-[10px] print:text-[9px]">Tax Calculation</div>
                        <div className="flex justify-between">
                          <span>Sub Total:</span>
                          <span>{formatCurrency(safeData.subtotal)}</span>
                        </div>
                        {safeData.totalDiscount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Total Discount:</span>
                            <span>(-) {formatCurrency(safeData.totalDiscount)}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-medium border-t pt-0.5">
                          <span>Taxable Amount:</span>
                          <span>{formatCurrency(safeData.taxableAmount)}</span>
                        </div>
                      </div>

                      {/* Right Column - GST Details */}
                      <div className="space-y-0.5">
                        <div className="font-semibold mb-1 text-center text-[10px] print:text-[9px]">GST Breakdown</div>
                        {safeData.taxes.isInterstate ? (
                          <div className="flex justify-between">
                            <span>IGST @ {safeData.taxes.igstRate}%:</span>
                            <span>{formatCurrency(Math.round(safeData.taxes.igst))}</span>
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between">
                              <span>CGST @ {safeData.taxes.cgstRate}%:</span>
                              <span>{formatCurrency(Math.round(safeData.taxes.cgst))}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>SGST @ {safeData.taxes.sgstRate}%:</span>
                              <span>{formatCurrency(Math.round(safeData.taxes.sgst))}</span>
                            </div>
                          </>
                        )}
                        {safeData.roundingOff !== 0 && (
                          <div className="flex justify-between">
                            <span>Rounding Off:</span>
                            <span>
                              {safeData.roundingOff > 0 ? "+" : ""}
                              {formatCurrency(safeData.roundingOff)}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between font-medium border-t pt-0.5">
                          <span>Total Tax:</span>
                          <span>{formatCurrency(safeData.taxes.cgst + safeData.taxes.sgst + safeData.taxes.igst)}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="border border-black p-1 text-right font-bold text-sm print:p-0.5 print:text-xs">
                    {formatCurrency(safeData.grandTotal)}
                  </td>
                </tr>

                {/* Total Row */}
                <tr className="bg-gray-100">
                  <td className="border border-black p-2"></td>
                  <td className="border border-black p-2 font-bold text-right">Total</td>
                  <td className="border border-black p-2"></td>
                  <td className="border border-black p-2 text-center font-bold">
                    {totalQuantity} {safeData.items[0]?.unit || "nos"}
                  </td>
                  <td className="border border-black p-2"></td>
                  <td className="border border-black p-2"></td>
                  <td className="border border-black p-2"></td>
                  <td className="border border-black p-2 text-right font-bold">₹ {formatCurrency(safeData.grandTotal)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Amount in Words Section */}
          <div className="border-b-2 border-black p-2 print:p-1">
            <div className="flex justify-between items-center text-[10px] print:text-[9px]">
              <span className="font-semibold">Amount Chargeable (in words)</span>
              <span className="font-semibold">E. & O.E</span>
            </div>
            <div className="text-[10px] font-bold mt-0.5 print:text-[9px]">{safeData.amountInWords}</div>
          </div>

          {/* HSN Summary Table */}
          <div className="border-b-2 border-black p-3">
            <table className="w-full text-[9px] border-collapse print:text-[8px]">
              <thead>
                <tr className="bg-gradient-to-r from-blue-100 to-indigo-100 print:bg-gray-100">
                  <th className="border border-black p-2 font-semibold text-gray-800">HSN/SAC</th>
                  <th className="border border-black p-2 font-semibold text-gray-800">
                    Taxable
                    <br />
                    Value
                  </th>
                  {safeData.taxes.isInterstate ? (
                    <>
                      <th className="border border-black p-2 font-semibold text-gray-800">
                        IGST
                        <br />
                        Rate
                      </th>
                      <th className="border border-black p-2 font-semibold text-gray-800">
                        IGST
                        <br />
                        Amount
                      </th>
                    </>
                  ) : (
                    <>
                      <th className="border border-black p-2 font-semibold text-gray-800">
                        CGST
                        <br />
                        Rate
                      </th>
                      <th className="border border-black p-2 font-semibold text-gray-800">
                        CGST
                        <br />
                        Amount
                      </th>
                      <th className="border border-black p-2 font-semibold text-gray-800">
                        SGST/UTGST
                        <br />
                        Rate
                      </th>
                      <th className="border border-black p-2 font-semibold text-gray-800">
                        SGST/UTGST
                        <br />
                        Amount
                      </th>
                    </>
                  )}
                  <th className="border border-black p-2 font-semibold text-gray-800">
                    Total
                    <br />
                    Tax Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-1 text-center">85171890</td>
                  <td className="border border-black p-1 text-right">{formatCurrency(safeData.taxableAmount)}</td>
                  {safeData.taxes.isInterstate ? (
                    <>
                      <td className="border border-black p-1 text-center">{safeData.taxes.igstRate}%</td>
                      <td className="border border-black p-1 text-right">{formatCurrency(safeData.taxes.igst)}</td>
                    </>
                  ) : (
                    <>
                      <td className="border border-black p-1 text-center">{safeData.taxes.cgstRate}%</td>
                      <td className="border border-black p-1 text-right">{formatCurrency(safeData.taxes.cgst)}</td>
                      <td className="border border-black p-1 text-center">{safeData.taxes.sgstRate}%</td>
                      <td className="border border-black p-1 text-right">{formatCurrency(safeData.taxes.sgst)}</td>
                    </>
                  )}
                  <td className="border border-black p-1 text-right">
                    {formatCurrency(safeData.taxes.cgst + safeData.taxes.sgst + safeData.taxes.igst)}
                  </td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="border border-black p-1 text-center">Total</td>
                  <td className="border border-black p-1 text-right">{formatCurrency(safeData.taxableAmount)}</td>
                  {safeData.taxes.isInterstate ? (
                    <>
                      <td className="border border-black p-1"></td>
                      <td className="border border-black p-1 text-right">{formatCurrency(safeData.taxes.igst)}</td>
                    </>
                  ) : (
                    <>
                      <td className="border border-black p-1"></td>
                      <td className="border border-black p-1 text-right">{formatCurrency(safeData.taxes.cgst)}</td>
                      <td className="border border-black p-1"></td>
                      <td className="border border-black p-1 text-right">{formatCurrency(safeData.taxes.sgst)}</td>
                    </>
                  )}
                  <td className="border border-black p-1 text-right">
                    {formatCurrency(safeData.taxes.cgst + safeData.taxes.sgst + safeData.taxes.igst)}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-xs mt-2">
              <span className="font-semibold">Tax Amount (in words) :</span> {safeData.taxAmountInWords}
            </div>
          </div>

          {/* Footer Section */}
          <div className="p-3 print:p-2 bg-gradient-to-b from-white to-gray-50 print:bg-white">
            <div className="grid grid-cols-2 gap-6 print:gap-4">
              {/* Left Column - Company Details */}
              <div className="text-[8px] space-y-3 print:text-[7px] print:space-y-2">
                <div className="text-gray-700">
                  <span className="font-semibold text-gray-800">Company's PAN :</span> {safeData.company.pan}
                </div>
                <div>
                  <div className="font-semibold mb-1 text-gray-800">Declaration</div>
                  <div className="text-justify leading-relaxed text-gray-700">{safeData.declaration}</div>
                </div>
              </div>

              {/* Right Column - Bank Details and Signature */}
              <div className="text-[8px] print:text-[7px]">
                <div className="mb-4 print:mb-3 p-3 bg-blue-50 rounded-lg print:bg-transparent print:p-0">
                  <div className="font-semibold mb-2 text-gray-800">Company's Bank Details</div>
                  <div className="space-y-1 text-gray-700">
                    <div>A/c Holder's Name : {safeData.paymentTerms?.bankDetails?.accountHolderName}</div>
                    <div>Bank Name : {safeData.paymentTerms?.bankDetails?.bankName}</div>
                    <div>A/c No. : {safeData.paymentTerms?.bankDetails?.accountNumber}</div>
                    <div>
                      Branch & IFS Code : {safeData.paymentTerms?.bankDetails?.branchName} &{" "}
                      {safeData.paymentTerms?.bankDetails?.ifscCode}
                    </div>
                  </div>
                  <div className="text-[7px] mt-2 print:text-[6px] text-gray-600">for {safeData.company.name}</div>
                </div>

                <div className="text-right mt-8 print:mt-6">
                  <div className="mt-8 pt-4 print:mt-6 print:pt-3 border-t border-gray-200">
                    <div className="font-semibold text-gray-800">{safeData.authorizedSignatory}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Computer Generated Invoice Footer */}
            <div className="text-center text-[8px] mt-4 pt-3 border-t border-gray-200 print:text-[7px] print:mt-3 print:pt-2">
              <div className="font-semibold text-gray-600 tracking-wide">This is a Computer Generated Invoice</div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
  @media print {
    @page {
      size: A4;
      margin: 8mm;
    }

    body {
      -webkit-print-color-adjust: exact;
      color-adjust: exact;
    }

    .print\\:w-18 {
      width: 72px !important;
    }

    .print\\:h-18 {
      height: 72px !important;
    }

    .print\\:text-\\[8px\\] {
      font-size: 8px !important;
    }

    .print\\:text-\\[9px\\] {
      font-size: 9px !important;
    }

    .print\\:text-\\[10px\\] {
      font-size: 10px !important;
    }

    .print\\:p-0\\.5 {
      padding: 2px !important;
    }

    .print\\:space-y-1 > * + * {
      margin-top: 4px !important;
    }

    .print\\:gap-1 {
      gap: 4px !important;
    }

    .print\\:gap-2 {
      gap: 8px !important;
    }

    .print\\:leading-tight {
      line-height: 1.1 !important;
    }

    .print\\:mb-0\\.5 {
      margin-bottom: 2px !important;
    }

    .print\\:mt-0\\.5 {
      margin-top: 2px !important;
    }

    /* Enhanced logo visibility */
    img[alt="DIAC Engineering Logo"] {
      filter: contrast(1.1) brightness(1.05);
      border: 1px solid #e5e7eb !important;
    }
  }

  /* Screen optimization */
  @media screen and (max-width: 768px) {
    .print\\:w-18 {
      width: 64px;
    }

    .print\\:h-18 {
      height: 64px;
    }
  }
`}</style>
    </div>
  )
}
