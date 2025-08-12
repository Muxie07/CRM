export interface Product {
  id: string
  description: string
  itemCode: string // HSN code
  modelNumber: string
  brand: string
  quantity: number
  prices: {
    tier2Price: string
    crpEndPrice: string
    customerPrice: string
  }
  createdAt: string
  updatedAt: string
  image?: string
  images?: string[]
  specifications?: { name: string; value: string }[]
}

export interface ProductCategory {
  id: string
  name: string
  description: string
  image: string
  subcategories?: ProductSubcategory[]
}

export interface ProductSubcategory {
  id: string
  name: string
  description: string
  image: string
}
