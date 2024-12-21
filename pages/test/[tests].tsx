"use client";
import '@/app/globals.css';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { navbarData } from '@/components/utils/NavbarTestData';
import { sidebarData } from '@/components/utils/SidebarTestData';
import { useSession } from "next-auth/react";
import { useEffect } from 'react';
import { PGRoutes } from '@/Providers/RouteProviders/PlaygroundRoutes';


const DefaultRoutes = () => {
    const router = useRouter();
    const { slug } = router.query;
    // Access session data and loading status
    const { data: session, status } = useSession();

    useEffect(() => {
        // Redirect only if the session is unauthenticated and not loading
        if (status === "unauthenticated") {
            router.push("/auth/login");
        }
    }, [status, router]);

    // Show loading state if session is still loading
    if (status === "loading") {
        return <div>Loading...</div>;
    }

    // console.log(session!.user?.email); 

    // Find the matching route component based on the slug
    const currentPath = slug ? slug.toString() : 'dashboard'; // Ensure slug is a string

    const ActiveRoute = PGRoutes[currentPath] || null;

    return (
        <div>
            <Navbar data={navbarData} />
            <div className='flex'>
                <Sidebar data={sidebarData} />
                {ActiveRoute ? <ActiveRoute /> : <div>Error code: 404</div>}
            </div>
        </div>
    );
};

export default DefaultRoutes;
