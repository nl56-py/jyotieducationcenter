"use client";
import React, { useState } from "react";
import "./CEE.css";
import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Award,
  Users,
  Check,
  ArrowRight,
  ClipboardList,
  Clock,
  Trophy,
  Calendar,
  TrendingUp,
  UserCheck,
  Heart,
  Target,
  FileText,
  Star,
  Sparkles,
  Lightbulb,
} from "lucide-react";

export function CEE({ navigate }) {
  const [activeStep, setActiveStep] = useState(1);

  const heroBenefits = [
    { icon: <UserCheck size={22} />, title: "Expert Faculty", text: "Learn from experienced mentors and educators." },
    { icon: <ClipboardList size={22} />, title: "Mock Tests", text: "Chapter-wise and full-length mock tests." },
    { icon: <BookOpen size={22} />, title: "Study Material", text: "Updated notes, question bank & practice papers." },
  ];

  const whatYouGet = [
    { icon: <BookOpen size={28} />, title: "Complete Syllabus Coverage", desc: "Thorough coverage of all topics." },
    { icon: <ClipboardList size={28} />, title: "Chapter-wise Tests", desc: "Regular tests to strengthen concepts." },
    { icon: <FileText size={28} />, title: "Full-length Mock Tests", desc: "Exam pattern based mock tests." },
    { icon: <UserCheck size={28} />, title: "Doubt Solving Sessions", desc: "Daily doubt clearing by experts." },
    { icon: <Clock size={28} />, title: "Time Management Training", desc: "Strategies to solve faster and smarter." },
    { icon: <TrendingUp size={28} />, title: "Performance Reports", desc: "Detailed analysis and improvement plan." },
  ];

  const stats = [
    { icon: <Target size={28} />, val: "92%+", label: "Success Rate" },
    { icon: <Users size={28} />, val: "5000+", label: "Students Trained" },
    { icon: <ClipboardList size={28} />, val: "30+", label: "Mock Tests" },
    { icon: <Trophy size={28} />, val: "250+", label: "Top Rankers" },
  ];

  const highlights = [
    { label: "Exam Name", val: "Common Entrance Examination (CEE)" },
    { label: "Conducted By", val: "Tribhuvan University" },
    { label: "Level", val: "Undergraduate (Engineering)" },
    { label: "Subjects", val: "Physics, Chemistry, Mathematics" },
    { label: "Exam Pattern", val: "Objective Type" },
    { label: "Duration", val: "3 Hours" },
  ];

  const whyChoose = [
    { icon: <UserCheck size={28} />, title: "Personalized Learning", desc: "Customized study plans for every student." },
    { icon: <Heart size={28} />, title: "Regular Feedback", desc: "Continuous performance analysis and feedback." },
    { icon: <Lightbulb size={28} />, title: "Smart Learning", desc: "Concept clarity with smart techniques." },
    { icon: <Star size={28} />, title: "Result Driven Approach", desc: "Focused strategies for better results." },
  ];

  // Framer Motion Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.main 
      className="cee-root"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      
      {/* ── 1. HERO SECTION ── */}
      <section className="cee-hero-wrap">
        <div className="cee-hero">
          
          {/* Hero Left */}
          <motion.div className="cee-hero-left" variants={fadeInUp}>
            <span className="cee-badge">CEE PREPARATION</span>
            <h1 className="cee-hero-h1">
              Crack the CEE<br />
              with confidence.
            </h1>
            <p className="cee-hero-desc">
              Comprehensive preparation for the Common Entrance Examination with expert faculty,
              regular tests, and performance tracking.
            </p>

            <div className="cee-hero-benefits">
              {heroBenefits.map((b, i) => (
                <div className="cee-benefit-item" key={i}>
                  <span className="cee-benefit-icon">{b.icon}</span>
                  <div className="cee-benefit-text">
                    <strong>{b.title}</strong>
                    <span>{b.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="cee-hero-btn" onClick={() => navigate && navigate("/book-free-consultation")}>
              <Calendar size={18} /> Book Free Assessment <ArrowRight size={16} />
            </button>
          </motion.div>

          {/* Hero Right (Student Photo + Floating Widgets) */}
          <div className="cee-hero-right">
            <motion.div className="cee-hero-blob" variants={scaleIn} />
            
            <motion.div className="cee-hero-img-wrap" variants={scaleIn}>
              <img
                src="/images/cee-hero.jpg"
                alt="Student preparing for CEE Medical Entrance"
              />
            </motion.div>

            {/* Widget 1: Mock Test Score */}
            <motion.div className="cee-widget cee-widget-score"
              initial={{ opacity: 0, x: 50, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="cee-widget-label">Mock Test Score</span>
              <div className="cee-score-circle-wrap">
                <svg width="72" height="72" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#ede9f8" strokeWidth="7" />
                  <circle cx="40" cy="40" r="32" fill="none" stroke="url(#ceeScoreGrad)" strokeWidth="7"
                    strokeDasharray="201" strokeDashoffset="44" strokeLinecap="round"
                    style={{ transform: "rotate(-90deg)", transformOrigin: "center" }} />
                  <defs>
                    <linearGradient id="ceeScoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="cee-score-num">
                  <strong>125</strong>
                  <span>/160</span>
                </div>
              </div>
              <div className="cee-score-text">
                <span className="cee-score-good">Good</span>
                <span className="cee-score-keep">
                  <Check size={11} strokeWidth={3} /> Keep Practicing!
                </span>
              </div>
            </motion.div>

            {/* Widget 2: Overall Progress */}
            <motion.div className="cee-widget cee-widget-progress"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="cee-widget-label">Overall Progress</span>
              <div className="cee-progress-value">78%</div>
              <div className="cee-progress-track">
                <div className="cee-progress-fill" style={{ width: "78%" }} />
              </div>
              <div className="cee-progress-bars">
                {[30, 45, 60, 50, 75, 88, 78].map((h, i) => (
                  <div key={i} className={`cee-mini-bar${i === 6 ? " active" : ""}`} style={{ height: `${h}%` }} />
                ))}
              </div>
            </motion.div>

            {/* Widget 3: Strong Areas */}
            <motion.div className="cee-widget cee-widget-areas"
              initial={{ opacity: 0, x: -50, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="cee-widget-label">Strong Areas</span>
              <div className="cee-areas-tags">
                <span>Quantitative</span>
                <span>Logical Reasoning</span>
                <span>Verbal Ability</span>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── 2. WHAT YOU GET SECTION ── */}
      <motion.section className="cee-get-section" variants={fadeInUp}>
        <div className="cee-section-divider">
          <span>WHAT YOU GET</span>
        </div>
        
        <motion.div className="cee-get-grid" variants={staggerContainer}>
          {whatYouGet.map((card, i) => (
            <motion.div 
              className="cee-get-card" 
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="cee-get-icon-wrap">
                {card.icon}
              </div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ── 3. STATS BAND ── */}
      <motion.section className="cee-stats-band" variants={fadeInUp}>
        <div className="cee-stats-container">
          {stats.map((s, i) => (
            <div className="cee-stat-item" key={i}>
              <div className="cee-stat-icon-wrap">{s.icon}</div>
              <div className="cee-stat-info">
                <h3>{s.val}</h3>
                <span>{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── 4. EXAM HIGHLIGHTS ── */}
      <motion.section className="cee-highlights-section" variants={fadeInUp}>
        <div className="cee-section-divider">
          <span>EXAM HIGHLIGHTS</span>
        </div>

        <div className="cee-highlights-card">
          <div className="cee-highlights-icon">
            <ClipboardList size={38} />
          </div>
          <div className="cee-highlights-grid">
            {highlights.map((h, i) => (
              <div className="cee-highlight-item" key={i}>
                <span className="cee-highlight-label">{h.label}</span>
                <span className="cee-highlight-val">{h.val}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── 5. WHY CHOOSE SECTION ── */}
      <motion.section className="cee-why-section" variants={fadeInUp}>
        <div className="cee-section-divider">
          <span>WHY CHOOSE JYOTI EDUCATIONS FOR CEE PREPARATION?</span>
        </div>

        <motion.div className="cee-why-grid" variants={staggerContainer}>
          {whyChoose.map((w, i) => (
            <motion.div 
              className="cee-why-card" 
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="cee-why-icon-wrap">{w.icon}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ── 6. CTA BANNER ── */}
      <motion.section className="cee-cta-banner" variants={fadeInUp}>
        <div className="cee-cta-left">
          <div className="cee-cta-icon-box">
            <Calendar size={28} />
          </div>
          <div>
            <h2>Ready to start your CEE journey?</h2>
            <p>Book a free counselling session with our experts today.</p>
          </div>
        </div>
        <motion.button 
          className="cee-cta-btn" 
          onClick={() => navigate && navigate("/book-free-consultation")}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Book Free Assessment <ArrowRight size={16} />
        </motion.button>
      </motion.section>

      {/* ── 7. FOOTER BAR ── */}
      <motion.section className="cee-footer-bar" variants={fadeInUp}>
        <div className="cee-footer-item">
          <UserCheck size={22} className="cee-footer-icon" />
          <div>
            <strong>Expert Guidance</strong>
            <span>from experienced mentors</span>
          </div>
        </div>
        <div className="cee-footer-item">
          <Award size={22} className="cee-footer-icon" />
          <div>
            <strong>Proven Results</strong>
            <span>Trusted by students across Nepal</span>
          </div>
        </div>
        <div className="cee-footer-item">
          <Sparkles size={22} className="cee-footer-icon" />
          <div>
            <strong>Supportive Environment</strong>
            <span>We're with you at every step</span>
          </div>
        </div>
      </motion.section>

    </motion.main>
  );
}
