import { useState } from "react";
import { SectionIntro } from "../components/SectionIntro.jsx";
import { BulletList } from "../components/BulletList.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { assets } from "../data/assets.js";
import { countries } from "../data/countries.js";

export function BookingPage() {
  const [sent, setSent] = useState(false);

  return (
    <main>
      <PageHero
        eyebrow="Book Free Consultation"
        title="Start your journey today with a free profile review"
        text="Students can request a no-obligation counselling slot for destination selection, preparation classes, or visa readiness."
        image={assets.counselling}
      />
      <section className="section booking-layout">
        <div>
          <SectionIntro
            eyebrow="Available Focus Areas"
            title="Choose the conversation you need most"
            text="The frontend is ready for a Supabase-backed booking workflow in the next implementation stage."
          />
          <div className="slot-grid">
            {["Study Abroad", "Visa Review", "IELTS/PTE", "Entrance Prep", "Europe Routes", "Japan/Korea"].map((slot) => (
              <span key={slot}>{slot}</span>
            ))}
          </div>
          <BulletList items={["100% free counselling", "Certified counsellors", "End-to-end support", "Since 2012"]} />
        </div>
        {sent ? (
          <div className="form-success">
            <h3>Consultation requested</h3>
            <p>The production version can send this to the admin panel and trigger email or SMS confirmation.</p>
          </div>
        ) : (
          <form
            className="contact-form"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <label>
              Student name
              <input required placeholder="Full name" />
            </label>
            <label>
              Mobile number
              <input required placeholder="98XXXXXXXX" />
            </label>
            <label>
              Email
              <input type="email" placeholder="you@example.com" />
            </label>
            <label>
              Preferred route
              <select required defaultValue="">
                <option value="" disabled>
                  Select route
                </option>
                {countries.map((country) => (
                  <option key={country.slug}>{country.name}</option>
                ))}
                <option>Entrance Preparation</option>
                <option>Test Preparation</option>
              </select>
            </label>
            <label>
              Course interest
              <input placeholder="Course, test, or entrance target" />
            </label>
            <label>
              Preferred time
              <select required defaultValue="">
                <option value="" disabled>
                  Select time
                </option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </label>
            <button className="primary-button" type="submit">
              Book My Session
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
