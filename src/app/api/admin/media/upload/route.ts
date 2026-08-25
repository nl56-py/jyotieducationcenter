import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getCurrentUser } from "@/lib/auth/guards";
import { hasPermission } from "@/lib/auth/roles";
import prisma from "@/lib/db/prisma";

// SECURITY (OWASP A04): Allowlisted MIME types for media uploads
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/avif",
  "image/svg+xml",
  "application/pdf",
  "video/mp4",
  "video/webm",
]);

// Maximum upload file size: 20MB
const MAX_FILE_SIZE = 20 * 1024 * 1024;

function cleanFileName(name: string) {
  const parts = name.split(".");
  const ext = parts.length > 1 ? `.${parts.pop()}` : "";
  const base = parts.join(".").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return `${base || "media"}-${Date.now()}${ext.toLowerCase()}`;
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    if (!hasPermission(user.role, "manage:media") && !hasPermission(user.role, "manage:content")) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const folder = String(formData.get("folder") || "general").replace(/[^a-z0-9_-]/gi, "");
    const altText = String(formData.get("alt_text") || "");
    const caption = String(formData.get("caption") || "");

    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: "Missing upload file" }, { status: 400 });
    }

    // SECURITY: Validate file type and size
    const mimeType = file.type || "application/octet-stream";
    if (!ALLOWED_MIME_TYPES.has(mimeType)) {
      return NextResponse.json(
        { success: false, error: `File type "${mimeType}" is not allowed. Accepted: images, PDFs, and videos.` },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: `File size exceeds the 20MB limit.` },
        { status: 400 }
      );
    }

    const fileName = cleanFileName(file.name);
    const targetDir = path.join(process.cwd(), "public", "uploads", folder);
    await fs.mkdir(targetDir, { recursive: true });

    const filePath = path.join(targetDir, fileName);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${folder}/${fileName}`;
    const authorAdminId = user.isMock ? null : user.id;

    // Record asset in database
    let mediaAsset = null;
    try {
      mediaAsset = await prisma.mediaAsset.create({
        data: {
          bucket: "local",
          path: publicUrl,
          file_name: file.name,
          mime_type: mimeType,
          size_bytes: BigInt(file.size),
          alt_text: altText || null,
          caption: caption || publicUrl,
          uploaded_by: authorAdminId,
        },
      });
    } catch (e) {
      mediaAsset = {
        id: `local-${Date.now()}`,
        path: publicUrl,
        file_name: file.name,
        mime_type: mimeType,
        size_bytes: file.size,
        alt_text: altText,
        caption,
      };
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      mediaAsset: {
        ...mediaAsset,
        size_bytes: mediaAsset.size_bytes ? Number(mediaAsset.size_bytes) : file.size,
      },
    });
  } catch (err: any) {
    console.error("Media upload error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
