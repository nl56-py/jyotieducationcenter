import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getCurrentUser } from "@/lib/auth/guards";
import { hasPermission } from "@/lib/auth/roles";

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

    // Fetch leads with relations
    const { data: dbLeads, error } = await supabase
      .from("leads")
      .select(`
        *,
        assigned_admin:admin_users!assigned_to(full_name),
        lead_notes(
          id,
          note,
          created_at,
          author_admin:admin_users!author_admin_id(full_name)
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching leads:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // Format for UI consumption
    const mappedLeads = dbLeads.map((lead: any) => ({
      id: lead.id,
      full_name: lead.full_name,
      phone: lead.phone,
      email: lead.email,
      preferred_destination: lead.preferred_destination,
      course_interest: lead.course_interest,
      message: lead.message,
      source: lead.source,
      status: lead.status,
      assigned_name: lead.assigned_admin ? lead.assigned_admin.full_name : "Unassigned",
      notes: (lead.lead_notes || []).map((n: any) => ({
        id: n.id,
        note: n.note,
        author: n.author_admin ? n.author_admin.full_name : "System",
        created_at: n.created_at,
      })).sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
      created_at: lead.created_at,
    }));

    return NextResponse.json(mappedLeads);
  } catch (err: any) {
    console.error("Leads API GET error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // SECURITY (OWASP A01): Enforce manage:leads permission on write operations
    if (!hasPermission(user.role, "manage:leads")) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }
    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Supabase not configured" }, { status: 500 });
    }

    const body = await request.json();
    const { full_name, phone, email, preferred_destination, course_interest, message, source } = body;

    if (!full_name || !phone) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // 1. Insert the new lead
    const { data: newLead, error: leadError } = await supabase
      .from("leads")
      .insert({
        full_name,
        phone,
        email: email || null,
        preferred_destination: preferred_destination || null,
        course_interest: course_interest || null,
        message: message || null,
        source: source || "manual_entry",
        status: "new",
      })
      .select()
      .single();

    if (leadError) {
      return NextResponse.json({ success: false, error: leadError.message }, { status: 500 });
    }

    // 2. Add an opening lead note (if message exists or for logging creation)
    const authorAdminId = user.isMock ? null : user.id; // If logged in using mock, set author to null (System)
    
    await supabase
      .from("lead_notes")
      .insert({
        lead_id: newLead.id,
        author_admin_id: authorAdminId,
        note: message || "Lead manually registered in admin panel.",
      });

    return NextResponse.json({ success: true, lead: newLead });
  } catch (err: any) {
    console.error("Leads API POST error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // SECURITY (OWASP A01): Enforce manage:leads permission on write operations
    if (!hasPermission(user.role, "manage:leads")) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }
    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Supabase not configured" }, { status: 500 });
    }

    const body = await request.json();
    const { id, status, assigned_to, note } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing lead ID" }, { status: 400 });
    }

    const updates: any = {};
    const notesToInsert = [];
    const authorAdminId = user.isMock ? null : user.id;

    if (status !== undefined) {
      updates.status = status;
      notesToInsert.push({
        lead_id: id,
        author_admin_id: authorAdminId,
        note: `Status changed to ${status.replace("_", " ")}.`,
      });
    }

    if (assigned_to !== undefined) {
      updates.assigned_to = assigned_to || null;
      notesToInsert.push({
        lead_id: id,
        author_admin_id: authorAdminId,
        note: assigned_to ? `Assigned to counselor.` : `Lead unassigned.`,
      });
    }

    // Apply main field updates
    if (Object.keys(updates).length > 0) {
      const { error: updateError } = await supabase
        .from("leads")
        .update(updates)
        .eq("id", id);

      if (updateError) {
        return NextResponse.json({ success: false, error: updateError.message }, { status: 500 });
      }
    }

    // Insert any manual notes requested
    if (note) {
      notesToInsert.push({
        lead_id: id,
        author_admin_id: authorAdminId,
        note: note,
      });
    }

    // Write all notes to history
    if (notesToInsert.length > 0) {
      const { error: noteError } = await supabase
        .from("lead_notes")
        .insert(notesToInsert);
      
      if (noteError) {
        console.error("Failed to insert lead notes log:", noteError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Leads API PUT error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(user.role, "delete:leads")) {
      return NextResponse.json({ success: false, error: "Forbidden: You do not have permission to delete leads" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing lead ID" }, { status: 400 });
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
      .from("leads")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting lead:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Leads API DELETE error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
