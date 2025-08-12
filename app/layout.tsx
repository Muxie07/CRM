import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { cookies } from "next/headers"
import "./globals.css"
import "./print.css"
import { Providers } from "@/components/providers"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "DIAC ENGINEERING - Engineering Services",
  description:
    "Customer Relationship Management system for DIAC ENGINEERING, an engineering services provider in Chennai.",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Read sidebar state from cookie
  const cookieStore = cookies()
  const sidebarState = cookieStore.get("sidebar_state")
  const defaultOpen = sidebarState ? sidebarState.value === "true" : true

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers defaultSidebarOpen={defaultOpen}>{children}</Providers>
      </body>
    </html>
  )
}
