"use client";
import '@/app/globals.css';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { navbarData } from '@/components/utils/NavbarTestData';
import { sidebarData } from '@/components/utils/SidebarTestData';
import { Routes } from '@/components/utils/RoutesProvider';
import { useSession } from "next-auth/react";


const DefaultRoutes = () => {
    const router = useRouter();
    const { slug } = router.query;
    // Access session data and loading status
    const { data: session, status } = useSession();

    // Log session data to check its structure
    // console.log('Session data:', session);

    if (status === "loading") {
        return <div>Loading...</div>; // Handle loading state
    }

    if (!session) {
        router.push("/auth/login");
    }

    // console.log(session!.user?.email); 

    // Find the matching route component based on the slug
    const currentPath = slug ? slug.toString() : 'dashboard'; // Ensure slug is a string

    const ActiveRoute = Routes[currentPath] || null;

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
