import { useState } from "react";
import { assets } from "../data/assets.js";
import { countries } from "../data/countries.js";
import "@/styles/BookingPage.css";

const slotConfig = [
  { icon: "🎓", label: "Study Abroad" },
  { icon: "🪪", label: "Visa Review" },
  { icon: "🎧", label: "IELTS/PTE" },
  { icon: "📖", label: "Entrance Prep" },
  { icon: "🌐", label: "Europe Routes" },
  { icon: "🇰🇷", label: "South Korea" },
];

const trustItems = [
  { icon: "🛡️", bold: "100% Free", sub: "Counselling" },
  { icon: "👥", bold: "Certified", sub: "Counsellors" },
  { icon: "🎧", bold: "End-to-end", sub: "Support" },
  { icon: "⭐", bold: "Since", sub: "2012" },
];

const phoneCountries = [
  { code: "NP", name: "Nepal", flag: "🇳🇵", dial: "+977", length: 10, pattern: "(98|97|96)[0-9]{8}" },
  { code: "IN", name: "India", flag: "🇮🇳", dial: "+91", length: 10, pattern: "[0-9]{10}" },
  { code: "US", name: "USA/Canada", flag: "🇺🇸", dial: "+1", length: 10, pattern: "[0-9]{10}" },
  { code: "GB", name: "UK", flag: "🇬🇧", dial: "+44", length: 10, pattern: "[0-9]{10}" },
  { code: "AU", name: "Australia", flag: "🇦🇺", dial: "+61", length: 9, pattern: "[0-9]{9}" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", dial: "+82", length: 10, pattern: "[0-9]{10}" },
  { code: "DE", name: "Germany", flag: "🇩🇪", dial: "+49", length: 10, pattern: "[0-9]{10}" },
  { code: "CN", name: "China", flag: "🇨🇳", dial: "+86", length: 11, pattern: "[0-9]{11}" },
  { code: "AE", name: "UAE", flag: "🇦🇪", dial: "+971", length: 9, pattern: "[0-9]{9}" },
];
export function BookingPage() {
  const [sent, setSent] = useState(false);
  const [countryCode, setCountryCode] = useState("NP");
  const selectedCountry = phoneCountries.find(c => c.code === countryCode) ?? phoneCountries[0];

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredDestination, setPreferredDestination] = useState("");
  const [courseInterest, setCourseInterest] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const fullPhone = `${selectedCountry.dial}${phone}`;

    try {
      const response = await fetch("/api/forms/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone: fullPhone,
          email,
          preferredDestination: preferredDestination || undefined,
          courseInterest: courseInterest || undefined,
          preferredDate,
          preferredTime,
          honeypot,
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setStatus("success");
        setSent(true);
      } else {
        setStatus("error");
        setErrorMsg(result.error || "Failed to submit booking request.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Failed to connect to the server. Please check your connection.");
    }
  };


  return (
    <main>
      {/* ── HERO ── */}
      <div className="services-hero" style={{ marginBottom: 0, paddingBottom: "60px" }}>
        <div className="services-hero-content">
          <div className="section-eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "16px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--red)", marginBottom: "8px" }}>
            <span style={{ width: 10, height: 10, background: "#fff0f0", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>📅</span>
            Book Free Consultation
          </div>

          <h1 style={{ margin: "12px 0 18px", fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.2, fontWeight: 800, color: "var(--navy)" }}>
            Start your journey today with a{" "}
            <span style={{ background: "linear-gradient(90deg, var(--purple), var(--cyan))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              free profile review
            </span>
          </h1>

          <p style={{ fontSize: 17, lineHeight: 1.75, color: "var(--muted)", maxWidth: 520, margin: "0 0 28px" }}>
            Students can request a no-obligation counselling slot for destination selection, preparation classes, or visa readiness.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
            {[
              { icon: "🌐", title: "Expert Guidance", desc: "Personalised advice from experienced counsellors" },
              { icon: "🎓", title: "Study Abroad Support", desc: "End-to-end support for your study journey" },
              { icon: "📋", title: "Visa Readiness", desc: "Stay prepared with the right guidance at every step" },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ background: "var(--white)", border: "1px solid var(--line)", borderRadius: 10, padding: "18px 14px", textAlign: "center" }}>
                <div style={{ width: 48, height: 48, background: "var(--soft)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", fontSize: 24 }}>
                  {icon}
                </div>
                <strong style={{ display: "block", fontSize: 13, color: "var(--navy)", marginBottom: 4 }}>{title}</strong>
                <p style={{ fontSize: 12, color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>{desc}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <button
              className="primary-button"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "linear-gradient(135deg, var(--purple), var(--cyan))", border: "none", borderRadius: 12, padding: "14px 26px", fontSize: 15, fontWeight: 800, color: "#fff", cursor: "pointer", boxShadow: "0 12px 28px rgba(91,23,125,0.28)" }}
              onClick={() => document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              📅 Book Your Free Slot →
            </button>
          </div>
        </div>

        <div>
          <div className="services-hero-image" style={{ borderRadius: 16 }}>
            <img src={assets.counselling} alt="Counselling session" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 14 }}>
            {[
              { icon: "👥", label: "Thousands of Students Guided" },
              { icon: "🛡️", label: "Trusted by Top Partners" },
              { icon: "🌐", label: "Global Opportunities" },
              { icon: "⭐", label: "Success That Inspires" },
            ].map(({ icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--white)", border: "1px solid var(--line)", borderRadius: 10, padding: "10px 12px" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(91,23,125,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                  {icon}
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--navy)", lineHeight: 1.4 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOOKING FORM SECTION ── */}
      <section className="section booking-layout" id="booking-form" style={{ position: "relative", overflow: "hidden" }}>

        {/* Dot pattern background decoration */}
        <div aria-hidden style={{ position: "absolute", top: 0, left: 0, width: "40%", height: "100%", backgroundImage: "radial-gradient(circle, rgba(91,23,125,0.12) 1.5px, transparent 1.5px)", backgroundSize: "22px 22px", pointerEvents: "none", zIndex: 0 }} />

        {/* Left column */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Eyebrow */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#f3f0ff", borderRadius: 20, padding: "5px 14px", marginBottom: 14 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--red)", display: "inline-block" }} />
            <span style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--red)" }}>Book Free Consultation</span>
          </div>

          {/* Headline with gradient accent + underline */}
          <h2 style={{ margin: "0 0 8px", color: "var(--navy)", fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)", lineHeight: 1.25, fontWeight: 800 }}>
            Choose the conversation{" "}
            <span style={{ display: "inline-block" }}>
              you{" "}
              <span style={{ background: "linear-gradient(90deg, var(--purple), var(--cyan))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                need most
              </span>
              <span style={{ display: "block", height: 3, borderRadius: 2, background: "linear-gradient(90deg, var(--purple), var(--cyan))", marginTop: 3 }} />
            </span>
          </h2>

          <p style={{ color: "var(--muted)", lineHeight: 1.72, marginBottom: 24, fontSize: 14 }}>
            The frontend is ready for a Supabase-backed booking workflow in the next implementation stage.
          </p>

          {/* Slot cards — 3 columns with icons */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 28 }}>
            {slotConfig.map(({ icon, label }) => (
              <div
                key={label}
                style={{
                  background: "var(--white)",
                  border: "1.5px solid var(--line)",
                  borderRadius: 12,
                  padding: "16px 10px 14px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "border-color 0.18s, box-shadow 0.18s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--purple)"; e.currentTarget.style.boxShadow = "0 4px 18px rgba(91,23,125,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(91,23,125,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", fontSize: 20 }}>
                  {icon}
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--navy)", display: "block", lineHeight: 1.3 }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Trust badges — horizontal row */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {trustItems.map(({ icon, bold, sub }) => (
              <div key={bold} style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--white)", border: "1px solid var(--line)", borderRadius: 10, padding: "8px 12px", flex: "1 1 auto", minWidth: 100 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(91,23,125,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "var(--navy)", lineHeight: 1.2 }}>{bold}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.2 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative cityscape silhouette */}
          <div aria-hidden style={{ marginTop: 32, opacity: 0.18 }}>
            <svg viewBox="0 0 520 120" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", fill: "var(--purple)" }}>
              {/* Statue of Liberty */}
              <rect x="10" y="80" width="8" height="40" />
              <rect x="8" y="72" width="12" height="10" />
              <rect x="12" y="60" width="4" height="14" />
              <polygon points="14,52 10,62 18,62" />
              {/* Big Ben */}
              <rect x="50" y="40" width="20" height="80" />
              <rect x="48" y="34" width="24" height="10" />
              <rect x="56" y="20" width="8" height="16" />
              <polygon points="60,10 54,22 66,22" />
              {/* Tower */}
              <rect x="100" y="55" width="14" height="65" />
              <rect x="98" y="48" width="18" height="9" />
              <rect x="105" y="30" width="4" height="20" />
              {/* CN Tower */}
              <rect x="160" y="50" width="6" height="70" />
              <ellipse cx="163" cy="45" rx="14" ry="8" />
              <rect x="162" y="20" width="2" height="28" />
              {/* Sydney Opera */}
              <ellipse cx="240" cy="100" rx="30" ry="22" />
              <ellipse cx="270" cy="100" rx="22" ry="16" />
              {/* Eiffel Tower */}
              <polygon points="340,10 320,120 360,120" />
              <rect x="328" y="55" width="24" height="6" />
              <rect x="333" y="35" width="14" height="4" />
              {/* Plane */}
              <polygon points="430,38 480,44 430,50" style={{ fill: "var(--purple)" }} />
              <polygon points="440,44 445,35 450,44" />
              <polygon points="440,44 445,54 450,44" />
            </svg>
          </div>
        </div>

        {/* Right column — form */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {sent ? (
            <div className="form-success-premium">
              <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>

              <h3
                style={{
                  color: "#FFFFFF",
                  fontSize: "2rem",
                  fontWeight: 800,
                  marginBottom: 14,
                }}
              >
                Consultation Requested
              </h3>

              <p
                style={{
                  color: "#F1F5F9",
                  fontSize: "16px",
                  lineHeight: 1.8,
                  maxWidth: "520px",
                  margin: "0 auto",
                }}
              >
                Thank you! Your profile assessment has been scheduled. An advisor will
                contact you shortly to confirm your consultation time.
              </p>
            </div>
          ) : (
            <form
              className="contact-form-premium"
              onSubmit={handleSubmit}
            >
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
                    background: "rgba(239, 68, 68, 0.1)",
                    color: "#ef4444",
                    padding: "12px",
                    borderRadius: "10px",
                    fontSize: "13px",
                    marginBottom: "6px",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                    fontWeight: 600
                  }}
                >
                  {errorMsg}
                </div>
              )}
              {/* Student name */}
              <label
                style={{
                  display: "grid",
                  gap: 6,
                  fontWeight: 700,
                  fontSize: 14,
                  color: "var(--navy)"
                }}
              >
                Student name

                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 16,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 18,
                      color: "#8B5CF6",
                      pointerEvents: "none",
                      zIndex: 2
                    }}
                  >
                    👤
                  </span>

                  <input
                    required
                    placeholder="Full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="premium-input"
                    style={{
                      paddingLeft: "52px"
                    }}

                  />
                </div>
              </label>

              {/* Mobile */}
              <label
                style={{
                  display: "grid",
                  gap: 6,
                  fontWeight: 700,
                  fontSize: 14,
                  color: "var(--navy)"
                }}
              >
                Mobile number

                <div style={{ display: "flex", gap: 8 }}>

                  {/* Country Code */}
                  <div
                    style={{
                      position: "relative",
                      flexShrink: 0,
                      width: 110
                    }}
                  >
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      style={{
                        width: "100%",
                        height: 48,
                        paddingLeft: 12,
                        paddingRight: 28,
                        border: "1.5px solid var(--line)",
                        borderRadius: 10,
                        fontSize: 13,
                        fontWeight: 700,
                        color: "var(--navy)",
                        backgroundColor: "#F3E8FF",
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23666' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 10px center",
                        appearance: "none",
                        cursor: "pointer",
                        outline: "none",
                        transition: "all .3s ease"
                      }}
                      onFocus={(e) => {
                        e.target.style.backgroundColor = "#FFFFFF";
                        e.target.style.borderColor = "var(--purple)";
                      }}
                      onBlur={(e) => {
                        e.target.style.backgroundColor = "#F3E8FF";
                        e.target.style.borderColor = "var(--line)";
                      }}
                    >
                      {phoneCountries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.dial}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Phone Number */}
                  <div
                    style={{
                      position: "relative",
                      flex: 1
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: 16,
                        opacity: 0.45
                      }}
                    >
                      📞
                    </span>

                    <input
                      required
                      type="tel"
                      inputMode="numeric"
                      placeholder={
                        selectedCountry.code === "NP"
                          ? "98XXXXXXXX"
                          : `${selectedCountry.length}-digit number`
                      }
                      pattern={selectedCountry.pattern}
                      maxLength={selectedCountry.length}
                      title={`Enter a valid ${selectedCountry.length}-digit ${selectedCountry.name} mobile number`}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onKeyDown={(e) => {
                        if (
                          !/[0-9]/.test(e.key) &&
                          ![
                            "Backspace",
                            "Delete",
                            "ArrowLeft",
                            "ArrowRight",
                            "Tab"
                          ].includes(e.key)
                        ) {
                          e.preventDefault();
                        }
                      }}
                      style={{
                        width: "100%",
                        paddingLeft: 42,
                        paddingRight: 14,
                        height: 48,
                        border: "1.5px solid var(--line)",
                        borderRadius: 10,
                        fontSize: 14,
                        color: "var(--navy)",
                        background: "#F3E8FF",
                        outline: "none",
                        boxSizing: "border-box",
                        transition: "all .3s ease"
                      }}
                      onFocus={(e) => {
                        e.target.style.background = "#FFFFFF";
                        e.target.style.borderColor = "var(--purple)";
                      }}
                      onBlur={(e) => {
                        e.target.style.background = "#F3E8FF";
                        e.target.style.borderColor = "var(--line)";
                      }}
                    />
                  </div>

                </div>
              </label>

              {/* Email */}
              <label style={{ display: "grid", gap: 6, fontWeight: 700, fontSize: 14, color: "var(--navy)" }}>
                Email
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, opacity: 0.45 }}>✉️</span>
                  <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} style={{ width: "100%", paddingLeft: 42, paddingRight: 14, height: 48, border: "1.5px solid var(--line)", borderRadius: 10, fontSize: 14, color: "var(--navy)", outline: "none", boxSizing: "border-box", transition: "border-color 0.18s" }}
                    onFocus={e => e.target.style.borderColor = "var(--purple)"}
                    onBlur={e => e.target.style.borderColor = "var(--line)"} />
                </div>
              </label>

              {/* Preferred Route */}
              <label
                style={{
                  display: "grid",
                  gap: 6,
                  fontWeight: 700,
                  fontSize: 14,
                  color: "var(--navy)",
                }}
              >
                Preferred Route

                <div style={{ position: "relative" }}>
                  {/* Icon */}
                  <span
                    style={{
                      position: "absolute",
                      left: 16,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 18,
                      color: "#8B5CF6",
                      pointerEvents: "none",
                      zIndex: 2,
                    }}
                  >
                    📍
                  </span>

                  <select
                    required
                    value={preferredDestination}
                    onChange={(e) => setPreferredDestination(e.target.value)}
                    className="premium-select"
                    style={{
                      paddingLeft: "52px"
                    }}
                  >
                    <option value="" disabled>
                      Select route
                    </option>

                    {countries.map((c) => (
                      <option key={c.slug} value={c.name}>
                        {c.name}
                      </option>
                    ))}

                    <option value="Entrance Preparation">
                      Entrance Preparation
                    </option>

                    <option value="Test Preparation">
                      Test Preparation
                    </option>
                  </select>
                </div>
              </label>

              {/* Course Interest */}
              <label
                style={{
                  display: "grid",
                  gap: 6,
                  fontWeight: 700,
                  fontSize: 14,
                  color: "var(--navy)"
                }}
              >
                Course Interest

                <div style={{ position: "relative" }}>
                  {/* Left Icon */}
                  <span
                    style={{
                      position: "absolute",
                      left: 16,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 18,
                      color: "#8B5CF6",
                      pointerEvents: "none",
                      zIndex: 2
                    }}
                  >
                    🎓
                  </span>

                  <select
                    value={courseInterest}
                    onChange={(e) => setCourseInterest(e.target.value)}
                    onFocus={(e) => {
                      e.target.style.backgroundColor = "#FFFFFF";
                      e.target.style.borderColor = "#7C3AED";
                    }}
                    onBlur={(e) => {
                      e.target.style.backgroundColor = "#F3E8FF";
                      e.target.style.borderColor = "var(--line)";
                    }}
                    style={{
                      width: "100%",
                      height: 48,
                      paddingLeft: 50,
                      paddingRight: 45,
                      border: "1.5px solid var(--line)",
                      borderRadius: 10,
                      fontSize: 14,
                      color: "var(--navy)",
                      backgroundColor: "#F3E8FF",
                      outline: "none",
                      appearance: "none",
                      cursor: "pointer",
                      transition: "all .3s ease",
                      boxSizing: "border-box"
                    }}
                  >
                    <option value="">Select one</option>
                    <option value="Study Abroad">Study Abroad</option>
                    <option value="Test Preparation">Test Preparation</option>
                    <option value="Entrance Preparation">Entrance Preparation</option>
                    <option value="Visa Guidance">Visa Guidance</option>
                  </select>

                  {/* Right Arrow */}
                  <span
                    style={{
                      position: "absolute",
                      right: 16,
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#64748B",
                      fontSize: 14
                    }}
                  >
                    ▼
                  </span>
                </div>
              </label>

              {/* Preferred date */}
              <label style={{ display: "grid", gap: 6, fontWeight: 700, fontSize: 14, color: "var(--navy)" }}>
                Preferred date
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, opacity: 0.45 }}>📅</span>
                  <input required type="date" min={new Date().toISOString().split("T")[0]} value={preferredDate} onChange={e => setPreferredDate(e.target.value)} style={{ width: "100%", paddingLeft: 42, paddingRight: 14, height: 48, border: "1.5px solid var(--line)", borderRadius: 10, fontSize: 14, color: "var(--navy)", outline: "none", boxSizing: "border-box", transition: "border-color 0.18s" }}
                    onFocus={e => e.target.style.borderColor = "var(--purple)"}
                    onBlur={e => e.target.style.borderColor = "var(--line)"} />
                </div>
              </label>

              {/* Preferred Time */}
              <label
                style={{
                  display: "grid",
                  gap: 6,
                  fontWeight: 700,
                  fontSize: 14,
                  color: "var(--navy)"
                }}
              >
                Preferred Time

                <div style={{ position: "relative" }}>
                  {/* Left Icon */}
                  <span
                    style={{
                      position: "absolute",
                      left: 16,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 18,
                      color: "#8B5CF6",
                      pointerEvents: "none",
                      zIndex: 2
                    }}
                  >
                    🕐
                  </span>

                  <select
                    required
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    onFocus={(e) => {
                      e.target.style.backgroundColor = "#FFFFFF";
                      e.target.style.borderColor = "#7C3AED";
                    }}
                    onBlur={(e) => {
                      e.target.style.backgroundColor = "#F3E8FF";
                      e.target.style.borderColor = "var(--line)";
                    }}
                    style={{
                      width: "100%",
                      height: 48,
                      paddingLeft: 50,
                      paddingRight: 45,
                      border: "1.5px solid var(--line)",
                      borderRadius: 10,
                      fontSize: 14,
                      color: "var(--navy)",
                      backgroundColor: "#F3E8FF",
                      outline: "none",
                      appearance: "none",
                      cursor: "pointer",
                      transition: "all .3s ease",
                      boxSizing: "border-box"
                    }}
                  >
                    <option value="" disabled>
                      Select time
                    </option>

                    <option value="Morning">🌅 Morning</option>
                    <option value="Afternoon">☀️ Afternoon</option>
                    <option value="Evening">🌙 Evening</option>
                  </select>

                  {/* Right Arrow */}
                  <span
                    style={{
                      position: "absolute",
                      right: 16,
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#64748B",
                      fontSize: 14
                    }}
                  >
                    ▼
                  </span>
                </div>
              </label>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    width: "100%",
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    border: "none",
                    borderRadius: 14,
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 16,
                    letterSpacing: ".3px",
                    background:
                      "linear-gradient(135deg,#7C3AED,#A855F7,#EC4899)",
                    backgroundSize: "200% 200%",
                    boxShadow: "0 12px 35px rgba(124,58,237,.35)",
                    transition: "all .35s ease",
                    animation: "gradientMove 4s ease infinite",
                    opacity: status === "loading" ? .7 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (status !== "loading") {
                      e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
                      e.currentTarget.style.boxShadow =
                        "0 18px 40px rgba(124,58,237,.45)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (status !== "loading") {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 12px 35px rgba(124,58,237,.35)";
                    }
                  }}
                >
                  {status === "loading" ? (
                    <>⏳ Booking...</>
                  ) : (
                    <>
                      📅 Book My Session
                      <span
                        style={{
                          display: "inline-block",
                          transition: ".3s",
                          animation: "arrowMove 1s infinite"
                        }}
                      >
                        →
                      </span>
                    </>
                  )}
                </button>

                {/* Security note */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 12 }}>
                  <span style={{ fontSize: 13, opacity: 0.5 }}>🛡️</span>
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>Your details are secure and will never be shared.</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </section >
    </main >
  );
}
