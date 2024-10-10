import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GAUTH_ID || '',
            clientSecret: process.env.NEXT_PUBLIC_GAUTH_SEC || '',
            authorization: {
                params: {
                    scope: "https://www.googleapis.com/auth/gmail.send email profile",
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
});
