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

    if (!dbVideos || dbVideos.length === 0) {
      const defaultVideos = [
        {
          id: "v-001",
          title: "Jyoti Education Corner counseling and student moments",
          category: "Office Tours",
          provider: "local",
          external_url: "/videos/edumark-campus.mp4",
          duration_seconds: 85,
          sort_order: 1,
          status: "published",
          description: "Experience the vibrant student community and personalized guidance at Jyoti Education Corner."
        },
        {
          id: "v-002",
          title: "Study abroad seminar highlights",
          category: "Destination Guides",
          provider: "youtube",
          provider_video_id: "3Uskw8oGg38",
          external_url: "https://www.youtube.com/watch?v=3Uskw8oGg38",
          duration_seconds: 220,
          sort_order: 2,
          status: "published",
          description: "Highlights from our international education seminar in Damak featuring university representatives."
        },
        {
          id: "v-003",
          title: "IELTS classroom practice",
          category: "Test Preparation",
          provider: "youtube",
          provider_video_id: "co1i2881g9A",
          external_url: "https://www.youtube.com/watch?v=co1i2881g9A",
          duration_seconds: 140,
          sort_order: 3,
          status: "published",
          description: "Inside look into interactive speaking and writing sessions at our IELTS preparation lab."
        },
        {
          id: "v-004",
          title: "Visa success story",
          category: "Testimonials",
          provider: "youtube",
          provider_video_id: "W8_N44bE0rA",
          external_url: "https://www.youtube.com/watch?v=W8_N44bE0rA",
          duration_seconds: 255,
          sort_order: 4,
          status: "published",
          description: "Inspiring journey of a Jyoti student who achieved their student visa and dream course abroad."
        },
        {
          id: "v-005",
          title: "Europe route overview",
          category: "Destination Guides",
          provider: "local",
          external_url: "/videos/counseliing video .mp4",
          duration_seconds: 175,
          sort_order: 5,
          status: "published",
          description: "Detailed overview of affordable, high-quality degree options in Germany, Finland, and Lithuania."
        }
      ];

      for (const v of defaultVideos) {
        await supabase.from("videos").insert(v);
      }

      return NextResponse.json(defaultVideos);
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
