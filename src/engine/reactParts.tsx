import type { ReactNode } from 'react';
import { MessageGreeting } from '../components/widgets/MessageGreeting';
import { SpotifyWidget } from '../components/widgets/SpotifyWidget';
import { WeatherWidget } from '../components/widgets/WeatherWidget';
import { AboutContent } from '../components/windows/AboutContent';
import { PhotoLibrary } from '../components/windows/PhotoLibrary';
import { TerminalContent } from '../components/windows/TerminalContent';
import { ProjectPreview } from '../components/windows/ProjectPreview';
import { ProjectsFolder } from '../components/windows/ProjectsFolder';
import { ResumeContent } from '../components/windows/ResumeContent';
import { projects } from '../data/projects';

// The React pieces the desktop engine mounts into the elements it manages.
export const weatherWidget = (host: HTMLElement): ReactNode => <WeatherWidget host={host} />;
export const spotifyWidget = (host: HTMLElement): ReactNode => <SpotifyWidget host={host} />;
export const messageGreeting = (onClose: () => void): ReactNode => <MessageGreeting onClose={onClose} />;

/** Content for a window, by desktop item id and kind. */
export function windowContent(id: string, kind: string): ReactNode {
  if (kind === 'profile') return <AboutContent />;
  if (kind === 'photo') {
    const project = projects.find(item => item.id === id);
    return project ? <ProjectPreview project={project} /> : null;
  }
  if (id === 'projects') return <ProjectsFolder />;
  if (id === 'photo-library') return <PhotoLibrary />;
  if (id === 'terminal') return <TerminalContent />;
  if (id === 'hello') return <ResumeContent />;
  return null;
}
