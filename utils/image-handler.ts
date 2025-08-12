/**
 * Utility functions for handling images in the CRM
 */

import type { Product } from "@/types/product"

// Map product types to appropriate placeholder images
const typePlaceholderMap: Record<string, string> = {
  "Electrical Terminal Lugs": "/images/categories/electrical-terminals.png",
  "Aluminum Compression Terminals": "/images/subcategories/aluminum-terminals.png",
  "Copper Compression Terminals": "/images/subcategories/copper-terminals.png",
  "Small Terminals": "/images/subcategories/small-terminals.png",
  "Mechanical Bolted Connectors": "/images/subcategories/mechanical-connectors.png",
  "Overhead Distribution Connectors": "/images/categories/overhead-distribution.png",
  "C-Wedge Connectors": "/images/subcategories/c-wedge-connectors.png",
  "Parallel Groove Connectors": "/images/subcategories/parallel-groove-connectors.png",
  "P-Tap Connectors": "/images/subcategories/p-tap-connectors.png",
  "Mechanical & Powered Tools": "/images/categories/mechanical-tools.png",
  "Crimping & Cutting Tools": "/crimping-cutting-tools.png",
  "Hydraulic Tools": "/hydraulic-crimping-cutting-tools.png",
  "Pneumatic Tools": "/pneumatic-tool-assortment.png",
  "Grounding Connectors": "/images/categories/grounding-connectors.png",
  "Rod Clamps": "/ground-rod-clamp.png",
  "Grounding Lugs": "/grounding-lug.png",
  "Exothermic Welding": "/exothermic-welding-mold.png",
  Networking: "/images/categories/networking.png",
  Connectors: "/cat6-connector.png",
  "Fiber Optics": "/fiber-splice-closure.png",
  "Patch Panels": "/network-patch-panel.png",
  "Unified Communication": "/images/categories/unified-communication.png",
  "Conference Systems": "/ip-conference-phone.png",
  Headsets: "/wireless-headset.png",
  "Video Systems": "/video-conference-camera.png",
}

// Default placeholder images by product brand
const brandPlaceholderMap: Record<string, string> = {
  Burndy: "/placeholder.svg?key=2rhdn",
  "Thomas & Betts": "/placeholder.svg?key=r7hrb",
  Panduit: "/placeholder.svg?key=qk0qq",
  Hubbell: "/placeholder.svg?key=rm0dg",
  Molex: "/placeholder.svg?key=ppd17",
}

/**
 * Get appropriate image for a product
 * - Returns actual image if available and not empty
 * - Returns category-specific image if available
 * - Returns brand-specific placeholder if available
 * - Returns null if no valid image is available (NEVER empty string)
 */
export function getProductImage(product: Partial<Product> & { image?: string | null }): string | null {
  // If product is null/undefined, return null
  if (!product) return null

  // If product has an actual image that's not empty, use it
  if (product.image && typeof product.image === "string" && product.image.trim() !== "") {
    return product.image
  }

  // If product has a type that matches our map, use that image
  if (product.type && typePlaceholderMap[product.type]) {
    return typePlaceholderMap[product.type]
  }

  // If product has a brand that matches our map, use that image
  if (product.brand && brandPlaceholderMap[product.brand]) {
    return brandPlaceholderMap[product.brand]
  }

  // Generate a product-specific placeholder based on its attributes
  return `/placeholder.svg?height=200&width=200&query=${encodeURIComponent(
    product.type || product.brand || product.modelNumber || "Product",
  )}`
}

/**
 * Validate uploaded image file
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Invalid file type. Please upload JPG, PNG, GIF, or WebP images.",
    }
  }

  // Check file size (5MB limit)
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: "File too large. Maximum size is 5MB.",
    }
  }

  return { valid: true }
}

/**
 * Create a data URL from a file for preview
 */
export function createImagePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve((e.target?.result as string) || "")
    reader.onerror = (e) => reject(e)
    reader.readAsDataURL(file)
  })
}
