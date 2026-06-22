"use client";
import React from "react";
import "./medical.css";
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

export function Medical({ navigate }) {
  const heroBenefits = [
    { icon: <UserCheck size={22} />, title: "Expert Faculty", text: "Learn from experienced doctors and mentors." },
    { icon: <ClipboardList size={22} />, title: "Mock Tests", text: "Topic-wise and full-length mock tests." },
    { icon: <BookOpen size={22} />, title: "Study Material", text: "NCERT-based notes, practice questions and e-books." },
    { icon: <TrendingUp size={22} />, title: "Performance Tracking", text: "Detailed analysis and personalized feedback." },
  ];

  const whatYouGet = [
    { icon: <BookOpen size={28} />, title: "Complete Syllabus Coverage", desc: "NCERT-based complete coverage of Physics, Chemistry & Biology." },
    { icon: <ClipboardList size={28} />, title: "Concept-wise Tests", desc: "Strengthen concepts with chapter-wise tests." },
    { icon: <FileText size={28} />, title: "Full-length Mock Tests", desc: "Exam pattern based full-length mocks." },
    { icon: <UserCheck size={28} />, title: "Doubt Solving Sessions", desc: "Get your doubts solved by experts." },
    { icon: <Clock size={28} />, title: "Time Management Training", desc: "Learn strategies to solve faster and smarter." },
    { icon: <TrendingUp size={28} />, title: "Performance Analytics", desc: "Detailed analysis and personalized feedback." },
  ];

  const stats = [
    { icon: <Target size={28} />, val: "92%+", label: "Students improve their score" },
    { icon: <Users size={28} />, val: "6000+", label: "Students Trained" },
    { icon: <ClipboardList size={28} />, val: "50+", label: "Mock Tests Included" },
    { icon: <Trophy size={28} />, val: "300+", label: "Top Rankers Every Year" },
    { icon: <Award size={28} />, val: "20+", label: "Medical Exams Covered" },
  ];



  const whyChoose = [
    { icon: <UserCheck size={28} />, title: "Personalized Learning", desc: "Customized study plans based on your strengths and goals." },
    { icon: <Heart size={28} />, title: "Regular Feedback", desc: "Continuous performance analysis and actionable feedback." },
    { icon: <Lightbulb size={28} />, title: "Smart Learning", desc: "Concept clarity with smart techniques and shortcuts." },
    { icon: <Star size={28} />, title: "Result Driven Approach", desc: "Focused strategies for better ranks and success." },
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
        staggerChildren: 0.12
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.main 
      className="med-root"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      
      {/* ── 1. HERO SECTION ── */}
      <section className="med-hero-wrap">
        <div className="med-hero">
          
          {/* Hero Left */}
          <motion.div className="med-hero-left" variants={fadeInUp}>
            <span className="med-badge">MEDICAL ENTRANCE PREPARATION</span>
            <h1 className="med-hero-h1">
              Prepare Today.<br />
              Save Lives Tomorrow.
            </h1>
            <p className="med-hero-desc">
              Expert guidance, proven strategies and top-quality preparation for NEET and other
              medical entrance exams.
            </p>

            <div className="med-hero-benefits">
              {heroBenefits.map((b, i) => (
                <div className="med-benefit-item" key={i}>
                  <span className="med-benefit-icon">{b.icon}</span>
                  <div className="med-benefit-text">
                    <strong>{b.title}</strong>
                    <span>{b.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="med-hero-btn" onClick={() => navigate && navigate("/book-free-consultation")}>
              <Calendar size={18} /> Book Free Counselling <ArrowRight size={16} />
            </button>
          </motion.div>

          {/* Hero Right */}
          <motion.div className="med-hero-right" variants={scaleIn}>
            <div className="med-img-container">
              <img
                src="/images/medical.png"
                alt="Student preparing for Medical Entrance"
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── 2. WHAT YOU GET SECTION ── */}
      <motion.section className="med-get-section" variants={fadeInUp}>
        <div className="med-section-divider">
          <span>WHAT YOU GET</span>
        </div>
        
        <motion.div className="med-get-grid" variants={staggerContainer}>
          {whatYouGet.map((card, i) => (
            <motion.div 
              className="med-get-card" 
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="med-get-icon-wrap">
                {card.icon}
              </div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ── 3. STATS BAND ── */}
      <motion.section className="med-stats-band" variants={fadeInUp}>
        <div className="med-stats-container">
          {stats.map((s, i) => (
            <div className="med-stat-item" key={i}>
              <div className="med-stat-icon-wrap">{s.icon}</div>
              <div className="med-stat-info">
                <h3>{s.val}</h3>
                <span>{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

    

      {/* ── 5. WHY CHOOSE SECTION ── */}
      <motion.section className="med-why-section" variants={fadeInUp}>
        <div className="med-section-divider">
          <span>WHY CHOOSE EDUMARK?</span>
        </div>

        <motion.div className="med-why-grid" variants={staggerContainer}>
          {whyChoose.map((w, i) => (
            <motion.div 
              className="med-why-card" 
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="med-why-icon-wrap">{w.icon}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ── 6. CTA BANNER ── */}
      <motion.section className="med-cta-banner" variants={fadeInUp}>
        <div className="med-cta-left">
          <div className="med-cta-icon-box">
            <Calendar size={28} />
          </div>
          <div>
            <h2>Ready to start your medical journey?</h2>
            <p>Book a free counselling session and take the first step towards your dream career.</p>
          </div>
        </div>
        <motion.button 
          className="med-cta-btn" 
          onClick={() => navigate && navigate("/book-free-consultation")}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Book Free Counselling <ArrowRight size={16} />
        </motion.button>
      </motion.section>

      {/* ── 7. FOOTER BAR ── */}
      <motion.section className="med-footer-bar" variants={fadeInUp}>
        <div className="med-footer-item">
          <UserCheck size={22} className="med-footer-icon" />
          <div>
            <strong>Expert Guidance</strong>
            <span>from experienced doctors and mentors</span>
          </div>
        </div>
        <div className="med-footer-item">
          <Award size={22} className="med-footer-icon" />
          <div>
            <strong>Proven Results</strong>
            <span>Trusted by students across India</span>
          </div>
        </div>
        <div className="med-footer-item">
          <Sparkles size={22} className="med-footer-icon" />
          <div>
            <strong>Supportive Environment</strong>
            <span>We're with you at every step</span>
          </div>
        </div>
      </motion.section>

    </motion.main>
  );
}
