import { useEffect, useMemo, useState } from "react";

const assets = {
  logo: "/images/brand/edumark-logo.jpg",
  heroGenerated: "/images/generated/study-hero.png",
  destinations: "/images/generated/destinations.png",
  counselling: "/images/generated/counselling.png",
  testPrep: "/images/generated/test-prep.png",
  success: "/images/generated/student-success.png",
  brochureHero: "/images/brochure/hero-background.jpg",
  whyChoose: "/images/brochure/why-choose-us.jpg",
  europe: "/images/brochure/europe-study.jpg",
  entrance: "/images/brochure/entrance-prep.jpg",
  entranceOffer: "/images/brochure/entrance-offer.jpg",
  cee: "/images/brochure/cee.jpg",
  cmat: "/images/brochure/cmat.jpg",
  leaders: [
    "/images/brand/leader-ravi-gupta.jpg",
    "/images/brand/leader-kabiraj-paudel.jpg",
    "/images/brand/leader-dipendra-mehta.jpg",
    "/images/brand/leader-tilak-thapa.jpg",
  ],
};

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Destinations", path: "/destinations" },
  { label: "Test Prep", path: "/test-preparation" },
  { label: "Entrance", path: "/entrance-preparations" },
  { label: "Blogs", path: "/blogs" },
  { label: "Videos", path: "/videos" },
  { label: "Contact", path: "/contact" },
];

const countries = [
  {
    code: "UK",
    name: "United Kingdom",
    slug: "uk",
    accent: "#e9262d",
    intake: "Sep, Jan, May",
    programs: "Nursing, Business, IT, Public Health",
    highlight: "Scholarship and CAS support for university pathways.",
  },
  {
    code: "US",
    name: "United States",
    slug: "usa",
    accent: "#2457a6",
    intake: "Aug, Jan",
    programs: "STEM, Data, MBA, Liberal Arts",
    highlight: "Profile building and interview preparation for F-1 visa routes.",
  },
  {
    code: "AU",
    name: "Australia",
    slug: "australia",
    accent: "#00a7d8",
    intake: "Feb, Jul, Nov",
    programs: "Hospitality, Engineering, Accounting, IT",
    highlight: "Course mapping with transparent GTE and financial guidance.",
  },
  {
    code: "JP",
    name: "Japan",
    slug: "japan",
    accent: "#d62839",
    intake: "Apr, Oct",
    programs: "Language, IT, Caregiving, Business",
    highlight: "Language class, documentation, and COE pathway coordination.",
  },
  {
    code: "FI",
    name: "Finland",
    slug: "finland",
    accent: "#124e96",
    intake: "Aug, Jan",
    programs: "Technology, Nursing, Business",
    highlight: "Nordic study planning with English-taught program matching.",
  },
  {
    code: "LT",
    name: "Lithuania",
    slug: "lithuania",
    accent: "#f4b000",
    intake: "Sep, Feb",
    programs: "Management, Aviation, IT",
    highlight: "Affordable European study options with practical visa support.",
  },
  {
    code: "KR",
    name: "South Korea",
    slug: "south-korea",
    accent: "#6a2c91",
    intake: "Mar, Sep",
    programs: "Korean Language, Engineering, Media",
    highlight: "University and language institute placement with document checks.",
  },
  {
    code: "MT",
    name: "Malta",
    slug: "malta",
    accent: "#e84c3d",
    intake: "Rolling",
    programs: "Hospitality, Business, Health Care",
    highlight: "Compact European route for career-focused diploma options.",
  },
  {
    code: "AE",
    name: "Dubai",
    slug: "dubai",
    accent: "#00a78e",
    intake: "Rolling",
    programs: "Business, Tourism, Technology",
    highlight: "Fast-moving admissions support for UAE campus options.",
  },
  {
    code: "IN",
    name: "India",
    slug: "india",
    accent: "#f15a24",
    intake: "Jun, Jul, Aug",
    programs: "Medical, Engineering, Management",
    highlight: "Entrance and college placement guidance for nearby study routes.",
  },
];

const services = [
  {
    title: "Career Counseling",
    label: "Clarity",
    text: "Personalized academic mapping based on budget, grades, goals, and family priorities.",
  },
  {
    title: "University Selection",
    label: "Match",
    text: "Shortlists built around intake timing, scholarships, visa strength, and career outcomes.",
  },
  {
    title: "Application Support",
    label: "Apply",
    text: "Document checks, SOP guidance, offer tracking, and application follow-through.",
  },
  {
    title: "Visa Processing",
    label: "Visa",
    text: "Financial preparation, interview coaching, compliance review, and final submission support.",
  },
  {
    title: "Test Preparation",
    label: "Prep",
    text: "IELTS, PTE, TOEFL, SAT, and entrance preparation with focused practice plans.",
  },
  {
    title: "Pre-Departure Briefing",
    label: "Fly",
    text: "Travel, accommodation, cultural orientation, and first-week settlement guidance.",
  },
];

const testCourses = [
  {
    name: "IELTS",
    slug: "ielts",
    score: "Band-focused",
    duration: "6 to 8 weeks",
    modules: ["Listening labs", "Speaking rooms", "Writing correction", "Mock tests"],
  },
  {
    name: "PTE",
    slug: "pte",
    score: "AI-scored practice",
    duration: "4 to 6 weeks",
    modules: ["Template training", "Fluency drills", "Daily scoring", "Section tactics"],
  },
  {
    name: "TOEFL",
    slug: "toefl",
    score: "Academic English",
    duration: "6 weeks",
    modules: ["Reading strategy", "Lecture notes", "Speaking tasks", "Integrated writing"],
  },
  {
    name: "SAT",
    slug: "sat",
    score: "College readiness",
    duration: "8 to 10 weeks",
    modules: ["Math practice", "Reading drills", "Grammar review", "Timed tests"],
  },
];

const entrancePrograms = [
  {
    name: "CEE",
    image: assets.cee,
    text: "Medical entrance preparation with weekly diagnostics and concept revision.",
  },
  {
    name: "CMAT",
    image: assets.cmat,
    text: "Management entrance preparation for BBA, BBM, BIM, BHM, and related programs.",
  },
  {
    name: "Engineering",
    image: assets.entrance,
    text: "Bridge course planning for engineering aspirants after +2.",
  },
  {
    name: "BHM and BBA",
    image: assets.entranceOffer,
    text: "Focused preparation for management and hospitality entrance pathways.",
  },
];

const leaders = [
  { name: "Ravi Gupta", role: "CEO", image: assets.leaders[0] },
  { name: "Kabiraj Paudel", role: "Operational Director", image: assets.leaders[1] },
  { name: "Dipendra Mehta", role: "Marketing Director", image: assets.leaders[2] },
  { name: "Tilak Thapa", role: "Director Abroad Studies", image: assets.leaders[3] },
];

const blogs = [
  {
    category: "Study Abroad",
    title: "How to choose a destination that fits your budget",
    date: "Jun 2026",
    excerpt: "A practical checklist for balancing tuition, living costs, visa strength, and career options.",
  },
  {
    category: "Visa",
    title: "Documents students should prepare before application season",
    date: "May 2026",
    excerpt: "Keep transcripts, financial proof, passport, references, and statements ready before deadlines arrive.",
  },
  {
    category: "Test Prep",
    title: "IELTS and PTE practice habits that move scores faster",
    date: "Apr 2026",
    excerpt: "Consistent corrections, timed mocks, and speaking feedback make preparation more measurable.",
  },
  {
    category: "Entrance",
    title: "After +2: choosing between CEE, CMAT, engineering, and abroad routes",
    date: "Mar 2026",
    excerpt: "A route comparison for students who want a clear plan after grade twelve results.",
  },
];

const testimonials = [
  {
    name: "Sanjana R.",
    route: "UK student visa",
    quote: "EduMark helped me select universities, arrange documents, and prepare for every interview question with confidence.",
  },
  {
    name: "Aayush M.",
    route: "Australia admission",
    quote: "The counseling felt practical. I knew exactly what to submit, when to submit it, and what the next step was.",
  },
  {
    name: "Nisha P.",
    route: "CEE preparation",
    quote: "The classes were structured, the mocks were useful, and the team kept me focused after +2.",
  },
];

const processSteps = [
  "Profile review",
  "Course matching",
  "Offer and documents",
  "Visa readiness",
  "Departure support",
];

function normalizePath(pathname) {
  const path = pathname.replace(/\/+$/, "");
  return path || "/";
}

function AppLink({ to, children, navigate, className = "", onClick }) {
  return (
    <button
      className={className}
      type="button"
      onClick={(event) => {
        onClick?.(event);
        navigate(to);
      }}
    >
      {children}
    </button>
  );
}

function SectionIntro({ eyebrow, title, text, align = "left" }) {
  return (
    <div className={`section-intro ${align === "center" ? "section-intro-center" : ""}`}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function Header({ path, navigate, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = (target) => {
    if (target === "/") return path === "/";
    return path.startsWith(target);
  };

  return (
    <header className="site-header">
      <div className="top-strip">
        <div className="top-strip-inner">
          <span>Araniko Bhawan, Traffic Chowk, Biratnagar-09</span>
          <span>021-590823</span>
          <span>Sun-Fri, 7:00 AM - 6:00 PM</span>
          <span>Ministry Approved | ECAN Member</span>
        </div>
      </div>

      <div className="nav-shell">
        <button className="brand" type="button" onClick={() => navigate("/")}>
          <img src={assets.logo} alt="EduMark logo" />
          <span>
            <strong>EduMark</strong>
            <small>Education Consultancy</small>
          </span>
        </button>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <AppLink
              key={item.path}
              to={item.path}
              navigate={navigate}
              className={active(item.path) ? "nav-item nav-item-active" : "nav-item"}
            >
              {item.label}
            </AppLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="search-button" type="button" onClick={onSearch}>
            Search
          </button>
          <AppLink to="/book-free-consultation" navigate={navigate} className="primary-button compact">
            Book Free Consultation
          </AppLink>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            Menu
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="mobile-panel">
          {navItems.map((item) => (
            <AppLink
              key={item.path}
              to={item.path}
              navigate={navigate}
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </AppLink>
          ))}
          <AppLink
            to="/book-free-consultation"
            navigate={navigate}
            className="primary-button full"
            onClick={() => setMenuOpen(false)}
          >
            Book Free Consultation
          </AppLink>
        </div>
      ) : null}
    </header>
  );
}

function SearchOverlay({ open, onClose, navigate }) {
  const [term, setTerm] = useState("");
  const searchable = useMemo(
    () => [
      ...navItems.map((item) => ({ type: "Page", title: item.label, path: item.path })),
      ...countries.map((country) => ({
        type: "Destination",
        title: country.name,
        path: `/destinations/${country.slug}`,
      })),
      ...testCourses.map((course) => ({
        type: "Test Prep",
        title: course.name,
        path: `/test-preparation/${course.slug}`,
      })),
      ...services.map((service) => ({ type: "Service", title: service.title, path: "/services" })),
      { type: "Admin", title: "Admin Panel", path: "/admin" },
    ],
    [],
  );

  const results = searchable
    .filter((item) => `${item.type} ${item.title}`.toLowerCase().includes(term.toLowerCase()))
    .slice(0, 8);

  if (!open) return null;

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Site search">
      <div className="search-card">
        <div className="search-head">
          <h2>Search EduMark</h2>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
        <input
          autoFocus
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Search destinations, tests, services"
        />
        <div className="search-results">
          {results.map((item) => (
            <button
              type="button"
              key={`${item.type}-${item.title}`}
              onClick={() => {
                navigate(item.path);
                onClose();
                setTerm("");
              }}
            >
              <span>{item.type}</span>
              <strong>{item.title}</strong>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function HomePage({ navigate }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Since 2012 | Biratnagar</span>
          <h1>Your guided pathway to study abroad and career preparation.</h1>
          <p>
            EduMark helps students plan destinations, prepare documents, improve test scores, and move through
            admissions with a clear, accountable team beside them.
          </p>
          <div className="hero-actions">
            <AppLink to="/book-free-consultation" navigate={navigate} className="primary-button">
              Start Counseling
            </AppLink>
            <AppLink to="/destinations" navigate={navigate} className="secondary-button">
              Explore Destinations
            </AppLink>
          </div>
          <div className="trust-row">
            <span>Ministry Approved</span>
            <span>ECAN Member</span>
            <span>12+ Years</span>
          </div>
        </div>
        <div className="hero-media">
          <img src={assets.heroGenerated} alt="Students preparing for international study" />
        </div>
      </section>

      <section className="quick-cards" aria-label="Key services">
        {[
          ["Taking Care", "Immigration and visa process"],
          ["Apply Online", "Quick and easy application support"],
          ["Free Advice", "Experienced consultants in Biratnagar"],
        ].map(([title, text]) => (
          <article key={title}>
            <span>{title}</span>
            <h3>{text}</h3>
          </article>
        ))}
      </section>

      <DestinationsSection navigate={navigate} compact />
      <ServicesPreview navigate={navigate} />
      <WhyChooseSection navigate={navigate} />
      <TestPrepSection navigate={navigate} />
      <ProcessSection navigate={navigate} />
      <SuccessSection />
      <BlogPreview navigate={navigate} />
      <InquiryBand navigate={navigate} />
    </main>
  );
}

function DestinationsSection({ navigate, compact = false }) {
  return (
    <section className="section destinations-band">
      <SectionIntro
        eyebrow="Study Destinations"
        title="Countries EduMark supports from counseling to visa readiness"
        text="Explore popular study routes with intake planning, program shortlisting, and practical document guidance."
        align="center"
      />
      <div className="destination-layout">
        <div className="destination-image">
          <img src={assets.destinations} alt="Study abroad destination collage" />
        </div>
        <div className="country-grid">
          {countries.slice(0, compact ? 8 : countries.length).map((country) => (
            <button
              className="country-card"
              type="button"
              key={country.slug}
              onClick={() => navigate(`/destinations/${country.slug}`)}
              style={{ "--country": country.accent }}
            >
              <span>{country.code}</span>
              <strong>{country.name}</strong>
              <small>{country.intake}</small>
            </button>
          ))}
        </div>
      </div>
      {compact ? (
        <div className="center-actions">
          <AppLink to="/destinations" navigate={navigate} className="secondary-button">
            View All Destinations
          </AppLink>
        </div>
      ) : null}
    </section>
  );
}

function ServicesPreview({ navigate }) {
  return (
    <section className="section">
      <SectionIntro
        eyebrow="Services"
        title="A practical support system from first counseling to departure"
        text="The service model follows the reference site's clear card structure, adapted for EduMark's counseling and preparation workflow."
      />
      <div className="services-grid">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <span>{service.label}</span>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </article>
        ))}
      </div>
      <div className="section-action">
        <AppLink to="/services" navigate={navigate} className="primary-button">
          See Services
        </AppLink>
      </div>
    </section>
  );
}

function WhyChooseSection({ navigate }) {
  return (
    <section className="section split-section">
      <div>
        <SectionIntro
          eyebrow="Why Choose EduMark"
          title="Local accountability with global admissions focus"
          text="The brochure visual system uses confident purple, blue, red, and yellow. The interface keeps those colors in a cleaner website rhythm."
        />
        <div className="reason-list">
          {[
            "Direct profile review before recommending countries.",
            "Transparent document and finance readiness checks.",
            "Classes for language tests and entrance preparation.",
            "Local Biratnagar team with leadership visibility.",
          ].map((reason) => (
            <div key={reason}>
              <span />
              <p>{reason}</p>
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
          title="IELTS, PTE, TOEFL, SAT, and entrance classes under one plan"
          text="A focused learning surface for students who need score progress, discipline, and visible milestones."
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

function ProcessSection({ navigate }) {
  return (
    <section className="section process-section">
      <SectionIntro
        eyebrow="How It Works"
        title="A clear student journey with every step visible"
        text="The process is built for families who want predictable guidance and less confusion during application season."
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

function BlogPreview({ navigate }) {
  return (
    <section className="section">
      <SectionIntro
        eyebrow="Resources"
        title="Fresh guidance for students and parents"
        text="Short, practical articles keep application decisions easier to compare."
      />
      <div className="blog-grid">
        {blogs.slice(0, 3).map((blog) => (
          <article className="blog-card" key={blog.title}>
            <span>{blog.category}</span>
            <h3>{blog.title}</h3>
            <p>{blog.excerpt}</p>
            <small>{blog.date}</small>
          </article>
        ))}
      </div>
      <div className="section-action">
        <AppLink to="/blogs" navigate={navigate} className="secondary-button">
          Read More
        </AppLink>
      </div>
    </section>
  );
}

function InquiryBand({ navigate }) {
  return (
    <section className="inquiry-band">
      <div>
        <span>Free counseling available</span>
        <h2>Plan your next intake with EduMark.</h2>
      </div>
      <div>
        <AppLink to="/book-free-consultation" navigate={navigate} className="light-button">
          Book Consultation
        </AppLink>
        <AppLink to="/contact" navigate={navigate} className="outline-light-button">
          Contact Office
        </AppLink>
      </div>
    </section>
  );
}

function PageHero({ eyebrow, title, text, image }) {
  return (
    <section className="page-hero">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      {image ? (
        <div className="page-hero-image">
          <img src={image} alt="" />
        </div>
      ) : null}
    </section>
  );
}

function AboutPage({ navigate }) {
  return (
    <main>
      <PageHero
        eyebrow="About EduMark"
        title="A Biratnagar consultancy built around accountable guidance"
        text="EduMark connects students with destination planning, admissions support, entrance preparation, and visa readiness from one visible team."
        image={assets.counselling}
      />
      <section className="section split-section">
        <div className="brochure-frame">
          <img src={assets.brochureHero} alt="EduMark study abroad brochure artwork" />
        </div>
        <div>
          <SectionIntro
            eyebrow="Our Position"
            title="Practical counseling, careful documentation, and preparation support"
            text="The public website is shaped for families who need trust signals quickly and students who need direct routes to destinations, tests, and bookings."
          />
          <div className="stats-grid">
            {[
              ["2012", "Established"],
              ["10+", "Study routes"],
              ["4", "Leadership team"],
              ["100%", "Profile-first counseling"],
            ].map(([value, label]) => (
              <article key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </article>
            ))}
          </div>
          <AppLink to="/book-free-consultation" navigate={navigate} className="primary-button">
            Talk to EduMark
          </AppLink>
        </div>
      </section>
      <section className="section">
        <SectionIntro
          eyebrow="Leadership"
          title="A visible team for admissions, operations, marketing, and abroad studies"
          text="Leadership profiles support trust and make the consultancy feel personal, local, and reachable."
          align="center"
        />
        <div className="leader-grid">
          {leaders.map((leader) => (
            <article className="leader-card" key={leader.name}>
              <img src={leader.image} alt={leader.name} />
              <h3>{leader.name}</h3>
              <p>{leader.role}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function ServicesPage({ navigate }) {
  return (
    <main>
      <PageHero
        eyebrow="Services"
        title="Everything a student needs before application, visa, and departure"
        text="A service experience designed to reduce confusion and keep every requirement visible."
        image={assets.counselling}
      />
      <section className="section">
        <div className="services-grid large">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <span>{service.label}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>
      <ProcessSection navigate={navigate} />
    </main>
  );
}

function DestinationsPage({ navigate }) {
  return (
    <main>
      <PageHero
        eyebrow="Destinations"
        title="Compare countries by intake, program direction, and student fit"
        text="Each destination page helps students understand the route before booking counseling."
        image={assets.destinations}
      />
      <DestinationsSection navigate={navigate} />
      <section className="section split-section">
        <div>
          <SectionIntro
            eyebrow="Europe Focus"
            title="Affordable European pathways are a strong EduMark category"
            text="The brochure includes Europe-first study messaging, so the page highlights Finland, Lithuania, Malta, and UK routes without losing Australia, Japan, USA, Dubai, Korea, or India."
          />
          <AppLink to="/book-free-consultation" navigate={navigate} className="primary-button">
            Compare My Options
          </AppLink>
        </div>
        <div className="brochure-frame">
          <img src={assets.europe} alt="EduMark Europe study brochure artwork" />
        </div>
      </section>
    </main>
  );
}

function CountryDetailPage({ country, navigate }) {
  return (
    <main>
      <PageHero
        eyebrow={`${country.name} Study Route`}
        title={`Study in ${country.name} with a plan built around your profile`}
        text={country.highlight}
        image={assets.destinations}
      />
      <section className="section detail-grid">
        <article>
          <span>Intakes</span>
          <h2>{country.intake}</h2>
          <p>EduMark checks deadlines, document readiness, and offer timing before the student commits.</p>
        </article>
        <article>
          <span>Popular Programs</span>
          <h2>{country.programs}</h2>
          <p>Program matching considers budget, academic background, visa story, and career direction.</p>
        </article>
        <article>
          <span>Support</span>
          <h2>Application to visa</h2>
          <p>Students receive counseling, application support, interview preparation, and departure guidance.</p>
        </article>
      </section>
      <InquiryBand navigate={navigate} />
    </main>
  );
}

function TestPreparationPage({ navigate }) {
  return (
    <main>
      <PageHero
        eyebrow="Test Preparation"
        title="Score-focused preparation for IELTS, PTE, TOEFL, and SAT"
        text="Each course is built around practice, correction, and mock-test feedback."
        image={assets.testPrep}
      />
      <section className="section">
        <div className="course-grid">
          {testCourses.map((course) => (
            <article className="course-card" key={course.slug}>
              <span>{course.duration}</span>
              <h3>{course.name}</h3>
              <p>{course.score}</p>
              <div className="module-grid">
                {course.modules.map((module) => (
                  <small key={module}>{module}</small>
                ))}
              </div>
              <AppLink to={`/test-preparation/${course.slug}`} navigate={navigate} className="secondary-button small">
                View Details
              </AppLink>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function TestCoursePage({ course, navigate }) {
  return (
    <main>
      <PageHero
        eyebrow={`${course.name} Course`}
        title={`${course.name} preparation with guided practice and review`}
        text={`${course.duration} course plan with ${course.score.toLowerCase()} support.`}
        image={assets.testPrep}
      />
      <section className="section detail-grid">
        {course.modules.map((module) => (
          <article key={module}>
            <span>Module</span>
            <h2>{module}</h2>
            <p>Practice sessions include correction, timed drills, and progress review with the preparation team.</p>
          </article>
        ))}
      </section>
      <InquiryBand navigate={navigate} />
    </main>
  );
}

function EntrancePage({ navigate }) {
  return (
    <main>
      <PageHero
        eyebrow="Entrance Preparations"
        title="After +2 preparation for medical, management, engineering, and hospitality routes"
        text="EduMark's entrance materials are brought into a clean page structure with clear program cards."
        image={assets.entrance}
      />
      <section className="section">
        <div className="entrance-grid">
          {entrancePrograms.map((program) => (
            <article className="entrance-card" key={program.name}>
              <img src={program.image} alt={`${program.name} preparation artwork`} />
              <div>
                <h3>{program.name}</h3>
                <p>{program.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <InquiryBand navigate={navigate} />
    </main>
  );
}

function BlogsPage() {
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(blogs.map((blog) => blog.category)))];
  const filtered = category === "All" ? blogs : blogs.filter((blog) => blog.category === category);

  return (
    <main>
      <PageHero
        eyebrow="Blogs"
        title="Guidance for study abroad, visas, tests, and entrance decisions"
        text="A resource center for students and parents who want direct advice before visiting the office."
        image={assets.success}
      />
      <section className="section">
        <div className="filter-row">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              className={item === category ? "filter-active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="blog-grid">
          {filtered.map((blog) => (
            <article className="blog-card" key={blog.title}>
              <span>{blog.category}</span>
              <h3>{blog.title}</h3>
              <p>{blog.excerpt}</p>
              <small>{blog.date}</small>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function VideosPage() {
  return (
    <main>
      <PageHero
        eyebrow="Video Gallery"
        title="Campus moments, counseling updates, and preparation snapshots"
        text="A gallery-style page ready for office videos, reels, testimonials, and seminar highlights."
        image={assets.success}
      />
      <section className="section video-grid">
        <article className="video-card featured-video">
          <video controls poster={assets.brochureHero}>
            <source src="/videos/edumark-campus.mp4" type="video/mp4" />
          </video>
          <h3>EduMark office and student moments</h3>
          <p>Featured local video from the available media library.</p>
        </article>
        {["Study abroad seminar", "IELTS classroom", "Visa success story"].map((title, index) => (
          <article className="video-card" key={title}>
            <img src={[assets.counselling, assets.testPrep, assets.success][index]} alt={title} />
            <h3>{title}</h3>
            <p>Prepared slot for future published video updates.</p>
          </article>
        ))}
      </section>
    </main>
  );
}

function ContactForm({ compact = false }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="form-success">
        <h3>Request received</h3>
        <p>EduMark can connect this form to Supabase or a CRM when the backend is added.</p>
      </div>
    );
  }

  return (
    <form
      className={compact ? "contact-form compact-form" : "contact-form"}
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <label>
        Full name
        <input required name="name" placeholder="Your name" />
      </label>
      <label>
        Phone number
        <input required name="phone" placeholder="98XXXXXXXX" />
      </label>
      <label>
        Interest
        <select required name="interest" defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          <option>Study Abroad</option>
          <option>Test Preparation</option>
          <option>Entrance Preparation</option>
          <option>Visa Guidance</option>
        </select>
      </label>
      <label>
        Message
        <textarea name="message" placeholder="Tell us your target country or course" />
      </label>
      <button className="primary-button" type="submit">
        Send Request
      </button>
    </form>
  );
}

function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Visit EduMark at Traffic Chowk, Biratnagar"
        text="Call, message, or submit an inquiry for abroad study, preparation classes, or entrance guidance."
        image={assets.counselling}
      />
      <section className="section contact-layout">
        <div className="contact-details">
          <article>
            <span>Address</span>
            <h3>Araniko Bhawan, Traffic Chowk, Biratnagar-09, Nepal</h3>
          </article>
          <article>
            <span>Phone</span>
            <h3>021-590823</h3>
            <p>9802724823 | 9807095059</p>
          </article>
          <article>
            <span>Hours</span>
            <h3>Sunday to Friday</h3>
            <p>7:00 AM - 6:00 PM</p>
          </article>
          <div className="map-panel">
            <strong>Biratnagar Office</strong>
            <span>Traffic Chowk</span>
          </div>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}

function BookingPage() {
  const [sent, setSent] = useState(false);

  return (
    <main>
      <PageHero
        eyebrow="Book Free Consultation"
        title="Reserve a counseling slot with EduMark"
        text="Students can request a profile review for destination selection, preparation classes, or visa readiness."
        image={assets.counselling}
      />
      <section className="section booking-layout">
        <div>
          <SectionIntro
            eyebrow="Available Focus Areas"
            title="Choose the conversation you need most"
            text="The frontend is ready for a Supabase-backed booking workflow in the next implementation stage."
          />
          <div className="slot-grid">
            {["Study Abroad", "Visa Review", "IELTS/PTE", "Entrance Prep"].map((slot) => (
              <span key={slot}>{slot}</span>
            ))}
          </div>
        </div>
        {sent ? (
          <div className="form-success">
            <h3>Consultation requested</h3>
            <p>The production version can send this to the admin panel and trigger email or SMS confirmation.</p>
          </div>
        ) : (
          <form
            className="contact-form"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <label>
              Student name
              <input required placeholder="Full name" />
            </label>
            <label>
              Mobile number
              <input required placeholder="98XXXXXXXX" />
            </label>
            <label>
              Preferred route
              <select required defaultValue="">
                <option value="" disabled>
                  Select route
                </option>
                {countries.map((country) => (
                  <option key={country.slug}>{country.name}</option>
                ))}
                <option>Entrance Preparation</option>
              </select>
            </label>
            <label>
              Preferred time
              <select required defaultValue="">
                <option value="" disabled>
                  Select time
                </option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </label>
            <button className="primary-button" type="submit">
              Request Slot
            </button>
          </form>
        )}
      </section>
    </main>
  );
}

function AdminPage() {
  const [view, setView] = useState("Dashboard");
  const adminViews = ["Dashboard", "Leads", "Content", "Security"];

  return (
    <main>
      <PageHero
        eyebrow="Admin Panel"
        title="A management surface for leads, content, destinations, and bookings"
        text="This is a frontend-ready admin concept for the Supabase and Vercel architecture planned earlier."
        image={assets.counselling}
      />
      <section className="section admin-shell">
        <aside className="admin-sidebar">
          {adminViews.map((item) => (
            <button
              type="button"
              key={item}
              className={view === item ? "admin-active" : ""}
              onClick={() => setView(item)}
            >
              {item}
            </button>
          ))}
        </aside>
        <div className="admin-panel">
          <div className="admin-toolbar">
            <h2>{view}</h2>
            <span>Role: Super Admin</span>
          </div>
          {view === "Dashboard" ? (
            <div className="admin-grid">
              {[
                ["42", "New inquiries"],
                ["18", "Consultation slots"],
                ["9", "Pending articles"],
                ["4", "Security alerts"],
              ].map(([value, label]) => (
                <article key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>
          ) : null}
          {view === "Leads" ? (
            <div className="table-card">
              {["Sanjay - Australia - New", "Ritika - IELTS - Follow up", "Manish - CEE - Booked"].map((lead) => (
                <div key={lead}>{lead}</div>
              ))}
            </div>
          ) : null}
          {view === "Content" ? (
            <div className="table-card">
              {["Destinations editor", "Blogs and SEO", "Video gallery", "Testimonials"].map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          ) : null}
          {view === "Security" ? (
            <div className="table-card">
              {["MFA required", "Role-based access", "Audit log", "Form spam checks"].map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <button className="brand footer-brand" type="button" onClick={() => navigate("/")}>
            <img src={assets.logo} alt="EduMark logo" />
            <span>
              <strong>EduMark</strong>
              <small>Education Consultancy</small>
            </span>
          </button>
          <p>Study abroad, entrance preparation, test preparation, and visa guidance from Biratnagar.</p>
        </div>
        <div>
          <h3>Explore</h3>
          {navItems.slice(1, 6).map((item) => (
            <AppLink key={item.path} to={item.path} navigate={navigate} className="footer-link">
              {item.label}
            </AppLink>
          ))}
        </div>
        <div>
          <h3>Destinations</h3>
          {countries.slice(0, 6).map((country) => (
            <AppLink
              key={country.slug}
              to={`/destinations/${country.slug}`}
              navigate={navigate}
              className="footer-link"
            >
              {country.name}
            </AppLink>
          ))}
        </div>
        <div>
          <h3>Contact</h3>
          <p>Araniko Bhawan, Traffic Chowk, Biratnagar-09</p>
          <p>021-590823 | 9802724823</p>
          <AppLink to="/admin" navigate={navigate} className="footer-link admin-footer-link">
            Admin Panel
          </AppLink>
        </div>
      </div>
    </footer>
  );
}

function renderPage(path, navigate) {
  const countryMatch = path.match(/^\/destinations\/([^/]+)$/);
  if (countryMatch) {
    const country = countries.find((item) => item.slug === countryMatch[1]);
    return country ? <CountryDetailPage country={country} navigate={navigate} /> : <DestinationsPage navigate={navigate} />;
  }

  const testMatch = path.match(/^\/test-preparation\/([^/]+)$/);
  if (testMatch) {
    const course = testCourses.find((item) => item.slug === testMatch[1]);
    return course ? <TestCoursePage course={course} navigate={navigate} /> : <TestPreparationPage navigate={navigate} />;
  }

  switch (path) {
    case "/":
      return <HomePage navigate={navigate} />;
    case "/about":
      return <AboutPage navigate={navigate} />;
    case "/services":
      return <ServicesPage navigate={navigate} />;
    case "/destinations":
      return <DestinationsPage navigate={navigate} />;
    case "/test-preparation":
      return <TestPreparationPage navigate={navigate} />;
    case "/entrance-preparations":
      return <EntrancePage navigate={navigate} />;
    case "/blogs":
      return <BlogsPage />;
    case "/videos":
      return <VideosPage />;
    case "/contact":
      return <ContactPage />;
    case "/book-free-consultation":
      return <BookingPage />;
    case "/admin":
      return <AdminPage />;
    default:
      return <HomePage navigate={navigate} />;
  }
}

export function App() {
  const [path, setPath] = useState(normalizePath(window.location.pathname));
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (nextPath) => {
    const normalized = normalizePath(nextPath);
    window.history.pushState({}, "", normalized);
    setPath(normalized);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header path={path} navigate={navigate} onSearch={() => setSearchOpen(true)} />
      {renderPage(path, navigate)}
      <Footer navigate={navigate} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} navigate={navigate} />
    </>
  );
}
