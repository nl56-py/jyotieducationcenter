"use client";

import { useState } from "react";
import { Plus, Edit2, Bookmark, Award, Layers } from "lucide-react";

export default function ServicesPrepPage() {
  const [activeTab, setActiveTab] = useState<"services" | "testprep" | "entrance">("services");

  // Mock states
  const [services, setServices] = useState([
    { id: "1", name: "One-on-One Career Counseling", summary: "Personalized counseling session to map out your academic potential.", status: "published" },
    { id: "2", name: "University & Course Selection", summary: "Help in finding the university matching your budget and profile.", status: "published" },
    { id: "3", name: "Documentation & SOP Editing", summary: "Assistance in drafting Statements of Purpose and compiling documentation.", status: "published" }
  ]);

  const [testPreps, setTestPreps] = useState([
    { id: "1", name: "IELTS Academic", format: "6 weeks, 5 mock tests", cost: "Rs. 8,000", status: "published" },
    { id: "2", name: "PTE Academic", format: "4 weeks, daily lab mock", cost: "Rs. 9,000", status: "published" }
  ]);

  const [entranceProgs, setEntranceProgs] = useState([
    { id: "1", name: "CEE Preparation", offer: "MBBS/BDS Common entrance prep", cost: "Rs. 18,000", status: "published" },
    { id: "2", name: "CMAT Preparation", offer: "TU management aptitude prep", cost: "Rs. 10,000", status: "published" }
  ]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Academic Services & Test Prep</h2>
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
          <div className="panel-card-header">
            <h3 className="panel-card-title">Consultancy Counseling Services</h3>
            <button className="btn btn-light" style={{ height: "32px", fontSize: "12px" }}>
              <Plus size={14} /> Add Service
            </button>
          </div>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Summary Details</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map(s => (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 600 }}>{s.name}</td>
                    <td>{s.summary}</td>
                    <td><span className="status-badge content-published">{s.status}</span></td>
                    <td>
                      <button className="btn btn-light" style={{ height: "30px", padding: "0 10px" }} onClick={() => alert("Edit service detail overlay placeholder")}>
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

      {/* Test Prep */}
      {activeTab === "testprep" && (
        <div className="panel-card">
          <div className="panel-card-header">
            <h3 className="panel-card-title">Language Test Preparations (IELTS, PTE, etc.)</h3>
            <button className="btn btn-light" style={{ height: "32px", fontSize: "12px" }}>
              <Plus size={14} /> Add Test Prep
            </button>
          </div>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Duration / Format</th>
                  <th>Fee Cost</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {testPreps.map(tp => (
                  <tr key={tp.id}>
                    <td style={{ fontWeight: 600 }}>{tp.name}</td>
                    <td>{tp.format}</td>
                    <td>{tp.cost}</td>
                    <td><span className="status-badge content-published">{tp.status}</span></td>
                    <td>
                      <button className="btn btn-light" style={{ height: "30px", padding: "0 10px" }} onClick={() => alert("Edit test prep details overlay placeholder")}>
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

      {/* Entrance Prep */}
      {activeTab === "entrance" && (
        <div className="panel-card">
          <div className="panel-card-header">
            <h3 className="panel-card-title">Entrance Exams Preparation (CEE, CMAT, etc.)</h3>
            <button className="btn btn-light" style={{ height: "32px", fontSize: "12px" }}>
              <Plus size={14} /> Add Program
            </button>
          </div>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Entrance Exam</th>
                  <th>Offer Details</th>
                  <th>Fee Cost</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {entranceProgs.map(ep => (
                  <tr key={ep.id}>
                    <td style={{ fontWeight: 600 }}>{ep.name}</td>
                    <td>{ep.offer}</td>
                    <td>{ep.cost}</td>
                    <td><span className="status-badge content-published">{ep.status}</span></td>
                    <td>
                      <button className="btn btn-light" style={{ height: "30px", padding: "0 10px" }} onClick={() => alert("Edit entrance prep details overlay placeholder")}>
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
