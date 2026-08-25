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
        title="Visit Jyoti Educations at Putalisadak, Kathmandu"
        text="Call, message, WhatsApp, or submit an inquiry for abroad study, test preparation classes, or visa counseling."
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
          <div className="map-panel" style={{ padding: 0, overflow: "hidden", minHeight: "320px" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4172465355653!2d85.31828777546747!3d27.704403076182155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a7147b2c5d%3A0x6b9d62d29f8f4165!2sPutalisadak%2C%20Kathmandu!5e0!3m2!1sen!2snp!4v1710000000000!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "320px", display: "block" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Jyoti Educations Map Location"
            />
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
