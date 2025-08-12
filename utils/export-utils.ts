"use client"
import * as XLSX from "xlsx"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import type { SalesDocument } from "@/types/sales"
import { formatCurrency } from "./format"

// Format date for display
export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

// Generate and download Excel file
export const exportToExcel = (document: SalesDocument) => {
  // Create worksheet data
  const wsData = [
    // Header with company info
    [`DIAC ENGINEERING`],
    [`DOCUMENT TYPE: ${document.documentType}`],
    [`DOCUMENT #: ${document.documentNumber}`],
    [`DATE: ${formatDate(document.date)}`],
    [],
    // Table header
    ["Description", "Quantity", "Unit Price (₹)", "Tax (₹)", "Total (₹)"],
  ]

  // Add items to worksheet
  document.items.forEach((item) => {
    wsData.push([item.description, item.quantity, item.unitPrice, item.tax, item.total])
  })

  // Add totals
  wsData.push(
    [],
    ["", "", "", "Subtotal:", document.subtotal],
    ["", "", "", "Tax:", document.tax],
    ["", "", "", "Total:", document.total],
  )

  if (document.notes) {
    wsData.push([], ["Notes:", document.notes])
  }

  // Create worksheet and workbook
  const ws = XLSX.utils.aoa_to_sheet(wsData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "Document")

  // Style the worksheet (basic)
  const range = XLSX.utils.decode_range(ws["!ref"] || "A1")
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const address = XLSX.utils.encode_col(C) + "5" // Header row
    if (!ws[address]) continue
    ws[address].s = { font: { bold: true } }
  }

  // Generate file
  const fileName = `${document.documentType}_${document.documentNumber.replace(/\//g, "-")}.xlsx`
  XLSX.writeFile(wb, fileName)
}

// Generate and download PDF
export const exportToPDF = (document: SalesDocument) => {
  const doc = new jsPDF()

  // Add header
  doc.setFontSize(20)
  doc.text("DIAC ENGINEERING", 105, 20, { align: "center" })

  doc.setFontSize(12)
  doc.text(`Document Type: ${document.documentType}`, 20, 40)
  doc.text(`Document Number: ${document.documentNumber}`, 20, 50)
  doc.text(`Date: ${formatDate(document.date)}`, 20, 60)

  // Add items table
  const tableColumn = ["Description", "Qty", "Unit Price (₹)", "Tax (₹)", "Total (₹)"]
  const tableRows = document.items.map((item) => [
    item.description,
    item.quantity,
    formatCurrency(item.unitPrice),
    formatCurrency(item.tax),
    formatCurrency(item.total),
  ])

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 70,
  })

  const finalY = (doc as any).lastAutoTable.finalY + 10

  // Add totals
  doc.text(`Subtotal: ₹${formatCurrency(document.subtotal)}`, 150, finalY, { align: "right" })
  doc.text(`Tax: ₹${formatCurrency(document.tax)}`, 150, finalY + 10, { align: "right" })
  doc.text(`Total: ₹${formatCurrency(document.total)}`, 150, finalY + 20, { align: "right" })

  // Add notes if available
  if (document.notes) {
    doc.text("Notes:", 20, finalY + 40)
    doc.text(document.notes, 20, finalY + 50)
  }

  // Save the PDF
  const fileName = `${document.documentType}_${document.documentNumber.replace(/\//g, "-")}.pdf`
  doc.save(fileName)
}

// Helper to handle client company details formatting
export const getClientDetails = (client: any) => {
  if (!client) return ""

  return `${client.companyName}
${client.address}
${client.city}, ${client.state} - ${client.pincode}
GSTIN: ${client.gstNumber || "N/A"}
Contact: ${client.contactPerson} | ${client.contactNumber}`
}
