"use client";
import { JLogin } from '@/components/services/JLogin/Login.service';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { Google, Logout } from '@mui/icons-material';
import Link from 'next/link';

const Login: React.FC = () => {
    const router = useRouter();
    const { data: session } = useSession();

    // useEffect(() => {

    //     if (!session) {
    //         router.push("/");
    //     }

    // }, [session])



    return (
        <div className="bg-gray-100 h-screen flex justify-center items-center text-black">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Logout</h2>
                <button className='p-2 m-1 border border-b-slate-600 rounded-3xl bg-transparent text-slate-600' onClick={() => signOut()}><Logout /></button>
                <div className="row">
                    <div>
                        <Link className='text-blue-700 m-2 p-1' href="/legal/google">Privacy for google</Link>
                        <a href="/legal">Privacy for all</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
