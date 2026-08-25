"use client";
import { useEffect, useRef } from "react";
import { AppLink } from "../components/AppLink.jsx";
import { SectionIntro } from "../components/SectionIntro.jsx";
import { assets } from "../data/assets.js";
import {
  ClipboardCheck,
  Users,
  Globe,
  MessageSquare,
  BookOpen,
  FileText,
  FileCheck,
  Compass,
  DollarSign,
  HelpCircle,
  CheckSquare,
  Award,
  GraduationCap,
  Activity,
  UserPlus,
  PenTool,
  Briefcase,
  Plane,
  Home,
  MapPin,
  Map,
  Package,
  PhoneCall,
  LifeBuoy,
  Route,
  Calendar,
  Trophy
} from "lucide-react";

const slugToIcons = {
  "educational-consulting": [GraduationCap, BookOpen, Route, Users],
  "career-counselling": [ClipboardCheck, Users, Globe, MessageSquare],
  "study-abroad-guidance": [Globe, Compass, MapPin, Award],
  "visa-assistance": [DollarSign, HelpCircle, CheckSquare, Award],
  "university-application": [FileText, BookOpen, ClipboardCheck, Compass],
  "scholarship-guidance": [DollarSign, Award, Trophy, GraduationCap],
  "interview-preparation": [MessageSquare, Users, UserPlus, ClipboardCheck],
  "documentation-support": [FileText, FileCheck, ClipboardCheck, PenTool],
  "test-preparation-support": [GraduationCap, Activity, UserPlus, PenTool],
  "travel-accommodation": [Briefcase, Plane, Home, MapPin],
  "pre-departure-support": [Map, Package, PhoneCall, LifeBuoy],
  "admission-guidance": [GraduationCap, BookOpen, ClipboardCheck, Award]
};

const defaultIconsList = [ClipboardCheck, Users, Globe, MessageSquare];
const outcomeIcons = [Route, FileText, Calendar];

export function ServiceDetailPage({ service }) {
  const sectionRef = useRef(null);
  const icons = slugToIcons[service.slug] ?? defaultIconsList;

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [service.slug]);

  return (
    <main ref={sectionRef} style={{ background: "var(--white)", overflow: "hidden" }}>
      {/* ── CUSTOM PAGE HERO ── */}
      <section className="page-hero service-detail-hero animate-on-scroll">
        <div>
          <span className="support-card-eyebrow" style={{ color: "var(--red)", display: "inline-flex", alignItems: "center", gap: 12 }}>
            {service.title}
            <span className="eyebrow-line" />
          </span>
          <h1 className="hero-main-title">{service.title} with Jyoti Educations</h1>
          <p className="hero-desc-text">
            {service.slug === "career-counselling"
              ? "A professional session helps students compare abroad study, entrance preparation, test preparation, and local pathways before making financial commitments."
              : service.detail}
          </p>
        </div>
        <div className="hero-image-container">
          <img src={service.image || assets.counselling} alt={`${service.title} illustration`} />
        </div>
      </section>
  
      {/* ── SUPPORT CARDS ── */}
      <section className="section support-cards-section">
        <div className="support-cards-grid">
          {service.bullets.map((item, i) => {
            const IconComponent = icons[i] ?? ClipboardCheck;
            return (
              <article
                key={item}
                className="support-card animate-on-scroll"
                style={{ transitionDelay: `${(i % 4) * 0.15}s` }}
              >
                {/* Decorative dot patterns */}
                <div className="support-card-decor-top" />
                <div className="support-card-blob" />
                <div className="support-card-decor-bottom" />

                <div className="support-card-icon">
                  <IconComponent size={32} strokeWidth={1.8} />
                </div>
                <span className="support-card-eyebrow">Support</span>
                <h2 className="support-card-title">{item}</h2>
                <div className="support-card-underline" />
                <p className="support-card-desc">
                  This step is handled with clear counselling notes, required documents, and follow-up actions.
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── OUTCOMES + CTA ── */}
      <section className="section outcomes-section animate-on-scroll">
        <div>
          <div className="eyebrow-container" style={{ marginBottom: 12 }}>
            <span className="support-card-eyebrow" style={{ color: "var(--purple)", display: "inline-flex", alignItems: "center", gap: 12 }}>
              Expected Outcomes
              <span className="eyebrow-line-purple" />
            </span>
          </div>
          <h2 style={{ margin: "12px 0", fontSize: 40, fontWeight: 800, color: "var(--navy)", lineHeight: 1.14 }}>
            What students should leave with
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
            Each service is structured so students and families know exactly what to expect at every stage.
          </p>
          
          {/* Custom outcomes list */}
          <div className="outcomes-list">
            {service.outcomes.map((item, i) => {
              const Icon = outcomeIcons[i % outcomeIcons.length] || ClipboardCheck;
              return (
                <div key={item} className="outcomes-item">
                  <div className="outcomes-icon-wrapper">
                    <Icon size={20} strokeWidth={2.2} />
                  </div>
                  <span className="outcomes-text">{item}</span>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 32 }}>
            <AppLink
              to="/book-free-consultation"
              className="gradient-primary-button"
            >
              <Calendar size={18} />
              Book This Support
            </AppLink>
          </div>
        </div>

        <div className="outcomes-brochure-frame">
          <img src={assets.whyChoose} alt="Jyoti Educations support highlights" />
        </div>
      </section>
    </main>
  );
}