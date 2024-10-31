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

                if (response.ok) {
                    const responseData = await response.json();
                    // Attach the JWT token to be passed to the jwt callback
                    account!.jwtToken = responseData.token;
                    return true;
                } else {
                    const errorData = await response.json();
                    console.error("Failed to save user data to backend:", errorData);
                }
                return true; // Allow sign-in regardless of backend result
            } catch (error) {
                console.error("Error saving user data:", error);
                return true; // Continue with sign-in even in case of error
            }
        },

        async jwt({ token, account }) {
            // Attach the JWT token from the signIn response to the token object
            if (account && account.jwtToken) {
                token.jwtToken = account.jwtToken;
            }
            return token;
        },

        async session({ session, token }: any) {
            // Pass the JWT token to the session object so it can be accessed in the frontend
            session.jwtToken = token.jwtToken;
            return session;
        }
    },
});
