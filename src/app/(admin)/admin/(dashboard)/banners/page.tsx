"use client";

import { useEffect, useState } from "react";
import { Bell, Edit2, Plus, Trash2, Calendar } from "lucide-react";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { MediaUploadField } from "@/components/admin/MediaUploadField";

export default function BannersPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);
  const [form, setForm] = useState<any>({
    title: "",
    subtitle: "",
    bodyText: "",
    cta_label: "",
    cta_href: "",
    image_id: "",
    image_path: "",
    display_mode: "modal",
    starts_at: "",
    ends_at: "",
    sort_order: 0,
    status: "draft",
  });

  const loadItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/banners");
      if (res.ok) {
        const data = await res.json();
        setItems(data || []);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn("Failed to load banners:", err);
    }
    setItems([]);
    setLoading(false);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const openEditor = (item?: any) => {
    setSelected(item || null);
    setForm(item ? {
      ...item,
      bodyText: item.body || "",
      image_path: item.media_assets?.path || "",
      starts_at: item.starts_at ? item.starts_at.slice(0, 16) : "",
      ends_at: item.ends_at ? item.ends_at.slice(0, 16) : "",
    } : {
      title: "",
      subtitle: "",
      bodyText: "",
      cta_label: "",
      cta_href: "",
      image_id: "",
      image_path: "",
      display_mode: "modal",
      starts_at: "",
      ends_at: "",
      sort_order: 0,
      status: "draft",
    });
    setEditorOpen(true);
  };

  const updateForm = (patch: Record<string, any>) => setForm((current: any) => ({ ...current, ...patch }));

  const saveItem = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const payload = { ...form, id: selected?.id };
    const res = await fetch("/api/admin/banners", {
      method: selected ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Failed to save banner");
    } else {
      setEditorOpen(false);
      await loadItems();
    }
    setLoading(false);
  };

  const deleteItem = async (id: string) => {
    if (!window.confirm("Delete this banner permanently?")) return;
    setLoading(true);
    const res = await fetch(`/api/admin/banners?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Failed to delete banner");
    }
    await loadItems();
    setLoading(false);
  };

  return (
    <div>
      <div className="admin-page-hero">
        <div>
          <span className="admin-kicker">Homepage Controls</span>
          <h2>Homepage Popups & Announcement Banners</h2>
          <p>Manage pop-up modals and header announcement banners shown on the home page.</p>
        </div>
        <button className="btn btn-primary" onClick={() => openEditor()}>
          <Plus size={16} /> Add Popup/Banner
        </button>
      </div>

      <div className="panel-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title / Subtitle</th>
                <th>Display Mode</th>
                <th>Schedule</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && items.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: "center", padding: 40 }}>Loading banners...</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: "center", padding: 40 }}>No popups or banners created. Click "Add Popup/Banner" to create one.</td></tr>
              ) : items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", fontWeight: 700 }}>
                      <Bell size={16} />
                      {item.title}
                    </div>
                    {item.subtitle && <div style={{ fontSize: 12, color: "var(--dm-outline)" }}>{item.subtitle}</div>}
                  </td>
                  <td style={{ textTransform: "capitalize" }}>{item.display_mode}</td>
                  <td>
                    <div style={{ fontSize: 12, display: "flex", flexDirection: "column" }}>
                      <span><strong>Starts:</strong> {item.starts_at ? new Date(item.starts_at).toLocaleString() : "Immediately"}</span>
                      <span><strong>Ends:</strong> {item.ends_at ? new Date(item.ends_at).toLocaleString() : "Never"}</span>
                    </div>
                  </td>
                  <td><span className={`status-badge content-${item.status}`}>{item.status}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn btn-light" style={{ height: 30, padding: "0 10px" }} onClick={() => openEditor(item)}>
                        <Edit2 size={12} /> Edit
                      </button>
                      <button className="btn btn-danger" style={{ height: 30, width: 30, padding: 0 }} onClick={() => deleteItem(item.id)}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editorOpen && (
        <div className="modal-overlay" onClick={() => setEditorOpen(false)}>
          <div className="modal-content" style={{ maxWidth: 820 }} onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{selected ? "Edit Homepage Popup/Banner" : "Create Homepage Popup/Banner"}</h3>
              <button className="btn btn-light" onClick={() => setEditorOpen(false)}>X</button>
            </div>
            <form onSubmit={saveItem}>
              <div className="modal-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div>
                  <div className="form-group">
                    <label className="form-label">Display Mode</label>
                    <select className="form-select" value={form.display_mode} onChange={(event) => updateForm({ display_mode: event.target.value })}>
                      <option value="modal">Modal Popup Box (Middle Screen)</option>
                      <option value="banner">Header Announcement Strip (Top Header)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Title</label>
                    <input className="form-input" value={form.title} onChange={(event) => updateForm({ title: event.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subtitle / Description Excerpt</label>
                    <input className="form-input" value={form.subtitle || ""} onChange={(event) => updateForm({ subtitle: event.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={form.status} onChange={(event) => updateForm({ status: event.target.value })}>
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">CTA Label</label>
                    <input className="form-input" placeholder="e.g. Register Now" value={form.cta_label || ""} onChange={(event) => updateForm({ cta_label: event.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CTA Link URL</label>
                    <input className="form-input" placeholder="e.g. /book-free-consultation" value={form.cta_href || ""} onChange={(event) => updateForm({ cta_href: event.target.value })} />
                  </div>
                </div>
                <div>
                  <RichTextEditor label="Long Body Message (for Modals)" value={form.bodyText || ""} onChange={(value) => updateForm({ bodyText: value })} minHeight={120} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div className="form-group">
                      <label className="form-label">Starts At</label>
                      <input type="datetime-local" className="form-input" value={form.starts_at || ""} onChange={(event) => updateForm({ starts_at: event.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Ends At</label>
                      <input type="datetime-local" className="form-input" value={form.ends_at || ""} onChange={(event) => updateForm({ ends_at: event.target.value })} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Sort Order</label>
                    <input type="number" className="form-input" value={form.sort_order} onChange={(event) => updateForm({ sort_order: Number(event.target.value) })} />
                  </div>
                  <div style={{ borderTop: "1px solid var(--dm-surface-container)", paddingTop: "12px", marginTop: "12px" }}>
                    <MediaUploadField
                      label="Upload or Link Image Icon"
                      folder="banners"
                      value={form.image_id || ""}
                      previewUrl={form.image_path || ""}
                      onUploaded={(asset) => {
                        updateForm({ image_id: asset.id, image_path: asset.path });
                      }}
                    />
                    {form.image_path && (
                      <button
                        type="button"
                        className="btn btn-light"
                        style={{ marginTop: "8px", width: "100%", color: "var(--dm-error)" }}
                        onClick={() => {
                          updateForm({ image_id: null, image_path: "" });
                        }}
                      >
                        Remove Image
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" onClick={() => setEditorOpen(false)}>Cancel</button>
                <button className="btn btn-primary" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
