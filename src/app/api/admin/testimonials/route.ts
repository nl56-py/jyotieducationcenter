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

    const { data: dbTestimonials, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Error fetching testimonials:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json(dbTestimonials);
  } catch (err: any) {
    console.error("Testimonials API GET error:", err);
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
    const { student_name, destination, quote, sort_order, status } = body;

    if (!student_name || !quote) {
      return NextResponse.json({ success: false, error: "Missing student name or quote text" }, { status: 400 });
    }

    const { data: newTestimonial, error } = await supabase
      .from("testimonials")
      .insert({
        student_name,
        destination: destination || null,
        quote,
        sort_order: sort_order !== undefined ? parseInt(sort_order) : 0,
        status: status || "draft",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, testimonial: newTestimonial });
  } catch (err: any) {
    console.error("Testimonials API POST error:", err);
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
    const { id, student_name, destination, quote, sort_order, status } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing testimonial ID" }, { status: 400 });
    }

    const updates: any = {};
    if (student_name !== undefined) updates.student_name = student_name;
    if (destination !== undefined) updates.destination = destination || null;
    if (quote !== undefined) updates.quote = quote;
    if (sort_order !== undefined) updates.sort_order = parseInt(sort_order);
    if (status !== undefined) updates.status = status;

    updates.updated_at = new Date().toISOString();

    const { error } = await supabase
      .from("testimonials")
      .update(updates)
      .eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Testimonials API PUT error:", err);
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
      return NextResponse.json({ success: false, error: "Missing testimonial ID" }, { status: 400 });
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
      .from("testimonials")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Testimonials API DELETE error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
