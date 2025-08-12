"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { QuotationForm } from "@/components/quotation-form"
import { getClients } from "@/data/clients"
import { useToast } from "@/components/ui/use-toast"

export default function NewQuotationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [clients, setClients] = useState([])

  // In a real app, you would fetch clients from your API or database
  useState(() => {
    const fetchClients = async () => {
      const clientsData = await getClients()
      setClients(clientsData)
    }

    fetchClients()
  }, [])

  const handleSubmit = async (data) => {
    try {
      // In a real app, you would save the quotation to your API or database
      // For now, we'll just show a success message and redirect

      toast({
        title: "Success",
        description: "Quotation created successfully",
      })

      router.push("/admin/quotations")
    } catch (error) {
      console.error("Error creating quotation:", error)
      toast({
        title: "Error",
        description: "Failed to create quotation",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Create New Quotation</h1>

      <QuotationForm clients={clients} onSubmit={handleSubmit} basePath="/admin/quotations" />
    </div>
  )
}
