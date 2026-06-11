"use client";

import { useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const response = await fetch("/api/forms/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "footer_newsletter_section",
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(result.error || "Subscription failed. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Failed to connect to the server.");
    }
  };

  return (
    <section className="section newsletter-panel">
      <div>
        <span>Newsletter</span>
        <h2>Get intake alerts and study tips</h2>
        <p>Subscribe for destination updates, test prep reminders, and application season guidance.</p>
      </div>
      {status === "success" ? (
        <strong>Thank you! Subscription saved successfully.</strong>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <form onSubmit={handleSubmit}>
            <input 
              required 
              type="email" 
              placeholder="Email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="primary-button" type="submit" disabled={status === "loading"}>
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
          {status === "error" && (
            <span style={{ color: "var(--dm-heritage-red)", fontSize: "12px", fontWeight: "600" }}>{errorMsg}</span>
          )}
        </div>
      )}
    </section>
  );
}
