"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package } from 'lucide-react'
import { cn } from "@/lib/utils"

export interface ProductCardProps {
  title?: string
  subtitle?: string
  imageUrl?: string | null
  price?: number
  currency?: string
  badge?: string
  href?: string
  inStock?: boolean
  className?: string
}

function formatPrice(value?: number, currency: string = "₹") {
  if (value == null) return ""
  try {
    return `${currency}${new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)}`
  } catch {
    return `${currency}${value}`
  }
}

export function ProductCard({
  title = "Electrical Component",
  subtitle,
  imageUrl,
  price,
  currency = "₹",
  badge = "Standard",
  href,
  inStock = true,
  className,
}: ProductCardProps) {
  const content = (
    <Card
      className={cn(
        "group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md",
        className,
      )}
    >
      {/* Image area with enhanced visuals */}
      <div className="relative h-48 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="w-full h-full bg-center bg-no-repeat bg-contain p-2 transition-transform duration-300 group-hover:scale-105"
          style={{
            backgroundImage: imageUrl
              ? `url(${imageUrl})`
              : "url(/images/electrical-components-grid.png)",
          }}
          aria-label={title}
          role="img"
        />

        {/* Overlay for contrast */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(transparent,rgba(0,0,0,0.04))]" />

        {/* Subtle shine on hover */}
        <div className="pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-y-0 -left-1 w-1/3 bg-gradient-to-r from-white/0 via-white/25 to-white/0 rotate-12 translate-x-[-120%] group-hover:translate-x-[220%] transition-transform duration-700 ease-out" />
        </div>

        {/* Decorative corner blob */}
        <div className="pointer-events-none absolute -bottom-12 -right-12 w-40 h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full blur-2xl" />

        {/* Icon fallback overlay if no image */}
        {!imageUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur text-gray-700 shadow-sm">
              <Package className="h-4 w-4" />
              <span className="text-sm">Product preview</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-gray-800 line-clamp-1">{title}</h3>
          <Badge variant="secondary" className="bg-white/80 backdrop-blur border text-gray-700 shadow-sm">
            {badge}
          </Badge>
        </div>

        {subtitle && <p className="mt-1 text-sm text-gray-500 line-clamp-1">{subtitle}</p>}

        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm font-medium text-gray-900">{formatPrice(price, currency)}</div>
          <div
            className={cn(
              "text-xs px-2 py-1 rounded-full border",
              inStock
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-rose-50 text-rose-700 border-rose-200",
            )}
          >
            {inStock ? "In stock" : "Out of stock"}
          </div>
        </div>
      </div>

      {/* Focus ring for accessibility */}
      <span className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-blue-200/60 group-hover:ring-4 transition-[ring-width] duration-200" />
      <style jsx>{`
        @keyframes shimmerSwipe {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(220%);
          }
        }
      `}</style>
    </Card>
  )

  if (href) {
    return (
      <Link href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-xl">
        {content}
      </Link>
    )
  }

  return content
}

export default ProductCard
