"use client";
import React from "react";

export default function HydrationGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Return children immediately to avoid hydration mismatch
  return <>{children}</>;
}
