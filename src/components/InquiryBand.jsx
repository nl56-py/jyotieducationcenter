import { AppLink } from "./AppLink.jsx";

export function InquiryBand({ navigate }) {
  return (
    <section className="inquiry-band">
      <div>
        <span>Free counselling available</span>
        <h2>Plan your next intake with EduMark.</h2>
      </div>
      <div>
        <AppLink to="/book-free-consultation" navigate={navigate} className="light-button">
          Book Consultation
        </AppLink>
        <AppLink to="/contact" navigate={navigate} className="outline-light-button">
          Contact Office
        </AppLink>
      </div>
    </section>
  );
}
