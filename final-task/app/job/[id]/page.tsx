"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Header } from "@/components/layout/header"
import { JobDetailView } from "@/components/jobs/job-detail-view"
import { useJobs } from "@/lib/jobs-api"
import { Loader2 } from "lucide-react"
import type { Job } from "@/types/job"

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id as string
  const { jobs, fetchJobs, isLoading } = useJobs()
  const [job, setJob] = useState<Job | null>(null)

  useEffect(() => {
    // If jobs are not loaded, fetch them
    if (jobs.length === 0 && !isLoading) {
      fetchJobs()
    }
  }, [jobs.length, isLoading, fetchJobs])

  useEffect(() => {
    // Find the job once jobs are loaded
    if (jobs.length > 0) {
      const foundJob = jobs.find((j) => j.id === jobId)
      setJob(foundJob || null)
    }
  }, [jobs, jobId])

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-gray-500">Loading job details...</p>
              </div>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    )
  }

  if (!job) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
              <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
              <button
                onClick={() => router.push("/dashboard")}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Back to Jobs
              </button>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <JobDetailView job={job} />
      </div>
    </ProtectedRoute>
  )
}
