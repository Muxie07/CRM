"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { UniversalDocumentTemplate, type DocumentData } from "@/components/universal-document-template"
import { exportToPDF, exportToExcel } from "@/utils/document-export"
import { ArrowLeft, Download, Pencil, Printer } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import { useToast } from "@/components/ui/use-toast"

interface DocumentDetailProps {
  document: DocumentData
  backUrl: string
  editUrl: string
}

export function DocumentDetail({ document, backUrl, editUrl }: DocumentDetailProps) {
  const documentRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const handlePrint = () => {
    window.print()
  }

  const handleExportPDF = async () => {
    if (!documentRef.current) return

    try {
      await exportToPDF(
        "document-container",
        `${document.documentType.toLowerCase().replace(/\s+/g, "_")}_${document.documentNumber}`,
      )
      toast({
        title: "Success",
        description: `${document.documentType} exported to PDF successfully`,
        duration: 3000,
      })
    } catch (error) {
      console.error("Error exporting to PDF:", error)
      toast({
        title: "Error",
        description: `Failed to export ${document.documentType} to PDF`,
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  const handleExportExcel = async () => {
    if (!document) return

    try {
      // Prepare data for Excel export
      const excelData = [
        [document.documentType.toUpperCase()],
        [],
        ["Document No.", document.documentNumber, "", "Date", document.date],
        ["Reference No.", document.referenceNumber, "", "Mode of Payment", document.modeOfPayment],
        [],
        ["Invoice to:", "", "Supplier/Client:"],
        [document.companyName, "", document.supplierName || document.clientName],
        [document.companyAddress, "", document.supplierAddress || document.clientAddress],
        ["GSTIN: " + document.companyGstin, "", "GSTIN: " + (document.supplierGstin || document.clientGstin)],
        ["Email: " + document.companyEmail, "", "Email: " + (document.supplierEmail || document.clientEmail)],
        [],
        ["S.No", "HSN/SAC", "Description", "Quantity", "Unit", "Rate/Unit", "Amount"],
      ]

      // Add items
      document.items.forEach((item, index) => {
        excelData.push([
          index + 1,
          item.hsnSac,
          item.description,
          item.quantity,
          item.unit,
          item.unitPrice,
          item.amount,
        ])
      })

      // Add totals
      excelData.push(
        ["", "", "", "", "", "Sub Total", document.subtotal],
        ["", "", "", "", "", "CGST @ 9%", document.cgst],
        ["", "", "", "", "", "SGST @ 9%", document.sgst],
        ["", "", "", "", "", "Rounding Off", document.roundingOff || 0],
        ["", "", "", "", "", "Grand Total", document.grandTotal],
      )

      // Add additional information
      excelData.push(
        [],
        ["Amount in words:", document.amountInWords],
        ["Remarks:", document.remarks || ""],
        ["Declaration:", document.declaration],
      )

      await exportToExcel(
        excelData,
        `${document.documentType.toLowerCase().replace(/\s+/g, "_")}_${document.documentNumber}`,
      )
      toast({
        title: "Success",
        description: `${document.documentType} exported to Excel successfully`,
        duration: 3000,
      })
    } catch (error) {
      console.error("Error exporting to Excel:", error)
      toast({
        title: "Error",
        description: `Failed to export ${document.documentType} to Excel`,
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <Link href={backUrl} className="inline-flex items-center text-gray-600 hover:text-black">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {document.documentType}s
        </Link>

        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={handlePrint}>
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={handleExportPDF}>
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={handleExportExcel}>
            <Download className="w-4 h-4" />
            Export Excel
          </Button>
          <Link href={editUrl}>
            <Button variant="outline" className="flex items-center gap-2">
              <Pencil className="w-4 h-4" />
              Edit
            </Button>
          </Link>
        </div>
      </div>

      <div id="document-container" ref={documentRef}>
        <Card className="print:shadow-none print:border-none">
          <UniversalDocumentTemplate data={document} />
        </Card>
      </div>
    </>
  )
}
