"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { EmailVerification } from "@/components/auth/email-verification"

export default function VerifyEmailPage() {
  const { user, pendingVerificationEmail } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect if already authenticated
    if (user) {
      router.push("/dashboard")
      return
    }

    // Redirect if no pending verification
    if (!pendingVerificationEmail) {
      router.push("/")
      return
    }
  }, [user, pendingVerificationEmail, router])

  if (!pendingVerificationEmail) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <EmailVerification email={pendingVerificationEmail} />
    </div>
  )
}
