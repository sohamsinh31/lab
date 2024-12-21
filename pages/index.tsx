"use client";
import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { navbarData } from '@/components/utils/NavbarTestData';
import { sidebarData } from '@/components/utils/SidebarTestData';
import DefaultRoutes from '@/Routes/DefaultRouter';

const App = () => {
  return (
    <DefaultRoutes />
  )
}

export default App;