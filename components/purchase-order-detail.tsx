"use client"

import { useState } from "react"
import type { PurchaseOrder } from "@/types/purchase-order"
import { formatCurrency, formatDate } from "@/utils/format"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Printer, Mail, FileText } from "lucide-react"
import { exportToPdf, exportToExcel } from "@/utils/document-export"
import Image from "next/image"

interface PurchaseOrderDetailProps {
  purchaseOrder: PurchaseOrder
}

export function PurchaseOrderDetail({ purchaseOrder }: PurchaseOrderDetailProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  const handleExportPdf = async () => {
    setIsExporting(true)
    try {
      await exportToPdf("purchase-order-document", `PO-${purchaseOrder.poNumber}`)
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportExcel = () => {
    setIsExporting(true)
    try {
      const data = [
        ["PO No.", purchaseOrder.poNumber],
        ["Date", formatDate(purchaseOrder.date)],
        ["Reference No.", purchaseOrder.referenceNumber],
        ["", ""],
        ["Invoice to:", ""],
        [purchaseOrder.company.name, ""],
        [purchaseOrder.company.address, ""],
        [`GSTIN/UIN: ${purchaseOrder.company.gstin}`, ""],
        [`Email: ${purchaseOrder.company.email}`, ""],
        [`Phone: ${purchaseOrder.company.phone}`, ""],
        ["", ""],
        ["Consignee (Ship to):", ""],
        [purchaseOrder.consignee.name, ""],
        [purchaseOrder.consignee.address, ""],
        [`Contact: ${purchaseOrder.consignee.contact}`, ""],
        [`State: ${purchaseOrder.consignee.state}, Code: ${purchaseOrder.consignee.stateCode}`, ""],
        ["", ""],
        ["Supplier (Bill From):", ""],
        [purchaseOrder.supplier.name, ""],
        [purchaseOrder.supplier.address, ""],
        [`Email: ${purchaseOrder.supplier.email}`, ""],
        [`GSTIN/UIN: ${purchaseOrder.supplier.gstin}`, ""],
        [`State: ${purchaseOrder.supplier.state}`, ""],
        ["", ""],
        ["S.No", "HSN/SAC", "Description of Goods", "Quantity", "Per", "Rate/Unit", "Amount"],
      ]

      // Add items
      purchaseOrder.items.forEach((item, index) => {
        data.push([
          (index + 1).toString(),
          item.hsnSac,
          item.description,
          item.quantity.toString(),
          item.unit,
          formatCurrency(item.rate),
          formatCurrency(item.amount),
        ])
      })

      // Add totals
      data.push(
        ["", "", "", "", "", "Sub Total", formatCurrency(purchaseOrder.subTotal)],
        ["", "", "", "", "", "CGST @ 9%", formatCurrency(purchaseOrder.cgst)],
        ["", "", "", "", "", "SGST @ 9%", formatCurrency(purchaseOrder.sgst)],
        ["", "", "", "", "", "Rounding Off", formatCurrency(purchaseOrder.roundingOff)],
        ["", "", "", "", "", "Grand Total", formatCurrency(purchaseOrder.grandTotal)],
      )

      exportToExcel(data, `PO-${purchaseOrder.poNumber}`)
    } finally {
      setIsExporting(false)
    }
  }

  const calculateTotal = (items: any[]) => {
    return items.reduce((sum, item) => sum + item.amount, 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Purchase Order Details</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePrint} disabled={isExporting}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" onClick={handleExportPdf} disabled={isExporting}>
            <FileText className="mr-2 h-4 w-4" />
            PDF
          </Button>
          <Button variant="outline" onClick={handleExportExcel} disabled={isExporting}>
            <Download className="mr-2 h-4 w-4" />
            Excel
          </Button>
          <Button variant="outline" disabled={isExporting}>
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
        </div>
      </div>

      <Card className="print:shadow-none">
        <CardContent className="p-0">
          <div id="purchase-order-document" className="p-6 print:p-0">
            {/* Document Header */}
            <div className="text-center font-bold text-xl mb-4 border-b pb-2">PURCHASE ORDER</div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Left side - Company Info */}
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="mr-2">
                    <Image
                      src="/diac-logo.jpg"
                      alt="DIAC Engineering"
                      width={100}
                      height={50}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">Invoice to:</h3>
                    <p>{purchaseOrder.company.name}</p>
                    <p className="text-sm">{purchaseOrder.company.address}</p>
                    <p className="text-sm">GSTIN/UIN - {purchaseOrder.company.gstin}</p>
                    <p className="text-sm">Email : {purchaseOrder.company.email}</p>
                    <p className="text-sm">Phone Number : {purchaseOrder.company.phone}</p>
                  </div>
                </div>
              </div>

              {/* Right side - PO Info */}
              <div className="grid grid-cols-2 border border-gray-300">
                <div className="border-b border-r border-gray-300 p-2 font-semibold">PO No.</div>
                <div className="border-b border-gray-300 p-2">{purchaseOrder.poNumber}</div>

                <div className="border-b border-r border-gray-300 p-2 font-semibold">Dated</div>
                <div className="border-b border-gray-300 p-2">{formatDate(purchaseOrder.date)}</div>

                <div className="border-b border-r border-gray-300 p-2 font-semibold">Reference No. & Date</div>
                <div className="border-b border-gray-300 p-2">{purchaseOrder.referenceNumber}</div>

                <div className="border-b border-r border-gray-300 p-2 font-semibold">Mode/Terms of Payment</div>
                <div className="border-b border-gray-300 p-2">{purchaseOrder.paymentTerms}</div>

                <div className="border-r border-gray-300 p-2 font-semibold">Order References</div>
                <div className="p-2">{purchaseOrder.orderReferences}</div>
              </div>
            </div>

            {/* Consignee Information */}
            <div className="grid grid-cols-2 gap-4 mb-4 border border-gray-300">
              <div className="p-2">
                <h3 className="font-bold">Consignee (Ship to)</h3>
                <p>{purchaseOrder.consignee.name}</p>
                <p className="text-sm">{purchaseOrder.consignee.address}</p>
                <p className="text-sm">Contact Number: {purchaseOrder.consignee.contact}</p>
                <p className="text-sm">
                  State Name: {purchaseOrder.consignee.state}, Code: {purchaseOrder.consignee.stateCode}
                </p>
              </div>

              <div className="grid grid-cols-2">
                <div className="border-b border-r border-gray-300 p-2 font-semibold">Dispatch Doc No.</div>
                <div className="border-b border-gray-300 p-2">{purchaseOrder.dispatchDocNo || "Nil"}</div>

                <div className="border-r border-gray-300 p-2 font-semibold">Delivery Note Date</div>
                <div className="p-2">{purchaseOrder.deliveryNoteDate || "Nil"}</div>
              </div>
            </div>

            {/* Supplier Information */}
            <div className="grid grid-cols-2 gap-4 mb-4 border border-gray-300">
              <div className="p-2">
                <h3 className="font-bold">Supplier (Bill From)</h3>
                <p>{purchaseOrder.supplier.name}</p>
                <p className="text-sm">{purchaseOrder.supplier.address}</p>
                <p className="text-sm">Email: {purchaseOrder.supplier.email}</p>
                <p className="text-sm">GSTIN/UIN: {purchaseOrder.supplier.gstin}</p>
                <p className="text-sm">State Name: {purchaseOrder.supplier.state}</p>
              </div>

              <div className="grid grid-rows-2">
                <div className="p-2 border-b border-gray-300">
                  <p className="font-semibold">Terms of Delivery</p>
                  <p>{purchaseOrder.deliveryTerms || "nil"}</p>
                </div>

                <div className="p-2">
                  <p className="font-semibold">Warranty - {purchaseOrder.warrantyPeriod}</p>
                  <p>{purchaseOrder.warrantyTerms}</p>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-4 overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">S.No</th>
                    <th className="border border-gray-300 p-2 text-left">HSN/SAC</th>
                    <th className="border border-gray-300 p-2 text-left">Description of Goods</th>
                    <th className="border border-gray-300 p-2 text-right">Quantity</th>
                    <th className="border border-gray-300 p-2 text-center">Per</th>
                    <th className="border border-gray-300 p-2 text-right">Rate/Unit</th>
                    <th className="border border-gray-300 p-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrder.items.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">{index + 1}</td>
                      <td className="border border-gray-300 p-2">{item.hsnSac}</td>
                      <td className="border border-gray-300 p-2">{item.description}</td>
                      <td className="border border-gray-300 p-2 text-right">{item.quantity}</td>
                      <td className="border border-gray-300 p-2 text-center">{item.unit}</td>
                      <td className="border border-gray-300 p-2 text-right">{formatCurrency(item.rate)}</td>
                      <td className="border border-gray-300 p-2 text-right">{formatCurrency(item.amount)}</td>
                    </tr>
                  ))}

                  {/* Empty rows to match template */}
                  {Array.from({ length: Math.max(1, 5 - purchaseOrder.items.length) }).map((_, index) => (
                    <tr key={`empty-${index}`}>
                      <td className="border border-gray-300 p-2">&nbsp;</td>
                      <td className="border border-gray-300 p-2"></td>
                      <td className="border border-gray-300 p-2"></td>
                      <td className="border border-gray-300 p-2"></td>
                      <td className="border border-gray-300 p-2"></td>
                      <td className="border border-gray-300 p-2"></td>
                      <td className="border border-gray-300 p-2"></td>
                    </tr>
                  ))}

                  {/* Totals */}
                  <tr>
                    <td colSpan={5} className="border border-gray-300 p-2 text-right">
                      Sub Total
                    </td>
                    <td colSpan={2} className="border border-gray-300 p-2 text-right">
                      {formatCurrency(purchaseOrder.subTotal)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5} className="border border-gray-300 p-2 text-right">
                      OUTPUT CGST @ 9%
                    </td>
                    <td colSpan={2} className="border border-gray-300 p-2 text-right">
                      {formatCurrency(purchaseOrder.cgst)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5} className="border border-gray-300 p-2 text-right">
                      OUTPUT SGST @ 9%
                    </td>
                    <td colSpan={2} className="border border-gray-300 p-2 text-right">
                      {formatCurrency(purchaseOrder.sgst)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5} className="border border-gray-300 p-2 text-right">
                      Rounding Off
                    </td>
                    <td colSpan={2} className="border border-gray-300 p-2 text-right">
                      {formatCurrency(purchaseOrder.roundingOff)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5} className="border border-gray-300 p-2 text-right font-bold">
                      Grand Total
                    </td>
                    <td colSpan={2} className="border border-gray-300 p-2 text-right font-bold">
                      {formatCurrency(purchaseOrder.grandTotal)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Amount in Words */}
            <div className="mb-4 border border-gray-300 p-2">
              <p>
                <span className="font-semibold">Amount Chargeable (in words):</span> {purchaseOrder.amountInWords}
              </p>
            </div>

            {/* Remarks */}
            <div className="grid grid-cols-2 gap-4 mb-4 border border-gray-300">
              <div className="p-2">
                <p className="font-semibold">Remarks -</p>
                <p>{purchaseOrder.remarks}</p>
              </div>
              <div className="p-2">
                <p>Company's PAN - {purchaseOrder.company.pan}</p>
              </div>
            </div>

            {/* Declaration and Signature */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border border-gray-300 p-2">
                <p className="font-semibold">Declaration</p>
                <p className="text-sm">
                  We declare that this purchase order shows the actual price of the goods described and that all
                  particulars are true and correct.
                </p>
              </div>
              <div className="border border-gray-300 p-2 flex flex-col items-center justify-end">
                <p className="font-semibold text-blue-700">For {purchaseOrder.company.name}</p>
                <div className="h-16 flex items-end">
                  <p className="font-semibold text-blue-700">Partner</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
