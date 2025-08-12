export interface Vehicle {
  id: number | string
  model: string
  type: string
  color: string
  engineCapacity?: string
  price: number
  status: string
  quantity: number
  image?: string
  lastUpdated?: string
  features?: string[]
  specifications?: Record<string, string>
  createdAt?: string
  updatedAt?: string
}
