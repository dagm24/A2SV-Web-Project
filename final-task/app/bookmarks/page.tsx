"use client";

import { useEffect } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Trash2 } from "lucide-react";
import { useBookmarks } from "@/lib/bookmarks";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function BookmarksPage() {
  const { bookmarkedJobs, isLoading, fetchBookmarks, toggleBookmark } =
    useBookmarks();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const handleRemoveBookmark = async (jobId: string, jobTitle: string) => {
    try {
      await toggleBookmark(jobId);
      toast({
        title: "Bookmark removed",
        description: `${jobTitle} has been removed from your bookmarks`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove bookmark. Please try again.",
        variant: "destructive",
      });
    }
  };

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
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-12">
              <p className="text-gray-500">Loading your bookmarks...</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              My Bookmarks
            </h2>
            <p className="text-gray-600">
              {bookmarkedJobs.length === 0
                ? "No bookmarked jobs yet"
                : `${bookmarkedJobs.length} bookmarked ${
                    bookmarkedJobs.length === 1 ? "job" : "jobs"
                  }`}
            </p>
          </div>

          {bookmarkedJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                You haven't bookmarked any jobs yet.
              </p>
              <Button onClick={() => router.push("/dashboard")}>
                Browse Jobs
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {bookmarkedJobs.map((job) => (
                <Card
                  key={job.eventID}
                  className="hover:shadow-md transition-shadow"
                  data-testid="bookmark-item"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <img
                            src={
                              job.logoUrl ||
                              "/placeholder.svg?height=48&width=48&query=company logo"
                            }
                            alt={`${job.orgName} logo`}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">
                            {job.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {job.orgName} •{" "}
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {Array.isArray(job.location)
                                ? job.location.join(", ")
                                : job.location || "Location not specified"}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(job.dateBookmarked).toLocaleDateString()}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleRemoveBookmark(job.eventID, job.title)
                          }
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                          data-testid="bookmark-button"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.categories &&
                        Array.isArray(job.categories) &&
                        job.categories.map((category, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className={getCategoryColor(category)}
                          >
                            {category}
                          </Badge>
                        ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {job.opType}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/job/${job.eventID}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
