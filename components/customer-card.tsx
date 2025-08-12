"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, ChevronDown, ChevronUp, Clock, MapPin, MoreHorizontal, Phone, Wrench } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import type { Customer } from "@/types/customer"

interface CustomerCardProps {
  customer: Customer
  compact?: boolean
}

export function CustomerCard({ customer, compact = false }: CustomerCardProps) {
  const [expanded, setExpanded] = useState(false)

  const toggleExpand = () => {
    if (!compact) setExpanded(!expanded)
  }

  const lastServiceDate =
    customer.serviceHistory && customer.serviceHistory.length > 0 ? new Date(customer.serviceHistory[0].date) : null

  const lastServiceText = lastServiceDate
    ? formatDistanceToNow(lastServiceDate, { addSuffix: true })
    : "No service history"

  return (
    <Card className="w-full transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{customer.name}</h3>
              {customer.isPremium && (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                  Premium
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{customer.vehicles.length} vehicle(s)</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/customers/${customer.id}`}>View Details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/customers/${customer.id}/edit`}>Edit Customer</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/service/new?customerId=${customer.id}`}>Schedule Service</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid gap-2">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{customer.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{customer.address}</span>
          </div>
          {!compact && (
            <div className="flex items-center gap-2 text-sm">
              <Wrench className="h-4 w-4 text-muted-foreground" />
              <span>Last service: {lastServiceText}</span>
            </div>
          )}
        </div>

        {expanded && (
          <div className="mt-4 border-t pt-4">
            <h4 className="mb-2 font-medium">Vehicles</h4>
            <div className="space-y-2">
              {customer.vehicles.map((vehicle) => (
                <div key={vehicle.id} className="rounded-md bg-muted p-2">
                  <div className="flex justify-between">
                    <div className="font-medium">{vehicle.model}</div>
                    <Badge variant={vehicle.status === "Active" ? "default" : "secondary"}>{vehicle.status}</Badge>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <span>Reg: {vehicle.registrationNumber}</span>
                      <span className="mx-1">•</span>
                      <span>Purchased: {new Date(vehicle.purchaseDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {customer.upcomingAppointments && customer.upcomingAppointments.length > 0 && (
              <div className="mt-4">
                <h4 className="mb-2 font-medium">Upcoming Appointments</h4>
                <div className="space-y-2">
                  {customer.upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="rounded-md bg-muted p-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{appointment.type}</div>
                        <Badge variant="outline">{appointment.status}</Badge>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        <Clock className="ml-1 h-3 w-3" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      {!compact && (
        <CardFooter className="flex justify-between pt-0">
          <Button variant="ghost" size="sm" className="w-full" onClick={toggleExpand}>
            {expanded ? (
              <span className="flex items-center gap-1">
                <ChevronUp className="h-4 w-4" /> Show Less
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <ChevronDown className="h-4 w-4" /> Show More
              </span>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
