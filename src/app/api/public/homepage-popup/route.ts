import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ popup: null });
    }

    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("homepage_popup_banners")
      .select("*")
      .eq("status", "published")
      .or(`starts_at.is.null,starts_at.lte.${now}`)
      .or(`ends_at.is.null,ends_at.gte.${now}`)
      .order("sort_order", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      return NextResponse.json({ popup: data });
    }

    const { data: notice } = await supabase
      .from("notices_events")
      .select("*")
      .eq("status", "published")
      .eq("featured", true)
      .order("sort_order", { ascending: true })
      .order("published_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!notice) {
      return NextResponse.json({ popup: null });
    }

    return NextResponse.json({
      popup: {
        title: notice.title,
        subtitle: notice.excerpt,
        body: notice.body?.html || "",
        cta_label: notice.cta_label,
        cta_href: notice.cta_href,
        display_mode: "modal",
      },
    });
  } catch {
    return NextResponse.json({ popup: null });
  }
}
