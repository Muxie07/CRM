"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, ArrowRight, AlertTriangle, Lightbulb, Clock, Frown, Meh, Smile } from "lucide-react"

interface JourneyStep {
  phase: string
  touchpoints: string[]
  actions: string[]
  emotions: "frustrated" | "neutral" | "satisfied"
  pain_points: string[]
  opportunities: string[]
  duration: string
}

interface UserJourneyMapProps {
  persona: string
  journey: JourneyStep[]
}

export function UserJourneyMap({ persona, journey }: UserJourneyMapProps) {
  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case "frustrated":
        return <Frown className="w-5 h-5 text-red-500" />
      case "neutral":
        return <Meh className="w-5 h-5 text-yellow-500" />
      case "satisfied":
        return <Smile className="w-5 h-5 text-green-500" />
      default:
        return <Meh className="w-5 h-5 text-gray-500" />
    }
  }

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case "frustrated":
        return "border-red-200 bg-red-50"
      case "neutral":
        return "border-yellow-200 bg-yellow-50"
      case "satisfied":
        return "border-green-200 bg-green-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          User Journey: {persona}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Journey Timeline */}
          <div className="flex items-center justify-between mb-8">
            {journey.map((step, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${getEmotionColor(step.emotions)}`}
                >
                  {getEmotionIcon(step.emotions)}
                </div>
                {index < journey.length - 1 && <ArrowRight className="w-6 h-6 text-gray-400 mx-4" />}
              </div>
            ))}
          </div>

          {/* Journey Steps */}
          <div className="grid gap-6">
            {journey.map((step, index) => (
              <Card
                key={index}
                className={`border-l-4 ${
                  step.emotions === "frustrated"
                    ? "border-l-red-500"
                    : step.emotions === "neutral"
                      ? "border-l-yellow-500"
                      : "border-l-green-500"
                }`}
              >
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-6">
                    {/* Phase Info */}
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{step.phase}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{step.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getEmotionIcon(step.emotions)}
                        <span className="text-sm capitalize">{step.emotions}</span>
                      </div>
                    </div>

                    {/* Touchpoints & Actions */}
                    <div>
                      <h4 className="font-medium mb-2">Touchpoints & Actions</h4>
                      <div className="space-y-2">
                        {step.touchpoints.map((touchpoint, i) => (
                          <Badge key={i} variant="outline" className="block w-fit text-xs">
                            {touchpoint}
                          </Badge>
                        ))}
                        <div className="mt-2">
                          {step.actions.map((action, i) => (
                            <div key={i} className="text-xs text-gray-600 flex items-center gap-1">
                              <span className="w-1 h-1 bg-gray-400 rounded-full" />
                              {action}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Pain Points */}
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        Pain Points
                      </h4>
                      <div className="space-y-1">
                        {step.pain_points.map((pain, i) => (
                          <div key={i} className="text-xs text-red-600 flex items-start gap-1">
                            <span className="w-1 h-1 bg-red-500 rounded-full mt-1.5 flex-shrink-0" />
                            {pain}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Opportunities */}
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-1">
                        <Lightbulb className="w-4 h-4 text-blue-500" />
                        Opportunities
                      </h4>
                      <div className="space-y-1">
                        {step.opportunities.map((opportunity, i) => (
                          <div key={i} className="text-xs text-blue-600 flex items-start gap-1">
                            <span className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                            {opportunity}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Journey Summary */}
          <Card className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Journey Insights</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Critical Pain Points</h4>
                  <ul className="text-xs space-y-1">
                    <li>• Complex navigation structure</li>
                    <li>• Lack of contextual guidance</li>
                    <li>• Slow system responses</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2">Key Opportunities</h4>
                  <ul className="text-xs space-y-1">
                    <li>• Implement smart search</li>
                    <li>• Add progress indicators</li>
                    <li>• Provide quick actions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2">Success Metrics</h4>
                  <ul className="text-xs space-y-1">
                    <li>• Task completion rate: 85%</li>
                    <li>• Time to complete: -30%</li>
                    <li>• User satisfaction: +40%</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
