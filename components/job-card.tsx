"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ArrowUpRight, Clock, MapPin, FileText, Clock3, Share2, Linkedin, Mail, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type JobCardProps = {
  id: string
  company: string
  logo?: string
  title: string
  salary: string
  location: string
  workType: string
  workMode: string
  benefits?: string
  postedDays: number
  slug?: string
  contactEmail?: string
  contactPhone?: string
  contactLinkedin?: string
  applyLink?: string
  isAdmin?: boolean
  onEdit?: (id: string) => void
}

export default function JobCard({
  id = "1",
  company = "Caribou",
  logo = "",
  title = "Senior Product Designer Engineer",
  salary = "7LPA + Stock Options",
  location = "Koramangala, Bangalore",
  workType = "Full-time",
  workMode = "Remote",
  benefits = "Relocation Allowance",
  postedDays = 2,
  slug = "",
  contactEmail = "hr@example.com",
  contactPhone = "+91 9876543210",
  contactLinkedin = "linkedin.com/company/example",
  applyLink = "https://example.com/apply",
  isAdmin = false,
  onEdit,
}: Partial<JobCardProps>) {
  const [showContactMenu, setShowContactMenu] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowContactMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleReachHR = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation() // Prevent event bubbling
    setShowContactMenu(!showContactMenu)
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onEdit) {
      onEdit(id)
    }
  }

  const cardContent = (
    <>
      <button className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 hover:scale-110 transition-transform">
        <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <div className="bg-[#f5efe6] w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-md mb-2 sm:mb-3 relative overflow-hidden group-hover:shadow-md transition-shadow">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
        {logo ? (
          <Image src={logo || "/placeholder.svg"} alt={company} width={60} height={60} className="object-contain" />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <svg
              width="30"
              height="18"
              viewBox="0 0 70 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="sm:scale-125"
            >
              <path
                d="M10 20C10 13.5 15 8 20 8C25 8 30 13.5 30 20C30 26.5 25 32 20 32C15 32 10 26.5 10 20Z"
                fill="black"
              />
              <path
                d="M25 15C25 11.5 28 8 32 8C36 8 39 11.5 39 15C39 18.5 36 22 32 22C28 22 25 18.5 25 15Z"
                fill="black"
              />
              <path
                d="M35 25C35 22.5 37 20 40 20C43 20 45 22.5 45 25C45 27.5 43 30 40 30C37 30 35 27.5 35 25Z"
                fill="black"
              />
              <path
                d="M42 15C42 13.5 43 12 45 12C47 12 48 13.5 48 15C48 16.5 47 18 45 18C43 18 42 16.5 42 15Z"
                fill="black"
              />
              <path
                d="M50 20C50 18.5 51 17 53 17C55 17 56 18.5 56 20C56 21.5 55 23 53 23C51 23 50 21.5 50 20Z"
                fill="black"
              />
            </svg>
          </div>
        )}
      </div>

      <h3 className="text-gray-700 text-sm sm:text-base font-normal mb-0.5 sm:mb-1">{company}</h3>
      <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 line-clamp-2">{title}</h2>

      <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
        <div className="flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 border border-gray-200 rounded-full group-hover:border-gray-300 transition-colors">
          <Clock className="w-3 h-3" />
          <span className="text-xs font-medium">{workType}</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 border border-gray-200 rounded-full group-hover:border-gray-300 transition-colors">
          <span className="text-xs font-medium">{workMode}</span>
        </div>
      </div>

      <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
          <span className="line-clamp-1">{salary}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
          <span className="line-clamp-1">{location}</span>
        </div>
        {benefits && (
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
            <span className="line-clamp-1">{benefits}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Clock3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
          <span>{postedDays} Days ago</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 relative">
        <button
          onClick={handleReachHR}
          className="py-1.5 sm:py-2 px-3 sm:px-4 border border-gray-300 rounded-full text-center font-medium text-xs sm:text-sm sm:flex-1 inline-block relative overflow-hidden group/button hover:border-gray-400 transition-colors"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover/button:translate-x-full transition-transform duration-1000 ease-in-out"></div>
          Reach HR
        </button>

        <a
          href={applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="py-1.5 sm:py-2 px-3 sm:px-4 bg-black text-white rounded-full text-center font-medium text-xs sm:text-sm flex items-center justify-center gap-1 sm:flex-1 relative overflow-hidden group/button"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/button:translate-x-full transition-transform duration-1000 ease-in-out"></div>
          Direct Apply
          <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </a>

        {/* Contact Menu Popup */}
        {showContactMenu && (
          <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-50 w-full sm:w-64">
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-2 text-sm hover:bg-gray-50 p-2 rounded-md transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="truncate">{contactEmail}</span>
              </a>
              <a
                href={`tel:${contactPhone}`}
                className="flex items-center gap-2 text-sm hover:bg-gray-50 p-2 rounded-md transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Phone className="w-4 h-4 text-gray-500" />
                <span>{contactPhone}</span>
              </a>
              <a
                href={`https://${contactLinkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:bg-gray-50 p-2 rounded-md transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Linkedin className="w-4 h-4 text-gray-500" />
                <span className="truncate">{contactLinkedin}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  )

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-md border border-gray-100 relative group overflow-hidden card-hover-effect"
      style={{ transition: "all 0.3s ease" }}
    >
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-in-out pointer-events-none"></div>

      {slug ? (
        <Link href={`/jobs/${slug}`} className="block">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </div>
  )
}
