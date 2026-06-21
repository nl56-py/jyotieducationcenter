"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import "@/styles/ContactForm.css";

export function ContactForm({
  compact = false,
  buttonText = "Send Message",
}) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("loading");
    setErrorMsg("");

    try {
      const response = await fetch("/api/forms/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          preferredDestination:
            interest === "Study Abroad"
              ? "General Study"
              : undefined,
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
        setErrorMsg(
          result.error ||
          "Inquiry submission failed."
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg(
        "Unable to connect to server."
      );
    }
  };

  if (status === "success") {
    return (
      <motion.div
        className="form-success-premium"
        initial={{
          opacity: 0,
          scale: .9
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
      >
        <div
          style={{
            fontSize: 55,
            marginBottom: 15
          }}
        >
          🎉
        </div>

        <h2>
          Thank You!
        </h2>

        <p>
          Your inquiry has been received successfully.
          Our counselor will contact you shortly.
        </p>
      </motion.div>
    );
  }
  return (
    <motion.div
      className="contact-form-premium"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="contact-header">
        <h2>Book Free Counseling</h2>
        <p>
          Fill in your details and our expert counselor will contact you within
          24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Honeypot */}
        <input
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{ display: "none" }}
        />

        {status === "error" && (
          <div className="error-box">{errorMsg}</div>
        )}

        {/* Full Name */}
        <label>
          Full Name
          <div style={{ position: "relative" }}>
            <span className="input-icon">👤</span>
            <input
              className="premium-input"
              required
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </label>

        {/* Phone */}
        <label>
          Phone Number
          <div style={{ position: "relative" }}>
            <span className="input-icon">📞</span>
            <input
              className="premium-input"
              required
              placeholder="98XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </label>

        {/* Email */}
        <label>
          Email Address
          <div style={{ position: "relative" }}>
            <span className="input-icon">✉️</span>
            <input
              className="premium-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </label>

        {/* Interest */}
        <label>
          Course Interest
          <div style={{ position: "relative" }}>
            <span className="input-icon">🎓</span>

            <select
              className="premium-select"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              required
            >
              <option value="">Select one</option>
              <option value="Study Abroad">Study Abroad</option>
              <option value="Test Preparation">
                Test Preparation
              </option>
              <option value="Entrance Preparation">
                Entrance Preparation
              </option>
              <option value="Visa Guidance">
                Visa Guidance
              </option>
            </select>

            <span className="dropdown-arrow">
              ▼
            </span>
          </div>
        </label>

        {/* Message */}
        <label>
          Message
          <div style={{ position: "relative" }}>
            <span
              className="input-icon"
              style={{ top: 22 }}
            >
              💬
            </span>

            <textarea
              className="premium-textarea"
              rows={5}
              placeholder="Tell us about your study plans..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </label>
        {/* Submit Button */}
        <div style={{ marginTop: 10 }}>
          <button
            type="submit"
            disabled={status === "loading"}
            className="premium-button"
          >
            {status === "loading" ? (
              <>
                <span className="loading-spinner"></span>
                Sending...
              </>
            ) : (
              <>
                🚀 Send Message
                <span className="button-arrow">→</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}