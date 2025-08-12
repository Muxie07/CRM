"use client"

import Link from "next/link"
import { Calendar, Clock, MoreHorizontal, User, Wrench } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import type { ServiceAppointment } from "@/types/service"

interface ServiceCardProps {
  appointment: ServiceAppointment
}

export function ServiceCard({ appointment }: ServiceCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-50 text-blue-700 hover:bg-blue-50"
      case "In Progress":
        return "bg-amber-50 text-amber-700 hover:bg-amber-50"
      case "Completed":
        return "bg-green-50 text-green-700 hover:bg-green-50"
      case "Cancelled":
        return "bg-red-50 text-red-700 hover:bg-red-50"
      default:
        return ""
    }
  }

  return (
    <Card className="w-full transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{appointment.type}</h3>
              <Badge variant="outline" className={getStatusColor(appointment.status)}>
                {appointment.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">ID: {appointment.id}</p>
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
                <Link href={`/service/${appointment.id}`}>View Details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/service/${appointment.id}/edit`}>Edit Appointment</Link>
              </DropdownMenuItem>
              {appointment.status === "Scheduled" && (
                <DropdownMenuItem asChild>
                  <Link href={`/service/${appointment.id}/start`}>Start Service</Link>
                </DropdownMenuItem>
              )}
              {appointment.status === "In Progress" && (
                <DropdownMenuItem asChild>
                  <Link href={`/service/${appointment.id}/complete`}>Complete Service</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{new Date(appointment.date).toLocaleDateString()}</span>
            <Clock className="ml-2 h-4 w-4 text-muted-foreground" />
            <span>{appointment.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>Customer: {appointment.customerName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Wrench className="h-4 w-4 text-muted-foreground" />
            <span>
              Vehicle: {appointment.vehicleModel} ({appointment.vehicleRegistration})
            </span>
          </div>
        </div>

        {appointment.services && appointment.services.length > 0 && (
          <div className="mt-4">
            <h4 className="mb-2 text-sm font-medium">Services</h4>
            <div className="space-y-1">
              {appointment.services.map((service, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{service.name}</span>
                  <span>₹{service.price.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between border-t pt-1 text-sm font-medium">
                <span>Total</span>
                <span>₹{appointment.services.reduce((sum, service) => sum + service.price, 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {appointment.status === "Scheduled" && (
          <>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/service/${appointment.id}/reschedule`}>Reschedule</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={`/service/${appointment.id}/start`}>Start Service</Link>
            </Button>
          </>
        )}
        {appointment.status === "In Progress" && (
          <Button size="sm" className="w-full" asChild>
            <Link href={`/service/${appointment.id}/complete`}>Complete Service</Link>
          </Button>
        )}
        {appointment.status === "Completed" && (
          <Button size="sm" className="w-full" asChild>
            <Link href={`/service/${appointment.id}/invoice`}>View Invoice</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
