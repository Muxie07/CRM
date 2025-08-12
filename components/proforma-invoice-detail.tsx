"use client"

import { formatCurrency } from "@/utils/format"
import { formatDate } from "@/utils/format"
import type { Invoice } from "@/types/invoice"
import { Button } from "@/components/ui/button"
import { Printer, Download, Send } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ProformaInvoiceDetailProps {
  invoice: Invoice
}

export function ProformaInvoiceDetail({ invoice }: ProformaInvoiceDetailProps) {
  const { toast } = useToast()

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your proforma invoice is being downloaded.",
    })
    // In a real app, this would generate and download a PDF
  }

  const handleSend = () => {
    toast({
      title: "Email sent",
      description: `Proforma invoice has been sent to ${invoice.customerEmail || "the customer"}.`,
    })
    // In a real app, this would send the invoice via email
  }

  // Convert number to words for Indian Rupees
  const amountInWords = (amount: number) => {
    // This is a simplified version. In a real app, you'd use a more robust solution
    const ones = [
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

    const numToWords = (num: number) => {
      if (num < 20) return ones[num]
      if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? " " + ones[num % 10] : "")
      if (num < 1000)
        return ones[Math.floor(num / 100)] + " Hundred" + (num % 100 !== 0 ? " " + numToWords(num % 100) : "")
      if (num < 100000)
        return numToWords(Math.floor(num / 1000)) + " Thousand" + (num % 1000 !== 0 ? " " + numToWords(num % 1000) : "")
      if (num < 10000000)
        return (
          numToWords(Math.floor(num / 100000)) + " Lakh" + (num % 100000 !== 0 ? " " + numToWords(num % 100000) : "")
        )
      return (
        numToWords(Math.floor(num / 10000000)) +
        " Crore" +
        (num % 10000000 !== 0 ? " " + numToWords(num % 10000000) : "")
      )
    }

    const rupees = Math.floor(amount)
    const paise = Math.round((amount - rupees) * 100)

    let result = numToWords(rupees)
    if (paise > 0) {
      result += " and " + numToWords(paise) + " Paise"
    }

    return result + " only"
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Action buttons */}
      <div className="flex justify-end gap-2 p-4 print:hidden">
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        <Button variant="outline" size="sm" onClick={handleSend}>
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </div>

      {/* Proforma Invoice Content */}
      <div className="p-6 print:p-0" id="printable-area">
        <div className="border border-gray-300 print:border-black">
          {/* Header Row */}
          <div className="grid grid-cols-8 border-b border-gray-300 print:border-black">
            <div className="col-span-2 p-2 border-r border-gray-300 print:border-black font-bold">Proforma invoice</div>
            <div className="col-span-4 p-2 border-r border-gray-300 print:border-black">
              <div className="grid grid-cols-1">
                <div className="p-2 border-b border-gray-300 print:border-black">DIAC</div>
                <div className="p-2">{invoice.customerName}</div>
              </div>
            </div>
            <div className="col-span-2 p-2">
              <div className="grid grid-cols-1">
                <div className="grid grid-cols-2 border-b border-gray-300 print:border-black">
                  <div className="p-2 border-r border-gray-300 print:border-black">PI Invoice</div>
                  <div className="p-2">{invoice.invoiceNumber}</div>
                </div>
                <div className="grid grid-cols-2 border-b border-gray-300 print:border-black">
                  <div className="p-2 border-r border-gray-300 print:border-black">Dated</div>
                  <div className="p-2">{formatDate(invoice.date)}</div>
                </div>
                <div className="grid grid-cols-2 border-b border-gray-300 print:border-black">
                  <div className="p-2 border-r border-gray-300 print:border-black">Reference</div>
                  <div className="p-2">{invoice.saleId || "N/A"}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="p-2 border-r border-gray-300 print:border-black">Mode/Term</div>
                  <div className="p-2">{invoice.paymentMethod || "N/A"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Consignee Row */}
          <div className="grid grid-cols-8 border-b border-gray-300 print:border-black">
            <div className="col-span-1 p-2 border-r border-gray-300 print:border-black font-bold">Consignee</div>
            <div className="col-span-5 p-2 border-r border-gray-300 print:border-black">{invoice.customerAddress}</div>
            <div className="col-span-2 p-2">
              <div className="grid grid-cols-1">
                <div className="grid grid-cols-2 border-b border-gray-300 print:border-black">
                  <div className="p-2 border-r border-gray-300 print:border-black">Order</div>
                  <div className="p-2">N/A</div>
                </div>
                <div className="grid grid-cols-2 border-b border-gray-300 print:border-black">
                  <div className="p-2 border-r border-gray-300 print:border-black">Dispatch</div>
                  <div className="p-2">N/A</div>
                </div>
                <div className="grid grid-cols-2 border-b border-gray-300 print:border-black">
                  <div className="p-2 border-r border-gray-300 print:border-black">Delivery</div>
                  <div className="p-2">N/A</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="p-2 border-r border-gray-300 print:border-black">Dispatched</div>
                  <div className="p-2">N/A</div>
                </div>
              </div>
            </div>
          </div>

          {/* Buyer Row */}
          <div className="grid grid-cols-8 border-b border-gray-300 print:border-black">
            <div className="col-span-1 p-2 border-r border-gray-300 print:border-black font-bold">Buyer</div>
            <div className="col-span-5 p-2 border-r border-gray-300 print:border-black">
              {invoice.customerName}
              <br />
              {invoice.customerPhone}
              <br />
              {invoice.customerEmail}
            </div>
            <div className="col-span-2 p-2">
              <div className="grid grid-cols-1">
                <div className="grid grid-cols-2">
                  <div className="p-2 border-r border-gray-300 print:border-black">Terms of</div>
                  <div className="p-2">N/A</div>
                </div>
              </div>
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-8 border-b border-gray-300 print:border-black font-bold">
            <div className="col-span-1 p-2 border-r border-gray-300 print:border-black">S.No</div>
            <div className="col-span-1 p-2 border-r border-gray-300 print:border-black">HSN/SAC</div>
            <div className="col-span-2 p-2 border-r border-gray-300 print:border-black">Description of Goods</div>
            <div className="col-span-1 p-2 border-r border-gray-300 print:border-black text-center">Quantity</div>
            <div className="col-span-1 p-2 border-r border-gray-300 print:border-black text-center">Per</div>
            <div className="col-span-1 p-2 border-r border-gray-300 print:border-black text-right">Rate/Unit</div>
            <div className="col-span-1 p-2 text-right">Amount</div>
          </div>

          {/* Table Items */}
          {invoice.items.map((item, index) => (
            <div key={item.id} className="grid grid-cols-8 border-b border-gray-300 print:border-black">
              <div className="col-span-1 p-2 border-r border-gray-300 print:border-black">{index + 1}</div>
              <div className="col-span-1 p-2 border-r border-gray-300 print:border-black">8.5E+07</div>
              <div className="col-span-2 p-2 border-r border-gray-300 print:border-black">{item.description}</div>
              <div className="col-span-1 p-2 border-r border-gray-300 print:border-black text-center">
                {item.quantity}
              </div>
              <div className="col-span-1 p-2 border-r border-gray-300 print:border-black text-center">no</div>
              <div className="col-span-1 p-2 border-r border-gray-300 print:border-black text-right">
                ₹ {formatCurrency(item.unitPrice)}
              </div>
              <div className="col-span-1 p-2 text-right">₹ {formatCurrency(item.total)}</div>
            </div>
          ))}

          {/* Calculation Rows */}
          <div className="grid grid-cols-8 border-b border-gray-300 print:border-black">
            <div className="col-span-3 p-2 border-r border-gray-300 print:border-black">Sub Total</div>
            <div className="col-span-4 p-2 border-r border-gray-300 print:border-black"></div>
            <div className="col-span-1 p-2 text-right">₹{formatCurrency(invoice.subtotal)}</div>
          </div>

          <div className="grid grid-cols-8 border-b border-gray-300 print:border-black">
            <div className="col-span-3 p-2 border-r border-gray-300 print:border-black">OUTPUT CGST @ 9%</div>
            <div className="col-span-4 p-2 border-r border-gray-300 print:border-black"></div>
            <div className="col-span-1 p-2 text-right">₹{formatCurrency(invoice.taxTotal / 2)}</div>
          </div>

          <div className="grid grid-cols-8 border-b border-gray-300 print:border-black">
            <div className="col-span-3 p-2 border-r border-gray-300 print:border-black">OUTPUT SGST @ 9%</div>
            <div className="col-span-4 p-2 border-r border-gray-300 print:border-black"></div>
            <div className="col-span-1 p-2 text-right">₹{formatCurrency(invoice.taxTotal / 2)}</div>
          </div>

          <div className="grid grid-cols-8 border-b border-gray-300 print:border-black">
            <div className="col-span-3 p-2 border-r border-gray-300 print:border-black">Rounding Off</div>
            <div className="col-span-4 p-2 border-r border-gray-300 print:border-black"></div>
            <div className="col-span-1 p-2 text-right">
              (-)0.{invoice.grandTotal % 1 !== 0 ? Math.round((invoice.grandTotal % 1) * 100) : "00"}
            </div>
          </div>

          <div className="grid grid-cols-8 border-b border-gray-300 print:border-black">
            <div className="col-span-3 p-2 border-r border-gray-300 print:border-black font-bold">Grand Total</div>
            <div className="col-span-2 p-2 border-r border-gray-300 print:border-black text-center">
              {invoice.items.reduce((sum, item) => sum + item.quantity, 0)}
            </div>
            <div className="col-span-1 p-2 border-r border-gray-300 print:border-black text-center">no</div>
            <div className="col-span-1 p-2 border-r border-gray-300 print:border-black"></div>
            <div className="col-span-1 p-2 text-right font-bold">
              ₹ {formatCurrency(Math.round(invoice.grandTotal))}
            </div>
          </div>

          {/* Amount in Words */}
          <div className="grid grid-cols-8 border-b border-gray-300 print:border-black">
            <div className="col-span-3 p-2 border-r border-gray-300 print:border-black">
              Amount Chargeable (in words) :
            </div>
            <div className="col-span-5 p-2">{amountInWords(Math.round(invoice.grandTotal))}</div>
          </div>

          {/* Remarks */}
          <div className="grid grid-cols-8 border-b border-gray-300 print:border-black">
            <div className="col-span-3 p-2 border-r border-gray-300 print:border-black">Remarks -</div>
            <div className="col-span-5 p-2">{invoice.notes}</div>
          </div>

          {/* Company Details */}
          <div className="grid grid-cols-8">
            <div className="col-span-3 p-2 border-r border-gray-300 print:border-black">Company</div>
            <div className="col-span-5 p-2">
              A/c
              <br />
              A/c No. :10193804392
              <br />
              Branch & IFS Code : VALASARAVAKKAM / IDFB0080135
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
