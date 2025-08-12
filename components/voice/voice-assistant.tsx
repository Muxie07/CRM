"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff, Volume2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface VoiceAssistantProps {
  onCommand: (command: string) => void
}

export function VoiceAssistant({ onCommand }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    setIsSupported(!!SpeechRecognition)
  }, [])

  const startListening = () => {
    if (!isSupported) {
      toast({
        title: "Voice not supported",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive",
      })
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = "en-US"

    recognition.onstart = () => {
      setIsListening(true)
      setTranscript("")
    }

    recognition.onresult = (event) => {
      const current = event.resultIndex
      const transcript = event.results[current][0].transcript
      setTranscript(transcript)

      if (event.results[current].isFinal) {
        processVoiceCommand(transcript)
      }
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error)
      setIsListening(false)
      toast({
        title: "Voice recognition error",
        description: "Please try again.",
        variant: "destructive",
      })
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  const stopListening = () => {
    setIsListening(false)
  }

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase()

    // Process common voice commands
    if (lowerCommand.includes("search for") || lowerCommand.includes("find")) {
      const searchTerm = lowerCommand.replace(/search for|find/g, "").trim()
      onCommand(`search:${searchTerm}`)
      speak(`Searching for ${searchTerm}`)
    } else if (lowerCommand.includes("create") || lowerCommand.includes("add")) {
      if (lowerCommand.includes("client")) {
        onCommand("create:client")
        speak("Opening new client form")
      } else if (lowerCommand.includes("invoice")) {
        onCommand("create:invoice")
        speak("Opening new invoice form")
      }
    } else if (lowerCommand.includes("dashboard")) {
      onCommand("navigate:dashboard")
      speak("Navigating to dashboard")
    } else {
      onCommand(command)
      speak("Command received")
    }

    setTranscript("")
  }

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  if (!isSupported) {
    return null
  }

  return (
    <div className="relative">
      <Button
        onClick={isListening ? stopListening : startListening}
        variant={isListening ? "destructive" : "outline"}
        size="icon"
        className={`w-10 h-10 rounded-full ${isListening ? "animate-pulse" : ""}`}
      >
        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
      </Button>

      {isListening && (
        <Card className="absolute top-full right-0 mt-2 w-64 z-50">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <Volume2 className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Listening...</span>
            </div>
            <p className="text-sm text-gray-600">
              {transcript || "Say something like 'search for clients' or 'create new invoice'"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
