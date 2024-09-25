"use client";
import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { navbarData } from '@/components/utils/NavbarTestData';
import { sidebarData } from '@/components/utils/SidebarTestData';
import DashboardRoute from '../Routes/Dashboard';
import ServiceRoute from '@/Routes/ServiceRoute';

const DefaultRoutes = () => {
    return (
        <div className='flex min-w-[100vh]'>
            <ServiceRoute />
        </div>
    )
}

export default DefaultRoutes;