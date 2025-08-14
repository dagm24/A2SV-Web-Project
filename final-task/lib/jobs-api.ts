import { create } from "zustand"
import { apiRequest } from "./api"
import type { Job } from "@/types/job"

export interface JobsApiResponse {
  success: boolean
  message: string
  data: Job[]
  count: number
}

interface JobsState {
  jobs: Job[]
  isLoading: boolean
  error: string | null
  searchQuery: string
  sortBy: string
  fetchJobs: () => Promise<void>
  searchJobs: (query: string) => void
  setSortBy: (sort: string) => void
  getJobById: (id: string) => Job | undefined
}

export const useJobs = create<JobsState>((set, get) => ({
  jobs: [],
  isLoading: false,
  error: null,
  searchQuery: "",
  sortBy: "relevant",

  fetchJobs: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiRequest<JobsApiResponse>("/opportunities/search", {
        method: "GET",
      })

      // Transform API response to match our Job interface
      const transformedJobs: Job[] = response.data.map((job: any) => ({
        id: job.id,
        title: job.title,
        description: job.description,
        responsibilities: job.responsibilities || [],
        ideal_candidate: job.idealCandidate || {
          age: "Any",
          gender: "Any",
          traits: [],
        },
        when_where: job.whenAndWhere || "",
        about: {
          posted_on: job.datePosted || new Date().toISOString(),
          deadline: job.deadline || "",
          location: job.location?.join(", ") || job.location || "",
          start_date: job.startDate || "",
          end_date: job.endDate || "",
          categories: job.categories || [],
          required_skills: job.requiredSkills || [],
        },
        company: job.orgName || job.company || "",
        image: job.logoUrl || "/job1.png",
      }))

      set({ jobs: transformedJobs, isLoading: false })
    } catch (error) {
      console.error("Error fetching jobs:", error)
      // Fallback to mock data if API fails
      const { mockJobs } = await import("./jobs")
      set({
        jobs: mockJobs.job_postings,
        isLoading: false,
        error: "Using offline data - API unavailable",
      })
    }
  },

  searchJobs: (query: string) => {
    set({ searchQuery: query })
  },

  setSortBy: (sort: string) => {
    set({ sortBy: sort })
  },

  getJobById: (id: string) => {
    const { jobs } = get()
    return jobs.find((job) => job.id === id)
  },
}))

// Computed selector for filtered and sorted jobs
export const useFilteredJobs = () => {
  const { jobs, searchQuery, sortBy } = useJobs()

  const filteredAndSortedJobs = jobs.filter((job) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.about.location.toLowerCase().includes(query) ||
      job.about.categories.some((cat) => cat.toLowerCase().includes(query)) ||
      job.about.required_skills.some((skill) => skill.toLowerCase().includes(query))
    )
  })

  switch (sortBy) {
    case "newest":
      filteredAndSortedJobs.sort(
        (a, b) => new Date(b.about.posted_on).getTime() - new Date(a.about.posted_on).getTime(),
      )
      break
    case "oldest":
      filteredAndSortedJobs.sort(
        (a, b) => new Date(a.about.posted_on).getTime() - new Date(b.about.posted_on).getTime(),
      )
      break
    case "title":
      filteredAndSortedJobs.sort((a, b) => a.title.localeCompare(b.title))
      break
    case "company":
      filteredAndSortedJobs.sort((a, b) => a.company.localeCompare(b.company))
      break
    default:
      // Keep original order for "relevant"
      break
  }

  return filteredAndSortedJobs
}
