import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json([]);
    }

    const { data: dbVideos, error } = await supabase
      .from("videos")
      .select(`
        *,
        media_asset:media_assets!videos_media_id_fkey(path),
        poster_asset:media_assets!videos_poster_id_fkey(path)
      `)
      .eq("status", "published")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Public Videos API error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    let rawVideos = dbVideos || [];
    if (rawVideos.length === 0) {
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
      rawVideos = defaultVideos;
    }

    const mappedVideos = rawVideos.map((v: any) => {
      let mediaType = v.provider || "video";
      let videoUrl = v.external_url || "";
      let youtubeId = v.provider_video_id || "";

      if (v.provider === "youtube" || youtubeId) {
        mediaType = "youtube";
      } else if (v.media_asset) {
        videoUrl = v.media_asset.path;
      }

      let embedUrl = "";
      if (mediaType === "youtube") {
        embedUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1` : videoUrl;
      } else if (mediaType === "facebook" && videoUrl) {
        embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}&show_text=0&width=500`;
      } else if (mediaType === "instagram" && videoUrl) {
        const cleanUrl = videoUrl.endsWith("/") ? videoUrl : `${videoUrl}/`;
        embedUrl = `${cleanUrl}embed/`;
      }

      const durationMinutes = v.duration_seconds 
        ? `${Math.floor(v.duration_seconds / 60)}:${String(v.duration_seconds % 60).padStart(2, '0')}`
        : "";

      return {
        id: v.id,
        title: v.title,
        category: v.category || "General",
        media: mediaType,
        videoUrl,
        embedUrl,
        youtubeId,
        poster: v.poster_asset ? v.poster_asset.path : "/images/generated/study-hero.png",
        duration: durationMinutes,
        description: v.description || ""
      };
    });

    return NextResponse.json(mappedVideos);
  } catch (err: any) {
    console.error("Public Videos API crash:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
