"use client"

import Link from "next/link"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { signupUser } from "@/app/actions/auth"
import { toast } from "react-hot-toast"
import { useEffect } from "react"
import { FcGoogle } from "react-icons/fc" // Using react-icons for Google icon

export default function SignupPage() {
  const [state, dispatch] = useActionState(
    async (_prevState: unknown, formData: FormData) => await signupUser(formData),
    undefined
  )

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error)
    } else if (state?.success) {
      toast.success(state.message)
    }
  }, [state])

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      {/* Card */}
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg border bg-card text-card-foreground">
        {/* CardHeader */}
        <div className="flex flex-col space-y-1.5 p-6 text-center">
          {/* CardTitle */}
          <h2 className="text-3xl font-bold text-gray-800">Sign Up Today!</h2>
        </div>
        {/* CardContent */}
        <div className="p-6 pt-0">
          {/* Button */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white hover:bg-gray-50 h-10 px-4 w-full text-gray-700"
          >
            <FcGoogle className="h-5 w-5" />
            Sign Up with Google
          </button>
          <div className="relative my-6">
            {/* Separator */}
            <div className="shrink-0 bg-border h-[1px] w-full bg-gray-200" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
              Or Sign Up with Email
            </span>
          </div>
          <form action={dispatch} className="space-y-4">
            <div className="space-y-2">
              {/* Label */}
              <label htmlFor="name" className="text-sm font-medium leading-none text-purple-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Full Name</label>
              {/* Input */}
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
                className="flex h-10 w-full rounded-md border border-input bg-white text-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 focus:border-v0-purple focus:ring-v0-purple"
              />
            </div>
            <div className="space-y-2">
              {/* Label */}
              <label htmlFor="email" className="text-sm font-medium leading-none text-purple-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email Address</label>
              {/* Input */}
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                required
                className="flex h-10 w-full rounded-md border border-input bg-white text-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 focus:border-v0-purple focus:ring-v0-purple"
              />
            </div>
            <div className="space-y-2">
              {/* Label */}
              <label htmlFor="password" className="text-sm font-medium leading-none text-purple-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
              {/* Input */}
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                required
                className="flex h-10 w-full rounded-md border border-input bg-white text-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 focus:border-v0-purple focus:ring-v0-purple"
              />
            </div>
            <div className="space-y-2">
              {/* Label */}
              <label htmlFor="confirmPassword" className="text-sm font-medium leading-none text-purple-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Confirm Password</label>
              {/* Input */}
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Enter password"
                required
                className="flex h-10 w-full rounded-md border border-input bg-white text-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 focus:border-v0-purple focus:ring-v0-purple"
              />
            </div>
            <SignupButton />
            <div className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-purple-600 hover:underline">
                Login
              </Link>
            </div>
            <p className="text-center text-xs text-gray-500 mt-4">
              By clicking &apos;Continue&apos;, you acknowledge that you have read and accepted our{" "}
              <Link href="#" className="font-medium text-purple-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="font-medium text-purple-600 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

function SignupButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-purple-600 text-white border border-purple-600 hover:bg-purple-700"
      aria-disabled={pending}
    >
      {pending ? "Signing up..." : "Continue"}
    </button>
  )
}
