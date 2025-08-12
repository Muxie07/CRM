"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Printer, FileSpreadsheet, FileIcon as FilePdf, Send, ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { exportToExcel, exportToPDF } from "@/utils/document-export"
import Link from "next/link"

interface MicroVillageInvoiceProps {
  basePath: string
  companyLogo?: string
  companyName?: string
}

export function MicroVillageInvoiceTemplate({
  basePath,
  companyLogo = "/diac-logo.jpg",
  companyName = "DIAC ENGINEERING",
}: MicroVillageInvoiceProps) {
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
        [
          ["Tax Invoice", "", "", "", "", "", "", ""],
          ["Invoice Number:", "SG33251001", "", "Date:", "9-Apr-25", "", "", ""],
          ["Reference Number:", "20251019", "", "Buyer's Order:", "Whatsapp", "", "", ""],
          ["", "", "", "", "", "", "", ""],
          ["Bill To:", "", "", "", "", "", "", ""],
          ["DIAC ENGINEERING", "", "", "", "", "", "", ""],
          ["C-124, MMDA Colony, Arumbakkam, Chennai - 600 106", "", "", "", "", "", "", ""],
          ["GSTIN:", "33AAWFD9550G1Z1", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", ""],
          ["Items", "", "", "", "", "", "", ""],
          ["Sl No.", "Description", "HSN/SAC", "Quantity", "Rate", "per", "Disc. %", "Amount"],
          ["1", "GXV3450\n20NFJHNS2DCC00", "85171890", "1 nos", "17,753.70", "nos", "-", "17,753.70"],
          ["", "OUTPUT CGST @ 9%", "", "", "9%", "", "", "1,597.83"],
          ["", "OUTPUT SGST @ 9%", "", "", "9%", "", "", "1,597.83"],
          ["", "Rounding Off", "", "", "", "", "", "(-) 0.36"],
          ["", "Total", "", "1 nos", "", "", "", "₹ 20,949.00"],
          ["", "", "", "", "", "", "", ""],
          ["Amount in Words:", "Indian Rupees Twenty Thousand Nine Hundred Forty Nine Only", "", "", "", "", "", ""],
        ],
        "Tax_Invoice_SG33251001",
      )
      toast({
        title: "Success",
        description: "Tax Invoice exported to Excel successfully.",
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

  // Handle export to PDF
  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      if (printRef.current) {
        await exportToPDF(printRef.current, "Tax_Invoice_SG33251001")
        toast({
          title: "Success",
          description: "Tax Invoice exported to PDF successfully.",
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
      setTimeout(() => {
        toast({
          title: "Email Sent",
          description: "Tax Invoice has been emailed successfully.",
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
    <div className="bg-white rounded-lg shadow-md" style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Action buttons - hidden when printing */}
      <div className="flex justify-between items-center p-4 print:hidden">
        <Link href={basePath} className="flex items-center text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Invoices
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
      <div className="print:p-0 print:m-0" ref={printRef}>
        <div className="border border-black print:border-black" style={{ fontSize: "11px", lineHeight: "1.2" }}>
          {/* Title */}
          <div className="text-center py-2 font-bold text-base border-b border-black bg-white">Tax Invoice</div>

          {/* Header Section - Company Info and Invoice Details */}
          <div className="grid grid-cols-2 border-b border-black">
            {/* Left - Company Information */}
            <div className="p-2 border-r border-black">
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0">
                  <Image
                    src={companyLogo || "/placeholder.svg"}
                    alt={companyName}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 text-xs">
                  <div className="font-bold text-sm mb-1">{companyName}</div>
                  <div className="whitespace-pre-line leading-tight">
                    Old No: 7, New No: 12, Ashok Nagar Main Road, Kodambakkam, 4th Avenue, Chennai-600024
                  </div>
                  <div className="mt-1">GSTIN/UIN: 33AACCM4395D1ZN</div>
                  <div>E-Mail: mvc_chennai@microvillage.in</div>
                </div>
              </div>
            </div>

            {/* Right - Invoice Details Table */}
            <div className="p-2">
              <table className="w-full text-xs border-collapse">
                <tbody>
                  <tr>
                    <td className="border border-black p-1 font-semibold w-1/4">Invoice No.</td>
                    <td className="border border-black p-1 w-1/4">SG33251001</td>
                    <td className="border border-black p-1 font-semibold w-1/4">Dated</td>
                    <td className="border border-black p-1 w-1/4">9-Apr-25</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 font-semibold">Delivery Note</td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1 font-semibold">Mode/Terms of Payment</td>
                    <td className="border border-black p-1">Advance</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 font-semibold">Reference No. & Date</td>
                    <td className="border border-black p-1">20251019 dt. 9-Apr-25</td>
                    <td className="border border-black p-1 font-semibold">Other References</td>
                    <td className="border border-black p-1">Shivani</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 font-semibold">Buyer's Order No.</td>
                    <td className="border border-black p-1">Whatsapp</td>
                    <td className="border border-black p-1 font-semibold">Dated</td>
                    <td className="border border-black p-1">9-Apr-25</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 font-semibold">Dispatch Doc No.</td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1 font-semibold">Delivery Note Date</td>
                    <td className="border border-black p-1"></td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 font-semibold">Dispatched through</td>
                    <td className="border border-black p-1">Pickup</td>
                    <td className="border border-black p-1 font-semibold">Destination</td>
                    <td className="border border-black p-1"></td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 font-semibold">Terms of Delivery</td>
                    <td className="border border-black p-1" colSpan={3}>
                      Warranty 1 Year
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Customer Details Section */}
          <div className="grid grid-cols-2 border-b border-black">
            {/* Consignee (Ship to) */}
            <div className="p-2 border-r border-black">
              <div className="font-semibold text-xs mb-1">Consignee (Ship to)</div>
              <div className="text-xs">
                <div className="font-semibold">DIAC ENGINEERING</div>
                <div className="whitespace-pre-line leading-tight mt-1">
                  C-124, MMDA Colony Arumbakkam, Chennai - 600 106
                </div>
                <div className="mt-1">GSTIN/UIN: 33AAWFD9550G1Z1</div>
                <div className="mt-1">State Name: Tamil Nadu, Code: 33</div>
              </div>
            </div>

            {/* Buyer (Bill to) */}
            <div className="p-2">
              <div className="font-semibold text-xs mb-1">Buyer (Bill to)</div>
              <div className="text-xs">
                <div className="font-semibold">DIAC ENGINEERING</div>
                <div className="whitespace-pre-line leading-tight mt-1">
                  C-124, MMDA Colony Arumbakkam, Chennai - 600 106
                </div>
                <div className="mt-1">GSTIN/UIN: 33AAWFD9550G1Z1</div>
                <div className="mt-1">State Name: Tamil Nadu, Code: 33</div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr>
                  <th className="border border-black p-1 text-center font-semibold" style={{ width: "6%" }}>
                    Sl
                    <br />
                    No.
                  </th>
                  <th className="border border-black p-1 text-left font-semibold" style={{ width: "40%" }}>
                    Description of Goods
                  </th>
                  <th className="border border-black p-1 text-center font-semibold" style={{ width: "10%" }}>
                    HSN/SAC
                  </th>
                  <th className="border border-black p-1 text-center font-semibold" style={{ width: "10%" }}>
                    Quantity
                  </th>
                  <th className="border border-black p-1 text-center font-semibold" style={{ width: "10%" }}>
                    Rate
                  </th>
                  <th className="border border-black p-1 text-center font-semibold" style={{ width: "6%" }}>
                    per
                  </th>
                  <th className="border border-black p-1 text-center font-semibold" style={{ width: "8%" }}>
                    Disc. %
                  </th>
                  <th className="border border-black p-1 text-center font-semibold" style={{ width: "10%" }}>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Item Row */}
                <tr>
                  <td className="border border-black p-1 text-center">1</td>
                  <td className="border border-black p-1">
                    <div className="font-medium">GXV3450</div>
                    <div className="text-xs text-gray-600 mt-0.5">20NFJHNS2DCC00</div>
                  </td>
                  <td className="border border-black p-1 text-center">85171890</td>
                  <td className="border border-black p-1 text-center">1 nos</td>
                  <td className="border border-black p-1 text-right">17,753.70</td>
                  <td className="border border-black p-1 text-center">nos</td>
                  <td className="border border-black p-1 text-center">-</td>
                  <td className="border border-black p-1 text-right">17,753.70</td>
                </tr>

                {/* Tax Calculation Rows */}
                <tr>
                  <td className="border border-black p-1"></td>
                  <td className="border border-black p-1">
                    <div>OUTPUT CGST @ 9%</div>
                    <div>OUTPUT SGST @ 9%</div>
                    <div>Rounding Off</div>
                  </td>
                  <td className="border border-black p-1"></td>
                  <td className="border border-black p-1"></td>
                  <td className="border border-black p-1 text-center">
                    <div>9 %</div>
                    <div>9 %</div>
                  </td>
                  <td className="border border-black p-1"></td>
                  <td className="border border-black p-1"></td>
                  <td className="border border-black p-1 text-right">
                    <div>1,597.83</div>
                    <div>1,597.83</div>
                    <div>(-) 0.36</div>
                  </td>
                </tr>

                {/* Total Row */}
                <tr>
                  <td className="border border-black p-1"></td>
                  <td className="border border-black p-1 font-bold text-center">Total</td>
                  <td className="border border-black p-1"></td>
                  <td className="border border-black p-1 text-center font-bold">1 nos</td>
                  <td className="border border-black p-1"></td>
                  <td className="border border-black p-1"></td>
                  <td className="border border-black p-1"></td>
                  <td className="border border-black p-1 text-right font-bold">₹ 20,949.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Amount in Words Section */}
          <div className="border-b border-black p-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold">Amount Chargeable (in words)</span>
              <span className="font-semibold">E. & O.E</span>
            </div>
            <div className="text-xs font-bold mt-1">Indian Rupees Twenty Thousand Nine Hundred Forty Nine Only</div>
          </div>

          {/* HSN Summary Table */}
          <div className="border-b border-black p-2">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr>
                  <th className="border border-black p-1 font-semibold">HSN/SAC</th>
                  <th className="border border-black p-1 font-semibold">
                    Taxable
                    <br />
                    Value
                  </th>
                  <th className="border border-black p-1 font-semibold">
                    CGST
                    <br />
                    Rate
                  </th>
                  <th className="border border-black p-1 font-semibold">
                    CGST
                    <br />
                    Amount
                  </th>
                  <th className="border border-black p-1 font-semibold">
                    SGST/UTGST
                    <br />
                    Rate
                  </th>
                  <th className="border border-black p-1 font-semibold">
                    SGST/UTGST
                    <br />
                    Amount
                  </th>
                  <th className="border border-black p-1 font-semibold">
                    Total
                    <br />
                    Tax Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-1 text-center">85171890</td>
                  <td className="border border-black p-1 text-right">17,753.70</td>
                  <td className="border border-black p-1 text-center">9%</td>
                  <td className="border border-black p-1 text-right">1,597.83</td>
                  <td className="border border-black p-1 text-center">9%</td>
                  <td className="border border-black p-1 text-right">1,597.83</td>
                  <td className="border border-black p-1 text-right">3,195.66</td>
                </tr>
                <tr className="font-bold">
                  <td className="border border-black p-1 text-center">Total</td>
                  <td className="border border-black p-1 text-right">17,753.70</td>
                  <td className="border border-black p-1"></td>
                  <td className="border border-black p-1 text-right">1,597.83</td>
                  <td className="border border-black p-1"></td>
                  <td className="border border-black p-1 text-right">1,597.83</td>
                  <td className="border border-black p-1 text-right">3,195.66</td>
                </tr>
              </tbody>
            </table>
            <div className="text-xs mt-1">
              <span className="font-semibold">Tax Amount (in words):</span> Indian Rupees Three Thousand One Hundred
              Ninety Five and Sixty Six paise Only
            </div>
          </div>

          {/* Footer Section */}
          <div className="p-2">
            <div className="grid grid-cols-2 gap-4">
              {/* Left Column - Company Details */}
              <div className="text-xs">
                <div className="mb-2">
                  <span className="font-semibold">Company's PAN:</span> AACCM4395D
                </div>
                <div>
                  <div className="font-semibold mb-1">Declaration</div>
                  <div className="text-justify leading-tight">
                    We declare that this invoice shows the actual price of the goods described and that all particulars
                    are true and correct.
                  </div>
                </div>
              </div>

              {/* Right Column - Bank Details and Signature */}
              <div className="text-xs">
                <div className="mb-3">
                  <div className="font-semibold mb-1">Company's Bank Details</div>
                  <div>A/c Holder's Name: Micro Village Communications Pvt Ltd</div>
                  <div>Bank Name: KOTAK MAHINDRA BANK</div>
                  <div>A/c No.: 6211567714</div>
                  <div>Branch & IFS Code: THIPPASANDRA & KKBK0000429</div>
                </div>

                <div className="text-right mt-4">
                  <div className="mb-1">for Micro Village Communications(P) Ltd-Chennai 24-25</div>
                  <div className="mt-8 pt-2">
                    <div className="font-semibold">Authorised Signatory</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Computer Generated Invoice Footer */}
            <div className="text-center text-xs mt-3 pt-2 border-t border-gray-300">
              <div className="font-semibold">This is a Computer Generated Invoice</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
