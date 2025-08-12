"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Printer, FileSpreadsheet, FileIcon as FilePdf, Send, ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { formatCurrency } from "@/utils/format"
import { exportToExcel, exportToPDF } from "@/utils/document-export"
import Link from "next/link"

// Define the document types
export type DocumentType = "Tax Invoice" | "Proforma Invoice" | "Purchase Order" | "Receipt" | "Quotation"

// Define the document item interface
export interface DocumentItem {
  id: string
  hsnSac?: string
  description: string
  quantity: number
  unit: string
  unitPrice: number
  amount: number
}

// Define the document interface
export interface DocumentData {
  id: string
  documentType: DocumentType
  documentNumber: string
  date: string
  referenceNumber?: string
  modeOfPayment?: string

  // Company information
  companyName: string
  companyAddress: string
  companyGstin: string
  companyEmail: string
  companyPhone: string

  // Consignee information
  consigneeName?: string
  consigneeAddress?: string
  consigneeContact?: string
  consigneeState?: string
  consigneeCode?: string

  // Supplier information (for purchase orders)
  supplierName?: string
  supplierAddress?: string
  supplierEmail?: string
  supplierGstin?: string
  supplierState?: string

  // Order details
  dispatchDocNo?: string
  deliveryNoteDate?: string
  dispatchedThrough?: string
  termsOfDelivery?: string
  warranty?: string
  orderReferences?: string

  // Items and totals
  items: DocumentItem[]
  subtotal: number
  cgst: number
  sgst: number
  roundingOff: number
  grandTotal: number

  // Additional information
  amountInWords: string
  remarks?: string
  declaration?: string

  // Status
  status?: string
}

interface EnhancedDocumentTemplateProps {
  data: DocumentData
  isEditable?: boolean
  onSave?: (data: DocumentData) => void
  basePath: string
}

export function EnhancedDocumentTemplate({
  data,
  isEditable = false,
  onSave,
  basePath,
}: EnhancedDocumentTemplateProps) {
  const { toast } = useToast()
  const printRef = useRef<HTMLDivElement>(null)
  const [isPrinting, setIsPrinting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [isSending, setIsSending] = useState(false)

  // Handle printing
  const handlePrint = () => {
    setIsPrinting(true)
    setTimeout(() => {
      window.print()
      setIsPrinting(false)
    }, 100)
  }

  // Handle export to Excel
  const handleExportExcel = async () => {
    setIsExporting(true)
    try {
      await exportToExcel(
        convertDocumentToExcelData(data),
        `${data.documentType.replace(/\s+/g, "_")}_${data.documentNumber}`,
      )
      toast({
        title: "Success",
        description: `${data.documentType} exported to Excel successfully.`,
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

  // Convert document data to Excel format
  const convertDocumentToExcelData = (doc: DocumentData): any[] => {
    const result = [
      [doc.documentType, "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["Document Number:", doc.documentNumber, "", "Date:", doc.date, "", ""],
      ["Reference Number:", doc.referenceNumber || "N/A", "", "Mode of Payment:", doc.modeOfPayment || "N/A", "", ""],
      ["", "", "", "", "", "", ""],
      ["Company Information:", "", "", "", "", "", ""],
      [doc.companyName, "", "", "", "", "", ""],
      [doc.companyAddress, "", "", "", "", "", ""],
      ["GSTIN:", doc.companyGstin, "", "Email:", doc.companyEmail, "", ""],
      ["Phone:", doc.companyPhone, "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    ]

    if (doc.consigneeName) {
      result.push(
        ["Consignee Information:", "", "", "", "", "", ""],
        [doc.consigneeName, "", "", "", "", "", ""],
        [doc.consigneeAddress || "", "", "", "", "", "", ""],
        ["Contact:", doc.consigneeContact || "N/A", "", "State:", doc.consigneeState || "N/A", "", ""],
        ["State Code:", doc.consigneeCode || "N/A", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
      )
    }

    if (doc.supplierName) {
      result.push(
        ["Supplier Information:", "", "", "", "", "", ""],
        [doc.supplierName, "", "", "", "", "", ""],
        [doc.supplierAddress || "", "", "", "", "", "", ""],
        ["Email:", doc.supplierEmail || "N/A", "", "GSTIN:", doc.supplierGstin || "N/A", "", ""],
        ["State:", doc.supplierState || "N/A", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
      )
    }

    // Add items header
    result.push(["S.No", "HSN/SAC", "Description", "Quantity", "Unit", "Rate", "Amount"])

    // Add items
    doc.items.forEach((item, index) => {
      result.push([
        index + 1,
        item.hsnSac || "",
        item.description,
        item.quantity,
        item.unit,
        item.unitPrice,
        item.amount,
      ])
    })

    // Add totals
    result.push(
      ["", "", "", "", "", "Subtotal:", doc.subtotal],
      ["", "", "", "", "", "CGST:", doc.cgst],
      ["", "", "", "", "", "SGST:", doc.sgst],
      ["", "", "", "", "", "Rounding Off:", doc.roundingOff],
      ["", "", "", "", "", "Grand Total:", doc.grandTotal],
      ["", "", "", "", "", "", ""],
      ["Amount in Words:", doc.amountInWords, "", "", "", "", ""],
      ["Remarks:", doc.remarks || "", "", "", "", "", ""],
      ["Declaration:", doc.declaration || "", "", "", "", "", ""],
    )

    return result
  }

  // Handle export to PDF
  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      if (printRef.current) {
        await exportToPDF(printRef.current, `${data.documentType.replace(/\s+/g, "_")}_${data.documentNumber}`)
        toast({
          title: "Success",
          description: `${data.documentType} exported to PDF successfully.`,
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

  // Handle email
  const handleEmail = () => {
    setIsSending(true)
    try {
      // In a real app, this would send an email with the document
      setTimeout(() => {
        toast({
          title: "Email Sent",
          description: `${data.documentType} has been emailed successfully.`,
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

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Action buttons - hidden when printing */}
      <div className="flex justify-between items-center p-4 print:hidden">
        <Link href={basePath} className="flex items-center text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to {data.documentType}s
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

      {/* Document Content - this is the printable area */}
      <div className="p-6 print:p-0" ref={printRef}>
        <div className="border border-gray-300 print:border-black">
          {/* Header Row */}
          <div className="text-center border-b border-gray-300 print:border-black p-2 font-bold text-xl">
            {data.documentType}
          </div>

          {/* Company and Document Info Row */}
          <div className="grid grid-cols-8 border-b border-gray-300 print:border-black">
            <div className="col-span-4 p-2 border-r border-gray-300 print:border-black">
              <div className="flex items-start">
                <div className="mr-4">
                  <Image
                    src="/diac-logo.jpg"
                    alt="DIAC Engineering"
                    width={100}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="font-bold">{data.companyName}</p>
                  <p className="text-sm">{data.companyAddress}</p>
                  <p className="text-sm">GSTIN/UIN - {data.companyGstin}</p>
                  <p className="text-sm">Email : {data.companyEmail}</p>
                  <p className="text-sm">Phone Number : {data.companyPhone}</p>
                </div>
              </div>
            </div>
            <div className="col-span-4 p-0">
              <div className="grid grid-cols-2 h-full">
                <div className="border-r border-gray-300 print:border-black">
                  <div className="p-2 border-b border-gray-300 print:border-black">
                    {data.documentType === "Purchase Order" ? "PO No." : "Invoice No."}
                  </div>
                  <div className="p-2 border-b border-gray-300 print:border-black">Reference No. & Date</div>
                  <div className="p-2 border-b border-gray-300 print:border-black">Order References</div>
                </div>
                <div>
                  <div className="p-2 border-b border-gray-300 print:border-black">{data.documentNumber}</div>
                  <div className="p-2 border-b border-gray-300 print:border-black">{data.referenceNumber || "N/A"}</div>
                  <div className="p-2 border-b border-gray-300 print:border-black">
                    {data.orderReferences || "By Mail"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Consignee Row */}
          <div className="grid grid-cols-8 border-b border-gray-300 print:border-black">
            <div className="col-span-4 p-2 border-r border-gray-300 print:border-black">
              <p className="font-bold">Consignee (Ship to)</p>
              <p>{data.consigneeName || "N/A"}</p>
              <p className="text-sm">{data.consigneeAddress || "N/A"}</p>
              <p className="text-sm">Contact Number : {data.consigneeContact || "N/A"}</p>
              <p className="text-sm">
                State Name : {data.consigneeState || "N/A"}, Code : {data.consigneeCode || "N/A"}
              </p>
            </div>
            <div className="col-span-4 p-0">
              <div className="grid grid-cols-2 h-full">
                <div className="border-r border-gray-300 print:border-black">
                  <div className="p-2 border-b border-gray-300 print:border-black">Dispatch Doc No.</div>
                  <div className="p-2 border-b border-gray-300 print:border-black">Dispatched through</div>
                </div>
                <div>
                  <div className="p-2 border-b border-gray-300 print:border-black">{data.dispatchDocNo || "Nil"}</div>
                  <div className="p-2 border-b border-gray-300 print:border-black">
                    {data.dispatchedThrough || "Nil"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Supplier Row (for Purchase Orders) or blank for other document types */}
          {data.documentType === "Purchase Order" && (
            <div className="grid grid-cols-8 border-b border-gray-300 print:border-black">
              <div className="col-span-4 p-2 border-r border-gray-300 print:border-black">
                <p className="font-bold">Supplier (Bill From)</p>
                <p>{data.supplierName || "N/A"}</p>
                <p className="text-sm">{data.supplierAddress || "N/A"}</p>
                <p className="text-sm">Email: {data.supplierEmail || "N/A"}</p>
                <p className="text-sm">GSTIN/UIN: {data.supplierGstin || "N/A"}</p>
                <p className="text-sm">State Name : {data.supplierState || "N/A"}</p>
              </div>
              <div className="col-span-4 p-0">
                <div className="grid grid-cols-1 h-full">
                  <div className="p-2 border-b border-gray-300 print:border-black">
                    <p className="font-bold">Terms of Delivery</p>
                    <p>{data.termsOfDelivery || "nil"}</p>
                  </div>
                  <div className="p-2">
                    <p className="font-bold">Warranty - 1</p>
                    <p>{data.warranty || "year standard warranty"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Table Header */}
          <div className="grid grid-cols-8 border-b border-gray-300 print:border-black font-bold text-center">
            <div className="col-span-1 p-2 border-r border-gray-300 print:border-black">S.No</div>
            <div className="col-span-1 p-2 border-r border-gray-300 print:border-black">HSN/SAC</div>
            <div className="col-span-2 p-2 border-r border-gray-300 print:border-black">Description of Goods</div>
            <div className="col-span-1 p-2 border-r border-gray-300 print:border-black">Quantity</div>
            <div className="col-span-1 p-2 border-r border-gray-300 print:border-black">Per</div>
            <div className="col-span-1 p-2 border-r border-gray-300 print:border-black">Rate/Unit</div>
            <div className="col-span-1 p-2">Amount</div>
          </div>

          {/* Table Items */}
          {data.items.map((item, index) => (
            <div key={item.id} className="grid grid-cols-8 border-b border-gray-300 print:border-black">
              <div className="col-span-1 p-2 border-r border-gray-300 print:border-black text-center">{index + 1}</div>
              <div className="col-span-1 p-2 border-r border-gray-300 print:border-black">{item.hsnSac || ""}</div>
              <div className="col-span-2 p-2 border-r border-gray-300 print:border-black">{item.description}</div>
              <div className="col-span-1 p-2 border-r border-gray-300 print:border-black text-center">
                {item.quantity}
              </div>
              <div className="col-span-1 p-2 border-r border-gray-300 print:border-black text-center">{item.unit}</div>
              <div className="col-span-1 p-2 border-r border-gray-300 print:border-black text-right">
                ₹{formatCurrency(item.unitPrice)}
              </div>
              <div className="col-span-1 p-2 text-right">₹{formatCurrency(item.amount)}</div>
            </div>
          ))}

          {/* Empty rows to match template */}
          {Array.from({ length: Math.max(0, 5 - data.items.length) }).map((_, index) => (
            <div key={`empty-${index}`} className="grid grid-cols-8 border-b border-gray-300 print:border-black">
              <div className="col-span-1 p-2 border-r border-gray-300 print:border-black">&nbsp;</div>
              <div className="col-span-1 p-2 border-r border-gray-300 print:border-black">&nbsp;</div>
              <div className="col-span-2 p-2 border-r border-gray-300 print:border-black">&nbsp;</div>
              <div className="col-span-1 p-2 border-r border-gray-300 print:border-black">&nbsp;</div>
              <div className="col-span-1 p-2 border-r border-gray-300 print:border-black">&nbsp;</div>
              <div className="col-span-1 p-2 border-r border-gray-300 print:border-black">&nbsp;</div>
              <div className="col-span-1 p-2">&nbsp;</div>
            </div>
          ))}

          {/* Calculation Rows */}
          <div className="grid grid-cols-8 border-b border-gray-300 print:border-black">
            <div className="col-span-5 p-2 border-r border-gray-300 print:border-black text-right">Sub Total</div>
            <div className="col-span-2 p-2 border-r border-gray-300 print:border-black">&nbsp;</div>
            <div className="col-span-1 p-2 text-right">₹{formatCurrency(data.subtotal)}</div>
          </div>

          <div className="grid grid-cols-8 border-b border-gray-300 print:border-black">
            <div className="col-span-5 p-2 border-r border-gray-300 print:border-black text-right">
              OUTPUT CGST @ 9%
            </div>
            <div className="col-span-2 p-2 border-r border-gray-300 print:border-black">&nbsp;</div>
            <div className="col-span-1 p-2 text-right">₹{formatCurrency(data.cgst)}</div>
          </div>

          <div className="grid grid-cols-8 border-b border-gray-300 print:border-black">
            <div className="col-span-5 p-2 border-r border-gray-300 print:border-black text-right">
              OUTPUT SGST @ 9%
            </div>
            <div className="col-span-2 p-2 border-r border-gray-300 print:border-black">&nbsp;</div>
            <div className="col-span-1 p-2 text-right">₹{formatCurrency(data.sgst)}</div>
          </div>

          <div className="grid grid-cols-8 border-b border-gray-300 print:border-black">
            <div className="col-span-5 p-2 border-r border-gray-300 print:border-black text-right">Rounding Off</div>
            <div className="col-span-2 p-2 border-r border-gray-300 print:border-black">&nbsp;</div>
            <div className="col-span-1 p-2 text-right">
              {data.roundingOff >= 0 ? "" : "(-)"}₹{formatCurrency(Math.abs(data.roundingOff))}
            </div>
          </div>

          <div className="grid grid-cols-8 border-b border-gray-300 print:border-black font-bold">
            <div className="col-span-5 p-2 border-r border-gray-300 print:border-black text-right">Grand Total</div>
            <div className="col-span-2 p-2 border-r border-gray-300 print:border-black text-center">
              {data.items.reduce((sum, item) => sum + item.quantity, 0)} {data.items[0]?.unit || "nos"}
            </div>
            <div className="col-span-1 p-2 text-right">₹{formatCurrency(data.grandTotal)}</div>
          </div>

          {/* Amount in Words */}
          <div className="grid grid-cols-8 border-b border-gray-300 print:border-black">
            <div className="col-span-3 p-2 border-r border-gray-300 print:border-black">
              Amount Chargeable (in words) :
            </div>
            <div className="col-span-5 p-2 font-bold">{data.amountInWords}</div>
          </div>

          {/* Remarks */}
          <div className="grid grid-cols-8 border-b border-gray-300 print:border-black">
            <div className="col-span-3 p-2 border-r border-gray-300 print:border-black">Remarks -</div>
            <div className="col-span-5 p-2">{data.remarks || ""}</div>
          </div>

          {/* Declaration and Signature */}
          <div className="grid grid-cols-8">
            <div className="col-span-5 p-2 border-r border-gray-300 print:border-black">
              <p className="font-bold">Declaration</p>
              <p className="text-sm">
                {data.declaration ||
                  `We declare that this ${data.documentType.toLowerCase()} shows the actual price of the goods described and that all particulars are true and correct.`}
              </p>
            </div>
            <div className="col-span-3 p-2 flex flex-col items-center justify-center">
              <p className="font-bold text-blue-800">For DIAC ENGINEERING</p>
              <div className="h-16"></div>
              <p className="font-bold text-blue-800">Partner</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
