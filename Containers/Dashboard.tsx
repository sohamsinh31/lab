import React from "react";
import { useSession } from "next-auth/react";
import SCard from "@/components/ui/Cards/SCard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import MemoryIcon from "@mui/icons-material/Memory";
import ScienceIcon from "@mui/icons-material/Science";
import WatchIcon from "@mui/icons-material/Watch";
import PublicIcon from "@mui/icons-material/Public";
import EmailIcon from "@mui/icons-material/Email";
import WorkspacesIcon from "@mui/icons-material/Workspaces";

const icostyle = {
  default: {
    width: "6vh",
    height: "6vh",
    borderRadius: "7px",
  },
};

const serviceico = [
  {
    label: "Users",
    description: "Manage your users settings.",
    styles: {
      background: "linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)",
    },
    icon: (
      <AccountCircleIcon fontSize="small" style={{ ...icostyle.default }} />
    ),
    link: "#",
  },
  {
    label: "Resources",
    description: "Manage your current account's billing method.",
    styles: {
      background: "linear-gradient(135deg, #FF5F6D 0%, #FFC371 100%)",
    },
    icon: <WarehouseIcon fontSize="small" style={{ ...icostyle.default }} />,
  },
  {
    label: "Computes",
    description: "Manage Computer Servers",
    styles: { color: "aqua" },
    icon: <MemoryIcon />,
  },
  {
    label: "Labs",
    description: "Labs for everyone",
    styles: { color: "lightpink" },
    icon: <ScienceIcon />,
  },
  {
    label: "Scheduler",
    description: "Manage Session Time of labs and resources.",
    styles: {
      background:
        "linear-gradient(135deg, rgb(63 45 60) 0%, rgb(200 83 229) 100%)",
    },
    icon: <WatchIcon style={{ ...icostyle.default }} />,
  },
  {
    label: "Manage Website",
    description: "Manage component of all websites.",
    styles: { color: "blue" },
    icon: <PublicIcon />,
    link: "/services",
  },
  {
    label: "EMailer",
    description: "Keep in touch with communications.",
    styles: {
      background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
    },
    icon: <EmailIcon />,
    link: "/mail",
  },
  {
    label: "SRG",
    description: "Service Resource Groups.",
    styles: {
      background: "linear-gradient(135deg, #ff8c00 0%, #ffcc66 100%)",
    },
    icon: <WorkspacesIcon />,
    link: "/srg",
  },
];

const Dashboard: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col p-4 w-full">
      {/* Welcome Message */}
      <div className="text-2xl font-semibold mb-6 text-gray-900 ">
        Welcome, {session?.user?.name || "User"}
      </div>

      {/* Cloud Services Section */}
      <div className="bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-100">
          Manage Cloud Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {serviceico.map((item, index) => (
            <SCard
              key={index}
              icon={React.cloneElement(item.icon, {
                style: { ...icostyle.default, ...item.styles },
              })}
              title={item.label}
              description={item.description}
              linkurl={item.link || ""}
            />
          ))}
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-gray-800 shadow-md rounded-lg p-4 mt-6 max-w-md">
        <h2 className="text-lg font-medium mb-2 text-gray-100">
          Notifications
        </h2>
        <p className="text-sm text-gray-400 truncate">
          This is a demo notification for User1.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
