import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full top-0 left-0 bg-white bg-opacity-90 shadow-md z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left Section */}
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-xl font-bold site-name">
                            Xiaoya
                        </Link>
                        <div className="flex space-x-3">
                            <a
                                href="https://www.linkedin.com/in/your-linkedin-profile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-[#dd8ea4]"
                            >
                                <FaLinkedin size={20} />
                            </a>
                            <a
                                href="https://github.com/your-github-profile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hhover:text-[#dd8ea4]"
                            >
                                <FaGithub size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="hidden md:flex space-x-4 font-bold">
                        <Link to="/" className="hover:text-[#dd8ea4] px-3 py-2 rounded-md text-sm">
                            Home
                        </Link>
                        <Link to="/about" className="hover:text-[#dd8ea4] px-3 py-2 rounded-md text-sm">
                            About
                        </Link>
                        <Link to="/projects" className="hover:text-[#dd8ea4] px-3 py-2 rounded-md text-sm">
                            Projects
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="text-gray-600 hover:text-indigo-500 focus:outline-none"
                        >
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block hover:text-[#dd8ea4] px-3 py-2 rounded-md text-base font-medium">
                            Home
                        </Link>
                        <Link to="/about" className="block hover:bg-gray-200 px-3 py-2 rounded-md text-base font-medium">
                            About
                        </Link>
                        <Link to="/projects" className="block hover:text-[#dd8ea4] px-3 py-2 rounded-md text-base font-medium">
                            Projects
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
