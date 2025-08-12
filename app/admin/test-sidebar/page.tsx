"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/providers"
import AdminLayout from "@/components/admin-layout"

export default function TestSidebarPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user || !user.isAdmin) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Sidebar Test Page</h1>
        <p className="mb-4">This page demonstrates the new collapsible sidebar implementation.</p>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Collapsible sidebar with icon-only mode</li>
            <li>State persistence using cookies</li>
            <li>Mobile responsiveness with drawer behavior</li>
            <li>Keyboard shortcut (Cmd/Ctrl + B) to toggle sidebar</li>
            <li>Tooltips for collapsed state</li>
            <li>Smooth animations for state transitions</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  )
}
