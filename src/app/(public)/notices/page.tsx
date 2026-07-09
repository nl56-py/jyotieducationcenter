import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NoticesPage } from "@/views/NoticesPage";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Notices — EduMark Pvt. Ltd.",
  description: "Stay updated with the latest admission calls, preparation class announcements, and important academic notifications from EduMark.",
};

export default async function NoticesRoute() {
  const supabase = await createSupabaseServerClient();
  let mappedNotices: any[] = [];

  if (supabase) {
    const { data: dbNotices } = await supabase
      .from("notices_events")
      .select("*, media_assets(path)")
      .eq("type", "notice")
      .eq("status", "published")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (dbNotices) {
      mappedNotices = dbNotices.map((n: any) => ({
        id: n.id,
        slug: n.slug,
        type: n.type,
        title: n.title,
        excerpt: n.excerpt || "",
        bodyHtml: n.body?.html || "",
        ctaLabel: n.cta_label || "",
        ctaHref: n.cta_href || "",
        featured: n.featured,
        imagePath: n.media_assets?.path || null,
        date: n.published_at 
          ? new Date(n.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) 
          : new Date(n.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      }));
    }
  }

  return <NoticesPage notices={mappedNotices as any} />;
}
