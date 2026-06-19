import { useEffect, useState, useRef } from "react";
import { AppLink } from "../components/AppLink.jsx";
import { ContactForm } from "../components/ContactForm.jsx";
import { assets } from "../data/assets.js";
import { countries } from "../data/countries.js";
import { testCourses } from "../data/testCourses.js";
import { services } from "../data/services.js";
import { blogs } from "../data/blogs.js";
import { site } from "../data/site.js";
import { testimonials } from "../data/testimonials.js";
import { ProcessIcon } from "../components/ProcessIcons.jsx";

/* ─────────────────── FLAG MAP ─────────────────── */

const flagMap = {
  UK: "🇬🇧", US: "🇺🇸", AU: "🇦🇺", JP: "🇯🇵",
  FI: "🇫🇮", LT: "🇱🇹", KR: "🇰🇷", MT: "🇲🇹",
  AE: "🇦🇪", IN: "🇮🇳",
};

/* ─────────────────── 1. HERO ─────────────────── */

function CountUp({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const startValue = 0;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easeProgress = percentage * (2 - percentage);
      setCount(Math.floor(easeProgress * (end - startValue) + startValue));
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
}

function HeroSection({ navigate }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesData = [
    {
      image: "/images/generated/hero0.png",
      title: "EduMark: Turning Ambition to Achievement",
      subtitle: "Dreaming of studying abroad? Turn your aspirations into reality with our expert guidance and transparent counseling process.",
      //tag: "✓ Ministry Approved"
    },
    {
      image: "/images/generated/hero1.jpg",
      title: "Ministry Approved, TITI Certified, ECAN Member",
      subtitle: "We are authorized by the Ministry of Education and staffed by certified counselors to offer ethical and professional mentorship.",
      //tag: "ECAN Member"
    },
    {
      image: "/images/generated/hero2.png.jpg",
      title: "Ethical and Transparent Service",
      subtitle: "Our process is clear, honest, and professional, with zero hidden fees or misleading promises, helping you every step of the way.",
      //tag: "14+ Years of Trust"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = slidesData[currentSlide];

  return (
    <section className="hero-fullscreen">
      {/* Slides Background */}
      <div className="hero-slides-container">
        {slidesData.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>
      <div className="hero-dark-overlay" />

      {/* Left-Aligned Container */}
      <div className="hero-fullscreen-container">
        <div key={currentSlide} className="hero-fullscreen-content">
          <h1 className="hero-fullscreen-title animate-fade-in">
            {activeSlide.title}
          </h1>
          <p className="hero-fullscreen-subtitle animate-fade-in-delayed">
            {activeSlide.subtitle}
          </p>
          <div className="hero-fullscreen-actions animate-fade-in-delayed">
            <AppLink to="/book-free-consultation" navigate={navigate} className="hero-btn-primary">
              Book Free Counseling
            </AppLink>
            <AppLink to="/destinations" navigate={navigate} className="hero-btn-secondary">
              Explore Destinations →
            </AppLink>
          </div>
        </div>
      </div>

      {/* Carousel Indicators at Bottom-Left */}
      <div className="hero-carousel-indicators">
        {slidesData.map((_, index) => (
          <button
            key={index}
            className={`hero-indicator-bar ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* White Stats Band */}
      <div className="hero-stats-band">
        <div className="hero-stats-container">
          <div className="hero-stat-item">
            <span className="hero-stat-number">
              <CountUp end={14} />
              <span className="hero-stat-suffix">+</span>
            </span>
            <span className="hero-stat-label">Years of Excellence</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-number">
              <CountUp end={10000} />
              <span className="hero-stat-suffix">+</span>
            </span>
            <span className="hero-stat-label">Students Counseled</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-number">
              <CountUp end={98} />
              <span className="hero-stat-suffix">%</span>
            </span>
            <span className="hero-stat-label">Success Rate</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-number">
              <CountUp end={500} />
              <span className="hero-stat-suffix">+</span>
            </span>
            <span className="hero-stat-label">University Partnerships</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function DestinationsV2({ navigate }) {
  return (
    <section className="dest-v2">
      <div className="dest-v2-header">
        <h2>Destinations We Cater</h2>
        <p>
          Explore world-class education opportunities across the globe.
          We guide you to the destination that best fits your academic and career goals.
        </p>
      </div>

      <div className="dest-marquee-container">
        <div className="dest-marquee-track">
          {/* First Set of Cards */}
          {countries.map((country, index) => (
            <article
              className="dest-card-v2"
              key={`${country.slug}-1`}
              onClick={() => navigate(`/destinations/${country.slug}`)}
              style={{ "--accent-color": country.accent }}
            >
              <div className="dest-card-v2-img">
                <img src={`/images/generated/destination${(index % 3) + 1}.jpg`} alt={`Study in ${country.name}`} />
                <div className="dest-card-v2-gradient" />
                <div className="dest-card-v2-intake">{country.intake.split(",")[0]} Open</div>
                <div className="dest-card-v2-name">
                  <span className="flag">{flagMap[country.code]}</span>
                  <h3>{country.code === "UK" ? "UK" : country.code === "US" ? "USA" : country.name}</h3>
                </div>
              </div>
              <div className="dest-card-v2-body">
                <div className="dest-card-v2-details">
                  <p className="dest-card-v2-cost">💰 {country.cost}</p>
                  <p className="dest-card-v2-highlight">🎯 {country.highlight}</p>
                </div>
                <button className="dest-card-v2-btn" type="button">Learn More</button>
              </div>
            </article>
          ))}

          {/* Duplicated Second Set for Infinite Loop */}
          {countries.map((country, index) => (
            <article
              className="dest-card-v2"
              key={`${country.slug}-2`}
              onClick={() => navigate(`/destinations/${country.slug}`)}
              style={{ "--accent-color": country.accent }}
            >
              <div className="dest-card-v2-img">
                <img src={`/images/generated/destination${(index % 3) + 1}.jpg`} alt={`Study in ${country.name}`} />
                <div className="dest-card-v2-gradient" />
                <div className="dest-card-v2-intake">{country.intake.split(",")[0]} Open</div>
                <div className="dest-card-v2-name">
                  <span className="flag">{flagMap[country.code]}</span>
                  <h3>{country.code === "UK" ? "UK" : country.code === "US" ? "USA" : country.name}</h3>
                </div>
              </div>
              <div className="dest-card-v2-body">
                <div className="dest-card-v2-details">
                  <p className="dest-card-v2-cost">💰 {country.cost}</p>
                  <p className="dest-card-v2-highlight">🎯 {country.highlight}</p>
                </div>
                <button className="dest-card-v2-btn" type="button">Learn More</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── 3. TEST PREPARATION ─────────────────── */

const testImages = {
  ielts: "/images/generated/ielts.png",
  pte: "/images/generated/PTE.png",
  toefl: "/images/generated/toefl.png",
  sat: "/images/generated/SAT.png",
};

const testDescriptions = [
  "International English Language Testing System. Academic & General training.",
  "Pearson Test of English. Computer-based test for international study.",
  "Test of English as a Foreign Language. Widely accepted globally.",
  "Scholastic Assessment Test. Required for undergraduate admissions in USA.",
];

function TestPrepV2({ navigate }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="test-v2" ref={sectionRef}>
      <div className="test-v2-header">
        <h2>Test Preparation</h2>
        <p>Certified teachers, weekly mock tests, and personalized guidance to help you score high.</p>
      </div>
      <div className="test-v2-grid">
        {testCourses.map((course, i) => (
          <article
            className={`test-card-v2 ${isVisible ? "animate-card-fade-in" : "init-hidden"}`}
            key={course.slug}
          >
            <div className="test-card-v2-img">
              <img src={testImages[course.slug]} alt={`${course.name} Prep`} />
            </div>
            <div className="test-card-v2-body">
              <p>{testDescriptions[i]}</p>
              <AppLink
                to={`/test-preparation/${course.slug}`}
                navigate={navigate}
                className="test-card-v2-cta"
              >
                Learn More
              </AppLink>
            </div>
          </article>
        ))}
      </div>
      <div className="test-v2-footer">
        <AppLink to="/test-preparation" navigate={navigate} className="test-v2-link">
          Explore All Tests →
        </AppLink>
      </div>
    </section>
  );
}

/* ─────────────────── 4. SERVICES PREVIEW ─────────────────── */

function ServicesV2({ navigate }) {
  const abroad = services[0];

  return (
    <section className="svc-v2">
      <div className="svc-v2-header">
        <h2>Our Services</h2>
        <p>Comprehensive support from your first counseling session to your arrival at the university.</p>
      </div>
      <div className="svc-v2-grid">
        {/* Large Featured Card */}
        <div className="svc-featured-v2">
          <div className="svc-featured-v2-circle" />
          <div className="svc-featured-v2-content">
            <div className="svc-featured-v2-icon">🌍</div>
            <h3>Abroad Studies</h3>
            <p>
              Multi-destination counseling, university selection, admission guidance,
              and visa assistance for 500+ global universities.
            </p>
            <ul className="svc-checklist-v2">
              {abroad.bullets.map((bullet) => (
                <li key={bullet}>
                  <span className="check-icon">✓</span> {bullet}
                </li>
              ))}
            </ul>
          </div>
          <AppLink
            to={`/services/${abroad.slug}`}
            navigate={navigate}
            className="svc-featured-v2-link"
          >
            Explore Service →
          </AppLink>
        </div>

        {/* Two Smaller Cards */}
        <div className="svc-small-stack-v2">
          <div className="svc-small-card-v2">
            <div className="svc-small-icon-v2 teal">📖</div>
            <h3>Test Preparation</h3>
            <p>Expert coaching for IELTS, PTE, TOEFL, and SAT with certified instructors.</p>
            <AppLink to="/test-preparation" navigate={navigate} className="svc-small-link-v2 teal">
              View Classes
            </AppLink>
          </div>
          <div className="svc-small-card-v2">
            <div className="svc-small-icon-v2 amber">🎓</div>
            <h3>Entrance Preparation</h3>
            <p>Ministry-approved CEE and CMAT preparation classes for +2 graduates.</p>
            <AppLink to="/entrance-preparations" navigate={navigate} className="svc-small-link-v2 amber">
              View Programs
            </AppLink>
          </div>
        </div>
      </div>
      <div className="svc-v2-cta">
        <AppLink to="/services" navigate={navigate} className="svc-v2-cta-btn">
          Explore All Services
        </AppLink>
      </div>
    </section>
  );
}

/* ─────────────────── 5. WHY CHOOSE EDUMARK ─────────────────── */

const whyReasons = [
  { icon: "🏆", title: "Legacy of Success", text: "Guiding students toward international academic opportunities since 2012 A.D." },
  { icon: "🛡️", title: "Government Approved", text: "Approved from Ministry of Education and an active member of ECAN." },
  { icon: "🧠", title: "Certified Counselors", text: "Multi-destination experienced & certified counselors (TITI trained)." },
  { icon: "📝", title: "Personalized Support", text: "Comprehensive assistance with Documentation, SOP writing, CV preparation, and Interview prep." },
  { icon: "⚖️", title: "Transparent & Ethical", text: "Clear, honest processes with no hidden fees or misleading promises." },
  { icon: "✈️", title: "End-to-End Support", text: "We are with you from your first counseling session to your departure and beyond." },
];

function WhyChooseV2() {
  return (
    <section className="why-v2">
      <div className="why-v2-grid">
        <div>
          <h2>Why Choose EduMark?</h2>
          <p>
            We don't just process applications; we build careers.
            Here is why thousands of students trust us with their global education journey.
          </p>
          <div className="why-v2-list">
            {whyReasons.map((reason) => (
              <div className="why-v2-item" key={reason.title}>
                <div className="why-v2-icon">{reason.icon}</div>
                <div>
                  <h4>{reason.title}</h4>
                  <p>{reason.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="why-v2-image">
          <img src={assets.whyChoose} alt="Counseling session" />
          <div className="why-v2-image-overlay" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── 6. PROCESS TIMELINE ─────────────────── */

const processSteps = [
  {
    num: 1,
    title: "FREE COUNSELING",
    position: "bottom",
    color: "#7e3794", // Purple
    bg: "#ffffff",
    border: "#7e3794",
    iconColor: "#7e3794",
  },
  {
    num: 2,
    title: "COURSE & COUNTRY SELECTION",
    position: "top",
    color: "#bd1e5c", // Pink/Magenta
    bg: "#ffffff",
    border: "#bd1e5c",
    iconColor: "#bd1e5c",
  },
  {
    num: 3,
    title: "APPLICATION SUBMISSION",
    position: "bottom",
    color: "#f2a900", // Yellow/Orange
    bg: "#f2a900", // Solid Yellow
    border: "#f2a900",
    iconColor: "#ffffff",
  },
  {
    num: 4,
    title: "OFFER LETTER & DOCUMENTATION",
    position: "top",
    color: "#22408c", // Dark Navy
    bg: "#22408c", // Solid Navy
    border: "#22408c",
    iconColor: "#ffffff",
  },
  {
    num: 5,
    title: "VISA PROCESSING",
    position: "bottom",
    color: "#e31b23", // Red
    bg: "#ffffff",
    border: "#e31b23",
    iconColor: "#e31b23",
  },
  {
    num: 6,
    title: "PRE-DEPARTURE SUPPORT",
    position: "top",
    color: "#3a559f", // Blue
    bg: "#3a559f", // Solid Blue
    border: "#3a559f",
    iconColor: "#ffffff",
  },
];

function ProcessV2() {
  return (
    <section className="process-v2">
      <div className="process-v2-header">
        <span className="process-v2-subtitle">“Unleashing Potential Through Global Exposure”</span>
        <h2>OUR PROCESS</h2>
        <div className="process-v2-header-underline" />
      </div>
      <div className="process-v2-track">
        <div className="process-v2-steps">
          {processSteps.map((step, index) => {
            const isTop = step.position === "top";
            return (
              <div
                className={`process-brochure-step ${isTop ? "step-top" : "step-bottom"}`}
                key={step.num}
                style={{ "--step-color": step.color }}
              >
                {isTop && (
                  <div className="process-label-wrapper top">
                    <span className="process-label-text">{step.title}</span>
                    <div className="process-connector-line">
                      <span className="process-connector-dot" style={{ backgroundColor: step.color }} />
                    </div>
                  </div>
                )}

                {!isTop && <div className="process-spacer" />}

                <div
                  className="process-circle"
                  style={{
                    backgroundColor: step.bg,
                    borderColor: step.border,
                    color: step.iconColor,
                  }}
                >
                  <div className="process-circle-num" style={{ backgroundColor: step.color }}>
                    {step.num}
                  </div>
                  <div className="process-circle-icon-container">
                    <ProcessIcon index={index} />
                  </div>
                </div>

                {!isTop && (
                  <div className="process-label-wrapper bottom">
                    <div className="process-connector-line">
                      <span className="process-connector-dot" style={{ backgroundColor: step.color }} />
                    </div>
                    <span className="process-label-text">{step.title}</span>
                  </div>
                )}

                {isTop && <div className="process-spacer" />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── 7. BLOGS PREVIEW ─────────────────── */

const blogColors = [
  { tag: "#451ebb", gradient: "linear-gradient(to top right, rgba(69,30,187,0.1), transparent)" },
  { tag: "#006970", gradient: "linear-gradient(to top right, rgba(0,105,112,0.1), transparent)" },
  { tag: "#954500", gradient: "linear-gradient(to top right, rgba(113,51,0,0.1), transparent)" },
];

function BlogsPreviewV2({ navigate }) {
  return (
    <section className="blog-v2">
      <div className="blog-v2-head">
        <div>
          <h2>Latest Insights &amp; Blogs</h2>
          <p>Stay updated with study abroad tips, university news, and visa updates.</p>
        </div>
        <AppLink to="/blogs" navigate={navigate} className="test-v2-link">
          Read All Articles →
        </AppLink>
      </div>
      <div className="blog-v2-grid">
        {blogs.slice(0, 3).map((blog, i) => (
          <article
            className="blog-card-v2"
            key={blog.slug}
            onClick={() => navigate(`/blogs/${blog.slug}`)}
          >
            <div className="blog-card-v2-img" style={{ background: "#dcd9d9" }}>
              <div
                className="blog-card-v2-gradient"
                style={{ background: blogColors[i].gradient }}
              />
              <div
                className="blog-card-v2-tag"
                style={{ background: blogColors[i].tag }}
              >
                {blog.category}
              </div>
            </div>
            <div className="blog-card-v2-body">
              <p className="blog-card-v2-date">{blog.date}</p>
              <h3>{blog.title}</h3>
              <p>{blog.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────── 8. INQUIRY FORM ─────────────────── */

function InquiryFormV2() {
  return (
    <section className="inquiry-v2">
      <div className="inquiry-v2-dots" />
      <div className="inquiry-v2-grid">
        <div>
          <h2>Start Your Journey Today — Free Counseling</h2>
          <p>
            Take the first step towards your international education.
            Fill out the form and our expert counselors will get back to you shortly.
          </p>
          <div className="inquiry-v2-contact">
            <div className="inquiry-v2-contact-item">
              <div className="inquiry-v2-contact-icon">📍</div>
              <div>
                <h4>Visit Our Office</h4>
                <small>{site.address}</small>
              </div>
            </div>
            <div className="inquiry-v2-contact-item">
              <div className="inquiry-v2-contact-icon">📞</div>
              <div>
                <h4>Call Us</h4>
                <small>{site.phone} / {site.mobile}</small>
              </div>
            </div>
          </div>
        </div>
        <div className="inquiry-v2-form">
          <h3>Book Your Free Session</h3>
          <ContactForm buttonText="Book My Free Counseling Session" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── 9. TESTIMONIALS ─────────────────── */

const avatarColors = ["#451ebb", "#006970", "#954500", "#5d3fd3"];

function TestimonialsV2() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const t = testimonials[index];
  const initials = t.name.split(" ").map((w) => w[0]).join("").slice(0, 2);

  return (
    <section className="testimonials-v2">
      <div className="testimonials-v2-header">
        <h2>Student Success Stories</h2>
        <p>Hear from students who turned their study abroad dreams into reality with EduMark.</p>
      </div>
      <div className="testimonials-v2-carousel">
        <div className="testimonial-v2-card">
          <div
            className="testimonial-v2-avatar"
            style={{ background: avatarColors[index % avatarColors.length] }}
          >
            {initials}
          </div>
          <p className="testimonial-v2-quote">{t.quote}</p>
          <div className="testimonial-v2-name">{t.name}</div>
          <div className="testimonial-v2-route">{t.route}</div>
        </div>
        <div className="testimonial-v2-dots">
          {testimonials.map((item, i) => (
            <button
              key={item.name}
              type="button"
              className={`testimonial-v2-dot ${i === index ? "active" : ""}`}
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── HOME PAGE (assembled) ─────────────────── */

export function HomePage({ navigate }) {
  return (
    <main>
      {/* 1 — Hero */}
      <HeroSection navigate={navigate} />

      {/* 2 — Destinations */}
      <DestinationsV2 navigate={navigate} />

      {/* 3 — Test Preparation */}
      <TestPrepV2 navigate={navigate} />

      {/* 4 — Services (Asymmetric) */}
      <ServicesV2 navigate={navigate} />

      {/* 5 — Why Choose EduMark */}
      <WhyChooseV2 />

      {/* 6 — Process Timeline */}
      <ProcessV2 />

      {/* 7 — Blogs Preview */}
      <BlogsPreviewV2 navigate={navigate} />

      {/* 8 — Inquiry Form */}
      <InquiryFormV2 />

      {/* 9 — Testimonials */}
      <TestimonialsV2 />
    </main>
  );
}
