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
        title="Visit Jyoti Educations at Damak, Jhapa"
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.595507591625!2d87.69764339999999!3d26.6614305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e58f624c234a5b%3A0xe3e907961a8c8d45!2sJyoti%20Education%20Corner%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1787635462251!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "320px", display: "block" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Jyoti Education Corner Pvt. Ltd. Map Location"
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
