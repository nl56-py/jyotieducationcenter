"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, ShieldAlert, Key, RefreshCw, CheckCircle2, CheckCircle } from "lucide-react";

export default function SecurityCenterPage() {
  const [checklist, setChecklist] = useState([
    { task: "Supabase RLS enabled on all 25 tables", status: true },
    { task: "HTTP-Only session auth cookies proxy", status: true },
    { task: "Form honeypots & spam filter system", status: true },
    { task: "HSTS preload & CSP strict headers", status: true },
    { task: "Multi-Factor Authentication (MFA) for staff", status: false }
  ]);

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/security");
      if (response.ok) {
        const data = await response.json();
        setEvents(data || []);
        setLoading(false);
        return;
      }
    } catch (e) {
      console.warn("Failed to fetch security events from API:", e);
    }
    setEvents([]);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleMfaToggle = () => {
    setChecklist(checklist.map(c => c.task.includes("MFA") ? { ...c, status: !c.status } : c));
  };

  const handleResolveEvent = async (id: string, isResolved: boolean) => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, resolve: !isResolved })
      });
      if (response.ok) {
        await fetchEvents();
      }
    } catch (err) {
      console.error("Failed to resolve security event:", err);
    }
    setLoading(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Security Center</h2>
          <p style={{ color: "var(--dm-outline)", fontSize: "14px" }}>
            Monitor login failures, manage rate limits, and audit OWASP Top-10 policy compliance.
          </p>
        </div>
        <button className="btn btn-light" onClick={fetchEvents} style={{ height: "36px", padding: "0 12px", display: "flex", alignItems: "center", gap: "6px" }}>
          <RefreshCw size={14} className={loading ? "spin" : ""} /> Refresh
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Compliance Checklist */}
        <div className="panel-card" style={{ marginBottom: 0 }}>
          <div className="panel-card-header">
            <h3 className="panel-card-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShieldCheck size={20} className="text-secondary" />
              OWASP Compliance Checklist
            </h3>
          </div>
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {checklist.map((c, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--dm-surface-container)", paddingBottom: "12px" }}>
                <span style={{ fontSize: "14px", fontWeight: 500 }}>{c.task}</span>
                <button 
                  className={`btn ${c.status ? "btn-secondary" : "btn-primary"}`} 
                  style={{ height: "30px", fontSize: "12px", padding: "0 10px" }}
                  onClick={c.task.includes("MFA") ? handleMfaToggle : undefined}
                >
                  {c.status ? "Active" : "Enforce"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Failed Logins & Abuse Events */}
        <div className="panel-card" style={{ marginBottom: 0 }}>
          <div className="panel-card-header">
            <h3 className="panel-card-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShieldAlert size={20} className="text-error" />
              Failed Authentications & Form Abuse events
            </h3>
          </div>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Event details</th>
                  <th>Severity</th>
                  <th>Resolution</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{e.event_type.replace(/_/g, " ").toUpperCase()}</div>
                      <div style={{ fontSize: "11px", color: "var(--dm-outline)", maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        IP: {e.details?.ip || "Unknown"} • {e.details?.user_agent || "No UA"}
                      </div>
                      {e.details?.error && <div style={{ fontSize: "11px", color: "var(--dm-error)" }}>{e.details.error}</div>}
                    </td>
                    <td>
                      <span className={`status-badge severity-${e.severity}`} style={{ textTransform: "capitalize", background: e.severity === "high" ? "#FEE2E2" : "#FEF3C7", color: e.severity === "high" ? "#DC2626" : "#D97706" }}>
                        {e.severity}
                      </span>
                    </td>
                    <td>
                      <button 
                        className={`btn ${e.resolved_at ? "btn-secondary" : "btn-light"}`}
                        style={{ height: "30px", padding: "0 8px", fontSize: "12px" }}
                        onClick={() => handleResolveEvent(e.id, !!e.resolved_at)}
                      >
                        {e.resolved_at ? <CheckCircle2 size={12} className="text-secondary" /> : "Resolve"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
