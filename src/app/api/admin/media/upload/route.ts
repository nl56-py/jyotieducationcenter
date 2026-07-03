import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/guards";
import { hasPermission } from "@/lib/auth/roles";

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
