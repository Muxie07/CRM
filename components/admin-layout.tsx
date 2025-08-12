"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Users,
  Package,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  ShoppingCart,
  FileCheck,
  LayoutDashboard,
  Building2,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(["reports"])

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName) ? prev.filter((item) => item !== itemName) : [...prev, itemName],
    )
  }

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Clients", href: "/admin/clients", icon: Users },
    { name: "Vendors", href: "/admin/vendors", icon: Building2 },
    { name: "Inventory", href: "/admin/inventory", icon: Package },
    { name: "Sales", href: "/admin/sales", icon: ShoppingCart },
    {
      name: "Reports",
      href: "/admin/reports",
      icon: BarChart3,
      subItems: [
        { name: "All Reports", href: "/admin/reports" },
        { name: "Client Sales", href: "/admin/reports/client-sales" },
        { name: "Vendor Purchase", href: "/admin/reports/vendor-purchase" },
        { name: "Overall Sales", href: "/admin/reports/overall-sales" },
        { name: "Overall Purchase", href: "/admin/reports/overall-purchase" },
        { name: "Brand-wise", href: "/admin/reports/brand-wise" },
      ],
    },
    { name: "Invoices", href: "/admin/invoices", icon: FileText },
    { name: "Quotations", href: "/admin/quotations", icon: FileText },
    { name: "Purchase Orders", href: "/admin/purchase-orders", icon: ShoppingCart },
    { name: "Proforma Invoices", href: "/admin/proforma-invoices", icon: FileCheck },
    { name: "Sales Dashboard", href: "/admin/sales-dashboard", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
          <div className="flex items-center flex-shrink-0 px-4 mb-5">
            <Image src="/diac-logo.jpg" alt="DIAC Engineering" width={150} height={50} className="h-12 w-auto" />
          </div>
          <div className="flex flex-col flex-grow">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                const isExpanded = expandedItems.includes(item.name.toLowerCase())
                const hasSubItems = item.subItems && item.subItems.length > 0

                return (
                  <div key={item.name}>
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        className={cn(
                          isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center px-2 py-2 text-sm font-medium rounded-md flex-1",
                        )}
                      >
                        <item.icon
                          className={cn(
                            isActive ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500",
                            "mr-3 flex-shrink-0 h-5 w-5",
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                      {hasSubItems && (
                        <button
                          onClick={() => toggleExpanded(item.name.toLowerCase())}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                      )}
                    </div>

                    {hasSubItems && isExpanded && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.subItems.map((subItem) => {
                          const isSubActive = pathname === subItem.href || pathname?.startsWith(`${subItem.href}/`)
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={cn(
                                isSubActive
                                  ? "bg-gray-50 text-gray-900 border-l-2 border-blue-500"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                "group flex items-center px-2 py-1.5 text-sm font-medium rounded-md",
                              )}
                            >
                              {subItem.name}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
          </div>
          <div className="flex flex-shrink-0 p-4 border-t">
            <button className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
              <LogOut className="w-5 h-5 mr-3 text-gray-400" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="px-4 sm:px-6 md:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}
