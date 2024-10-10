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

const DefaultRoutes = () => {
    const router = useRouter();
    const { slug } = router.query;

    console.log(slug);

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
