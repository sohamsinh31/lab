import '../app/globals.css';
import type { AppProps } from 'next/app'
import { useSession } from '@/hooks/JWSAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const MyApp = ({ Component, pageProps }: AppProps) => {
    const { user, loading, error, checkSession } = useSession();
    const router = useRouter();

    // Redirect to login if session is not found and not on the login page
    useEffect(() => {
        if (!loading && !user && router.pathname !== '/login') {
            router.push('/login'); // Redirect to login page
        }
    }, [loading, user, router]);

    // While session is being checked, you can show a loading spinner
    if (loading) {
        return <div>Loading session...</div>;
    }

    return (
        <>
            {/* If session exists or on the login page, render the component */}
            {(!loading && user) || router.pathname === '/login' ? (
                <Component {...pageProps} />
            ) : (
                <p>Checking authentication...</p>
            )}
        </>
    );
};

export default MyApp;
