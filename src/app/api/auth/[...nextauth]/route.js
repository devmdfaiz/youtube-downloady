import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials, req) {
        if(credentials){
          return credentials
        }

        return null
      }
    })
  ],

  callbacks: {
    async redirect() {
      return `${process.env.NEXTAUTH_URL}/admin`;
    },
  },
});

export { handler as GET, handler as POST };
