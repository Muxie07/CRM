"use client"

import type React from "react"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Search, Download, Plus, Edit, Trash2, MoreHorizontal, Filter } from "lucide-react"
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
    applicants: 7,
  },
]

export default function AdminJobsPage() {
  const router = useRouter()
  const [jobs, setJobs] = useState(jobsData)
  const [searchQuery, setSearchQuery] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [jobToDelete, setJobToDelete] = useState<string | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Filter jobs based on search query
    const filteredJobs = jobsData.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setJobs(filteredJobs)
  }

  const handleExport = () => {
    // Create CSV content
    const headers = ["ID", "Title", "Department", "Location", "Type", "Status", "Posted Date", "Applicants"]
    const csvContent = [
      headers.join(","),
      ...jobs.map((job) =>
        [job.id, job.title, job.department, job.location, job.type, job.status, job.postedDate, job.applicants].join(
          ",",
        ),
      ),
    ].join("\n")

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "jobs.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDeleteClick = (jobId: string) => {
    setJobToDelete(jobId)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = () => {
    if (jobToDelete) {
      setJobs(jobs.filter((job) => job.id !== jobToDelete))
      setShowDeleteModal(false)
      setJobToDelete(null)
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Job Listings</h1>
          <Link
            href="/admin/jobs/new"
            className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800"
          >
            <Plus className="w-4 h-4" />
            Add Job
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
            <form onSubmit={handleSearch} className="relative flex-1">
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </form>
            <div className="flex gap-2">
              <button
                onClick={() => router.push("/admin/jobs/filter")}
                className="px-4 py-2 border rounded-md flex items-center gap-2 hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 border rounded-md flex items-center gap-2 hover:bg-gray-50"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posted Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicants
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{job.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{job.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{job.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          job.status === "Open" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{job.postedDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{job.applicants}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => router.push(`/admin/jobs/${job.id}`)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteClick(job.id)} className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{jobs.length}</span> of{" "}
              <span className="font-medium">{jobsData.length}</span> jobs
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded-md text-sm disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border rounded-md text-sm bg-black text-white">1</button>
              <button className="px-3 py-1 border rounded-md text-sm">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this job listing? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
