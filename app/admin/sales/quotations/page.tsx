"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function QuotationsPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the documents page with the Quotation filter
    router.push("/admin/sales/documents?type=Quotation")
  }, [router])

  return <div>Redirecting to quotations...</div>
}
