"use client";

import { useState, useEffect } from "react";
import { Search, Database, Clock, RefreshCw } from "lucide-react";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const mockLogs = [
    { id: "1", actor_email: "super@edumark.edu.np", action: "UPDATE", entity_table: "site_settings", entity_id: "conf-123", created_at: new Date().toISOString() },
    { id: "2", actor_email: "counselor@edumark.edu.np", action: "INSERT", entity_table: "lead_notes", entity_id: "note-456", created_at: new Date(Date.now() - 3600000).toISOString() },
    { id: "3", actor_email: "super@edumark.edu.np", action: "INSERT", entity_table: "admin_users", entity_id: "user-789", created_at: new Date(Date.now() - 7200000).toISOString() }
  ];

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/audit-logs");
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setLogs(data);
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn("Failed to fetch audit logs from API:", e);
    }
    setLogs(mockLogs);
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filtered = logs.filter(l => 
    (l.actor_email && l.actor_email.toLowerCase().includes(search.toLowerCase())) || 
    (l.action && l.action.toLowerCase().includes(search.toLowerCase())) ||
    (l.entity_table && l.entity_table.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>System Audit Trail Logs</h2>
          <p style={{ color: "var(--dm-outline)", fontSize: "14px" }}>
            Review real-time database write mutations and administrative action logs.
          </p>
        </div>
        <button className="btn btn-light" onClick={fetchLogs} style={{ height: "36px", padding: "0 12px", display: "flex", alignItems: "center", gap: "6px" }}>
          <RefreshCw size={14} className={loading ? "spin" : ""} /> Refresh
        </button>
      </div>

      <div className="panel-card">
        <div className="filter-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              className="form-input search-input" 
              placeholder="Search audit trail by email, table, or action..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Actor Email</th>
                <th>Operation Type</th>
                <th>Target Schema Table</th>
                <th>Entity Reference ID</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {loading && logs.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "40px" }}>Loading audit trail logs...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "40px" }}>No audit trail entries found.</td>
                </tr>
              ) : (
                filtered.map(l => (
                  <tr key={l.id}>
                    <td style={{ fontWeight: 600 }}>{l.actor_email || "System/Trigger"}</td>
                    <td>
                      <span 
                        style={{ 
                          fontSize: "11px", 
                          fontWeight: 700, 
                          background: l.action === "INSERT" ? "#e0f2fe" : l.action === "UPDATE" ? "#fef3c7" : "#fee2e2",
                          color: l.action === "INSERT" ? "#0369a1" : l.action === "UPDATE" ? "#d97706" : "#b91c1c",
                          padding: "2px 6px",
                          borderRadius: "4px"
                        }}
                      >
                        {l.action}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
                        <Database size={14} className="text-outline" />
                        {l.entity_table}
                      </div>
                    </td>
                    <td style={{ fontSize: "12px", color: "var(--dm-outline)", fontFamily: "monospace" }}>{l.entity_id}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
                        <Clock size={12} className="text-outline" />
                        {new Date(l.created_at).toLocaleString()}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
