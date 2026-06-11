"use client";

import { useState } from "react";

export function ContactForm({ compact = false, buttonText = "Send Request" }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const response = await fetch("/api/forms/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          preferredDestination: interest === "Study Abroad" ? "General Study" : undefined,
          courseInterest: interest,
          message,
          source: "public_contact_form",
          honeypot,
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(result.error || "Inquiry submission failed. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Failed to connect to the server. Please check your connection.");
    }
  };

  if (status === "success") {
    return (
      <div className="form-success">
        <h3>Request received</h3>
        <p>Thank you! Your inquiry has been logged in our system. A counselor will review your profile shortly.</p>
      </div>
    );
  }

  return (
    <form className={compact ? "contact-form compact-form" : "contact-form"} onSubmit={handleSubmit}>
      {/* Honeypot spam protection (hidden from users) */}
      <input
        type="text"
        name="honeypot"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      {status === "error" && (
        <div 
          style={{ 
            background: "var(--dm-error-container)", 
            color: "var(--dm-error)", 
            padding: "10px", 
            borderRadius: "var(--dm-rounded-sm)", 
            fontSize: "13px", 
            marginBottom: "12px",
            border: "1px solid var(--dm-error)"
          }}
        >
          {errorMsg}
        </div>
      )}

      <label>
        Full name
        <input required name="name" placeholder="Your name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </label>
      <label>
        Phone number
        <input required name="phone" placeholder="98XXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </label>
      <label>
        Email
        <input name="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Interest
        <select required name="interest" value={interest} onChange={(e) => setInterest(e.target.value)}>
          <option value="" disabled>
            Select one
          </option>
          <option value="Study Abroad">Study Abroad</option>
          <option value="Test Preparation">Test Preparation</option>
          <option value="Entrance Preparation">Entrance Preparation</option>
          <option value="Visa Guidance">Visa Guidance</option>
        </select>
      </label>
      <label>
        Message
        <textarea name="message" placeholder="Tell us your target country or course" value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      <button className="primary-button" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Submitting..." : buttonText}
      </button>
    </form>
  );
}
