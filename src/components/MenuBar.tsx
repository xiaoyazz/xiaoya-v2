import { person } from '../data/siteData';
import { MenuClock } from './MenuClock';

/**
 * Menu bar markup. Menu opening, keyboard navigation, and the folder buttons
 * (#folder-nav, #folder-popup) are wired by the desktop engine.
 */
export function MenuBar() {
  return (
    <header className="desktop-bar">
      <div className="menu-left">
        <div className="app-menu-wrap">
          <button className="menu-app desktop-title" id="app-menu-toggle" aria-expanded="false" aria-controls="app-menu" aria-label="Xiaoya Zou menu">
            <span className="name-coffee" aria-hidden="true"><img src="assets/icons/iced-coffee.png" alt="" width={30} height={30} /></span>
            <span>{person.name}</span>
          </button>
          <div className="bar-popover app-menu" id="app-menu" hidden>
            <button data-menu-open="about">About Xiaoya</button>
            <hr />
            <button id="tidy" title="Restore the original icon arrangement">Restart</button>
          </div>
        </div>
        <nav className="folder-nav" id="folder-nav" aria-label="Folder navigation" />
        <div className="compact-folder-wrap">
          <button className="folders-toggle" id="folders-toggle" aria-expanded="false" aria-controls="folder-popup">Folders <span aria-hidden="true">⌄</span></button>
          <nav className="bar-popover folder-popup" id="folder-popup" aria-label="Folder navigation" hidden />
        </div>
      </div>
      <div className="menu-status">
        <nav className="header-socials" aria-label="Social profiles">
          <a href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0Z" /></svg>
          </a>
          <a href={person.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 .3A12 12 0 0 0 8.2 23.7c.6.1.8-.3.8-.6v-2.2c-3.4.7-4.1-1.5-4.1-1.5-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.4-5.5-6 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.2 4.7 18.2 5 18.2 5c.7 1.6.3 2.9.1 3.2.8.9 1.2 2 1.2 3.3 0 4.6-2.8 5.7-5.5 6 .5.4.9 1.1.9 2.2v3.4c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" /></svg>
          </a>
        </nav>
        <MenuClock />
      </div>
    </header>
  );
}
