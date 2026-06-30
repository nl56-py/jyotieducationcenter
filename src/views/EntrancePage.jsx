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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  React.useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % 6) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const heroBenefits = [
    { icon: <Users size={16} />, text: "Expert Faculty" },
    { icon: <BookOpen size={16} />, text: "Smart Learning" },
    { icon: <Award size={16} />, text: "Proven Results" },
  ];

  const trustedDomains = [
    { key: "medical", icon: <Stethoscope size={26} />, title: "MBBS & CEE", text: "Focused support for MBBS, BDS, Nursing, and allied health entrance routes." },
    { key: "engineering",  icon: <Settings size={26} />,    title: "Engineering",  text: "Ace engineering entrance exams with conceptual clarity." },
    { key: "management",   icon: <BarChart3 size={26} />,   title: "Management",   text: "Crack management entrance exams with confidence." },
    { key: "hospitality",  icon: <Building2 size={26} />,   title: "Hospitality",  text: "Step into the world of hospitality with the right preparation." },
  ];

  const programs = [
    {
      title: "CEE\nPreparation", theme: "purple", icon: <BookOpen size={22} />,
      desc: "Focused CEE preparation for MBBS, BDS, BSc Nursing, and allied health pathways.",
      bullets: ["Mock Tests", "Question Bank", "Medical Stream Guidance", "Performance Tracking"],
      path: "/entrance-preparations/cee"
    },
    {
      title: "MBBS, BDS\n& Nursing", theme: "orange", icon: <Stethoscope size={22} />,
      desc: "Targeted preparation for medical and allied health pathways after +2 Science.",
      bullets: ["CEE Focus", "Biology Review", "Clinical Aptitude", "Admission Guidance"],
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const fadeInOnly = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <main className="ep-root">

      {/* ── 1. HERO ── */}
      <div className="ep-hero-wrap">
        <div className="ep-hero-backdrop" />
        <section className="ep-hero">

          {/* LEFT */}
          <motion.div 
            className="ep-hero-left"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.span className="ep-eyebrow" variants={itemVariants}>Entrance Preparations</motion.span>
            <motion.h1 className="ep-hero-h1" variants={itemVariants}>
              Prepare smart.<br />
              Aim high.<br />
              <span className="ep-hero-purple">Crack the entrance.</span>
            </motion.h1>
            <motion.p className="ep-hero-desc" variants={itemVariants}>
              After +2 preparation for medical, management, engineering,
              hospitality, and related bachelor routes.
            </motion.p>
            <motion.div className="ep-hero-benefits" variants={itemVariants}>
              {heroBenefits.map((b, i) => (
                <div className="ep-benefit-item" key={i}>
                  <span className="ep-benefit-icon">{b.icon}</span>
                  <span>{b.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <div className="ep-hero-right">
            <div className="ep-hero-blob" />

            <motion.div 
              className="ep-hero-img-wrap"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.1 }}
            >
              <img
                src={assets.entrance || "/images/brochure/entrance-prep.jpg"}
                alt="Student preparing"
              />
            </motion.div>

            {/* Widget – Mock Test Score */}
            <motion.div className="ep-widget ep-widget-score"
              initial={{ opacity: 0, x: -40 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
            >
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
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
            >
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
      <motion.section 
        className="ep-trusted-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div className="ep-divider-text" variants={itemVariants}>
          Trusted by +2 graduates preparing for CEE, MBBS, BDS, Nursing, and related bachelor entrances
        </motion.div>
        <div className="ep-trusted-grid">
          {trustedDomains.map((d) => (
            <motion.div 
              className={`ep-trusted-card ep-trusted-${d.key}`} 
              key={d.key}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div className="ep-trusted-icon">{d.icon}</div>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── 3. PROGRAMS ── */}
      <section className="ep-programs-section">
        <motion.div 
          className="ep-programs-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInOnly}
        >
          <h2>Our Entrance Preparation Programs</h2>
        </motion.div>
        <motion.div 
          className="ep-programs-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {programs.map((prog, i) => (
            <motion.div 
              className={`ep-prog-card ep-prog-${prog.theme}`} 
              key={i}
              variants={itemVariants}
              whileHover={{ y: -7, scale: 1.02 }}
            >
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
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── 4. WHY PREPARE + CIRCULAR FORMULA ── */}
      <section className="ep-why-section">
        <motion.div 
          className="ep-why-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.span className="ep-why-eyebrow" variants={itemVariants}>WHY PREPARE WITH EDUMARK</motion.span>
          <motion.h2 variants={itemVariants}>A proven approach<br />to your success</motion.h2>
          <motion.p variants={itemVariants}>Our structured preparation methodology ensures conceptual clarity, consistent practice, and performance improvement.</motion.p>
          <div className="ep-why-features">
            {whyFeatures.map((f, i) => (
              <motion.div className="ep-why-feature" key={i} variants={itemVariants}>
                <div className="ep-why-feature-icon">{f.icon}</div>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="ep-why-right"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div 
            className="ep-circle-diagram"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* dashed orbit ring */}
            <svg className="ep-orbit-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="27.5" stroke="rgba(124, 58, 237, 0.06)" strokeWidth="1.2" />
              <circle cx="50" cy="50" r="27.5" stroke="rgba(124, 58, 237, 0.25)" strokeWidth="0.3" strokeDasharray="1 1.5" />
            </svg>

            {/* Center hub */}
            <motion.div 
              className="ep-circle-hub"
              style={{ x: "-50%", y: "-50%" }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.05 }}
            >
              <span>Entrance<br />Success<br />Formula</span>
            </motion.div>

            {/* Nodes */}
           {formulaSteps.map((step, index) => {
              const angle = (-90 + index * 60) * (Math.PI / 180);
              const radius = 27.5; // 27.5% of container size
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;

              return (
                <motion.div
                  key={step.id}
                  className={`ep-node ep-node-${step.pos} ${
                    activeStep === step.id ? "ep-node-active" : "ep-node-inactive"
                  }`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    x: "-50%",
                    y: "-50%",
                    position: "absolute"
                  }}
                  onMouseEnter={() => {
                    setActiveStep(step.id);
                    setIsAutoPlaying(false);
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + 0.1, type: "spring", stiffness: 80 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="ep-node-circle">
                    {step.icon}
                    <span className="ep-node-badge">{step.id}</span>
                  </div>

                  <div className="ep-node-text">
                    <h5>{step.title}</h5>
                    <p>{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
           
          </div>
        </motion.div>
      </section>

      {/* ── 5. WHAT YOU'LL ACHIEVE ── */}
      <motion.section 
        className="ep-achieve-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div className="ep-section-divider-title" variants={itemVariants}>
          What you&apos;ll achieve
        </motion.div>
        <div className="ep-achieve-grid">
          {achievements.map((item, i) => (
            <motion.div 
              className="ep-achieve-card" 
              key={i}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.03 }}
            >
              <div className="ep-achieve-icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── 6. CTA BANNER ── */}
      <motion.div 
        className="ep-cta-banner"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
      >
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
      </motion.div>
    </main>
  );
}
