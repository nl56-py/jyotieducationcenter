import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/guards";
import { hasPermission } from "@/lib/auth/roles";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function getWritableClient(user: { isMock?: boolean }) {
  return user.isMock ? createSupabaseAdminClient() : await createSupabaseServerClient();
}

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

    const { data, error } = await supabase
      .from("homepage_popup_banners")
      .select("*, media_assets(path)")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    if (!hasPermission(user.role, "manage:content")) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const supabase = await getWritableClient(user);
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Supabase not configured" }, { status: 500 });
    }

    const body = await request.json();
    const { title, subtitle, bodyText, cta_label, cta_href, image_id, display_mode, starts_at, ends_at, sort_order, status } = body;

    if (!title) {
      return NextResponse.json({ success: false, error: "Missing title" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("homepage_popup_banners")
      .insert({
        title,
        subtitle: subtitle || null,
        body: bodyText || null,
        cta_label: cta_label || null,
        cta_href: cta_href || null,
        image_id: image_id || null,
        display_mode: display_mode || "modal",
        starts_at: starts_at || null,
        ends_at: ends_at || null,
        sort_order: sort_order !== undefined ? Number(sort_order) : 0,
        status: status || "draft",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, banner: data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    if (!hasPermission(user.role, "manage:content")) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const supabase = await getWritableClient(user);
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Supabase not configured" }, { status: 500 });
    }

    const body = await request.json();
    const { id, title, subtitle, bodyText, cta_label, cta_href, image_id, display_mode, starts_at, ends_at, sort_order, status } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing banner ID" }, { status: 400 });
    }

    const updates: Record<string, any> = { updated_at: new Date().toISOString() };
    if (title !== undefined) updates.title = title;
    if (subtitle !== undefined) updates.subtitle = subtitle || null;
    if (bodyText !== undefined) updates.body = bodyText || null;
    if (cta_label !== undefined) updates.cta_label = cta_label || null;
    if (cta_href !== undefined) updates.cta_href = cta_href || null;
    if (image_id !== undefined) updates.image_id = image_id || null;
    if (display_mode !== undefined) updates.display_mode = display_mode;
    if (starts_at !== undefined) updates.starts_at = starts_at || null;
    if (ends_at !== undefined) updates.ends_at = ends_at || null;
    if (sort_order !== undefined) updates.sort_order = Number(sort_order || 0);
    if (status !== undefined) updates.status = status;

    const { error } = await supabase.from("homepage_popup_banners").update(updates).eq("id", id);
    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    if (!hasPermission(user.role, "manage:content")) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const supabase = await getWritableClient(user);
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Supabase not configured" }, { status: 500 });
    }

    const id = new URL(request.url).searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing banner ID" }, { status: 400 });
    }

    const { error } = await supabase.from("homepage_popup_banners").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
