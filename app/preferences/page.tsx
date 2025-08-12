"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/providers"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowLeft, Copy, Check } from "lucide-react"
import Link from "next/link"
import { generateMagicLink } from "@/utils/search"
import type { UserPreferences } from "@/types/user"

export default function UserPreferencesPage() {
  const { user, isLoading, updateUserPreferences } = useAuth()
  const router = useRouter()
  const [preferences, setPreferences] = useState<UserPreferences>({
    location: "",
    role: "",
    workType: "",
    workMode: "",
    expectedSalary: "",
    yearsOfExperience: 0,
    resume: null,
    skills: [],
  })
  const [skill, setSkill] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [copied, setCopied] = useState(false)
  const [magicLink, setMagicLink] = useState("")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else if (user && user.preferences) {
      setPreferences(user.preferences)
      setMagicLink(window.location.origin + generateMagicLink(user.preferences))
    }
  }, [user, isLoading, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPreferences((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPreferences((prev) => ({ ...prev, resume: e.target.files![0] }))
    }
  }

  const handleAddSkill = () => {
    if (skill.trim() && !preferences.skills?.includes(skill.trim())) {
      setPreferences((prev) => ({
        ...prev,
        skills: [...(prev.skills || []), skill.trim()],
      }))
      setSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setPreferences((prev) => ({
      ...prev,
      skills: prev.skills?.filter((s) => s !== skillToRemove) || [],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveSuccess(false)

    // Update user preferences
    updateUserPreferences(preferences)

    // Generate magic link
    const link = generateMagicLink(preferences)
    setMagicLink(window.location.origin + link)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    }, 1000)
  }

  const copyMagicLink = () => {
    navigator.clipboard.writeText(magicLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow px-4 py-8 sm:py-12 max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-gray-600 hover:text-black">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Your Job Preferences</h1>

        {saveSuccess && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
            Your preferences have been saved successfully!
          </div>
        )}

        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={preferences.location}
                  onChange={handleChange}
                  placeholder="e.g. Bangalore, Mumbai, Delhi"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Desired Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={preferences.role}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer, UX Designer"
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
                  value={preferences.workType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="">Select Work Type</option>
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
                  value={preferences.workMode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="">Select Work Mode</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Onsite">Onsite</option>
                </select>
              </div>

              <div>
                <label htmlFor="expectedSalary" className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Salary (LPA)
                </label>
                <input
                  type="text"
                  id="expectedSalary"
                  name="expectedSalary"
                  value={preferences.expectedSalary}
                  onChange={handleChange}
                  placeholder="e.g. 15LPA"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <select
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  value={preferences.yearsOfExperience}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value={0}>Select Experience</option>
                  <option value={1}>0-1 years</option>
                  <option value={2}>1-3 years</option>
                  <option value={4}>3-5 years</option>
                  <option value={6}>5-7 years</option>
                  <option value={8}>7+ years</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  placeholder="Add a skill"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddSkill()
                    }
                  }}
                />
                <button type="button" onClick={handleAddSkill} className="px-4 py-2 bg-gray-100 rounded-md">
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {preferences.skills?.map((s) => (
                  <div key={s} className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
                    <span>{s}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(s)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resume/CV</label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <div className="mb-2 flex justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14 3V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H19"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H14L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21Z"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-500 mb-1">Resume or CV</p>
                <p className="text-sm text-gray-500">
                  <span className="text-black font-medium">Click to Upload</span> or drag and drop
                </p>
                <input type="file" id="resume" name="resume" onChange={handleFileChange} className="hidden" />
                <button
                  type="button"
                  onClick={() => document.getElementById("resume")?.click()}
                  className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Select File
                </button>
                {preferences.resume && (
                  <p className="mt-2 text-sm text-gray-500">Selected: {preferences.resume.name}</p>
                )}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-3 bg-black text-white rounded-full font-medium disabled:opacity-70 btn-hover-effect relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1200 ease-in-out pointer-events-none"></div>
                {isSaving ? "Saving..." : "Save Preferences"}
              </button>
            </div>
          </form>
        </div>

        {magicLink && (
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h2 className="text-xl font-bold mb-4">Your Magic Link</h2>
            <p className="text-sm text-gray-600 mb-4">
              Share this link with others to show them job listings based on your preferences.
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-50 p-3 rounded-md text-sm overflow-x-auto">{magicLink}</div>
              <button
                onClick={copyMagicLink}
                className="p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                title="Copy to clipboard"
              >
                {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
