"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Star, X, Send } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface FeedbackWidgetProps {
  featureArea?: string
}

export function FeedbackWidget({ featureArea = "general" }: FeedbackWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [feedbackType, setFeedbackType] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!feedbackType || !message || rating === 0) {
      toast({
        title: "Please fill all fields",
        description: "Rating, feedback type, and message are required.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const feedbackData = {
        user_id: "current_user", // Would come from auth context
        feature_area: featureArea,
        feedback_type: feedbackType,
        rating,
        message,
        created_at: new Date().toISOString(),
      }

      // Store feedback (in real app, this would go to your backend)
      const existingFeedback = JSON.parse(localStorage.getItem("userFeedback") || "[]")
      existingFeedback.push(feedbackData)
      localStorage.setItem("userFeedback", JSON.stringify(existingFeedback))

      toast({
        title: "Feedback submitted!",
        description: "Thank you for helping us improve the experience.",
      })

      // Reset form
      setRating(0)
      setFeedbackType("")
      setMessage("")
      setIsOpen(false)
    } catch (error) {
      toast({
        title: "Error submitting feedback",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        size="icon"
      >
        <MessageSquare className="w-5 h-5" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 shadow-xl border-2 z-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Share Feedback</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Rate your experience</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`p-1 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
              >
                <Star className="w-5 h-5 fill-current" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Feedback Type</label>
          <Select value={feedbackType} onValueChange={setFeedbackType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bug">Bug Report</SelectItem>
              <SelectItem value="feature_request">Feature Request</SelectItem>
              <SelectItem value="improvement">Improvement</SelectItem>
              <SelectItem value="praise">Praise</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Your feedback</label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your experience..."
            rows={3}
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Submit Feedback
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
