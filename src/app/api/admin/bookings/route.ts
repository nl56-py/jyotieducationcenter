import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/guards";

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Supabase not configured" }, { status: 500 });
    }

    const { data: dbBookings, error } = await supabase
      .from("consultation_bookings")
      .select(`
        *,
        assigned_admin:admin_users!assigned_to(full_name)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching bookings:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    const mappedBookings = dbBookings.map((b: any) => ({
      id: b.id,
      full_name: b.full_name,
      phone: b.phone,
      email: b.email,
      preferred_destination: b.preferred_destination,
      course_interest: b.course_interest,
      preferred_date: b.preferred_date,
      preferred_time: b.preferred_time,
      message: b.message,
      status: b.status,
      assigned_name: b.assigned_admin ? b.assigned_admin.full_name : "Unassigned",
      created_at: b.created_at,
    }));

    return NextResponse.json(mappedBookings);
  } catch (err: any) {
    console.error("Bookings API GET error:", err);
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
    const { id, status, assigned_to } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing booking ID" }, { status: 400 });
    }

    const updates: any = {};
    if (status !== undefined) updates.status = status;
    if (assigned_to !== undefined) updates.assigned_to = assigned_to || null;

    if (Object.keys(updates).length > 0) {
      const { error } = await supabase
        .from("consultation_bookings")
        .update(updates)
        .eq("id", id);

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Bookings API PUT error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
