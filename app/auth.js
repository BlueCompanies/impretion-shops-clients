import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import findOne from "./_lib/queries/findOne";

export const runtime = "edge";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials === null) return null;

        try {
          const user = "call function to fetch user data";
          if (user) {
            // here match password!
            const isMatch = "here";
            if (isMatch) {
              return user;
            } else {
              throw new Error("Chequea datos!");
            }
          } else {
          }
        } catch (error) {
          throw new Error("Error: ", error);
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        const data = await findOne("client-accounts", {
          email: profile.email,
        });

        if (!data) {
          return "/unauthorized";
        }
      }
      return true;
    },

    async redirect({ url, baseUrl }) {
      console.log("redirect: ", url, baseUrl);
      return baseUrl;
    },
    async session({ session, user, token }) {
      console.log("session: ", session, user, token);

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("jwt: ", token, user, account, profile);

      return token;
    },
  },
});
