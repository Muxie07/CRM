"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Printer, FileSpreadsheet, FileIcon as FilePdf, Send, ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { formatCurrency } from "@/utils/format"
import { exportToExcel, exportToPDF } from "@/utils/document-export"
import Link from "next/link"

// Define the quotation item interface
export interface QuotationItem {
  id: string
  hsnSac?: string
  description: string
  quantity: number
  unit: string
  unitPrice: number
  amount: number
  notes?: string
}

// Define the quotation data interface
export interface QuotationData {
  id: string
  quotationNumber: string
  quoteDate: string
  validUntil: string

  // Client information
  clientName: string
  clientContact?: string
  clientAddress: string
  clientPhone?: string
  clientEmail?: string
  clientGstin?: string
  clientState: string // Make this required for tax calculations

  // Company information
  companyName?: string
  companyAddress?: string
  companyGstin?: string
  companyEmail?: string
  companyPhone?: string
  companyState?: string // Add company state for comparison

  // Items and totals
  items: QuotationItem[]
  subtotal: number
  cgst: number
  sgstOrUtgst: number
  igst: number
  deliveryCharges: number
  grandTotal: number

  // Additional information
  amountInWords: string
  termsAndConditions?: string[]
  notes?: string
}

interface QuotationTemplateProps {
  data: QuotationData
  basePath: string
}

export function QuotationTemplate({ data, basePath }: QuotationTemplateProps) {
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
      await exportToExcel(convertQuotationToExcelData(data), `Quotation_${data.quotationNumber}`)
      toast({
        title: "Success",
        description: "Quotation exported to Excel successfully.",
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

  // Convert quotation data to Excel format
  const convertQuotationToExcelData = (quotation: QuotationData): any[] => {
    const result = [
      ["SALES QUOTATION", "", "", "", ""],
      ["", "", "", "", ""],
      ["Quotation Number:", quotation.quotationNumber, "", "", ""],
      ["Quote Date:", quotation.quoteDate, "", "Valid Until:", quotation.validUntil],
      ["", "", "", "", ""],
      ["To:", "", "", "", ""],
      [quotation.clientName, "", "", "", ""],
      [quotation.clientAddress, "", "", "", ""],
      ["PHONE:", quotation.clientPhone || "N/A", "", "", ""],
      ["EMAIL:", quotation.clientEmail || "N/A", "", "", ""],
      ["GSTIN:", quotation.clientGstin || "N/A", "", "", ""],
      ["", "", "", "", ""],
      ["Products", "", "", "", ""],
      ["#", "Item", "HSN/SAC", "Qty", "Unit Price", "Total"],
    ]

    // Add items
    quotation.items.forEach((item, index) => {
      result.push([
        index + 1,
        `${item.itemCode} ${item.description}`,
        item.hsnSac,
        item.quantity,
        item.unitPrice,
        item.amount,
      ])
    })

    // Add totals
    result.push(
      ["", "", "", "", "Product Total before Tax:", quotation.subtotal],
      ["", "", "", "", "CGST:", quotation.cgst],
      ["", "", "", "", "SGST:", quotation.sgstOrUtgst],
    )

    if (quotation.igst) {
      result.push(["", "", "", "", "IGST:", quotation.igst])
    }

    result.push(
      ["", "", "", "", "Total Quotation Amount:", quotation.grandTotal],
      ["", "", "", "", ""],
      ["Amount Chargeable (in words):", quotation.amountInWords, "", "", ""],
      ["", "", "", "", ""],
      ["Commercial Terms & Conditions:", "", "", "", ""],
    )

    // Add terms and conditions
    if (quotation.termsAndConditions) {
      quotation.termsAndConditions.forEach((term, index) => {
        result.push([`${index + 1}. ${term}`, "", "", "", ""])
      })
    }

    return result
  }

  // Handle export to PDF
  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      if (printRef.current) {
        await exportToPDF(printRef.current, `Quotation_${data.quotationNumber}`)
        toast({
          title: "Success",
          description: "Quotation exported to PDF successfully.",
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
      // In a real app, this would send an email with the quotation
      setTimeout(() => {
        toast({
          title: "Email Sent",
          description: "Quotation has been emailed successfully.",
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

  // Default terms and conditions if not provided
  const defaultTerms = [
    "Our offer is valid for 15 days from the date of proposal and thereafter subject to change without notice. Scope of Supply as well as the Price Schedule may change subject to change in drawing.",
    "Our scope covers design, supply, erection & commissioning of the System.",
    "Provisioning of 415 V 3 PHZ Power Supply at the Terrace Level will be at your scope.",
    "Provisioning of access system - scaffolding/Power Crane Cradle for fixing of Monorail & Lifting of BMU at your scope.",
    "GST/Taxes as applicable will be charged extra.",
    "Payment Terms: (a) 30% advance with your acceptance of the Offer/issue of L.O.I. (b) 60% against delivery of material on PRO-RATA basis. (c) 10% on Installation & Handing Over",
    "Warranty: Warranty of the material is 12 months from the date of supply.",
    "Delivery Period: 12-14 weeks from the date of acceptance of the Shop drawings & receipt of advance.",
    "In case of cancellation of a confirmed order for any reason what so ever 10% of the order value shall have to be paid by you to us, as damages. In case any order is cancelled after dispatch of goods, packaging & forwarding, damages and to and fro freight shall be charged to your account in addition to the above.",
    "All terms are subject to Gurgaon Jurisdiction.",
  ]

  const termsToDisplay = data.termsAndConditions || defaultTerms

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Action buttons - hidden when printing */}
      <div className="flex justify-between items-center p-4 print:hidden">
        <Link href={basePath} className="flex items-center text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Quotations
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
      <div className="p-6 print:p-4 print:text-sm" ref={printRef}>
        <div className="border border-gray-300 print:border-black">
          {/* Overall Document Title */}
          <div className="text-center border-b border-gray-300 print:border-black p-3 font-bold text-xl bg-gray-50">
            SALES QUOTATION
          </div>

          {/* Header Section (Two-Column Layout) */}
          <div className="grid grid-cols-2 border-b border-gray-300 print:border-black">
            {/* Left-Hand Column */}
            <div className="p-4">
              {/* Top Half - Company Logo and Details */}
              <div className="mb-6">
                <div className="flex items-start mb-3">
                  <Image
                    src="/diac-logo.jpg"
                    alt="DIAC Engineering"
                    width={250}
                    height={150}
                    className="object-contain mr-4"
                  />
                  <div>
                    <p className="font-bold text-lg">DIAC Engineering</p>
                    <p className="text-xs">C-124, MMDA Colony, Arumbakkam,</p>
                    <p className="text-xs">(Opposite to Iyyappan Temple)</p>
                    <p className="text-xs">Chennai - 600 106</p>
                    <p className="text-xs">PHONE: +9144 46902054 / +91 9741811177</p>
                    <p className="text-xs">EMAIL: diacengineering@gmail.com</p>
                    <p className="text-xs">GSTIN: 33AAWFD9550G1Z1</p>
                  </div>
                </div>
              </div>

              {/* Bottom Half - Customer Details */}
              <div>
                <h3 className="font-bold text-base mb-2">Customer Details</h3>
                <div className="space-y-1">
                  <p className="text-xs">{data.clientName}</p>
                  <p className="text-xs">{data.clientAddress.split("\n")[0]}</p>
                  <p className="text-xs">{data.clientAddress.split("\n").slice(1).join(", ")}</p>
                  {data.clientGstin && (
                    <p className="text-xs">
                      <span className="font-medium">GST Number:</span> {data.clientGstin}
                    </p>
                  )}
                  <p className="text-xs">Contact: Mr. Rajesh Kumar | Phone: +91 44 2434 5678</p>
                  <p className="text-xs">Email: rajesh.kumar@chennaipowersolutions.com</p>
                </div>
              </div>
            </div>

            {/* Right-Hand Column */}
            <div className="p-4 flex justify-end">
              {/* Quotation Details - moved to top right corner */}
              <div className="mb-6 text-right">
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">Quotation Number:</span> {data.quotationNumber}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Quotation Date:</span> {data.quoteDate}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Valid Until:</span> {data.validUntil}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Prepared By:</span> Sales Representative
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 border-r border-b border-gray-300 print:border-black text-center w-10 text-xs">
                    #
                  </th>
                  <th className="p-2 border-r border-b border-gray-300 print:border-black text-left text-xs">
                    Product
                  </th>
                  <th className="p-2 border-r border-b border-gray-300 print:border-black text-center w-24 text-xs">
                    HSN Code
                  </th>
                  <th className="p-2 border-r border-b border-gray-300 print:border-black text-center w-16 text-xs">
                    Qty
                  </th>
                  <th className="p-2 border-r border-b border-gray-300 print:border-black text-right w-28 text-xs">
                    Unit Price
                  </th>
                  <th className="p-2 border-b border-gray-300 print:border-black text-right w-28">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-2 border-r border-gray-300 print:border-black text-center text-xs">{index + 1}</td>
                    <td className="p-2 border-r border-gray-300 print:border-black text-xs">
                      {item.itemCode} {item.description}
                    </td>
                    <td className="p-2 border-r border-gray-300 print:border-black text-center text-xs">
                      {item.hsnSac}
                    </td>
                    <td className="p-2 border-r border-gray-300 print:border-black text-center text-xs">
                      {item.quantity}
                    </td>
                    <td className="p-2 border-r border-gray-300 print:border-black text-right text-xs">
                      {formatCurrency(item.unitPrice)}
                    </td>
                    <td className="p-2 text-right text-xs">{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals & Other Details Section */}
          <div className="p-4">
            {/* Notes Section */}
            <div className="mb-8 border-t border-gray-300 pt-4">
              <div className="flex">
                <div className="w-20">
                  <span className="font-bold text-sm">NOTE:</span>
                </div>
                <div className="flex-1">
                  <div className="min-h-[120px] border-b border-gray-300 mb-2"></div>
                  <div className="min-h-[120px] border-b border-gray-300 mb-2"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <table className="w-full max-w-lg border border-gray-300 print:border-black">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-2 px-4 border-b border-gray-300 print:border-black font-medium text-xs">
                      Description
                    </th>
                    <th className="text-right py-2 px-4 border-b border-gray-300 print:border-black font-medium text-xs">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-200 text-xs">Subtotal</td>
                    <td className="text-right py-2 px-4 border-b border-gray-200 text-xs">
                      ₹{formatCurrency(data.subtotal)}
                    </td>
                  </tr>

                  {/* Conditional Taxation Rows */}
                  {data.clientState?.toLowerCase() === "tamil nadu" ? (
                    // For Tamil Nadu customers - show CGST and SGST (intra-state)
                    <>
                      <tr>
                        <td className="py-2 px-4 border-b border-gray-200 text-xs">CGST (9%)</td>
                        <td className="text-right py-2 px-4 border-b border-gray-200 text-xs">
                          ₹{formatCurrency(data.cgst)}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b border-gray-200 text-xs">SGST (9%)</td>
                        <td className="text-right py-2 px-4 border-b border-gray-200 text-xs">
                          ₹{formatCurrency(data.sgstOrUtgst)}
                        </td>
                      </tr>
                    </>
                  ) : (
                    // For customers outside Tamil Nadu - show IGST (inter-state)
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-200 text-xs">IGST (18%)</td>
                      <td className="text-right py-2 px-4 border-b border-gray-200 text-xs">
                        ₹{formatCurrency(data.igst)}
                      </td>
                    </tr>
                  )}

                  {/* Delivery Charges */}
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-200 text-xs">Delivery Charges</td>
                    <td className="text-right py-2 px-4 border-b border-gray-200 text-xs">
                      ₹{formatCurrency(data.deliveryCharges || 0)}
                    </td>
                  </tr>

                  <tr className="bg-gray-50">
                    <td className="py-3 px-4 font-bold text-sm">Grand Total</td>
                    <td className="text-right py-3 px-4 font-bold text-sm">₹{formatCurrency(data.grandTotal)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Amount in Words */}
            <div className="mt-4">
              <p className="font-semibold">Amount in Words:</p>
              <p className="text-sm">{data.amountInWords}</p>
            </div>

            {/* Commercial and Terms & Conditions */}
            <div className="mt-6">
              <h3 className="font-bold">Commercial Terms & Conditions</h3>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                {termsToDisplay.map((term, index) => (
                  <li key={index}>{term}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
