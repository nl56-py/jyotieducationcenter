export function SectionIntro({ eyebrow, title, text, align = "left" }) {
  return (
    <div className={`section-intro ${align === "center" ? "section-intro-center" : ""}`}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}
