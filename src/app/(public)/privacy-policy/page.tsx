export default function PrivacyPolicyPage() {
  return (
    <main className="section" style={{ maxWidth: "900px" }}>
      <span className="eyebrow">Legal</span>
      <h1 style={{ color: "var(--navy)", fontSize: "clamp(2rem, 4vw, 3rem)", margin: "12px 0 18px" }}>
        Privacy Policy
      </h1>
      <p style={{ color: "var(--muted)", lineHeight: 1.8 }}>
        EduMark collects contact and academic-interest details only when you submit a form or request counselling. We use this information to respond to enquiries, schedule sessions, and provide education counselling support.
      </p>
      <p style={{ color: "var(--muted)", lineHeight: 1.8 }}>
        We do not sell personal information. Student details are shared with institutions or service partners only when required for a requested application or counselling process.
      </p>
    </main>
  );
}
