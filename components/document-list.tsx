"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, FileText, Download, Printer } from "lucide-react"
import Link from "next/link"
import { formatDate, formatCurrency } from "@/utils/format"

interface DocumentListProps {
  documents: any[]
  documentType: string
  basePath: string
  statusOptions?: string[]
}

export function DocumentList({ documents, documentType, basePath, statusOptions = [] }: DocumentListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Filter documents based on search term and status
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.documentNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.poNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.supplierName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.consigneeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.buyerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ""

    const matchesStatus = statusFilter === "all" || doc.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Get document number based on document type
  const getDocumentNumber = (doc: any) => {
    if (documentType === "Purchase Order") {
      return doc.poNumber || doc.documentNumber
    } else if (documentType === "Proforma Invoice") {
      return doc.number || doc.documentNumber
    } else {
      return doc.invoiceNumber || doc.documentNumber
    }
  }

  // Get document date
  const getDocumentDate = (doc: any) => {
    return doc.date
  }

  // Get document client/supplier name
  const getPartyName = (doc: any) => {
    if (documentType === "Purchase Order") {
      return doc.supplierName || doc.consigneeName
    } else {
      return doc.clientName || doc.customerName || doc.buyerName
    }
  }

  // Get document amount
  const getDocumentAmount = (doc: any) => {
    return doc.totalAmount || doc.grandTotal
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">{documentType}s</h1>
        <Link href={`${basePath}/new`}>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New {documentType}
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder={`Search ${documentType.toLowerCase()}s...`}
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {statusOptions.length > 0 && (
          <div className="w-full sm:w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredDocuments.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium">No {documentType}s Found</h3>
              <p className="text-gray-500 mt-2">
                {searchTerm || statusFilter !== "all"
                  ? `No ${documentType.toLowerCase()}s match your search criteria.`
                  : `There are no ${documentType.toLowerCase()}s yet.`}
              </p>
              <Link href={`${basePath}/new`} className="mt-4 inline-block">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create {documentType}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          filteredDocuments.map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <Link href={`${basePath}/${doc.id}`} className="block p-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-blue-600 mr-2" />
                        <h3 className="font-medium">{getDocumentNumber(doc)}</h3>
                      </div>
                      <p className="text-gray-500">{getPartyName(doc)}</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                      <p className="font-medium">₹{formatCurrency(getDocumentAmount(doc))}</p>
                      <p className="text-gray-500">{formatDate(getDocumentDate(doc))}</p>
                      {doc.status && (
                        <span
                          className={`mt-2 px-2 py-1 text-xs rounded-full ${
                            doc.status === "Paid" ||
                            doc.status === "Approved" ||
                            doc.status === "Accepted" ||
                            doc.status === "Received"
                              ? "bg-green-100 text-green-800"
                              : doc.status === "Pending" || doc.status === "Draft" || doc.status === "Sent"
                                ? "bg-blue-100 text-blue-800"
                                : doc.status === "Overdue" || doc.status === "Rejected" || doc.status === "Cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : doc.status === "Converted"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {doc.status}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
                <div className="border-t px-6 py-3 flex justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
