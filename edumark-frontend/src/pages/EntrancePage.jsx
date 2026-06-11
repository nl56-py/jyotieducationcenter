import { PageHero } from "../components/PageHero.jsx";
import { InquiryBand } from "../components/InquiryBand.jsx";
import { assets } from "../data/assets.js";
import { entrancePrograms } from "../data/entrancePrograms.js";

export function EntrancePage({ navigate }) {
  return (
    <main>
      <PageHero
        eyebrow="Entrance Preparations"
        title="Prepare smart. Aim high. Crack the entrance."
        text="After +2 preparation for medical, management, engineering, hospitality, and related bachelor routes."
        image={assets.entrance}
      />
      <section className="section">
        <div className="entrance-grid">
          {entrancePrograms.map((program) => (
            <article className="entrance-card" key={program.name}>
              <img src={program.image} alt={`${program.name} artwork`} />
              <div>
                <h3>{program.name}</h3>
                <p>{program.text}</p>
                <div className="module-grid">
                  {program.bullets.map((bullet) => (
                    <small key={bullet}>{bullet}</small>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section callout-panel">
        <div>
          <span>Classes Starting Soon</span>
          <h2>Limited seats for CEE and CMAT preparation</h2>
          <p>Free QAD books, daily classes, chapter-wise tests, library access, video lectures, and practice classes are highlighted in the available brochure materials.</p>
        </div>
        <div className="module-grid">
          {["Daily 4 hours class", "Chapter-wise tests", "Full day library access", "Daily practice class"].map((item) => (
            <small key={item}>{item}</small>
          ))}
        </div>
      </section>
      <InquiryBand navigate={navigate} />
    </main>
  );
}
