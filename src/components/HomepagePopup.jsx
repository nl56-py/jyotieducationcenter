"use client";

import { useEffect, useState } from "react";
import { AppLink } from "./AppLink.jsx";
import { Megaphone, X } from "lucide-react";
import { sanitizeHtml } from "../lib/security/sanitize-html";

export function HomepagePopup({ navigate }) {
  const [popup, setPopup] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/public/homepage-popup", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (active && data.popup) {
          setPopup(data.popup);
          setVisible(true);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  if (!popup || !visible) return null;

  return (
    <div className="homepage-popup-overlay" role="dialog" aria-modal="true" aria-labelledby="homepage-popup-title">
      <div className="homepage-popup-card">
        <button className="homepage-popup-close" onClick={() => setVisible(false)} aria-label="Close notice">
          <X size={18} />
        </button>
        <div className="homepage-popup-icon">
          <Megaphone size={24} />
        </div>
        <span className="homepage-popup-kicker">{popup.display_mode === "banner" ? "Notice" : "EduMark Update"}</span>
        <h2 id="homepage-popup-title">{popup.title}</h2>
        {popup.subtitle && <p className="homepage-popup-subtitle">{popup.subtitle}</p>}
        {popup.body && <div className="homepage-popup-body" dangerouslySetInnerHTML={{ __html: sanitizeHtml(popup.body) }} />}
        {popup.cta_label && popup.cta_href && (
          <AppLink to={popup.cta_href} navigate={navigate} className="homepage-popup-cta">
            {popup.cta_label}
          </AppLink>
        )}
      </div>
    </div>
  );
}
