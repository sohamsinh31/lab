"use client";
import '../app/globals.css';
import type { AppProps } from 'next/app'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from "next-auth/react";
import { useSessionExpirationCheck } from '@/hooks/usSessionExpiry';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {

    return (
        <SessionProvider session={session}>
            <SessionExpirationWrapper>
                <Component {...pageProps} />
                <ToastContainer />
            </SessionExpirationWrapper>
        </SessionProvider>
    );
};

// A wrapper component to use the hook
function SessionExpirationWrapper({ children }: { children: React.ReactNode }) {
    useSessionExpirationCheck();
    return <>{children}</>;
}

export default MyApp;
