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
      .from("pages")
      .select("*, page_sections(*)")
      .order("slug", { ascending: true })
      .order("sort_order", { referencedTable: "page_sections", ascending: true });

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
    const { mode, page, section } = body;

    if (mode === "section") {
      if (!section?.page_id || !section?.section_key || !section?.section_type) {
        return NextResponse.json({ success: false, error: "Missing section fields" }, { status: 400 });
      }

      const parsedBody = typeof section.body === "string" ? JSON.parse(section.body) : section.body || {};
      const { data, error } = await supabase
        .from("page_sections")
        .insert({
          page_id: section.page_id,
          section_key: section.section_key,
          section_type: section.section_type,
          title: section.title || null,
          subtitle: section.subtitle || null,
          body: parsedBody,
          sort_order: Number(section.sort_order || 0),
          status: section.status || "draft",
        })
        .select()
        .single();

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, section: data });
    }

    if (!page?.title || !page?.slug) {
      return NextResponse.json({ success: false, error: "Missing page title or slug" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("pages")
      .insert({
        title: page.title,
        slug: page.slug,
        page_type: page.page_type || "standard",
        status: page.status || "draft",
        seo_title: page.seo_title || null,
        seo_description: page.seo_description || null,
        canonical_path: page.canonical_path || null,
        published_at: page.status === "published" ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, page: data });
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
    const { mode, page, section } = body;

    if (mode === "section") {
      if (!section?.id) {
        return NextResponse.json({ success: false, error: "Missing section ID" }, { status: 400 });
      }

      const updates: Record<string, any> = {};
      ["section_key", "section_type", "title", "subtitle", "status"].forEach((key) => {
        if (section[key] !== undefined) updates[key] = section[key] || null;
      });
      if (section.body !== undefined) {
        updates.body = typeof section.body === "string" ? JSON.parse(section.body) : section.body;
      }
      if (section.sort_order !== undefined) {
        updates.sort_order = Number(section.sort_order || 0);
      }

      const { error } = await supabase.from("page_sections").update(updates).eq("id", section.id);
      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: true });
    }

    if (!page?.id) {
      return NextResponse.json({ success: false, error: "Missing page ID" }, { status: 400 });
    }

    const updates: Record<string, any> = {};
    ["title", "slug", "page_type", "status", "seo_title", "seo_description", "canonical_path"].forEach((key) => {
      if (page[key] !== undefined) updates[key] = page[key] || null;
    });
    if (page.status !== undefined) {
      updates.published_at = page.status === "published" ? new Date().toISOString() : null;
    }
    updates.updated_at = new Date().toISOString();

    const { error } = await supabase.from("pages").update(updates).eq("id", page.id);
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

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const mode = searchParams.get("mode");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }

    const table = mode === "section" ? "page_sections" : "pages";
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
