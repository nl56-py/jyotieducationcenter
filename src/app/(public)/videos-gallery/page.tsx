import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VideosPage } from "@/views/VideosPage";
import { getDriveEmbedUrl, getVideoThumbnail, isPortraitVideo } from "@/lib/utils/media";

export const dynamic = "force-dynamic";

export default async function VideosGalleryRoute() {
  let mappedVideos: any[] = [];

  try {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { data: dbVideos, error } = await supabase
        .from("videos")
        .select(`
          *,
          media_asset:media_assets!videos_media_id_fkey(path),
          poster_asset:media_assets!videos_poster_id_fkey(path)
        `)
        .eq("status", "published")
        .order("sort_order", { ascending: true });

      if (!error && dbVideos) {
        mappedVideos = dbVideos.map((v: any) => {
          let mediaType = v.provider || "video";
          let videoUrl = v.external_url || "";
          let youtubeId = v.provider_video_id || "";
          let embedUrl = "";

          if (v.provider === "youtube" || youtubeId) {
            mediaType = "youtube";
            embedUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : videoUrl;
          } else if (v.provider === "facebook" && videoUrl) {
            mediaType = "facebook";
            embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}&show_text=0&width=500`;
          } else if (v.provider === "instagram" && videoUrl) {
            mediaType = "instagram";
            const cleanUrl = videoUrl.endsWith("/") ? videoUrl : `${videoUrl}/`;
            embedUrl = `${cleanUrl}embed/`;
          } else if (v.provider === "google_drive" && videoUrl) {
            mediaType = "google_drive";
            embedUrl = getDriveEmbedUrl(videoUrl);
          } else if (v.media_asset) {
            videoUrl = v.media_asset.path;
          }

          const durationMinutes = v.duration_seconds 
            ? `${Math.floor(v.duration_seconds / 60)}:${String(v.duration_seconds % 60).padStart(2, '0')}`
            : "";

          const poster = getVideoThumbnail(v.provider, videoUrl, youtubeId, v.poster_asset?.path);
          const isPortrait = isPortraitVideo(v.provider, videoUrl);

          return {
            id: v.id,
            title: v.title,
            category: v.category || "General",
            media: mediaType,
            videoUrl,
            embedUrl,
            youtubeId,
            poster,
            isPortrait,
            duration: durationMinutes,
            description: v.description || ""
          };
        });
      }
    }
  } catch (e) {
    console.error("VideosGalleryRoute DB fetch error:", e);
  }

  return <VideosPage videos={mappedVideos as any} />;
}
