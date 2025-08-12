"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SmartSearch } from "./ai-features/smart-search"
import { VoiceAssistant } from "./voice/voice-assistant"
import { ThemeToggle } from "./ui/theme-toggle"
import { FeedbackWidget } from "./feedback/feedback-widget"
import { UserBehaviorTracker } from "./analytics/user-behavior-tracker"
import { TrendingUp, Users, DollarSign, Package, Bell, Settings, Zap, Brain, Target, Activity } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function EnhancedDashboard() {
  const [notifications, setNotifications] = useState(3)
  const [aiInsights, setAiInsights] = useState([])
  const [quickActions, setQuickActions] = useState([])

  // Scroll reveal animations
  const headerReveal = useScrollReveal()
  const statsReveal = useScrollReveal({ delay: 100 })
  const insightsReveal = useScrollReveal({ delay: 200 })

  useEffect(() => {
    // Simulate AI-generated insights
    setAiInsights([
      {
        type: "opportunity",
        title: "High-value client opportunity",
        description: "Tata Motors hasn't placed an order in 30 days. Consider reaching out.",
        confidence: 85,
        action: "Contact client",
      },
      {
        type: "warning",
        title: "Inventory alert",
        description: "Aluminum terminals are running low. Reorder recommended.",
        confidence: 92,
        action: "Reorder stock",
      },
      {
        type: "insight",
        title: "Sales pattern detected",
        description: "Network equipment sales spike every quarter-end.",
        confidence: 78,
        action: "Plan inventory",
      },
    ])

    setQuickActions([
      { label: "Create Invoice", action: "create:invoice", icon: DollarSign },
      { label: "Add Client", action: "create:client", icon: Users },
      { label: "Check Inventory", action: "navigate:inventory", icon: Package },
      { label: "View Reports", action: "navigate:reports", icon: TrendingUp },
    ])
  }, [])

  const handleSearch = (query: string) => {
    console.log("Search query:", query)
    // Implement search logic
  }

  const handleVoiceCommand = (command: string) => {
    console.log("Voice command:", command)
    // Implement voice command logic
  }

  const handleQuickAction = (action: string) => {
    console.log("Quick action:", action)
    // Implement quick action logic
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <UserBehaviorTracker userId="current_user" />

      {/* Enhanced Header */}
      <header ref={headerReveal.ref} className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DIAC CRM
              </h1>
              <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-green-200 text-green-800">
                <Brain className="w-3 h-3 mr-1" />
                AI-Powered
              </Badge>
            </div>

            <div className="flex-1 max-w-md mx-8">
              <SmartSearch onSearch={handleSearch} placeholder="Search clients, products, invoices..." />
            </div>

            <div className="flex items-center gap-3">
              <VoiceAssistant onCommand={handleVoiceCommand} />
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500">
                    {notifications}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Good morning, Rajesh! 👋</h2>
          <p className="text-gray-600 dark:text-gray-300">Here's what's happening with your business today.</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex-col gap-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20"
                onClick={() => handleQuickAction(action.action)}
              >
                <action.icon className="w-6 h-6" />
                <span className="text-sm">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div ref={insightsReveal.ref} className="mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-500" />
            AI Insights
          </h3>
          <div className="grid gap-4">
            {aiInsights.map((insight, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{insight.title}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {insight.confidence}% confidence
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{insight.description}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      {insight.action}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div ref={statsReveal.ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Revenue</p>
                  <h3 className="text-3xl font-bold">₹1.85 Cr</h3>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>+12% from last month</span>
                  </div>
                </div>
                <div className="bg-white/20 p-3 rounded-lg">
                  <DollarSign className="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Active Clients</p>
                  <h3 className="text-3xl font-bold">245</h3>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>+8% from last month</span>
                  </div>
                </div>
                <div className="bg-white/20 p-3 rounded-lg">
                  <Users className="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Products</p>
                  <h3 className="text-3xl font-bold">1,021</h3>
                  <div className="flex items-center mt-2 text-sm">
                    <Activity className="w-4 h-4 mr-1" />
                    <span>716 in stock</span>
                  </div>
                </div>
                <div className="bg-white/20 p-3 rounded-lg">
                  <Package className="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Conversion Rate</p>
                  <h3 className="text-3xl font-bold">68%</h3>
                  <div className="flex items-center mt-2 text-sm">
                    <Target className="w-4 h-4 mr-1" />
                    <span>Above industry avg</span>
                  </div>
                </div>
                <div className="bg-white/20 p-3 rounded-lg">
                  <Target className="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your CRM</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "New client added", client: "ISRO", time: "2 minutes ago", type: "success" },
                  { action: "Invoice generated", client: "Tata Motors", time: "15 minutes ago", type: "info" },
                  { action: "Payment received", client: "DRDO", time: "1 hour ago", type: "success" },
                  { action: "Quote requested", client: "Reliance", time: "2 hours ago", type: "warning" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "success"
                          ? "bg-green-500"
                          : activity.type === "info"
                            ? "bg-blue-500"
                            : "bg-yellow-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-500">
                        {activity.client} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { metric: "Sales Target", value: "78%", progress: 78, color: "bg-blue-500" },
                  { metric: "Client Satisfaction", value: "94%", progress: 94, color: "bg-green-500" },
                  { metric: "Response Time", value: "2.3h", progress: 85, color: "bg-purple-500" },
                  { metric: "Quote Conversion", value: "68%", progress: 68, color: "bg-orange-500" },
                ].map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{metric.metric}</span>
                      <span className="text-gray-600">{metric.value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${metric.color}`} style={{ width: `${metric.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <FeedbackWidget featureArea="dashboard" />
    </div>
  )
}
