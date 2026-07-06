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

    const mappedVideos = (dbVideos || []).map((v: any) => {
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
