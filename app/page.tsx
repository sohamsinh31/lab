"use client";
import './globals.css';
import type { AppProps } from 'next/app';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export const App = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
    </div>
  )
}

export default App;