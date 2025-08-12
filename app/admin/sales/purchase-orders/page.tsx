"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function PurchaseOrdersPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the documents page with the PurchaseOrder filter
    router.push("/admin/sales/documents?type=PurchaseOrder")
  }, [router])

  return <div>Redirecting to purchase orders...</div>
}
