import { useState } from 'react';
import Link from 'next/link';

const Sidebar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState({
        services: false,
        tools: false,
    });

    const toggleDropdown = (dropdown: string) => {
        setIsDropdownOpen((prevState: any) => ({
            ...prevState,
            [dropdown]: !prevState[dropdown],
        }));
    };

    return (
        <div className="w-64 bg-slate-900 h-screen flex flex-col">
            <div className="text-white text-2xl font-bold p-4">
                <Link href="/">Services</Link>
            </div>

            <nav className="flex-grow">
                <ul className="space-y-2">
                    {/* Dashboard Link */}
                    <li className="text-gray-300 hover:bg-gray-700 p-4">
                        <Link href="/">Dashboard</Link>
                    </li>

                    {/* Services Dropdown */}
                    <li className="text-gray-300 hover:bg-gray-700 p-4 cursor-pointer" onClick={() => toggleDropdown('services')}>
                        <div className="flex justify-between items-center">
                            <span>Services</span>
                            <span>{isDropdownOpen.services ? '-' : '+'}</span>
                        </div>
                        {isDropdownOpen.services && (
                            <ul className="ml-4 mt-2 space-y-2">
                                <li className="hover:bg-gray-700 p-2">
                                    <Link href="/ec2">EC2</Link>
                                </li>
                                <li className="hover:bg-gray-700 p-2">
                                    <Link href="/s3">S3</Link>
                                </li>
                                <li className="hover:bg-gray-700 p-2">
                                    <Link href="/rds">RDS</Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Tools Dropdown */}
                    <li className="text-gray-300 hover:bg-gray-700 p-4 cursor-pointer" onClick={() => toggleDropdown('tools')}>
                        <div className="flex justify-between items-center">
                            <span>Tools</span>
                            <span>{isDropdownOpen.tools ? '-' : '+'}</span>
                        </div>
                        {isDropdownOpen.tools && (
                            <ul className="ml-4 mt-2 space-y-2">
                                <li className="hover:bg-gray-700 p-2">
                                    <Link href="/cloudwatch">CloudWatch</Link>
                                </li>
                                <li className="hover:bg-gray-700 p-2">
                                    <Link href="/iam">IAM</Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li className="text-gray-300 hover:bg-gray-700 p-4">
                        <Link href="/billing">Billing</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;