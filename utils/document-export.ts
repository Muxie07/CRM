import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import * as XLSX from "xlsx"

// Function to export document to PDF - uppercase version
export const exportToPDF = async (elementId: string, filename: string): Promise<void> => {
  try {
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error(`Element with ID ${elementId} not found!`)
    }

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

// Add lowercase version as an alias to maintain compatibility
export const exportToPdf = exportToPDF

// Function to export document to Excel
export const exportToExcel = async (data: any[], filename: string): Promise<void> => {
  try {
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet(data)

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Purchase Order")

    // Generate Excel file
    XLSX.writeFile(wb, `${filename}.xlsx`)

    return Promise.resolve()
  } catch (error) {
    console.error("Error exporting to Excel:", error)
    return Promise.reject(error)
  }
}

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

// Add number to words function for amount in words
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
