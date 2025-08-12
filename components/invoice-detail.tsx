"use client"

import type { Invoice } from "@/types/invoice"
import { formatCurrency, formatDate, getDueStatus } from "@/utils/format"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Printer, Send, Edit, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRef, useState } from "react"
import { generatePDF, sendInvoiceEmail, printElement } from "@/utils/pdf-generator"
import { useToast } from "@/components/ui/use-toast"

interface InvoiceDetailProps {
  invoice: Invoice
  isProforma?: boolean
}

export function InvoiceDetail({ invoice, isProforma = false }: InvoiceDetailProps) {
  const statusColors = {
    Draft: "bg-gray-100 text-gray-800",
    Sent: "bg-blue-100 text-blue-800",
    Paid: "bg-green-100 text-green-800",
    Overdue: "bg-red-100 text-red-800",
    Cancelled: "bg-yellow-100 text-yellow-800",
    Converted: "bg-purple-100 text-purple-800",
  }

  const invoiceRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState({
    download: false,
    send: false,
    print: false,
    convert: false,
  })

  const basePath = isProforma ? "/admin/proforma-invoices" : "/admin/invoices"

  // Handle PDF download
  const handleDownload = async () => {
    if (!invoiceRef.current) return

    setIsLoading((prev) => ({ ...prev, download: true }))
    try {
      const filename = isProforma
        ? `Proforma-Invoice-${invoice.invoiceNumber}.pdf`
        : `Invoice-${invoice.invoiceNumber}.pdf`
      await generatePDF(invoiceRef.current, filename)
      toast({
        title: "Success",
        description: `${isProforma ? "Proforma Invoice" : "Invoice"} ${invoice.invoiceNumber} downloaded successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to download ${isProforma ? "proforma invoice" : "invoice"}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading((prev) => ({ ...prev, download: false }))
    }
  }

  // Handle email sending
  const handleSend = async () => {
    setIsLoading((prev) => ({ ...prev, send: true }))
    try {
      const success = await sendInvoiceEmail(invoice.id, invoice.customerEmail || "", isProforma)
      if (success) {
        toast({
          title: "Success",
          description: `${isProforma ? "Proforma Invoice" : "Invoice"} ${invoice.invoiceNumber} sent to ${invoice.customerEmail || "customer"}.`,
        })
      } else {
        throw new Error(`Failed to send ${isProforma ? "proforma invoice" : "invoice"}`)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to send ${isProforma ? "proforma invoice" : "invoice"}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading((prev) => ({ ...prev, send: false }))
    }
  }

  // Handle printing
  const handlePrint = () => {
    setIsLoading((prev) => ({ ...prev, print: true }))
    try {
      printElement("invoice-printable")
      toast({
        title: "Success",
        description: "Print dialog opened.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to print ${isProforma ? "proforma invoice" : "invoice"}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading((prev) => ({ ...prev, print: false }))
    }
  }

  // Handle convert to invoice (for proforma invoices)
  const handleConvert = async () => {
    if (!isProforma) return

    setIsLoading((prev) => ({ ...prev, convert: true }))
    try {
      // In a real app, this would be an API call
      setTimeout(() => {
        toast({
          title: "Success",
          description: `Proforma Invoice ${invoice.invoiceNumber} converted to Invoice successfully.`,
        })
        setIsLoading((prev) => ({ ...prev, convert: false }))
      }, 1000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert proforma invoice. Please try again.",
        variant: "destructive",
      })
      setIsLoading((prev) => ({ ...prev, convert: false }))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Link href={basePath} className="flex items-center text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to {isProforma ? "Proforma Invoices" : "Invoices"}
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`${basePath}/${invoice.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
          {isProforma && invoice.status !== "Converted" && (
            <Button variant="outline" size="sm" onClick={handleConvert} disabled={isLoading.convert}>
              {isLoading.convert ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Converting...
                </span>
              ) : (
                <>
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Convert to Invoice
                </>
              )}
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleSend} disabled={isLoading.send || !invoice.customerEmail}>
            {isLoading.send ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload} disabled={isLoading.download}>
            {isLoading.download ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Downloading...
              </span>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint} disabled={isLoading.print}>
            {isLoading.print ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Printing...
              </span>
            ) : (
              <>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </>
            )}
          </Button>
        </div>
      </div>

      <div id="invoice-printable">
        <Card className="border-t-4 border-t-blue-600" ref={invoiceRef}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between mb-8">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center mb-4">
                  <Image src="/diac-logo.jpg" alt="DIAC ENGINEERING Logo" width={150} height={60} className="mr-2" />
                </div>
                <div>
                  <p className="font-medium">DIAC ENGINEERING</p>
                  <p className="text-sm text-gray-500">123 Engineering Street</p>
                  <p className="text-sm text-gray-500">Chennai, Tamil Nadu 600001</p>
                  <p className="text-sm text-gray-500">India</p>
                  <p className="text-sm text-gray-500">GST: 33AABCT1234Z1Z5</p>
                </div>
              </div>
              <div className="text-right">
                <h1 className="text-2xl font-bold mb-2">{isProforma ? "PROFORMA INVOICE" : "INVOICE"}</h1>
                <p className="text-lg font-medium">{invoice.invoiceNumber}</p>
                <div className="mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[invoice.status]}`}>
                    {invoice.status}
                  </span>
                </div>
                <div className="mt-4 text-sm">
                  <p>
                    <span className="font-medium">Date: </span>
                    {formatDate(invoice.date)}
                  </p>
                  <p>
                    <span className="font-medium">Due Date: </span>
                    {formatDate(invoice.dueDate)}
                  </p>
                  <p className="mt-1 font-medium">{getDueStatus(invoice.dueDate)}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">BILL TO</h3>
                <p className="font-medium">{invoice.customerName}</p>
                {invoice.customerAddress && <p className="text-sm">{invoice.customerAddress}</p>}
                <p className="text-sm">{invoice.customerPhone}</p>
                {invoice.customerEmail && <p className="text-sm">{invoice.customerEmail}</p>}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">PAYMENT DETAILS</h3>
                <p className="font-medium">Bank Transfer</p>
                <p className="text-sm">DIAC ENGINEERING PVT LTD</p>
                <p className="text-sm">Account: 1234567890</p>
                <p className="text-sm">IFSC: HDFC0001234</p>
              </div>
            </div>

            <div className="mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4">Description</th>
                    <th className="text-right py-3 px-4">Qty</th>
                    <th className="text-right py-3 px-4">Unit Price</th>
                    <th className="text-right py-3 px-4">Tax (%)</th>
                    <th className="text-right py-3 px-4">Discount (%)</th>
                    <th className="text-right py-3 px-4">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="py-3 px-4">{item.description}</td>
                      <td className="py-3 px-4 text-right">{item.quantity}</td>
                      <td className="py-3 px-4 text-right">₹{formatCurrency(item.unitPrice)}</td>
                      <td className="py-3 px-4 text-right">{item.taxRate}%</td>
                      <td className="py-3 px-4 text-right">{item.discount}%</td>
                      <td className="py-3 px-4 text-right font-medium">₹{formatCurrency(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-6 md:mb-0 md:w-1/2">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">NOTES</h3>
                  <p className="text-sm">{invoice.notes}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">TERMS & CONDITIONS</h3>
                  <p className="text-sm">{invoice.terms}</p>
                </div>
              </div>
              <div className="md:w-1/3">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Subtotal:</span>
                    <span>₹{formatCurrency(invoice.subtotal)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Tax:</span>
                    <span>₹{formatCurrency(invoice.taxTotal)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Discount:</span>
                    <span>₹{formatCurrency(invoice.discountTotal)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200 text-lg font-bold">
                    <span>Total:</span>
                    <span>₹{formatCurrency(invoice.grandTotal)}</span>
                  </div>
                </div>
                {invoice.status === "Paid" && invoice.paymentDate && (
                  <div className="mt-4 bg-green-50 p-4 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">Paid on:</span>
                      <span>{formatDate(invoice.paymentDate)}</span>
                    </div>
                    {invoice.paymentMethod && (
                      <div className="flex justify-between mt-1">
                        <span className="font-medium">Payment Method:</span>
                        <span>{invoice.paymentMethod}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-500">
            Thank you for your business! For any queries, please contact us at support@diacengineering.com or call us at
            +91 98765 43210.
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
