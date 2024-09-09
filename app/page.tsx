"use client";
import './globals.css';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { sidebarData } from '@/components/utils/SidebarTest';

const App = () => {
  return (
    <div className='container min-w-full'>
      <Navbar />
      <Sidebar data={sidebarData} />
    </div>
  )
}

export default App;