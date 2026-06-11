import { useState } from "react";

export function ContactForm({ compact = false, buttonText = "Send Request" }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="form-success">
        <h3>Request received</h3>
        <p>EduMark can connect this form to Supabase, email notifications, or a CRM when the backend is added.</p>
      </div>
    );
  }

  return (
    <form
      className={compact ? "contact-form compact-form" : "contact-form"}
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <label>
        Full name
        <input required name="name" placeholder="Your name" />
      </label>
      <label>
        Phone number
        <input required name="phone" placeholder="98XXXXXXXX" />
      </label>
      <label>
        Email
        <input name="email" type="email" placeholder="you@example.com" />
      </label>
      <label>
        Interest
        <select required name="interest" defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          <option>Study Abroad</option>
          <option>Test Preparation</option>
          <option>Entrance Preparation</option>
          <option>Visa Guidance</option>
        </select>
      </label>
      <label>
        Message
        <textarea name="message" placeholder="Tell us your target country or course" />
      </label>
      <button className="primary-button" type="submit">
        {buttonText}
      </button>
    </form>
  );
}
