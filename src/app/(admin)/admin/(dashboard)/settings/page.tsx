"use client";

import { useState, useEffect } from "react";
import { Save, Settings, Info, Share2, Lock } from "lucide-react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [revalidating, setRevalidating] = useState(false);

  // Form states
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [hours, setHours] = useState("");

  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");

  // Password change states
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setUpdatingPassword(true);
    try {
      const response = await fetch("/api/admin/profile/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setPasswordSuccess("Password updated successfully!");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordError(result.error || "Failed to update password.");
      }
    } catch (err) {
      console.error("Password update error:", err);
      setPasswordError("Failed to connect to the server.");
    } finally {
      setUpdatingPassword(false);
    }
  };

  const loadSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/settings");
      if (response.ok) {
        const data = await response.json();
        
        // Parse contact info
        if (data.contact_info) {
          setAddress(data.contact_info.address || "");
          setPhone(data.contact_info.phone || "");
          setEmail(data.contact_info.email || "");
          setHours(data.contact_info.hours || "");
        }
        
        // Parse social links
        if (data.social_links) {
          setFacebook(data.social_links.facebook || "");
          setInstagram(data.social_links.instagram || "");
          setLinkedin(data.social_links.linkedin || "");
        }
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Save contact info
      const contactRes = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "contact_info",
          value: { address, phone, email, hours },
          description: "Office contact coordinates and working schedule"
        })
      });

      // Save social links
      const socialRes = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "social_links",
          value: { facebook, instagram, linkedin },
          description: "Social media profile links and hooks"
        })
      });

      if (contactRes.ok && socialRes.ok) {
        alert("Settings updated and saved to database successfully!");
      } else {
        alert("Some settings failed to save.");
      }
    } catch (err) {
      console.error("Error saving settings:", err);
      alert("Failed to save settings.");
    }
    setLoading(false);
  };

  const handleRevalidate = async () => {
    setRevalidating(true);
    try {
      const tags = ["home", "destinations", "blogs", "services"];
      const response = await fetch("/api/admin/cache", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tags, paths: ["/", "/destinations", "/blogs", "/services"] }),
      });

      if (response.ok) {
        alert("Edge static cache successfully purged and updated for tags: " + tags.join(", "));
      } else {
        const data = await response.json();
        alert(data.error || "Failed to purge static cache.");
      }
    } catch (err) {
      console.error("Revalidation error:", err);
      alert("Revalidation failed due to network error.");
    }
    setRevalidating(false);
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

      {loading && address === "" ? (
        <div style={{ textAlign: "center", padding: "40px" }}>Loading portal settings...</div>
      ) : (
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
                    Force Next.js edge routers to fetch fresh database versions, refreshing the public homepage, destinations list, and blogs.
                  </p>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    style={{ width: "100%" }}
                    onClick={handleRevalidate}
                    disabled={revalidating}
                  >
                    {revalidating ? "Purging Edge CDN Cache..." : "Purge & Rebuild Static Cache"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
            <button type="submit" className="btn btn-primary" style={{ width: "180px" }} disabled={loading}>
              <Save size={16} /> {loading ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      )}

      {/* Change Password Section */}
      <div className="panel-card" style={{ marginTop: "32px", maxWidth: "600px" }}>
        <div className="panel-card-header">
          <h3 className="panel-card-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Lock size={18} className="text-primary" />
            Change Your Password
          </h3>
        </div>
        <div style={{ padding: "24px" }}>
          <p style={{ fontSize: "13px", color: "var(--dm-outline)", marginBottom: "20px" }}>
            Set a new secure password for your administrator account.
          </p>

          {passwordError && (
            <div style={{ 
              padding: "12px 16px", 
              backgroundColor: "var(--dm-error-container)", 
              color: "var(--dm-error)", 
              borderRadius: "var(--dm-rounded-md)", 
              fontSize: "13px", 
              marginBottom: "16px",
              fontWeight: 500
            }}>
              {passwordError}
            </div>
          )}

          {passwordSuccess && (
            <div style={{ 
              padding: "12px 16px", 
              backgroundColor: "var(--dm-primary-container)", 
              color: "var(--dm-primary)", 
              borderRadius: "var(--dm-rounded-md)", 
              fontSize: "13px", 
              marginBottom: "16px",
              fontWeight: 500
            }}>
              {passwordSuccess}
            </div>
          )}

          <form onSubmit={handleChangePassword}>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="Enter new password (min. 6 characters)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            
            <div className="form-group" style={{ marginBottom: "24px" }}>
              <label className="form-label">Confirm New Password</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "180px" }} disabled={updatingPassword}>
              <Save size={16} /> {updatingPassword ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
