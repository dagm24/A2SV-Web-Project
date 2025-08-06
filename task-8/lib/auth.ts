
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      email?: string;
      name?: string;
      role?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    email?: string;
    name?: string;
    role?: string;
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://akil-backend.onrender.com"

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/signup",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email ?? "",
              password: credentials?.password ?? "",
            }),
          });

          let user = null;
          try {
            user = await response.json();
          } catch {
            // If response is not valid JSON, treat as failed login
            return null;
          }

          if (!response.ok || !user || !user.accessToken) {
            return null;
          }

          return {
            ...user,
            id: user.email ?? "",
            role: user.role ?? "user",
            name: user.name ?? "",
            email: user.email ?? ""
          };
        } catch {
          // On network or other error, return null for NextAuth to handle
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && typeof user === "object") {
        // User object is available on first sign in
        if ("accessToken" in user) token.accessToken = (user as { accessToken: string }).accessToken;
        if ("email" in user && user.email != null) token.email = user.email as string;
        if ("name" in user && user.name != null) token.name = user.name as string;
        if ("role" in user) token.role = (user as { role?: string }).role ?? "user";
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, such as accessToken from a custom provider.
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      if (!session.user) session.user = {};
      if (token.email) {
        session.user.email = token.email as string;
      }
      if (token.name) {
        session.user.name = token.name as string;
      }
      if (token.role) {
        session.user.role = token.role as string;
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { GET, POST } = NextAuth(authOptions);
