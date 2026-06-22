import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getCurrentUser } from "@/lib/auth/guards";
import { hasPermission } from "@/lib/auth/roles";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Supabase not configured" }, { status: 500 });
    }

    const { data: dbMedia, error } = await supabase
      .from("media_assets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching media assets:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json(dbMedia);
  } catch (err: any) {
    console.error("Media API GET error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Supabase not configured" }, { status: 500 });
    }

    const body = await request.json();
    const { file_name, mime_type, size_bytes, path, alt_text, caption } = body;

    if (!file_name || !path) {
      return NextResponse.json({ success: false, error: "Missing file name or path" }, { status: 400 });
    }

    const authorAdminId = user.isMock ? null : user.id;

    const { data: newAsset, error } = await supabase
      .from("media_assets")
      .insert({
        bucket: "media",
        path,
        file_name,
        mime_type: mime_type || "image/jpeg",
        size_bytes: size_bytes ? parseInt(size_bytes) : 0,
        alt_text: alt_text || null,
        caption: caption || null,
        uploaded_by: authorAdminId,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, mediaAsset: newAsset });
  } catch (err: any) {
    console.error("Media API POST error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(user.role, "manage:media")) {
      return NextResponse.json({ success: false, error: "Forbidden: You do not have permission to delete content" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing media asset ID" }, { status: 400 });
    }

    let supabase: any;
    if (user.isMock) {
      supabase = createSupabaseAdminClient();
    } else {
      supabase = await createSupabaseServerClient();
    }

    if (!supabase) {
      return NextResponse.json({ success: false, error: "Supabase client not configured" }, { status: 500 });
    }

    const { error } = await supabase
      .from("media_assets")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Media API DELETE error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
