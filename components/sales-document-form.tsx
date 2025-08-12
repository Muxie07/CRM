"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { SalesDocument, SalesItem, DocumentType } from "@/types/sales"
import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Plus, Save, FileSpreadsheet, FileIcon as FilePdf } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { formatCurrency } from "@/utils/format"
import { exportToPDF, exportToExcel } from "@/utils/export-utils"

interface ClientOption {
  id: string
  companyName: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  gstNumber?: string
  contactPerson?: string
  contactNumber?: string
  contactEmail?: string
}

interface SalesDocumentFormProps {
  initialDocument?: SalesDocument
  documentType: DocumentType
  clients?: ClientOption[]
  products?: Product[]
  onSubmit: (document: SalesDocument) => void
}

export function SalesDocumentForm({
  initialDocument,
  documentType,
  clients = [],
  products = [],
  onSubmit,
}: SalesDocumentFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Generate document number based on type
  const generateDocumentNumber = (type: DocumentType) => {
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")

    switch (type) {
      case "Quotation":
        return `QT/${year}/${month}/${random}`
      case "PurchaseOrder":
        return `PO/${year}/${month}/${random}`
      case "ProformaInvoice":
        return `PI/${year}/${month}/${random}`
      case "TaxInvoice":
        return `INV/${year}/${month}/${random}`
      case "Receipt":
        return `RCT/${year}/${month}/${random}`
      default:
        return `DOC/${year}/${month}/${random}`
    }
  }

  // Initialize document state
  const [document, setDocument] = useState<SalesDocument>(
    initialDocument || {
      id: `doc-${Date.now()}`,
      documentType,
      documentNumber: generateDocumentNumber(documentType),
      clientId: "",
      date: new Date().toISOString().split("T")[0],
      items: [
        {
          id: `item-${Date.now()}`,
          productId: "",
          description: "",
          quantity: 1,
          unitPrice: 0,
          tax: 0,
          total: 0,
        },
      ],
      subtotal: 0,
      tax: 0,
      total: 0,
      notes: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  )

  // Selected client for display
  const [selectedClient, setSelectedClient] = useState<ClientOption | undefined>(undefined)

  // Update calculations whenever items change
  useEffect(() => {
    const subtotal = document.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
    const tax = document.items.reduce((sum, item) => sum + item.tax, 0)
    const total = subtotal + tax

    setDocument((prev) => ({
      ...prev,
      subtotal,
      tax,
      total,
    }))
  }, [document.items])

  // Handle client selection
  const handleClientChange = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId)
    setSelectedClient(client)
    setDocument((prev) => ({
      ...prev,
      clientId,
    }))
  }

  // Handle document form field changes
  const handleDocumentChange = (field: keyof SalesDocument, value: any) => {
    setDocument((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Update item and recalculate its total
  const updateItem = (index: number, field: keyof SalesItem, value: any) => {
    const updatedItems = [...document.items]

    // Update the specified field
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === "quantity" || field === "unitPrice" || field === "tax" ? Number(value) : value,
    }

    // If quantity or unit price changed, recalculate total and tax
    if (field === "quantity" || field === "unitPrice") {
      const item = updatedItems[index]
      const itemTotal = item.quantity * item.unitPrice
      // Assume tax is 18% of the total
      const itemTax = Math.round(itemTotal * 0.18)

      updatedItems[index] = {
        ...updatedItems[index],
        tax: itemTax,
        total: itemTotal + itemTax,
      }
    }

    setDocument((prev) => ({
      ...prev,
      items: updatedItems,
    }))
  }

  // Handle product selection
  const handleProductSelect = (index: number, productId: string) => {
    const product = products.find((p) => p.id === productId)

    if (product) {
      const updatedItems = [...document.items]
      const quantity = updatedItems[index].quantity || 1
      const total = quantity * product.price
      const tax = Math.round(total * 0.18) // Assuming 18% tax

      updatedItems[index] = {
        ...updatedItems[index],
        productId,
        description: product.name,
        unitPrice: product.price,
        quantity,
        tax,
        total: total + tax,
      }

      setDocument((prev) => ({
        ...prev,
        items: updatedItems,
      }))
    }
  }

  // Add a new blank item
  const addItem = () => {
    setDocument((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: `item-${Date.now()}`,
          productId: "",
          description: "",
          quantity: 1,
          unitPrice: 0,
          tax: 0,
          total: 0,
        },
      ],
    }))
  }

  // Remove an item
  const removeItem = (index: number) => {
    if (document.items.length > 1) {
      const updatedItems = [...document.items]
      updatedItems.splice(index, 1)
      setDocument((prev) => ({
        ...prev,
        items: updatedItems,
      }))
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const updatedDocument = {
        ...document,
        updatedAt: new Date().toISOString(),
      }

      onSubmit(updatedDocument)

      // Enhance the success toast to show document details
      toast({
        title: "Success",
        description: `${documentType} ${document.documentNumber} has been saved successfully.`,
      })
    } catch (error) {
      console.error("Error saving document:", error)
      toast({
        title: "Error",
        description: `Failed to save ${documentType.toLowerCase()}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
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
        description: `${documentType} exported as ${format.toUpperCase()} successfully.`,
      })
    } catch (error) {
      console.error(`Error exporting to ${format}:`, error)
      toast({
        title: "Error",
        description: `Failed to export as ${format.toUpperCase()}. Please try again.`,
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="client">Select Client</Label>
              <Select value={document.clientId} onValueChange={handleClientChange}>
                <SelectTrigger id="client">
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.companyName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedClient && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium mb-2">{selectedClient.companyName}</h3>
                <p className="text-sm text-gray-600">
                  {selectedClient.address}
                  <br />
                  {selectedClient.city}, {selectedClient.state} - {selectedClient.pincode}
                  <br />
                  {selectedClient.gstNumber && (
                    <>
                      GSTIN: {selectedClient.gstNumber}
                      <br />
                    </>
                  )}
                  Contact: {selectedClient.contactPerson} | {selectedClient.contactNumber}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{documentType} Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="documentNumber">Document Number</Label>
              <Input
                id="documentNumber"
                value={document.documentNumber}
                onChange={(e) => handleDocumentChange("documentNumber", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={document.date}
                onChange={(e) => handleDocumentChange("date", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={document.notes || ""}
                onChange={(e) => handleDocumentChange("notes", e.target.value)}
                placeholder="Add any additional notes or terms here..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Product</th>
                  <th className="text-left py-2 px-4">Description</th>
                  <th className="text-right py-2 px-4">Qty</th>
                  <th className="text-right py-2 px-4">Unit Price (₹)</th>
                  <th className="text-right py-2 px-4">Tax (₹)</th>
                  <th className="text-right py-2 px-4">Total (₹)</th>
                  <th className="text-center py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {document.items.map((item, index) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2 px-4">
                      <Select value={item.productId} onValueChange={(value) => handleProductSelect(index, value)}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-2 px-4">
                      <Input
                        value={item.description}
                        onChange={(e) => updateItem(index, "description", e.target.value)}
                        placeholder="Item description"
                      />
                    </td>
                    <td className="py-2 px-4">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, "quantity", e.target.value)}
                        className="w-20 text-right"
                      />
                    </td>
                    <td className="py-2 px-4">
                      <Input
                        type="number"
                        min="0"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(index, "unitPrice", e.target.value)}
                        className="w-32 text-right"
                      />
                    </td>
                    <td className="py-2 px-4 text-right font-medium">₹{formatCurrency(item.tax)}</td>
                    <td className="py-2 px-4 text-right font-medium">
                      ₹{formatCurrency(item.unitPrice * item.quantity + item.tax)}
                    </td>
                    <td className="py-2 px-4 text-center">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(index)}
                        disabled={document.items.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Button type="button" variant="outline" size="sm" className="mt-4" onClick={addItem}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-end space-y-4">
          <div className="w-full md:w-72 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{formatCurrency(document.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>₹{formatCurrency(document.tax)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₹{formatCurrency(document.total)}</span>
            </div>
          </div>
        </CardFooter>
      </Card>

      <div className="flex flex-wrap justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>

        <div className="flex-1"></div>

        <Button type="button" variant="outline" onClick={() => handleExport("excel")}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Export to Excel
        </Button>

        <Button type="button" variant="outline" onClick={() => handleExport("pdf")}>
          <FilePdf className="h-4 w-4 mr-2" />
          Export to PDF
        </Button>

        <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
              Saving...
            </span>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save {documentType}
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
