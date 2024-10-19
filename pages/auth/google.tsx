import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
    const { data: session } = useSession();

    if (session) {
        return (
            <>
                <p>Welcome, {session.user?.email}!</p>
                <button onClick={() => signOut()}>Sign out</button>
            </>
        );
    }

    return (
        <>
            <p>You are not logged in</p>
            <button onClick={() => signIn("google")}>Sign in with Google</button>
        </>
    );
}
