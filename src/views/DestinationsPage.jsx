import { AppLink } from "../components/AppLink.jsx";
import { SectionIntro } from "../components/SectionIntro.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { DestinationsSection } from "../components/DestinationsSection.jsx";
import { assets } from "../data/assets.js";

export function DestinationsPage({ navigate }) {
  return (
    <main>
      <PageHero
        eyebrow="Destinations"
        title="Compare countries by intake, program direction, cost, and student fit"
        text="Each destination page helps students understand the route before booking counselling."
        image={assets.destinations}
      />
      <DestinationsSection navigate={navigate} />
      <section className="section split-section">
        <div>
          <SectionIntro
            eyebrow="Europe Focus"
            title="Affordable European pathways are a strong EduMark category"
            text="The brochure highlights Europe-first study messaging, so the page gives Finland, Lithuania, Malta, and UK routes enough visibility without losing Australia, Japan, USA, Dubai, Korea, or India."
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
