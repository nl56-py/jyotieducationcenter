"use client";
import "./entrance.css";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Award,
  Users,
  Check,
  ArrowRight,
  Stethoscope,
  Settings,
  BarChart3,
  Building2,
  FileText,
  Heart,
  Target,
  FileEdit,
  TrendingUp,
  MessagesSquare,
  Trophy,
  Clock,
  Calendar,
} from "lucide-react";
import { assets } from "../data/assets.js";

export function EntrancePage({ navigate }) {
  const [activeStep, setActiveStep] = useState(1);

  const heroBenefits = [
    { icon: <Users size={16} />, text: "Expert Faculty" },
    { icon: <BookOpen size={16} />, text: "Smart Learning" },
    { icon: <Award size={16} />, text: "Proven Results" },
  ];

  const trustedDomains = [
    { key: "medical",      icon: <Stethoscope size={26} />, title: "Medical",      text: "Prepare for competitive medical entrance examinations." },
    { key: "engineering",  icon: <Settings size={26} />,    title: "Engineering",  text: "Ace engineering entrance exams with conceptual clarity." },
    { key: "management",   icon: <BarChart3 size={26} />,   title: "Management",   text: "Crack management entrance exams with confidence." },
    { key: "hospitality",  icon: <Building2 size={26} />,   title: "Hospitality",  text: "Step into the world of hospitality with the right preparation." },
  ];

  const programs = [
    {
      title: "CEE\nPreparation", theme: "purple", icon: <BookOpen size={22} />,
      desc: "Complete preparation for Common Entrance Examination with focused training.",
      bullets: ["Mock Tests", "Question Bank", "Video Lectures", "Performance Tracking"],
      path: "/entrance-preparations/cee"
    },
    {
      title: "CMAT\nPreparation", theme: "blue", icon: <FileText size={22} />,
      desc: "Comprehensive coaching for CMAT with strategy and practice.",
      bullets: ["Topic-wise Tests", "Previous Papers", "Doubt Solving", "Score Improvement"],
      path: "/entrance-preparations/cmat"
    },
    {
      title: "Engineering\nEntrances", theme: "purple", icon: <Settings size={22} />,
      desc: "Preparation for engineering entrance exams like KU EE, IOE, and more.",
      bullets: ["Concept Building", "Mock Exams", "Time Management", "Performance Analysis"],
      path: "/entrance-preparations/engineering"
    },
    {
      title: "Medical\nEntrances", theme: "blue", icon: <Heart size={22} />,
      desc: "Focused coaching for medical entrance exams like KU MBBS, BDS and more.",
      bullets: ["NCERT Based Study", "Regular Tests", "Expert Guidance", "Personalized Plan"],
      path: "/entrance-preparations/medical"
    },
  ];

  /* Circular diagram – 6 nodes placed around the ring */
  const formulaSteps = [
    { id: 1, icon: <Target size={20} />,       title: "Goal Setting",          desc: "Identify the right exam and target score",              pos: "top"          },
    { id: 2, icon: <BookOpen size={20} />,      title: "Smart Learning",        desc: "Concept clarity with structured study",                 pos: "top-right"    },
    { id: 3, icon: <FileEdit size={20} />,      title: "Practice & Tests",      desc: "Regular tests and real exam practice",                  pos: "bottom-right" },
    { id: 4, icon: <TrendingUp size={20} />,    title: "Analysis & Improvement",desc: "Performance analysis and strategy refinement",          pos: "bottom"       },
    { id: 5, icon: <MessagesSquare size={20} />,title: "Interview Prep",        desc: "Personalized guidance and confidence building",         pos: "bottom-left"  },
    { id: 6, icon: <Trophy size={20} />,        title: "Exam Success",          desc: "Achieve your target and secure admission",              pos: "top-left"     },
  ];

  const whyFeatures = [
    { icon: <Users size={18} />,       title: "Expert Faculty",       desc: "Learn from experienced and dedicated mentors." },
    { icon: <BookOpen size={18} />,    title: "Smart Study Material", desc: "Well-structured notes and resources." },
    { icon: <TrendingUp size={18} />,  title: "Performance Tracking", desc: "Regular analysis and personal feedback." },
    { icon: <MessagesSquare size={18} />, title: "Doubt Solving",     desc: "Quick doubt resolution in every class." },
  ];

  const achievements = [
    { icon: <Target size={20} />,       title: "Clear Preparation Roadmap",   desc: "Step-by-step plan for your target exam." },
    { icon: <Award size={20} />,        title: "Strong Exam Confidence",      desc: "Regular practice builds accuracy and confidence." },
    { icon: <FileEdit size={20} />,     title: "Performance Analysis",        desc: "Track progress and improve your weak areas." },
    { icon: <Clock size={20} />,        title: "Better Time Management",      desc: "Learn smart strategies to save time in exams." },
    { icon: <GraduationCap size={20} />,title: "Higher Admission Opportunities", desc: "Be prepared to get into top institutions." },
  ];

  return (
    <main className="ep-root">

      {/* ── 1. HERO ── */}
      <div className="ep-hero-wrap">
        <div className="ep-hero-backdrop" />
        <section className="ep-hero">

          {/* LEFT */}
          <div className="ep-hero-left">
            <span className="ep-eyebrow">Entrance Preparations</span>
            <h1 className="ep-hero-h1">
              Prepare smart.<br />
              Aim high.<br />
              <span className="ep-hero-purple">Crack the entrance.</span>
            </h1>
            <p className="ep-hero-desc">
              After +2 preparation for medical, management, engineering,
              hospitality, and related bachelor routes.
            </p>
            <div className="ep-hero-benefits">
              {heroBenefits.map((b, i) => (
                <div className="ep-benefit-item" key={i}>
                  <span className="ep-benefit-icon">{b.icon}</span>
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="ep-hero-right">
            <div className="ep-hero-blob" />

            <div className="ep-hero-img-wrap">
              <img
                src={assets.entrance || "/images/brochure/entrance-prep.jpg"}
                alt="Student preparing"
              />
            </div>

            {/* Widget – Mock Test Score */}
            <motion.div className="ep-widget ep-widget-score"
              initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="ep-widget-row">
                <div className="ep-widget-col">
                  <span className="ep-widget-label">Mock Test Score</span>
                  <div className="ep-score-circle-wrap">
                    <svg width="80" height="80" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="32" fill="none" stroke="#ede9f8" strokeWidth="7" />
                      <circle cx="40" cy="40" r="32" fill="none" stroke="url(#scoreGrad)" strokeWidth="7"
                        strokeDasharray="201" strokeDashoffset="44" strokeLinecap="round"
                        style={{ transform: "rotate(-90deg)", transformOrigin: "center" }} />
                      <defs>
                        <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#5b177d" />
                          <stop offset="100%" stopColor="#08a8d7" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="ep-score-num">
                      <strong>125</strong>
                      <span>/160</span>
                    </div>
                  </div>
                  <div className="ep-score-good">Good</div>
                  <div className="ep-score-keep">
                    <Check size={11} strokeWidth={3} /> Keep Practicing!
                  </div>
                </div>

                <div className="ep-widget-col">
                  <span className="ep-widget-label">Overall Progress</span>
                  <div className="ep-progress-value">78%</div>
                  <div className="ep-progress-track">
                    <div className="ep-progress-fill" style={{ width: "78%" }} />
                  </div>
                  <div className="ep-progress-bars">
                    {[30, 45, 60, 50, 75, 88, 78].map((h, i) => (
                      <div key={i} className={`ep-mini-bar${i === 6 ? " active" : ""}`} style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Widget – Strong Areas */}
            <motion.div className="ep-widget ep-widget-areas"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <span className="ep-widget-label">Strong Areas</span>
              <div className="ep-areas-tags">
                <span>Quantitative</span>
                <span>Logical Reasoning</span>
                <span>Verbal Ability</span>
              </div>
            </motion.div>
          </div>

        </section>
      </div>

      {/* ── 2. TRUSTED DOMAINS ── */}
      <section className="ep-trusted-section">
        <div className="ep-divider-text">Trusted by +2 graduates preparing for</div>
        <div className="ep-trusted-grid">
          {trustedDomains.map((d) => (
            <div className={`ep-trusted-card ep-trusted-${d.key}`} key={d.key}>
              <div className="ep-trusted-icon">{d.icon}</div>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. PROGRAMS ── */}
      <section className="ep-programs-section">
        <div className="ep-programs-title">
          <h2>Our Entrance Preparation Programs</h2>
        </div>
        <div className="ep-programs-grid">
          {programs.map((prog, i) => (
            <div className={`ep-prog-card ep-prog-${prog.theme}`} key={i}>
              <div className="ep-prog-header">
                <div className="ep-prog-icon">{prog.icon}</div>
                <h3>{prog.title.split("\n").map((line, li) => <span key={li}>{line}<br /></span>)}</h3>
              </div>
              <p>{prog.desc}</p>
              <ul className="ep-prog-bullets">
                {prog.bullets.map((b, bi) => (
                  <li key={bi}>
                    <span className="ep-check-icon"><Check size={12} strokeWidth={3} /></span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <button className="ep-prog-btn" onClick={() => navigate && navigate(prog.path || "/book-free-consultation")}>
                Know More <ArrowRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. WHY PREPARE + CIRCULAR FORMULA ── */}
      <section className="ep-why-section">
        <div className="ep-why-left">
          <span className="ep-why-eyebrow">WHY PREPARE WITH EDUMARK</span>
          <h2>A proven approach<br />to your success</h2>
          <p>Our structured preparation methodology ensures conceptual clarity, consistent practice, and performance improvement.</p>
          <div className="ep-why-features">
            {whyFeatures.map((f, i) => (
              <div className="ep-why-feature" key={i}>
                <div className="ep-why-feature-icon">{f.icon}</div>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ep-why-right">
          <div className="ep-circle-diagram">
            {/* dashed orbit ring */}
            <svg className="ep-orbit-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="27.5" stroke="rgba(124, 58, 237, 0.06)" strokeWidth="1.2" />
              <circle cx="50" cy="50" r="27.5" stroke="rgba(124, 58, 237, 0.25)" strokeWidth="0.3" strokeDasharray="1 1.5" />
            </svg>

            {/* Center hub */}
            <div className="ep-circle-hub">
              <span>Entrance<br />Success<br />Formula</span>
            </div>

            {/* Nodes */}
           {formulaSteps.map((step, index) => {
  const angle = (-90 + index * 60) * (Math.PI / 180);
  const radius = 27.5; // 27.5% of container size
  const x = 50 + Math.cos(angle) * radius;
  const y = 50 + Math.sin(angle) * radius;

  return (
    <div
      key={step.id}
      className={`ep-node ep-node-${step.pos} ${
        activeStep === step.id ? "ep-node-active" : ""
      }`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        position: "absolute"
      }}
      onMouseEnter={() => setActiveStep(step.id)}
    >
      <div className="ep-node-circle">
        {step.icon}
        <span className="ep-node-badge">{step.id}</span>
      </div>

      <div className="ep-node-text">
        <h5>{step.title}</h5>
        <p>{step.desc}</p>
      </div>
    </div>
  );
})}
           
          </div>
        </div>
      </section>

      {/* ── 5. WHAT YOU'LL ACHIEVE ── */}
      <section className="ep-achieve-section">
        <div className="ep-section-divider-title">What you'll achieve</div>
        <div className="ep-achieve-grid">
          {achievements.map((item, i) => (
            <div className="ep-achieve-card" key={i}>
              <div className="ep-achieve-icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. CTA BANNER ── */}
      <div className="ep-cta-banner">
        <div className="ep-cta-left">
          <div className="ep-cta-icon-box"><Calendar size={24} /></div>
          <div>
            <h2>Ready to start your preparation journey?</h2>
            <p>Book a free counseling session with our experts today.</p>
          </div>
        </div>
        <button className="ep-cta-btn" onClick={() => navigate && navigate("/book-free-consultation")}>
          Book Free Assessment <ArrowRight size={15} />
        </button>
      </div>
    </main>
  );
}
