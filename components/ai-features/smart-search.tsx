"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Sparkles, Clock, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface SmartSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export function SmartSearch({ onSearch, placeholder = "Search anything..." }: SmartSearchProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Load recent searches from localStorage
    const recent = JSON.parse(localStorage.getItem("recentSearches") || "[]")
    setRecentSearches(recent.slice(0, 5))
  }, [])

  useEffect(() => {
    if (query.length > 2) {
      // Simulate AI-powered search suggestions
      const mockSuggestions = [
        `${query} in clients`,
        `${query} in products`,
        `${query} in invoices`,
        `Recent ${query} activity`,
        `${query} analytics`,
      ]
      setSuggestions(mockSuggestions)
    } else {
      setSuggestions([])
    }
  }, [query])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Save to recent searches
      const updated = [searchQuery, ...recentSearches.filter((s) => s !== searchQuery)].slice(0, 5)
      setRecentSearches(updated)
      localStorage.setItem("recentSearches", JSON.stringify(updated))

      onSearch(searchQuery)
      setIsOpen(false)
      setQuery("")
    }
  }

  const popularSearches = [
    "High value clients",
    "Pending invoices",
    "This month sales",
    "Low stock items",
    "Overdue payments",
  ]

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder={placeholder}
          className="pl-10 pr-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
        />
        <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
      </div>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 shadow-lg border-gray-200">
          <CardContent className="p-0">
            {query.length > 2 && suggestions.length > 0 && (
              <div className="p-3 border-b">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">AI Suggestions</span>
                </div>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(suggestion)}
                    className="block w-full text-left px-2 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {recentSearches.length > 0 && (
              <div className="p-3 border-b">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">Recent Searches</span>
                </div>
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="block w-full text-left px-2 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded"
                  >
                    {search}
                  </button>
                ))}
              </div>
            )}

            <div className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">Popular Searches</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {popularSearches.map((search, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSearch(search)}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
