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
      .from("notices_events")
      .select("*")
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
    const { slug, type, title, excerpt, bodyText, event_date, location, cta_label, cta_href, featured, sort_order, status } = body;

    if (!slug || !title || !type) {
      return NextResponse.json({ success: false, error: "Missing slug, type, or title" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("notices_events")
      .insert({
        slug,
        type,
        title,
        excerpt: excerpt || null,
        body: { html: bodyText || "" },
        event_date: event_date || null,
        location: location || null,
        cta_label: cta_label || null,
        cta_href: cta_href || null,
        featured: !!featured,
        sort_order: sort_order !== undefined ? Number(sort_order) : 0,
        status: status || "draft",
        published_at: status === "published" ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, notice: data });
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
    const { id, slug, type, title, excerpt, bodyText, event_date, location, cta_label, cta_href, featured, sort_order, status } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing notice ID" }, { status: 400 });
    }

    const updates: Record<string, any> = { updated_at: new Date().toISOString() };
    if (slug !== undefined) updates.slug = slug;
    if (type !== undefined) updates.type = type;
    if (title !== undefined) updates.title = title;
    if (excerpt !== undefined) updates.excerpt = excerpt || null;
    if (bodyText !== undefined) updates.body = { html: bodyText || "" };
    if (event_date !== undefined) updates.event_date = event_date || null;
    if (location !== undefined) updates.location = location || null;
    if (cta_label !== undefined) updates.cta_label = cta_label || null;
    if (cta_href !== undefined) updates.cta_href = cta_href || null;
    if (featured !== undefined) updates.featured = !!featured;
    if (sort_order !== undefined) updates.sort_order = Number(sort_order || 0);
    if (status !== undefined) {
      updates.status = status;
      updates.published_at = status === "published" ? new Date().toISOString() : null;
    }

    const { error } = await supabase.from("notices_events").update(updates).eq("id", id);
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
      return NextResponse.json({ success: false, error: "Missing notice ID" }, { status: 400 });
    }

    const { error } = await supabase.from("notices_events").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
