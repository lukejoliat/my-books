import { prisma } from "@/server/db";
import { profile } from "console";
import NextAuth, { NextAuthOptions, Profile } from "next-auth"
import GithubProvider, { GithubProfile } from "next-auth/providers/github"

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: '5b445b8e8e8752d8a57b',
      clientSecret: '52da311615b5ea4808b91997d176dcc93f9f2e7e',
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ account, profile }) {
        const prof = profile as GithubProfile;

        if (account && prof && prof.email && prof.id) {
          const existingProfile = await prisma.user.findUnique({ where: { id: `${prof.id}` }})
          if (existingProfile) return true; 
          await prisma.user.create({data: { id: `${prof.id}`, name: prof.login, username: prof.login }})
          return true;
        }
        return true;
      },
  }
}

export default NextAuth(authOptions)