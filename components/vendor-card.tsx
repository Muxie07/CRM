"use client"

import Link from "next/link"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Vendor } from "@/types/vendor"

interface VendorCardProps {
  vendor: Vendor
  onDelete: (vendor: Vendor) => void
}

export default function VendorCard({ vendor, onDelete }: VendorCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{vendor.companyName}</CardTitle>
            <CardDescription>
              {vendor.city}, {vendor.state}
            </CardDescription>
          </div>
          <Badge variant={vendor.category === "Tamil Nadu" ? "default" : "secondary"}>{vendor.category}</Badge>
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
        <Button variant="destructive" size="icon" onClick={() => onDelete(vendor)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
