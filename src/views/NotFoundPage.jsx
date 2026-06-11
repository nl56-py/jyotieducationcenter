import { AppLink } from "../components/AppLink.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { assets } from "../data/assets.js";

export function NotFoundPage({ navigate }) {
  return (
    <main>
      <PageHero
        eyebrow="Page Not Found"
        title="This EduMark page is not available yet"
        text="Use the navigation or return to the homepage to continue exploring the site."
        image={assets.destinations}
      />
      <section className="section center-actions">
        <AppLink to="/" navigate={navigate} className="primary-button">
          Back Home
        </AppLink>
        <AppLink to="/contact" navigate={navigate} className="secondary-button">
          Contact EduMark
        </AppLink>
      </section>
    </main>
  );
}
