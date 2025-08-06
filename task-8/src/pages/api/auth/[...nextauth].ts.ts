import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import type { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const res = await fetch("https://akil-backend.onrender.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password
            })
          });
          if (!res.ok) {
            console.log("[NextAuth] Login failed: status", res.status);
            return null;
          }
          let user = null;
          try {
            user = await res.json();
          } catch (jsonErr) {
            console.log("[NextAuth] Invalid JSON from backend /login", jsonErr);
            return null;
          }
          console.log("[NextAuth] Backend /login returned:", user);
          if (user && user.accessToken) {
            return user;
          }
          return null;
        } catch (e) {
          console.log("[NextAuth] Exception in authorize", e);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && typeof user === "object" && "accessToken" in user) {
        token.accessToken = (user as { accessToken: string }).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    }
  }
};

export default NextAuth(authOptions);
