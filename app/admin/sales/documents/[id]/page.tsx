"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Edit, Printer, Download, FileSpreadsheet, FileIcon as FilePdf, Send } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { salesDocuments } from "@/data/sales-documents"
import { clients } from "@/data/clients"
import { formatCurrency } from "@/utils/format"
import { exportToPDF, exportToExcel, formatDate } from "@/utils/export-utils"
import { useToast } from "@/components/ui/use-toast"

export default function SalesDocumentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)

  const document = salesDocuments.find((doc) => doc.id === params.id)
  const client = clients.find((c) => document && c.id === document.clientId)

  if (!document) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-2xl font-bold">Document not found</h2>
          <p className="text-muted-foreground mt-2">The document you're looking for doesn't exist.</p>
          <Button className="mt-4" asChild>
            <Link href="/admin/sales/documents">Back to Documents</Link>
          </Button>
        </div>
      </AdminLayout>
    )
  }

  // Badge variant based on document type
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "Quotation":
        return "default"
      case "PurchaseOrder":
        return "secondary"
      case "ProformaInvoice":
        return "outline"
      case "TaxInvoice":
        return "destructive"
      case "Receipt":
        return "success"
      default:
        return "default"
    }
  }

  // Handle document export
  const handleExport = (format: "pdf" | "excel") => {
    try {
      if (format === "pdf") {
        exportToPDF(document)
      } else {
        exportToExcel(document)
      }

      toast({
        title: "Success",
        description: `${document.documentType} exported as ${format.toUpperCase()} successfully.`,
      })

      setIsExportDialogOpen(false)
    } catch (error) {
      console.error(`Error exporting to ${format}:`, error)
      toast({
        title: "Error",
        description: `Failed to export as ${format.toUpperCase()}. Please try again.`,
        variant: "destructive",
      })
    }
  }

  // Handle print document
  const handlePrint = () => {
    window.print()
  }

  // Handle send document email
  const handleSendEmail = () => {
    // In a real app, this would open a dialog to enter email details
    toast({
      title: "Email Sent",
      description: `${document.documentType} ${document.documentNumber} has been emailed to the client.`,
    })
  }

  return (
    <AdminLayout>
      <div className="p-6" id="documentPrint">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {document.documentNumber}{" "}
                <Badge variant={getBadgeVariant(document.documentType) as any}>{document.documentType}</Badge>
              </h1>
              <p className="text-muted-foreground">Created {formatDate(document.createdAt)}</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" onClick={() => setIsExportDialogOpen(true)}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" onClick={handleSendEmail}>
              <Send className="mr-2 h-4 w-4" />
              Send
            </Button>
            <Button asChild>
              <Link href={`/admin/sales/documents/${document.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Document Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-lg font-bold">DIAC ENGINEERING</h2>
                    <p className="text-gray-500">
                      123 Industrial Area, Phase 1<br />
                      Chennai, Tamil Nadu - 600001
                      <br />
                      GSTIN: 33ABCDE1234F1Z5
                      <br />
                      Phone: +91 98765 43210
                    </p>
                  </div>
                  <div className="text-right">
                    <h3 className="font-medium">
                      {document.documentType} #{document.documentNumber}
                    </h3>
                    <p className="text-gray-500">Date: {formatDate(document.date)}</p>
                  </div>
                </div>

                <div className="border-t border-b py-4">
                  <h3 className="font-medium mb-2">Client Information</h3>
                  {client ? (
                    <p className="text-gray-600">
                      {client.companyName}
                      <br />
                      {client.address}
                      <br />
                      {client.city}, {client.state} - {client.pincode}
                      <br />
                      {client.gstNumber && (
                        <>
                          GSTIN: {client.gstNumber}
                          <br />
                        </>
                      )}
                      Contact: {client.contactPerson} | {client.contactNumber}
                    </p>
                  ) : (
                    <p className="text-red-500">Client information not available</p>
                  )}
                </div>

                <div>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2 text-right">Qty</th>
                        <th className="px-4 py-2 text-right">Unit Price (₹)</th>
                        <th className="px-4 py-2 text-right">Tax (₹)</th>
                        <th className="px-4 py-2 text-right">Total (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {document.items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-2">{item.description}</td>
                          <td className="px-4 py-2 text-right">{item.quantity}</td>
                          <td className="px-4 py-2 text-right">{formatCurrency(item.unitPrice)}</td>
                          <td className="px-4 py-2 text-right">{formatCurrency(item.tax)}</td>
                          <td className="px-4 py-2 text-right font-medium">
                            {formatCurrency(item.unitPrice * item.quantity + item.tax)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-4 flex justify-end">
                    <div className="w-64 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal:</span>
                        <span>₹{formatCurrency(document.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax:</span>
                        <span>₹{formatCurrency(document.tax)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-2 border-t">
                        <span>Total:</span>
                        <span>₹{formatCurrency(document.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {document.notes && (
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-2">Notes</h3>
                    <p className="text-gray-600">{document.notes}</p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <p className="text-gray-600 text-sm">Thank you for your business.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xs font-bold">1</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium">Created</p>
                      <p className="text-xs text-gray-500">{formatDate(document.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-xs font-bold">2</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium">Last Updated</p>
                      <p className="text-xs text-gray-500">{formatDate(document.updatedAt)}</p>
                    </div>
                  </div>
                  {/* Additional timeline items would go here based on document status */}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Related Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-500 text-sm">
                  {document.documentType === "Quotation" && (
                    <p>No related documents yet. Create a Purchase Order based on this quotation.</p>
                  )}

                  {document.documentType === "PurchaseOrder" && (
                    <div className="space-y-2">
                      <p>Create related documents:</p>
                      <Button size="sm" variant="outline" asChild className="w-full">
                        <Link href={`/admin/sales/documents/new?type=ProformaInvoice&from=${document.id}`}>
                          Create Proforma Invoice
                        </Link>
                      </Button>
                    </div>
                  )}

                  {document.documentType === "ProformaInvoice" && (
                    <div className="space-y-2">
                      <p>Create related documents:</p>
                      <Button size="sm" variant="outline" asChild className="w-full">
                        <Link href={`/admin/sales/documents/new?type=TaxInvoice&from=${document.id}`}>
                          Create Tax Invoice
                        </Link>
                      </Button>
                    </div>
                  )}

                  {document.documentType === "TaxInvoice" && (
                    <div className="space-y-2">
                      <p>Create related documents:</p>
                      <Button size="sm" variant="outline" asChild className="w-full">
                        <Link href={`/admin/sales/documents/new?type=Receipt&from=${document.id}`}>Create Receipt</Link>
                      </Button>
                    </div>
                  )}

                  {document.documentType === "Receipt" && <p>This is the final document in the sales process.</p>}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Export Dialog */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Document</DialogTitle>
            <DialogDescription>
              Choose the format to export {document.documentType} {document.documentNumber}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 p-4"
              onClick={() => handleExport("pdf")}
            >
              <FilePdf className="h-8 w-8 mb-2" />
              PDF Format
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 p-4"
              onClick={() => handleExport("excel")}
            >
              <FileSpreadsheet className="h-8 w-8 mb-2" />
              Excel Format
            </Button>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
