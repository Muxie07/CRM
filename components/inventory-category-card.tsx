import Link from "next/link"
import { TrendingUp } from "lucide-react"
import type { ReactNode } from "react"

interface InventoryCategoryCardProps {
  title: string
  href: string
  icon: ReactNode
  count: number
  growth: number
  inStock: number
  lowStock: number
  outOfStock: number
  color: "red" | "blue" | "purple" | "green" | "orange" | "teal"
}

export function InventoryCategoryCard({
  title,
  href,
  icon,
  count,
  growth,
  inStock,
  lowStock,
  outOfStock,
  color,
}: InventoryCategoryCardProps) {
  const colorMap = {
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
      hover: "group-hover:border-red-100",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      hover: "group-hover:border-blue-100",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      hover: "group-hover:border-purple-100",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      hover: "group-hover:border-green-100",
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
      hover: "group-hover:border-orange-100",
    },
    teal: {
      bg: "bg-teal-100",
      text: "text-teal-600",
      hover: "group-hover:border-teal-100",
    },
  }

  return (
    <Link href={href} className="group">
      <div
        className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all group-hover:shadow-md ${colorMap[color].hover}`}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-700 font-medium">{title}</div>
          <div className={`${colorMap[color].bg} p-2 rounded-lg`}>
            <div className={`w-5 h-5 ${colorMap[color].text}`}>{icon}</div>
          </div>
        </div>
        <div className="text-2xl font-bold mb-2">{count}</div>
        <div className="flex items-center text-sm">
          <span className="text-green-500 flex items-center mr-1">
            <TrendingUp className="w-3 h-3 mr-1" />
            {growth}%
          </span>
          <span className="text-gray-500">inventory growth</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            In Stock: {inStock}
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Low Stock: {lowStock}
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Out of Stock: {outOfStock}
          </span>
        </div>
      </div>
    </Link>
  )
}
