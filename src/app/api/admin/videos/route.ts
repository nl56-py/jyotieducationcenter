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

    const { data: dbVideos, error } = await supabase
      .from("videos")
      .select("*, media_asset:media_assets!videos_media_id_fkey(path), poster_assets:media_assets!videos_poster_id_fkey(path)")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Error fetching videos:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json(dbVideos);
  } catch (err: any) {
    console.error("Videos API GET error:", err);
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
    const { title, description, provider, provider_video_id, external_url, media_id, poster_id, category, duration_seconds, status, sort_order } = body;

    if (!title || (!provider_video_id && !external_url && !media_id)) {
      return NextResponse.json({ success: false, error: "Missing title or video source" }, { status: 400 });
    }

    const { data: newVideo, error } = await supabase
      .from("videos")
      .insert({
        title,
        description: description || null,
        provider: provider || null,
        provider_video_id: provider_video_id || null,
        external_url: external_url || null,
        media_id: media_id || null,
        poster_id: poster_id || null,
        category: category || "general",
        duration_seconds: duration_seconds ? parseInt(duration_seconds) : null,
        status: status || "draft",
        sort_order: sort_order !== undefined ? parseInt(sort_order) : 0,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, video: newVideo });
  } catch (err: any) {
    console.error("Videos API POST error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
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
    const { id, title, description, provider, provider_video_id, external_url, media_id, poster_id, category, duration_seconds, status, sort_order } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing video ID" }, { status: 400 });
    }

    const updates: any = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description || null;
    if (provider !== undefined) updates.provider = provider || null;
    if (provider_video_id !== undefined) updates.provider_video_id = provider_video_id || null;
    if (external_url !== undefined) updates.external_url = external_url || null;
    if (media_id !== undefined) updates.media_id = media_id || null;
    if (poster_id !== undefined) updates.poster_id = poster_id || null;
    if (category !== undefined) updates.category = category;
    if (duration_seconds !== undefined) updates.duration_seconds = duration_seconds ? parseInt(duration_seconds) : null;
    if (status !== undefined) updates.status = status;
    if (sort_order !== undefined) updates.sort_order = parseInt(sort_order);

    updates.updated_at = new Date().toISOString();

    const { error } = await supabase
      .from("videos")
      .update(updates)
      .eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Videos API PUT error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(user.role, "manage:content")) {
      return NextResponse.json({ success: false, error: "Forbidden: You do not have permission to delete content" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing video ID" }, { status: 400 });
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
      .from("videos")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Videos API DELETE error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
