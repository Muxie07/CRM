"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/providers"
import AdminLayout from "@/components/admin-layout"
import {
  Download,
  Plus,
  LinkIcon,
  TrendingUp,
  UserCircle,
  Boxes,
  FileCheck,
  DollarSign,
  Receipt,
  FileTextIcon as FileText2,
} from "lucide-react"
import Link from "next/link"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function AdminDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [recentClients, setRecentClients] = useState([])
  const [recentQuotations, setRecentQuotations] = useState([])
  const [isExporting, setIsExporting] = useState(false)

  // Scroll reveal animations
  const headerReveal = useScrollReveal()
  const statsReveal = useScrollReveal({ delay: 100 })
  const recentClientsReveal = useScrollReveal({ delay: 200 })
  const recentQuotationsReveal = useScrollReveal({ delay: 300 })

  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      router.push("/login")
    } else {
      // Fetch recent clients
      setRecentClients([
        {
          id: 1,
          name: "Tata Motors Ltd.",
          phone: "022-66658282",
          email: "procurement@tatamotors.com",
          date: "2023-05-15",
        },
        { id: 2, name: "Bharat Electronics", phone: "080-25039300", email: "info@bel.co.in", date: "2023-05-16" },
        { id: 3, name: "Larsen & Toubro", phone: "022-67525656", email: "info@larsentoubro.com", date: "2023-05-17" },
      ])

      // Fetch recent quotations
      setRecentQuotations([
        { id: "Q-2023-042", client: "Tata Motors Ltd.", amount: 145000, date: "2023-05-18" },
        { id: "Q-2023-041", client: "Bharat Electronics", amount: 275000, date: "2023-05-17" },
        { id: "Q-2023-040", client: "Larsen & Toubro", amount: 320000, date: "2023-05-16" },
      ])
    }
  }, [user, isLoading, router])

  const handleExportReports = () => {
    setIsExporting(true)

    // Create dashboard data for export
    const dashboardData = {
      stats: {
        totalClients: 245,
        totalProducts: 1021,
        quotations: 42,
        revenue: "₹1.85 Cr",
      },
      recentClients: recentClients,
      recentQuotations: recentQuotations,
    }

    // Convert to CSV format
    const headers = ["Category", "Value"]
    const statsRows = [
      ["Total Clients", dashboardData.stats.totalClients],
      ["Total Products", dashboardData.stats.totalProducts],
      ["Quotations", dashboardData.stats.quotations],
      ["Revenue", dashboardData.stats.revenue],
    ]

    const clientHeaders = ["ID", "Name", "Phone", "Email", "Date"]
    const clientRows = dashboardData.recentClients.map((client) => [
      client.id,
      client.name,
      client.phone,
      client.email,
      client.date,
    ])

    const quotationHeaders = ["ID", "Client", "Amount", "Date"]
    const quotationRows = dashboardData.recentQuotations.map((quotation) => [
      quotation.id,
      quotation.client,
      quotation.amount,
      quotation.date,
    ])

    // Combine all data into one CSV
    const csvContent = [
      "Dashboard Summary",
      "",
      headers.join(","),
      ...statsRows.map((row) => row.join(",")),
      "",
      "Recent Clients",
      "",
      clientHeaders.join(","),
      ...clientRows.map((row) => row.join(",")),
      "",
      "Recent Quotations",
      "",
      quotationHeaders.join(","),
      ...quotationRows.map((row) => row.join(",")),
    ].join("\n")

    // Create blob and download
    setTimeout(() => {
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", "dashboard_report.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setIsExporting(false)
    }, 1000)
  }

  if (isLoading || !user || !user.isAdmin) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6">
        <div
          ref={headerReveal.ref}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 gap-4"
        >
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 text-xs sm:text-sm">Welcome back, {user.name || "Admin"}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleExportReports}
              disabled={isExporting}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                  Export Reports
                </>
              )}
            </button>
            <Link
              href="/admin/settings"
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              <LinkIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              Settings
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div ref={statsReveal.ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-500 text-sm font-medium">Total Clients</div>
              <div className="bg-purple-100 p-2 rounded-lg">
                <UserCircle className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">245</div>
            <div className="flex items-center text-sm">
              <span className="text-green-500 flex items-center mr-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                12%
              </span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-500 text-sm font-medium">Total Products</div>
              <div className="bg-teal-100 p-2 rounded-lg">
                <Boxes className="w-5 h-5 text-teal-600" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">1,021</div>
            <div className="flex items-center text-sm">
              <span className="text-green-500 flex items-center mr-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                8%
              </span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-500 text-sm font-medium">Quotations</div>
              <div className="bg-amber-100 p-2 rounded-lg">
                <FileCheck className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">42</div>
            <div className="flex items-center text-sm">
              <span className="text-green-500 flex items-center mr-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                15%
              </span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-500 text-sm font-medium">Revenue</div>
              <div className="bg-emerald-100 p-2 rounded-lg">
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">₹1.85 Cr</div>
            <div className="flex items-center text-sm">
              <span className="text-green-500 flex items-center mr-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                5%
              </span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-500 text-sm font-medium">Invoices</div>
              <div className="bg-sky-100 p-2 rounded-lg">
                <Receipt className="w-5 h-5 text-sky-600" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">28</div>
            <div className="flex items-center text-sm">
              <span className="text-green-500 flex items-center mr-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                18%
              </span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-500 text-sm font-medium">Proforma Invoices</div>
              <div className="bg-rose-100 p-2 rounded-lg">
                <FileText2 className="w-5 h-5 text-rose-600" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">36</div>
            <div className="flex items-center text-sm">
              <span className="text-green-500 flex items-center mr-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                10%
              </span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Clients */}
          <div ref={recentClientsReveal.ref} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Clients</h2>
              <Link href="/admin/clients" className="text-sm text-red-600 hover:underline flex items-center gap-1">
                View All <Plus className="w-4 h-4" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Added
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentClients.map((client: any) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{client.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {client.phone}
                        <br />
                        {client.email}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {new Date(client.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Quotations */}
          <div ref={recentQuotationsReveal.ref} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Quotations</h2>
              <Link href="/admin/quotations" className="text-sm text-red-600 hover:underline flex items-center gap-1">
                View All <Plus className="w-4 h-4" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quote #
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentQuotations.map((quotation: any) => (
                    <tr key={quotation.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{quotation.id}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{quotation.client}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        ₹{quotation.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {new Date(quotation.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Invoices & Proforma Invoices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Invoices */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Invoices</h2>
              <Link href="/admin/invoices" className="text-sm text-red-600 hover:underline flex items-center gap-1">
                View All <Plus className="w-4 h-4" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice #
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">INV-2023-028</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">ISRO</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹4,85,000</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date("2023-05-19").toLocaleDateString()}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">INV-2023-027</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">DRDO</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹2,35,000</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date("2023-05-18").toLocaleDateString()}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">INV-2023-026</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Reliance Industries</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹1,95,000</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date("2023-05-17").toLocaleDateString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Proforma Invoices */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Proforma Invoices</h2>
              <Link
                href="/admin/proforma-invoices"
                className="text-sm text-red-600 hover:underline flex items-center gap-1"
              >
                View All <Plus className="w-4 h-4" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PI #
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">PI-2023-028</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">ISRO</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹4,85,000</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date("2023-05-19").toLocaleDateString()}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">PI-2023-027</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">DRDO</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹2,35,000</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date("2023-05-18").toLocaleDateString()}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">PI-2023-026</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Reliance Industries</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹1,95,000</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date("2023-05-17").toLocaleDateString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Inventory Management Sections */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Inventory Management</h2>
            <Link href="/admin/inventory" className="text-sm text-red-600 hover:underline flex items-center gap-1">
              View All <Plus className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Left side - Tabular Categories */}
            <div className="w-full md:w-1/3 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Count
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Link
                        href="/admin/inventory/electrical-terminals"
                        className="hover:text-red-600 transition-colors"
                      >
                        ELECTRICAL TERMINAL LUGS / POWER CONNECTORS
                      </Link>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">247</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        180 In Stock
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Link
                        href="/admin/inventory/overhead-connectors"
                        className="hover:text-red-600 transition-colors"
                      >
                        OVERHEAD DISTRIBUTION CONNECTORS
                      </Link>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">183</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        120 In Stock
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Link href="/admin/inventory/tools" className="hover:text-red-600 transition-colors">
                        MECHANICAL & POWERED TOOLS
                      </Link>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">156</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        98 In Stock
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Link
                        href="/admin/inventory/grounding-connectors"
                        className="hover:text-red-600 transition-colors"
                      >
                        GROUNDING CONNECTORS
                      </Link>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">128</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        85 In Stock
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Link href="/admin/inventory/networking" className="hover:text-red-600 transition-colors">
                        NETWORKING
                      </Link>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">215</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        165 In Stock
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Link
                        href="/admin/inventory/unified-communication"
                        className="hover:text-red-600 transition-colors"
                      >
                        UNIFIED COMMUNICATION
                      </Link>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">92</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        68 In Stock
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Right side - Summary and Stats */}
            <div className="w-full md:w-2/3">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
                <h3 className="text-lg font-semibold mb-4">Inventory Summary</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Total Products</div>
                    <div className="text-2xl font-bold">1,021</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Total Value</div>
                    <div className="text-2xl font-bold">₹1.85 Cr</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Low Stock Items</div>
                    <div className="text-2xl font-bold text-yellow-600">190</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Out of Stock</div>
                    <div className="text-2xl font-bold text-red-600">115</div>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Recent Stock Updates</h4>
                  <Link href="/admin/inventory/activity" className="text-sm text-red-600 hover:underline">
                    View All
                  </Link>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Aluminum Terminal 240mm</div>
                      <div className="text-xs text-gray-500">Added 50 units</div>
                    </div>
                    <div className="text-xs text-gray-500">{new Date().toLocaleDateString()}</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Fiber Optic Cable 100m</div>
                      <div className="text-xs text-gray-500">Removed 5 units</div>
                    </div>
                    <div className="text-xs text-gray-500">{new Date(Date.now() - 86400000).toLocaleDateString()}</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Hydraulic Crimping Tool</div>
                      <div className="text-xs text-gray-500">Updated price</div>
                    </div>
                    <div className="text-xs text-gray-500">{new Date(Date.now() - 172800000).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
