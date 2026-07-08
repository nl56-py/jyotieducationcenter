import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NoticesPage } from "@/views/NoticesPage";

export const dynamic = "force-dynamic";

export default async function NoticesRoute() {
  const supabase = await createSupabaseServerClient();
  let mappedNotices: any[] = [];

  if (supabase) {
    const { data: dbNotices } = await supabase
      .from("notices_events")
      .select("*")
      .eq("status", "published")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (dbNotices) {
      mappedNotices = dbNotices.map((n: any) => ({
        id: n.id,
        slug: n.slug,
        type: n.type, // 'notice' | 'event'
        title: n.title,
        excerpt: n.excerpt || "",
        bodyHtml: n.body?.html || "",
        eventDate: n.event_date ? new Date(n.event_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : null,
        location: n.location || "",
        ctaLabel: n.cta_label || "",
        ctaHref: n.cta_href || "",
        featured: n.featured,
        date: n.published_at 
          ? new Date(n.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) 
          : new Date(n.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      }));
    }
  }

  return <NoticesPage notices={mappedNotices as any} />;
}
