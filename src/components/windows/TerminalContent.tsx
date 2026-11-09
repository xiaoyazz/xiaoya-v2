import { useEffect, useRef, useState } from 'react';

const PROMPT = 'xiaoya@desktop ~ %';

/** A line of output is plain text, or a [label, description] pair shown as two aligned columns. */
type Line = string | [string, string];

/** The intro, as a few commands and what they print. Edit freely — it's plain text. */
const script: { command: string; output: Line[] }[] = [
  {
    command: 'whoami',
    output: [
      'Hi, I’m Xiaoya',
      'Welcome to my little desktop on the web.',
    ],
  },
  {
    command: 'ls',
    output: ['Weather    Spotify    Projects    Photos    RESUME.txt'],
  },
  {
    command: 'cat tour.txt',
    output: [
      ['Weather', 'what it’s like in Toronto right now.'],
      ['Spotify', 'a playlist I’ve had on repeat lately.'],
      ['Projects', 'things I’ve built: web, mobile, games, and a bit of ML.'],
      ['Photos', 'moments I took'],
      ['RESUME.txt', 'the short version of my experience.'],
    ],
  },
  {
    command: 'echo "have fun"',
    output: ['Click around, drag things, and open whatever looks interesting :)'],
  },
];

const TYPE_MS = 38;      // per character
const PAUSE_MS = 280;    // before output appears
const NEXT_MS = 520;     // before the next command starts

/** A macOS Terminal–style window that types out the site intro. Click to skip. */
export function TerminalContent() {
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  // step = how many commands are fully done; typed = characters typed of the current one; showOutput = current output visible
  const [state, setState] = useState(() => reduceMotion
    ? { step: script.length, typed: 0, showOutput: false }
    : { step: 0, typed: 0, showOutput: false });
  const screen = useRef<HTMLDivElement>(null);
  const done = state.step >= script.length;

  useEffect(() => {
    if (done) return;
    const current = script[state.step];
    let timer: number;
    if (state.typed < current.command.length) {
      timer = window.setTimeout(() => setState(s => ({ ...s, typed: s.typed + 1 })), TYPE_MS);
    } else if (!state.showOutput) {
      timer = window.setTimeout(() => setState(s => ({ ...s, showOutput: true })), PAUSE_MS);
    } else {
      timer = window.setTimeout(() => setState(s => ({ step: s.step + 1, typed: 0, showOutput: false })), NEXT_MS);
    }
    return () => window.clearTimeout(timer);
  }, [state, done]);

  // Keep the newest line in view, like a real terminal.
  useEffect(() => {
    const scroller = screen.current?.closest('.window-content');
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
  }, [state]);

  const skip = () => { if (!done) setState({ step: script.length, typed: 0, showOutput: false }); };

  return (
    <div className="terminal-screen" ref={screen} onClick={skip} title={done ? undefined : 'Click to skip'}>
      <p className="terminal-muted">Last login: today on ttys001</p>
      {script.map((entry, index) => {
        if (index > state.step) return null;
        const finished = index < state.step;
        const typing = index === state.step && !done;
        return (
          <div className="terminal-block" key={entry.command}>
            <p>
              <span className="terminal-prompt">{PROMPT}</span>{' '}
              <span className="terminal-command">{finished ? entry.command : entry.command.slice(0, state.typed)}</span>
              {typing && !state.showOutput && <span className="terminal-cursor" aria-hidden="true" />}
            </p>
            {(finished || (typing && state.showOutput)) && entry.output.map(line => typeof line === 'string'
              ? <p className="terminal-output" key={line}>{line}</p>
              : <p className="terminal-output terminal-row" key={line[0]}><span>{line[0]}</span><span>{line[1]}</span></p>)}
          </div>
        );
      })}
      {(done || state.showOutput) && (
        <p>
          <span className="terminal-prompt">{PROMPT}</span>{' '}
          {done && <span className="terminal-cursor is-blinking" aria-hidden="true" />}
        </p>
      )}
    </div>
  );
}
