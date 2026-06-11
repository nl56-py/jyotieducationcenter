"use client";

import { useState } from "react";
import { Plus, Edit2, Play, Video } from "lucide-react";

export default function VideosCMSPage() {
  const [videos, setVideos] = useState([
    { id: "1", title: "Success Story: Ram from Melbourne", provider_video_id: "dQw4w9WgXcQ", category: "Australia", status: "published" },
    { id: "2", title: "USA Student Visa Mock Interview Tips", provider_video_id: "dQw4w9WgXcQ", category: "USA", status: "published" }
  ]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>YouTube Video Gallery</h2>
          <p style={{ color: "var(--dm-outline)", fontSize: "14px" }}>
            Add student visa success interviews and informational webinars to the front page gallery.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => alert("Add video dialog overlay placeholder")}>
          <Plus size={16} /> Add Video
        </button>
      </div>

      <div className="panel-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Video Title</th>
                <th>YouTube URL ID</th>
                <th>Category Tag</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.map(v => (
                <tr key={v.id}>
                  <td>
                    <div style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
                      <Video size={16} className="text-secondary" />
                      {v.title}
                    </div>
                  </td>
                  <td>
                    <a href={`https://youtube.com/watch?v=${v.provider_video_id}`} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--dm-primary)" }}>
                      <Play size={12} /> {v.provider_video_id}
                    </a>
                  </td>
                  <td><span style={{ padding: "2px 8px", background: "var(--dm-surface-container)", borderRadius: "var(--dm-rounded-full)", fontSize: "12px" }}>{v.category}</span></td>
                  <td><span className="status-badge content-published">{v.status}</span></td>
                  <td>
                    <button className="btn btn-light" style={{ height: "30px", padding: "0 10px" }} onClick={() => alert("Edit details placeholder")}>
                      <Edit2 size={12} /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
