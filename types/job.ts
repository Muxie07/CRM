export interface Job {
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
  description?: string
  requirements?: string[]
  responsibilities?: string[]
  yearsOfExperience?: number
}
