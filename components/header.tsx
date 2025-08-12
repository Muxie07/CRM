"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Menu, X, User, Bell } from "lucide-react"
import { useAuth } from "./providers"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const pathname = usePathname()

  return (
    <header className="w-full py-4 px-4 sm:py-6 flex justify-between items-center border-b border-gray-100 bg-white z-50 relative">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <img src="/diac-logo.jpg" alt="DIAC ENGINEERING Logo" className="h-10 mr-2" />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        <Link
          href="/login"
          className={`text-sm font-medium hover:text-gray-600 ${pathname === "/clients" ? "text-[#8B0000] font-semibold" : ""}`}
        >
          Clients
        </Link>
        <Link
          href="/login"
          className={`text-sm font-medium hover:text-gray-600 ${pathname === "/vendors" ? "text-[#8B0000] font-semibold" : ""}`}
        >
          Vendors
        </Link>
        <Link
          href="/login"
          className={`text-sm font-medium hover:text-gray-600 ${pathname === "/inventory" ? "text-[#8B0000] font-semibold" : ""}`}
        >
          Inventory
        </Link>
        <Link
          href="/login"
          className={`text-sm font-medium hover:text-gray-600 ${pathname === "/sales" ? "text-[#8B0000] font-semibold" : ""}`}
        >
          Sales
        </Link>
        <Link
          href="/login"
          className={`text-sm font-medium hover:text-gray-600 ${pathname === "/sales-documents" ? "text-[#8B0000] font-semibold" : ""}`}
        >
          Sales Documents
        </Link>
        <Link
          href="/login"
          className={`text-sm font-medium hover:text-gray-600 ${pathname === "/reports" ? "text-[#8B0000] font-semibold" : ""}`}
        >
          Reports
        </Link>
        {user ? (
          <>
            {user.isAdmin ? (
              <Link href="/login" className="text-sm font-medium hover:text-gray-600">
                Admin
              </Link>
            ) : null}
            <button onClick={logout} className="text-sm font-medium hover:text-gray-600">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="text-sm font-medium hover:text-gray-600">
            Login
          </Link>
        )}
      </nav>

      <div className="hidden md:flex items-center gap-4">
        <button className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-[#8B0000] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        {user ? (
          <Link
            href="/login"
            className="bg-black text-white px-3 py-1.5 sm:px-5 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 text-sm sm:text-base font-medium btn-hover-effect relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1200 ease-in-out pointer-events-none"></div>
            <User className="w-3 h-3 sm:w-4 sm:h-4" />
            {user.name || "My Profile"}
          </Link>
        ) : (
          <Link
            href="/login"
            className="bg-black text-white px-3 py-1.5 sm:px-5 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 text-sm sm:text-base font-medium btn-hover-effect relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1200 ease-in-out pointer-events-none"></div>
            Login
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center md:hidden">
        {user ? (
          <Link
            href="/login"
            className="bg-black text-white px-3 py-1.5 rounded-full flex items-center gap-1 text-sm font-medium mr-2 btn-hover-effect relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1200 ease-in-out pointer-events-none"></div>
            <User className="w-3 h-3" />
            Profile
          </Link>
        ) : (
          <Link
            href="/login"
            className="bg-black text-white px-3 py-1.5 rounded-full flex items-center gap-1 text-sm font-medium mr-2 btn-hover-effect relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1200 ease-in-out pointer-events-none"></div>
            Login
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white z-50 p-4 border-b border-gray-100 md:hidden shadow-md">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/login"
              className={`text-sm font-medium hover:text-gray-600 ${pathname === "/clients" ? "text-[#8B0000] font-semibold" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Clients
            </Link>
            <Link
              href="/login"
              className={`text-sm font-medium hover:text-gray-600 ${pathname === "/vendors" ? "text-[#8B0000] font-semibold" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Vendors
            </Link>
            <Link
              href="/login"
              className={`text-sm font-medium hover:text-gray-600 ${pathname === "/inventory" ? "text-[#8B0000] font-semibold" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Inventory
            </Link>
            <Link
              href="/login"
              className={`text-sm font-medium hover:text-gray-600 ${pathname === "/sales" ? "text-[#8B0000] font-semibold" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Sales
            </Link>
            <Link
              href="/login"
              className={`text-sm font-medium hover:text-gray-600 ${pathname === "/sales-documents" ? "text-[#8B0000] font-semibold" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Sales Documents
            </Link>
            <Link
              href="/login"
              className={`text-sm font-medium hover:text-gray-600 ${pathname === "/reports" ? "text-[#8B0000] font-semibold" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Reports
            </Link>
            {user ? (
              <>
                {user.isAdmin ? (
                  <Link
                    href="/login"
                    className="text-sm font-medium hover:text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                ) : null}
                <button
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                  className="text-sm font-medium hover:text-gray-600 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
