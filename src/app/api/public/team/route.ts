import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { siteConfig } from "@/data/siteConfig";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { data: dbTeam, error } = await supabase
        .from("team_members")
        .select("*, media_assets(path)")
        .eq("status", "published")
        .order("sort_order", { ascending: true });

      if (!error && dbTeam && dbTeam.length > 0) {
        const formatted = dbTeam.map((member: any) => ({
          id: member.id,
          name: member.name,
          role: member.role_title || member.role || "Staff Member",
          bio: member.bio || "",
          image: member.media_assets?.path || "/images/brand/jec.jpeg",
        }));
        return NextResponse.json({ success: true, team: formatted });
      }
    }
  } catch (err) {
    console.error("Public team API error:", err);
  }

  // Fallback to siteConfig team with JEC logo default
  const fallbackTeam = siteConfig.team.map((member) => ({
    name: member.name,
    role: member.role,
    bio: member.bio,
    image: member.image || "/images/brand/jec.jpeg",
  }));

  return NextResponse.json({ success: true, team: fallbackTeam });
}
