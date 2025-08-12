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
import { Trash2, Plus, Save, ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { QuotationTemplate, type QuotationData, type QuotationItem } from "@/components/quotation-template"
import { numberToWords } from "@/utils/document-export"
import Link from "next/link"

// Add this constant at the top of the file
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
]

interface ClientOption {
  id: string
  name: string
  companyName?: string
  address?: string
  email?: string
  phone?: string
  gstin?: string
  state?: string // Add state field
}

interface QuotationFormProps {
  initialData?: QuotationData
  clients?: ClientOption[]
  onSubmit: (data: QuotationData) => void
  basePath: string
  isEditing?: boolean
}

export function QuotationForm({
  initialData,
  clients = [],
  onSubmit,
  basePath,
  isEditing = false,
}: QuotationFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Generate quotation number
  const generateQuotationNumber = () => {
    const year = new Date().getFullYear()
    const month = (new Date().getMonth() + 1).toString().padStart(2, "0")
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    return `QT-${year}${month}-${random}`
  }

  // Calculate validity date (15 days from now)
  const calculateValidUntil = () => {
    const date = new Date()
    date.setDate(date.getDate() + 15)
    return date.toISOString().split("T")[0]
  }

  // Initialize quotation data
  const [quotationData, setQuotationData] = useState<QuotationData>(
    initialData || {
      id: `quotation-${Date.now()}`,
      quotationNumber: generateQuotationNumber(),
      quoteDate: new Date().toISOString().split("T")[0],
      validUntil: calculateValidUntil(),

      // Client information
      clientName: "",
      clientAddress: "",

      // Items
      items: [
        {
          id: `item-${Date.now()}`,
          itemCode: "",
          description: "",
          hsnSac: "",
          quantity: 1,
          unit: "nos",
          unitPrice: 0,
          amount: 0,
        },
      ],

      // Totals
      subtotal: 0,
      cgst: 0,
      sgstOrUtgst: 0,
      grandTotal: 0,

      // Additional information
      amountInWords: "Zero only",
      termsAndConditions: [
        "Our offer is valid for 15 days from the date of proposal and thereafter subject to change without notice.",
        "Our scope covers design, supply, erection & commissioning of the System.",
        "GST/Taxes as applicable will be charged extra.",
        "Payment Terms: (a) 30% advance with your acceptance of the Offer/issue of L.O.I. (b) 60% against delivery of material on PRO-RATA basis. (c) 10% on Installation & Handing Over",
        "Warranty: Warranty of the material is 12 months from the date of supply.",
        "Delivery Period: 12-14 weeks from the date of acceptance of the Shop drawings & receipt of advance.",
        "In case of cancellation of a confirmed order for any reason what so ever 10% of the order value shall have to be paid by you to us, as damages.",
        "All terms are subject to Chennai Jurisdiction.",
      ],
      clientState: "Tamil Nadu", // Default to Tamil Nadu
    },
  )

  // Calculate totals whenever items change
  useEffect(() => {
    const subtotal = quotationData.items.reduce((sum, item) => sum + item.amount, 0)
    const deliveryCharges = quotationData.deliveryCharges || 0

    let cgst = 0
    let sgstOrUtgst = 0
    let igst = 0

    // Dynamic tax calculation based on customer state
    if (quotationData.clientState?.toLowerCase() === "tamil nadu") {
      // For Tamil Nadu customers - CGST + SGST (intra-state)
      cgst = Math.round(subtotal * 0.09) // 9% CGST
      sgstOrUtgst = Math.round(subtotal * 0.09) // 9% SGST
    } else {
      // For customers outside Tamil Nadu - IGST (inter-state)
      igst = Math.round(subtotal * 0.18) // 18% IGST
    }

    const grandTotal = subtotal + cgst + sgstOrUtgst + igst + deliveryCharges

    // Convert to words
    const amountInWords = `${numberToWords(grandTotal)} Only`

    setQuotationData((prev) => ({
      ...prev,
      subtotal,
      cgst,
      sgstOrUtgst,
      igst,
      grandTotal,
      amountInWords,
    }))
  }, [quotationData.items, quotationData.clientState, quotationData.deliveryCharges])

  // Update item amount when quantity or unit price changes
  const updateItemAmount = (index: number) => {
    const item = quotationData.items[index]
    const amount = item.quantity * item.unitPrice

    const updatedItems = [...quotationData.items]
    updatedItems[index] = {
      ...updatedItems[index],
      amount,
    }

    setQuotationData((prev) => ({
      ...prev,
      items: updatedItems,
    }))
  }

  // Handle item field change
  const handleItemChange = (index: number, field: keyof QuotationItem, value: any) => {
    const updatedItems = [...quotationData.items]
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === "quantity" || field === "unitPrice" ? Number(value) : value,
    }

    setQuotationData((prev) => ({
      ...prev,
      items: updatedItems,
    }))

    if (field === "quantity" || field === "unitPrice") {
      setTimeout(() => updateItemAmount(index), 0)
    }
  }

  // Add new item
  const addItem = () => {
    setQuotationData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: `item-${Date.now()}`,
          itemCode: "",
          description: "",
          hsnSac: "",
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
    if (quotationData.items.length > 1) {
      const updatedItems = [...quotationData.items]
      updatedItems.splice(index, 1)

      setQuotationData((prev) => ({
        ...prev,
        items: updatedItems,
      }))
    }
  }

  // Handle client selection
  const handleClientChange = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId)

    if (client) {
      setQuotationData((prev) => ({
        ...prev,
        clientName: client.name || client.companyName || "",
        clientAddress: client.address || "",
        clientPhone: client.phone || "",
        clientEmail: client.email || "",
        clientGstin: client.gstin || "",
        clientState: client.state || "Tamil Nadu", // Add state from client data
      }))
    }
  }

  // Handle form field change
  const handleFieldChange = (field: keyof QuotationData, value: any) => {
    setQuotationData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle terms and conditions change
  const handleTermChange = (index: number, value: string) => {
    const updatedTerms = [...(quotationData.termsAndConditions || [])]
    updatedTerms[index] = value

    setQuotationData((prev) => ({
      ...prev,
      termsAndConditions: updatedTerms,
    }))
  }

  // Add new term
  const addTerm = () => {
    setQuotationData((prev) => ({
      ...prev,
      termsAndConditions: [...(prev.termsAndConditions || []), ""],
    }))
  }

  // Remove term
  const removeTerm = (index: number) => {
    const updatedTerms = [...(quotationData.termsAndConditions || [])]
    updatedTerms.splice(index, 1)

    setQuotationData((prev) => ({
      ...prev,
      termsAndConditions: updatedTerms,
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Call the onSubmit callback
      onSubmit(quotationData)

      // Show success toast
      toast({
        title: "Success",
        description: `Quotation ${quotationData.quotationNumber} has been ${isEditing ? "updated" : "saved"} successfully.`,
      })

      // Redirect to the quotation list page
      router.push(basePath)
    } catch (error) {
      console.error("Error saving quotation:", error)

      toast({
        title: "Error",
        description: `Failed to save quotation. Please try again.`,
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
                  <CardTitle>Quotation Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="quotationNumber">Quotation Number</Label>
                    <Input
                      id="quotationNumber"
                      value={quotationData.quotationNumber}
                      onChange={(e) => handleFieldChange("quotationNumber", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quoteDate">Quote Date</Label>
                    <Input
                      id="quoteDate"
                      type="date"
                      value={quotationData.quoteDate}
                      onChange={(e) => handleFieldChange("quoteDate", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="validUntil">Valid Until</Label>
                    <Input
                      id="validUntil"
                      type="date"
                      value={quotationData.validUntil}
                      onChange={(e) => handleFieldChange("validUntil", e.target.value)}
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
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name || client.companyName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input
                      id="clientName"
                      value={quotationData.clientName}
                      onChange={(e) => handleFieldChange("clientName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientAddress">Client Address</Label>
                    <Textarea
                      id="clientAddress"
                      value={quotationData.clientAddress}
                      onChange={(e) => handleFieldChange("clientAddress", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientPhone">Client Phone</Label>
                    <Input
                      id="clientPhone"
                      value={quotationData.clientPhone || ""}
                      onChange={(e) => handleFieldChange("clientPhone", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientEmail">Client Email</Label>
                    <Input
                      id="clientEmail"
                      value={quotationData.clientEmail || ""}
                      onChange={(e) => handleFieldChange("clientEmail", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientGstin">Client GSTIN</Label>
                    <Input
                      id="clientGstin"
                      value={quotationData.clientGstin || ""}
                      onChange={(e) => handleFieldChange("clientGstin", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientState">Client State</Label>
                    <Select
                      value={quotationData.clientState}
                      onValueChange={(value) => handleFieldChange("clientState", value)}
                    >
                      <SelectTrigger id="clientState">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDIAN_STATES.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deliveryCharges">Delivery Charges (₹)</Label>
                    <Input
                      id="deliveryCharges"
                      type="number"
                      min="0"
                      value={quotationData.deliveryCharges || 0}
                      onChange={(e) => handleFieldChange("deliveryCharges", Number(e.target.value))}
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
                        <th className="text-left py-2 px-4">Item Code</th>
                        <th className="text-left py-2 px-4">Description</th>
                        <th className="text-left py-2 px-4">HSN/SAC</th>
                        <th className="text-right py-2 px-4">Qty</th>
                        <th className="text-right py-2 px-4">Unit Price (₹)</th>
                        <th className="text-right py-2 px-4">Amount (₹)</th>
                        <th className="text-center py-2 px-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotationData.items.map((item, index) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-2 px-4">
                            <Input
                              value={item.itemCode}
                              onChange={(e) => handleItemChange(index, "itemCode", e.target.value)}
                              placeholder="Item Code"
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
                              value={item.hsnSac}
                              onChange={(e) => handleItemChange(index, "hsnSac", e.target.value)}
                              placeholder="HSN/SAC"
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
                              disabled={quotationData.items.length === 1}
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
                <CardTitle>Terms and Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(quotationData.termsAndConditions || []).map((term, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="flex-grow">
                        <Textarea value={term} onChange={(e) => handleTermChange(index, e.target.value)} rows={2} />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTerm(index)}
                        disabled={(quotationData.termsAndConditions || []).length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <Button type="button" variant="outline" size="sm" onClick={addTerm}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Term
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" asChild>
                <Link href={basePath}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Cancel
                </Link>
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
                    Save Quotation
                  </>
                )}
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="preview">
          <QuotationTemplate data={quotationData} basePath={basePath} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
