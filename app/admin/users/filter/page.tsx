"use client"

import type React from "react"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function FilterUsersPage() {
  const router = useRouter()
  const [filters, setFilters] = useState({
    role: "",
    status: "",
    dateJoined: "",
    lastLogin: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Build query string from filters
    const queryParams = new URLSearchParams()

    if (filters.role) queryParams.append("role", filters.role)
    if (filters.status) queryParams.append("status", filters.status)
    if (filters.dateJoined) queryParams.append("dateJoined", filters.dateJoined)
    if (filters.lastLogin) queryParams.append("lastLogin", filters.lastLogin)

    // Redirect to users page with filters
    router.push(`/admin/users?${queryParams.toString()}`)
  }

  const handleReset = () => {
    setFilters({
      role: "",
      status: "",
      dateJoined: "",
      lastLogin: "",
    })
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <Link href="/admin/users" className="inline-flex items-center text-gray-600 hover:text-black">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Users
          </Link>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Filter Users</h1>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={filters.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="">All Roles</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={filters.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label htmlFor="dateJoined" className="block text-sm font-medium text-gray-700 mb-1">
                  Date Joined
                </label>
                <input
                  type="date"
                  id="dateJoined"
                  name="dateJoined"
                  value={filters.dateJoined}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label htmlFor="lastLogin" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Login
                </label>
                <input
                  type="date"
                  id="lastLogin"
                  name="lastLogin"
                  value={filters.lastLogin}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Reset
              </button>
              <button type="submit" className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                Apply Filters
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
