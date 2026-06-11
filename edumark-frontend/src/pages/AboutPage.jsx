import { AppLink } from "../components/AppLink.jsx";
import { SectionIntro } from "../components/SectionIntro.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { InquiryBand } from "../components/InquiryBand.jsx";
import { assets } from "../data/assets.js";
import { leaders } from "../data/entrancePrograms.js";

export function AboutPage({ navigate }) {
  return (
    <main>
      <PageHero
        eyebrow="About EduMark"
        title="The most trusted consultancy in Eastern Region"
        text="EduMark connects students with global exposure, study abroad guidance, test preparation, entrance preparation, and visa readiness from one visible Biratnagar team."
        image={assets.counselling}
      />
      <section className="section split-section">
        <div className="brochure-frame">
          <img src={assets.brochureHero} alt="EduMark study abroad brochure artwork" />
        </div>
        <div>
          <SectionIntro
            eyebrow="Our Story"
            title="Practical counselling, careful documentation, and preparation support"
            text="EduMark Pvt. Ltd. is dedicated to guiding students toward the best international academic opportunities through expert counselling, transparent processes, and institutional partnerships."
          />
          <div className="stats-grid">
            {[
              ["2012", "Established legacy"],
              ["14", "Years of excellence"],
              ["500+", "College and university options"],
              ["10+", "Destination routes"],
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
      <section className="section detail-grid">
        {[
          ["Mission", "Provide transparent, ethical, and practical guidance from first counselling to departure."],
          ["Vision", "Become the most trusted multi-destination education partner for students in Koshi Province."],
          ["Values", "Clarity, accountability, student-first advice, and measurable preparation support."],
        ].map(([title, text]) => (
          <article key={title}>
            <span>EduMark</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
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
      <InquiryBand navigate={navigate} />
    </main>
  );
}
