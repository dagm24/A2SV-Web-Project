"use client"

import Link from "next/link"
import { useState } from "react"
import { authenticate } from "@/app/actions/auth"
import { signIn } from "next-auth/react"
import { toast } from "react-hot-toast"
import { useEffect } from "react"
import { useSession } from "next-auth/react"

export default function LoginPage() {
  const [pending, setPending] = useState(false)
  const { data: session, status } = useSession()
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      toast.success(`Welcome, ${session.user.name || session.user.email}!`)
      setSuccess(true)
    } else {
      setSuccess(false)
    }
  }, [status, session])

  const handleSubmit = async (formData: FormData) => {
    setPending(true)
    // Call the authenticate function directly
    const error = await authenticate(undefined, formData)
    if (!error) {
      // Only call signIn if backend check succeeded
      const email = formData.get("email") as string
      const password = formData.get("password") as string
      const result = await signIn("credentials", { email, password, redirect: false })
      if (result && result.error) {
        toast.error(result.error)
      }
    }
    setPending(false)
  }

  if (success && session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 shadow-lg rounded-lg border bg-card text-card-foreground text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Login Successful!</h2>
          <p className="text-lg">Welcome, <span className="font-semibold">{session.user.name || session.user.email}</span>!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      {/* Card */}
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg border bg-card text-card-foreground">
        {/* CardHeader */}
        <div className="flex flex-col space-y-1.5 p-6 text-center">
          {/* CardTitle */}
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back,</h2>
        </div>
        {/* CardContent */}
        <div className="p-6 pt-0">
          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              {/* Label */}
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email Address</label>
              {/* Input */}
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 focus:border-v0-purple focus:ring-v0-purple"
              />
            </div>
            <div className="space-y-2">
              {/* Label */}
              <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
              {/* Input */}
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 focus:border-v0-purple focus:ring-v0-purple"
              />
            </div>
            <LoginButton pending={pending} />
            <div className="mt-4 text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="font-medium text-v0-purple hover:underline">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function LoginButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-purple-600 text-white hover:bg-purple-700"
      aria-disabled={pending}
    >
      {pending ? "Logging in..." : "Sign In"}
    </button>


  )
}
