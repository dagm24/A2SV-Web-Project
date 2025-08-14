"use client";

import type React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bookmark } from "lucide-react";
import type { Job } from "@/types/job";
import { useRouter } from "next/navigation";
import { useBookmarks } from "@/lib/bookmarks";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const router = useRouter();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { toast } = useToast();
  const [isToggling, setIsToggling] = useState(false);

  const bookmarked = isBookmarked(job.id!);

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!job.id) return;

    setIsToggling(true);
    try {
      const newBookmarkState = await toggleBookmark(job.id);
      toast({
        title: newBookmarkState ? "Job bookmarked" : "Bookmark removed",
        description: newBookmarkState
          ? `${job.title} has been added to your bookmarks`
          : `${job.title} has been removed from your bookmarks`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update bookmark. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsToggling(false);
    }
  };

  const handleViewDetails = () => {
    router.push(`/job/${job.id}`);
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

  return (
    <Card
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleViewDetails}
      data-testid="job-card"
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <img
                src={
                  job.image ||
                  "/placeholder.svg?height=48&width=48&query=company logo"
                }
                alt={job.company ? `${job.company} logo` : "Company logo"}
                className="w-8 h-8 object-contain"
                onError={(e) =>
                  (e.currentTarget.src =
                    "/placeholder.svg?height=48&width=48&query=company logo")
                }
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                {job.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {job.company} •{" "}
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {job.about?.location || "Unknown location"}
                </span>
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmarkClick}
            className="p-2"
            disabled={isToggling}
            data-testid="bookmark-button"
            aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
            title={bookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Bookmark
              className={`w-4 h-4 ${
                bookmarked ? "fill-current text-blue-600" : "text-gray-400"
              }`}
            />
          </Button>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {job.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {(job.about?.categories || []).map((category, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={getCategoryColor(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
