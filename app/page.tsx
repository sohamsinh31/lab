"use client";
import './globals.css';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { navbarData } from '@/components/utils/NavbarTestData';
import { sidebarData } from '@/components/utils/SidebarTestData';
import DashboardRoute from './Routes/Dashboard';

const App = () => {
  return (
    <div className='container min-w-full'>
      <Navbar data={navbarData} />
      <div className='flex min-w-[100vh]'>
        <Sidebar data={sidebarData} />
        <DashboardRoute />
      </div>
    </div>
  )
}

export default App;