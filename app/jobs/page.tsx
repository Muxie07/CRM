"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import JobCard from "@/components/job-card"
import { ArrowDown, Search } from "lucide-react"
import { jobsData } from "@/data/jobs"
import { searchJobs, parseLocationFromPath, matchJobsWithPreferences, parseSearchParams } from "@/utils/search"
import type { Job } from "@/types/job"
import Link from "next/link"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function JobsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [jobs, setJobs] = useState<Job[]>(jobsData)
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>(jobsData)
  const [searchQuery, setSearchQuery] = useState("")
  const [showingAll, setShowingAll] = useState(false)
  const [initialJobsCount, setInitialJobsCount] = useState(6)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Scroll reveal for the header section
  const headerReveal = useScrollReveal({ delay: 0 })

  // Scroll reveal for the filters section
  const filtersReveal = useScrollReveal({ delay: 100 })

  // Refs for job cards to apply scroll reveal
  const jobCardRefs = useRef<(HTMLDivElement | null)[]>([])

  // Initialize scroll reveal for all job cards upfront
  useEffect(() => {
    jobCardRefs.current = jobCardRefs.current.slice(0, displayedJobs.length) // Ensure the array size matches the number of displayed jobs

    displayedJobs.forEach((_, index) => {
      jobCardRefs.current[index] = jobCardRefs.current[index] || null // Initialize with null if not already present
    })
  }, [displayedJobs])

  useEffect(() => {
    // Apply scroll reveal to job cards
    jobCardRefs.current.forEach((ref, index) => {
      if (ref) {
        const delay = 100 + (index % 3) * 100 + Math.floor(index / 3) * 150
        useScrollReveal({ delay, ref })
      }
    })
  }, [displayedJobs])

  // Handle search params and path-based location
  useEffect(() => {
    // Get search query from URL
    const queryParam = searchParams.get("q")

    // Check if we need to parse location from path
    const path = window.location.pathname
    const locationFromPath = parseLocationFromPath(path)

    // Check for preference-based search (magic link)
    const hasPreferenceParams =
      searchParams.has("location") ||
      searchParams.has("role") ||
      searchParams.has("workType") ||
      searchParams.has("workMode") ||
      searchParams.has("salary") ||
      searchParams.has("yoe")

    // Build active filters list
    const newActiveFilters: string[] = []
    if (locationFromPath) newActiveFilters.push(`Location: ${locationFromPath}`)
    if (searchParams.get("location")) newActiveFilters.push(`Location: ${searchParams.get("location")}`)
    if (searchParams.get("role")) newActiveFilters.push(`Role: ${searchParams.get("role")}`)
    if (searchParams.get("workType")) newActiveFilters.push(`Type: ${searchParams.get("workType")}`)
    if (searchParams.get("workMode")) newActiveFilters.push(`Mode: ${searchParams.get("workMode")}`)
    if (searchParams.get("salary")) newActiveFilters.push(`Salary: ${searchParams.get("salary")}`)
    if (searchParams.get("yoe")) newActiveFilters.push(`Experience: ${searchParams.get("yoe")} years`)
    setActiveFilters(newActiveFilters)

    if (hasPreferenceParams) {
      // Parse preferences from URL parameters
      const preferences = parseSearchParams(searchParams)

      // Match jobs with preferences
      const matchedJobs = matchJobsWithPreferences(jobsData, preferences)
      setJobs(matchedJobs)
      setDisplayedJobs(matchedJobs.slice(0, initialJobsCount))

      // Set search query for display
      const displayQuery = Object.entries(preferences)
        .filter(([key, value]) => value && key !== "resume" && key !== "skills")
        .map(([key, value]) => {
          if (key === "yearsOfExperience") return `${value} years`
          return value
        })
        .join(", ")

      setSearchQuery(displayQuery)
    } else if (queryParam || locationFromPath) {
      // Build search query from params
      let fullQuery = ""
      if (queryParam) fullQuery += queryParam + " "
      if (locationFromPath) fullQuery += locationFromPath + " "

      setSearchQuery(fullQuery.trim())

      // Perform search
      const searchResults = searchJobs(jobsData, fullQuery.trim())
      setJobs(searchResults)
      setDisplayedJobs(searchResults.slice(0, initialJobsCount))
    } else {
      // No search parameters, show all jobs
      setDisplayedJobs(jobsData.slice(0, initialJobsCount))
      setJobs(jobsData)
      setSearchQuery("")
    }
  }, [searchParams, initialJobsCount])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Update URL with search query
    const params = new URLSearchParams(searchParams.toString())
    if (searchQuery) {
      params.set("q", searchQuery)
    } else {
      params.delete("q")
    }

    // Clear other filter params when doing a text search
    params.delete("location")
    params.delete("role")
    params.delete("workType")
    params.delete("workMode")
    params.delete("salary")
    params.delete("yoe")

    router.push(`/jobs?${params.toString()}`)
  }

  const handleLoadMore = () => {
    setDisplayedJobs(jobs)
    setShowingAll(true)
  }

  const clearFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (filter.startsWith("Location:")) params.delete("location")
    if (filter.startsWith("Role:")) params.delete("role")
    if (filter.startsWith("Type:")) params.delete("workType")
    if (filter.startsWith("Mode:")) params.delete("workMode")
    if (filter.startsWith("Salary:")) params.delete("salary")
    if (filter.startsWith("Experience:")) params.delete("yoe")

    router.push(`/jobs?${params.toString()}`)
  }

  const clearAllFilters = () => {
    router.push("/jobs")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-grow px-4 py-8 sm:py-12 max-w-7xl mx-auto w-full">
        <div
          ref={headerReveal.ref}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Featured Jobs for You</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Personalized job matches based on your profile and preferences
            </p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <form onSubmit={handleSearch} className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search jobs, locations, companies..."
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </form>

            <Link
              href="/jobs/filter"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md btn-hover-effect whitespace-nowrap"
            >
              Filter
              <ArrowDown className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div ref={filtersReveal.ref} className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Active filters:</p>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => clearFilter(filter)}
                  className="text-xs px-3 py-1 bg-gray-100 rounded-full flex items-center gap-1"
                >
                  {filter}
                  <span className="text-gray-500">×</span>
                </button>
              ))}
              <button
                onClick={clearAllFilters}
                className="text-xs px-3 py-1 bg-black text-white rounded-full flex items-center gap-1"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}

        {displayedJobs.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-bold mb-2">No jobs found</h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or check back later for new opportunities.
            </p>
            <button onClick={clearAllFilters} className="px-4 py-2 bg-black text-white rounded-full">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {displayedJobs.map((job, index) => {
              return (
                <div
                  key={job.id}
                  ref={(el) => {
                    jobCardRefs.current[index] = el
                  }}
                >
                  <JobCard {...job} />
                </div>
              )
            })}
          </div>
        )}

        {!showingAll && jobs.length > displayedJobs.length && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              className="bg-black text-white px-6 py-3 rounded-full inline-flex items-center justify-center gap-2 btn-hover-effect relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1200 ease-in-out pointer-events-none"></div>
              Load More Jobs
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
