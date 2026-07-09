import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VideosPage } from "@/views/VideosPage";
import { getDriveEmbedUrl } from "@/lib/utils/media";

export const dynamic = "force-dynamic";

export default async function VideosGalleryRoute() {
  const supabase = await createSupabaseServerClient();
  let mappedVideos: any[] = [];

  if (supabase) {
    const { data: dbVideos } = await supabase
      .from("videos")
      .select(`
        *,
        media_asset:media_assets!videos_media_id_fkey(path),
        poster_asset:media_assets!videos_poster_id_fkey(path)
      `)
      .eq("status", "published")
      .order("sort_order", { ascending: true });

    if (dbVideos) {
      mappedVideos = dbVideos.map((v: any) => {
        let mediaType = "video";
        let videoUrl = v.external_url || "";
        let youtubeId = v.provider_video_id || "";
        let embedUrl = "";

        if (v.provider === "youtube" || youtubeId) {
          mediaType = "youtube";
        } else if (v.provider === "google_drive") {
          mediaType = "google_drive";
          embedUrl = getDriveEmbedUrl(v.external_url);
        } else if (v.media_asset) {
          videoUrl = v.media_asset.path;
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
    }
  }

  return <VideosPage videos={mappedVideos as any} />;
}
