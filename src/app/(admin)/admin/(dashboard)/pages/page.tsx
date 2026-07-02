"use client";

import { useEffect, useMemo, useState } from "react";
import { Edit2, FileStack, Plus, Trash2 } from "lucide-react";

type PageRecord = {
  id: string;
  title: string;
  slug: string;
  page_type: string;
  status: string;
  seo_title?: string | null;
  seo_description?: string | null;
  canonical_path?: string | null;
  page_sections?: SectionRecord[];
};

type SectionRecord = {
  id: string;
  page_id: string;
  section_key: string;
  section_type: string;
  title?: string | null;
  subtitle?: string | null;
  body: Record<string, any>;
  sort_order: number;
  status: string;
};

const fallbackPages: PageRecord[] = [
  {
    id: "home",
    title: "Homepage",
    slug: "home",
    page_type: "landing",
    status: "published",
    seo_title: "EduMark | Education Consultancy in Nepal",
    seo_description: "Study abroad counseling, test preparation, and admissions support.",
    canonical_path: "/",
    page_sections: [
      {
        id: "home-hero",
        page_id: "home",
        section_key: "hero",
        section_type: "hero",
        title: "Study abroad with expert guidance",
        subtitle: "Counseling, test prep, and admission support from EduMark.",
        body: { cta: "Book Free Consultation" },
        sort_order: 1,
        status: "published",
      },
    ],
  },
  {
    id: "about",
    title: "About",
    slug: "about",
    page_type: "standard",
    status: "published",
    seo_title: "About EduMark",
    seo_description: "Meet EduMark's counselors and education support team.",
    canonical_path: "/about",
    page_sections: [],
  },
];

function emptyPage(): Partial<PageRecord> {
  return {
    title: "",
    slug: "",
    page_type: "standard",
    status: "draft",
    seo_title: "",
    seo_description: "",
    canonical_path: "",
  };
}

function emptySection(pageId: string): Partial<SectionRecord> {
  return {
    page_id: pageId,
    section_key: "",
    section_type: "content",
    title: "",
    subtitle: "",
    body: {},
    sort_order: 0,
    status: "draft",
  };
}

export default function PublicPagesAdminPage() {
  const [pages, setPages] = useState<PageRecord[]>([]);
  const [selectedPageId, setSelectedPageId] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageEditorOpen, setPageEditorOpen] = useState(false);
  const [sectionEditorOpen, setSectionEditorOpen] = useState(false);
  const [pageForm, setPageForm] = useState<Partial<PageRecord>>(emptyPage());
  const [sectionForm, setSectionForm] = useState<Partial<SectionRecord>>(emptySection(""));
  const [sectionBody, setSectionBody] = useState("{}");

  const selectedPage = useMemo(
    () => pages.find((page) => page.id === selectedPageId) || pages[0],
    [pages, selectedPageId]
  );

  const loadPages = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/pages");
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setPages(data);
          setSelectedPageId((current) => current || data[0].id);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn("Failed to load public pages:", err);
    }
    setPages(fallbackPages);
    setSelectedPageId((current) => current || fallbackPages[0].id);
    setLoading(false);
  };

  useEffect(() => {
    loadPages();
  }, []);

  const openPageEditor = (page?: PageRecord) => {
    setPageForm(page ? { ...page } : emptyPage());
    setPageEditorOpen(true);
  };

  const openSectionEditor = (section?: SectionRecord) => {
    const draft = section ? { ...section } : emptySection(selectedPage?.id || "");
    setSectionForm(draft);
    setSectionBody(JSON.stringify(draft.body || {}, null, 2));
    setSectionEditorOpen(true);
  };

  const savePage = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/admin/pages", {
        method: pageForm.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: pageForm }),
      });
      if (!response.ok) {
        const data = await response.json();
        alert(data.error || "Unable to save page");
      } else {
        setPageEditorOpen(false);
        await loadPages();
      }
    } catch (err) {
      console.error("Save page failed:", err);
      alert("Unable to save page");
    }
    setLoading(false);
  };

  const saveSection = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      JSON.parse(sectionBody);
      const response = await fetch("/api/admin/pages", {
        method: sectionForm.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "section",
          section: { ...sectionForm, body: sectionBody, page_id: sectionForm.page_id || selectedPage?.id },
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        alert(data.error || "Unable to save section");
      } else {
        setSectionEditorOpen(false);
        await loadPages();
      }
    } catch (err) {
      console.error("Save section failed:", err);
      alert("Section body must be valid JSON.");
    }
    setLoading(false);
  };

  const deleteItem = async (id: string, mode?: "section") => {
    if (!window.confirm("Delete this item permanently?")) return;
    setLoading(true);
    const suffix = mode ? `?mode=${mode}&id=${id}` : `?id=${id}`;
    const response = await fetch(`/api/admin/pages${suffix}`, { method: "DELETE" });
    if (!response.ok) {
      const data = await response.json();
      alert(data.error || "Unable to delete item");
    }
    await loadPages();
    setLoading(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", gap: "16px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Public Page Content</h2>
          <p style={{ color: "var(--dm-outline)", fontSize: "14px" }}>
            Manage page records, SEO fields, publishing status, and reusable sections for public pages.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => openPageEditor()}>
          <Plus size={16} /> Add Page
        </button>
      </div>

      <div className="dashboard-grid">
        <div className="panel-card" style={{ marginBottom: 0 }}>
          <div className="panel-card-header">
            <h3 className="panel-card-title">Pages</h3>
          </div>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Sections</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && pages.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center" }}>Loading pages...</td>
                  </tr>
                ) : (
                  pages.map((page) => (
                    <tr key={page.id} onClick={() => setSelectedPageId(page.id)} style={{ cursor: "pointer" }}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700 }}>
                          <FileStack size={16} /> {page.title}
                        </div>
                        <div style={{ fontSize: "12px", color: "var(--dm-outline)" }}>{page.canonical_path || `/${page.slug}`}</div>
                      </td>
                      <td>{page.page_type}</td>
                      <td><span className={`status-badge content-${page.status}`}>{page.status}</span></td>
                      <td>{page.page_sections?.length || 0}</td>
                      <td>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button className="btn btn-light" style={{ height: "30px", padding: "0 10px" }} onClick={(event) => { event.stopPropagation(); openPageEditor(page); }}>
                            <Edit2 size={12} /> Edit
                          </button>
                          <button className="btn btn-danger" style={{ height: "30px", width: "30px", padding: 0 }} onClick={(event) => { event.stopPropagation(); deleteItem(page.id); }}>
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel-card" style={{ marginBottom: 0 }}>
          <div className="panel-card-header">
            <h3 className="panel-card-title">Selected Page</h3>
          </div>
          <div style={{ padding: "24px" }}>
            <h4 style={{ margin: 0, fontSize: "18px" }}>{selectedPage?.title || "No page selected"}</h4>
            <p style={{ margin: "8px 0 16px", color: "var(--dm-outline)", fontSize: "13px" }}>
              {selectedPage?.seo_description || "No SEO description yet."}
            </p>
            <button className="btn btn-secondary" style={{ width: "100%" }} disabled={!selectedPage} onClick={() => openSectionEditor()}>
              <Plus size={16} /> Add Section
            </button>
          </div>
        </div>
      </div>

      <div className="panel-card" style={{ marginTop: "24px" }}>
        <div className="panel-card-header">
          <h3 className="panel-card-title">Page Sections</h3>
        </div>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Section</th>
                <th>Type</th>
                <th>Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(selectedPage?.page_sections || []).length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "32px" }}>No sections registered for this page.</td>
                </tr>
              ) : (
                selectedPage?.page_sections?.map((section) => (
                  <tr key={section.id}>
                    <td>
                      <div style={{ fontWeight: 700 }}>{section.title || section.section_key}</div>
                      <div style={{ fontSize: "12px", color: "var(--dm-outline)" }}>{section.subtitle || section.section_key}</div>
                    </td>
                    <td>{section.section_type}</td>
                    <td>{section.sort_order}</td>
                    <td><span className={`status-badge content-${section.status}`}>{section.status}</span></td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button className="btn btn-light" style={{ height: "30px", padding: "0 10px" }} onClick={() => openSectionEditor(section)}>
                          <Edit2 size={12} /> Edit
                        </button>
                        <button className="btn btn-danger" style={{ height: "30px", width: "30px", padding: 0 }} onClick={() => deleteItem(section.id, "section")}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pageEditorOpen && (
        <div className="modal-overlay" onClick={() => setPageEditorOpen(false)}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{pageForm.id ? "Edit Page" : "Add Page"}</h3>
              <button className="btn btn-light" onClick={() => setPageEditorOpen(false)}>X</button>
            </div>
            <form onSubmit={savePage}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input className="form-input" value={pageForm.title || ""} onChange={(event) => setPageForm({ ...pageForm, title: event.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Slug</label>
                  <input className="form-input" value={pageForm.slug || ""} onChange={(event) => setPageForm({ ...pageForm, slug: event.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Page Type</label>
                  <input className="form-input" value={pageForm.page_type || ""} onChange={(event) => setPageForm({ ...pageForm, page_type: event.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">SEO Title</label>
                  <input className="form-input" value={pageForm.seo_title || ""} onChange={(event) => setPageForm({ ...pageForm, seo_title: event.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">SEO Description</label>
                  <textarea className="form-textarea" value={pageForm.seo_description || ""} onChange={(event) => setPageForm({ ...pageForm, seo_description: event.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Canonical Path</label>
                  <input className="form-input" value={pageForm.canonical_path || ""} onChange={(event) => setPageForm({ ...pageForm, canonical_path: event.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={pageForm.status || "draft"} onChange={(event) => setPageForm({ ...pageForm, status: event.target.value })}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" onClick={() => setPageEditorOpen(false)}>Cancel</button>
                <button className="btn btn-primary" disabled={loading}>{loading ? "Saving..." : "Save Page"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {sectionEditorOpen && (
        <div className="modal-overlay" onClick={() => setSectionEditorOpen(false)}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{sectionForm.id ? "Edit Section" : "Add Section"}</h3>
              <button className="btn btn-light" onClick={() => setSectionEditorOpen(false)}>X</button>
            </div>
            <form onSubmit={saveSection}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Section Key</label>
                  <input className="form-input" value={sectionForm.section_key || ""} onChange={(event) => setSectionForm({ ...sectionForm, section_key: event.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Section Type</label>
                  <input className="form-input" value={sectionForm.section_type || ""} onChange={(event) => setSectionForm({ ...sectionForm, section_type: event.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input className="form-input" value={sectionForm.title || ""} onChange={(event) => setSectionForm({ ...sectionForm, title: event.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Subtitle</label>
                  <input className="form-input" value={sectionForm.subtitle || ""} onChange={(event) => setSectionForm({ ...sectionForm, subtitle: event.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Body JSON</label>
                  <textarea className="form-textarea" style={{ minHeight: "160px", fontFamily: "monospace" }} value={sectionBody} onChange={(event) => setSectionBody(event.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Sort Order</label>
                  <input className="form-input" type="number" value={sectionForm.sort_order || 0} onChange={(event) => setSectionForm({ ...sectionForm, sort_order: Number(event.target.value) })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={sectionForm.status || "draft"} onChange={(event) => setSectionForm({ ...sectionForm, status: event.target.value })}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" onClick={() => setSectionEditorOpen(false)}>Cancel</button>
                <button className="btn btn-primary" disabled={loading}>{loading ? "Saving..." : "Save Section"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
