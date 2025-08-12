"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Edit, Trash2 } from "lucide-react"
import { clients } from "@/data/clients"
import type { Client } from "@/types/client"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function ClientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const clientId = params.id as string
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchClient = () => {
      const foundClient = clients.find((c) => c.id === clientId)
      if (foundClient) {
        setClient(foundClient)
      } else {
        toast({
          title: "Client Not Found",
          description: `No client found with ID: ${clientId}`,
          variant: "destructive",
        })
        router.push("/admin/clients")
      }
      setLoading(false)
    }
    fetchClient()
  }, [clientId, router])

  const handleDelete = () => {
    setIsDeleting(true)
    // Simulate API call for deletion
    setTimeout(() => {
      // In a real application, you would remove the client from your data source
      // For now, we'll just redirect
      toast({
        title: "Client Deleted",
        description: `Client ${client?.companyName} has been successfully deleted.`,
      })
      router.push("/admin/clients")
      setIsDeleting(false)
    }, 1500)
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </AdminLayout>
    )
  }

  if (!client) {
    return null // Should not happen due to redirect, but for type safety
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Client Details: {client.companyName}</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push(`/admin/clients/${client.id}/edit`)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Client
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isDeleting}>
                  {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="w-4 h-4 mr-2" />}
                  Delete Client
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the client{" "}
                    <span className="font-semibold">{client.companyName}</span> and remove their data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Company Name</h3>
                <p className="mt-1">{client.companyName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">GST Number</h3>
                <p className="mt-1">{client.gstNumber}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Contact Person</h3>
                <p className="mt-1">{client.contactPerson}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Contact Number</h3>
                <p className="mt-1">{client.contactNumber}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Contact Email</h3>
                <p className="mt-1">{client.contactEmail}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                <p className="mt-1">{client.address}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">City</h3>
                <p className="mt-1">{client.city}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">State</h3>
                <p className="mt-1">{client.state}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">State Code</h3>
                <p className="mt-1">{client.stateCode}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Pincode</h3>
                <p className="mt-1">{client.pincode}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                <p className="mt-1">{client.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Created At</h3>
                <p className="mt-1">{new Date(client.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                <p className="mt-1">{new Date(client.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
