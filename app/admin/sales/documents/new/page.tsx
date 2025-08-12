"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminLayout from "@/components/admin-layout"
import { SalesDocumentForm } from "@/components/sales-document-form"
import type { SalesDocument, DocumentType } from "@/types/sales"
import { clients } from "@/data/clients"
import { products } from "@/data/products"
import { salesDocuments } from "@/data/sales-documents"
import { useToast } from "@/components/ui/use-toast"

export default function NewSalesDocumentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // Get initial document type from query params or default to "Quotation"
  const initialDocType = (searchParams.get("type") as DocumentType) || "Quotation"
  const [activeTab, setActiveTab] = useState<DocumentType>(initialDocType)

  // Handle document submission
  const handleSubmit = (document: SalesDocument) => {
    // In a real app, this would be an API call
    console.log("Saving document:", document)

    // For now, we'll simulate adding to our array
    salesDocuments.push(document)

    toast({
      title: "Success",
      description: `${document.documentType} ${document.documentNumber} has been created successfully.`,
    })

    // Navigate back to documents list
    setTimeout(() => {
      router.push("/admin/sales/documents")
    }, 1000)
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Create New Sales Document</h1>
          <p className="text-gray-500">Select document type and fill in the details</p>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as DocumentType)}>
          <TabsList className="mb-4">
            <TabsTrigger value="Quotation">Quotation</TabsTrigger>
            <TabsTrigger value="PurchaseOrder">Purchase Order</TabsTrigger>
            <TabsTrigger value="ProformaInvoice">Proforma Invoice</TabsTrigger>
            <TabsTrigger value="TaxInvoice">Tax Invoice</TabsTrigger>
            <TabsTrigger value="Receipt">Receipt</TabsTrigger>
          </TabsList>

          <TabsContent value="Quotation">
            <SalesDocumentForm documentType="Quotation" clients={clients} products={products} onSubmit={handleSubmit} />
          </TabsContent>

          <TabsContent value="PurchaseOrder">
            <SalesDocumentForm
              documentType="PurchaseOrder"
              clients={clients}
              products={products}
              onSubmit={handleSubmit}
            />
          </TabsContent>

          <TabsContent value="ProformaInvoice">
            <SalesDocumentForm
              documentType="ProformaInvoice"
              clients={clients}
              products={products}
              onSubmit={handleSubmit}
            />
          </TabsContent>

          <TabsContent value="TaxInvoice">
            <SalesDocumentForm
              documentType="TaxInvoice"
              clients={clients}
              products={products}
              onSubmit={handleSubmit}
            />
          </TabsContent>

          <TabsContent value="Receipt">
            <SalesDocumentForm documentType="Receipt" clients={clients} products={products} onSubmit={handleSubmit} />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
