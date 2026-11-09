/** Content of the Messages greeting; the engine owns the <section class="message-greeting"> around it. */
export function MessageGreeting({ onClose }: { onClose: () => void }) {
  return (
    <>
      <header className="message-heading">
        <img className="message-app-icon" src="assets/icons/messages-app.svg" alt="" width={28} height={28} draggable={false} />
        <span className="message-app-name">Messages</span>
        <span className="message-time">now</span>
        <button className="message-close" type="button" data-message-close aria-label="Close greeting" onClick={onClose}>
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="m4 4 8 8M12 4l-8 8" /></svg>
        </button>
      </header>
      <div className="message-body">
        <h2 id="message-sender">Xiaoya</h2>
        <p>Heyyy welcome to my website! 😊 </p>
      </div>
    </>
  );
}
