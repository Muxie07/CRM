"use client"

import Image from "next/image"
import Link from "next/link"
import { Edit, Trash2, Tag, Package, AlertTriangle, Zap } from "lucide-react"
import type { Part } from "@/types/part"

interface PartCardProps {
  part: Part
  onDelete?: (id: number | string) => void
}

export default function PartCard({ part, onDelete }: PartCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="relative h-48 bg-gray-100">
        <Image src={part.image || null} alt={part.name} fill className="object-contain p-2" />
        <div
          className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full ${
            part.status === "Out of Stock"
              ? "bg-red-100 text-red-800"
              : part.status === "Low Stock"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
          }`}
        >
          {part.status}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{part.name}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <Tag className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-gray-700">
              ₹{part.price.toLocaleString()} | {part.partNumber}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <Package className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-gray-700">{part.type}</span>
          </div>
          {part.color && (
            <div className="flex items-center text-sm">
              <div className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: getColorCode(part.color) }}></div>
              <span className="text-gray-700">{part.color}</span>
            </div>
          )}
          {part.uses && part.uses.length > 0 && (
            <div className="flex items-start text-sm">
              <Zap className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
              <span className="text-gray-700">
                {part.uses[0]}
                {part.uses.length > 1 ? ` +${part.uses.length - 1} more` : ""}
              </span>
            </div>
          )}
          {part.status === "Low Stock" && (
            <div className="flex items-center text-sm text-yellow-600">
              <AlertTriangle className="w-4 h-4 mr-2" />
              <span>Reorder needed</span>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">
            Quantity: <span className="font-bold">{part.quantity}</span>
          </div>
          <div className="flex space-x-2">
            <Link href={`/parts/${part.id}/edit`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
              <Edit className="w-4 h-4" />
            </Link>
            {onDelete && (
              <button onClick={() => onDelete(part.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to convert color names to color codes
function getColorCode(color: string): string {
  const colorMap: Record<string, string> = {
    Red: "#f87171",
    Blue: "#60a5fa",
    Yellow: "#fbbf24",
    Green: "#4ade80",
    Silver: "#d1d5db",
    Copper: "#d97706",
    Gray: "#9ca3af",
    Black: "#1f2937",
    White: "#ffffff",
  }

  return colorMap[color] || "#9ca3af" // Default to gray if color not found
}
