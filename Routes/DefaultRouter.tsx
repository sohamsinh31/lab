"use client";
import '@/app/globals.css';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { navbarData } from '@/components/utils/NavbarTestData';
import { sidebarData } from '@/components/utils/SidebarTestData';
import DashboardRoute from '@/Routes/Dashboard';
import ServiceRoute from '@/Routes/ServiceRoute';
import { Routes } from '@/components/utils/RoutesProvider';
import { useSession } from 'next-auth/react';
// import ErrorRoute from '@/Routes/ErrorRoute'; // Create an error page component if needed


const DefaultRoutes = () => {
    const router = useRouter(); // Get the current route info
    const currentPath = router.pathname.split('/')[1];

    // Access session data and loading status
    const { data: session, status } = useSession();

    // Log session data to check its structure
    // console.log('Session data:', session);

    if (status === "loading") {
        return <div>Loading...</div>; // Handle loading state
    }

    if (!session) {
        return <div>Please log in to view this page</div>; // Handle case when user is not authenticated
    }

    // console.log(session.user?.email); //

    // Find the matching route component based on the path
    const ActiveRoute = Routes[currentPath ? currentPath : 'dashboard'] || <div>Error code: 404</div>;

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
