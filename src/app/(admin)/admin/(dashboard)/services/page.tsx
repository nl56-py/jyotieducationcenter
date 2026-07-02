"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Bookmark, Award, Layers, Trash2 } from "lucide-react";

export default function ServicesPrepPage() {
  const [activeTab, setActiveTab] = useState<"services" | "testprep" | "entrance" | null>(null);

  // Lists
  const [services, setServices] = useState<any[]>([]);
  const [testPreps, setTestPreps] = useState<any[]>([]);
  const [entranceProgs, setEntranceProgs] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Editor states
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // General fields
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("draft");

  // Service specific fields
  const [sortOrder, setSortOrder] = useState(0);

  // Testprep specific fields
  const [testType, setTestType] = useState("language");
  const [duration, setDuration] = useState("");
  const [cost, setCost] = useState("");
  const [features, setFeatures] = useState("");

  const mockServices = [
    { id: "1", name: "One-on-One Career Counseling", slug: "one-on-one-counseling", summary: "Personalized counseling session to map out your academic potential.", sort_order: 1, status: "published" },
    { id: "2", name: "University & Course Selection", slug: "university-course-selection", summary: "Help in finding the university matching your budget and profile.", sort_order: 2, status: "published" }
  ];

  const mockTestPreps = [
    { id: "1", name: "IELTS Academic", slug: "ielts", summary: "International English Language Testing System prep.", test_type: "language", format: { duration: "6 weeks", cost: "Rs. 8,000" }, features: ["Interactive Mock Tests"], status: "published" }
  ];

  const mockEntrance = [
    { id: "1", name: "CEE Preparation", slug: "cee", summary: "Medical entrance exam prep.", offer: { duration: "12 weeks", cost: "Rs. 18,000" }, features: ["Daily MCQs"], status: "published" }
  ];

  // Fetch functions
  const fetchServices = async () => {
    try {
      const response = await fetch("/api/admin/services");
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setServices(data);
          return;
        }
      }
    } catch (e) {}
    setServices(mockServices);
  };

  const fetchTestPreps = async () => {
    try {
      const response = await fetch("/api/admin/testprep");
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setTestPreps(data);
          return;
        }
      }
    } catch (e) {}
    setTestPreps(mockTestPreps);
  };

  const fetchEntrance = async () => {
    try {
      const response = await fetch("/api/admin/entrance");
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setEntranceProgs(data);
          return;
        }
      }
    } catch (e) {}
    setEntranceProgs(mockEntrance);
  };

  const loadAll = async () => {
    setLoading(true);
    await Promise.all([fetchServices(), fetchTestPreps(), fetchEntrance()]);
    setLoading(false);
  };

  useEffect(() => {
    // Check session
    const loadSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        setCurrentUser(data.user);
      } catch (err) {}
    };
    loadSession();
    loadAll();
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    setActiveTab(tab === "testprep" || tab === "entrance" ? tab : "services");
  }, []);

  const handleOpenEditor = (item: any | null) => {
    setSelectedItem(item);
    if (item) {
      setName(item.name);
      setSlug(item.slug);
      setSummary(item.summary || "");
      setStatus(item.status || "draft");
      
      if (activeTab === "services") {
        setSortOrder(item.sort_order || 0);
      } else if (activeTab === "testprep") {
        setTestType(item.test_type || "language");
        setDuration(item.format?.duration || "");
        setCost(item.format?.cost || "");
        setFeatures((item.features || []).join(", "));
      } else if (activeTab === "entrance") {
        setDuration(item.offer?.duration || "");
        setCost(item.offer?.cost || "");
        setFeatures((item.features || []).join(", "));
      }
    } else {
      setName("");
      setSlug("");
      setSummary("");
      setStatus("draft");
      setSortOrder(0);
      setTestType("language");
      setDuration("");
      setCost("");
      setFeatures("");
    }
    setIsEditorOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const featureArray = features.split(",").map(f => f.trim()).filter(Boolean);

    try {
      if (activeTab === "services") {
        const payload = {
          id: selectedItem?.id,
          name,
          slug,
          summary,
          sort_order: sortOrder,
          status
        };

        const method = selectedItem ? "PUT" : "POST";
        const res = await fetch("/api/admin/services", {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) await fetchServices();
      } else if (activeTab === "testprep") {
        const payload = {
          id: selectedItem?.id,
          name,
          slug,
          summary,
          test_type: testType,
          format: { duration, cost },
          features: featureArray,
          status
        };

        const method = selectedItem ? "PUT" : "POST";
        const res = await fetch("/api/admin/testprep", {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) await fetchTestPreps();
      } else if (activeTab === "entrance") {
        const payload = {
          id: selectedItem?.id,
          name,
          slug,
          summary,
          offer: { duration, cost },
          features: featureArray,
          status
        };

        const method = selectedItem ? "PUT" : "POST";
        const res = await fetch("/api/admin/entrance", {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) await fetchEntrance();
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
      let url = "";
      if (activeTab === "services") url = `/api/admin/services?id=${id}`;
      else if (activeTab === "testprep") url = `/api/admin/testprep?id=${id}`;
      else if (activeTab === "entrance") url = `/api/admin/entrance?id=${id}`;

      const res = await fetch(url, { method: "DELETE" });
      if (res.ok) {
        if (activeTab === "services") await fetchServices();
        else if (activeTab === "testprep") await fetchTestPreps();
        else if (activeTab === "entrance") await fetchEntrance();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete item");
      }
    } catch (e) {
      console.error("Delete error:", e);
    }
    setLoading(false);
  };

  const canDelete = currentUser && (currentUser.role === "super_admin" || currentUser.role === "admin");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Academic Services & Prep</h2>
          <p style={{ color: "var(--dm-outline)", fontSize: "14px" }}>
            Configure marketing pages for counseling services, language tests, and entrance preparation programs.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div 
        style={{ 
          display: "flex", 
          gap: "8px", 
          marginBottom: "24px", 
          borderBottom: "1px solid var(--dm-surface-container)",
          paddingBottom: "8px"
        }}
      >
        <button 
          className={`btn ${activeTab === "services" ? "btn-primary" : "btn-light"}`}
          onClick={() => setActiveTab("services")}
        >
          <Layers size={16} /> Counseling Services
        </button>
        <button 
          className={`btn ${activeTab === "testprep" ? "btn-primary" : "btn-light"}`}
          onClick={() => setActiveTab("testprep")}
        >
          <Bookmark size={16} /> Test Preparation
        </button>
        <button 
          className={`btn ${activeTab === "entrance" ? "btn-primary" : "btn-light"}`}
          onClick={() => setActiveTab("entrance")}
        >
          <Award size={16} /> Entrance Programs
        </button>
      </div>

      {/* Counseling Services */}
      {activeTab === "services" && (
        <div className="panel-card">
          <div className="panel-card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 className="panel-card-title">Consultancy Counseling Services</h3>
            <button className="btn btn-light" style={{ height: "32px", fontSize: "12px" }} onClick={() => handleOpenEditor(null)}>
              <Plus size={14} /> Add Service
            </button>
          </div>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Summary Details</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map(s => (
                  <tr key={s.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{s.name}</div>
                      <div style={{ fontSize: "12px", color: "var(--dm-outline)" }}>/{s.slug}</div>
                    </td>
                    <td>{s.summary || "No summary"}</td>
                    <td>{s.sort_order}</td>
                    <td><span className={`status-badge content-${s.status}`}>{s.status}</span></td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button className="btn btn-light" style={{ height: "30px", padding: "0 10px" }} onClick={() => handleOpenEditor(s)}>
                          <Edit2 size={12} /> Edit
                        </button>
                        {canDelete && (
                          <button className="btn btn-danger" style={{ height: "30px", width: "30px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => handleDelete(s.id)}>
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

      {/* Test Prep */}
      {activeTab === "testprep" && (
        <div className="panel-card">
          <div className="panel-card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 className="panel-card-title">Language Test Preparations (IELTS, PTE, etc.)</h3>
            <button className="btn btn-light" style={{ height: "32px", fontSize: "12px" }} onClick={() => handleOpenEditor(null)}>
              <Plus size={14} /> Add Test Prep
            </button>
          </div>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Fee Cost</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {testPreps.map(tp => (
                  <tr key={tp.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{tp.name}</div>
                      <div style={{ fontSize: "12px", color: "var(--dm-outline)" }}>/{tp.slug}</div>
                    </td>
                    <td style={{ textTransform: "capitalize" }}>{tp.test_type || "language"}</td>
                    <td>{tp.format?.duration || "N/A"}</td>
                    <td>{tp.format?.cost || "N/A"}</td>
                    <td><span className={`status-badge content-${tp.status}`}>{tp.status}</span></td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button className="btn btn-light" style={{ height: "30px", padding: "0 10px" }} onClick={() => handleOpenEditor(tp)}>
                          <Edit2 size={12} /> Edit
                        </button>
                        {canDelete && (
                          <button className="btn btn-danger" style={{ height: "30px", width: "30px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => handleDelete(tp.id)}>
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

      {/* Entrance Prep */}
      {activeTab === "entrance" && (
        <div className="panel-card">
          <div className="panel-card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 className="panel-card-title">Entrance Exams Preparation (CEE, CMAT, etc.)</h3>
            <button className="btn btn-light" style={{ height: "32px", fontSize: "12px" }} onClick={() => handleOpenEditor(null)}>
              <Plus size={14} /> Add Program
            </button>
          </div>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Entrance Exam</th>
                  <th>Duration</th>
                  <th>Fee Cost</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {entranceProgs.map(ep => (
                  <tr key={ep.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{ep.name}</div>
                      <div style={{ fontSize: "12px", color: "var(--dm-outline)" }}>/{ep.slug}</div>
                    </td>
                    <td>{ep.offer?.duration || "N/A"}</td>
                    <td>{ep.offer?.cost || "N/A"}</td>
                    <td><span className={`status-badge content-${ep.status}`}>{ep.status}</span></td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button className="btn btn-light" style={{ height: "30px", padding: "0 10px" }} onClick={() => handleOpenEditor(ep)}>
                          <Edit2 size={12} /> Edit
                        </button>
                        {canDelete && (
                          <button className="btn btn-danger" style={{ height: "30px", width: "30px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => handleDelete(ep.id)}>
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
                {selectedItem ? "Edit Details" : "Add Details"}
              </h3>
              <button className="btn btn-light" style={{ height: "32px", padding: "0 10px" }} onClick={() => setIsEditorOpen(false)}>X</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Name / Title</label>
                  <input type="text" className="form-input" value={name} onChange={(e) => {
                    setName(e.target.value);
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
                  }} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Slug URL</label>
                  <input type="text" className="form-input" value={slug} onChange={(e) => setSlug(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Summary</label>
                  <textarea className="form-textarea" value={summary} onChange={(e) => setSummary(e.target.value)} required />
                </div>

                {activeTab === "services" && (
                  <div className="form-group">
                    <label className="form-label">Sort Order</label>
                    <input type="number" className="form-input" value={sortOrder} onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)} />
                  </div>
                )}

                {activeTab === "testprep" && (
                  <div className="form-group">
                    <label className="form-label">Test Type</label>
                    <select className="form-select" value={testType} onChange={(e) => setTestType(e.target.value)}>
                      <option value="language">Language Proficiency (IELTS/PTE/TOEFL)</option>
                      <option value="aptitude">Academic Aptitude (SAT/GRE/GMAT)</option>
                    </select>
                  </div>
                )}

                {(activeTab === "testprep" || activeTab === "entrance") && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Course Duration</label>
                      <input type="text" className="form-input" placeholder="e.g. 6 weeks" value={duration} onChange={(e) => setDuration(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Fee Cost</label>
                      <input type="text" className="form-input" placeholder="e.g. Rs. 8,000" value={cost} onChange={(e) => setCost(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Features / Badges (comma separated)</label>
                      <input type="text" className="form-input" placeholder="e.g. Certified Tutors, Mock Tests" value={features} onChange={(e) => setFeatures(e.target.value)} />
                    </div>
                  </>
                )}

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
