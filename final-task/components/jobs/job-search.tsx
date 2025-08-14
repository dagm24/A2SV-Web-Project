"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

interface JobSearchProps {
  onSearch: (query: string) => void
  onSortChange: (sort: string) => void
}

export function JobSearch({ onSearch, onSortChange }: JobSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const handleClearSearch = () => {
    setSearchQuery("")
    onSearch("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    // Real-time search as user types
    onSearch(value)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <form onSubmit={handleSearch} className="flex-1 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search job titles, companies, locations, skills..."
            value={searchQuery}
            onChange={handleInputChange}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      <Select onValueChange={onSortChange} defaultValue="relevant">
        <SelectTrigger className="w-full sm:w-48" data-testid="sort-select">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevant">Most relevant</SelectItem>
          <SelectItem value="newest">Newest first</SelectItem>
          <SelectItem value="oldest">Oldest first</SelectItem>
          <SelectItem value="title">Title A-Z</SelectItem>
          <SelectItem value="company">Company A-Z</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
