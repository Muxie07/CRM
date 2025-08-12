export interface ServiceItem {
  name: string
  price: number
}

export interface ServiceAppointment {
  id: string
  customerId: string
  customerName: string
  vehicleId: string
  vehicleModel: string
  vehicleRegistration: string
  type: string
  date: string
  time: string
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled"
  technicianId?: string
  technicianName?: string
  notes?: string
  services?: ServiceItem[]
}

export interface Service {
  id: number | string
  customer: string
  phone: string
  vehicle: string
  date: string
  time: string
  serviceType: string
  status: string
  notes?: string
  technician?: string
  cost?: number
  parts?: ServicePart[]
  createdAt?: string
  updatedAt?: string
}

export interface ServicePart {
  id: number | string
  name: string
  quantity: number
  price: number
}
