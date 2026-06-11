import { useEffect, useRef, useState } from "react";
import { AppLink } from "../components/AppLink.jsx";
import { SectionIntro } from "../components/SectionIntro.jsx";
import { InquiryBand } from "../components/InquiryBand.jsx";
import { ContactForm } from "../components/ContactForm.jsx";
import { DestinationsSection } from "../components/DestinationsSection.jsx";
import { assets } from "../data/assets.js";
import { services } from "../data/services.js";
import { testCourses } from "../data/testCourses.js";
import { blogs } from "../data/blogs.js";
import { site } from "../data/site.js";
import { testimonials, processSteps } from "../data/testimonials.js";

/* ─────────────────────── ANIMATED COUNTERS ─────────────────────── */

function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, count };
}

function AnimatedCounters() {
  const counters = [
    { target: 500, suffix: "+", label: "Partner Universities" },
    { target: 10, suffix: "+", label: "Study Destinations" },
    { target: 14, suffix: "+", label: "Years of Excellence" },
    { target: 100, suffix: "%", label: "Process Transparency" },
  ];

  return (
    <section className="counters-band">
      <div className="counters-grid">
        {counters.map((item) => (
          <CounterCard key={item.label} target={item.target} suffix={item.suffix} label={item.label} />
        ))}
      </div>
    </section>
  );
}

function CounterCard({ target, suffix, label }) {
  const { ref, count } = useCountUp(target);
  return (
    <article className="counter-item" ref={ref}>
      <strong className="counter-value">
        {count}
        {suffix}
      </strong>
      <span className="counter-label">{label}</span>
    </article>
  );
}

/* ─────────────────────── SERVICES PREVIEW (Asymmetric) ─────────────────────── */

function ServicesPreview({ navigate }) {
  const featured = services[0];
  const rest = services.slice(1, 3);

  return (
    <section className="section">
      <SectionIntro
        eyebrow="Our Services"
        title="Everything a student needs — from first counselling to departure"
        text="Explore the three pillars of EduMark support: abroad studies, test preparation, and entrance preparation with transparent guidance."
      />
      <div className="services-asymmetric">
        <article className="service-card-featured">
          <span>{featured.label}</span>
          <h3>{featured.title}</h3>
          <p>{featured.detail}</p>
          <div className="module-grid">
            {featured.bullets.map((bullet) => (
              <small key={bullet}>{bullet}</small>
            ))}
          </div>
          <div style={{ marginTop: 22 }}>
            <AppLink to={`/services/${featured.slug}`} navigate={navigate} className="primary-button">
              Learn More
            </AppLink>
          </div>
        </article>
        <div className="services-small-stack">
          {rest.map((service) => (
            <article className="service-card" key={service.slug}>
              <span>{service.label}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <AppLink to={`/services/${service.slug}`} navigate={navigate} className="text-link">
                View service
              </AppLink>
            </article>
          ))}
        </div>
      </div>
      <div className="section-action">
        <AppLink to="/services" navigate={navigate} className="secondary-button">
          Explore All Services
        </AppLink>
      </div>
    </section>
  );
}

/* ─────────────────────── WHY CHOOSE — ICON-ROW CHECKLIST ─────────────────────── */

function WhyChooseSection({ navigate }) {
  const reasons = [
    { icon: "🏅", text: "Legacy of success since 2012 A.D. — 14+ years of proven excellence." },
    { icon: "📜", text: "Approved by Ministry of Education and proud member of ECAN." },
    { icon: "👨‍🏫", text: "Multi-destination experienced and TITI certified counsellors." },
    { icon: "📝", text: "Personalized support: SOP writing, CV preparation, and interview coaching." },
    { icon: "🤝", text: "Transparent and ethical process — no hidden fees or surprises." },
    { icon: "✈️", text: "End-to-end support from first counselling to pre-departure briefing." },
  ];

  return (
    <section className="section split-section">
      <div>
        <SectionIntro
          eyebrow="Why Choose EduMark"
          title="Six reasons students in Eastern Region trust EduMark"
          text="Every point below comes directly from the official EduMark brochure and is backed by 14 years of student success."
        />
        <div className="why-checklist">
          {reasons.map((item) => (
            <div className="why-item" key={item.text}>
              <div className="why-icon">{item.icon}</div>
              <div className="why-text">{item.text}</div>
            </div>
          ))}
        </div>
        <AppLink to="/about" navigate={navigate} className="secondary-button">
          Meet EduMark
        </AppLink>
      </div>
      <div className="brochure-frame">
        <img src={assets.whyChoose} alt="EduMark why choose us brochure artwork" />
      </div>
    </section>
  );
}

/* ─────────────────────── URGENCY CTA BAND ─────────────────────── */

function UrgencyCTA({ navigate }) {
  return (
    <section className="urgency-band">
      <div className="urgency-inner">
        <div className="urgency-badge">⚡ Last Chance Alert</div>
        <h2>Limited Seats for September & October 2026 Intakes!</h2>
        <p>
          Don't miss the upcoming intake window. Book your free counselling session now and secure your
          spot for UK, Australia, Europe, Japan, and more.
        </p>
        <div className="urgency-actions">
          <AppLink to="/book-free-consultation" navigate={navigate} className="light-button">
            Book Free Counselling
          </AppLink>
          <AppLink to="/contact" navigate={navigate} className="outline-light-button">
            Call 021-590823
          </AppLink>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── TEST PREP (preserved) ─────────────────────── */

function TestPrepSection({ navigate }) {
  const [selected, setSelected] = useState(testCourses[0].slug);
  const course = testCourses.find((item) => item.slug === selected) || testCourses[0];

  return (
    <section className="section test-band">
      <div className="test-image">
        <img src={assets.testPrep} alt="Students preparing for tests" />
      </div>
      <div className="test-content">
        <SectionIntro
          eyebrow="Test Preparation"
          title="IELTS, PTE, TOEFL, SAT, and language classes under one plan"
          text="Focused preparation for students who need score progress, discipline, weekly mocks, and visible milestones."
        />
        <div className="tabs" role="tablist" aria-label="Test courses">
          {testCourses.map((item) => (
            <button
              type="button"
              key={item.slug}
              className={item.slug === selected ? "tab tab-active" : "tab"}
              onClick={() => setSelected(item.slug)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <article className="test-card">
          <span>{course.duration}</span>
          <h3>{course.name} Preparation</h3>
          <p>{course.score}</p>
          <div className="module-grid">
            {course.modules.map((module) => (
              <small key={module}>{module}</small>
            ))}
          </div>
        </article>
        <AppLink to={`/test-preparation/${course.slug}`} navigate={navigate} className="primary-button">
          View Course
        </AppLink>
      </div>
    </section>
  );
}

/* ─────────────────────── ENTRANCE PREVIEW (preserved) ─────────────────────── */

function EntrancePreview({ navigate }) {
  return (
    <section className="section split-section entrance-preview">
      <div className="brochure-frame">
        <img src={assets.entranceOffer} alt="EduMark entrance preparation offer" />
      </div>
      <div>
        <SectionIntro
          eyebrow="Entrance Preparation"
          title="Prepare smart after +2 for CEE, CMAT, engineering, and management routes"
          text="Daily classes, chapter-wise tests, library access, free QAD books, and expert guidance from scholarship holders."
        />
        <div className="module-grid" style={{ marginBottom: 22 }}>
          {["Daily 4 hours class", "Chapter-wise tests", "Full day library access", "Daily practice class", "Free QAD books", "Video lectures"].map(
            (feature) => (
              <small key={feature}>{feature}</small>
            ),
          )}
        </div>
        <AppLink to="/entrance-preparations" navigate={navigate} className="primary-button">
          Explore Entrance Classes
        </AppLink>
      </div>
    </section>
  );
}

/* ─────────────────────── PROCESS (preserved) ─────────────────────── */

function ProcessSection({ navigate }) {
  return (
    <section className="section process-section">
      <SectionIntro
        eyebrow="Our Process"
        title="A clear student journey with every step visible"
        text="The 6-step EduMark process: from free counselling to your departure flight."
        align="center"
      />
      <div className="process-grid">
        {processSteps.map((step, index) => (
          <article key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{step}</h3>
          </article>
        ))}
      </div>
      <div className="center-actions">
        <AppLink to="/book-free-consultation" navigate={navigate} className="primary-button">
          Book a Profile Review
        </AppLink>
      </div>
    </section>
  );
}

/* ─────────────────────── TESTIMONIALS (preserved) ─────────────────────── */

function SuccessSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const testimonial = testimonials[index];

  return (
    <section className="section success-section">
      <div className="success-media">
        <img src={assets.success} alt="Successful students with admission documents" />
      </div>
      <div className="testimonial-panel">
        <SectionIntro eyebrow="Student Stories" title="Confidence grows when the next step is clear" />
        <blockquote>{testimonial.quote}</blockquote>
        <div>
          <strong>{testimonial.name}</strong>
          <span>{testimonial.route}</span>
        </div>
        <div className="carousel-controls">
          {testimonials.map((item, itemIndex) => (
            <button
              key={item.name}
              type="button"
              className={itemIndex === index ? "dot dot-active" : "dot"}
              aria-label={`Show testimonial ${itemIndex + 1}`}
              onClick={() => setIndex(itemIndex)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── CEO MESSAGE PREVIEW ─────────────────────── */

function CEOPreview({ navigate }) {
  return (
    <section className="ceo-section">
      <div className="ceo-avatar">
        <img src={assets.leaders[0]} alt="Ravi Gupta, CEO of EduMark" />
        <div className="ceo-badge">Founder & CEO</div>
      </div>
      <div className="ceo-content">
        <SectionIntro
          eyebrow="Message from the CEO"
          title="A personal note from EduMark's founder"
        />
        <blockquote>
          "At EduMark, we believe that every student deserves a clear, honest, and practical pathway to their
          academic dreams. Since 2012, our team has guided hundreds of students from Koshi Province toward
          international education — and we do it with complete transparency, no shortcuts, and a personal
          commitment to every family that walks through our door."
        </blockquote>
        <div className="ceo-signature">
          <strong>Ravi Gupta</strong>
          <span>Founder & CEO, EduMark Pvt. Ltd.</span>
        </div>
        <div style={{ marginTop: 22 }}>
          <AppLink to="/about" navigate={navigate} className="secondary-button">
            Read Full Story
          </AppLink>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── BLOG PREVIEW (preserved) ─────────────────────── */

function BlogPreview({ navigate }) {
  return (
    <section className="section">
      <SectionIntro
        eyebrow="Resources"
        title="Latest news and articles from the blog"
        text="Short, practical articles keep study-abroad, visa, test, and entrance decisions easier to compare."
      />
      <div className="blog-grid">
        {blogs.slice(0, 3).map((blog) => (
          <article className="blog-card image-card" key={blog.slug}>
            <img src={blog.image} alt="" />
            <span>{blog.category}</span>
            <h3>{blog.title}</h3>
            <p>{blog.excerpt}</p>
            <small>
              {blog.date} | {blog.readTime}
            </small>
            <AppLink to={`/blogs/${blog.slug}`} navigate={navigate} className="text-link">
              Read article
            </AppLink>
          </article>
        ))}
      </div>
      <div className="section-action">
        <AppLink to="/blogs" navigate={navigate} className="secondary-button">
          Read All Articles
        </AppLink>
      </div>
    </section>
  );
}

/* ─────────────────────── INLINE LEAD FORM ─────────────────────── */

function InlineLeadForm() {
  return (
    <section className="lead-section">
      <div className="lead-layout">
        <div className="lead-info">
          <span className="eyebrow" style={{ color: "var(--yellow)" }}>
            Start Your Journey Today
          </span>
          <h2>Free Counselling — No Obligation, No Hidden Fees</h2>
          <p>
            Book a free profile review with our certified counsellors. Get a realistic assessment of your
            options, intake timeline, and required documents — all in one session.
          </p>
          <div className="lead-contact-row">
            <div className="lead-contact-item">
              <div className="lead-contact-icon">📍</div>
              <div>
                <strong>{site.address}</strong>
                <small>Walk-in available during office hours</small>
              </div>
            </div>
            <div className="lead-contact-item">
              <div className="lead-contact-icon">📞</div>
              <div>
                <strong>{site.phone} | {site.mobile}</strong>
                <small>WhatsApp: {site.whatsapp}</small>
              </div>
            </div>
            <div className="lead-contact-item">
              <div className="lead-contact-icon">🕐</div>
              <div>
                <strong>{site.hours}</strong>
                <small>{site.email}</small>
              </div>
            </div>
          </div>
        </div>
        <div className="lead-form">
          <h3>Book My Free Counselling Session</h3>
          <ContactForm buttonText="Submit Inquiry" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── ACCREDITATIONS STRIP ─────────────────────── */

function AccreditationsStrip() {
  const badges = [
    {
      icon: "🏛",
      title: "Ministry of Education",
      text: "Approved and registered by the Government of Nepal's Ministry of Education.",
      color: "var(--purple)",
    },
    {
      icon: "🤝",
      title: "ECAN Member",
      text: "Member of the Educational Consultancy Association of Nepal — committed to ethical standards.",
      color: "var(--cyan)",
    },
    {
      icon: "🎓",
      title: "TITI Certified",
      text: "All counsellors certified by the Training Institute for Technical Instruction for quality assurance.",
      color: "var(--navy)",
    },
  ];

  return (
    <section className="accreditations-strip">
      <SectionIntro
        eyebrow="Accreditations & Trust"
        title="Verified, certified, and committed to ethical guidance"
        text="EduMark operates under full government approval with independently certified counsellors."
        align="center"
      />
      <div className="accreditation-grid">
        {badges.map((badge) => (
          <article className="accreditation-card" key={badge.title}>
            <div className="accreditation-icon" style={{ background: badge.color }}>
              {badge.icon}
            </div>
            <h3>{badge.title}</h3>
            <p>{badge.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────── HOME PAGE (assembled) ─────────────────────── */

export function HomePage({ navigate }) {
  return (
    <main>
      {/* 1 — Hero */}
      <section className="hero hero-home" style={{ "--hero-image": `url(${assets.heroGenerated})` }}>
        <div className="hero-copy">
          <span className="eyebrow" style={{ color: "var(--yellow)", letterSpacing: "0.15em", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>Since 2012 | Biratnagar</span>
          <h1 style={{ textShadow: "0 4px 18px rgba(7, 31, 61, 0.4)" }}>Dreaming of Studying Abroad? Turn Your Aspirations Into Reality.</h1>
          <p style={{ textShadow: "0 2px 8px rgba(7, 31, 61, 0.4)" }}>
            EduMark — Turning Ambition Into Achievement. Expert counselling, destination selection,
            test preparation, documentation, visa processing, and pre-departure support.
          </p>
          <div className="hero-actions">
            <AppLink to="/book-free-consultation" navigate={navigate} className="primary-button">
              Book Free Counselling
            </AppLink>
            <AppLink to="/destinations" navigate={navigate} className="outline-light-button">
              Explore Destinations
            </AppLink>
          </div>
          <div className="trust-row">
            <span>🏛️ Ministry Approved</span>
            <span>🎓 TITI Certified Counsellors</span>
            <span>🤝 ECAN Member</span>
            <span>🏅 14 Years of Excellence</span>
            <span>🏫 500+ Universities</span>
          </div>
        </div>
      </section>

      {/* 2 — Quick Cards */}
      <section className="quick-cards" aria-label="Key services">
        {[
          ["🛡️", "Taking Care", "Immigration and visa process"],
          ["💻", "Apply Online", "Quick and easy application support"],
          ["👨‍🏫", "Free Advice", "Expert and experienced consultants"],
        ].map(([icon, title, text]) => (
          <article key={title}>
            <div className="quick-icon">{icon}</div>
            <div className="quick-content">
              <span>{title}</span>
              <h3>{text}</h3>
            </div>
          </article>
        ))}
      </section>

      {/* 3 — Animated Counters */}
      <AnimatedCounters />

      {/* 4 — About Preview with Badge */}
      <section className="section split-section about-preview">
        <div className="experience-badge">
          <strong>14+</strong>
          <span>Years</span>
        </div>
        <div>
          <SectionIntro
            eyebrow="Welcome To EduMark"
            title="Unleashing potential through global exposure"
            text="EduMark Pvt. Ltd. is a leading multi-destination education consultancy dedicated to guiding students toward the best international academic opportunities through expert counselling, transparent processes, and strong institutional partnerships."
          />
          <div className="stats-grid">
            {[
              ["500+", "College and university options"],
              ["10+", "Supported destinations"],
              ["2012", "Legacy of service"],
              ["100%", "Process transparency"],
            ].map(([value, label]) => (
              <article key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </article>
            ))}
          </div>
          <AppLink to="/about" navigate={navigate} className="secondary-button">
            Read About EduMark
          </AppLink>
        </div>
        <div className="brochure-frame">
          <img src={assets.brochureHero} alt="EduMark study abroad brochure" />
        </div>
      </section>

      {/* 5 — Services (Asymmetric) */}
      <ServicesPreview navigate={navigate} />

      {/* 6 — Destinations */}
      <DestinationsSection navigate={navigate} compact />

      {/* 7 — Why Choose EduMark (Icon-Row) */}
      <WhyChooseSection navigate={navigate} />

      {/* 8 — Urgency CTA Band */}
      <UrgencyCTA navigate={navigate} />

      {/* 9 — Test Prep */}
      <TestPrepSection navigate={navigate} />

      {/* 10 — Entrance Preview */}
      <EntrancePreview navigate={navigate} />

      {/* 11 — Process */}
      <ProcessSection navigate={navigate} />

      {/* 12 — Testimonials */}
      <SuccessSection />

      {/* 13 — CEO Message */}
      <CEOPreview navigate={navigate} />

      {/* 14 — Blog Preview */}
      <BlogPreview navigate={navigate} />

      {/* 15 — Inline Lead Form */}
      <InlineLeadForm />

      {/* 16 — Accreditations Strip */}
      <AccreditationsStrip />

      {/* 17 — Final CTA Band */}
      <InquiryBand navigate={navigate} />
    </main>
  );
}
