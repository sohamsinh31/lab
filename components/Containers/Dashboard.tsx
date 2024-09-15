import CardFA from "../ui/Cards/Card";
import { colors, Grid } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WarehouseIcon from '@mui/icons-material/Warehouse'; import React from "react";
import SCard from "../ui/Cards/SCard";
import MemoryIcon from '@mui/icons-material/Memory';
import ScienceIcon from '@mui/icons-material/Science';
import WatchIcon from '@mui/icons-material/Watch';

const icostyle = {
    default: {
        width: '62px',
        height: '62px',
        borderRadius: '14px',
    }
};

const serviceico = [
    {
        label: "Users",
        description: "Manage your users settings.",
        styles: { background: "linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)" },
        icon: <AccountCircleIcon style={{ ...icostyle.default }} />, // Correct the usage here
    },
    {
        label: "Resources",
        description: "Manage your current account's billing method.",
        styles: { background: "linear-gradient(135deg, #FF5F6D 0%, #FFC371 100%)" },
        icon: <WarehouseIcon style={{ ...icostyle.default }} />,
    },
    {
        label: "Computes",
        description: "Manage Computer Servers",
        styles: { color: 'aqua' },
        icon: <MemoryIcon />
    },
    {
        label: "Labs",
        description: "Labs for everyone",
        styles: { color: 'lightpink' },
        icon: <ScienceIcon />
    },
    {
        label: "Scheduler",
        description: "Manage Session Time of labs and resources.",
        styles: { background: "linear-gradient(135deg, rgb(63 45 60) 0%, rgb(200 83 229) 100%)", color: "" },
        icon: <WatchIcon style={{ ...icostyle.default }} />
    }
];

const Dashboard = () => {
    return (
        <div className="m-4">
            <div className="columns-12 grid grid-flow-col space-x-3 p-1">
                <div className="col-span-7 block border rounded-md border-opacity-20">
                    <div className="text-lg p-3">Manage Cloud Services </div>
                    <div className="m-2 p-2" style={{ borderRadius: '14px' }}>
                        <Grid container spacing={2}>
                            {serviceico.map((item, index) => (
                                <SCard
                                    key={index}
                                    icon={React.cloneElement(item.icon, {
                                        style: { ...icostyle.default, ...item.styles }
                                    })}
                                    title={item.label}
                                    description={item.description}
                                />
                            ))}
                        </Grid>
                    </div>

                </div>
                <div className="col-span-5 block border rounded-md border-opacity-20 p-2">
                <div className="text-lg p-3">Notifications:</div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;