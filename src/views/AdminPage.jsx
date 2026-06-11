import { useEffect, useState } from "react";
import { PageHero } from "../components/PageHero.jsx";
import { assets } from "../data/assets.js";
import { adminViews } from "../data/adminViews.js";

export function AdminPage({ initialView = "dashboard", navigate }) {
  const [view, setView] = useState(initialView);

  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  const selected = adminViews.find((item) => item.key === view) || adminViews[0];

  return (
    <main>
      <PageHero
        eyebrow="Admin Panel"
        title="A management surface for leads, content, destinations, and bookings"
        text="This is a frontend-ready admin concept for the Supabase and Vercel architecture planned earlier."
        image={assets.counselling}
      />
      <section className="section admin-shell">
        <aside className="admin-sidebar">
          {adminViews.map((item) => (
            <button
              type="button"
              key={item.key}
              className={selected.key === item.key ? "admin-active" : ""}
              onClick={() => navigate(`/admin/${item.key}`)}
            >
              {item.label}
            </button>
          ))}
        </aside>
        <div className="admin-panel">
          <div className="admin-toolbar">
            <h2>{selected.label}</h2>
            <span>Role: Super Admin</span>
          </div>
          {selected.summary ? (
            <div className="admin-grid">
              {selected.summary.map(([value, label]) => (
                <article key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>
          ) : null}
          <div className="table-card admin-table">
            {selected.rows.map((row) => (
              <div key={row}>{row}</div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
