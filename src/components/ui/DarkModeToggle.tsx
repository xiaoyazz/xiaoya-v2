import { useEffect, useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "light";
    const isDark = currentTheme === "dark";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const nextDarkMode = !darkMode;
    setDarkMode(nextDarkMode);
    document.documentElement.classList.toggle("dark", nextDarkMode);
    localStorage.setItem("theme", nextDarkMode ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      className="p-2 rounded-full focus:outline-none"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        <BsSunFill className="text-xl dark:hover:text-[#3bba9c]" />
      ) : (
        <BsMoonFill className="text-xl hover:text-[#9c505a]" />
      )}
    </button>
  );
};

export default DarkModeToggle;
