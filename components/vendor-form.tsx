"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import type { Vendor } from "@/types/vendor"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface VendorFormProps {
  initialData?: Vendor
  onSubmit: (data: Vendor) => void
  isSubmitting: boolean
}

// Complete GST State Code list for India as of 2025 (using numeric codes)
const indianStateCodes = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "26", // Dadra & Nagar Haveli and Daman & Diu
  "27",
  "28", // Andhra Pradesh (old) - Note: New code is 37
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35", // Andaman & Nicobar Islands
  "36",
  "37", // Andhra Pradesh (new)
  "38",
]

const stateCodeRegex = /^\d{2}$/ // Regex for two digits

export function VendorForm({ initialData, onSubmit, isSubmitting }: VendorFormProps) {
  const [formData, setFormData] = useState<Vendor>(
    initialData || {
      id: "",
      companyName: "",
      address: "",
      city: "",
      state: "",
      stateCode: "", // Initialize stateCode
      pincode: "",
      gstNumber: "", // Initialize gstNumber
      contactNumber: "",
      contactPerson: "",
      contactEmail: "",
      category: "Local",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  )
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const router = useRouter()

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value as "Local" | "Interstate" }))
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.companyName) newErrors.companyName = "Company Name is required"
    if (!formData.address) newErrors.address = "Address is required"
    if (!formData.city) newErrors.city = "City is required"
    if (!formData.state) newErrors.state = "State is required"
    if (!formData.stateCode) {
      newErrors.stateCode = "State Code is required"
    } else if (!stateCodeRegex.test(formData.stateCode) || !indianStateCodes.includes(formData.stateCode)) {
      newErrors.stateCode = "State Code must be a valid two-digit Indian GST state code (e.g., 33, 07)."
    }
    if (!formData.pincode) newErrors.pincode = "Pincode is required"
    if (!formData.gstNumber) newErrors.gstNumber = "GST Number is required"
    if (!formData.contactNumber) newErrors.contactNumber = "Contact Number is required"
    if (!formData.contactPerson) newErrors.contactPerson = "Contact Person is required"
    if (!formData.contactEmail) {
      newErrors.contactEmail = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Email is invalid"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit({ ...formData, updatedAt: new Date().toISOString() })
    } else {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Edit Vendor" : "Add New Vendor"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={errors.companyName ? "border-red-500" : ""}
              />
              {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
            </div>
            <div>
              <Label htmlFor="gstNumber">GST Number</Label>
              <Input
                id="gstNumber"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                className={errors.gstNumber ? "border-red-500" : ""}
              />
              {errors.gstNumber && <p className="text-red-500 text-sm mt-1">{errors.gstNumber}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contactPerson">Contact Person</Label>
              <Input
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                className={errors.contactPerson ? "border-red-500" : ""}
              />
              {errors.contactPerson && <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>}
            </div>
            <div>
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className={errors.contactNumber ? "border-red-500" : ""}
              />
              {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="contactEmail">Email</Label>
            <Input
              id="contactEmail"
              name="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleChange}
              className={errors.contactEmail ? "border-red-500" : ""}
            />
            {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? "border-red-500" : ""}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? "border-red-500" : ""}
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={errors.state ? "border-red-500" : ""}
              />
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>
            <div>
              <Label htmlFor="stateCode">State Code (e.g., 33)</Label>
              <Input
                id="stateCode"
                name="stateCode"
                value={formData.stateCode}
                onChange={handleChange}
                maxLength={2}
                className={errors.stateCode ? "border-red-500" : ""}
              />
              {errors.stateCode && <p className="text-red-500 text-sm mt-1">{errors.stateCode}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className={errors.pincode ? "border-red-500" : ""}
            />
            {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <RadioGroup value={formData.category} onValueChange={handleRadioChange} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Local" id="category-local" />
                <Label htmlFor="category-local">Local</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Interstate" id="category-interstate" />
                <Label htmlFor="category-interstate">Interstate</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Update Vendor" : "Add Vendor"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
