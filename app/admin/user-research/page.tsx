"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin-layout"
import { UserPersonaCard } from "@/components/user-research/user-persona-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, MessageSquare, Eye, Clock, Star, AlertTriangle, CheckCircle, Download } from "lucide-react"

export default function UserResearchPage() {
  const [personas, setPersonas] = useState([])
  const [analytics, setAnalytics] = useState([])
  const [feedback, setFeedback] = useState([])

  useEffect(() => {
    // Load user personas (in real app, this would come from your database)
    setPersonas([
      {
        id: 1,
        name: "Rajesh Kumar",
        role: "Sales Manager",
        description: "Experienced sales professional managing a team of 8 sales representatives",
        goals: [
          "Increase team productivity",
          "Track sales performance",
          "Generate accurate reports",
          "Manage client relationships",
        ],
        pain_points: [
          "Complex navigation",
          "Slow report generation",
          "Difficulty finding client information",
          "Too many clicks to complete tasks",
        ],
        technical_skills: "intermediate",
        preferred_features: ["Quick search", "Dashboard widgets", "Mobile access", "Automated reports"],
      },
      {
        id: 2,
        name: "Priya Sharma",
        role: "Administrative Assistant",
        description: "Handles data entry, document management, and basic CRM operations",
        goals: ["Efficient data entry", "Easy document access", "Simple task management", "Clear instructions"],
        pain_points: ["Confusing interface", "Fear of making mistakes", "Lack of guidance", "Overwhelming options"],
        technical_skills: "beginner",
        preferred_features: ["Step-by-step guidance", "Simple forms", "Undo functionality", "Help tooltips"],
      },
      {
        id: 3,
        name: "Arjun Mehta",
        role: "IT Administrator",
        description: "Manages system configuration, user permissions, and technical aspects",
        goals: ["System optimization", "User management", "Data security", "Integration capabilities"],
        pain_points: [
          "Limited customization options",
          "Poor API documentation",
          "Lack of advanced settings",
          "No bulk operations",
        ],
        technical_skills: "advanced",
        preferred_features: ["Advanced settings", "Bulk operations", "API access", "Custom fields"],
      },
      {
        id: 4,
        name: "Neha Gupta",
        role: "Customer Service Representative",
        description: "Handles customer inquiries, support tickets, and follow-ups",
        goals: [
          "Quick customer lookup",
          "Efficient ticket management",
          "Communication tracking",
          "Response time optimization",
        ],
        pain_points: [
          "Slow customer search",
          "Fragmented communication history",
          "No real-time notifications",
          "Manual follow-up tracking",
        ],
        technical_skills: "intermediate",
        preferred_features: ["Real-time search", "Unified communication view", "Automated reminders", "Quick actions"],
      },
    ])

    // Load analytics data
    const analyticsData = JSON.parse(localStorage.getItem("userAnalytics") || "[]")
    setAnalytics(analyticsData.slice(-20)) // Last 20 events

    // Load feedback data
    const feedbackData = JSON.parse(localStorage.getItem("userFeedback") || "[]")
    setFeedback(feedbackData)
  }, [])

  const exportResearchData = () => {
    const researchData = {
      personas,
      analytics: analytics.slice(-50), // Last 50 analytics events
      feedback,
      summary: {
        totalPersonas: personas.length,
        totalFeedback: feedback.length,
        averageRating:
          feedback.length > 0 ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1) : 0,
        topPainPoints: ["Complex navigation", "Slow performance", "Lack of guidance", "Too many clicks"],
      },
    }

    const blob = new Blob([JSON.stringify(researchData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "user_research_data.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  const getFeedbackStats = () => {
    if (feedback.length === 0) return { average: 0, distribution: {} }

    const average = feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length
    const distribution = feedback.reduce((acc, f) => {
      acc[f.rating] = (acc[f.rating] || 0) + 1
      return acc
    }, {})

    return { average: average.toFixed(1), distribution }
  }

  const stats = getFeedbackStats()

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">User Research & Analytics</h1>
            <p className="text-gray-600">Understanding our users to build better experiences</p>
          </div>
          <Button onClick={exportResearchData} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Research Data
          </Button>
        </div>

        <Tabs defaultValue="personas" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personas">User Personas</TabsTrigger>
            <TabsTrigger value="analytics">User Analytics</TabsTrigger>
            <TabsTrigger value="feedback">User Feedback</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="personas" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {personas.map((persona) => (
                <UserPersonaCard key={persona.id} persona={persona} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analytics.filter((a) => a.action_type === "page_view").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Total page views tracked</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">User Actions</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.filter((a) => a.action_type === "click").length}</div>
                  <p className="text-xs text-muted-foreground">Button clicks and interactions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Session Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.2m</div>
                  <p className="text-xs text-muted-foreground">Average time per session</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent User Activity</CardTitle>
                <CardDescription>Latest user interactions with the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.slice(-10).map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{event.action_type}</Badge>
                        <span className="text-sm">{event.page_path}</span>
                        {event.element_clicked && (
                          <span className="text-xs text-gray-500">→ {event.element_clicked}</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">{new Date(event.created_at).toLocaleTimeString()}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{feedback.length}</div>
                  <p className="text-xs text-muted-foreground">Feedback submissions received</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.average}</div>
                  <p className="text-xs text-muted-foreground">Out of 5 stars</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23%</div>
                  <p className="text-xs text-muted-foreground">Users providing feedback</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
                <CardDescription>Latest user feedback and suggestions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedback.slice(-5).map((item, index) => (
                    <div key={index} className="border-l-4 border-l-blue-500 pl-4 py-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              item.feedback_type === "bug"
                                ? "destructive"
                                : item.feedback_type === "feature_request"
                                  ? "default"
                                  : item.feedback_type === "praise"
                                    ? "secondary"
                                    : "outline"
                            }
                          >
                            {item.feedback_type.replace("_", " ")}
                          </Badge>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${star <= item.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-gray-700">{item.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Key Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <span className="text-sm">Users appreciate the comprehensive feature set</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <span className="text-sm">Dashboard provides good overview of key metrics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <span className="text-sm">Search functionality is powerful and accurate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <span className="text-sm">Mobile responsiveness works well</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                      <span className="text-sm">Navigation could be more intuitive for beginners</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                      <span className="text-sm">Report generation takes too long</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                      <span className="text-sm">Need more contextual help and guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                      <span className="text-sm">Bulk operations are missing for power users</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
                <CardDescription>Based on user research and feedback analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
                    <h4 className="font-medium text-blue-900 mb-2">High Priority</h4>
                    <ul className="space-y-1 text-sm text-blue-800">
                      <li>• Implement progressive disclosure to reduce interface complexity</li>
                      <li>• Add contextual help tooltips and guided tours</li>
                      <li>• Optimize report generation performance</li>
                      <li>• Create role-based dashboard customization</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-l-yellow-500">
                    <h4 className="font-medium text-yellow-900 mb-2">Medium Priority</h4>
                    <ul className="space-y-1 text-sm text-yellow-800">
                      <li>• Add bulk operations for advanced users</li>
                      <li>• Implement keyboard shortcuts</li>
                      <li>• Enhance mobile experience</li>
                      <li>• Add more customization options</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-l-green-500">
                    <h4 className="font-medium text-green-900 mb-2">Future Enhancements</h4>
                    <ul className="space-y-1 text-sm text-green-800">
                      <li>• AI-powered recommendations</li>
                      <li>• Advanced analytics and insights</li>
                      <li>• Integration with external tools</li>
                      <li>• Voice commands and accessibility features</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
