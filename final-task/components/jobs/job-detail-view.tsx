"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Calendar, Clock, Bookmark } from "lucide-react"
import type { Job } from "@/types/job"
import { useBookmarks } from "@/lib/bookmarks"
import { useToast } from "@/hooks/use-toast"

interface JobDetailViewProps {
  job: Job
}

export function JobDetailView({ job }: JobDetailViewProps) {
  const router = useRouter()
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const { toast } = useToast()
  const [isToggling, setIsToggling] = useState(false)

  const bookmarked = isBookmarked(job.id!)

  const handleBack = () => {
    router.push("/dashboard")
  }

  const handleBookmark = async () => {
    if (!job.id) return

    setIsToggling(true)
    try {
      const newBookmarkState = await toggleBookmark(job.id)
      toast({
        title: newBookmarkState ? "Job bookmarked" : "Bookmark removed",
        description: newBookmarkState
          ? `${job.title} has been added to your bookmarks`
          : `${job.title} has been removed from your bookmarks`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update bookmark. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsToggling(false)
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Marketing: "bg-green-100 text-green-800",
      Design: "bg-orange-100 text-orange-800",
      IT: "bg-blue-100 text-blue-800",
      Development: "bg-purple-100 text-purple-800",
      "Data Science": "bg-indigo-100 text-indigo-800",
      Analytics: "bg-cyan-100 text-cyan-800",
      "Customer Service": "bg-pink-100 text-pink-800",
      Support: "bg-yellow-100 text-yellow-800",
      Art: "bg-red-100 text-red-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const getSkillColor = (skill: string) => {
    const colors: Record<string, string> = {
      "Social Media Marketing": "bg-blue-100 text-blue-800",
      English: "bg-green-100 text-green-800",
      Copywriting: "bg-purple-100 text-purple-800",
      HTML: "bg-orange-100 text-orange-800",
      CSS: "bg-pink-100 text-pink-800",
      JavaScript: "bg-yellow-100 text-yellow-800",
      PHP: "bg-indigo-100 text-indigo-800",
      "Adobe Photoshop": "bg-red-100 text-red-800",
      "Adobe Illustrator": "bg-cyan-100 text-cyan-800",
      Creativity: "bg-teal-100 text-teal-800",
      "Attention to detail": "bg-lime-100 text-lime-800",
      SQL: "bg-blue-100 text-blue-800",
      Python: "bg-green-100 text-green-800",
      Excel: "bg-emerald-100 text-emerald-800",
      "Statistical Analysis": "bg-violet-100 text-violet-800",
      "Communication Skills": "bg-rose-100 text-rose-800",
      "Problem Solving": "bg-amber-100 text-amber-800",
      Patience: "bg-sky-100 text-sky-800",
    }
    return colors[skill] || "bg-gray-100 text-gray-800"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Button variant="outline" onClick={handleBack} className="mb-4 bg-transparent">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Role Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Role Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                As a <strong>{job.title}</strong>, {job.description}
              </p>
            </CardContent>
          </Card>

          {/* Key Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Key Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              {job.responsibilities && Array.isArray(job.responsibilities) && job.responsibilities.length > 0 ? (
                <ul className="space-y-3">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-green-600"></div>
                      </div>
                      <span className="text-gray-700">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No specific responsibilities listed for this position.</p>
              )}
            </CardContent>
          </Card>

          {/* Who We're Looking For */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Who We're Looking For</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {job.ideal_candidate?.age && job.ideal_candidate?.gender && (
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-gray-900">•</span>
                    <span className="text-gray-700">
                      <strong>
                        {job.ideal_candidate.age} year old {job.ideal_candidate.gender}
                      </strong>{" "}
                      with a passion for {job.title.toLowerCase()} and community engagement
                    </span>
                  </div>
                )}
                {job.ideal_candidate?.traits &&
                  Array.isArray(job.ideal_candidate.traits) &&
                  job.ideal_candidate.traits.map((trait, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="font-medium text-gray-900">•</span>
                      <span className="text-gray-700">{trait}</span>
                    </div>
                  ))}
                {(!job.ideal_candidate?.traits ||
                  !Array.isArray(job.ideal_candidate.traits) ||
                  job.ideal_candidate.traits.length === 0) && (
                  <p className="text-gray-500 italic">No specific candidate requirements listed.</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Onboarding Event */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Onboarding Event</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                </div>
                <p className="text-gray-700">{job.when_where}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* About This Opportunity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold">About This Opportunity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Posted On</p>
                  <p className="font-medium">{formatDate(job.about.posted_on)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="font-medium">{formatDate(job.about.deadline)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{job.about.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">{formatDate(job.about.start_date)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium">{formatDate(job.about.end_date)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.about?.categories && Array.isArray(job.about.categories) && job.about.categories.length > 0 ? (
                  job.about.categories.map((category, index) => (
                    <Badge key={index} className={getCategoryColor(category)}>
                      {category}
                    </Badge>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No categories specified</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Required Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold">Required Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.about?.required_skills &&
                Array.isArray(job.about.required_skills) &&
                job.about.required_skills.length > 0 ? (
                  job.about.required_skills.map((skill, index) => (
                    <Badge key={index} className={getSkillColor(skill)}>
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No specific skills required</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Bookmark Button */}
          <Button
            onClick={handleBookmark}
            className="w-full"
            variant={bookmarked ? "default" : "outline"}
            disabled={isToggling}
          >
            <Bookmark className={`w-4 h-4 mr-2 ${bookmarked ? "fill-current" : ""}`} />
            {isToggling ? "Updating..." : bookmarked ? "Bookmarked" : "Bookmark"}
          </Button>
        </div>
      </div>
    </main>
  )
}
