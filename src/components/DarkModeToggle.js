import React, { useState, useEffect } from 'react';
import { BsSunFill } from 'react-icons/bs';
import { BsMoonStarsFill } from "react-icons/bs";


const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    // Set the theme on initial load
    useEffect(() => {
        const currentTheme = localStorage.getItem('theme') || 'light';
        setDarkMode(currentTheme === 'dark');
        document.documentElement.classList.toggle('dark', currentTheme === 'dark');
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        const theme = !darkMode ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', !darkMode);
        localStorage.setItem('theme', theme); // Save theme in local storage
    };

    return (
        <button onClick={toggleDarkMode} className="p-2 rounded-full focus:outline-none">
            {darkMode ? (
                <BsSunFill className="text-xl dark:hover:text-[#3bba9c]" />
            ) : (
                <BsMoonStarsFill className="text-xl hover:text-[#9c505a]" />
            )}
        </button>
    );
};

export default DarkModeToggle;
