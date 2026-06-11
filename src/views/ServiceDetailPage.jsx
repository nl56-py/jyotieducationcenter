import { AppLink } from "../components/AppLink.jsx";
import { SectionIntro } from "../components/SectionIntro.jsx";
import { BulletList } from "../components/BulletList.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { assets } from "../data/assets.js";

export function ServiceDetailPage({ service, navigate }) {
  return (
    <main>
      <PageHero eyebrow={service.title} title={`${service.title} with EduMark`} text={service.detail} image={assets.counselling} />
      <section className="section detail-grid">
        {service.bullets.map((item) => (
          <article key={item}>
            <span>Support</span>
            <h2>{item}</h2>
            <p>This step is handled with clear counselling notes, required documents, and follow-up actions.</p>
          </article>
        ))}
      </section>
      <section className="section split-section">
        <div>
          <SectionIntro
            eyebrow="Expected Outcomes"
            title="What students should leave with"
            text="Each service page is structured for quick scanning and conversion to counselling."
          />
          <BulletList items={service.outcomes} />
          <AppLink to="/book-free-consultation" navigate={navigate} className="primary-button">
            Book This Support
          </AppLink>
        </div>
        <div className="brochure-frame">
          <img src={assets.whyChoose} alt="EduMark support highlights" />
        </div>
      </section>
    </main>
  );
}
