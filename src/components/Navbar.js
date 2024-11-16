import React, { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <nav className="fixed w-full top-0 left-0 bg-transparent backdrop-blur-md dark:bg-blue-950 dark:text-slate-200 shadow-md z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold site-name">
                            Xiaoya.greet()
                        </Link>
                        {/* <DarkModeToggle /> */}
                    </div>
                    <div className="hidden md:flex space-x-4 font-bold">
                        <Link to="/" className="hover:text-indigo-500 dark:hover:text-teal-300 px-3 py-2 rounded-md text-sm">
                            Home
                        </Link>
                        <Link to="/about" className="hover:text-indigo-500 dark:hover:text-teal-300 px-3 py-2 rounded-md text-sm">
                            About
                        </Link>
                        <Link to="/services" className="hover:text-indigo-500 dark:hover:text-teal-300 px-3 py-2 rounded-md text-sm">
                            Experience
                        </Link>
                        <Link to="/projects" className="hover:text-indigo-500 dark:hover:text-teal-300 px-3 py-2 rounded-md text-sm">
                            Projects
                        </Link>
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="text-gray-300 hover:text-white focus:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
                            Home
                        </Link>
                        <Link to="/about" className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
                            About
                        </Link>
                        <Link to="/services" className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
                            Projects
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
