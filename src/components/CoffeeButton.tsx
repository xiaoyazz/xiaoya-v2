import { useEffect, useRef, useState } from 'react';

const LIMIT = 5;

/** The iced coffee in the menu bar: it shakes on every click, and after too many sips it says so. */
export function CoffeeButton() {
  const [shakes, setShakes] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const clicks = useRef(0);
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  function sip() {
    setShakes(n => n + 1);
    clicks.current += 1;
    if (clicks.current > LIMIT) {
      clicks.current = 0;
      setShowMessage(true);
      clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setShowMessage(false), 2200);
    }
  }

  return (
    <div className="coffee-wrap">
      <button type="button" className="coffee-button" onClick={sip} aria-label="Iced coffee" title="Iced coffee">
        {/* A new key restarts the shake animation on every click. */}
        <img key={shakes} className={shakes ? 'is-shaking' : undefined} src="assets/icons/iced-coffee.png" alt="" width={26} height={26} />
      </button>
      <p className="coffee-message" role="status" hidden={!showMessage}>Enough caffeine today! ☕️</p>
    </div>
  );
}
