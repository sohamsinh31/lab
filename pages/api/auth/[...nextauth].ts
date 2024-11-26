import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import async from '../gmail/read';

const authOptions: NextAuthOptions = {
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
        // Username and Password Login Provider
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { username, password } = credentials || {};

                console.log(JSON.stringify({ username, password }))

                try {
                    // Send a POST request to the Java backend for verification
                    const response = await fetch(`${process.env.NEXT_PUBLIC_JWS_URL}/api/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ username, password }),
                    });

                    // If the response is OK, extract user data
                    if (response.ok) {
                        const user = await response.json();
                        if (user && user.token) {
                            return {
                                id: user.id,
                                name: username,
                                email: user.email,
                                image: user.image,
                                jwtToken: user.token, // JWT from backend
                            };
                        }
                    } else {
                        console.error("Login failed:", await response.json());
                    }
                } catch (error) {
                    console.error("Error during login:", error);
                }

                return null; // Return null to indicate login failure
            },
        }),
    ],
    secret: process.env.NEXT_PUBLIC_SEC,
    debug: true,
    callbacks: {
        async signIn({ user, account }) {
            // Ensure account is not null before proceeding
            if (!account) {
                console.error("No account information available.");
                return false; // Prevent sign-in
            }

            const userData = {
                email: user.email,
                username: user.name,
                image: user.image,
                provider: account.provider || "google",
                providerAccountId: account.providerAccountId,
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
                    account.tokens = account.access_token;
                    // Attach the JWT token from backend to the account object
                    account.jwtToken = responseData.token; // Ensure this is the correct path to the token
                    return true; // Allow sign-in
                } else {
                    const errorData = await response.json();
                    console.error("Failed to save user data to backend:", errorData);
                    return false; // Prevent sign-in on failure
                }
            } catch (error) {
                console.error("Error saving user data:", error);
                return false; // Prevent sign-in on error
            }
        },

        async jwt({ token, account }) {
            // Attach both JWT token and access token to the token object
            if (account) {
                token.jwtToken = account.jwtToken; // JWT from your backend
                token.tokens = account.access_token
                token.accessToken = account.accessToken; // Access token from Google
                token.accessTokenExpires = account.expires_at ? account.expires_at * 1000 : null;
            }
            return token;
        },

        async session({ session, token }: { session: any; token: JWT }) {
            // Pass both JWT token and access token to the session object
            session.jwtToken = token.jwtToken;
            session.accessToken = token.accessToken;
            session.tokens = token.tokens;
            session.accessTokenExpires = token.accessTokenExpires;
            return session;
        }
    },
};

export default NextAuth(authOptions);
