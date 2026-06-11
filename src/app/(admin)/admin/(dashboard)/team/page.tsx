"use client";

import { useState } from "react";
import { Plus, Edit2, Users, MessageSquare } from "lucide-react";

export default function TeamTestimonialsPage() {
  const [activeTab, setActiveTab] = useState<"team" | "testimonials">("team");

  // Mock list
  const [team, setTeam] = useState([
    { id: "1", name: "EduMark CEO", role_title: "Managing Director", status: "published" },
    { id: "2", name: "Binod Thapa", role_title: "Senior Counselor", status: "published" }
  ]);

  const [testimonials, setTestimonials] = useState([
    { id: "1", student_name: "Ram Prasad", destination: "Australia", quote: "EduMark made my visa process so smooth!", status: "published" }
  ]);

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
          <div className="panel-card-header">
            <h3 className="panel-card-title">Counseling Staff Members</h3>
            <button className="btn btn-light" style={{ height: "32px", fontSize: "12px" }}>
              <Plus size={14} /> Add Counselor
            </button>
          </div>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Staff Name</th>
                  <th>Role Title</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {team.map(t => (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 600 }}>{t.name}</td>
                    <td>{t.role_title}</td>
                    <td><span className="status-badge content-published">{t.status}</span></td>
                    <td>
                      <button className="btn btn-light" style={{ height: "30px", padding: "0 10px" }} onClick={() => alert("Edit staff member")}>
                        <Edit2 size={12} /> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="panel-card">
          <div className="panel-card-header">
            <h3 className="panel-card-title">Student Testimonials</h3>
            <button className="btn btn-light" style={{ height: "32px", fontSize: "12px" }}>
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
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map(test => (
                  <tr key={test.id}>
                    <td style={{ fontWeight: 600 }}>{test.student_name}</td>
                    <td>{test.destination}</td>
                    <td style={{ fontStyle: "italic", maxWidth: "300px" }}>"{test.quote}"</td>
                    <td><span className="status-badge content-published">{test.status}</span></td>
                    <td>
                      <button className="btn btn-light" style={{ height: "30px", padding: "0 10px" }} onClick={() => alert("Edit testimonial")}>
                        <Edit2 size={12} /> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
