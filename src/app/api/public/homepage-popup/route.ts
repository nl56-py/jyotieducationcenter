import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ popup: null });
    }

    // 1. Fetch published homepage popup banners
    const { data: banners, error } = await supabase
      .from("homepage_popup_banners")
      .select("*, media_assets(path)")
      .eq("status", "published")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (!error && banners && banners.length > 0) {
      const now = new Date();
      const activeBanner = banners.find((b: any) => {
        const startValid = !b.starts_at || new Date(b.starts_at) <= now;
        const endValid = !b.ends_at || new Date(b.ends_at) >= now;
        return startValid && endValid;
      });

      if (activeBanner) {
        const imagePath = activeBanner.media_assets?.path || activeBanner.image_path || null;
        return NextResponse.json({
          popup: {
            id: activeBanner.id,
            title: activeBanner.title,
            subtitle: activeBanner.subtitle,
            body: activeBanner.body,
            cta_label: activeBanner.cta_label,
            cta_href: activeBanner.cta_href,
            display_mode: activeBanner.display_mode || "modal",
            image_path: imagePath,
          },
        });
      }
    }

    // 2. Fallback to featured notice/event
    const { data: notices } = await supabase
      .from("notices_events")
      .select("*")
      .eq("status", "published")
      .eq("featured", true)
      .order("sort_order", { ascending: true })
      .order("published_at", { ascending: false });

    if (notices && notices.length > 0) {
      const notice = notices[0];
      return NextResponse.json({
        popup: {
          id: notice.id,
          title: notice.title,
          subtitle: notice.excerpt,
          body: typeof notice.body === "object" ? (notice.body?.html || "") : (notice.body || ""),
          cta_label: notice.cta_label,
          cta_href: notice.cta_href,
          display_mode: "modal",
        },
      });
    }

    return NextResponse.json({ popup: null });
  } catch (err: any) {
    console.error("Homepage popup fetch error:", err);
    return NextResponse.json({ popup: null });
  }
}
