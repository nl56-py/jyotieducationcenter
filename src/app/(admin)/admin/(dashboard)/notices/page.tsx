"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Edit2, Megaphone, Plus, Trash2 } from "lucide-react";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

export default function NoticesEventsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);
  const [form, setForm] = useState<any>({
    type: "notice",
    title: "",
    slug: "",
    excerpt: "",
    bodyText: "",
    event_date: "",
    location: "",
    cta_label: "",
    cta_href: "",
    featured: false,
    sort_order: 0,
    status: "draft",
  });

  const loadItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/notices");
      if (res.ok) {
        const data = await res.json();
        setItems(data || []);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn("Failed to load notices:", err);
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
      bodyText: item.body?.html || "",
      event_date: item.event_date ? item.event_date.slice(0, 16) : "",
    } : {
      type: "notice",
      title: "",
      slug: "",
      excerpt: "",
      bodyText: "",
      event_date: "",
      location: "",
      cta_label: "",
      cta_href: "",
      featured: false,
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
    const res = await fetch("/api/admin/notices", {
      method: selected ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Failed to save notice/event");
    } else {
      setEditorOpen(false);
      await loadItems();
    }
    setLoading(false);
  };

  const deleteItem = async (id: string) => {
    if (!window.confirm("Delete this notice/event permanently?")) return;
    setLoading(true);
    const res = await fetch(`/api/admin/notices?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Failed to delete notice/event");
    }
    await loadItems();
    setLoading(false);
  };

  return (
    <div>
      <div className="admin-page-hero">
        <div>
          <span className="admin-kicker">Campaigns</span>
          <h2>Notices, Events & Homepage Popups</h2>
          <p>Create refresh-visible homepage popups, notice banners, and event cards.</p>
        </div>
        <button className="btn btn-primary" onClick={() => openEditor()}>
          <Plus size={16} /> Add Notice/Event
        </button>
      </div>

      <div className="panel-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Event Date</th>
                <th>Featured</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && items.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: "center", padding: 40 }}>Loading notices...</td></tr>
              ) : items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", fontWeight: 700 }}>
                      {item.type === "event" ? <CalendarDays size={16} /> : <Megaphone size={16} />}
                      {item.title}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--dm-outline)" }}>/{item.slug}</div>
                  </td>
                  <td style={{ textTransform: "capitalize" }}>{item.type}</td>
                  <td>{item.event_date ? new Date(item.event_date).toLocaleString() : "N/A"}</td>
                  <td>{item.featured ? "Yes" : "No"}</td>
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
              <h3 className="modal-title">{selected ? "Edit Notice/Event" : "Create Notice/Event"}</h3>
              <button className="btn btn-light" onClick={() => setEditorOpen(false)}>X</button>
            </div>
            <form onSubmit={saveItem}>
              <div className="modal-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div>
                  <div className="form-group">
                    <label className="form-label">Type</label>
                    <select className="form-select" value={form.type} onChange={(event) => updateForm({ type: event.target.value })}>
                      <option value="notice">Notice</option>
                      <option value="event">Event</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Title</label>
                    <input className="form-input" value={form.title} onChange={(event) => {
                      const title = event.target.value;
                      updateForm({ title, slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") });
                    }} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Slug</label>
                    <input className="form-input" value={form.slug} onChange={(event) => updateForm({ slug: event.target.value })} required />
                  </div>
                  <RichTextEditor label="Excerpt" value={form.excerpt || ""} onChange={(value) => updateForm({ excerpt: value })} minHeight={90} />
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={form.status} onChange={(event) => updateForm({ status: event.target.value })}>
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
                <div>
                  <RichTextEditor label="Long Body" value={form.bodyText || ""} onChange={(value) => updateForm({ bodyText: value })} minHeight={150} />
                  <div className="form-group">
                    <label className="form-label">Event Date</label>
                    <input type="datetime-local" className="form-input" value={form.event_date || ""} onChange={(event) => updateForm({ event_date: event.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input className="form-input" value={form.location || ""} onChange={(event) => updateForm({ location: event.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CTA</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <input className="form-input" placeholder="Label" value={form.cta_label || ""} onChange={(event) => updateForm({ cta_label: event.target.value })} />
                      <input className="form-input" placeholder="/path" value={form.cta_href || ""} onChange={(event) => updateForm({ cta_href: event.target.value })} />
                    </div>
                  </div>
                  <label className="btn btn-light" style={{ justifyContent: "flex-start" }}>
                    <input type="checkbox" checked={!!form.featured} onChange={(event) => updateForm({ featured: event.target.checked })} />
                    Show as homepage popup/banner
                  </label>
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
