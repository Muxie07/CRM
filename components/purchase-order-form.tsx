"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Plus, Save, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { UniversalDocumentTemplate, type DocumentData } from "@/components/universal-document-template"
import { numberToWords } from "@/utils/document-export"
import Link from "next/link"
import type { PurchaseOrder } from "@/types/purchase-order"

interface PurchaseOrderFormProps {
  initialData?: PurchaseOrder
  clients: any[]
  isEditing?: boolean
}

export function PurchaseOrderForm({ initialData, clients, isEditing = false }: PurchaseOrderFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form")

  // Initialize form data
  const [formData, setFormData] = useState<PurchaseOrder>({
    id: initialData?.id || `po-${Date.now()}`,
    poNumber:
      initialData?.poNumber ||
      `PO-DIAC-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
    date: initialData?.date || new Date().toISOString().split("T")[0],
    referenceNumber:
      initialData?.referenceNumber ||
      `DIAC_PO_${new Date().getFullYear()}-${(new Date().getFullYear() + 1) % 100}/${Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, "0")}`,
    modeOfPayment: initialData?.modeOfPayment || "NEFT",
    orderReferences: initialData?.orderReferences || "By Mail",

    consigneeName: initialData?.consigneeName || "DIAC Engineering",
    consigneeAddress:
      initialData?.consigneeAddress || "C-124, MMDA Colony, Arumbakkam, Chennai - 600 106, Tamil Nadu, India",
    consigneeContact: initialData?.consigneeContact || "+9144 46902054",
    consigneeState: initialData?.consigneeState || "Tamil Nadu",
    consigneeCode: initialData?.consigneeCode || "33",

    supplierId: initialData?.supplierId || "",
    supplierName: initialData?.supplierName || "",
    supplierAddress: initialData?.supplierAddress || "",
    supplierEmail: initialData?.supplierEmail || "",
    supplierGstin: initialData?.supplierGstin || "",
    supplierState: initialData?.supplierState || "",

    dispatchDocNo: initialData?.dispatchDocNo || "Nil",
    deliveryNoteDate: initialData?.deliveryNoteDate || "",
    dispatchedThrough: initialData?.dispatchedThrough || "Nil",
    termsOfDelivery: initialData?.termsOfDelivery || "Nil",
    warranty: initialData?.warranty || "1 year standard warranty",

    items: initialData?.items || [
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

    subtotal: initialData?.subtotal || 0,
    cgst: initialData?.cgst || 0,
    sgst: initialData?.sgst || 0,
    igst: initialData?.igst || 0,
    roundingOff: initialData?.roundingOff || 0,
    totalAmount: initialData?.totalAmount || 0,

    amountInWords: initialData?.amountInWords || "",
    remarks: initialData?.remarks || "",
    status: initialData?.status || "Pending",
    createdAt: initialData?.createdAt || new Date().toISOString(),
    updatedAt: initialData?.updatedAt || new Date().toISOString(),
  })

  // Document data for preview
  const [documentData, setDocumentData] = useState<DocumentData>({
    id: formData.id,
    documentType: "Purchase Order",
    documentNumber: formData.poNumber,
    date: formData.date,
    referenceNumber: formData.referenceNumber,
    modeOfPayment: formData.modeOfPayment,

    companyName: "DIAC Engineering",
    companyAddress: "C-124, MMDA Colony, Arumbakkam, Chennai - 600 106, Tamil Nadu, India",
    companyGstin: "33AAWFD9550G1Z1",
    companyEmail: "diacengineering@gmail.com",
    companyPhone: "+9144 46902054 / +91 9741811177",

    consigneeName: formData.consigneeName,
    consigneeAddress: formData.consigneeAddress,
    consigneeContact: formData.consigneeContact,
    consigneeState: formData.consigneeState,
    consigneeCode: formData.consigneeCode,

    supplierName: formData.supplierName,
    supplierAddress: formData.supplierAddress,
    supplierEmail: formData.supplierEmail,
    supplierGstin: formData.supplierGstin,
    supplierState: formData.supplierState,

    dispatchDocNo: formData.dispatchDocNo,
    deliveryNoteDate: formData.deliveryNoteDate,
    dispatchedThrough: formData.dispatchedThrough,
    termsOfDelivery: formData.termsOfDelivery,
    warranty: formData.warranty,
    orderReferences: formData.orderReferences,

    items: formData.items,
    subtotal: formData.subtotal,
    cgst: formData.cgst,
    sgst: formData.sgst,
    igst: formData.igst,
    roundingOff: formData.roundingOff,
    grandTotal: formData.totalAmount,

    amountInWords: formData.amountInWords,
    remarks: formData.remarks,
    declaration:
      "We declare that this purchase order shows the actual price of the goods described and that all particulars are true and correct.",
  })

  // Calculate totals whenever items change
  useEffect(() => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.amount, 0)
    const cgst = subtotal * 0.09 // 9% CGST
    const sgst = subtotal * 0.09 // 9% SGST
    const igst = 0 // Only applicable for inter-state transactions

    // Round to 2 decimal places
    const roundedTotal = Math.round((subtotal + cgst + sgst + igst) * 100) / 100
    const totalAmount = subtotal + cgst + sgst + igst
    const roundingOff = roundedTotal - totalAmount

    // Generate amount in words
    const amountInWords = numberToWords(roundedTotal) + " only"

    setFormData((prev) => ({
      ...prev,
      subtotal,
      cgst,
      sgst,
      igst,
      roundingOff,
      totalAmount: roundedTotal,
      amountInWords,
    }))

    // Update document data for preview
    setDocumentData((prev) => ({
      ...prev,
      items: formData.items,
      subtotal,
      cgst,
      sgst,
      igst,
      roundingOff,
      grandTotal: roundedTotal,
      amountInWords,
    }))
  }, [formData.items])

  // Update document data when form data changes
  useEffect(() => {
    setDocumentData({
      id: formData.id,
      documentType: "Purchase Order",
      documentNumber: formData.poNumber,
      date: formData.date,
      referenceNumber: formData.referenceNumber,
      modeOfPayment: formData.modeOfPayment,

      companyName: "DIAC Engineering",
      companyAddress: "C-124, MMDA Colony, Arumbakkam, Chennai - 600 106, Tamil Nadu, India",
      companyGstin: "33AAWFD9550G1Z1",
      companyEmail: "diacengineering@gmail.com",
      companyPhone: "+9144 46902054 / +91 9741811177",

      consigneeName: formData.consigneeName,
      consigneeAddress: formData.consigneeAddress,
      consigneeContact: formData.consigneeContact,
      consigneeState: formData.consigneeState,
      consigneeCode: formData.consigneeCode,

      supplierName: formData.supplierName,
      supplierAddress: formData.supplierAddress,
      supplierEmail: formData.supplierEmail,
      supplierGstin: formData.supplierGstin,
      supplierState: formData.supplierState,

      dispatchDocNo: formData.dispatchDocNo,
      deliveryNoteDate: formData.deliveryNoteDate,
      dispatchedThrough: formData.dispatchedThrough,
      termsOfDelivery: formData.termsOfDelivery,
      warranty: formData.warranty,
      orderReferences: formData.orderReferences,

      items: formData.items,
      subtotal: formData.subtotal,
      cgst: formData.cgst,
      sgst: formData.sgst,
      igst: formData.igst,
      roundingOff: formData.roundingOff,
      grandTotal: formData.totalAmount,

      amountInWords: formData.amountInWords,
      remarks: formData.remarks,
      declaration:
        "We declare that this purchase order shows the actual price of the goods described and that all particulars are true and correct.",
    })
  }, [formData])

  // Update item amount when quantity or unit price changes
  const updateItemAmount = (index: number) => {
    const item = formData.items[index]
    const amount = item.quantity * item.unitPrice

    const updatedItems = [...formData.items]
    updatedItems[index] = {
      ...updatedItems[index],
      amount,
    }

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }))
  }

  const handleItemChange = (index: number, field: string, value: any) => {
    const updatedItems = [...formData.items]
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === "quantity" || field === "unitPrice" ? Number(value) : value,
    }

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }))

    if (field === "quantity" || field === "unitPrice") {
      updateItemAmount(index)
    }
  }

  const addItem = () => {
    setFormData((prev) => ({
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

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      const updatedItems = [...formData.items]
      updatedItems.splice(index, 1)
      setFormData((prev) => ({
        ...prev,
        items: updatedItems,
      }))
    }
  }

  const handleClientChange = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId)
    if (client) {
      setFormData((prev) => ({
        ...prev,
        supplierId: clientId,
        supplierName: client.company_name,
        supplierAddress: client.address || "",
        supplierEmail: client.email || "",
        supplierGstin: client.gst_number || "",
        supplierState: client.state || "",
      }))
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: `Purchase Order ${formData.poNumber} has been ${isEditing ? "updated" : "created"}.`,
      })

      router.push("/admin/purchase-orders")
    } catch (error) {
      console.error("Error submitting purchase order:", error)
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "create"} purchase order. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button variant={activeTab === "form" ? "default" : "outline"} onClick={() => setActiveTab("form")}>
            Form
          </Button>
          <Button variant={activeTab === "preview" ? "default" : "outline"} onClick={() => setActiveTab("preview")}>
            Preview
          </Button>
        </div>
      </div>

      {activeTab === "form" ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Purchase Order Details</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="poNumber">PO Number</Label>
                      <Input
                        id="poNumber"
                        value={formData.poNumber}
                        onChange={(e) => handleInputChange("poNumber", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="referenceNumber">Reference Number</Label>
                      <Input
                        id="referenceNumber"
                        value={formData.referenceNumber}
                        onChange={(e) => handleInputChange("referenceNumber", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="modeOfPayment">Mode of Payment</Label>
                      <Select
                        value={formData.modeOfPayment}
                        onValueChange={(value) => handleInputChange("modeOfPayment", value)}
                      >
                        <SelectTrigger id="modeOfPayment">
                          <SelectValue placeholder="Select payment mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NEFT">NEFT</SelectItem>
                          <SelectItem value="RTGS">RTGS</SelectItem>
                          <SelectItem value="Cheque">Cheque</SelectItem>
                          <SelectItem value="Cash">Cash</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="orderReferences">Order References</Label>
                    <Input
                      id="orderReferences"
                      value={formData.orderReferences}
                      onChange={(e) => handleInputChange("orderReferences", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Consignee Details</h3>

                  <div className="space-y-2">
                    <Label htmlFor="consigneeName">Name</Label>
                    <Input
                      id="consigneeName"
                      value={formData.consigneeName}
                      onChange={(e) => handleInputChange("consigneeName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="consigneeAddress">Address</Label>
                    <Textarea
                      id="consigneeAddress"
                      value={formData.consigneeAddress}
                      onChange={(e) => handleInputChange("consigneeAddress", e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="consigneeContact">Contact</Label>
                      <Input
                        id="consigneeContact"
                        value={formData.consigneeContact}
                        onChange={(e) => handleInputChange("consigneeContact", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="consigneeState">State</Label>
                      <Input
                        id="consigneeState"
                        value={formData.consigneeState}
                        onChange={(e) => handleInputChange("consigneeState", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="consigneeCode">State Code</Label>
                    <Input
                      id="consigneeCode"
                      value={formData.consigneeCode}
                      onChange={(e) => handleInputChange("consigneeCode", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Supplier Details</h3>

                <div className="space-y-2">
                  <Label htmlFor="supplier">Select Supplier</Label>
                  <Select value={formData.supplierId} onValueChange={handleClientChange}>
                    <SelectTrigger id="supplier">
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.company_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="supplierName">Name</Label>
                    <Input
                      id="supplierName"
                      value={formData.supplierName}
                      onChange={(e) => handleInputChange("supplierName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supplierEmail">Email</Label>
                    <Input
                      id="supplierEmail"
                      type="email"
                      value={formData.supplierEmail}
                      onChange={(e) => handleInputChange("supplierEmail", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supplierAddress">Address</Label>
                  <Textarea
                    id="supplierAddress"
                    value={formData.supplierAddress}
                    onChange={(e) => handleInputChange("supplierAddress", e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="supplierGstin">GSTIN</Label>
                    <Input
                      id="supplierGstin"
                      value={formData.supplierGstin}
                      onChange={(e) => handleInputChange("supplierGstin", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supplierState">State</Label>
                    <Input
                      id="supplierState"
                      value={formData.supplierState}
                      onChange={(e) => handleInputChange("supplierState", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Shipping Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dispatchDocNo">Dispatch Doc No.</Label>
                    <Input
                      id="dispatchDocNo"
                      value={formData.dispatchDocNo}
                      onChange={(e) => handleInputChange("dispatchDocNo", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deliveryNoteDate">Delivery Note Date</Label>
                    <Input
                      id="deliveryNoteDate"
                      type="date"
                      value={formData.deliveryNoteDate}
                      onChange={(e) => handleInputChange("deliveryNoteDate", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dispatchedThrough">Dispatched Through</Label>
                    <Input
                      id="dispatchedThrough"
                      value={formData.dispatchedThrough}
                      onChange={(e) => handleInputChange("dispatchedThrough", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="termsOfDelivery">Terms of Delivery</Label>
                    <Input
                      id="termsOfDelivery"
                      value={formData.termsOfDelivery}
                      onChange={(e) => handleInputChange("termsOfDelivery", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="warranty">Warranty</Label>
                  <Input
                    id="warranty"
                    value={formData.warranty}
                    onChange={(e) => handleInputChange("warranty", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Items</h3>
                  <Button type="button" variant="outline" size="sm" onClick={addItem}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-2 px-2">HSN/SAC</th>
                        <th className="text-left py-2 px-4">Description</th>
                        <th className="text-center py-2 px-2">Quantity</th>
                        <th className="text-center py-2 px-2">Unit</th>
                        <th className="text-right py-2 px-2">Rate/Unit</th>
                        <th className="text-right py-2 px-2">Amount</th>
                        <th className="text-center py-2 px-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.items.map((item, index) => (
                        <tr key={item.id} className="border-b border-gray-200">
                          <td className="py-2 px-2">
                            <Input
                              value={item.hsnSac || ""}
                              onChange={(e) => handleItemChange(index, "hsnSac", e.target.value)}
                              placeholder="HSN/SAC"
                              className="w-full"
                            />
                          </td>
                          <td className="py-2 px-4">
                            <Input
                              value={item.description}
                              onChange={(e) => handleItemChange(index, "description", e.target.value)}
                              placeholder="Item description"
                              className="w-full"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                              className="w-20 text-center"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <Select value={item.unit} onValueChange={(value) => handleItemChange(index, "unit", value)}>
                              <SelectTrigger className="w-20">
                                <SelectValue placeholder="Unit" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="nos">nos</SelectItem>
                                <SelectItem value="pcs">pcs</SelectItem>
                                <SelectItem value="kg">kg</SelectItem>
                                <SelectItem value="m">m</SelectItem>
                                <SelectItem value="box">box</SelectItem>
                                <SelectItem value="set">set</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="py-2 px-2">
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.unitPrice}
                              onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
                              className="w-28 text-right"
                            />
                          </td>
                          <td className="py-2 px-2 text-right font-medium">₹{item.amount.toFixed(2)}</td>
                          <td className="py-2 px-2 text-center">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(index)}
                              disabled={formData.items.length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div></div>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2">
                      <span>Sub Total:</span>
                      <span className="font-medium">₹{formData.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>CGST @ 9%:</span>
                      <span>₹{formData.cgst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>SGST @ 9%:</span>
                      <span>₹{formData.sgst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>IGST:</span>
                      <span>₹{formData.igst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Rounding Off:</span>
                      <span>₹{formData.roundingOff.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2 font-bold">
                      <span>Grand Total:</span>
                      <span>₹{formData.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Additional Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="amountInWords">Amount in Words</Label>
                  <Input
                    id="amountInWords"
                    value={formData.amountInWords}
                    onChange={(e) => handleInputChange("amountInWords", e.target.value)}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="remarks">Remarks</Label>
                  <Textarea
                    id="remarks"
                    value={formData.remarks}
                    onChange={(e) => handleInputChange("remarks", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: any) => handleInputChange("status", value)}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Received">Received</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link href="/admin/purchase-orders">
              <Button type="button" variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </Link>

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setActiveTab("preview")}>
                Preview
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
                    {isEditing ? "Update" : "Create"} Purchase Order
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div>
          <div className="mb-4 flex justify-between">
            <Button variant="outline" onClick={() => setActiveTab("form")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Form
            </Button>
          </div>

          <UniversalDocumentTemplate data={documentData} />
        </div>
      )}
    </div>
  )
}
