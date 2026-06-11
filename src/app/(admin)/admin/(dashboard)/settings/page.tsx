"use client";

import { useState } from "react";
import { Save, Settings, Info, Share2 } from "lucide-react";

export default function SettingsPage() {
  const [address, setAddress] = useState("Putalisadak, Kathmandu, Nepal");
  const [phone, setPhone] = useState("+977-1-4412345, +977-9851000000");
  const [email, setEmail] = useState("info@edumark.edu.np");
  const [hours, setHours] = useState("Sun - Fri: 9:00 AM - 6:00 PM");

  const [facebook, setFacebook] = useState("https://facebook.com/edumark.np");
  const [instagram, setInstagram] = useState("https://instagram.com/edumark.np");
  const [linkedin, setLinkedin] = useState("https://linkedin.com/company/edumark-nepal");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Settings updated successfully! (Triggers cache tags revalidation for public pages)");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Portal Settings</h2>
          <p style={{ color: "var(--dm-outline)", fontSize: "14px" }}>
            Configure office contact cards, social handles, and API destinations.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {/* Main Contact Information */}
          <div className="panel-card" style={{ marginBottom: 0 }}>
            <div className="panel-card-header">
              <h3 className="panel-card-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Info size={18} className="text-primary" />
                Company Contact Information
              </h3>
            </div>
            <div style={{ padding: "24px" }}>
              <div className="form-group">
                <label className="form-label">Physical Office Address</label>
                <input type="text" className="form-input" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Contact Phones</label>
                <input type="text" className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Inquiry Mail Receiver</label>
                <input type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Business Office Hours</label>
                <input type="text" className="form-input" value={hours} onChange={(e) => setHours(e.target.value)} required />
              </div>
            </div>
          </div>

          {/* Social Links & Cache Control */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="panel-card" style={{ marginBottom: 0 }}>
              <div className="panel-card-header">
                <h3 className="panel-card-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Share2 size={18} className="text-secondary" />
                  Social Media Links
                </h3>
              </div>
              <div style={{ padding: "24px" }}>
                <div className="form-group">
                  <label className="form-label">Facebook Profile URL</label>
                  <input type="text" className="form-input" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Instagram Handle URL</label>
                  <input type="text" className="form-input" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">LinkedIn Organization URL</label>
                  <input type="text" className="form-input" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                </div>
              </div>
            </div>

            {/* Revalidation Action Card */}
            <div className="panel-card" style={{ marginBottom: 0 }}>
              <div className="panel-card-header">
                <h3 className="panel-card-title">Edge Cache Revalidation</h3>
              </div>
              <div style={{ padding: "24px" }}>
                <p style={{ fontSize: "13px", color: "var(--dm-outline)", marginBottom: "16px" }}>
                  Force Next.js edge routers to fetch fresh database versions, refreshing the public homepage and guides.
                </p>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  style={{ width: "100%" }}
                  onClick={() => alert("Revalidating cache tags: [home, destinations, blogs]. Refreshing public sites.")}
                >
                  Purge & Rebuild Static Cache
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
          <button type="submit" className="btn btn-primary" style={{ width: "180px" }}>
            <Save size={16} /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
