import { useEffect, useRef } from "react";
import { AppLink } from "../components/AppLink.jsx";
import { SectionIntro } from "../components/SectionIntro.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { InquiryBand } from "../components/InquiryBand.jsx";
import { assets } from "../data/assets.js";

function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    el.querySelectorAll("[data-reveal]").forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return ref;
}

function useParallax(strength = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame;
    const onScroll = () => {
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const center = rect.top + rect.height / 2;
        const offset = (center - vh / 2) * strength;
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [strength]);

  return ref;
}

// Tilted 3D card with mouse-driven depth + scroll parallax
function useTiltCard(maxTilt = 8) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(1200px) rotateY(${x * maxTilt * 2}deg) rotateX(${-y * maxTilt * 2}deg)`;
    };

    const handleLeave = () => {
      el.style.transform = "perspective(1200px) rotateY(0deg) rotateX(0deg)";
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [maxTilt]);

  return ref;
}

const CORE_OBJECTIVES = [
  "Provide job-oriented training and practical skills for real-world careers, in Nepal and abroad.",
  "Offer expert academic and career guidance for confident, informed decisions.",
  "Open new opportunities after completion — higher education, training, or employment.",
  "Deliver standard, reliable, and inclusive consultancy services.",
  "Organize activities that build academic excellence, creativity, and leadership.",
  "Provide outstanding preparation programs in a student-friendly environment.",
];

const MISSION_POINTS = [
  "Discover their potential",
  "Develop essential life and career skills",
  "Access international education pathways",
  "Become confident, globally aware individuals",
];

export function AboutPage({ navigate }) {
  const heroImageRef = useReveal();
  const introRef = useReveal();
  const detailRef = useReveal();
  const tiltCard = useTiltCard(6);
  const tiltParallax = useParallax(0.08);

  return (
    <main className="about-page">
      <style>{`
        :root {
          --ink: #1e2540;
          --muted: #6b7494;
          --indigo: #4f46e5;
          --indigo-soft: #818cf8;
          --indigo-pale: #eef0ff;
          --warm: #ff9f6e;
          --warm-pale: #fff1e8;
          --surface: #ffffff;
          --ring: rgba(79, 70, 229, 0.14);
        }

        .about-page { overflow-x: hidden; position: relative; }

        [data-reveal] {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        [data-reveal].is-visible { opacity: 1; transform: translateY(0); }
        [data-reveal="scale"] { transform: scale(0.92); }
        [data-reveal="scale"].is-visible { transform: scale(1); }
        [data-reveal="left"] { transform: translateX(-40px); }
        [data-reveal="left"].is-visible { transform: translateX(0); }
        [data-reveal="right"] { transform: translateX(40px); }
        [data-reveal="right"].is-visible { transform: translateX(0); }

        ${[...Array(8)].map((_, i) => `
          [data-delay="${i + 1}"] { transition-delay: ${i * 0.08}s; }
        `).join("")}

        /* ---------- Tilted 3D hero image ---------- */
        .hero-image-section {
          position: relative;
          z-index: 1;
          padding-top: 1rem;
          padding-bottom: 1rem;
        }
        .tilt-wrap {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          min-height: 360px;
        }
        .tilt-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          transform-style: preserve-3d;
          background: var(--indigo-pale);
          box-shadow:
            0 40px 80px -30px rgba(79, 70, 229, 0.35),
            0 16px 40px -16px rgba(0, 0, 0, 0.12);
          min-height: 360px;
        }
        .tilt-card img {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 360px;
          max-height: 520px;
          object-fit: cover;
          transform: scale(1.04);
          transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tilt-card:hover img { transform: scale(1.1); }
        .tilt-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, rgba(79, 70, 229, 0.18), transparent 55%);
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        .tilt-shadow {
          position: absolute;
          inset: 6% -3% -8% -3%;
          border-radius: 28px;
          background: linear-gradient(135deg, var(--indigo-pale), var(--warm-pale));
          z-index: -1;
          transform: translateZ(-40px);
        }

        .tilt-accent {
          position: absolute;
          border-radius: 50%;
          z-index: -1;
        }
        .tilt-accent.warm {
          width: 140px;
          height: 140px;
          background: var(--warm-pale);
          top: -10%;
          right: 2%;
          animation: float-soft 8s ease-in-out infinite;
        }
        .tilt-accent.indigo {
          width: 100px;
          height: 100px;
          background: var(--indigo-pale);
          bottom: -6%;
          left: -2%;
          animation: float-soft 10s ease-in-out infinite reverse;
        }
        @keyframes float-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }

        .hero-badge {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(6px);
          border-radius: 16px;
          padding: 0.7rem 1.1rem;
          box-shadow: 0 16px 36px -16px rgba(30, 37, 64, 0.3);
          z-index: 2;
        }
        .hero-badge strong {
          display: block;
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--ink);
          line-height: 1;
        }
        .hero-badge span {
          display: block;
          font-size: 0.72rem;
          color: var(--muted);
          margin-top: 0.15rem;
        }
        .hero-badge .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--warm);
          box-shadow: 0 0 0 4px var(--warm-pale);
          flex-shrink: 0;
          animation: pulse 2.2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 4px var(--warm-pale); }
          50% { box-shadow: 0 0 0 8px transparent; }
        }

        /* ---------- Intro section ---------- */
        .intro-section {
          position: relative;
          z-index: 1;
          max-width: 760px;
        }
        .intro-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--indigo);
          margin-bottom: 0.85rem;
        }
        .intro-eyebrow::before {
          content: "";
          width: 22px;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, var(--indigo), var(--warm));
        }
        .intro-section h2 {
          font-size: 2rem;
          line-height: 1.25;
          color: var(--ink);
          margin: 0 0 1.1rem;
          letter-spacing: -0.01em;
        }
        .intro-section p {
          color: var(--muted);
          line-height: 1.8;
          margin: 0 0 1.1rem;
        }
        .intro-section p:last-of-type { margin-bottom: 1.75rem; }

        .primary-button {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }
        .primary-button::after {
          content: "";
          position: absolute;
          top: 0;
          left: -120%;
          width: 60%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.45), transparent);
          transform: skewX(-20deg);
          transition: left 0.7s ease;
        }
        .primary-button:hover::after { left: 130%; }

        /* ---------- Detail section ---------- */
        .detail-section { position: relative; z-index: 1; }
        .detail-divider {
          width: 56px;
          height: 4px;
          border-radius: 4px;
          background: linear-gradient(90deg, var(--indigo), var(--warm));
          margin: 0.5rem auto 1.75rem;
        }
        .detail-section h4 {
          font-size: 1.2rem;
          color: var(--ink);
          margin: 2.25rem 0 1.1rem;
          letter-spacing: -0.005em;
        }
        .detail-section > [data-reveal] > p {
          color: var(--muted);
          line-height: 1.75;
          margin: 0 0 1.25rem;
        }
        .quote-block {
          position: relative;
          padding: 1.25rem 1.5rem;
          margin: 0 0 1.5rem;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--indigo-pale), #ffffff);
          border: 1px solid rgba(79, 70, 229, 0.10);
          color: var(--ink);
          font-style: italic;
          font-size: 1.05rem;
          line-height: 1.7;
        }
        .quote-block::before {
          content: "\\201C";
          position: absolute;
          top: -0.6rem;
          left: 1rem;
          font-size: 3rem;
          line-height: 1;
          color: var(--warm);
          font-style: normal;
          font-family: Georgia, serif;
          opacity: 0.6;
        }

        .checklist {
          display: grid;
          gap: 0.85rem;
          list-style: none;
          margin: 0 0 1.5rem;
          padding: 0;
        }
        .checklist li {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          padding: 0.9rem 1.1rem;
          border-radius: 14px;
          background: var(--surface);
          border: 1px solid rgba(30, 37, 64, 0.06);
          box-shadow: 0 6px 18px -12px rgba(30, 37, 64, 0.10);
          color: var(--muted);
          line-height: 1.6;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.4s ease,
                      border-color 0.4s ease;
        }
        .checklist li:hover {
          transform: translateX(6px);
          box-shadow: 0 14px 28px -16px var(--ring);
          border-color: rgba(79, 70, 229, 0.22);
        }
        .checklist .check-icon {
          flex-shrink: 0;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--indigo), var(--indigo-soft));
          color: #fff;
          font-size: 0.8rem;
          font-weight: 700;
          margin-top: 0.1rem;
        }

        .mission-points {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          list-style: none;
          margin: 0 0 1.5rem;
          padding: 0;
        }
        .mission-points li {
          display: flex;
          align-items: flex-start;
          gap: 0.7rem;
          padding: 1rem 1.1rem;
          border-radius: 14px;
          background: linear-gradient(160deg, #ffffff, var(--warm-pale));
          border: 1px solid rgba(255, 159, 110, 0.18);
          color: var(--ink);
          font-weight: 500;
          line-height: 1.5;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.4s ease;
        }
        .mission-points li:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 28px -16px rgba(255, 159, 110, 0.35);
        }
        .mission-points .point-icon {
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--warm), #ffc39c);
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
          margin-top: 0.1rem;
        }

        @media (max-width: 900px) {
          .intro-section { max-width: 100%; }
          .intro-section h2 { font-size: 1.6rem; }
          .mission-points { grid-template-columns: 1fr; }
          .tilt-card { transform: none !important; }
          .tilt-shadow { display: none; }
        }
        @media (max-width: 600px) {
          .hero-badge { left: 1rem; bottom: 1rem; padding: 0.5rem 0.85rem; }
          .hero-badge strong { font-size: 1.05rem; }
        }
      `}</style>

      <PageHero
        eyebrow="About EduMark"
        title="The most trusted consultancy in Eastern Region"
        text="EduMark connects students with global exposure, study abroad guidance, test preparation, entrance preparation, and visa readiness from one visible Biratnagar team."
        image={assets.counselling}
      />

      {/* Tilted 3D hero image with scroll parallax */}
      <section className="section hero-image-section" ref={heroImageRef}>
        <div className="tilt-wrap" data-reveal="scale">
          <span className="tilt-accent warm" aria-hidden="true" />
          <span className="tilt-accent indigo" aria-hidden="true" />
          <div className="tilt-shadow" aria-hidden="true" />
          <div className="tilt-card" ref={tiltCard}>
            <div ref={tiltParallax}>
              <img src="/images/brochure/hero-background.jpg" alt="EduMark counselling session" />
            </div>
            <div className="hero-badge">
              <span className="dot" />
              <div>
                <strong>14+</strong>
                <span>Years of trust</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro section */}
      <section className="section intro-section" ref={introRef}>
        <div data-reveal="left">
          <span className="intro-eyebrow">About Us</span>
          <h2>Your trusted partner for study abroad guidance and career readiness</h2>
          <p>
            Located in the heart of Biratnagar, EduMark Pvt. Ltd. is a trusted name
            in counselling, documentation support, and entrance preparation across
            the Eastern Region.
          </p>
          <p>
            Established in 2012, EduMark has grown into a visible, full-service
            consultancy — combining honest advice, careful documentation, and
            dedicated preparation support to help students from Koshi Province
            move confidently toward global education and career goals.
          </p>
          <AppLink to="/book-free-consultation" navigate={navigate} className="primary-button">
            Talk to EduMark
          </AppLink>
        </div>
      </section>

      {/* Objectives, Mission & Vision */}
      <section className="section detail-section" ref={detailRef}>
        <div data-reveal>
          <SectionIntro
            eyebrow="Our Foundation"
            title="Our objectives, mission & vision"
            text=""
            align="center"
          />
          <div className="detail-divider" />
          <p style={{ maxWidth: "60ch", margin: "0 auto 1.5rem", textAlign: "center" }}>
            At EduMark Pvt. Ltd., we are driven by a clear mission to empower
            students with the skills, guidance, and preparation support they need
            to succeed — reflecting our long-term commitment to clarity,
            accountability, and measurable results.
          </p>
        </div>

        <div data-reveal data-delay="1">
          <h4>Our core objectives</h4>
          <ul className="checklist">
            {CORE_OBJECTIVES.map((item, i) => (
              <li key={i} data-reveal="left" data-delay={Math.min((i % 6) + 1, 6)}>
                <span className="check-icon">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal data-delay="2">
          <h4>Our mission</h4>
          <div className="quote-block">
            "To empower students through transparent counselling, careful
            documentation, and preparation support — helping them unlock global
            opportunities and build successful, value-driven futures."
          </div>
          <p>
            Our mission is to provide trusted educational consultancy, test
            preparation, and entrance preparation programs that help students
            grow academically, professionally, and personally. We create a
            supportive, honest environment where students can:
          </p>
          <ul className="mission-points">
            {MISSION_POINTS.map((item, i) => (
              <li key={i} data-reveal="scale" data-delay={i + 1}>
                <span className="point-icon">★</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal data-delay="3">
          <h4>Our vision</h4>
          <div className="quote-block">
            "To become the most trusted multi-destination education partner for
            students in Koshi Province — where quality counselling meets
            career-focused preparation, and every student is guided toward a
            brighter, global future."
          </div>
          <p>
            We envision EduMark as a centre of excellence in study abroad
            guidance, test preparation, and visa readiness — supporting a
            generation that is informed, prepared, and globally competitive.
          </p>
        </div>
      </section>

      <InquiryBand navigate={navigate} />
    </main>
  );
}