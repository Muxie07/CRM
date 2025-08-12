import type { Client } from "@/types/client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

interface ClientCardProps {
  client: Client
}

export function ClientCard({ client }: ClientCardProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between">
      <div className="space-y-2 mb-3 md:mb-0">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold">{client.companyName}</h3>
          <Badge variant={client.category === "Tamil Nadu" ? "default" : "secondary"} className="ml-2">
            {client.category}
          </Badge>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-6">
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">{client.gstNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gray-500" />
            <a href={`mailto:${client.contactEmail}`} className="text-blue-600 hover:underline">
              {client.contactEmail}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <a href={`tel:${client.contactNumber}`} className="hover:underline">
              {client.contactNumber}
            </a>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
            <span>
              {client.city}, {client.state}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="sm" className="hover:bg-gray-100 hover:text-gray-900" asChild>
          <Link href={`/admin/clients/${client.id}`}>View Details</Link>
        </Button>
        <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:text-blue-700" asChild>
          <Link href={`/admin/clients/${client.id}/edit`}>Edit</Link>
        </Button>
      </div>
    </div>
  )
}
