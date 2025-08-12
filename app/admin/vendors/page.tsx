"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Search, Filter, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import AdminLayout from "@/components/admin-layout"
import { vendors } from "@/data/vendors"
import type { Vendor } from "@/types/vendor"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function VendorsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [vendorToDelete, setVendorToDelete] = useState<Vendor | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const { ref } = useScrollReveal()

  // Filter vendors based on search term and category
  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.city.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || vendor.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const handleDeleteVendor = (vendor: Vendor) => {
    setVendorToDelete(vendor)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, this would make an API call to delete the vendor
    toast({
      title: "Vendor deleted",
      description: `${vendorToDelete?.companyName} has been removed from your vendors.`,
    })
    setIsDeleteDialogOpen(false)
    // In a real app, you would refresh the data or update the state
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Vendor Management</h1>
            <p className="text-muted-foreground">Manage your vendors and their purchase invoices</p>
          </div>
          <Button asChild>
            <Link href="/admin/vendors/new">
              <Plus className="mr-2 h-4 w-4" /> Add New Vendor
            </Link>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search vendors..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                <SelectItem value="Other States">Other States</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.length > 0 ? (
            filteredVendors.map((vendor) => (
              <Card key={vendor.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{vendor.companyName}</CardTitle>
                      <CardDescription>
                        {vendor.city}, {vendor.state}
                      </CardDescription>
                    </div>
                    <Badge variant={vendor.category === "Tamil Nadu" ? "default" : "secondary"}>
                      {vendor.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Contact:</span> {vendor.contactPerson}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> {vendor.contactEmail}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span> {vendor.contactNumber}
                    </p>
                    <p>
                      <span className="font-medium">GST:</span> {vendor.gstNumber}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" asChild>
                    <Link href={`/admin/vendors/${vendor.id}`}>View Details</Link>
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDeleteVendor(vendor)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center p-8 border rounded-lg">
              <p className="text-muted-foreground">No vendors found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Vendor</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {vendorToDelete?.companyName}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
