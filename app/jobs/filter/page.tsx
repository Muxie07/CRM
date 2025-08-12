"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function JobFilterPage() {
  const router = useRouter()
  const [filters, setFilters] = useState({
    location: "",
    role: "",
    workType: "",
    workMode: "",
    salary: "",
    yearsOfExperience: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Build query params
    const params = new URLSearchParams()
    if (filters.location) params.append("location", filters.location)
    if (filters.role) params.append("role", filters.role)
    if (filters.workType) params.append("workType", filters.workType)
    if (filters.workMode) params.append("workMode", filters.workMode)
    if (filters.salary) params.append("salary", filters.salary)
    if (filters.yearsOfExperience) params.append("yoe", filters.yearsOfExperience)

    router.push(`/jobs?${params.toString()}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow px-4 py-8 sm:py-12 max-w-3xl mx-auto w-full">
        <div className="mb-8">
          <Link href="/jobs" className="inline-flex items-center text-gray-600 hover:text-black">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h1 className="text-2xl font-bold mb-6">Filter Jobs</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={filters.location}
                  onChange={handleChange}
                  placeholder="e.g. Bangalore, Mumbai, Delhi"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={filters.role}
                  onChange={handleChange}
                  placeholder="e.g. Developer, Designer, Manager"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label htmlFor="workType" className="block text-sm font-medium text-gray-700 mb-1">
                  Work Type
                </label>
                <select
                  id="workType"
                  name="workType"
                  value={filters.workType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="">Any</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>

              <div>
                <label htmlFor="workMode" className="block text-sm font-medium text-gray-700 mb-1">
                  Work Mode
                </label>
                <select
                  id="workMode"
                  name="workMode"
                  value={filters.workMode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="">Any</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Onsite">Onsite</option>
                </select>
              </div>

              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Salary (LPA)
                </label>
                <select
                  id="salary"
                  name="salary"
                  value={filters.salary}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="">Any</option>
                  <option value="5LPA">5+ LPA</option>
                  <option value="10LPA">10+ LPA</option>
                  <option value="15LPA">15+ LPA</option>
                  <option value="20LPA">20+ LPA</option>
                  <option value="25LPA">25+ LPA</option>
                  <option value="30LPA">30+ LPA</option>
                </select>
              </div>

              <div>
                <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <select
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  value={filters.yearsOfExperience}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="">Any</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-7">5-7 years</option>
                  <option value="7+">7+ years</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-full font-medium btn-hover-effect relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1200 ease-in-out pointer-events-none"></div>
                Apply Filters
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
