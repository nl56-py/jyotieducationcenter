import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/guards";
import { hasPermission } from "@/lib/auth/roles";

// SECURITY (OWASP A04): Allowlisted MIME types for media uploads
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/avif",
  "application/pdf",
  "video/mp4",
  "video/webm",
]);

// Maximum upload file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

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
    const folder = String(formData.get("folder") || "general");
    const altText = String(formData.get("alt_text") || "");
    const caption = String(formData.get("caption") || "");

    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: "Missing upload file" }, { status: 400 });
    }

    // SECURITY (OWASP A04): Validate file type and size
    const mimeType = file.type || "application/octet-stream";
    if (!ALLOWED_MIME_TYPES.has(mimeType)) {
      return NextResponse.json(
        { success: false, error: `File type "${mimeType}" is not allowed. Accepted: images, PDFs, and videos.` },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: `File size exceeds the 10MB limit.` },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdminClient() || await createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Supabase not configured" }, { status: 500 });
    }

    const objectPath = `${folder.replace(/[^a-z0-9/_-]+/gi, "-")}/${cleanFileName(file.name)}`;
    const bytes = await file.arrayBuffer();

    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(objectPath, bytes, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ success: false, error: uploadError.message }, { status: 500 });
    }

    const { data: publicUrl } = supabase.storage.from("media").getPublicUrl(objectPath);
    const authorAdminId = user.isMock ? null : user.id;

    const { data: mediaAsset, error: insertError } = await supabase
      .from("media_assets")
      .insert({
        bucket: "media",
        path: publicUrl.publicUrl,
        file_name: file.name,
        mime_type: file.type || "application/octet-stream",
        size_bytes: file.size,
        alt_text: altText || null,
        caption: caption || objectPath,
        uploaded_by: authorAdminId,
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ success: false, error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, mediaAsset });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
