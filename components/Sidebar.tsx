import { useState } from 'react';
import Link from 'next/link';

// Example Sidebar data type
type SidebarData = {
    title: string;
    links: {
        label: string;
        href: string;
        dropdown?: {
            label: string;
            href: string;
        }[];
    }[];
};

const Sidebar = ({ data }: { data: SidebarData[] }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<{ [key: string]: boolean }>({});

    const toggleDropdown = (label: string) => {
        setIsDropdownOpen((prevState) => ({
            ...prevState,
            [label]: !prevState[label],
        }));
    };

    return (
        <div className="w-64 bg-slate-900 h-screen flex flex-col">
            {data.map((section) => (
                <div key={section.title}>
                    {/* Section Title */}
                    <div className="text-white text-2xl font-bold p-4">
                        {section.title}
                    </div>

                    {/* Links */}
                    <nav className="flex-grow">
                        <ul className="space-y-2">
                            {section.links.map((link) => (
                                <li key={link.label} className="text-gray-300 hover:bg-gray-700 p-4">
                                    {!link.dropdown ? (
                                        <Link href={link.href}>{link.label}</Link>
                                    ) : (
                                        <div className="cursor-pointer" onClick={() => toggleDropdown(link.label)}>
                                            <div className="flex justify-between items-center">
                                                <span>{link.label}</span>
                                                <span>{isDropdownOpen[link.label] ? '-' : '+'}</span>
                                            </div>
                                            {isDropdownOpen[link.label] && (
                                                <ul className="ml-4 mt-2 space-y-2">
                                                    {link.dropdown.map((dropdownItem) => (
                                                        <li key={dropdownItem.label} className="hover:bg-gray-700 p-2">
                                                            <Link href={dropdownItem.href}>{dropdownItem.label}</Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
