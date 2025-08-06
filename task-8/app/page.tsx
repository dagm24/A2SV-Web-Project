import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 lg:text-5xl">Welcome</h1>
        <p className="mb-6 text-lg text-gray-600">
          Your journey begins here. Please sign up or sign in to access your personalized experience.
        </p>
        <Link href="/auth/signup" className="inline-flex h-12 items-center justify-center rounded-md bg-blue-600 px-8 text-lg font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          Proceed to Authentication
        </Link>
        <p className="mt-4 text-sm text-gray-500">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-blue-600">Terms of Service</Link>.
        </p>
      </div>
    </main>
  )
}
