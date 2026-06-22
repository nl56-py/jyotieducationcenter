import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/guards";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Supabase not configured" }, { status: 500 });
    }

    const { data: dbSettings, error } = await supabase
      .from("site_settings")
      .select("*");

    if (error) {
      console.error("Error fetching site settings:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // Merge array of settings into a single key-value dictionary for easy client use
    const settingsMap: Record<string, any> = {};
    dbSettings.forEach((item: any) => {
      settingsMap[item.key] = item.value;
    });

    return NextResponse.json(settingsMap);
  } catch (err: any) {
    console.error("Settings API GET error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Supabase not configured" }, { status: 500 });
    }

    const body = await request.json();
    const { key, value, description } = body;

    if (!key || value === undefined) {
      return NextResponse.json({ success: false, error: "Missing key or value" }, { status: 400 });
    }

    const authorAdminId = user.isMock ? null : user.id;

    // Upsert site settings row
    const { data: upserted, error } = await supabase
      .from("site_settings")
      .upsert({
        key,
        value,
        description: description || null,
        updated_by: authorAdminId,
        updated_at: new Date().toISOString()
      }, { onConflict: "key" })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, setting: upserted });
  } catch (err: any) {
    console.error("Settings API POST error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
