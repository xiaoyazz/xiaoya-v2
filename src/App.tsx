import { MenuBar } from './components/MenuBar';
import { TechStackDock } from './components/TechStackDock';
import { copyright } from './data/siteData';

/**
 * Static page shell. The desktop engine (src/engine/desktop.ts) fills #desktop and #windows,
 * runs dragging, windows, and the compact app grid, and mounts the React widgets and window
 * content. Keep this component free of state: the engine owns the DOM inside #workspace.
 */
export default function App() {
  return (
    <>
      <a className="skip-link" href="#desktop">Explore the desktop</a>
      <MenuBar />
      <main className="workspace" id="workspace">
        <h1 className="sr-only">Xiaoya’s desktop portfolio</h1>
        <div className="desktop" id="desktop" tabIndex={-1} aria-label="Portfolio apps. Open Terminal, Projects, RESUME.txt, Photos, or Messages." />
        <div className="windows" id="windows" aria-label="Open portfolio windows" />
      </main>
      <TechStackDock />
      <footer className="desktop-status"><p>{copyright}</p><div className="minimized-windows" id="minimized" aria-label="Minimized windows" /></footer>
      <div className="sr-only" id="announcement" aria-live="polite" />
    </>
  );
}
