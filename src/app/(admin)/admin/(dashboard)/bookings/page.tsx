"use client";

import { useState, useEffect } from "react";
import { Calendar, Search, Filter, CheckCircle2, XCircle, Clock, Eye } from "lucide-react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  const mockBookings = [
    {
      id: "1",
      full_name: "Gita Bhandari",
      phone: "+9779851234567",
      email: "gita.b@gmail.com",
      preferred_destination: "United Kingdom",
      course_interest: "MBA",
      preferred_date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      preferred_time: "10:30 AM",
      message: "Need information about UK post-study work rules.",
      status: "requested",
      assigned_name: "Unassigned",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      full_name: "Roshan Shrestha",
      phone: "+9779841112233",
      email: "roshan.s@gmail.com",
      preferred_destination: "Japan",
      course_interest: "Japanese Language Prep + Vocational",
      preferred_date: new Date(Date.now() + 172800000).toISOString().split("T")[0],
      preferred_time: "2:00 PM",
      message: "Wants to start classes in Japan for October intake.",
      status: "confirmed",
      assigned_name: "Counselor Binod",
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
  ];

  useEffect(() => {
    setLoading(true);
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/admin/bookings");
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setBookings(data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("API Bookings fetch failed, using mock data.");
      }
      setBookings(mockBookings);
      setLoading(false);
    };
    fetchBookings();
  }, []);

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch("/api/admin/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: bookingId,
          status: newStatus,
        }),
      });

      if (response.ok) {
        const res = await fetch("/api/admin/bookings");
        if (res.ok) {
          const data = await res.json();
          setBookings(data);
          const updated = data.find((b: any) => b.id === bookingId);
          if (updated && selectedBooking && selectedBooking.id === bookingId) {
            setSelectedBooking(updated);
          }
        }
      }
    } catch (err) {
      console.error("Failed to change booking status:", err);
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.full_name.toLowerCase().includes(search.toLowerCase()) || 
      b.phone.includes(search);
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Consultation Bookings</h2>
          <p style={{ color: "var(--dm-outline)", fontSize: "14px" }}>
            Review and schedule student requests for free university consultations.
          </p>
        </div>
      </div>

      <div className="panel-card">
        <div className="filter-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              className="form-input search-input" 
              placeholder="Search by student name or phone..." 
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
                <option value="all">All Bookings</option>
                <option value="requested">Requested</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no_show">No Show</option>
              </select>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student Details</th>
                <th>Destination</th>
                <th>Requested Date</th>
                <th>Time Slot</th>
                <th>Assignee</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "40px" }}>Loading bookings...</td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "40px" }}>No consultation bookings found.</td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{b.full_name}</div>
                      <div style={{ fontSize: "12px", color: "var(--dm-outline)" }}>{b.phone} • {b.email || "No Email"}</div>
                    </td>
                    <td>{b.preferred_destination}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 500 }}>
                        <Calendar size={14} className="text-primary" />
                        {new Date(b.preferred_date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Clock size={14} className="text-outline" />
                        {b.preferred_time}
                      </div>
                    </td>
                    <td>{b.assigned_name}</td>
                    <td>
                      <span className={`status-badge booking-${b.status}`}>
                        {b.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button 
                          className="btn btn-light" 
                          style={{ height: "30px", padding: "0 10px" }}
                          onClick={() => setSelectedBooking(b)}
                        >
                          <Eye size={14} /> View
                        </button>
                        {b.status === "requested" && (
                          <button 
                            className="btn btn-primary" 
                            style={{ height: "30px", padding: "0 10px", background: "var(--dm-secondary)" }}
                            onClick={() => handleStatusChange(b.id, "confirmed")}
                          >
                            <CheckCircle2 size={14} /> Confirm
                          </button>
                        )}
                        {b.status !== "cancelled" && b.status !== "completed" && (
                          <button 
                            className="btn btn-light" 
                            style={{ height: "30px", padding: "0 10px" }}
                            onClick={() => handleStatusChange(b.id, "cancelled")}
                          >
                            <XCircle size={14} className="text-error" /> Cancel
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

      {/* Booking View Modal */}
      {selectedBooking && (
        <div className="modal-overlay" onClick={() => setSelectedBooking(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "500px" }}>
            <div className="modal-header">
              <h3 className="modal-title">Consultation Details</h3>
              <button className="btn btn-light" style={{ height: "32px", padding: "0 10px" }} onClick={() => setSelectedBooking(null)}>X</button>
            </div>
            <div className="modal-body" style={{ fontSize: "14px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div><strong>Name:</strong> {selectedBooking.full_name}</div>
              <div><strong>Phone:</strong> {selectedBooking.phone}</div>
              <div><strong>Email:</strong> {selectedBooking.email || "N/A"}</div>
              <div><strong>Destination:</strong> {selectedBooking.preferred_destination}</div>
              <div><strong>Course Interest:</strong> {selectedBooking.course_interest || "N/A"}</div>
              <div><strong>Date requested:</strong> {selectedBooking.preferred_date}</div>
              <div><strong>Time slot:</strong> {selectedBooking.preferred_time}</div>
              <div><strong>Status:</strong> <span className={`status-badge booking-${selectedBooking.status}`}>{selectedBooking.status}</span></div>
              <div style={{ padding: "12px", background: "var(--dm-surface-container-low)", borderRadius: "var(--dm-rounded-md)", marginTop: "12px" }}>
                <strong>Message:</strong><br />
                <span style={{ fontSize: "13px" }}>{selectedBooking.message || "No attached note."}</span>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--dm-surface-container)" }}>
                <button 
                  className="btn btn-primary" 
                  disabled={selectedBooking.status === "confirmed"}
                  onClick={() => handleStatusChange(selectedBooking.id, "confirmed")}
                  style={{ flex: 1 }}
                >
                  Confirm Slot
                </button>
                <button 
                  className="btn btn-secondary" 
                  disabled={selectedBooking.status === "completed"}
                  onClick={() => handleStatusChange(selectedBooking.id, "completed")}
                  style={{ flex: 1 }}
                >
                  Mark Completed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
