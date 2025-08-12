"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function TaxInvoicesPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the documents page with the TaxInvoice filter
    router.push("/admin/sales/documents?type=TaxInvoice")
  }, [router])

  return <div>Redirecting to tax invoices...</div>
}
