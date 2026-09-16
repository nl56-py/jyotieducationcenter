"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Plus, 
  UserPlus, 
  Filter, 
  Download, 
  Edit3, 
  Trash2, 
  CheckCircle,
  MessageSquare,
  FileSpreadsheet,
  Save,
  X
} from "lucide-react";
import * as XLSX from "xlsx";

export default function LeadsPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [destFilter, setDestFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  
  const canDelete = currentUser && (currentUser.role === "super_admin" || currentUser.role === "admin");
  
  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  
  // Edit Lead state
  const [isEditingLead, setIsEditingLead] = useState(false);
  const [editFullName, setEditFullName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editDestination, setEditDestination] = useState("Australia");
  const [editCourseInterest, setEditCourseInterest] = useState("");
  const [editStatus, setEditStatus] = useState("new");
  const [editMessage, setEditMessage] = useState("");
  const [isSavingLead, setIsSavingLead] = useState(false);

  // Form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredDestination, setPreferredDestination] = useState("Australia");
  const [courseInterest, setCourseInterest] = useState("");
  const [message, setMessage] = useState("");
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      // 1. Fetch Session
      try {
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();
        setCurrentUser(sessionData.user);
      } catch (err) {
        console.error("Failed to load session", err);
      }

      // 2. Fetch Leads (from Supabase/DB)
      try {
        const response = await fetch("/api/admin/leads");
        if (response.ok) {
          const data = await response.json();
          setLeads(data || []);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("API Leads fetch failed.");
      }
      setLeads([]);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleOpenLeadDetails = (lead: any, editMode: boolean = false) => {
    setSelectedLead(lead);
    setIsEditingLead(editMode);
    setEditFullName(lead.full_name || "");
    setEditPhone(lead.phone || "");
    setEditEmail(lead.email || "");
    setEditDestination(lead.preferred_destination || "Australia");
    setEditCourseInterest(lead.course_interest || "");
    setEditStatus(lead.status || "new");
    setEditMessage(lead.message || "");
  };

  const handleSaveLeadDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;
    setIsSavingLead(true);
    try {
      const response = await fetch("/api/admin/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedLead.id,
          full_name: editFullName,
          phone: editPhone,
          email: editEmail,
          preferred_destination: editDestination,
          course_interest: editCourseInterest,
          status: editStatus,
          message: editMessage,
        }),
      });

      if (response.ok) {
        const res = await fetch("/api/admin/leads");
        if (res.ok) {
          const data = await res.json();
          setLeads(data);
          const updated = data.find((l: any) => l.id === selectedLead.id);
          if (updated) {
            setSelectedLead(updated);
          }
        }
        setIsEditingLead(false);
      } else {
        alert("Failed to update lead details.");
      }
    } catch (err) {
      console.error("Failed to update lead details:", err);
      alert("Error updating lead details.");
    } finally {
      setIsSavingLead(false);
    }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          phone,
          email: email || null,
          preferred_destination: preferredDestination,
          course_interest: courseInterest || null,
          message: message || "Lead manually registered in admin panel.",
          source: "manual_entry",
        }),
      });

      if (response.ok) {
        const res = await fetch("/api/admin/leads");
        if (res.ok) {
          const data = await res.json();
          setLeads(data);
        }
      }
    } catch (err) {
      console.error("Failed to save lead:", err);
    }
    setLoading(false);
    setIsCreateOpen(false);
    // Reset form
    setFullName("");
    setPhone("");
    setEmail("");
    setCourseInterest("");
    setMessage("");
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim() || !selectedLead) return;

    try {
      const response = await fetch("/api/admin/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedLead.id,
          note: noteText,
        }),
      });

      if (response.ok) {
        const res = await fetch("/api/admin/leads");
        if (res.ok) {
          const data = await res.json();
          setLeads(data);
          const updated = data.find((l: any) => l.id === selectedLead.id);
          if (updated) {
            setSelectedLead(updated);
          }
        }
      }
    } catch (err) {
      console.error("Failed to add note:", err);
    }
    setNoteText("");
  };

  const handleExportExcel = () => {
    const dataToExport = filteredLeads.length > 0 ? filteredLeads : leads;
    if (dataToExport.length === 0) {
      alert("No leads available to export.");
      return;
    }

    const rows = dataToExport.map((lead, idx) => ({
      "S.N.": idx + 1,
      "Lead ID": lead.id,
      "Student Name": lead.full_name,
      "Phone Number": lead.phone,
      "Email Address": lead.email || "N/A",
      "Preferred Destination": lead.preferred_destination || "N/A",
      "Course / Field of Interest": lead.course_interest || "General Study",
      "Lead Status": (lead.status || "").replace("_", " ").toUpperCase(),
      "Inquiry Source": (lead.source || "").replace("_", " "),
      "Counselor Assignee": lead.assigned_name || "Unassigned",
      "Student Inquiry Message": lead.message || "",
      "Counselor Notes Timeline": (lead.notes || [])
        .map((n: any) => `[${new Date(n.created_at).toLocaleDateString()} - ${n.author}]: ${n.note}`)
        .join(" | "),
      "Date Created": new Date(lead.created_at).toLocaleString(),
    }));

    const ws = XLSX.utils.json_to_sheet(rows);

    // Set readable column widths
    ws["!cols"] = [
      { wch: 6 },  // S.N.
      { wch: 36 }, // Lead ID
      { wch: 24 }, // Student Name
      { wch: 18 }, // Phone
      { wch: 28 }, // Email
      { wch: 20 }, // Destination
      { wch: 25 }, // Course Interest
      { wch: 16 }, // Status
      { wch: 16 }, // Source
      { wch: 20 }, // Counselor
      { wch: 35 }, // Message
      { wch: 45 }, // Counselor Notes
      { wch: 22 }, // Date Created
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads CRM");

    const dateStr = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `Jyoti_Education_Leads_${dateStr}.xlsx`);
  };

  const handleUpdateStatus = async (leadId: string, newStatus: string) => {
    try {
      const response = await fetch("/api/admin/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: leadId,
          status: newStatus,
        }),
      });

      if (response.ok) {
        const res = await fetch("/api/admin/leads");
        if (res.ok) {
          const data = await res.json();
          setLeads(data);
          if (selectedLead && selectedLead.id === leadId) {
            const updated = data.find((l: any) => l.id === leadId);
            if (updated) {
              setSelectedLead(updated);
            }
          }
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this lead? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/leads?id=${leadId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setLeads(leads.filter((l) => l.id !== leadId));
          if (selectedLead && selectedLead.id === leadId) {
            setSelectedLead(null);
          }
        } else {
          alert(data.error || "Failed to delete lead");
        }
      } else {
        const errData = await response.json();
        alert(errData.error || "Failed to delete lead");
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
      alert("Failed to delete lead due to network error.");
    }
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter logic
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.full_name.toLowerCase().includes(search.toLowerCase()) ||
      (lead.email && lead.email.toLowerCase().includes(search.toLowerCase())) ||
      lead.phone.includes(search);
      
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesDest = destFilter === "all" || lead.preferred_destination === destFilter;

    return matchesSearch && matchesStatus && matchesDest;
  });

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Lead Management CRM</h2>
          <p style={{ color: "var(--dm-outline)", fontSize: "14px" }}>
            Track student inquiries, consultations, and counseling conversions.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button className="btn btn-secondary" onClick={handleExportExcel} style={{ display: "flex", alignItems: "center", gap: "6px" }} title="Export leads to Excel spreadsheet">
            <FileSpreadsheet size={16} color="#107c41" /> Export to Excel (.xlsx)
          </button>
          <button className="btn btn-primary" onClick={() => setIsCreateOpen(true)}>
            <Plus size={16} /> Create Lead
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="panel-card" style={{ marginBottom: "24px" }}>
        <div className="filter-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              className="form-input search-input" 
              placeholder="Search by student name, email, or phone..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <div className="form-group" style={{ marginBottom: 0, flexDirection: "row", alignItems: "center", gap: "8px" }}>
              <Filter size={16} className="text-outline" />
              <select 
                className="form-select" 
                style={{ width: "160px" }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="counseling_scheduled">Counseling Scheduled</option>
                <option value="in_progress">In Progress</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
                <option value="spam">Spam</option>
              </select>
            </div>

            <select 
              className="form-select" 
              style={{ width: "160px" }}
              value={destFilter}
              onChange={(e) => setDestFilter(e.target.value)}
            >
              <option value="all">All Destinations</option>
              <option value="Australia">Australia</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Japan">Japan</option>
            </select>
          </div>
        </div>

        {/* Lead Table */}
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Destination</th>
                <th>Course Interest</th>
                <th>Source</th>
                <th>Assignee</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "40px" }}>Loading leads list...</td>
                </tr>
              ) : paginatedLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "40px" }}>No leads matching current filters.</td>
                </tr>
              ) : (
                paginatedLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{lead.full_name}</div>
                      <div style={{ fontSize: "12px", color: "var(--dm-outline)" }}>{lead.phone} • {lead.email || "No Email"}</div>
                    </td>
                    <td>{lead.preferred_destination}</td>
                    <td>{lead.course_interest || "General Study"}</td>
                    <td style={{ textTransform: "capitalize" }}>{lead.source.replace("_", " ")}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
                        <UserPlus size={14} className="text-outline" />
                        {lead.assigned_name}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge lead-${lead.status}`}>
                        {lead.status.replace("_", " ")}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                        <button 
                          className="btn btn-light" 
                          style={{ height: "30px", padding: "0 10px", fontSize: "12px" }}
                          onClick={() => handleOpenLeadDetails(lead, false)}
                          title="View Details & Notes"
                        >
                          Details
                        </button>
                        <button 
                          className="btn btn-light" 
                          style={{ height: "30px", padding: "0 8px", fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" }}
                          onClick={() => handleOpenLeadDetails(lead, true)}
                          title="Edit Lead Details"
                        >
                          <Edit3 size={12} /> Edit
                        </button>
                        <select 
                          className="form-select" 
                          style={{ height: "30px", padding: "0 6px", width: "105px", fontSize: "11px" }}
                          value={lead.status}
                          onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="in_progress">In Progress</option>
                          <option value="converted">Converted</option>
                          <option value="lost">Lost</option>
                          <option value="spam">Spam</option>
                        </select>
                        {canDelete && (
                          <button 
                            className="btn btn-danger" 
                            style={{ height: "30px", width: "30px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", minWidth: "30px" }}
                            onClick={() => handleDeleteLead(lead.id)}
                            title="Delete Lead"
                          >
                            <Trash2 size={14} />
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

        {/* Admin Leads Pagination Bar */}
        {totalPages > 1 && (
          <div style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--dm-surface-container)" }}>
            <span style={{ fontSize: "13px", color: "var(--dm-outline)" }}>
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredLeads.length)} of {filteredLeads.length} leads
            </span>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="btn btn-light"
                style={{ fontSize: "12px", height: "32px", padding: "0 12px" }}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={p === currentPage ? "btn btn-primary" : "btn btn-light"}
                  style={{ width: "32px", height: "32px", padding: 0, fontSize: "12px" }}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="btn btn-light"
                style={{ fontSize: "12px", height: "32px", padding: "0 12px" }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Details/Timeline Modal */}
      {selectedLead && (
        <div className="modal-overlay" onClick={() => setSelectedLead(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "750px" }}>
            <div className="modal-header">
              <h3 className="modal-title">Lead Timeline & Counselor Notes</h3>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {canDelete && (
                  <button 
                    className="btn btn-danger" 
                    style={{ height: "32px", padding: "0 12px", display: "flex", alignItems: "center", gap: "6px", fontSize: "12px" }}
                    onClick={() => handleDeleteLead(selectedLead.id)}
                  >
                    <Trash2 size={14} /> Delete Lead
                  </button>
                )}
                <button className="btn btn-light" style={{ height: "32px", padding: "0 10px" }} onClick={() => setSelectedLead(null)}>X</button>
              </div>
            </div>
            
            <div className="modal-body" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "24px" }}>
              {/* Lead Details (View or Edit mode) */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <h4 style={{ fontSize: "15px", fontWeight: 700, margin: 0 }}>
                    {isEditingLead ? "Edit Student Details" : "Student Details"}
                  </h4>
                  {!isEditingLead ? (
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      style={{ height: "28px", padding: "0 10px", fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" }}
                      onClick={() => handleOpenLeadDetails(selectedLead, true)}
                    >
                      <Edit3 size={12} /> Edit Details
                    </button>
                  ) : (
                    <button 
                      type="button" 
                      className="btn btn-light" 
                      style={{ height: "28px", padding: "0 8px", fontSize: "12px" }}
                      onClick={() => setIsEditingLead(false)}
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                {isEditingLead ? (
                  <form onSubmit={handleSaveLeadDetails} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div className="form-group" style={{ marginBottom: "6px" }}>
                      <label className="form-label" style={{ fontSize: "12px" }}>Full Name</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={editFullName} 
                        onChange={(e) => setEditFullName(e.target.value)} 
                        required 
                      />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      <div className="form-group" style={{ marginBottom: "6px" }}>
                        <label className="form-label" style={{ fontSize: "12px" }}>Phone</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={editPhone} 
                          onChange={(e) => setEditPhone(e.target.value)} 
                          required 
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: "6px" }}>
                        <label className="form-label" style={{ fontSize: "12px" }}>Email</label>
                        <input 
                          type="email" 
                          className="form-input" 
                          value={editEmail} 
                          onChange={(e) => setEditEmail(e.target.value)} 
                        />
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      <div className="form-group" style={{ marginBottom: "6px" }}>
                        <label className="form-label" style={{ fontSize: "12px" }}>Destination</label>
                        <select 
                          className="form-select" 
                          value={editDestination} 
                          onChange={(e) => setEditDestination(e.target.value)}
                        >
                          <option value="Australia">Australia</option>
                          <option value="USA">USA</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="New Zealand">New Zealand</option>
                          <option value="Japan">Japan</option>
                          <option value="Germany">Germany</option>
                          <option value="South Korea">South Korea</option>
                        </select>
                      </div>
                      <div className="form-group" style={{ marginBottom: "6px" }}>
                        <label className="form-label" style={{ fontSize: "12px" }}>Status</label>
                        <select 
                          className="form-select" 
                          value={editStatus} 
                          onChange={(e) => setEditStatus(e.target.value)}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="counseling_scheduled">Counseling Scheduled</option>
                          <option value="in_progress">In Progress</option>
                          <option value="converted">Converted</option>
                          <option value="lost">Lost</option>
                          <option value="spam">Spam</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group" style={{ marginBottom: "6px" }}>
                      <label className="form-label" style={{ fontSize: "12px" }}>Course / Field of Interest</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. IELTS / Master of IT" 
                        value={editCourseInterest} 
                        onChange={(e) => setEditCourseInterest(e.target.value)} 
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: "10px" }}>
                      <label className="form-label" style={{ fontSize: "12px" }}>Inquiry Message</label>
                      <textarea 
                        className="form-textarea" 
                        style={{ minHeight: "75px", fontSize: "13px" }}
                        placeholder="Inquiry note or student message..." 
                        value={editMessage} 
                        onChange={(e) => setEditMessage(e.target.value)} 
                      />
                    </div>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <button 
                        type="button" 
                        className="btn btn-light" 
                        style={{ height: "32px", fontSize: "12px" }}
                        onClick={() => setIsEditingLead(false)}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-primary" 
                        style={{ height: "32px", fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" }}
                        disabled={isSavingLead}
                      >
                        <Save size={13} /> {isSavingLead ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" }}>
                    <div><strong>Full Name:</strong> {selectedLead.full_name}</div>
                    <div><strong>Phone:</strong> {selectedLead.phone}</div>
                    <div><strong>Email:</strong> {selectedLead.email || "N/A"}</div>
                    <div><strong>Destination:</strong> {selectedLead.preferred_destination}</div>
                    <div><strong>Course Interest:</strong> {selectedLead.course_interest || "N/A"}</div>
                    <div><strong>Status:</strong> <span className={`status-badge lead-${selectedLead.status}`}>{selectedLead.status.replace("_", " ")}</span></div>
                    <div><strong>Source:</strong> <span style={{ textTransform: "capitalize" }}>{selectedLead.source?.replace("_", " ")}</span></div>
                    <div style={{ padding: "10px", background: "var(--dm-surface-container-low)", borderRadius: "var(--dm-rounded-md)", marginTop: "4px" }}>
                      <strong>Message:</strong><br />
                      <span style={{ fontSize: "13px", whiteSpace: "pre-wrap" }}>{selectedLead.message || "No message attached."}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Notes Timeline */}
              <div style={{ display: "flex", flexDirection: "column", height: "370px" }}>
                <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>Counselor Notes</h4>
                
                {/* Notes list */}
                <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px", paddingRight: "8px" }}>
                  {(!selectedLead.notes || selectedLead.notes.length === 0) ? (
                    <div style={{ padding: "20px 10px", textAlign: "center", color: "var(--dm-outline)", fontSize: "13px", background: "var(--dm-surface-container-low)", borderRadius: "var(--dm-rounded-md)" }}>
                      No counselor notes logged yet.<br />Use the form below to append a note.
                    </div>
                  ) : (
                    selectedLead.notes.map((note: any) => (
                      <div key={note.id} style={{ background: "var(--dm-surface-container-low)", padding: "10px", borderRadius: "var(--dm-rounded-md)", fontSize: "13px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", color: "var(--dm-outline)", fontSize: "11px", marginBottom: "4px" }}>
                          <span style={{ fontWeight: 600 }}>{note.author}</span>
                          <span>{new Date(note.created_at).toLocaleDateString()}</span>
                        </div>
                        <div style={{ whiteSpace: "pre-wrap" }}>{note.note}</div>
                      </div>
                    ))
                  )}
                </div>

                {/* Add note form */}
                <form onSubmit={handleAddNote} style={{ display: "flex", gap: "8px" }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Type note to append..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-primary" style={{ padding: "0 14px" }}>Add</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {isCreateOpen && (
        <div className="modal-overlay" onClick={() => setIsCreateOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "500px" }}>
            <div className="modal-header">
              <h3 className="modal-title">Create Manual Lead</h3>
              <button className="btn btn-light" style={{ height: "32px", padding: "0 10px" }} onClick={() => setIsCreateOpen(false)}>X</button>
            </div>
            <form onSubmit={handleCreateLead}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Student Name</label>
                  <input type="text" className="form-input" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="text" className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Destination</label>
                  <select className="form-select" value={preferredDestination} onChange={(e) => setPreferredDestination(e.target.value)}>
                    <option value="Australia">Australia</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Japan">Japan</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Course / Field of Interest</label>
                  <input type="text" className="form-input" placeholder="e.g. Master of Data Science" value={courseInterest} onChange={(e) => setCourseInterest(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Opening Counselor Note</label>
                  <textarea className="form-textarea" placeholder="e.g. Walk-in client inquired about visa checklists..." value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" onClick={() => setIsCreateOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
