import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 p-4 min-w-full">
            <div className=" flex justify-between items-center">
                <div className="text-white font-bold text-lg">
                    <Link href="/"><img src="tlabs.png" width={'89px'} height={'100%'} alt="tlabs logo" /></Link>
                    <div className=""><input type="text" name="" id="" /></div>
                </div>
                <div className="hidden md:flex space-x-4">
                    <Link href="/" className="text-white hover:text-gray-400">
                        Home
                    </Link>
                    <Link href="/about" className="text-white hover:text-gray-400">
                        About
                    </Link>
                    <Link href="/services" className="text-white hover:text-gray-400">
                        Services
                    </Link>
                    <Link href="/contact" className="text-white hover:text-gray-400">
                        Contact
                    </Link>
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
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-gray-700 flex flex-col space-y-2 mt-2 p-4">
                    <Link href="/" className="text-white hover:text-gray-400">
                        Home
                    </Link>
                    <Link href="/about" className="text-white hover:text-gray-400">
                        About
                    </Link>
                    <Link href="/services" className="text-white hover:text-gray-400">
                        Services
                    </Link>
                    <Link href="/contact" className="text-white hover:text-gray-400">
                        Contact
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
