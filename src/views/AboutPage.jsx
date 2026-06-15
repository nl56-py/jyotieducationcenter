import { useEffect, useRef, useState } from "react";
import { AppLink } from "../components/AppLink.jsx";
import { SectionIntro } from "../components/SectionIntro.jsx";
import { assets } from "../data/assets.js";

const INTAKES = [
  { label: "February Intake", date: new Date("2026-02-01") },
  { label: "September Intake", date: new Date("2026-09-01") },
  { label: "July Intake", date: new Date("2026-07-01") },
];
function getNextIntake() {
  const now = new Date();
  const upcoming = INTAKES.filter((i) => i.date > now).sort((a, b) => a.date - b.date);
  return upcoming[0] || INTAKES[0];
}
function useDaysUntil(targetDate) {
  const [days, setDays] = useState(null);
  useEffect(() => {
    const calc = () => setDays(Math.max(0, Math.ceil((targetDate - new Date()) / 86400000)));
    calc();
    const id = setInterval(calc, 60000);
    return () => clearInterval(id);
  }, [targetDate]);
  return days;
}

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); } }),
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );
    el.querySelectorAll("[data-reveal]").forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);
  return ref;
}

function useTiltCard(maxTilt = 8) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1200px) rotateY(${x * maxTilt * 2}deg) rotateX(${-y * maxTilt * 2}deg)`;
    };
    const leave = () => { el.style.transform = "perspective(1200px) rotateY(0deg) rotateX(0deg)"; };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, [maxTilt]);
  return ref;
}

const MISSION_POINTS = [
  { icon: "🌐", label: "Global Pathways", text: "Access international education across 10+ destinations" },
  { icon: "🧭", label: "Expert Guidance", text: "Personalised counselling from experienced advisors" },
  { icon: "📈", label: "Career Readiness", text: "Build skills that employers and institutions value" },
  { icon: "🛡️", label: "End-to-End Support", text: "From application through visa to departure prep" },
];

const FEATURE_GRID = [
  { icon: "🎓", title: "Global Exposure", text: "Connecting you to the world's best opportunities.", tone: "indigo" },
  { icon: "📋", title: "Expert Guidance", text: "Personalized counselling for smarter decisions.", tone: "warm" },
  { icon: "📖", title: "Test & Entrance Prep", text: "Comprehensive preparation for academic success.", tone: "indigo" },
  { icon: "🛡️", title: "Visa Readiness", text: "End-to-end support for a smooth journey.", tone: "warm" },
];

const IB_PERKS = [
  { icon: "🗓️", text: "Intake planning tailored to your profile" },
  { icon: "📄", text: "Document checklist & review" },
  { icon: "🌐", text: "Destination & course shortlisting" },
];

function AnimatedHeroVisual() {
  return (
    <div className="animated-visual">
      <div className="av-glow av-glow--indigo" />
      <div className="av-glow av-glow--warm" />
      <div className="av-image-frame">
        <img src="/images/generated/counselling.png" alt="EduMark counselling session" />
        <div className="av-image-overlay" />
      </div>
      <div className="av-orbit av-orbit--1"><div className="av-orbit-dot av-orbit-dot--indigo" /></div>
      <div className="av-orbit av-orbit--2"><div className="av-orbit-dot av-orbit-dot--warm" /></div>
      <div className="av-card av-card--tl">
        <span className="av-card-icon">🎓</span>
        <div><strong>2,400+</strong><span>Students placed</span></div>
      </div>
      <div className="av-card av-card--br">
        <span className="av-card-icon">🌍</span>
        <div><strong>10+ Countries</strong><span>Study destinations</span></div>
      </div>
      <div className="av-years-badge">
        <svg viewBox="0 0 100 100" className="av-years-ring">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(79,70,229,0.15)" strokeWidth="2" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="url(#ringGrad)" strokeWidth="2.5" strokeDasharray="264" strokeDashoffset="66" strokeLinecap="round" />
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" /><stop offset="100%" stopColor="#ff9f6e" />
            </linearGradient>
          </defs>
        </svg>
        <div className="av-years-text"><strong>14</strong><span>years</span></div>
      </div>
      <div className="av-dots" aria-hidden="true">{Array.from({ length: 20 }).map((_, i) => <span key={i} />)}</div>
    </div>
  );
}

function InquiryBandInline({ navigate }) {
  const ref = useRef(null);
  const nextIntake = getNextIntake();
  const days = useDaysUntil(nextIntake.date);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("ib-in"); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <section className="ib-wrap" ref={ref}>
      <div className="ib-shell">
        <div className="ib-card">
          <div className="ib-left">
            <div className="ib-a"><span className="ib-free-tag">Free counselling available</span></div>
            <div className="ib-headline ib-a ib-d1">
              <h2>Plan your next<br />intake with <em>EduMark.</em></h2>
              <p>One honest conversation with our advisors — no sales pressure, no hidden fees. Just a clear path forward.</p>
            </div>
            <div className="ib-actions ib-a ib-d2">
              <AppLink to="/book-free-consultation" navigate={navigate} className="ib-btn-primary">Book free session →</AppLink>
              <AppLink to="/contact" navigate={navigate} className="ib-btn-ghost">Visit our Biratnagar office</AppLink>
            </div>
          </div>
          <div className="ib-right">
            <div className="ib-countdown ib-a ib-d2">
              <div>
                <div className="ib-countdown-label">Coming up</div>
                <div className="ib-countdown-intake">{nextIntake.label}</div>
              </div>
              <div className="ib-divider-v" />
              <div><span className="ib-days-num">{days ?? "—"}</span><span className="ib-days-unit">days away</span></div>
            </div>
            <ul className="ib-perks">
              {IB_PERKS.map((p, i) => (
                <li className={`ib-perk ib-a ib-d${i + 3}`} key={p.text}>
                  <span className="ib-perk-icon">{p.icon}</span>{p.text}
                </li>
              ))}
            </ul>
            <div className="ib-nocost ib-a ib-d5"><span className="ib-nocost-dot" />Zero cost · No obligation · Walk in or book online</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutPage({ navigate }) {
  const heroRef = useReveal(), introRef = useReveal(), missionRef = useReveal(), visionRef = useReveal();
  const tiltCard = useTiltCard(6);

  return (
    <main className="about-page">
      <style>{`
        :root {
          --ink:#1e2540; --muted:#6b7494; --indigo:#4f46e5; --indigo-soft:#818cf8;
          --indigo-pale:#eef0ff; --warm:#ff9f6e; --warm-pale:#fff1e8;
          --surface:#fff; --ring:rgba(79,70,229,0.14);
        }
        .about-page { overflow-x:hidden; position:relative; }

        [data-reveal] { opacity:0; transform:translateY(36px); transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1); }
        [data-reveal].is-visible { opacity:1; transform:translateY(0); }
        [data-reveal="scale"] { transform:scale(.92); }
        [data-reveal="scale"].is-visible { transform:scale(1); }
        [data-reveal="left"] { transform:translateX(-40px); }
        [data-reveal="left"].is-visible { transform:translateX(0); }
        [data-reveal="right"] { transform:translateX(40px); }
        [data-reveal="right"].is-visible { transform:translateX(0); }
        ${[...Array(8)].map((_, i) => `[data-delay="${i + 1}"]{transition-delay:${i * .09}s}`).join("")}

        /* Hero */
        .about-hero { position:relative; z-index:1; display:grid; grid-template-columns:1fr 1.15fr; gap:3rem; align-items:center; padding:1.5rem 0; }
        .hero-eyebrow { display:inline-flex; align-items:center; gap:.5rem; font-size:.78rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--indigo); margin-bottom:1rem; }
        .hero-eyebrow::before { content:""; width:24px; height:3px; border-radius:3px; background:linear-gradient(90deg,var(--indigo),var(--warm)); }
        .about-hero h1 { font-size:2.6rem; line-height:1.2; color:var(--ink); margin:0 0 1.25rem; letter-spacing:-.015em; font-weight:800; }
        .about-hero .hero-text { color:var(--muted); line-height:1.8; margin:0; max-width:46ch; }
        .primary-button { position:relative; overflow:hidden; isolation:isolate; }
        .primary-button::after { content:""; position:absolute; top:0; left:-120%; width:60%; height:100%; background:linear-gradient(120deg,transparent,rgba(255,255,255,.45),transparent); transform:skewX(-20deg); transition:left .7s ease; }
        .primary-button:hover::after { left:130%; }

        /* Animated Visual */
        .animated-visual { position:relative; width:100%; aspect-ratio:4/5; max-height:520px; }
        .av-glow { position:absolute; border-radius:50%; filter:blur(60px); opacity:.55; z-index:0; }
        .av-glow--indigo { width:70%; height:70%; top:5%; right:0; background:radial-gradient(circle,#c7c3ff 0%,transparent 70%); animation:glow-drift 9s ease-in-out infinite; }
        .av-glow--warm { width:55%; height:55%; bottom:5%; left:0; background:radial-gradient(circle,#ffd5bc 0%,transparent 70%); animation:glow-drift 11s ease-in-out infinite reverse; }
        @keyframes glow-drift { 0%,100%{transform:translate(0,0)} 50%{transform:translate(12px,-16px)} }
        .av-image-frame { position:absolute; inset:0; border-radius:28px; overflow:hidden; z-index:1; box-shadow:0 48px 96px -32px rgba(79,70,229,.38),0 20px 48px -20px rgba(0,0,0,.14); }
        .av-image-frame img { width:100%; height:100%; object-fit:cover; transform:scale(1.06); transition:transform 1.2s cubic-bezier(.16,1,.3,1); }
        .av-image-frame:hover img { transform:scale(1.12); }
        .av-image-overlay { position:absolute; inset:0; background:linear-gradient(160deg,rgba(79,70,229,.22) 0%,transparent 45%,rgba(255,159,110,.18) 100%); mix-blend-mode:overlay; pointer-events:none; }
        .av-orbit { position:absolute; border-radius:50%; border:1.5px solid rgba(79,70,229,.18); z-index:2; pointer-events:none; }
        .av-orbit--1 { width:110%; height:110%; top:-5%; left:-5%; animation:orbit-spin 18s linear infinite; }
        .av-orbit--2 { width:125%; height:125%; top:-12.5%; left:-12.5%; border-color:rgba(255,159,110,.13); animation:orbit-spin 28s linear infinite reverse; }
        @keyframes orbit-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .av-orbit-dot { position:absolute; width:10px; height:10px; border-radius:50%; top:50%; left:-5px; transform:translateY(-50%); }
        .av-orbit-dot--indigo { background:var(--indigo); box-shadow:0 0 12px 4px rgba(79,70,229,.5); }
        .av-orbit-dot--warm { background:var(--warm); box-shadow:0 0 12px 4px rgba(255,159,110,.5); }
        .av-card { position:absolute; z-index:3; display:flex; align-items:center; gap:.65rem; background:rgba(255,255,255,.96); backdrop-filter:blur(10px); border-radius:16px; padding:.75rem 1.1rem; box-shadow:0 20px 48px -16px rgba(30,37,64,.28); border:1px solid rgba(255,255,255,.9); animation:float-card 6s ease-in-out infinite; }
        .av-card--tl { top:1.5rem; left:-1.5rem; }
        .av-card--br { bottom:2rem; right:-1.5rem; animation-delay:-3s; }
        @keyframes float-card { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .av-card-icon { font-size:1.5rem; }
        .av-card strong { display:block; font-size:1rem; font-weight:800; color:var(--ink); line-height:1.1; }
        .av-card span { display:block; font-size:.72rem; color:var(--muted); margin-top:.1rem; }
        .av-years-badge { position:absolute; z-index:3; bottom:1.5rem; left:50%; transform:translateX(-50%); width:88px; height:88px; display:flex; align-items:center; justify-content:center; }
        .av-years-ring { position:absolute; inset:0; width:100%; height:100%; animation:orbit-spin 12s linear infinite; }
        .av-years-text { position:relative; text-align:center; background:rgba(255,255,255,.95); backdrop-filter:blur(8px); border-radius:50%; width:64px; height:64px; display:flex; flex-direction:column; align-items:center; justify-content:center; box-shadow:0 8px 24px -8px rgba(79,70,229,.3); }
        .av-years-text strong { display:block; font-size:1.4rem; font-weight:900; color:var(--ink); line-height:1; }
        .av-years-text span { display:block; font-size:.62rem; color:var(--muted); font-weight:600; letter-spacing:.06em; text-transform:uppercase; }
        .av-dots { position:absolute; top:-2rem; right:-2rem; display:grid; grid-template-columns:repeat(5,1fr); gap:7px; z-index:0; }
        .av-dots span { width:5px; height:5px; border-radius:50%; background:var(--indigo-soft); opacity:.4; }

        /* Intro */
        .intro-section { position:relative; z-index:1; display:grid; grid-template-columns:1fr 1.1fr; gap:3rem; align-items:start; }
        .intro-eyebrow { display:inline-flex; align-items:center; gap:.5rem; font-size:.78rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--indigo); margin-bottom:.85rem; }
        .intro-eyebrow::before { content:""; width:22px; height:2px; border-radius:2px; background:linear-gradient(90deg,var(--indigo),var(--warm)); }
        .intro-section h2 { font-size:1.9rem; line-height:1.25; color:var(--ink); margin:0 0 1.1rem; letter-spacing:-.01em; }
        .intro-section .intro-divider { width:48px; height:4px; border-radius:4px; background:linear-gradient(90deg,var(--indigo),var(--warm)); margin:0 0 1.25rem; }
        .intro-section p { color:var(--muted); line-height:1.8; margin:0 0 1.1rem; }
        .intro-section p:last-of-type { margin-bottom:1.75rem; }
        .feature-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:1rem; }
        .feature-card { display:flex; flex-direction:column; gap:.65rem; padding:1.3rem 1.25rem; border-radius:18px; background:var(--surface); border:1px solid rgba(30,37,64,.06); box-shadow:0 10px 28px -18px rgba(30,37,64,.14); transition:transform .4s cubic-bezier(.34,1.56,.64,1),box-shadow .4s ease,border-color .4s ease; }
        .feature-card:hover { transform:translateY(-6px); box-shadow:0 20px 40px -18px var(--ring); border-color:rgba(79,70,229,.22); }
        .feature-icon { width:46px; height:46px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:1.4rem; transition:transform .4s cubic-bezier(.34,1.56,.64,1); }
        .feature-card:hover .feature-icon { transform:rotate(-6deg) scale(1.08); }
        .feature-icon.indigo { background:var(--indigo-pale); }
        .feature-icon.warm { background:var(--warm-pale); }
        .feature-card h4 { margin:0; font-size:1.02rem; color:var(--ink); font-weight:700; }
        .feature-card p { margin:0; font-size:.88rem; color:var(--muted); line-height:1.55; }

        /* Mission */
        .mission-section { position:relative; z-index:1; }
        .mission-eyebrow { display:inline-flex; align-items:center; gap:.5rem; font-size:.78rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--indigo); margin-bottom:.85rem; }
        .mission-eyebrow::before { content:""; width:22px; height:2px; border-radius:2px; background:linear-gradient(90deg,var(--indigo),var(--warm)); }
        .mission-section h2 { font-size:1.9rem; line-height:1.25; color:var(--ink); margin:0 0 .6rem; letter-spacing:-.01em; }
        .mission-section .mission-lead { color:var(--muted); line-height:1.75; max-width:58ch; margin:0 0 2rem; }
        .mission-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:1.1rem; }
        .mission-card { display:flex; align-items:flex-start; gap:1rem; padding:1.3rem 1.25rem; border-radius:20px; background:linear-gradient(160deg,#fff 60%,var(--warm-pale)); border:1px solid rgba(255,159,110,.14); box-shadow:0 8px 24px -14px rgba(255,159,110,.2); transition:transform .4s cubic-bezier(.34,1.56,.64,1),box-shadow .4s ease; }
        .mission-card:hover { transform:translateY(-5px); box-shadow:0 20px 40px -16px rgba(255,159,110,.32); }
        .mission-card-icon { flex-shrink:0; width:48px; height:48px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:1.5rem; background:linear-gradient(135deg,var(--warm-pale),#ffe3cf); transition:transform .4s cubic-bezier(.34,1.56,.64,1); }
        .mission-card:hover .mission-card-icon { transform:scale(1.1) rotate(-5deg); }
        .mission-card h4 { margin:0 0 .3rem; font-size:1rem; font-weight:700; color:var(--ink); }
        .mission-card p { margin:0; font-size:.85rem; color:var(--muted); line-height:1.55; }

        /* Vision */
        .vision-section { position:relative; z-index:1; border-radius:32px; overflow:hidden; display:grid; grid-template-columns:1.1fr 1fr; min-height:440px; box-shadow:0 48px 96px -32px rgba(30,37,64,.22); margin:0 0 .5rem; }
        .vision-left { position:relative; background:var(--ink); padding:4rem 3.5rem; display:flex; flex-direction:column; justify-content:center; overflow:hidden; }
        .vision-left::before { content:""; position:absolute; top:-30%; right:-20%; width:300px; height:300px; border-radius:50%; background:radial-gradient(circle,rgba(79,70,229,.35) 0%,transparent 70%); }
        .vision-left::after { content:""; position:absolute; bottom:-20%; left:-10%; width:220px; height:220px; border-radius:50%; background:radial-gradient(circle,rgba(255,159,110,.22) 0%,transparent 70%); }
        .vision-tag { display:inline-flex; align-items:center; gap:.5rem; font-size:.72rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:var(--indigo-soft); margin-bottom:1.75rem; position:relative; z-index:1; }
        .vision-tag::before { content:""; width:20px; height:2px; background:linear-gradient(90deg,var(--indigo-soft),var(--warm)); border-radius:2px; }
        .vision-statement { position:relative; z-index:1; font-size:1.55rem; font-style:italic; font-weight:600; line-height:1.55; color:#fff; letter-spacing:-.01em; margin:0 0 2rem; }
        .vision-statement em { font-style:normal; background:linear-gradient(135deg,var(--indigo-soft),var(--warm)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .vision-divider { width:48px; height:3px; border-radius:3px; background:linear-gradient(90deg,var(--indigo-soft),var(--warm)); margin-bottom:1.25rem; position:relative; z-index:1; }
        .vision-sub { font-size:.9rem; color:rgba(255,255,255,.5); line-height:1.7; max-width:36ch; position:relative; z-index:1; }
        .vision-right { position:relative; background:linear-gradient(140deg,#0f1529 0%,#1a2048 100%); display:flex; align-items:center; justify-content:center; overflow:hidden; }
        .vision-right::before { content:""; position:absolute; inset:0; background:radial-gradient(circle at 60% 40%,rgba(79,70,229,.28) 0%,transparent 65%),radial-gradient(circle at 30% 80%,rgba(255,159,110,.18) 0%,transparent 55%); }
        .vision-globe-wrap { position:relative; width:260px; height:260px; }
        .vision-globe-svg { width:100%; height:100%; position:absolute; inset:0; }
        .vision-pin { position:absolute; display:flex; flex-direction:column; align-items:center; animation:pin-pulse 3s ease-in-out infinite; }
        .vision-pin::before { content:""; width:10px; height:10px; border-radius:50%; background:var(--warm); box-shadow:0 0 0 4px rgba(255,159,110,.25); }
        .vision-pin::after { content:""; width:2px; height:16px; background:linear-gradient(180deg,var(--warm),transparent); margin-top:2px; }
        .vision-pin:nth-child(2){top:20%;left:28%;animation-delay:-1s}
        .vision-pin:nth-child(3){top:35%;left:60%;animation-delay:-2s}
        .vision-pin:nth-child(4){top:58%;left:42%;animation-delay:-.5s}
        .vision-pin:nth-child(5){top:26%;left:75%;animation-delay:-1.5s}
        .vision-pin:nth-child(6){top:68%;left:22%;animation-delay:-2.5s}
        @keyframes pin-pulse { 0%,100%{transform:translateY(0) scale(1);opacity:1} 50%{transform:translateY(-6px) scale(1.1);opacity:.85} }
        .globe-line { stroke:rgba(129,140,248,.25); stroke-width:1; fill:none; stroke-dasharray:4 3; animation:line-march 8s linear infinite; }
        @keyframes line-march { from{stroke-dashoffset:0} to{stroke-dashoffset:-56} }
        .vision-label { position:absolute; font-size:.65rem; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:rgba(255,255,255,.65); background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.1); border-radius:8px; padding:.2rem .55rem; animation:float-soft 7s ease-in-out infinite; }
        .vision-label:nth-child(7){top:10%;left:8%;animation-delay:0s}
        .vision-label:nth-child(8){top:14%;right:8%;animation-delay:-2s}
        .vision-label:nth-child(9){bottom:18%;left:5%;animation-delay:-4s}
        .vision-label:nth-child(10){bottom:10%;right:10%;animation-delay:-1s}
        @keyframes float-soft { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

        /* InquiryBand */
        .ib-wrap { padding:4rem 0 5rem; }
        .ib-shell { max-width:1160px; margin:0 auto; padding:0 2rem; }
        .ib-card { display:grid; grid-template-columns:1.05fr 1fr; border-radius:28px; overflow:hidden; box-shadow:0 48px 96px -32px rgba(30,37,64,.18),0 16px 40px -16px rgba(30,37,64,.08); }
        .ib-a { opacity:0; transform:translateY(24px); transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1); }
        .ib-in .ib-a{opacity:1;transform:none}
        .ib-in .ib-d1{transition-delay:.07s} .ib-in .ib-d2{transition-delay:.14s} .ib-in .ib-d3{transition-delay:.21s} .ib-in .ib-d4{transition-delay:.28s} .ib-in .ib-d5{transition-delay:.35s}
        .ib-left { background:var(--ink); padding:3.5rem 3.25rem; position:relative; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; gap:2.25rem; }
        .ib-left::before { content:""; position:absolute; top:-25%; right:-15%; width:280px; height:280px; border-radius:50%; background:radial-gradient(circle,rgba(79,70,229,.32) 0%,transparent 70%); pointer-events:none; }
        .ib-left::after { content:""; position:absolute; bottom:-20%; left:-10%; width:200px; height:200px; border-radius:50%; background:radial-gradient(circle,rgba(255,159,110,.18) 0%,transparent 70%); pointer-events:none; }
        .ib-free-tag { display:inline-flex; align-items:center; gap:.45rem; font-size:.7rem; font-weight:800; letter-spacing:.2em; text-transform:uppercase; color:var(--warm); position:relative; z-index:1; }
        .ib-free-tag::before { content:""; width:18px; height:2px; background:var(--warm); border-radius:2px; }
        .ib-headline { position:relative; z-index:1; }
        .ib-headline h2 { font-size:2.5rem; font-weight:800; line-height:1.18; letter-spacing:-.02em; color:#fff; margin:0 0 .65rem; }
        .ib-headline h2 em { font-style:normal; background:linear-gradient(120deg,var(--indigo-soft) 0%,var(--warm) 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .ib-headline p { font-size:.93rem; color:rgba(255,255,255,.5); line-height:1.65; margin:0; max-width:34ch; }
        .ib-actions { display:flex; flex-direction:column; gap:.75rem; position:relative; z-index:1; }
        .ib-btn-primary { display:inline-flex; align-items:center; justify-content:center; gap:.5rem; padding:.95rem 1.75rem; border-radius:14px; font-size:.95rem; font-weight:700; background:linear-gradient(135deg,var(--indigo) 0%,#6d28d9 100%); color:#fff; text-decoration:none; position:relative; overflow:hidden; transition:transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s ease; box-shadow:0 12px 32px -10px rgba(79,70,229,.55); }
        .ib-btn-primary::after { content:""; position:absolute; top:0; left:-110%; width:55%; height:100%; background:linear-gradient(120deg,transparent,rgba(255,255,255,.28),transparent); transform:skewX(-20deg); transition:left .6s ease; }
        .ib-btn-primary:hover { transform:translateY(-3px); box-shadow:0 20px 40px -12px rgba(79,70,229,.6); }
        .ib-btn-primary:hover::after { left:130%; }
        .ib-btn-ghost { display:inline-flex; align-items:center; justify-content:center; gap:.5rem; padding:.9rem 1.75rem; border-radius:14px; font-size:.92rem; font-weight:600; background:rgba(255,255,255,.06); color:rgba(255,255,255,.75); text-decoration:none; border:1px solid rgba(255,255,255,.12); transition:background .25s ease,border-color .25s ease,transform .3s cubic-bezier(.34,1.56,.64,1); }
        .ib-btn-ghost:hover { background:rgba(255,255,255,.11); border-color:rgba(255,255,255,.22); transform:translateY(-2px); }
        .ib-right { background:#faf9f7; padding:3.5rem 3rem; display:flex; flex-direction:column; justify-content:space-between; gap:1.5rem; border-left:1px solid rgba(30,37,64,.06); }
        .ib-countdown { background:#fff; border-radius:18px; padding:1.35rem 1.5rem; border:1px solid rgba(79,70,229,.1); box-shadow:0 8px 24px -10px rgba(79,70,229,.1); display:flex; align-items:center; justify-content:space-between; gap:1rem; }
        .ib-countdown-label { font-size:.68rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); margin-bottom:.3rem; }
        .ib-countdown-intake { font-size:1rem; font-weight:700; color:var(--ink); }
        .ib-divider-v { width:1px; height:40px; background:rgba(30,37,64,.1); flex-shrink:0; }
        .ib-days-num { display:block; font-size:2.4rem; font-weight:900; line-height:1; letter-spacing:-.03em; background:linear-gradient(135deg,var(--indigo),var(--warm)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; text-align:right; }
        .ib-days-unit { display:block; font-size:.65rem; font-weight:700; text-transform:uppercase; letter-spacing:.12em; color:var(--muted); margin-top:.1rem; text-align:right; }
        .ib-perks { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:.7rem; }
        .ib-perk { display:flex; align-items:center; gap:.85rem; padding:.85rem 1rem; border-radius:14px; background:#fff; border:1px solid rgba(30,37,64,.06); box-shadow:0 4px 14px -8px rgba(30,37,64,.08); font-size:.875rem; color:var(--ink); font-weight:500; transition:transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .3s ease; }
        .ib-perk:hover { transform:translateX(5px); box-shadow:0 10px 28px -10px rgba(79,70,229,.13); }
        .ib-perk-icon { font-size:1.15rem; flex-shrink:0; width:36px; height:36px; border-radius:10px; background:var(--indigo-pale); display:flex; align-items:center; justify-content:center; }
        .ib-nocost { display:flex; align-items:center; gap:.6rem; font-size:.78rem; color:var(--muted); }
        .ib-nocost-dot { width:8px; height:8px; border-radius:50%; background:#22c55e; box-shadow:0 0 0 3px rgba(34,197,94,.2); flex-shrink:0; animation:ib-pulse 2.5s ease-in-out infinite; }
        @keyframes ib-pulse { 0%,100%{box-shadow:0 0 0 3px rgba(34,197,94,.2)} 50%{box-shadow:0 0 0 6px rgba(34,197,94,.05)} }

        /* Responsive */
        @media(max-width:960px){
          .about-hero,.intro-section{grid-template-columns:1fr;gap:2.5rem}
          .about-hero h1{font-size:2.1rem}
          .mission-grid,.vision-section{grid-template-columns:1fr}
          .vision-right{min-height:340px}
          .av-card--tl{left:0} .av-card--br{right:0}
          .ib-card{grid-template-columns:1fr}
          .ib-left{padding:2.75rem 2rem}
          .ib-right{padding:2.5rem 2rem;border-left:none;border-top:1px solid rgba(30,37,64,.06)}
          .ib-headline h2{font-size:2rem}
        }
        @media(max-width:600px){
          .feature-grid{grid-template-columns:1fr}
          .vision-left{padding:2.5rem 1.75rem}
          .vision-statement{font-size:1.25rem}
          .ib-shell{padding:0 1rem}
          .ib-headline h2{font-size:1.7rem}
        }
      `}</style>

      {/* Hero */}
      <section className="section about-hero" ref={heroRef}>
        <div data-reveal="left">
          <span className="hero-eyebrow">About EduMark</span>
          <h1>The most trusted consultancy in Eastern Region</h1>
          <p className="hero-text">EduMark connects students with global exposure, study abroad guidance, test preparation, entrance preparation, and visa readiness from one visible Biratnagar team.</p>
        </div>
        <div data-reveal="right" data-delay="2">
          <div ref={tiltCard}><AnimatedHeroVisual /></div>
        </div>
      </section>

      {/* Intro */}
      <section className="section intro-section" ref={introRef}>
        <div data-reveal="left">
          <span className="intro-eyebrow">About Us</span>
          <h2>Your trusted partner for study abroad guidance and career readiness</h2>
          <div className="intro-divider" />
          <p>Located in the heart of Biratnagar, EduMark Pvt. Ltd. is a trusted name in counselling, documentation support, and entrance preparation across the Eastern Region.</p>
          <p>Established in 2012, EduMark has grown into a visible, full-service consultancy — combining honest advice, careful documentation, and dedicated preparation support to help students from Koshi Province move confidently toward global education and career goals.</p>
          <AppLink to="/book-free-consultation" navigate={navigate} className="primary-button">Talk to EduMark</AppLink>
        </div>
        <div data-reveal="right" data-delay="1">
          <div className="feature-grid">
            {FEATURE_GRID.map((f, i) => (
              <div className="feature-card" key={f.title} data-reveal="scale" data-delay={i + 1}>
                <div className={`feature-icon ${f.tone}`}>{f.icon}</div>
                <h4>{f.title}</h4><p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section mission-section" ref={missionRef}>
        <div data-reveal>
          <span className="mission-eyebrow">Our Mission</span>
          <h2>Empowering every student to go further</h2>
          <p className="mission-lead">We create a supportive, transparent environment where students gain the skills, knowledge, and confidence to unlock global opportunities and build value-driven futures.</p>
        </div>
        <div className="mission-grid" data-reveal data-delay="1">
          {MISSION_POINTS.map((p, i) => (
            <div className="mission-card" key={p.label} data-reveal="scale" data-delay={i + 1}>
              <div className="mission-card-icon">{p.icon}</div>
              <div><h4>{p.label}</h4><p>{p.text}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* Vision */}
      <section className="section" ref={visionRef}>
        <div className="vision-section" data-reveal>
          <div className="vision-left">
            <span className="vision-tag">Our Vision</span>
            <p className="vision-statement">
              To become the <em>most trusted</em> multi-destination education partner for students in Koshi Province — where quality counselling meets <em>career-focused preparation</em>, and every student is guided toward a brighter, global future.
            </p>
            <div className="vision-divider" />
            <p className="vision-sub">We envision EduMark as a centre of excellence — supporting a generation that is informed, prepared, and globally competitive.</p>
          </div>
          <div className="vision-right">
            <div className="vision-globe-wrap">
              <svg className="vision-globe-svg" viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg">
                <circle cx="130" cy="130" r="118" fill="none" stroke="rgba(79,70,229,0.12)" strokeWidth="1.5" />
                <circle cx="130" cy="130" r="100" fill="rgba(79,70,229,0.06)" stroke="rgba(79,70,229,0.2)" strokeWidth="1" />
                {[70, 95, 120, 145, 170].map(y => (
                  <ellipse key={y} cx="130" cy={y} rx={Math.sqrt(10000 - Math.pow(y - 130, 2))} ry="8" fill="none" stroke="rgba(129,140,248,0.18)" strokeWidth="0.8" />
                ))}
                {[0, 40, 80, 120, 160, 200].map((deg, i) => {
                  const rx = Math.abs(Math.cos(deg * Math.PI / 180)) * 100;
                  return <ellipse key={i} cx="130" cy="130" rx={rx < 5 ? 5 : rx} ry="100" fill="none" stroke="rgba(129,140,248,0.13)" strokeWidth="0.8" />;
                })}
                <path className="globe-line" d="M 73 52 Q 130 80 156 91" />
                <path className="globe-line" d="M 156 91 Q 170 115 109 151" />
                <path className="globe-line" d="M 73 52 Q 90 120 59 177" strokeDashoffset="14" />
                <defs>
                  <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.15" /><stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="130" cy="130" r="100" fill="url(#globeGlow)" />
              </svg>
              <span className="vision-pin" /><span className="vision-pin" /><span className="vision-pin" />
              <span className="vision-pin" /><span className="vision-pin" />
              <span className="vision-label">🇦🇺 Australia</span>
              <span className="vision-label">🇬🇧 UK</span>
              <span className="vision-label">🇨🇦 Canada</span>
              <span className="vision-label">🇯🇵 Japan</span>
            </div>
          </div>
        </div>
      </section>

      <InquiryBandInline navigate={navigate} />
    </main>
  );
}