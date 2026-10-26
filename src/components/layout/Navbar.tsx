import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { siteConfig } from "../../data/siteData";
import DarkModeToggle from "../ui/DarkModeToggle";

const navItems = [
  { label: "home", hash: "home" },
  { label: "about", hash: "about" },
  { label: "experience", hash: "experience" },
  { label: "work", hash: "work" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const homeTarget = (hash: string) => `/#${hash}`;
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[220px] xl:w-[250px] z-30 flex-col justify-between px-8 xl:px-10 py-12 border-r border-black/5 dark:border-white/10 bg-[#eeeeee]/75 dark:bg-[#272727]/80 backdrop-blur-md">
        <div>
          <Link to="/" className="site-name text-xl text-hover block mb-12">
            {siteConfig.fullName}
          </Link>

          <nav aria-label="Main navigation" className="space-y-3">
            {navItems.map((item, index) => (
              <Link
                key={item.hash}
                to={homeTarget(item.hash)}
                className="sidebar-link text-hover group"
                style={{ transitionDelay: `${index * 25}ms` }}
              >
                <span className="text-[#c57f92] dark:text-[#3bba9c]">/</span>
                <span>{item.label}</span>
              </Link>
            ))}
            <Link to="/projects" className="sidebar-link text-hover">
              <span className="text-[#c57f92] dark:text-[#3bba9c]">/</span>
              <span>projects</span>
            </Link>
          </nav>
        </div>

        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="icon-hover"
            >
              <FaLinkedin size={19} />
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="icon-hover"
            >
              <FaGithub size={19} />
            </a>
            <DarkModeToggle />
          </div>
          <p className="text-xs leading-5 text-black/45 dark:text-white/45">
            Xiaoya Zou © 2026
          </p>
        </div>
      </aside>

      <nav className="lg:hidden fixed w-full top-0 left-0 bg-[#eeeeee]/85 dark:bg-[#272727]/90 backdrop-blur-md border-b border-black/5 dark:border-white/10 z-40">
        <div className="px-5 h-16 flex items-center justify-between">
          <Link to="/" className="site-name text-lg text-hover" onClick={closeMenu}>
            {siteConfig.name}
          </Link>

          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <button
              onClick={() => setIsOpen((open) => !open)}
              type="button"
              className="p-2 text-hover"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
            >
              <span className="block w-5 h-px bg-current mb-1.5" />
              <span className="block w-5 h-px bg-current mb-1.5" />
              <span className="block w-5 h-px bg-current" />
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="px-5 pb-6 border-t border-black/5 dark:border-white/10">
            <div className="pt-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.hash}
                  to={homeTarget(item.hash)}
                  onClick={closeMenu}
                  className="block py-2 text-hover"
                >
                  / {item.label}
                </Link>
              ))}
              <Link to="/projects" onClick={closeMenu} className="block py-2 text-hover">
                / projects
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
