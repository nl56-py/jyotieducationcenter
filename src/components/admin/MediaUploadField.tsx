"use client";

import { useState } from "react";
import { ImagePlus, UploadCloud, Link as LinkIcon, FileText } from "lucide-react";

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
  const [isExternal, setIsExternal] = useState(false);
  const [externalUrl, setExternalUrl] = useState("");

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

  const handleExternalLink = async () => {
    if (!externalUrl.trim()) return;
    setUploading(true);
    setMessage("");

    const fileName = folder === "videos" ? "Google Drive Video" : "Google Drive Image";
    const mimeType = folder === "videos" ? "video/external" : "image/external";

    try {
      const response = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file_name: fileName,
          mime_type: mimeType,
          size_bytes: 0,
          path: externalUrl.trim(),
          alt_text: "",
          caption: "",
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setMessage(data.error || "Linking failed");
      } else {
        onUploaded(data.mediaAsset);
        setMessage("Linked Successfully");
        setExternalUrl("");
      }
    } catch (err) {
      console.error("Linking external URL failed:", err);
      setMessage("Linking failed");
    }
    setUploading(false);
  };

  // Safe helper to check if preview is a drive image link and parse it to uc form if so
  const getDisplayPreviewUrl = (url: string | undefined) => {
    if (!url) return "";
    if (url.includes("drive.google.com")) {
      const fileDMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      const idParamMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      const fileId = fileDMatch ? fileDMatch[1] : (idParamMatch ? idParamMatch[1] : null);
      if (fileId) {
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
      }
    }
    return url;
  };

  const displayPreview = getDisplayPreviewUrl(previewUrl);

  return (
    <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <label className="form-label" style={{ margin: 0 }}>{label}</label>
        <button
          type="button"
          onClick={() => {
            setIsExternal(!isExternal);
            setMessage("");
          }}
          className="btn btn-light"
          style={{ height: "24px", padding: "0 8px", fontSize: "11px", display: "flex", alignItems: "center", gap: "4px" }}
        >
          {isExternal ? (
            <>
              <UploadCloud size={12} /> Direct Upload Mode
            </>
          ) : (
            <>
              <LinkIcon size={12} /> Link External/Drive URL
            </>
          )}
        </button>
      </div>

      {isExternal ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="url"
              className="form-input"
              placeholder="Paste Google Drive sharing URL or direct link..."
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
              disabled={uploading}
              style={{ flex: 1, height: "40px" }}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleExternalLink}
              disabled={uploading || !externalUrl.trim()}
              style={{ height: "40px", padding: "0 16px" }}
            >
              Link
            </button>
          </div>
          {previewUrl && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px", background: "var(--dm-surface-container-low)", borderRadius: "var(--dm-rounded-md)" }}>
              <span style={{ width: "40px", height: "40px", borderRadius: "4px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--dm-surface-container-high)", flexShrink: 0 }}>
                {previewUrl.includes("drive.google.com") ? (
                  <FileText size={18} style={{ color: "var(--dm-outline)" }} />
                ) : (
                  <img src={displayPreview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                )}
              </span>
              <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "12px", flex: 1 }}>
                <strong>Linked:</strong> <span title={previewUrl}>{previewUrl}</span>
              </div>
            </div>
          )}
          {message && <span style={{ fontSize: "12px", color: message.includes("failed") ? "var(--dm-error)" : "var(--dm-primary)", fontWeight: 500 }}>{message}</span>}
        </div>
      ) : (
        <label className="media-upload-field">
          <input
            type="file"
            accept={accept}
            onChange={(event) => handleFile(event.target.files?.[0])}
            disabled={uploading}
          />
          <span className="media-upload-icon">
            {previewUrl ? (
              previewUrl.includes("drive.google.com") ? (
                <FileText size={22} style={{ color: "var(--dm-outline)" }} />
              ) : (
                <img src={displayPreview} alt="" />
              )
            ) : (
              <ImagePlus size={22} />
            )}
          </span>
          <span>
            <strong>{uploading ? "Uploading..." : "Upload media"}</strong>
            <small>{value ? `Selected asset ${value.slice(0, 8)}...` : "Stores the file in Supabase media storage"}</small>
            {message && <small>{message}</small>}
          </span>
          <UploadCloud size={18} />
        </label>
      )}
    </div>
  );
}
