import { useEffect, useState } from "react";
import { AppLink } from "../components/AppLink.jsx";
import { ContactForm } from "../components/ContactForm.jsx";
import { assets } from "../data/assets.js";
import { countries } from "../data/countries.js";
import { testCourses } from "../data/testCourses.js";
import { services } from "../data/services.js";
import { blogs } from "../data/blogs.js";
import { site } from "../data/site.js";
import { testimonials } from "../data/testimonials.js";

/* ─────────────────── FLAG MAP ─────────────────── */

const flagMap = {
  UK: "🇬🇧", US: "🇺🇸", AU: "🇦🇺", JP: "🇯🇵",
  FI: "🇫🇮", LT: "🇱🇹", KR: "🇰🇷", MT: "🇲🇹",
  AE: "🇦🇪", IN: "🇮🇳",
};

/* ─────────────────── 1. HERO ─────────────────── */

function HeroSection({ navigate }) {
  return (
    <section className="hero-v2">
      <div className="hero-v2-dots" />
      <div className="hero-v2-grid">
        <div className="hero-v2-content">
          <div className="hero-v2-trust">
            <span className="trust-item trust-primary">✓ Ministry Approved</span>
            <span className="trust-dot">•</span>
            <span className="trust-item trust-secondary">ECAN Member</span>
            <span className="trust-dot">•</span>
            <span className="trust-item trust-tertiary">14 Years</span>
            <span className="trust-dot">•</span>
            <span className="trust-item trust-container">500+ Universities</span>
          </div>
          <h1>EduMark – Turning Ambition Into Achievement</h1>
          <p className="hero-v2-tagline">Unleashing Potential Through Global Exposure</p>
          <p className="hero-v2-desc">
            Dreaming of Studying Abroad? Turn Your Aspirations Into Reality.
            We provide expert counseling and transparent processes to guide you every step of the way.
          </p>
          <div className="hero-v2-actions">
            <AppLink to="/book-free-consultation" navigate={navigate} className="hero-v2-btn-primary">
              Book Free Counseling
            </AppLink>
            <AppLink to="/destinations" navigate={navigate} className="hero-v2-btn-secondary">
              Explore Destinations →
            </AppLink>
          </div>
        </div>
        <div className="hero-v2-media">
          <div className="hero-v2-glow" />
          <img
            src={assets.heroGenerated}
            alt="Smiling diverse students walking on a sunny university campus"
          />
          <div className="hero-v2-badge">
            <div className="hero-v2-badge-icon">✓</div>
            <div>
              <p className="hero-v2-badge-label">Success Rate</p>
              <p className="hero-v2-badge-value">98%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── 2. DESTINATIONS ─────────────────── */

function DestinationsV2({ navigate }) {
  const featured = countries.slice(0, 4);
  const rest = countries.slice(4);

  return (
    <section className="dest-v2">
      <div className="dest-v2-header">
        <h2>Destinations We Cater</h2>
        <p>
          Explore world-class education opportunities across the globe.
          We guide you to the destination that best fits your academic and career goals.
        </p>
      </div>
      <div className="dest-v2-scroll">
        {featured.map((country) => (
          <article
            className="dest-card-v2"
            key={country.slug}
            onClick={() => navigate(`/destinations/${country.slug}`)}
          >
            <div className="dest-card-v2-img">
              <img src={assets.destinations} alt={`Study in ${country.name}`} />
              <div className="dest-card-v2-gradient" />
              <div className="dest-card-v2-intake">{country.intake.split(",")[0]} Open</div>
              <div className="dest-card-v2-name">
                <span className="flag">{flagMap[country.code]}</span>
                <h3>{country.code === "UK" ? "UK" : country.code === "US" ? "USA" : country.name}</h3>
              </div>
            </div>
            <div className="dest-card-v2-body">
              <p className="dest-card-v2-cost">💰 {country.cost}</p>
              <button className="dest-card-v2-btn" type="button">Learn More</button>
            </div>
          </article>
        ))}
        {rest.map((country) => (
          <article
            className="dest-mini-v2"
            key={country.slug}
            onClick={() => navigate(`/destinations/${country.slug}`)}
          >
            <span className="flag">{flagMap[country.code]}</span>
            <h3>{country.name}</h3>
            <p className="cost-label">{country.cost}</p>
            <button className="dest-card-v2-btn" type="button">Details</button>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────── 3. TEST PREPARATION ─────────────────── */

const testColors = ["blue", "green", "purple", "orange"];
const testDescriptions = [
  "International English Language Testing System. Academic & General training.",
  "Pearson Test of English. Computer-based test for international study.",
  "Test of English as a Foreign Language. Widely accepted globally.",
  "Scholastic Assessment Test. Required for undergraduate admissions in USA.",
];

function TestPrepV2({ navigate }) {
  return (
    <section className="test-v2">
      <div className="test-v2-head">
        <div>
          <h2>Test Preparation</h2>
          <p>Certified teachers, weekly mock tests, and personalized guidance to help you score high.</p>
        </div>
        <AppLink to="/test-preparation" navigate={navigate} className="test-v2-link">
          Explore All Tests →
        </AppLink>
      </div>
      <div className="test-v2-grid">
        {testCourses.map((course, i) => (
          <article className="test-card-v2" key={course.slug}>
            <div className={`test-card-v2-icon ${testColors[i]}`}>{course.name}</div>
            <h3>{course.name}</h3>
            <p>{testDescriptions[i]}</p>
            <AppLink
              to={`/test-preparation/${course.slug}`}
              navigate={navigate}
              className="test-card-v2-cta"
            >
              Learn More
            </AppLink>
          </article>
        ))}
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

const processData = [
  { icon: "🧑‍💼", label: "Free Counseling", sub: "", color: "#451ebb", num: 1 },
  { icon: "🌍", label: "Selection", sub: "Course & Country", color: "#006970", num: 2 },
  { icon: "📋", label: "Application", sub: "Submission", color: "#954500", num: 3 },
  { icon: "📄", label: "Documentation", sub: "Offer Letters", color: "#cabeff", numColor: "#1c0062", num: 4 },
  { icon: "✅", label: "Visa Processing", sub: "", color: "#DD3333", num: 5 },
  { icon: "✈️", label: "Pre-Departure", sub: "Support", color: "#5dd8e2", numColor: "#002022", num: 6 },
];

function ProcessV2() {
  return (
    <section className="process-v2">
      <div className="process-v2-header">
        <h2>Our Process</h2>
        <p>
          A streamlined, transparent six-step journey from your first counseling session
          to your arrival at the university.
        </p>
      </div>
      <div className="process-v2-track">
        <div className="process-v2-line" />
        <div className="process-v2-steps">
          {processData.map((step) => (
            <div className="process-v2-step" key={step.num}>
              <div className="process-v2-circle" style={{ color: step.color }}>
                <div
                  className="process-v2-num"
                  style={{ background: step.color, color: step.numColor || "#fff" }}
                >
                  {step.num}
                </div>
                <span style={{ fontSize: 28 }}>{step.icon}</span>
              </div>
              <h4>{step.label}</h4>
              {step.sub && <small>{step.sub}</small>}
            </div>
          ))}
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
