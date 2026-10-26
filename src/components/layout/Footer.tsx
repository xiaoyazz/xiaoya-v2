import { FaGithub, FaLinkedin } from "react-icons/fa";
import { siteConfig } from "../../data/siteData";

const Footer = () => (
  <footer className="site-main pt-6 pb-14 md:pb-20">
    <div className="border-t border-black/10 dark:border-white/10 pt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
      <p className="text-xs text-black/45 dark:text-white/45">
        Built and designed by {siteConfig.fullName}. © {new Date().getFullYear()}
      </p>
      <div className="flex items-center gap-4">
        <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-hover">
          <FaLinkedin size={18} />
        </a>
        <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-hover">
          <FaGithub size={18} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
