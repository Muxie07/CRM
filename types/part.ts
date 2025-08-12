export interface Part {
  id: number | string
  name: string
  partNumber: string
  description?: string
  price: number
  quantity: number
  category?: string
  type?: string
  uses?: string[]
  color?: string
  status?: "In Stock" | "Low Stock" | "Out of Stock"
  location?: string
  minStockLevel?: number
  supplier?: string
  image?: string
  lastOrdered?: string
  createdAt?: string
  updatedAt?: string
}
