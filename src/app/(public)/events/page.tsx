import { createSupabaseServerClient } from "@/lib/supabase/server";
import { EventsPage } from "@/views/EventsPage";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Events — Jyoti Educations",
  description: "Explore counseling fairs, orientation sessions, scholarship workshops, and community gatherings at Jyoti Education Corner Kathmandu.",
};

export default async function EventsRoute() {
  const supabase = await createSupabaseServerClient();
  let mappedEvents: any[] = [];

  if (supabase) {
    const { data: dbEvents } = await supabase
      .from("notices_events")
      .select("*, media_assets(path)")
      .eq("type", "event")
      .eq("status", "published")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (dbEvents) {
      mappedEvents = dbEvents.map((n: any) => ({
        id: n.id,
        slug: n.slug,
        type: n.type,
        title: n.title,
        excerpt: n.excerpt || "",
        bodyHtml: n.body?.html || "",
        eventDate: n.event_date
          ? new Date(n.event_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : null,
        location: n.location || "",
        ctaLabel: n.cta_label || "",
        ctaHref: n.cta_href || "",
        featured: n.featured,
        imagePath: n.media_assets?.path || null,
        date: n.published_at
          ? new Date(n.published_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : new Date(n.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
      }));
    }
  }

  return <EventsPage events={mappedEvents as any} />;
}
