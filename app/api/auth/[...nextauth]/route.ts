import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        hallTicket: { label: "Hall Ticket", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("1. Login attempt for:", credentials?.hallTicket);
        
        if (!credentials?.hallTicket || !credentials?.password) {
          console.log("Failed: Missing credentials");
          return null;
        }

        try {
          console.log("2. Reaching out to the database...");
          const user = await prisma.user.findUnique({ 
            where: { hallTicket: credentials.hallTicket } 
          });
          
          console.log("3. Database responded. User found in DB:", user ? "YES" : "NO");

          if (!user) return null;

          console.log("4. Checking password hash...");
          const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);
          
          console.log("5. Password match result:", isPasswordValid);

          if (!isPasswordValid) return null;

          console.log("6. Login SUCCESS! Returning user data.");
          return { id: user.id, role: user.role, hallTicket: user.hallTicket };

        } catch (error) {
          console.error("CRITICAL DATABASE ERROR DURING LOGIN:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    // @ts-ignore
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id; 
      }
      return token;
    },
    // @ts-ignore
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id; 
      }
      return session;
    }
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
