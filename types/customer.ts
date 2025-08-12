export interface Customer {
  id: number | string
  name: string
  phone: string
  email: string
  address?: string
  vehicleType?: string
  purchaseDate?: string
  lastService?: string
  nextService?: string
  notes?: string
  createdAt?: string
  updatedAt?: string
}
