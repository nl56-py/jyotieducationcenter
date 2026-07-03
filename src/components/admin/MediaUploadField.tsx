"use client";

import { useState } from "react";
import { ImagePlus, UploadCloud } from "lucide-react";

interface MediaUploadFieldProps {
  label: string;
  folder: string;
  accept?: string;
  value?: string;
  previewUrl?: string;
  onUploaded: (asset: any) => void;
}

export function MediaUploadField({
  label,
  folder,
  accept = "image/*",
  value,
  previewUrl,
  onUploaded,
}: MediaUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFile = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    formData.append("alt_text", file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "));

    try {
      const response = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setMessage(data.error || "Upload failed");
      } else {
        onUploaded(data.mediaAsset);
        setMessage("Uploaded");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setMessage("Upload failed");
    }
    setUploading(false);
  };

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <label className="media-upload-field">
        <input
          type="file"
          accept={accept}
          onChange={(event) => handleFile(event.target.files?.[0])}
          disabled={uploading}
        />
        <span className="media-upload-icon">
          {previewUrl ? <img src={previewUrl} alt="" /> : <ImagePlus size={22} />}
        </span>
        <span>
          <strong>{uploading ? "Uploading..." : "Upload media"}</strong>
          <small>{value ? `Selected asset ${value.slice(0, 8)}...` : "Stores the file in Supabase media storage"}</small>
          {message && <small>{message}</small>}
        </span>
        <UploadCloud size={18} />
      </label>
    </div>
  );
}
