"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type User = {
  email: string
  name?: string
  isAdmin: boolean
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isLoading: true,
})

export const useAuth = () => useContext(AuthContext)

export function Providers({
  children,
  defaultSidebarOpen = true,
}: {
  children: React.ReactNode
  defaultSidebarOpen?: boolean
}) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("rnmotorhub_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Mock authentication
    if (email === "admin@diacengineering.com" && password === "admin123") {
      const userData = { email, name: "Admin User", isAdmin: true }
      setUser(userData)
      localStorage.setItem("rnmotorhub_user", JSON.stringify(userData))
      return true
    } else if (email === "staff@diacengineering.com" && password === "staff123") {
      const userData = { email, name: "Staff User", isAdmin: false }
      setUser(userData)
      localStorage.setItem("rnmotorhub_user", JSON.stringify(userData))
      return true
    } else if (email && password.length >= 6) {
      // Regular user login
      const userData = {
        email,
        name: email.split("@")[0],
        isAdmin: false,
      }
      setUser(userData)
      localStorage.setItem("rnmotorhub_user", JSON.stringify(userData))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("rnmotorhub_user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}
