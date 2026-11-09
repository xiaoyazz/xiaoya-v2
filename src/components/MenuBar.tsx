import { person } from '../data/siteData';
import { CoffeeButton } from './CoffeeButton';
import { MenuClock } from './MenuClock';
import { githubPath, linkedinPath } from './SocialIcons';

/**
 * Menu bar markup. Menu opening, keyboard navigation, and the top-bar links
 * (#folder-nav) are wired by the desktop engine.
 */
export function MenuBar() {
  return (
    <header className="desktop-bar">
      <div className="menu-left">
        <CoffeeButton />
        <div className="app-menu-wrap">
          <button className="menu-app desktop-title" id="app-menu-toggle" aria-expanded="false" aria-controls="app-menu" aria-label="Xiaoya Zou menu">
            <span>{person.name}</span>
          </button>
          <div className="bar-popover app-menu" id="app-menu" hidden>
            <button data-menu-open="about">About Xiaoya</button>
            <hr />
            <button id="tidy" title="Restore the original icon arrangement">Restart</button>
          </div>
        </div>
        <nav className="folder-nav" id="folder-nav" aria-label="Folder navigation" />
      </div>
      <div className="menu-status">
        <nav className="header-socials" aria-label="Social profiles">
          <a href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d={linkedinPath} /></svg>
          </a>
          <a href={person.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d={githubPath} /></svg>
          </a>
        </nav>
        <MenuClock />
      </div>
    </header>
  );
}
