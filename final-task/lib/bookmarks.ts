import { create } from "zustand"
import { useAuth } from "./auth"

const API_BASE_URL = "https://akil-backend.onrender.com"

export interface BookmarkedJob {
  eventID: string
  title: string
  opType: string
  orgName: string
  logoUrl: string
  location: string[]
  description: string
  categories: string[]
  dateBookmarked: string
}

interface BookmarkState {
  bookmarkedJobs: BookmarkedJob[]
  isLoading: boolean
  fetchBookmarks: () => Promise<void>
  toggleBookmark: (jobId: string) => Promise<boolean>
  isBookmarked: (jobId: string) => boolean
}

export const useBookmarks = create<BookmarkState>((set, get) => ({
  bookmarkedJobs: [],
  isLoading: false,

  fetchBookmarks: async () => {
    const { user } = useAuth.getState()
    if (!user?.accessToken) return

    set({ isLoading: true })
    try {
      const response = await fetch(`${API_BASE_URL}/bookmarks`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch bookmarks")
      }

      const data = await response.json()
      set({ bookmarkedJobs: data.data || [], isLoading: false })
    } catch (error) {
      console.error("Error fetching bookmarks:", error)
      set({ isLoading: false })
    }
  },

  toggleBookmark: async (jobId: string) => {
    const { user } = useAuth.getState()
    if (!user?.accessToken) return false

    const { bookmarkedJobs } = get()
    const isCurrentlyBookmarked = bookmarkedJobs.some((job) => job.eventID === jobId)

    try {
      if (isCurrentlyBookmarked) {
        // Remove bookmark
        const response = await fetch(`${API_BASE_URL}/bookmarks/${jobId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to remove bookmark")
        }

        // Update local state
        set({
          bookmarkedJobs: bookmarkedJobs.filter((job) => job.eventID !== jobId),
        })
        return false
      } else {
        // Add bookmark
        const response = await fetch(`${API_BASE_URL}/bookmarks/${jobId}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}), // Empty body as specified
        })

        if (!response.ok) {
          throw new Error("Failed to add bookmark")
        }

        // Refresh bookmarks to get updated list
        await get().fetchBookmarks()
        return true
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error)
      throw error
    }
  },

  isBookmarked: (jobId: string) => {
    const { bookmarkedJobs } = get()
    return bookmarkedJobs.some((job) => job.eventID === jobId)
  },
}))
