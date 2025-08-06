"use client"

import { useFormState, useFormStatus } from "react-dom"
import { verifyEmail } from "@/app/actions/auth"
import { toast } from "react-hot-toast"
import { useEffect, useState, useRef, type ChangeEvent, type KeyboardEvent } from "react"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const email = searchParams?.get("email") || ""
  const [otpValue, setOtpValue] = useState("")
  const [countdown, setCountdown] = useState(30)
  const [canResend, setCanResend] = useState(false)

  const [state, dispatch] = useFormState(verifyEmail, undefined)

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error)
    } else if (state?.success) {
      toast.success(state.message)
    }
  }, [state])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else {
      setCanResend(true)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const handleResendCode = () => {
    toast.success("Resend code functionality not implemented in this demo.")
    setCountdown(30)
    setCanResend(false)
  }

  const handleSubmit = (formData: FormData) => {
    formData.append("email", email)
    formData.append("otp", otpValue)
    dispatch(formData)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg border bg-card text-card-foreground text-center">
        <div className="flex flex-col space-y-1.5 p-6">
          <h2 className="text-3xl font-bold text-gray-800">Verify Email</h2>
        </div>
        <div className="p-6 pt-0 space-y-6">
          <p className="text-gray-600">
            We&apos;ve sent a verification code to the email address you provided. To complete the verification process,
            please enter the code here.
          </p>
          <form action={handleSubmit} className="space-y-6">
            <div className="flex justify-center">
              <InlinedOtpInput length={4} onOtpChange={setOtpValue} />
            </div>
            <div className="text-sm text-gray-600">
              You can request to{" "}
              {canResend ? (
                <button type="button" onClick={handleResendCode} className="font-medium text-v0-purple hover:underline">
                  Resend code
                </button>
              ) : (
                <span className="font-medium text-v0-purple">Resend code</span>
              )}{" "}
              in <span className="font-semibold text-v0-purple">0:{countdown < 10 ? `0${countdown}` : countdown}</span>
            </div>
            <VerifyButton />
          </form>
        </div>
      </div>
    </div>
  )
}

interface InlinedOtpInputProps {
  length?: number
  onOtpChange: (otp: string) => void
}

const InlinedOtpInput = ({ length = 4, onOtpChange }: InlinedOtpInputProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""))
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return

    const newOtp = [...otp]
    newOtp[index] = element.value[0] || ""
    setOtp(newOtp)
    onOtpChange(newOtp.join(""))

    if (element.value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData("text").slice(0, length)
    const newOtp = pasteData.split("").slice(0, length)

    for (let i = newOtp.length; i < length; i++) {
      newOtp[i] = ""
    }

    setOtp(newOtp)
    onOtpChange(newOtp.join(""))

    const lastFilledIndex = newOtp.length > 0 ? newOtp.length - 1 : 0
    inputRefs.current[Math.min(lastFilledIndex, length - 1)]?.focus()
  }

  return (
    <div className="flex space-x-2">
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={data}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target, index)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
          onFocus={(e: ChangeEvent<HTMLInputElement>) => e.target.select()}
          onPaste={handlePaste}
          className={cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-12 h-12 text-center text-lg font-semibold")}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
        />
      ))}
    </div>
  )
}

function VerifyButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-v0-purple text-white hover:bg-v0-purple/90 py-6" aria-disabled={pending}>
      {pending ? "Verifying..." : "Continue"}
    </button>
  )
}
