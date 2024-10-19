"use client";
import '../app/globals.css';
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SessionProvider } from "next-auth/react";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {


    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
};

export default MyApp;
