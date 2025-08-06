"use client";
import { useState } from "react";

const AuthPage: React.FC = () => {
  const [showSignup, setShowSignup] = useState(true);
  // Signup state
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user"
  });
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);

  // Signin state
  const [signinForm, setSigninForm] = useState({
    email: "",
    password: ""
  });
  const [signinError, setSigninError] = useState("");
  const [signinLoading, setSigninLoading] = useState(false);
  const [token, setToken] = useState("");

  // Handlers
  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
    setSignupError("");
    setSignupSuccess("");
  };
  const handleSigninChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSigninForm({ ...signinForm, [e.target.name]: e.target.value });
    setSigninError("");
  };

  // Validation
  const validateSignup = () => {
    if (!signupForm.name || !signupForm.email || !signupForm.password || !signupForm.confirmPassword) {
      setSignupError("All fields are required.");
      return false;
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      setSignupError("Passwords do not match.");
      return false;
    }
    return true;
  };
  const validateSignin = () => {
    if (!signinForm.email || !signinForm.password) {
      setSigninError("Email and password are required.");
      return false;
    }
    return true;
  };

  // Submit handlers
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignup()) return;
    setSignupLoading(true);
    try {
      const res = await fetch("https://akil-backend.onrender.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupForm)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");
      setSignupSuccess("Signup successful! Please check your email to verify your account.");
      // Redirect to verify-email page with email as query param
      window.location.href = `/verify-email?email=${encodeURIComponent(signupForm.email)}`;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Signup failed";
      setSignupError(errorMessage);
    } finally {
      setSignupLoading(false);
    }
  };

  const handleSigninSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignin()) return;
    setSigninLoading(true);
    try {
      const res = await fetch("https://akil-backend.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signinForm)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signin failed");
      setToken(data.accessToken || "");
      setSigninError("");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Signin failed";
      setSigninError(errorMessage);
    } finally {
      setSigninLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 rounded-l bg-${showSignup ? "blue-600" : "gray-200"} text-${showSignup ? "white" : "black"}`}
            onClick={() => setShowSignup(true)}
            type="button"
          >
            Sign Up
          </button>
          <button
            className={`px-4 py-2 rounded-r bg-${!showSignup ? "blue-600" : "gray-200"} text-${!showSignup ? "white" : "black"}`}
            onClick={() => setShowSignup(false)}
            type="button"
          >
            Sign In
          </button>
        </div>
        {showSignup ? (
          <form onSubmit={handleSignupSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            {signupError && <div className="text-red-500 mb-4">{signupError}</div>}
            {signupSuccess && <div className="text-green-500 mb-4">{signupSuccess}</div>}
            <input name="name" type="text" placeholder="Name" value={signupForm.name} onChange={handleSignupChange} className="w-full mb-4 px-4 py-2 border rounded" />
            <input name="email" type="email" placeholder="Email" value={signupForm.email} onChange={handleSignupChange} className="w-full mb-4 px-4 py-2 border rounded" />
            <input name="password" type="password" placeholder="Password" value={signupForm.password} onChange={handleSignupChange} className="w-full mb-4 px-4 py-2 border rounded" />
            <input name="confirmPassword" type="password" placeholder="Confirm Password" value={signupForm.confirmPassword} onChange={handleSignupChange} className="w-full mb-4 px-4 py-2 border rounded" />
            <select name="role" value={signupForm.role} onChange={handleSignupChange} className="w-full mb-6 px-4 py-2 border rounded">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={signupLoading}>{signupLoading ? "Signing up..." : "Sign Up"}</button>
          </form>
        ) : (
          <form onSubmit={handleSigninSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
            {signinError && <div className="text-red-500 mb-4">{signinError}</div>}
            {token && <div className="text-green-500 mb-4">Signed in! Token: {token}</div>}
            <input name="email" type="email" placeholder="Email" value={signinForm.email} onChange={handleSigninChange} className="w-full mb-4 px-4 py-2 border rounded" />
            <input name="password" type="password" placeholder="Password" value={signinForm.password} onChange={handleSigninChange} className="w-full mb-6 px-4 py-2 border rounded" />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={signinLoading}>{signinLoading ? "Signing in..." : "Sign In"}</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
