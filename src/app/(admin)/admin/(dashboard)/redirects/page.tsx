"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, ArrowRightLeft, Search } from "lucide-react";

export default function RedirectsPage() {
  const [redirects, setRedirects] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedRedirect, setSelectedRedirect] = useState<any | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Form states
  const [sourcePath, setSourcePath] = useState("");
  const [targetPath, setTargetPath] = useState("");
  const [statusCode, setStatusCode] = useState(301);
  const [isActive, setIsActive] = useState(true);

  const mockRedirects = [
    { id: "1", source_path: "/old-ielts-class", target_path: "/test-preparation/ielts", status_code: 301, is_active: true },
    { id: "2", source_path: "/apply-australia", target_path: "/destinations/australia", status_code: 302, is_active: true }
  ];

  const fetchRedirects = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/redirects");
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setRedirects(data);
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn("Failed to fetch redirects from API:", e);
    }
    setRedirects(mockRedirects);
    setLoading(false);
  };

  useEffect(() => {
    const loadSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        setCurrentUser(data.user);
      } catch (err) {}
    };
    loadSession();
    fetchRedirects();
  }, []);

  const handleOpenEditor = (red: any | null) => {
    setSelectedRedirect(red);
    if (red) {
      setSourcePath(red.source_path);
      setTargetPath(red.target_path);
      setStatusCode(red.status_code || 301);
      setIsActive(red.is_active !== undefined ? red.is_active : true);
    } else {
      setSourcePath("");
      setTargetPath("");
      setStatusCode(301);
      setIsActive(true);
    }
    setIsEditorOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        id: selectedRedirect?.id,
        source_path: sourcePath,
        target_path: targetPath,
        status_code: statusCode,
        is_active: isActive
      };

      const method = selectedRedirect ? "PUT" : "POST";
      const res = await fetch("/api/admin/redirects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await fetchRedirects();
      }
    } catch (err) {
      console.error("Failed to save redirect:", err);
    }
    setLoading(false);
    setIsEditorOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this redirect mapping?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/redirects?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchRedirects();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete redirect rule");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
    setLoading(false);
  };

  const toggleActiveStatus = async (red: any) => {
    try {
      const res = await fetch("/api/admin/redirects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: red.id,
          is_active: !red.is_active
        })
      });
      if (res.ok) {
        await fetchRedirects();
      }
    } catch (e) {
      console.error("Failed to toggle active status:", e);
    }
  };

  const filtered = redirects.filter(r => 
    r.source_path.toLowerCase().includes(search.toLowerCase()) || 
    r.target_path.toLowerCase().includes(search.toLowerCase())
  );
  
  const canDelete = currentUser && (currentUser.role === "super_admin" || currentUser.role === "admin");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Redirect Management</h2>
          <p style={{ color: "var(--dm-outline)", fontSize: "14px" }}>
            Configure URL redirections to preserve SEO link equity and repair broken 404 links.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenEditor(null)}>
          <Plus size={16} /> Add Redirect Rule
        </button>
      </div>

      <div className="panel-card">
        <div className="filter-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              className="form-input search-input" 
              placeholder="Search by source or target path..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Source URL Path</th>
                <th>Target Redirect Path</th>
                <th>Status Code</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && redirects.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "40px" }}>Loading redirects...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "40px" }}>No redirect rules found.</td>
                </tr>
              ) : (
                filtered.map(r => (
                  <tr key={r.id}>
                    <td><div style={{ fontWeight: 600, color: "var(--dm-error)" }}>{r.source_path}</div></td>
                    <td><div style={{ fontWeight: 600, color: "var(--dm-primary)" }}>{r.target_path}</div></td>
                    <td>
                      <span style={{ padding: "2px 8px", background: "var(--dm-surface-container)", borderRadius: "var(--dm-rounded-full)", fontSize: "12px", fontWeight: 600 }}>
                        {r.status_code}
                      </span>
                    </td>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={r.is_active} 
                        onChange={() => toggleActiveStatus(r)}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button className="btn btn-light" style={{ height: "30px", padding: "0 10px" }} onClick={() => handleOpenEditor(r)}>
                          <Edit2 size={12} /> Edit
                        </button>
                        {canDelete && (
                          <button className="btn btn-danger" style={{ height: "30px", width: "30px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => handleDelete(r.id)}>
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isEditorOpen && (
        <div className="modal-overlay" onClick={() => setIsEditorOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "450px" }}>
            <div className="modal-header">
              <h3 className="modal-title">{selectedRedirect ? "Edit Redirect Rule" : "Add Redirect Rule"}</h3>
              <button className="btn btn-light" style={{ height: "32px", padding: "0 10px" }} onClick={() => setIsEditorOpen(false)}>X</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Source URL Path (from)</label>
                  <input type="text" className="form-input" placeholder="e.g. /old-path" value={sourcePath} onChange={(e) => setSourcePath(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Target Redirect Path (to)</label>
                  <input type="text" className="form-input" placeholder="e.g. /new-destination" value={targetPath} onChange={(e) => setTargetPath(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">HTTP Status Code</label>
                  <select className="form-select" value={statusCode} onChange={(e) => setStatusCode(parseInt(e.target.value))}>
                    <option value={301}>301 Permanent Redirect</option>
                    <option value={302}>302 Temporary Redirect</option>
                  </select>
                </div>
                <div className="form-group" style={{ flexDirection: "row", gap: "10px", alignItems: "center" }}>
                  <input type="checkbox" id="red-active" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                  <label htmlFor="red-active" className="form-label" style={{ marginBottom: 0 }}>Enable this redirect rule immediately</label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" onClick={() => setIsEditorOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Saving..." : "Save Rule"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
