"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Search, Filter, Download } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import { salesDocuments } from "@/data/sales-documents"
import { SalesDocumentCard } from "@/components/sales-document-card"
import type { DocumentType } from "@/types/sales"

export default function SalesDocumentsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<DocumentType | "all">("all")
  const [filteredDocuments, setFilteredDocuments] = useState(salesDocuments)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    filterDocuments(searchQuery, activeTab)
  }

  const filterDocuments = (query: string, tab: DocumentType | "all") => {
    let results = [...salesDocuments]

    // Apply text search
    if (query) {
      const lowerQuery = query.toLowerCase()
      results = results.filter(
        (doc) =>
          doc.documentNumber.toLowerCase().includes(lowerQuery) ||
          doc.clientName.toLowerCase().includes(lowerQuery) ||
          doc.totalAmount.toString().includes(lowerQuery),
      )
    }

    // Apply tab filter
    if (tab !== "all") {
      results = results.filter((doc) => doc.documentType === tab)
    }

    setFilteredDocuments(results)
  }

  const handleTabChange = (tab: DocumentType | "all") => {
    setActiveTab(tab)
    filterDocuments(searchQuery, tab)
  }

  const handleExport = () => {
    // Create CSV content
    const headers = ["Document Type", "Number", "Client", "Date", "Amount", "Status"]
    const csvContent = [
      headers.join(","),
      ...filteredDocuments.map((doc) =>
        [doc.documentType, doc.documentNumber, doc.clientName, doc.date, doc.totalAmount, doc.status].join(","),
      ),
    ].join("\n")

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "sales_documents.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Sales Documents</h1>
          <Link
            href="/admin/sales/documents/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            New Document
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
            <form onSubmit={handleSearch} className="relative flex-1">
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </form>
            <div className="flex gap-2">
              <button
                onClick={() => router.push("/admin/sales/documents/filter")}
                className="px-4 py-2 border rounded-md flex items-center gap-2 hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 border rounded-md flex items-center gap-2 hover:bg-gray-50"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap space-x-4 px-4">
              <button
                onClick={() => handleTabChange("all")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "all"
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleTabChange("Quotation")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "Quotation"
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Quotations
              </button>
              <button
                onClick={() => handleTabChange("PurchaseOrder")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "PurchaseOrder"
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Purchase Orders
              </button>
              <button
                onClick={() => handleTabChange("ProformaInvoice")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "ProformaInvoice"
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Proforma Invoices
              </button>
              <button
                onClick={() => handleTabChange("TaxInvoice")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "TaxInvoice"
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Tax Invoices
              </button>
              <button
                onClick={() => handleTabChange("Receipt")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "Receipt"
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Receipts
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">No documents found. Try adjusting your search or filters.</p>
                </div>
              ) : (
                filteredDocuments.map((document) => <SalesDocumentCard key={document.id} document={document} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
