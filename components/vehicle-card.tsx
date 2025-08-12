"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, MoreHorizontal, Tag, PenToolIcon as Tool } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import type { Vehicle } from "@/types/vehicle"

interface VehicleCardProps {
  vehicle: Vehicle
  showOwner?: boolean
}

export function VehicleCard({ vehicle, showOwner = false }: VehicleCardProps) {
  const lastServiceDate =
    vehicle.serviceHistory && vehicle.serviceHistory.length > 0 ? new Date(vehicle.serviceHistory[0].date) : null

  const lastServiceText = lastServiceDate
    ? formatDistanceToNow(lastServiceDate, { addSuffix: true })
    : "No service history"

  const nextServiceDue = vehicle.nextServiceDue
    ? formatDistanceToNow(new Date(vehicle.nextServiceDue), { addSuffix: true })
    : "Not scheduled"

  return (
    <Card className="w-full transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{vehicle.model}</h3>
              <Badge variant={vehicle.status === "Active" ? "default" : "secondary"}>{vehicle.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {vehicle.registrationNumber} • {vehicle.color}
            </p>
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
                <Link href={`/inventory/${vehicle.id}`}>View Details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/inventory/${vehicle.id}/edit`}>Edit Vehicle</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/service/new?vehicleId=${vehicle.id}`}>Schedule Service</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="relative h-24 w-24 overflow-hidden rounded-md">
            <Image
              src={vehicle.imageUrl || `/placeholder.svg?height=96&width=96&query=TVS ${vehicle.model}`}
              alt={vehicle.model}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid gap-2">
            {showOwner && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Owner: {vehicle.ownerName}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Purchased: {new Date(vehicle.purchaseDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span>Chassis: {vehicle.chassisNumber}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Tool className="h-4 w-4 text-muted-foreground" />
              <span>Last service: {lastServiceText}</span>
            </div>
          </div>
        </div>

        {vehicle.upcomingService && (
          <div className="mt-4 rounded-md bg-muted p-3">
            <div className="flex items-center justify-between">
              <div className="font-medium">Next Service</div>
              <Badge variant="outline">{vehicle.upcomingService.type}</Badge>
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{new Date(vehicle.upcomingService.date).toLocaleDateString()}</span>
              <Clock className="ml-1 h-4 w-4" />
              <span>{vehicle.upcomingService.time}</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/service/history/${vehicle.id}`}>Service History</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href={`/service/new?vehicleId=${vehicle.id}`}>Schedule Service</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
