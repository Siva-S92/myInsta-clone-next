// route.js or NextAuth configuration file
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Store the Google access token in the token object if available
      if (account && account.provider === "google") {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach the access token to the session object
      session.accessToken = token.accessToken;
      session.user.username = session.user.name.split(" ").join("").toLowerCase();
      session.user.uid = token.sub;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
