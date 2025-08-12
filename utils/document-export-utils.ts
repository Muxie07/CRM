import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import * as XLSX from "xlsx"
import type { DocumentData } from "@/components/enhanced-document-template"

// Function to export document to PDF
export const exportToPDF = async (element: HTMLElement, filename: string): Promise<void> => {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    })

    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const imgWidth = 210 // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
    pdf.save(`${filename}.pdf`)

    return Promise.resolve()
  } catch (error) {
    console.error("Error exporting to PDF:", error)
    return Promise.reject(error)
  }
}

// Function to export document to Excel
export const exportToExcel = (data: any[], filename: string): void => {
  try {
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet(data)

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Document")

    // Generate Excel file
    XLSX.writeFile(wb, `${filename}.xlsx`)
  } catch (error) {
    console.error("Error exporting to Excel:", error)
    throw error
  }
}

// Function to convert document data to Excel format
export const convertDocumentToExcelData = (document: DocumentData): any[] => {
  const result = [
    [document.documentType, "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["Document Number:", document.documentNumber, "", "Date:", document.date, "", ""],
    [
      "Reference Number:",
      document.referenceNumber || "N/A",
      "",
      "Mode of Payment:",
      document.modeOfPayment || "N/A",
      "",
      "",
    ],
    ["", "", "", "", "", "", ""],
    ["Company Information:", "", "", "", "", "", ""],
    [document.companyName, "", "", "", "", "", ""],
    [document.companyAddress, "", "", "", "", "", ""],
    ["GSTIN:", document.companyGstin, "", "Email:", document.companyEmail, "", ""],
    ["Phone:", document.companyPhone, "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ]

  if (document.consigneeName) {
    result.push(
      ["Consignee Information:", "", "", "", "", "", ""],
      [document.consigneeName, "", "", "", "", "", ""],
      [document.consigneeAddress || "", "", "", "", "", "", ""],
      ["Contact:", document.consigneeContact || "N/A", "", "State:", document.consigneeState || "N/A", "", ""],
      ["State Code:", document.consigneeCode || "N/A", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    )
  }

  if (document.documentType === "Purchase Order" && document.supplierName) {
    result.push(
      ["Supplier Information:", "", "", "", "", "", ""],
      [document.supplierName, "", "", "", "", "", ""],
      [document.supplierAddress || "", "", "", "", "", "", ""],
      ["Email:", document.supplierEmail || "N/A", "", "GSTIN:", document.supplierGstin || "N/A", "", ""],
      ["State:", document.supplierState || "N/A", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    )
  }

  // Add items header
  result.push(["S.No", "HSN/SAC", "Description", "Quantity", "Unit", "Rate", "Amount"])

  // Add items
  document.items.forEach((item, index) => {
    result.push([index + 1, item.hsnSac || "", item.description, item.quantity, item.unit, item.unitPrice, item.amount])
  })

  // Add totals
  result.push(
    ["", "", "", "", "", "Subtotal:", document.subtotal],
    ["", "", "", "", "", "CGST:", document.cgst],
    ["", "", "", "", "", "SGST:", document.sgst],
    ["", "", "", "", "", "Rounding Off:", document.roundingOff],
    ["", "", "", "", "", "Grand Total:", document.grandTotal],
    ["", "", "", "", "", "", ""],
    ["Amount in Words:", document.amountInWords, "", "", "", "", ""],
    ["Remarks:", document.remarks || "", "", "", "", "", ""],
    ["Declaration:", document.declaration || "", "", "", "", "", ""],
  )

  return result
}

// Function to convert number to words (for Indian currency)
export const numberToWords = (num: number): string => {
  const single = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ]
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]

  if (num === 0) return "Zero"

  // Helper function to convert numbers less than 1000
  const convertLessThanOneThousand = (num: number): string => {
    if (num < 20) {
      return single[num]
    }

    const ten = Math.floor(num / 10)
    const unit = num % 10

    return tens[ten] + (unit !== 0 ? " " + single[unit] : "")
  }

  let result = ""

  // Handle crores (10 million)
  if (num >= 10000000) {
    result += convertLessThanOneThousand(Math.floor(num / 10000000)) + " Crore "
    num %= 10000000
  }

  // Handle lakhs (100 thousand)
  if (num >= 100000) {
    result += convertLessThanOneThousand(Math.floor(num / 100000)) + " Lakh "
    num %= 100000
  }

  // Handle thousands
  if (num >= 1000) {
    result += convertLessThanOneThousand(Math.floor(num / 1000)) + " Thousand "
    num %= 1000
  }

  // Handle hundreds
  if (num >= 100) {
    result += convertLessThanOneThousand(Math.floor(num / 100)) + " Hundred "
    num %= 100
  }

  // Handle tens and units
  if (num > 0) {
    result += convertLessThanOneThousand(num)
  }

  return result.trim()
}
