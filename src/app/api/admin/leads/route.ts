import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getCurrentUser } from "@/lib/auth/guards";
import { hasPermission } from "@/lib/auth/roles";
import { getPool } from "@/lib/db/client";
import crypto from "crypto";

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

    // Fetch leads
    const { data: dbLeads, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching leads:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    const leadsList = dbLeads || [];
    const leadIds = leadsList.map((l: any) => l.id);

    // Fetch lead_notes and admin users directly via pool
    const notesMap: Record<string, any[]> = {};
    let adminMap: Record<string, string> = {};

    try {
      const pool = getPool();
      
      const [adminRows] = await pool.query(`SELECT id, full_name FROM \`admin_users\``);
      for (const a of (adminRows as any[])) {
        adminMap[a.id] = a.full_name;
      }

      if (leadIds.length > 0) {
        const placeholders = leadIds.map(() => "?").join(",");
        const [noteRows] = await pool.query(
          `SELECT ln.*, au.full_name as author_name 
           FROM \`lead_notes\` ln 
           LEFT JOIN \`admin_users\` au ON ln.author_admin_id = au.id 
           WHERE ln.lead_id IN (${placeholders}) 
           ORDER BY ln.created_at DESC`,
          leadIds
        );

        for (const nr of (noteRows as any[])) {
          if (!notesMap[nr.lead_id]) notesMap[nr.lead_id] = [];
          notesMap[nr.lead_id].push({
            id: nr.id,
            note: nr.note,
            author: nr.author_name || "Counselor",
            created_at: nr.created_at,
          });
        }
      }
    } catch (dbQueryErr) {
      console.warn("Notice: lead_notes or admin_users secondary query notice:", dbQueryErr);
    }

    // Format for UI consumption
    const mappedLeads = leadsList.map((lead: any) => ({
      id: lead.id,
      full_name: lead.full_name,
      phone: lead.phone,
      email: lead.email,
      preferred_destination: lead.preferred_destination,
      course_interest: lead.course_interest,
      message: lead.message,
      source: lead.source,
      status: lead.status,
      assigned_to: lead.assigned_to,
      assigned_name: lead.assigned_to && adminMap[lead.assigned_to] ? adminMap[lead.assigned_to] : "Unassigned",
      notes: notesMap[lead.id] || [],
      created_at: lead.created_at,
      updated_at: lead.updated_at,
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
    const authorAdminId = user.isMock ? null : user.id;
    try {
      const pool = getPool();
      await pool.query(
        `INSERT INTO \`lead_notes\` (\`id\`, \`lead_id\`, \`author_admin_id\`, \`note\`) VALUES (?, ?, ?, ?)`,
        [crypto.randomUUID(), newLead.id, authorAdminId, message || "Lead manually registered in admin panel."]
      );
    } catch (e) {
      console.warn("Failed to insert opening note:", e);
    }

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
    const { 
      id, 
      full_name, 
      phone, 
      email, 
      preferred_destination, 
      course_interest, 
      message, 
      status, 
      assigned_to, 
      note 
    } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing lead ID" }, { status: 400 });
    }

    const updates: any = {};
    const notesToInsert: { lead_id: string; author_admin_id: string | null; note: string }[] = [];
    const authorAdminId = user.isMock ? null : user.id;

    if (full_name !== undefined) updates.full_name = full_name;
    if (phone !== undefined) updates.phone = phone;
    if (email !== undefined) updates.email = email || null;
    if (preferred_destination !== undefined) updates.preferred_destination = preferred_destination || null;
    if (course_interest !== undefined) updates.course_interest = course_interest || null;
    if (message !== undefined) updates.message = message || null;

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
    if (note && note.trim()) {
      notesToInsert.push({
        lead_id: id,
        author_admin_id: authorAdminId,
        note: note.trim(),
      });
    }

    // Write all notes to history directly via pool
    if (notesToInsert.length > 0) {
      try {
        const pool = getPool();
        for (const n of notesToInsert) {
          await pool.query(
            `INSERT INTO \`lead_notes\` (\`id\`, \`lead_id\`, \`author_admin_id\`, \`note\`) VALUES (?, ?, ?, ?)`,
            [crypto.randomUUID(), n.lead_id, n.author_admin_id, n.note]
          );
        }
      } catch (noteError) {
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
