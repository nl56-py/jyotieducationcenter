import { createSupabaseServerClient } from "@/lib/supabase/server";
import { HomePage } from "@/views/HomePage";
import { getDriveEmbedUrl } from "@/lib/utils/media";

export const dynamic = "force-dynamic";

export default async function HomeRoute() {
  const supabase = await createSupabaseServerClient();
  let homeVideos: any[] = [];
  let homeBlogs: any[] = [];
  let homeTestimonials: any[] = [];

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
        } else if (v.provider === "google_drive" || mediaType === "google_drive") {
          mediaType = "google_drive";
          embedUrl = getDriveEmbedUrl(videoUrl);
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

    // Fetch dynamic recent blogs
    const { data: dbBlogs } = await supabase
      .from("blog_posts")
      .select(`
        *,
        blog_categories(name),
        cover_image:media_assets!blog_posts_cover_image_id_fkey(path)
      `)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(3);

    if (dbBlogs) {
      homeBlogs = dbBlogs.map((b: any) => {
        let bodyText = "";
        if (typeof b.content === "object" && b.content?.blocks) {
          bodyText = b.content.blocks.map((bl: any) => bl.text || "").join(" ");
        } else {
          bodyText = b.content || "";
        }
        const words = bodyText.split(/\s+/).length;
        const readTime = `${Math.max(1, Math.ceil(words / 200))} min read`;

        return {
          id: b.id,
          slug: b.slug,
          title: b.title,
          excerpt: b.excerpt || "",
          category: b.blog_categories ? b.blog_categories.name : "Study Abroad Guides",
          date: b.published_at 
            ? new Date(b.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) 
            : new Date(b.created_at).toLocaleDateString(),
          readTime,
          image: b.cover_image?.path || "/images/generated/study-hero.png",
        };
      });
    }

    // Fetch dynamic published testimonials
    const { data: dbTestimonials } = await supabase
      .from("testimonials")
      .select("*, media_assets(path)")
      .eq("status", "published")
      .order("sort_order", { ascending: true });

    if (dbTestimonials) {
      homeTestimonials = dbTestimonials.map((t: any) => ({
        id: t.id,
        name: t.student_name,
        route: t.destination || "General",
        quote: t.quote,
        photo: t.media_assets ? t.media_assets.path : null
      }));
    }
  }

  return <HomePage initialVideos={homeVideos as any} initialBlogs={homeBlogs as any} initialTestimonials={homeTestimonials as any} />;
}
