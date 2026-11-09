import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import { startDesktop } from './engine/desktop';
// Order matters: later sheets override earlier ones, matching the original prototype.
import './styles/style.css';
import './styles/finder.css';
import './styles/menubar.css';
import './styles/dock.css';
import './styles/music.css';
import './styles/weather.css';
import './styles/resume.css';
import './styles/gallery.css';
import './styles/messages.css';
import './styles/widget-drag.css';
import './styles/responsive.css';
import './styles/wallpaper.css';
import './styles/trash.css';
import './styles/terminal.css';

// Render the static shell synchronously, then start the desktop engine on top of it.
// The engine runs outside React's lifecycle (no StrictMode double-start), so it can
// mount the widgets and window content synchronously as well.
const root = createRoot(document.getElementById('root')!);
flushSync(() => root.render(<App />));
startDesktop();
