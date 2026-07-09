"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Users, Trash2, Search } from "lucide-react";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { MediaUploadField } from "@/components/admin/MediaUploadField";
import { sanitizeHtml } from "@/lib/security/sanitize-html";

export default function TeamCMSPage() {
  // Lists
  const [team, setTeam] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Editor modal states
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [bio, setBio] = useState("");
  const [imageId, setImageId] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [status, setStatus] = useState("draft");

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/team");
      if (res.ok) {
        const data = await res.json();
        setTeam(data || []);
        setLoading(false);
        return;
      }
    } catch (e) {}
    setTeam([]);
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
    fetchTeam();
  }, []);

  const handleOpenEditor = (item: any | null) => {
    setSelectedItem(item);
    if (item) {
      setName(item.name);
      setRoleTitle(item.role_title || "");
      setBio(item.bio || "");
      setImageId(item.image_id || "");
      setImagePreview(item.media_assets?.path || "");
      setSortOrder(item.sort_order || 0);
      setStatus(item.status || "draft");
    } else {
      setName("");
      setRoleTitle("");
      setBio("");
      setImageId("");
      setImagePreview("");
      setSortOrder(0);
      setStatus("draft");
    }
    setIsEditorOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        id: selectedItem?.id,
        name,
        role_title: roleTitle,
        bio,
        image_id: imageId,
        sort_order: sortOrder,
        status
      };
      const method = selectedItem ? "PUT" : "POST";
      const res = await fetch("/api/admin/team", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        await fetchTeam();
      }
    } catch (err) {
      console.error("Save error:", err);
    }
    setLoading(false);
    setIsEditorOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this counselor?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/team?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchTeam();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete counselor");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
    setLoading(false);
  };

  const canDelete = currentUser && (currentUser.role === "super_admin" || currentUser.role === "admin");
  const filtered = team.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.role_title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Key Personnel & Counselors</h2>
          <p style={{ color: "var(--dm-outline)", fontSize: "14px" }}>
            Add and manage counseling team members and staff.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenEditor(null)}>
          <Plus size={16} /> Add Counselor
        </button>
      </div>

      <div className="panel-card">
        <div className="filter-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              className="form-input search-input" 
              placeholder="Search by counselor name or role..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Photo</th>
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
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px" }}>Loading team...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px" }}>No team members found.</td>
                </tr>
              ) : filtered.map(t => (
                <tr key={t.id}>
                  <td>
                    {t.media_assets?.path ? (
                      <img src={t.media_assets.path} alt={t.name} style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "var(--dm-surface-container)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
                        {t.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{t.name}</div>
                    {t.bio && <div style={{ fontSize: "12px", color: "var(--dm-outline)", maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} dangerouslySetInnerHTML={{ __html: sanitizeHtml(t.bio) }} />}
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

      {/* Editor Modal */}
      {isEditorOpen && (
        <div className="modal-overlay" onClick={() => setIsEditorOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "500px" }}>
            <div className="modal-header">
              <h3 className="modal-title">
                {selectedItem ? "Edit Counselor" : "Add Counselor"}
              </h3>
              <button className="btn btn-light" style={{ height: "32px", padding: "0 10px" }} onClick={() => setIsEditorOpen(false)}>X</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Staff Name</label>
                  <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className="form-group">
                  <label className="form-label">Role Title</label>
                  <input type="text" className="form-input" placeholder="e.g. Senior Counselor" value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)} required />
                </div>

                <RichTextEditor
                  label="Bio / Summary"
                  value={bio}
                  onChange={setBio}
                  minHeight={130}
                />

                <MediaUploadField
                  label="Staff Photo"
                  folder="team"
                  value={imageId}
                  previewUrl={imagePreview}
                  onUploaded={(asset) => {
                    setImageId(asset.id);
                    setImagePreview(asset.path);
                  }}
                />

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
