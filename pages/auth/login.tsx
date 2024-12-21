"use client";
import { JLogin } from '@/components/services/JLogin/Login.service';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { Google, Logout } from '@mui/icons-material';
import Link from 'next/link';
import { parseCookies } from 'nookies';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {

        if (session) {
            // console.log(session);
            router.push("/");
        }

    }, [session])

    // console.log(session);


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        signIn("credentials", {
            username: username,
            password: password
        });

        // Clear previous messages
        // setError(null);
        // setSuccess(false);

        // // Set credentials in JLogin
        // JLogin.setCredentials(username, password);

        // // Create a new instance of JLogin and process login request
        // const loginInstance = new JLogin();
        // try {
        //     await loginInstance.processRequest();

        //     // If there's an error in the response, set the error state.
        //     if (loginInstance.error.state == false) {
        //         setSuccess(true);
        //         router.push('/');

        //     } else {
        //         setError(loginInstance.error.message);
        //     }
        // } catch (err) {
        //     // Handle any unexpected errors
        //     if (!success) {
        //         setError('An error occurred during login.');
        //     }
        // }
    };


    return (
        <div className="bg-gray-100 h-screen flex justify-center items-center text-black">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300">
                        Login
                    </button>
                    {error && <div className="text-red-500 mt-3">{error}</div>}
                    {success && <div className="text-green-500 mt-3">Login successful!</div>}
                </form>
                <button className='p-2 m-1 border border-b-slate-600 rounded-3xl bg-transparent text-slate-600' onClick={() => signIn("google")}><Google /></button>
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
