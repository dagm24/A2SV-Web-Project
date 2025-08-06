"use server";
import { redirect } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://akil-backend.onrender.com";

export async function signupUser(formData: FormData | undefined) {
  if (!formData) return;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const role = "customer";
  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, confirmPassword, role }),
    });
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    if (!response.ok) {
      // Return error, do not redirect
      return { error: data.message || "Failed to sign up." };
    }
    // Only redirect on success
    redirect(`/auth/verify-email?email=${encodeURIComponent(email)}`);
    return { success: true, message: "Signup successful! Please verify your email." };
  } catch (error: unknown) {
    console.error("Signup error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    return { error: errorMessage };
  }
}

export async function verifyEmail(prevState: { error?: string; success?: boolean; message?: string } | undefined, formData: FormData) {
  if (!formData) {
    return { error: "No form data provided." };
  }
  const email = formData.get("email") as string;
  const otp = formData.get("otp") as string;
  try {
    const response = await fetch(`${API_BASE_URL}/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, OTP: otp }),
    });
    const data = await response.json();
    if (!response.ok) {
      return { error: data.message || "Failed to verify email." };
    }
    return { success: true, message: "Email verified successfully! You can now log in." };
  } catch (error: unknown) {
    console.error("Email verification error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred during email verification.";
    return { error: errorMessage };
  }
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    const credentials: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      credentials[key] = value as string;
    }
    // Call your backend API to check credentials
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    if (!response.ok) {
      return data.message || "Invalid email or password.";
    }
    // Success: let client handle signIn
    return undefined;
  } catch (error: unknown) {
    console.error("Login error:", error);
    const errorMessage = error instanceof Error ? error.message : "Something went wrong.";
    return errorMessage;
  }
}

export {}
