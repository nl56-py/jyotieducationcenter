import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json([]);
    }

    const { data: dbDests, error } = await supabase
      .from("destinations")
      .select("id, name, slug, cost_range, intake_badges, next_intake_label, next_intake_date, university_cost, universities_detail")
      .eq("status", "published")
      .order("name", { ascending: true });

    if (error) {
      console.error("Public Destinations API error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json(dbDests || []);
  } catch (err: any) {
    console.error("Public Destinations API crash:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
