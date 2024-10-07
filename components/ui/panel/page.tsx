/* eslint-disable */
"use client"
import React, { useEffect, useState } from 'react';
import "./panel.css"
import Navbar from '@/app/Components/Navbar';
import SideMenu from '@/app/Components/SideMenu/SideMenu';
import { ThemeProvider, useTheme } from '@/app/Utils/Theme/ThemeProvider';
import DataTable from '../tables/DataTable';
import UsersTable from '../tables/UsersTable';
import Dashboard from '@/app/dashboard/page';

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <ThemeAppContent />
        </ThemeProvider>
    );
};

const ThemeAppContent: React.FC = () => {
    const { theme } = useTheme();
    const [selectedPage, setSelectedPage] = useState<string>('Dashboard');
    const [isBlurred, setIsBlurred] = useState<boolean>(false);

    // Function to toggle blur state
    const toggleBlur = () => {
        setIsBlurred(!isBlurred);
    };

    useEffect(() => {
        const ISSERVER = typeof window === "undefined";
        const uid = ISSERVER ? '' : localStorage.getItem('id' + process.env.NEXT_PUBLIC_TOKEN);
        // console.log(uid)
        if (uid === '' || uid == null) {
            window.location.href = '/login';
        }
    }, []); // Empty dependency array ensures this runs only once after component mount

    const handleMenuClick = (page: string) => {
        setSelectedPage(page);
    };

    const links = [
        { name: "Dashboard", component: <Dashboard /> },
        { name: "Manage Data", component: <DataTable /> },
        { name: "Manage Users", component: <UsersTable /> },
    ];

    return (
        <div style={{ background: theme.background, minHeight: '100vh' }}>
            <Navbar toggleBlur={toggleBlur} />
            <div className="app-container">
                <SideMenu onMenuClick={handleMenuClick} links={links} />
                <div className="content-container">
                    {links.map((link) => selectedPage === link.name && link.component)}
                </div>
            </div>
        </div>
    );
};

export default App;
