"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Target, AlertTriangle, Zap } from "lucide-react"

interface UserPersona {
  id: number
  name: string
  role: string
  description: string
  goals: string[]
  pain_points: string[]
  technical_skills: string
  preferred_features: string[]
}

interface UserPersonaCardProps {
  persona: UserPersona
}

export function UserPersonaCard({ persona }: UserPersonaCardProps) {
  const getSkillColor = (skill: string) => {
    switch (skill) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg">{persona.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{persona.role}</p>
          </div>
        </div>
        <Badge className={getSkillColor(persona.technical_skills)} variant="secondary">
          {persona.technical_skills} user
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{persona.description}</p>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-green-600" />
            <h4 className="font-medium text-sm">Goals</h4>
          </div>
          <ul className="space-y-1">
            {persona.goals.map((goal, index) => (
              <li key={index} className="text-xs text-muted-foreground flex items-start gap-1">
                <span className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                {goal}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <h4 className="font-medium text-sm">Pain Points</h4>
          </div>
          <ul className="space-y-1">
            {persona.pain_points.map((point, index) => (
              <li key={index} className="text-xs text-muted-foreground flex items-start gap-1">
                <span className="w-1 h-1 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-blue-600" />
            <h4 className="font-medium text-sm">Preferred Features</h4>
          </div>
          <div className="flex flex-wrap gap-1">
            {persona.preferred_features.map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
