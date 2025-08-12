export interface UserPreferences {
  location: string
  role: string
  workType: string
  workMode: string
  expectedSalary: string
  yearsOfExperience: number
  resume: File | null
  skills: string[]
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  isAdmin: boolean
  preferences?: UserPreferences
  createdAt: string
  updatedAt: string
}
