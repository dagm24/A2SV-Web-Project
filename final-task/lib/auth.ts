import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  pendingVerificationEmail: string | null;
  hasHydrated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  verifyEmail: (email: string, otp: string) => Promise<void>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setHasHydrated: (hydrated: boolean) => void;
}

const API_BASE_URL = "https://akil-backend.onrender.com";

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      pendingVerificationEmail: null,
      hasHydrated: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Login failed");
          }

          const data = await response.json();
          set({ user: data.data, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (
        name: string,
        email: string,
        password: string,
        confirmPassword: string
      ) => {
        set({ isLoading: true });
        try {
          const response = await fetch(`${API_BASE_URL}/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password,
              confirmPassword,
              role: "user", // ensuring role is lowercase "user" as required
            }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Registration failed");
          }

          set({
            pendingVerificationEmail: email,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      verifyEmail: async (email: string, otp: string) => {
        set({ isLoading: true });
        try {
          const response = await fetch(`${API_BASE_URL}/verify-email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, OTP: otp }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Verification failed");
          }

          const data = await response.json();
          set({
            user: data.data,
            pendingVerificationEmail: null,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, pendingVerificationEmail: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
      setHasHydrated: (hydrated: boolean) => {
        set({ hasHydrated: hydrated });
      },
    }),
    {
      name: "auth-storage",
      // Ensure we know when Zustand rehydration from storage is done
      onRehydrateStorage: () => (state, error) => {
        // Mark as hydrated regardless of success or failure, so routing can proceed deterministically
        try {
          state?.setHasHydrated?.(true);
        } catch (_) {
          // no-op
        }
      },
    }
  )
);
