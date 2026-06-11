import { AppLink } from "../components/AppLink.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { ContactForm } from "../components/ContactForm.jsx";
import { assets } from "../data/assets.js";
import { site } from "../data/site.js";

export function ContactPage({ navigate }) {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Visit EduMark at Traffic Chowk, Biratnagar"
        text="Call, message, WhatsApp, or submit an inquiry for abroad study, preparation classes, or entrance guidance."
        image={assets.counselling}
      />
      <section className="section contact-layout">
        <div className="contact-details">
          <article>
            <span>Address</span>
            <h3>{site.address}</h3>
          </article>
          <article>
            <span>Phone</span>
            <h3>{site.phone}</h3>
            <p>{site.mobile} | {site.alternateMobile} | WhatsApp {site.whatsapp}</p>
          </article>
          <article>
            <span>Email And Hours</span>
            <h3>{site.email}</h3>
            <p>{site.hours}</p>
          </article>
          <div className="map-panel">
            <strong>Biratnagar Office</strong>
            <span>Traffic Chowk</span>
          </div>
          <AppLink to="/book-free-consultation" navigate={navigate} className="secondary-button">
            Book Free Consultation
          </AppLink>
        </div>
        <ContactForm buttonText="Send Message" />
      </section>
    </main>
  );
}
