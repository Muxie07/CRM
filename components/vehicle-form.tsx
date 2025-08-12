"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

const formSchema = z.object({
  model: z.string().min(2, {
    message: "Model must be at least 2 characters.",
  }),
  variant: z.string().min(2, {
    message: "Variant must be at least 2 characters.",
  }),
  color: z.string().min(2, {
    message: "Color must be at least 2 characters.",
  }),
  year: z.string().min(4, {
    message: "Year must be valid.",
  }),
  vin: z.string().min(5, {
    message: "VIN must be at least 5 characters.",
  }),
  engineNumber: z.string().min(5, {
    message: "Engine number must be at least 5 characters.",
  }),
  status: z.string(),
  price: z.string().min(1, {
    message: "Price is required.",
  }),
  notes: z.string().optional(),
})

type VehicleFormValues = z.infer<typeof formSchema>

export default function VehicleForm({ vehicle }: { vehicle?: VehicleFormValues }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const defaultValues: Partial<VehicleFormValues> = {
    model: vehicle?.model || "",
    variant: vehicle?.variant || "",
    color: vehicle?.color || "",
    year: vehicle?.year || new Date().getFullYear().toString(),
    vin: vehicle?.vin || "",
    engineNumber: vehicle?.engineNumber || "",
    status: vehicle?.status || "in_stock",
    price: vehicle?.price || "",
    notes: vehicle?.notes || "",
  }

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function onSubmit(data: VehicleFormValues) {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: vehicle ? "Vehicle updated" : "Vehicle added",
        description: `${data.model} ${data.variant} has been ${vehicle ? "updated" : "added"} successfully.`,
      })

      router.push("/inventory")
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{vehicle ? "Edit Vehicle" : "Add New Vehicle"}</CardTitle>
        <CardDescription>
          {vehicle
            ? "Update vehicle information in the inventory."
            : "Enter vehicle details to add it to the inventory."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Select defaultValue={defaultValues.model} onValueChange={(value) => form.setValue("model", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apache">Apache RTR</SelectItem>
                  <SelectItem value="jupiter">Jupiter</SelectItem>
                  <SelectItem value="ntorq">NTORQ</SelectItem>
                  <SelectItem value="raider">Raider</SelectItem>
                  <SelectItem value="ronin">Ronin</SelectItem>
                  <SelectItem value="xl">XL</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.model && (
                <p className="text-sm text-red-500">{form.formState.errors.model.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="variant">Variant</Label>
              <Input id="variant" placeholder="e.g. 160 4V" {...form.register("variant")} />
              {form.formState.errors.variant && (
                <p className="text-sm text-red-500">{form.formState.errors.variant.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input id="color" placeholder="e.g. Racing Red" {...form.register("color")} />
              {form.formState.errors.color && (
                <p className="text-sm text-red-500">{form.formState.errors.color.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input id="year" placeholder="e.g. 2023" {...form.register("year")} />
              {form.formState.errors.year && (
                <p className="text-sm text-red-500">{form.formState.errors.year.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="vin">VIN</Label>
              <Input id="vin" placeholder="Vehicle Identification Number" {...form.register("vin")} />
              {form.formState.errors.vin && <p className="text-sm text-red-500">{form.formState.errors.vin.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="engineNumber">Engine Number</Label>
              <Input id="engineNumber" placeholder="Engine Number" {...form.register("engineNumber")} />
              {form.formState.errors.engineNumber && (
                <p className="text-sm text-red-500">{form.formState.errors.engineNumber.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue={defaultValues.status} onValueChange={(value) => form.setValue("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in_stock">In Stock</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="in_transit">In Transit</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.status && (
                <p className="text-sm text-red-500">{form.formState.errors.status.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input id="price" placeholder="e.g. 125000" {...form.register("price")} />
              {form.formState.errors.price && (
                <p className="text-sm text-red-500">{form.formState.errors.price.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional information about the vehicle"
              {...form.register("notes")}
              rows={4}
            />
            {form.formState.errors.notes && (
              <p className="text-sm text-red-500">{form.formState.errors.notes.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="mr-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </span>
                  Processing...
                </>
              ) : vehicle ? (
                "Update Vehicle"
              ) : (
                "Add Vehicle"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
