"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProformaInvoicesPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the documents page with the ProformaInvoice filter
    router.push("/admin/sales/documents?type=ProformaInvoice")
  }, [router])

  return <div>Redirecting to proforma invoices...</div>
}
