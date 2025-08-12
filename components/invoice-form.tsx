"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, Plus, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  UniversalDocumentTemplate,
  type DocumentData,
  type DocumentType,
} from "@/components/universal-document-template"
import { numberToWords } from "@/utils/document-export"

interface InvoiceFormProps {
  initialData?: DocumentData
  onSubmit: (data: DocumentData) => void
  documentType: DocumentType
  clients?: { id: string; name: string; phone: string; email?: string; address?: string }[]
}

export function InvoiceForm({ initialData, onSubmit, documentType = "Tax Invoice", clients = [] }: InvoiceFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize document data
  const [documentData, setDocumentData] = useState<DocumentData>(
    initialData || {
      id: `doc-${Date.now()}`,
      documentType,
      documentNumber: `${documentType === "Purchase Order" ? "PO" : "INV"}-DIAC-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toISOString().split("T")[0],

      // Company information
      companyName: "DIAC Engineering",
      companyAddress: "124, MMDA Colony, Arumbakkam, Chennai - 600 106, Tamil Nadu, India",
      companyGstin: "33AAWFD9550G1Z1",
      companyEmail: "diacengineering@gmail.com",
      companyPhone: "+9144 46902054 /+91 9741811177",

      // Items
      items: [
        {
          id: `item-${Date.now()}`,
          hsnSac: "",
          description: "",
          quantity: 1,
          unit: "nos",
          unitPrice: 0,
          amount: 0,
        },
      ],

      // Totals
      subtotal: 0,
      cgst: 0,
      sgst: 0,
      roundingOff: 0,
      grandTotal: 0,

      // Additional information
      amountInWords: "Zero only",
      declaration: `We declare that this ${documentType.toLowerCase()} shows the actual price of the goods described and that all particulars are true and correct.`,
    },
  )

  // Calculate totals whenever items change
  useEffect(() => {
    const subtotal = documentData.items.reduce((sum, item) => sum + item.amount, 0)
    const cgst = Math.round(subtotal * 0.09)
    const sgst = Math.round(subtotal * 0.09)
    const total = subtotal + cgst + sgst
    const roundedTotal = Math.round(total)
    const roundingOff = roundedTotal - total

    // Convert to words
    const amountInWords = `${numberToWords(roundedTotal)} only`

    setDocumentData((prev) => ({
      ...prev,
      subtotal,
      cgst,
      sgst,
      roundingOff,
      grandTotal: roundedTotal,
      amountInWords,
    }))
  }, [documentData.items])

  // Update item amount when quantity or unit price changes
  const updateItemAmount = (index: number) => {
    const item = documentData.items[index]
    const amount = item.quantity * item.unitPrice

    const updatedItems = [...documentData.items]
    updatedItems[index] = {
      ...updatedItems[index],
      amount,
    }

    setDocumentData((prev) => ({
      ...prev,
      items: updatedItems,
    }))
  }

  // Handle item field change
  const handleItemChange = (index: number, field: keyof DocumentData["items"][0], value: any) => {
    const updatedItems = [...documentData.items]
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === "quantity" || field === "unitPrice" ? Number(value) : value,
    }

    setDocumentData((prev) => ({
      ...prev,
      items: updatedItems,
    }))

    if (field === "quantity" || field === "unitPrice") {
      setTimeout(() => updateItemAmount(index), 0)
    }
  }

  // Add new item
  const addItem = () => {
    setDocumentData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: `item-${Date.now()}`,
          hsnSac: "",
          description: "",
          quantity: 1,
          unit: "nos",
          unitPrice: 0,
          amount: 0,
        },
      ],
    }))
  }

  // Remove item
  const removeItem = (index: number) => {
    if (documentData.items.length > 1) {
      const updatedItems = [...documentData.items]
      updatedItems.splice(index, 1)

      setDocumentData((prev) => ({
        ...prev,
        items: updatedItems,
      }))
    }
  }

  // Handle client selection
  const handleClientChange = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId)

    if (client) {
      setDocumentData((prev) => ({
        ...prev,
        consigneeName: client.name,
        consigneeAddress: client.address || "",
        consigneeContact: client.phone,
      }))
    }
  }

  // Handle form field change
  const handleFieldChange = (field: keyof DocumentData, value: any) => {
    setDocumentData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Call the onSubmit callback
      onSubmit(documentData)

      // Show success toast
      toast({
        title: "Success",
        description: `${documentData.documentType} ${documentData.documentNumber} has been saved successfully.`,
      })
    } catch (error) {
      console.error("Error saving document:", error)

      toast({
        title: "Error",
        description: `Failed to save ${documentData.documentType.toLowerCase()}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "edit" | "preview")}>
        <TabsList className="mb-4">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Document Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="documentNumber">Document Number</Label>
                    <Input
                      id="documentNumber"
                      value={documentData.documentNumber}
                      onChange={(e) => handleFieldChange("documentNumber", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={documentData.date}
                      onChange={(e) => handleFieldChange("date", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referenceNumber">Reference Number</Label>
                    <Input
                      id="referenceNumber"
                      value={documentData.referenceNumber || ""}
                      onChange={(e) => handleFieldChange("referenceNumber", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="modeOfPayment">Mode/Terms of Payment</Label>
                    <Input
                      id="modeOfPayment"
                      value={documentData.modeOfPayment || ""}
                      onChange={(e) => handleFieldChange("modeOfPayment", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Client Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Select Client</Label>
                    <Select onValueChange={handleClientChange}>
                      <SelectTrigger id="client">
                        <SelectValue placeholder="Select a client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="consigneeName">Consignee Name</Label>
                    <Input
                      id="consigneeName"
                      value={documentData.consigneeName || ""}
                      onChange={(e) => handleFieldChange("consigneeName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="consigneeAddress">Consignee Address</Label>
                    <Textarea
                      id="consigneeAddress"
                      value={documentData.consigneeAddress || ""}
                      onChange={(e) => handleFieldChange("consigneeAddress", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="consigneeContact">Consignee Contact</Label>
                    <Input
                      id="consigneeContact"
                      value={documentData.consigneeContact || ""}
                      onChange={(e) => handleFieldChange("consigneeContact", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {documentType === "Purchase Order" && (
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="supplierName">Supplier Name</Label>
                      <Input
                        id="supplierName"
                        value={documentData.supplierName || ""}
                        onChange={(e) => handleFieldChange("supplierName", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="supplierGstin">Supplier GSTIN</Label>
                      <Input
                        id="supplierGstin"
                        value={documentData.supplierGstin || ""}
                        onChange={(e) => handleFieldChange("supplierGstin", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="supplierAddress">Supplier Address</Label>
                      <Textarea
                        id="supplierAddress"
                        value={documentData.supplierAddress || ""}
                        onChange={(e) => handleFieldChange("supplierAddress", e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="supplierEmail">Supplier Email</Label>
                      <Input
                        id="supplierEmail"
                        value={documentData.supplierEmail || ""}
                        onChange={(e) => handleFieldChange("supplierEmail", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4">HSN/SAC</th>
                        <th className="text-left py-2 px-4">Description</th>
                        <th className="text-right py-2 px-4">Qty</th>
                        <th className="text-right py-2 px-4">Unit</th>
                        <th className="text-right py-2 px-4">Rate (₹)</th>
                        <th className="text-right py-2 px-4">Amount (₹)</th>
                        <th className="text-center py-2 px-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documentData.items.map((item, index) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-2 px-4">
                            <Input
                              value={item.hsnSac || ""}
                              onChange={(e) => handleItemChange(index, "hsnSac", e.target.value)}
                              placeholder="HSN/SAC"
                            />
                          </td>
                          <td className="py-2 px-4">
                            <Input
                              value={item.description}
                              onChange={(e) => handleItemChange(index, "description", e.target.value)}
                              placeholder="Item description"
                            />
                          </td>
                          <td className="py-2 px-4">
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                              className="w-20 text-right"
                            />
                          </td>
                          <td className="py-2 px-4">
                            <Input
                              value={item.unit}
                              onChange={(e) => handleItemChange(index, "unit", e.target.value)}
                              className="w-20 text-center"
                              placeholder="nos"
                            />
                          </td>
                          <td className="py-2 px-4">
                            <Input
                              type="number"
                              min="0"
                              value={item.unitPrice}
                              onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
                              className="w-32 text-right"
                            />
                          </td>
                          <td className="py-2 px-4 text-right font-medium">₹{item.amount.toFixed(2)}</td>
                          <td className="py-2 px-4 text-center">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(index)}
                              disabled={documentData.items.length === 1}
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
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="remarks">Remarks</Label>
                  <Textarea
                    id="remarks"
                    value={documentData.remarks || ""}
                    onChange={(e) => handleFieldChange("remarks", e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="declaration">Declaration</Label>
                  <Textarea
                    id="declaration"
                    value={documentData.declaration || ""}
                    onChange={(e) => handleFieldChange("declaration", e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
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
                    Saving...
                  </span>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save {documentData.documentType}
                  </>
                )}
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="preview">
          <UniversalDocumentTemplate data={documentData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
