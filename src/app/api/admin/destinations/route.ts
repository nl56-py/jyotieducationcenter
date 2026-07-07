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

    const { data: dbDests, error } = await supabase
      .from("destinations")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching destinations:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json(dbDests);
  } catch (err: any) {
    console.error("Destinations API GET error:", err);
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
    const { name, slug, cost_range, intake_badges, summary, featured, status, universities, detailed_fees, next_intake_label, next_intake_date, universities_detail, intro_copy, why, courses_list, requirements_detail, intakes_list, costs_list, scholarships_list, faq } = body;

    if (!name || !slug) {
      return NextResponse.json({ success: false, error: "Missing name or slug" }, { status: 400 });
    }

    const { data: newDest, error } = await supabase
      .from("destinations")
      .insert({
        name,
        slug,
        cost_range: cost_range || null,
        intake_badges: intake_badges || [],
        summary: summary || null,
        featured: !!featured,
        status: status || "draft",
        published_at: status === "published" ? new Date().toISOString() : null,
        universities: universities || [],
        detailed_fees: detailed_fees || null,
        university_cost: detailed_fees || null,
        next_intake_label: next_intake_label || null,
        next_intake_date: next_intake_date || null,
        universities_detail: universities_detail || [],
        intro_copy: intro_copy || [],
        why: why || [],
        courses_list: courses_list || [],
        requirements_detail: requirements_detail || {},
        intakes_list: intakes_list || [],
        costs_list: costs_list || [],
        scholarships_list: scholarships_list || [],
        faq: faq || [],
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, destination: newDest });
  } catch (err: any) {
    console.error("Destinations API POST error:", err);
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
    const { id, name, slug, cost_range, intake_badges, summary, featured, status, universities, detailed_fees, next_intake_label, next_intake_date, universities_detail, intro_copy, why, courses_list, requirements_detail, intakes_list, costs_list, scholarships_list, faq } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing destination ID" }, { status: 400 });
    }

    const updates: any = {};
    if (name !== undefined) updates.name = name;
    if (slug !== undefined) updates.slug = slug;
    if (cost_range !== undefined) updates.cost_range = cost_range || null;
    if (intake_badges !== undefined) updates.intake_badges = intake_badges || [];
    if (summary !== undefined) updates.summary = summary || null;
    if (featured !== undefined) updates.featured = !!featured;
    if (universities !== undefined) updates.universities = universities || [];
    if (detailed_fees !== undefined) {
      updates.detailed_fees = detailed_fees || null;
      updates.university_cost = detailed_fees || null;
    }
    if (next_intake_label !== undefined) updates.next_intake_label = next_intake_label || null;
    if (next_intake_date !== undefined) updates.next_intake_date = next_intake_date || null;
    if (universities_detail !== undefined) updates.universities_detail = universities_detail || [];
    if (intro_copy !== undefined) updates.intro_copy = intro_copy || [];
    if (why !== undefined) updates.why = why || [];
    if (courses_list !== undefined) updates.courses_list = courses_list || [];
    if (requirements_detail !== undefined) updates.requirements_detail = requirements_detail || {};
    if (intakes_list !== undefined) updates.intakes_list = intakes_list || [];
    if (costs_list !== undefined) updates.costs_list = costs_list || [];
    if (scholarships_list !== undefined) updates.scholarships_list = scholarships_list || [];
    if (faq !== undefined) updates.faq = faq || [];
    if (status !== undefined) {
      updates.status = status;
      if (status === "published") {
        updates.published_at = new Date().toISOString();
      } else {
        updates.published_at = null;
      }
    }

    updates.updated_at = new Date().toISOString();

    const { error } = await supabase
      .from("destinations")
      .update(updates)
      .eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Destinations API PUT error:", err);
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
      return NextResponse.json({ success: false, error: "Missing destination ID" }, { status: 400 });
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
      .from("destinations")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Destinations API DELETE error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
