import { createSupabaseServerClient } from "@/lib/supabase/server";
import { HomePage } from "@/views/HomePage";

export const dynamic = "force-dynamic";

export default async function HomeRoute() {
  const supabase = await createSupabaseServerClient();
  let homeVideos: any[] = [];

  if (supabase) {
    const { data: dbVideos } = await supabase
      .from("videos")
      .select(`
        *,
        media_asset:media_assets!videos_media_id_fkey(path),
        poster_asset:media_assets!videos_poster_id_fkey(path)
      `)
      .eq("status", "published")
      .order("sort_order", { ascending: true })
      .limit(3);

    if (dbVideos) {
      homeVideos = dbVideos.map((v: any) => {
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
          embedUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : videoUrl;
        } else if (mediaType === "facebook" && videoUrl) {
          embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}&show_text=0&width=500`;
        } else if (mediaType === "instagram" && videoUrl) {
          const cleanUrl = videoUrl.endsWith("/") ? videoUrl : `${videoUrl}/`;
          embedUrl = `${cleanUrl}embed/`;
        }

        return {
          id: v.id,
          title: v.title,
          category: v.category || "General",
          media: mediaType,
          videoUrl,
          embedUrl,
          youtubeId,
          poster: v.poster_asset ? v.poster_asset.path : "/images/generated/study-hero.png",
        };
      });
    }
  }

  return <HomePage initialVideos={homeVideos as any} />;
}
