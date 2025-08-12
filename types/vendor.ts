export interface Vendor {
  id: string
  companyName: string
  address: string
  city: string
  state: string
  stateCode: string // Added stateCode
  pincode: string
  gstNumber: string // GST Number field
  contactNumber: string
  contactPerson: string
  contactEmail: string
  category: "Local" | "Interstate"
  createdAt: string
  updatedAt: string
}
