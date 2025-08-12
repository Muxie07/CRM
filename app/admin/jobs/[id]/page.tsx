"use client"

import type React from "react"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin-layout"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock data for jobs
const jobsData = [
  {
    id: "1",
    title: "Service Technician",
    department: "Service",
    location: "Villivakkam, Chennai",
    type: "Full-time",
    status: "Open",
    postedDate: "2023-10-15",
    applicationDeadline: "2023-11-15",
    description:
      "We are looking for a skilled Service Technician to join our team at RN Motor Hub. The ideal candidate will have experience with TVS motorcycles and scooters, and be able to diagnose and repair various mechanical and electrical issues.",
    requirements:
      "- Minimum 2 years experience as a two-wheeler mechanic\n- Knowledge of TVS vehicles preferred\n- Ability to diagnose and repair mechanical and electrical issues\n- Good communication skills\n- Valid driving license",
    salary: "₹15,000 - ₹20,000 per month",
    applicants: 12,
  },
  {
    id: "2",
    title: "Sales Executive",
    department: "Sales",
    location: "Villivakkam, Chennai",
    type: "Full-time",
    status: "Open",
    postedDate: "2023-10-10",
    applicationDeadline: "2023-11-10",
    description:
      "We are seeking a motivated Sales Executive to join our team at RN Motor Hub. The successful candidate will be responsible for selling TVS motorcycles and scooters, meeting sales targets, and providing excellent customer service.",
    requirements:
      "- Minimum 1 year experience in sales, preferably in automotive industry\n- Excellent communication and negotiation skills\n- Target-oriented mindset\n- Knowledge of two-wheelers preferred\n- Computer literacy",
    salary: "₹12,000 - ₹18,000 per month + incentives",
    applicants: 8,
  },
  {
    id: "3",
    title: "Parts Manager",
    department: "Parts",
    location: "Villivakkam, Chennai",
    type: "Full-time",
    status: "Closed",
    postedDate: "2023-09-20",
    applicationDeadline: "2023-10-20",
    description:
      "We are looking for a Parts Manager to oversee our parts inventory and ensure efficient operations. The ideal candidate will have experience in inventory management and knowledge of two-wheeler parts.",
    requirements:
      "- Minimum 3 years experience in parts management, preferably in automotive industry\n- Knowledge of inventory management systems\n- Familiarity with TVS parts preferred\n- Strong organizational skills\n- Computer literacy",
    salary: "₹20,000 - ₹25,000 per month",
    applicants: 5,
  },
  {
    id: "4",
    title: "Front Desk Executive",
    department: "Administration",
    location: "Villivakkam, Chennai",
    type: "Full-time",
    status: "Open",
    postedDate: "2023-10-05",
    applicationDeadline: "2023-11-05",
    description:
      "We are seeking a Front Desk Executive to be the first point of contact for our customers. The successful candidate will handle customer inquiries, schedule service appointments, and provide administrative support.",
    requirements:
      "- Minimum 1 year experience in customer service or reception\n- Excellent communication skills\n- Proficiency in MS Office\n- Ability to multitask\n- Pleasant personality",
    salary: "₹12,000 - ₹15,000 per month",
    applicants: 15,
  },
  {
    id: "5",
    title: "Accountant",
    department: "Finance",
    location: "Villivakkam, Chennai",
    type: "Full-time",
    status: "Open",
    postedDate: "2023-10-12",
    applicationDeadline: "2023-11-12",
    description:
      "We are looking for an Accountant to handle our financial operations. The ideal candidate will be responsible for maintaining financial records, processing payments, and preparing financial reports.",
    requirements:
      "- B.Com or M.Com degree\n- Minimum 2 years experience in accounting\n- Knowledge of Tally or other accounting software\n- Familiarity with GST and tax regulations\n- Attention to detail",
    salary: "₹18,000 - ₹25,000 per month",
    applicants: 7,
  },
]

export default function EditJobPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params

  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
    status: "",
    description: "",
    requirements: "",
    salary: "",
    applicationDeadline: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Find job by ID
    const job = jobsData.find((job) => job.id === id)

    if (job) {
      setFormData({
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        status: job.status,
        description: job.description,
        requirements: job.requirements,
        salary: job.salary,
        applicationDeadline: job.applicationDeadline,
      })
    } else {
      // Job not found, redirect to jobs list
      router.push("/admin/jobs")
    }

    setIsLoading(false)
  }, [id, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Job title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Job description is required"
    }

    if (!formData.requirements.trim()) {
      newErrors.requirements = "Job requirements are required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        router.push("/admin/jobs")
      }, 1000)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-6 flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <Link href="/admin/jobs" className="inline-flex items-center text-gray-600 hover:text-black">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Link>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Job Listing</h1>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="Service">Service</option>
                  <option value="Sales">Sales</option>
                  <option value="Parts">Parts</option>
                  <option value="Administration">Administration</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Temporary">Temporary</option>
                </select>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                  Salary Range
                </label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700 mb-1">
                  Application Deadline
                </label>
                <input
                  type="date"
                  id="applicationDeadline"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                  Requirements
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  rows={5}
                  value={formData.requirements}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.requirements ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.requirements && <p className="mt-1 text-sm text-red-600">{errors.requirements}</p>}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Link href="/admin/jobs" className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
