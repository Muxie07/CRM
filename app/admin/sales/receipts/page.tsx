"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ReceiptsPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the documents page with the Receipt filter
    router.push("/admin/sales/documents?type=Receipt")
  }, [router])

  return <div>Redirecting to receipts...</div>
}
