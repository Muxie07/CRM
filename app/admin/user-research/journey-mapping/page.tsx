"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { UserJourneyMap } from "@/components/journey-mapping/user-journey-map"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, Map } from "lucide-react"

export default function JourneyMappingPage() {
  const [selectedPersona, setSelectedPersona] = useState("sales-manager")

  const journeyMaps = {
    "sales-manager": {
      persona: "Sales Manager - Creating Monthly Report",
      journey: [
        {
          phase: "Awareness",
          touchpoints: ["Dashboard", "Reports menu"],
          actions: ["Login to system", "Navigate to reports"],
          emotions: "neutral" as const,
          pain_points: ["Too many menu options", "Unclear report types"],
          opportunities: ["Add quick report shortcuts", "Implement smart suggestions"],
          duration: "2-3 minutes",
        },
        {
          phase: "Exploration",
          touchpoints: ["Report builder", "Filter options"],
          actions: ["Select report type", "Configure filters", "Preview data"],
          emotions: "frustrated" as const,
          pain_points: ["Complex filter interface", "Slow data loading", "No preview available"],
          opportunities: ["Simplify filter UI", "Add real-time preview", "Implement saved filters"],
          duration: "8-12 minutes",
        },
        {
          phase: "Creation",
          touchpoints: ["Report generator", "Export options"],
          actions: ["Generate report", "Review results", "Export to PDF"],
          emotions: "neutral" as const,
          pain_points: ["Long generation time", "Limited formatting options"],
          opportunities: ["Optimize performance", "Add more export formats", "Enable scheduling"],
          duration: "5-8 minutes",
        },
        {
          phase: "Completion",
          touchpoints: ["Download", "Email sharing"],
          actions: ["Download report", "Share with team"],
          emotions: "satisfied" as const,
          pain_points: ["Manual sharing process"],
          opportunities: ["Auto-email distribution", "Team collaboration features"],
          duration: "2-3 minutes",
        },
      ],
    },
    "admin-assistant": {
      persona: "Administrative Assistant - Adding New Client",
      journey: [
        {
          phase: "Initiation",
          touchpoints: ["Main navigation", "Clients section"],
          actions: ["Access clients area", "Find add client option"],
          emotions: "neutral" as const,
          pain_points: ["Unclear navigation labels", "Multiple entry points"],
          opportunities: ["Clearer labeling", "Prominent add button"],
          duration: "1-2 minutes",
        },
        {
          phase: "Data Entry",
          touchpoints: ["Client form", "Input fields"],
          actions: ["Fill client details", "Upload documents", "Validate information"],
          emotions: "frustrated" as const,
          pain_points: ["Long form", "Unclear required fields", "No auto-save"],
          opportunities: ["Progressive form", "Clear field indicators", "Auto-save feature"],
          duration: "10-15 minutes",
        },
        {
          phase: "Verification",
          touchpoints: ["Review screen", "Validation messages"],
          actions: ["Review entered data", "Correct errors", "Confirm submission"],
          emotions: "neutral" as const,
          pain_points: ["Unclear error messages", "Lost data on errors"],
          opportunities: ["Better error handling", "Inline validation", "Data persistence"],
          duration: "3-5 minutes",
        },
        {
          phase: "Completion",
          touchpoints: ["Success confirmation", "Client profile"],
          actions: ["Receive confirmation", "View created profile"],
          emotions: "satisfied" as const,
          pain_points: ["No clear next steps"],
          opportunities: ["Suggested next actions", "Quick task creation"],
          duration: "1-2 minutes",
        },
      ],
    },
  }

  const exportJourneyMap = () => {
    const currentJourney = journeyMaps[selectedPersona]
    const exportData = {
      persona: currentJourney.persona,
      journey: currentJourney.journey,
      exportDate: new Date().toISOString(),
      insights: {
        totalDuration: "17-28 minutes",
        criticalPainPoints: ["Complex interfaces", "Slow performance", "Lack of guidance"],
        keyOpportunities: ["Simplify workflows", "Add smart features", "Improve feedback"],
        emotionalJourney: "Starts neutral, becomes frustrated, ends satisfied",
      },
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `journey_map_${selectedPersona}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Map className="w-6 h-6" />
              User Journey Mapping
            </h1>
            <p className="text-gray-600">Visualize user interactions and identify improvement opportunities</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedPersona} onValueChange={setSelectedPersona}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select persona" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales-manager">Sales Manager</SelectItem>
                <SelectItem value="admin-assistant">Administrative Assistant</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={exportJourneyMap} variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        <UserJourneyMap persona={journeyMaps[selectedPersona].persona} journey={journeyMaps[selectedPersona].journey} />

        {/* Journey Analytics */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Journey Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Duration</span>
                  <span className="font-medium">17-28 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Pain Points</span>
                  <span className="font-medium text-red-600">8 identified</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Opportunities</span>
                  <span className="font-medium text-blue-600">12 found</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Satisfaction</span>
                  <span className="font-medium text-green-600">Mixed</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Improvement Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <div className="font-medium text-red-900 text-sm">High Priority</div>
                  <div className="text-xs text-red-700">Simplify data entry forms</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <div className="font-medium text-yellow-900 text-sm">Medium Priority</div>
                  <div className="text-xs text-yellow-700">Improve system performance</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <div className="font-medium text-green-900 text-sm">Low Priority</div>
                  <div className="text-xs text-green-700">Add collaboration features</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Success Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Task Completion</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className="w-3/4 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">User Satisfaction</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className="w-3/5 h-2 bg-yellow-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Efficiency</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className="w-1/2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">50%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
