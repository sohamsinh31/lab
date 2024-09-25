"use client";
import '../app/globals.css';
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const MyApp = ({ Component, pageProps }: AppProps) => {
    

    return (
        <Component {...pageProps} />
    );
};

export default MyApp;
