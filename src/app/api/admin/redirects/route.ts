import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getCurrentUser } from "@/lib/auth/guards";
import { hasPermission } from "@/lib/auth/roles";

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

    const { data: dbRedirects, error } = await supabase
      .from("redirects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching redirects:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json(dbRedirects);
  } catch (err: any) {
    console.error("Redirects API GET error:", err);
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
    const { source_path, target_path, status_code, is_active } = body;

    if (!source_path || !target_path) {
      return NextResponse.json({ success: false, error: "Missing source or target path" }, { status: 400 });
    }

    const { data: newRedirect, error } = await supabase
      .from("redirects")
      .insert({
        source_path,
        target_path,
        status_code: status_code ? parseInt(status_code) : 301,
        is_active: is_active !== undefined ? !!is_active : true,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, redirect: newRedirect });
  } catch (err: any) {
    console.error("Redirects API POST error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
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
    const { id, source_path, target_path, status_code, is_active } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing redirect ID" }, { status: 400 });
    }

    const updates: any = {};
    if (source_path !== undefined) updates.source_path = source_path;
    if (target_path !== undefined) updates.target_path = target_path;
    if (status_code !== undefined) updates.status_code = parseInt(status_code);
    if (is_active !== undefined) updates.is_active = !!is_active;

    const { error } = await supabase
      .from("redirects")
      .update(updates)
      .eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Redirects API PUT error:", err);
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
      return NextResponse.json({ success: false, error: "Forbidden: You do not have permission to delete content" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing redirect ID" }, { status: 400 });
    }

    let supabase: any;
    if (user.isMock) {
      supabase = createSupabaseAdminClient();
    } else {
      supabase = await createSupabaseServerClient();
    }

    if (!supabase) {
      return NextResponse.json({ success: false, error: "Supabase client not configured" }, { status: 500 });
    }

    const { error } = await supabase
      .from("redirects")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Redirects API DELETE error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
