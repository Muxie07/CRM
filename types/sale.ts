export interface Sale {
  id: number | string
  customer: string
  vehicle: string
  saleDate: string
  amount: number
  paymentMethod: string
  salesperson?: string
  status: string
  financePlan?: string
  insurance?: string
  accessories?: string[]
  notes?: string
  createdAt?: string
  updatedAt?: string
}
