import { FaGithub, FaLinkedin } from "react-icons/fa";
import { siteConfig } from "../../data/siteData";

const Footer = () => (
  <footer className="w-full mt-4 py-6 mb-10">
    <div className="max-w-4xl mx-auto text-center">
      <div className="flex justify-center gap-4 mb-4">
        <a
          href={siteConfig.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-[#9c505a] dark:hover:text-[#3bba9c]"
        >
          <FaLinkedin size={20} />
        </a>
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-[#9c505a] dark:hover:text-[#3bba9c]"
        >
          <FaGithub size={20} />
        </a>
      </div>
      <p className="text-sm">
        Built and designed by {siteConfig.fullName}.<br />
        All rights reserved. ©
      </p>
    </div>
  </footer>
);

export default Footer;
