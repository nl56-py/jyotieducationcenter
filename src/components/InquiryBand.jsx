import { AppLink } from "./AppLink.jsx";

export function InquiryBand() {
  return (
    <section className="inquiry-band">
      <div>
        <span>Free counselling available</span>
        <h2>Plan your next intake with Jyoti Educations.</h2>
      </div>
      <div>
        <AppLink to="/book-free-consultation" className="light-button">
          Book Consultation
        </AppLink>
        <AppLink to="/contact" className="outline-light-button">
          Contact Office
        </AppLink>
      </div>
    </section>
  );
}
