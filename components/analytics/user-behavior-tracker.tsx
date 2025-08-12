"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

interface UserBehaviorTrackerProps {
  userId?: string
}

export function UserBehaviorTracker({ userId }: UserBehaviorTrackerProps) {
  const pathname = usePathname()
  const sessionId = useRef(Math.random().toString(36).substring(7))
  const startTime = useRef(Date.now())

  useEffect(() => {
    // Track page view
    trackEvent("page_view", {
      page_path: pathname,
      timestamp: new Date().toISOString(),
    })

    // Track time spent on page
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000)
      trackEvent("page_exit", {
        page_path: pathname,
        time_spent: timeSpent,
      })
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [pathname])

  const trackEvent = async (actionType: string, data: any) => {
    try {
      const analyticsData = {
        user_id: userId || "anonymous",
        session_id: sessionId.current,
        page_path: pathname,
        action_type: actionType,
        element_clicked: data.element_clicked || null,
        time_spent: data.time_spent || null,
        device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
        browser: navigator.userAgent.split(" ").pop() || "unknown",
        created_at: new Date().toISOString(),
      }

      // In a real implementation, this would send to your analytics endpoint
      console.log("Analytics Event:", analyticsData)

      // Store in localStorage for demo purposes
      const existingData = JSON.parse(localStorage.getItem("userAnalytics") || "[]")
      existingData.push(analyticsData)
      localStorage.setItem("userAnalytics", JSON.stringify(existingData.slice(-100))) // Keep last 100 events
    } catch (error) {
      console.error("Analytics tracking error:", error)
    }
  }

  // Track clicks on interactive elements
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (target.tagName === "BUTTON" || target.tagName === "A" || target.getAttribute("role") === "button") {
        trackEvent("click", {
          element_clicked: target.textContent || target.getAttribute("aria-label") || "unknown",
        })
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return null // This component doesn't render anything
}
