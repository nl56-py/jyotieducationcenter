import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getCurrentUser } from "@/lib/auth/guards";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { password } = await request.json();
    if (!password || password.length < 6) {
      return NextResponse.json({ success: false, error: "Password must be at least 6 characters long" }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Database client not configured" }, { status: 500 });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    const cleanEmail = (user.email || "").toLowerCase();
    const emailCandidates = [cleanEmail];
    if (cleanEmail.endsWith("@jyotieducation.edu.np")) {
      emailCandidates.push(cleanEmail.replace("@jyotieducation.edu.np", "@jyotieducations.edu.np"));
    } else if (cleanEmail.endsWith("@jyotieducations.edu.np")) {
      emailCandidates.push(cleanEmail.replace("@jyotieducations.edu.np", "@jyotieducation.edu.np"));
    }

    let updateSuccess = false;
    let updateErrorMsg: string | null = null;

    if (user.id) {
      const { error: errId } = await supabase
        .from("admin_users")
        .update({ password_hash: hashedPassword })
        .eq("id", user.id);
      if (!errId) {
        updateSuccess = true;
      } else {
        updateErrorMsg = errId.message;
      }
    }

    for (const cand of emailCandidates) {
      const { error: errEmail } = await supabase
        .from("admin_users")
        .update({ password_hash: hashedPassword })
        .eq("email", cand);
      if (!errEmail) {
        updateSuccess = true;
      } else if (!updateErrorMsg) {
        updateErrorMsg = errEmail.message;
      }
    }

    if (!updateSuccess) {
      return NextResponse.json({ success: false, error: updateErrorMsg || "Failed to update password" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Password updated successfully" });
  } catch (err: any) {
    console.error("Profile password update error:", err);
    return NextResponse.json({ success: false, error: err.message || "Failed to update password" }, { status: 500 });
  }
}
