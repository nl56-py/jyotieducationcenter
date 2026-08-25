export default function TermsOfUsePage() {
  return (
    <main className="section" style={{ maxWidth: "900px" }}>
      <span className="eyebrow">Legal</span>
      <h1 style={{ color: "var(--navy)", fontSize: "clamp(2rem, 4vw, 3rem)", margin: "12px 0 18px" }}>
        Terms of Use
      </h1>
      <p style={{ color: "var(--muted)", lineHeight: 1.8 }}>
        By using the Jyoti Educations website, you agree to use the information provided here for general guidance only. Final admission, scholarship, visa, and immigration decisions are made by the relevant institutions and authorities.
      </p>
      <p style={{ color: "var(--muted)", lineHeight: 1.8 }}>
        Website content, images, and materials belong to Jyoti Educations or their respective owners and may not be copied or reused without permission. For official counselling, documentation review, or application support, please contact Jyoti Educations directly.
      </p>
    </main>
  );
}
