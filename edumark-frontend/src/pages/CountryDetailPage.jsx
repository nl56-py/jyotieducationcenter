import { AppLink } from "../components/AppLink.jsx";
import { SectionIntro } from "../components/SectionIntro.jsx";
import { BulletList } from "../components/BulletList.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { InquiryBand } from "../components/InquiryBand.jsx";
import { assets } from "../data/assets.js";

export function CountryDetailPage({ country, navigate }) {
  return (
    <main>
      <PageHero
        eyebrow={`${country.name} Study Route`}
        title={`Study in ${country.name} with a plan built around your profile`}
        text={country.highlight}
        image={country.region === "European" ? assets.europe : assets.destinations}
      />
      <section className="section detail-grid">
        <article>
          <span>Intakes</span>
          <h2>{country.intake}</h2>
          <p>EduMark checks deadlines, document readiness, and offer timing before the student commits.</p>
        </article>
        <article>
          <span>Estimated Cost</span>
          <h2>{country.cost}</h2>
          <p>Cost planning includes tuition, living expense assumptions, deposits, and evidence requirements.</p>
        </article>
        <article>
          <span>Popular Courses</span>
          <h2>{country.programs}</h2>
          <p>Program matching considers budget, academic background, visa story, and career direction.</p>
        </article>
      </section>
      <section className="section split-section">
        <div>
          <SectionIntro eyebrow={`Why ${country.name}`} title="A route worth comparing" text={country.highlight} />
          <BulletList items={country.why} />
        </div>
        <div className="info-panel">
          <span>Popular Institutions</span>
          {country.universities.map((university) => (
            <strong key={university}>{university}</strong>
          ))}
        </div>
      </section>
      <section className="section">
        <SectionIntro
          eyebrow="Application And Visa"
          title="Route support from shortlist to departure"
          text="The same readable template is used across all country pages so students can compare routes quickly."
        />
        <div className="feature-grid">
          {country.visa.map((item) => (
            <article key={item}>
              <h3>{item}</h3>
              <p>EduMark keeps the requirement visible and turns it into a step-by-step action list.</p>
            </article>
          ))}
        </div>
      </section>
      {country.specialTitle ? (
        <section className="section callout-panel">
          <div>
            <span>{country.region} Route</span>
            <h2>{country.specialTitle}</h2>
            <p>{country.specialText}</p>
          </div>
          <div className="module-grid">
            {country.specialPoints.map((point) => (
              <small key={point}>{point}</small>
            ))}
          </div>
        </section>
      ) : null}
      <section className="section faq-list">
        <SectionIntro eyebrow="FAQs" title={`${country.name} questions students ask`} />
        {country.faq.map(([question, answer]) => (
          <article key={question}>
            <h3>{question}</h3>
            <p>{answer}</p>
          </article>
        ))}
      </section>
      <InquiryBand navigate={navigate} />
    </main>
  );
}
