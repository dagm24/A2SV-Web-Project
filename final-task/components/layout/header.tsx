"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useBookmarks } from "@/lib/bookmarks";
import { LogOut, User, Bookmark, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Header() {
  const { user, logout, hasHydrated } = useAuth();
  const { fetchBookmarks } = useBookmarks();
  const router = useRouter();

  useEffect(() => {
    if (!hasHydrated) return;
    if (user) {
      fetchBookmarks();
    }
  }, [user, hasHydrated, fetchBookmarks]);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1
              className="text-xl font-bold text-gray-900 cursor-pointer"
              onClick={() => handleNavigation("/dashboard")}
            >
              Job Opportunities
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation("/dashboard")}
              className="flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              Jobs
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation("/bookmarks")}
              className="flex items-center gap-2"
            >
              <Bookmark className="w-4 h-4" />
              Bookmarks
            </Button>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>{user?.name}</span>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
