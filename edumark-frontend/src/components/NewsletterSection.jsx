import { useState } from "react";

export function NewsletterSection() {
  const [sent, setSent] = useState(false);

  return (
    <section className="section newsletter-panel">
      <div>
        <span>Newsletter</span>
        <h2>Get intake alerts and study tips</h2>
        <p>Subscribe for destination updates, test prep reminders, and application season guidance.</p>
      </div>
      {sent ? (
        <strong>Subscription saved for frontend demo.</strong>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          <input required type="email" placeholder="Email address" />
          <button className="primary-button" type="submit">
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
}
