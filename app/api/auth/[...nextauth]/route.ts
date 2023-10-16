import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const config: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    // get google id_token and add it to the user object with types for typescript
    async jwt({ token, user, account }) {
      if (account?.provider === "google" && account?.id_token) {
        token.id_token = account.id_token;
      }
      return token;
    },
    async session({session, token}) {
      session.googleId = token.id_token;
      return session;
    }
  },

};

const handler = NextAuth(config)

export { handler as GET, handler as POST }
