export interface Client {
  id: string
  companyName: string
  address: string
  city: string
  state: string
  stateCode: string // Changed to string to accommodate "01", "02", etc.
  pincode: string
  gstNumber: string // GST Number field
  contactNumber: string
  contactPerson: string
  contactEmail: string
  category: "Tamil Nadu" | "Other States"
  createdAt: string
  updatedAt: string
}
