import { requirePermission } from "@/lib/auth/guards";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Enforce Server-Side Permission Guard (Requires export:leads permission)
    await requirePermission("export:leads");

    let leads: any[] = [];

    // 2. Fetch all leads from Supabase
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("leads")
        .select("full_name, phone, email, preferred_destination, course_interest, source, status, created_at")
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Supabase query error during export:", error);
        throw new Error("Query failed");
      }
      if (data) leads = data;
    } else {
      // Mock data fallback for local dev
      leads = [
        {
          full_name: "Ram Bahadur",
          phone: "+9779851012345",
          email: "ram@gmail.com",
          preferred_destination: "Australia",
          course_interest: "Bachelor of IT",
          source: "home_form",
          status: "new",
          created_at: new Date().toISOString()
        },
        {
          full_name: "Sita Kumari",
          phone: "+9779841987654",
          email: "sita@outlook.com",
          preferred_destination: "Canada",
          course_interest: "Diploma",
          source: "consultation_form",
          status: "contacted",
          created_at: new Date().toISOString()
        }
      ];
    }

    // 3. Construct CSV
    const headers = ["Full Name", "Phone", "Email", "Preferred Destination", "Course Interest", "Source", "Status", "Created At"];
    const csvContent = [
      headers.join(","),
      ...leads.map(l => [
        `"${l.full_name.replace(/"/g, '""')}"`,
        `"${l.phone}"`,
        `"${(l.email || "").replace(/"/g, '""')}"`,
        `"${(l.preferred_destination || "").replace(/"/g, '""')}"`,
        `"${(l.course_interest || "").replace(/"/g, '""')}"`,
        `"${l.source}"`,
        `"${l.status}"`,
        `"${new Date(l.created_at).toISOString()}"`
      ].join(","))
    ].join("\n");

    // 4. Return as CSV download attachment
    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="edumark_leads_export_${Date.now()}.csv"`,
        "Cache-Control": "no-store",
      }
    });
  } catch (error: any) {
    console.error("CSV Export failure:", error);
    return NextResponse.json(
      { error: error.message || "Forbidden" },
      { status: error.message?.includes("Forbidden") ? 403 : 500 }
    );
  }
}
