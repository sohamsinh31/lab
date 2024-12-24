"use client";
import { JLogin } from "@/components/services/JLogin/Login.service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Google, Logout } from "@mui/icons-material";
import Link from "next/link";
import { parseCookies } from "nookies";
import PasswordInput from "@/components/ui/PasswordInput";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();

  console.log(password);

  useEffect(() => {
    if (session) {
      // console.log(session);
      router.push("/");
    }
  }, [session]);

  // console.log(session);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    signIn("credentials", {
      username: username,
      password: password,
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
    <div className="bg-gray-900 h-screen flex justify-center items-center text-gray-200 px-4 overflow-hidden">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-500">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-200"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <PasswordInput password={password} setPassword={setPassword} />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
          {error && <div className="text-red-500 mt-3">{error}</div>}
          {success && (
            <div className="text-green-500 mt-3">Login successful!</div>
          )}
        </form>
        <div className="mt-6 flex flex-col space-y-3">
          <button
            className="flex items-center justify-center p-2 border border-gray-600 rounded-lg bg-transparent text-gray-400 hover:bg-gray-700 transition"
            onClick={() => signIn("google")}
          >
            <Google className="mr-2" /> Sign in with Google
          </button>
          <button
            className="flex items-center justify-center p-2 border border-gray-600 rounded-lg bg-transparent text-gray-400 hover:bg-gray-700 transition"
            onClick={() => signOut()}
          >
            <Logout className="mr-2" /> Sign Out
          </button>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/legal/google"
            className="text-indigo-400 hover:underline"
          >
            Privacy for Google
          </Link>
          <span className="mx-2">|</span>
          <Link href="/legal" className="text-indigo-400 hover:underline">
            Privacy for All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
