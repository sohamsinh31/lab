"use client";
import '@/app/globals.css';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { navbarData } from '@/components/utils/NavbarTestData';
import { sidebarData } from '@/components/utils/SidebarTestData';
import DashboardRoute from '@/Routes/Dashboard';
import ServiceRoute from '@/Routes/ServiceRoute';

// Predefined routes map
const routes: any = {
    "dashboard": DashboardRoute,
    "services": ServiceRoute,
};

const DefaultRoutes = () => {
    const router = useRouter(); // Get the current route info
    const { slug } = router.query; // Get the dynamic slug from the URL

    console.log(slug); // 'services', 'dashboard', etc.

    // Find the matching route component based on the slug
    const currentPath = slug ? slug.toString() : 'dashboard'; // Ensure slug is a string

    const ActiveRoute = routes[currentPath] || null;

    return (
        <div>
            <Navbar data={navbarData} />
            <div className="flex min-w-[100vh]">
                <Sidebar data={sidebarData} />
                {ActiveRoute ? <ActiveRoute /> : <div>Error code: 404</div>}
            </div>
        </div>
    );
};

export default DefaultRoutes;
