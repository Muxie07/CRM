"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ClientForm } from "@/components/client-form"
import type { Client } from "@/types/client"
import { clients } from "@/data/clients"
import { toast } from "@/components/ui/use-toast"

export default function EditClientPage() {
  const params = useParams()
  const router = useRouter()
  const [client, setClient] = useState<Client | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchClient = () => {
      setIsLoading(true)

      setTimeout(() => {
        const foundClient = clients.find((c) => c.id === params.id)
        setClient(foundClient || null)
        setIsLoading(false)
      }, 500)
    }

    fetchClient()
  }, [params.id])

  const handleSubmit = async (data: Omit<Client, "id" | "createdAt" | "updatedAt">) => {
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Client updated",
        description: `${data.companyName} has been updated successfully.`,
      })

      router.push(`/admin/clients/${params.id}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update client. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (!client) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Client Not Found</h2>
            <p className="text-gray-500 mb-4">The client you are trying to edit does not exist or has been removed.</p>
            <Link href="/admin/clients" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Back to Clients
            </Link>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <Link
            href={`/admin/clients/${client.id}`}
            className="inline-flex items-center text-gray-600 hover:text-black"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Client Details
          </Link>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Client: {client.companyName}</h1>
        </div>

        <ClientForm client={client} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </AdminLayout>
  )
}
