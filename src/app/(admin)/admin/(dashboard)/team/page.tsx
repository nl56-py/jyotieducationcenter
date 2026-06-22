"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Users, MessageSquare, Trash2, Search } from "lucide-react";

export default function TeamTestimonialsPage() {
  const [activeTab, setActiveTab] = useState<"team" | "testimonials" | null>(null);

  // Lists
  const [team, setTeam] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Editor modal states
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // Form states
  const [name, setName] = useState(""); // used for staff name and student name
  const [roleTitle, setRoleTitle] = useState(""); // used for staff role_title
  const [destination, setDestination] = useState(""); // used for testimonial destination
  const [bioQuote, setBioQuote] = useState(""); // used for staff bio or testimonial quote
  const [sortOrder, setSortOrder] = useState(0);
  const [status, setStatus] = useState("draft");

  const mockTeam = [
    { id: "1", name: "EduMark CEO", role_title: "Managing Director", status: "published", bio: "Leading EduMark forward." },
    { id: "2", name: "Binod Thapa", role_title: "Senior Counselor", status: "published", bio: "Counseling expert." }
  ];

  const mockTestimonials = [
    { id: "1", student_name: "Ram Prasad", destination: "Australia", quote: "EduMark made my visa process so smooth!", status: "published" }
  ];

  const fetchTeam = async () => {
    try {
      const res = await fetch("/api/admin/team");
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setTeam(data);
          return;
        }
      }
    } catch (e) {}
    setTeam(mockTeam);
  };

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setTestimonials(data);
          return;
        }
      }
    } catch (e) {}
    setTestimonials(mockTestimonials);
  };

  const loadAll = async () => {
    setLoading(true);
    await Promise.all([fetchTeam(), fetchTestimonials()]);
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
    loadAll();
    setActiveTab("team");
  }, []);

  const handleOpenEditor = (item: any | null) => {
    setSelectedItem(item);
    if (item) {
      setName(activeTab === "team" ? item.name : item.student_name);
      setRoleTitle(item.role_title || "");
      setDestination(item.destination || "");
      setBioQuote(activeTab === "team" ? (item.bio || "") : (item.quote || ""));
      setSortOrder(item.sort_order || 0);
      setStatus(item.status || "draft");
    } else {
      setName("");
      setRoleTitle("");
      setDestination("");
      setBioQuote("");
      setSortOrder(0);
      setStatus("draft");
    }
    setIsEditorOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (activeTab === "team") {
        const payload = {
          id: selectedItem?.id,
          name,
          role_title: roleTitle,
          bio: bioQuote,
          sort_order: sortOrder,
          status
        };
        const method = selectedItem ? "PUT" : "POST";
        const res = await fetch("/api/admin/team", {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (res.ok) await fetchTeam();
      } else {
        const payload = {
          id: selectedItem?.id,
          student_name: name,
          destination,
          quote: bioQuote,
          sort_order: sortOrder,
          status
        };
        const method = selectedItem ? "PUT" : "POST";
        const res = await fetch("/api/admin/testimonials", {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (res.ok) await fetchTestimonials();
      }
    } catch (err) {
      console.error("Save error:", err);
    }
    setLoading(false);
    setIsEditorOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this item?")) return;
    setLoading(true);
    try {
      const url = activeTab === "team" ? `/api/admin/team?id=${id}` : `/api/admin/testimonials?id=${id}`;
      const res = await fetch(url, { method: "DELETE" });
      if (res.ok) {
        if (activeTab === "team") await fetchTeam();
        else await fetchTestimonials();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete item");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
    setLoading(false);
  };

  const canDelete = currentUser && (currentUser.role === "super_admin" || currentUser.role === "admin");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Team & Testimonials Manager</h2>
          <p style={{ color: "var(--dm-outline)", fontSize: "14px" }}>
            Add counseling team members and publish verified student success testimonies.
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", borderBottom: "1px solid var(--dm-surface-container)", paddingBottom: "8px" }}>
        <button className={`btn ${activeTab === "team" ? "btn-primary" : "btn-light"}`} onClick={() => setActiveTab("team")}>
          <Users size={16} /> Counselors & Staff
        </button>
        <button className={`btn ${activeTab === "testimonials" ? "btn-primary" : "btn-light"}`} onClick={() => setActiveTab("testimonials")}>
          <MessageSquare size={16} /> Student Testimonials
        </button>
      </div>

      {activeTab === "team" ? (
        <div className="panel-card">
          <div className="panel-card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 className="panel-card-title">Counseling Staff Members</h3>
            <button className="btn btn-light" style={{ height: "32px", fontSize: "12px" }} onClick={() => handleOpenEditor(null)}>
              <Plus size={14} /> Add Counselor
            </button>
          </div>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Staff Name</th>
                  <th>Role Title</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && team.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "40px" }}>Loading team...</td>
                  </tr>
                ) : team.map(t => (
                  <tr key={t.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{t.name}</div>
                      {t.bio && <div style={{ fontSize: "12px", color: "var(--dm-outline)" }}>{t.bio}</div>}
                    </td>
                    <td>{t.role_title}</td>
                    <td>{t.sort_order || 0}</td>
                    <td><span className={`status-badge content-${t.status}`}>{t.status}</span></td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button className="btn btn-light" style={{ height: "30px", padding: "0 10px" }} onClick={() => handleOpenEditor(t)}>
                          <Edit2 size={12} /> Edit
                        </button>
                        {canDelete && (
                          <button className="btn btn-danger" style={{ height: "30px", width: "30px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => handleDelete(t.id)}>
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="panel-card">
          <div className="panel-card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 className="panel-card-title">Student Testimonials</h3>
            <button className="btn btn-light" style={{ height: "32px", fontSize: "12px" }} onClick={() => handleOpenEditor(null)}>
              <Plus size={14} /> Add Testimonial
            </button>
          </div>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Destination</th>
                  <th>Student Quote</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && testimonials.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", padding: "40px" }}>Loading testimonials...</td>
                  </tr>
                ) : testimonials.map(test => (
                  <tr key={test.id}>
                    <td><div style={{ fontWeight: 600 }}>{test.student_name}</div></td>
                    <td>{test.destination || "General"}</td>
                    <td style={{ fontStyle: "italic", maxWidth: "300px" }}>"{test.quote}"</td>
                    <td>{test.sort_order || 0}</td>
                    <td><span className={`status-badge content-${test.status}`}>{test.status}</span></td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button className="btn btn-light" style={{ height: "30px", padding: "0 10px" }} onClick={() => handleOpenEditor(test)}>
                          <Edit2 size={12} /> Edit
                        </button>
                        {canDelete && (
                          <button className="btn btn-danger" style={{ height: "30px", width: "30px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => handleDelete(test.id)}>
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Editor Modal */}
      {isEditorOpen && (
        <div className="modal-overlay" onClick={() => setIsEditorOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "500px" }}>
            <div className="modal-header">
              <h3 className="modal-title">
                {selectedItem ? `Edit ${activeTab === "team" ? "Counselor" : "Testimonial"}` : `Add ${activeTab === "team" ? "Counselor" : "Testimonial"}`}
              </h3>
              <button className="btn btn-light" style={{ height: "32px", padding: "0 10px" }} onClick={() => setIsEditorOpen(false)}>X</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">{activeTab === "team" ? "Staff Name" : "Student Name"}</label>
                  <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                {activeTab === "team" ? (
                  <div className="form-group">
                    <label className="form-label">Role Title</label>
                    <input type="text" className="form-input" placeholder="e.g. Senior Counselor" value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)} required />
                  </div>
                ) : (
                  <div className="form-group">
                    <label className="form-label">Destination Country</label>
                    <input type="text" className="form-input" placeholder="e.g. Australia" value={destination} onChange={(e) => setDestination(e.target.value)} />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">{activeTab === "team" ? "Bio / Summary" : "Quote Text"}</label>
                  <textarea className="form-textarea" style={{ minHeight: "100px" }} value={bioQuote} onChange={(e) => setBioQuote(e.target.value)} required />
                </div>

                <div className="form-group">
                  <label className="form-label">Sort Order</label>
                  <input type="number" className="form-input" value={sortOrder} onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)} />
                </div>

                <div className="form-group">
                  <label className="form-label">Publication Status</label>
                  <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" onClick={() => setIsEditorOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
