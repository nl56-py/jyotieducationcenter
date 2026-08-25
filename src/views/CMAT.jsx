"use client";
import React, { useState } from "react";
import "./CMAT.css";
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
  HelpCircle,
} from "lucide-react";

export function CMAT({ navigate }) {
  const heroBenefits = [
    { icon: <UserCheck size={22} />, title: "Expert Faculty", text: "Learn from experienced mentors and industry experts." },
    { icon: <ClipboardList size={22} />, title: "Mock Tests", text: "Topic-wise and full-length mock tests." },
    { icon: <BookOpen size={22} />, title: "Study Material", text: "Structured notes, practice questions and e-books." },
  ];

  const whatYouGet = [
    { icon: <BookOpen size={28} />, title: "Complete Syllabus Coverage", desc: "Thorough coverage of all CMAT topics." },
    { icon: <ClipboardList size={28} />, title: "Concept-wise Tests", desc: "Strengthen concepts with regular tests." },
    { icon: <FileText size={28} />, title: "Full-length Mock Tests", desc: "Exam pattern based full-length mocks." },
    { icon: <UserCheck size={28} />, title: "Doubt Solving Sessions", desc: "Get your doubts solved by experts." },
    { icon: <Clock size={28} />, title: "Time Management Training", desc: "Learn strategies to solve faster and smarter." },
    { icon: <TrendingUp size={28} />, title: "Performance Analytics", desc: "Detailed analysis and personalized feedback." },
  ];

  const stats = [
    { icon: <Target size={28} />, val: "90%+", label: "Students improve their score" },
    { icon: <Users size={28} />, val: "4000+", label: "Students Trained" },
    { icon: <ClipboardList size={28} />, val: "25+", label: "Mock Tests Included" },
    { icon: <Trophy size={28} />, val: "98%+", label: "Top Percentile Achievers" },
  ];

  const whyChoose = [
    { icon: <UserCheck size={28} />, title: "Personalized Learning", desc: "Customized study plans as per your strengths and weaknesses." },
    { icon: <Heart size={28} />, title: "Regular Feedback", desc: "Continuous performance analysis with actionable feedback." },
    { icon: <Lightbulb size={28} />, title: "Smart Learning", desc: "Concept clarity with smart techniques and shortcuts." },
    { icon: <Star size={28} />, title: "Result Driven Approach", desc: "Focused strategies to achieve top percentile." },
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
      className="cmat-root"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      
      {/* ── 1. HERO SECTION ── */}
      <section className="cmat-hero-wrap">
        <div className="cmat-hero">
          
          {/* Hero Left */}
          <motion.div className="cmat-hero-left" variants={fadeInUp}>
            <span className="cmat-badge">CMAT PREPARATION</span>
            <h1 className="cmat-hero-h1">
              Prepare Smart.<br />
              Crack CMAT.
            </h1>
            <p className="cmat-hero-desc">
              Expert guidance, smart strategies and regular practice to help you achieve
              top percentile in CMAT.
            </p>

            <div className="cmat-hero-benefits">
              {heroBenefits.map((b, i) => (
                <div className="cmat-benefit-item" key={i}>
                  <span className="cmat-benefit-icon">{b.icon}</span>
                  <div className="cmat-benefit-text">
                    <strong>{b.title}</strong>
                    <span>{b.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="cmat-hero-btn" onClick={() => navigate && navigate("/book-free-consultation")}>
              <Calendar size={18} /> Book Free Assessment <ArrowRight size={16} />
            </button>
          </motion.div>

          {/* Hero Right (Student Photo + Floating Widgets) */}
          <div className="cmat-hero-right">
            <motion.div className="cmat-hero-blob" variants={scaleIn} />
            
            <motion.div className="cmat-hero-img-wrap" variants={scaleIn}>
              <img
                src="/images/CMAT.png"
                alt="Student preparing for CMAT"
              />
            </motion.div>

            {/* Widget 1: Mock Test Score */}
            <motion.div className="cmat-widget cmat-widget-score"
              initial={{ opacity: 0, x: 50, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="cmat-widget-label">Mock Test Score</span>
              <div className="cmat-score-circle-wrap">
                <svg width="72" height="72" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#ede9f8" strokeWidth="7" />
                  <circle cx="40" cy="40" r="32" fill="none" stroke="url(#cmatScoreGrad)" strokeWidth="7"
                    strokeDasharray="201" strokeDashoffset="44" strokeLinecap="round"
                    style={{ transform: "rotate(-90deg)", transformOrigin: "center" }} />
                  <defs>
                    <linearGradient id="cmatScoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="cmat-score-num">
                  <strong>125</strong>
                  <span>/160</span>
                </div>
              </div>
              <div className="cmat-score-text">
                <span className="cmat-score-good">Good Performance</span>
                <span className="cmat-score-keep">
                  <Check size={11} strokeWidth={3} className="cmat-green" /> Good Performance!
                </span>
              </div>
            </motion.div>

            {/* Widget 2: Overall Progress */}
            <motion.div className="cmat-widget cmat-widget-progress"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="cmat-widget-label">Overall Progress</span>
              <div className="cmat-progress-value">78%</div>
              <div className="cmat-progress-track">
                <div className="cmat-progress-fill" style={{ width: "78%" }} />
              </div>
              <div className="cmat-progress-bars">
                {[30, 45, 60, 50, 75, 88, 78].map((h, i) => (
                  <div key={i} className={`cmat-mini-bar${i === 6 ? " active" : ""}`} style={{ height: `${h}%` }} />
                ))}
              </div>
            </motion.div>

            {/* Widget 3: Strong Areas */}
            <motion.div className="cmat-widget cmat-widget-areas"
              initial={{ opacity: 0, x: -50, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="cmat-widget-label">Strong Areas</span>
              <div className="cmat-areas-tags">
                <span>Quantitative</span>
                <span>Logical Reasoning</span>
                <span>Verbal Ability</span>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── 2. WHAT YOU GET SECTION ── */}
      <motion.section className="cmat-get-section" variants={fadeInUp}>
        <div className="cmat-section-divider">
          <span>WHAT YOU GET</span>
        </div>
        
        <motion.div className="cmat-get-grid" variants={staggerContainer}>
          {whatYouGet.map((card, i) => (
            <motion.div 
              className="cmat-get-card" 
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="cmat-get-icon-wrap">
                {card.icon}
              </div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ── 3. STATS BAND ── */}
      <motion.section className="cmat-stats-band" variants={fadeInUp}>
        <div className="cmat-stats-container">
          {stats.map((s, i) => (
            <div className="cmat-stat-item" key={i}>
              <div className="cmat-stat-icon-wrap">{s.icon}</div>
              <div className="cmat-stat-info">
                <h3>{s.val}</h3>
                <span>{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── 4. EXAM HIGHLIGHTS ── */}
      <motion.section className="cmat-highlights-section" variants={fadeInUp}>
        <div className="cmat-section-divider">
          <span>EXAM HIGHLIGHTS</span>
        </div>

        <div className="cmat-highlights-card">
          <div className="cmat-highlights-icon">
            <ClipboardList size={38} />
          </div>
          <div className="cmat-highlights-grid">
            <div className="cmat-highlight-item">
              <span className="cmat-highlight-label">Exam Name</span>
              <span className="cmat-highlight-val">CMAT<br /><span className="cmat-subtext">(Common Management Admission Test)</span></span>
            </div>
            <div className="cmat-highlight-item">
              <span className="cmat-highlight-label">Conducted By</span>
              <span className="cmat-highlight-val">NTA<br /><span className="cmat-subtext">(National Testing Agency)</span></span>
            </div>
            <div className="cmat-highlight-item">
              <span className="cmat-highlight-label">Level</span>
              <span className="cmat-highlight-val">Undergraduate (Management)</span>
            </div>
            <div className="cmat-highlight-item">
              <span className="cmat-highlight-label">Sections</span>
              <span className="cmat-highlight-val cmat-list-val">
                • Quantitative Techniques<br />
                • Logical Reasoning<br />
                • Language Comprehension<br />
                • General Awareness
              </span>
            </div>
            <div className="cmat-highlight-item">
              <span className="cmat-highlight-label">Exam Pattern</span>
              <span className="cmat-highlight-val">Multiple Choice Questions</span>
            </div>
            <div className="cmat-highlight-item">
              <span className="cmat-highlight-label">Duration</span>
              <span className="cmat-highlight-val">3 Hours</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── 5. WHY CHOOSE SECTION ── */}
      <motion.section className="cmat-why-section" variants={fadeInUp}>
        <div className="cmat-section-divider">
          <span>WHY CHOOSE JYOTI EDUCATIONS FOR CMAT PREPARATION?</span>
        </div>

        <motion.div className="cmat-why-grid" variants={staggerContainer}>
          {whyChoose.map((w, i) => (
            <motion.div 
              className="cmat-why-card" 
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="cmat-why-icon-wrap">{w.icon}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ── 6. CTA BANNER ── */}
      <motion.section className="cmat-cta-banner" variants={fadeInUp}>
        <div className="cmat-cta-left">
          <div className="cmat-cta-icon-box">
            <Target size={28} />
          </div>
          <div>
            <h2>Ready to ace CMAT?</h2>
            <p>Book a free counselling session and take the first step towards your management career.</p>
          </div>
        </div>
        <motion.button 
          className="cmat-cta-btn" 
          onClick={() => navigate && navigate("/book-free-consultation")}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Book Free Counselling <ArrowRight size={16} />
        </motion.button>
      </motion.section>

      {/* ── 7. FOOTER BAR ── */}
      <motion.section className="cmat-footer-bar" variants={fadeInUp}>
        <div className="cmat-footer-item">
          <UserCheck size={22} className="cmat-footer-icon" />
          <div>
            <strong>Expert Guidance</strong>
            <span>from experienced mentors</span>
          </div>
        </div>
        <div className="cmat-footer-item">
          <Award size={22} className="cmat-footer-icon" />
          <div>
            <strong>Proven Results</strong>
            <span>Trusted by students across Nepal</span>
          </div>
        </div>
        <div className="cmat-footer-item">
          <Sparkles size={22} className="cmat-footer-icon" />
          <div>
            <strong>Supportive Environment</strong>
            <span>We're with you at every step</span>
          </div>
        </div>
      </motion.section>

    </motion.main>
  );
}
