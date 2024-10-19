/* eslint-disable */
import { useEffect, useState } from 'react';

// Example Navbar data type
type NavbarData = {
    label: string;
    href: string;
    dropdown?: {
        label: string;
        href: string;
    }[];
};

const Navbar = ({ data }: { data: NavbarData[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({});
    const [isMounted, setIsMounted] = useState(false); // New state to detect if it's mounted on the client

    // Ensure this runs only after the component has mounted on the client side
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = (label: string) => {
        setDropdownOpen((prevState) => ({
            ...prevState,
            [label]: !prevState[label],
        }));
    };

    if (!isMounted) {
        // While the component is rendering on the server, return null to avoid mismatch
        return null;
    }

    return (
        <nav className="bg-gray-800 p-4 min-w-full">
            <div className="flex justify-between items-center">
                <div className="text-white font-bold text-lg">
                    <a href="/">
                        <img src="/tlabs.png" width={'75px'} height={'100%'} alt="tlabs logo" />
                    </a>
                </div>
                <div>
                    <input className='p-0.5 px-3 ms-[15%] w-[55vh] bg-transparent border rounded-md' type="text" name="search" placeholder='Search here' />
                </div>
                <div className="hidden md:flex space-x-4">
                    {data.map((item) => (
                        <div key={item.label} className="relative group">
                            {!item.dropdown ? (
                                <a href={item.href} className="text-white hover:text-gray-400">
                                    {item.label}
                                </a>
                            ) : (
                                <div>
                                    <button
                                        className="text-white hover:text-gray-400 flex items-center"
                                        onClick={() => toggleDropdown(item.label)}
                                    >
                                        {item.label}
                                        <span className="ml-2">
                                            {dropdownOpen[item.label] ? (
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 15l7-7 7 7"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            )}
                                        </span>
                                    </button>
                                    {dropdownOpen[item.label] && (
                                        <div className="absolute mt-2 bg-gray-700 rounded-md shadow-lg z-10">
                                            <ul className="py-2">
                                                {item.dropdown.map((dropdownItem) => (
                                                    <li key={dropdownItem.label} className="hover:bg-gray-600 p-2">
                                                        <a key={dropdownItem.label} href={dropdownItem.href} className="block text-white hover:text-gray-400">
                                                            {dropdownItem.label}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="md:hidden flex items-center">
                    <button
                        className="text-white focus:outline-none"
                        onClick={toggleMenu}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                            />
                        </svg>
                    </button>
                </div>

                {isOpen && (
                    <div className="md:hidden bg-gray-700 flex flex-col space-y-2 mt-2 p-4">
                        {data.map((item) => (
                            <div key={item.label} className="relative">
                                {!item.dropdown ? (
                                    <a href={item.href} className="text-white hover:text-gray-400">
                                        {item.label}
                                    </a>
                                ) : (
                                    <div>
                                        <button
                                            className="text-white hover:text-gray-400 flex items-center"
                                            onClick={() => toggleDropdown(item.label)}
                                        >
                                            {item.label}
                                            <span className="ml-2">
                                                {dropdownOpen[item.label] ? (
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 15l7-7 7 7"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                )}
                                            </span>
                                        </button>
                                        {dropdownOpen[item.label] && (
                                            <div className="bg-gray-700 p-2 rounded-md shadow-lg z-10">
                                                <ul className="space-y-2">
                                                    {item.dropdown.map((dropdownItem) => (
                                                        <li key={dropdownItem.label} className="hover:bg-gray-600 p-2">
                                                            <a href={dropdownItem.href} className="text-white hover:text-gray-400">
                                                                {dropdownItem.label}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
