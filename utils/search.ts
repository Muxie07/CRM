/**
 * Utility functions for searching and filtering data in the CRM
 */

import type { Customer } from "@/types/customer"
import type { Vehicle } from "@/types/vehicle"
import type { Service } from "@/types/service"
import type { Sale } from "@/types/sale"
import type { Part } from "@/types/part"

/**
 * Search customers based on a query string
 */
export function searchCustomers(customers: Customer[], query: string): Customer[] {
  if (!query) return customers

  const lowerQuery = query.toLowerCase()
  return customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(lowerQuery) ||
      customer.phone.includes(lowerQuery) ||
      customer.email.toLowerCase().includes(lowerQuery) ||
      (customer.address && customer.address.toLowerCase().includes(lowerQuery)) ||
      (customer.vehicleType && customer.vehicleType.toLowerCase().includes(lowerQuery)),
  )
}

/**
 * Search vehicles based on a query string
 */
export function searchVehicles(vehicles: Vehicle[], query: string): Vehicle[] {
  if (!query) return vehicles

  const lowerQuery = query.toLowerCase()
  return vehicles.filter(
    (vehicle) =>
      vehicle.model.toLowerCase().includes(lowerQuery) ||
      vehicle.type.toLowerCase().includes(lowerQuery) ||
      vehicle.color.toLowerCase().includes(lowerQuery) ||
      (vehicle.engineCapacity && vehicle.engineCapacity.toLowerCase().includes(lowerQuery)),
  )
}

/**
 * Search service appointments based on a query string
 */
export function searchServices(services: Service[], query: string): Service[] {
  if (!query) return services

  const lowerQuery = query.toLowerCase()
  return services.filter(
    (service) =>
      service.customer.toLowerCase().includes(lowerQuery) ||
      service.phone.includes(lowerQuery) ||
      service.vehicle.toLowerCase().includes(lowerQuery) ||
      service.serviceType.toLowerCase().includes(lowerQuery) ||
      (service.notes && service.notes.toLowerCase().includes(lowerQuery)),
  )
}

/**
 * Search sales based on a query string
 */
export function searchSales(sales: Sale[], query: string): Sale[] {
  if (!query) return sales

  const lowerQuery = query.toLowerCase()
  return sales.filter(
    (sale) =>
      sale.customer.toLowerCase().includes(lowerQuery) ||
      sale.vehicle.toLowerCase().includes(lowerQuery) ||
      (sale.salesperson && sale.salesperson.toLowerCase().includes(lowerQuery)),
  )
}

/**
 * Search parts based on a query string
 */
export function searchParts(parts: Part[], query: string): Part[] {
  if (!query) return parts

  const lowerQuery = query.toLowerCase()
  return parts.filter(
    (part) =>
      part.name.toLowerCase().includes(lowerQuery) ||
      part.partNumber.toLowerCase().includes(lowerQuery) ||
      (part.description && part.description.toLowerCase().includes(lowerQuery)) ||
      (part.category && part.category.toLowerCase().includes(lowerQuery)),
  )
}

/**
 * Search jobs/vehicles based on a query string
 * This is an alias for searchVehicles to maintain compatibility with existing code
 */
export function searchJobs(vehicles: Vehicle[], query: string): Vehicle[] {
  return searchVehicles(vehicles, query)
}

/**
 * Parse location from URL path
 * This is a placeholder function that would be used if we had location-based routing
 */
export function parseLocationFromPath(path: string): string | null {
  // This is a simplified implementation
  // In a real app, you might parse location from a path like /jobs/chennai
  const locationMatch = path.match(/\/jobs\/([^/]+)/)
  return locationMatch ? locationMatch[1] : null
}

/**
 * Parse search parameters from URL
 */
export function parseSearchParams(searchParams: URLSearchParams): Record<string, string> {
  const params: Record<string, string> = {}

  // Add all search parameters to the params object
  searchParams.forEach((value, key) => {
    params[key] = value
  })

  return params
}

/**
 * Match items with preferences
 * This is a generic function that can be adapted for different entity types
 */
export function matchJobsWithPreferences<T>(items: T[], preferences: Record<string, string>): T[] {
  // This is a simplified implementation
  // In a real app, you would have more sophisticated matching logic
  return items
}

/**
 * Generate a magic link with search parameters
 * This creates a URL with query parameters for filtering
 */
export function generateMagicLink(preferences: Record<string, string>): string {
  const params = new URLSearchParams()

  // Add all preferences to the URL parameters
  Object.entries(preferences).forEach(([key, value]) => {
    if (value) {
      params.append(key, value)
    }
  })

  // Return a URL with the search parameters
  return `/inventory?${params.toString()}`
}

/**
 * Filter data based on multiple criteria
 */
export function filterData<T>(
  data: T[],
  filterFn: (item: T, query: string, filters: Record<string, string>) => boolean,
  query: string,
  filters: Record<string, string>,
): T[] {
  return data.filter((item) => filterFn(item, query, filters))
}

/**
 * Sort data based on a key and direction
 */
export function sortData<T>(data: T[], key: keyof T, direction: "asc" | "desc"): T[] {
  return [...data].sort((a, b) => {
    const valueA = a[key]
    const valueB = b[key]

    if (valueA < valueB) return direction === "asc" ? -1 : 1
    if (valueA > valueB) return direction === "asc" ? 1 : -1
    return 0
  })
}
