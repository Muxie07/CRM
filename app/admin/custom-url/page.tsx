"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/providers"
import AdminLayout from "@/components/admin-layout"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CustomURLPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [jobRole, setJobRole] = useState("")
  const [location, setLocation] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSuccess(true)

      // Reset form after success
      setTimeout(() => {
        setSuccess(false)
        setJobRole("")
        setLocation("")
      }, 3000)
    }, 1000)
  }

  if (isLoading || !user || !user.isAdmin) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/admin" className="inline-flex items-center text-gray-600 hover:text-black">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-8">Create Custom URLs</h1>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          {success && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">Custom URL created successfully!</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="jobRole" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Role
                </label>
                <input
                  type="text"
                  id="jobRole"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  placeholder="Senior Software Engineer"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Banglore"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-black text-white rounded-full font-medium disabled:opacity-70"
                >
                  {isSubmitting ? "Creating..." : "Create URL"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
