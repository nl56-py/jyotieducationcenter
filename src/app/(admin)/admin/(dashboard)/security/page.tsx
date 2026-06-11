"use client";

import { useState } from "react";
import { ShieldCheck, ShieldAlert, Key, RefreshCw, CheckCircle2 } from "lucide-react";

export default function SecurityCenterPage() {
  const [checklist, setChecklist] = useState([
    { task: "Supabase RLS enabled on all 25 tables", status: true },
    { task: "HTTP-Only session auth cookies proxy", status: true },
    { task: "Form honeypots & spam filter system", status: true },
    { task: "HSTS preload & CSP strict headers", status: true },
    { task: "Multi-Factor Authentication (MFA) for staff", status: false }
  ]);

  const [failedLogins, setFailedLogins] = useState([
    { ip: "202.166.220.1", user_agent: "Mozilla/5.0...", timestamp: "2026-06-11 11:32:04", count: 1 },
    { ip: "185.220.101.4", user_agent: "Python requests...", timestamp: "2026-06-11 09:15:11", count: 3 }
  ]);

  const handleMfaToggle = () => {
    setChecklist(checklist.map(c => c.task.includes("MFA") ? { ...c, status: !c.status } : c));
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
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Compliance Checklist */}
        <div className="panel-card" style={{ marginBottom: 0 }}>
          <div className="panel-card-header">
            <h3 className="panel-card-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShieldCheck size={20} className="text-secondary" />
              OWASP compliance checklist
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

        {/* Failed Login Attempts */}
        <div className="panel-card" style={{ marginBottom: 0 }}>
          <div className="panel-card-header">
            <h3 className="panel-card-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShieldAlert size={20} className="text-error" />
              Failed Authentications (API A07)
            </h3>
          </div>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Requester IP</th>
                  <th>Failures</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {failedLogins.map((f, idx) => (
                  <tr key={idx}>
                    <td>
                      <div style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                        <Key size={14} className="text-outline" />
                        {f.ip}
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--dm-outline)", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {f.user_agent}
                      </div>
                    </td>
                    <td><span style={{ color: "var(--dm-error)", fontWeight: 700 }}>{f.count}</span></td>
                    <td style={{ fontSize: "12px" }}>{f.timestamp}</td>
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
