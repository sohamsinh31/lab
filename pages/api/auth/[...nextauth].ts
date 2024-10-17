import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GAUTH_ID || '',
            clientSecret: process.env.NEXT_PUBLIC_GAUTH_SEC || '',
            authorization: {
                params: {
                    scope: "https://www.googleapis.com/auth/gmail.send email profile https://www.googleapis.com/auth/gmail.readonly",
                },
            },
        }),
    ],
    secret: process.env.NEXT_PUBLIC_SEC,
    debug: true,
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
        async signIn({ user, account, profile }) {
            const userData = {
                email: user.email,
                username: user.name,
                image: user.image,
                provider: account?.provider || "google",
                providerAccountId: account?.providerAccountId,
            };

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_JWS_URL}/api/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Failed to save user data to backend:", errorData);
                }
                // Continue with sign-in even if backend fails
                return true;
            } catch (error) {
                console.error("Error saving user data:", error);
                return true; // Continue with sign-in even in case of error
            }
        }
    },
});
