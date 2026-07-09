export function isDriveUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  return url.includes("drive.google.com");
}

export function getDriveFileId(url: string | null | undefined): string | null {
  if (!url) return null;
  // Match patterns:
  // /file/d/FILE_ID/view...
  // /file/d/FILE_ID/preview
  // ?id=FILE_ID
  const fileDMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  const idParamMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (fileDMatch) return fileDMatch[1];
  if (idParamMatch) return idParamMatch[1];
  return null;
}

export function getDriveEmbedUrl(url: string | null | undefined): string {
  if (!url) return "";
  const fileId = getDriveFileId(url);
  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  return url;
}

export function getDriveDirectImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  const fileId = getDriveFileId(url);
  if (fileId) {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  return url;
}

export function getMediaUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (isDriveUrl(url)) {
    return getDriveDirectImageUrl(url);
  }
  return url;
}

export function isPortraitVideo(provider: string | null | undefined, url: string | null | undefined): boolean {
  const cleanUrl = url || "";
  const cleanProv = provider || "";
  if (cleanProv === "instagram") return true;
  if (cleanUrl.includes("/reel/") || cleanUrl.includes("/reels/") || cleanUrl.includes("/shorts/")) {
    return true;
  }
  return false;
}

export function getVideoThumbnail(
  provider: string | null | undefined,
  videoUrl: string | null | undefined,
  youtubeId: string | null | undefined,
  customPoster: string | null | undefined
): string {
  if (customPoster) return customPoster;
  const cleanProv = provider || "";
  const cleanUrl = videoUrl || "";
  const cleanYt = youtubeId || "";

  if (cleanProv === "youtube" && cleanYt) {
    return `https://img.youtube.com/vi/${cleanYt}/hqdefault.jpg`;
  }
  if (cleanProv === "google_drive" || isDriveUrl(cleanUrl)) {
    const fileId = getDriveFileId(cleanUrl);
    if (fileId) {
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
    }
  }
  return "/images/generated/study-hero.png";
}
