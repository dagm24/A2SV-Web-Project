"use client";

import type React from "react";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading, hasHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait until auth store has rehydrated from storage before deciding
    if (!hasHydrated) return;
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, hasHydrated, router]);

  if (!hasHydrated || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
