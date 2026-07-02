import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getCurrentUser } from "@/lib/auth/guards";
import { hasPermission } from "@/lib/auth/roles";

const allowedTags = new Set([
  "home",
  "pages",
  "destinations",
  "blogs",
  "services",
  "testprep",
  "entrance",
  "team",
  "videos",
  "settings",
]);

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    if (!hasPermission(user.role, "manage:settings")) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const tags = Array.isArray(body.tags) ? body.tags : [];
    const paths = Array.isArray(body.paths) ? body.paths : [];
    const revalidatedTags: string[] = [];
    const revalidatedPaths: string[] = [];

    for (const tag of tags) {
      if (typeof tag === "string" && allowedTags.has(tag)) {
        revalidateTag(tag, {});
        revalidatedTags.push(tag);
      }
    }

    for (const path of paths) {
      if (typeof path === "string" && path.startsWith("/")) {
        revalidatePath(path);
        revalidatedPaths.push(path);
      }
    }

    return NextResponse.json({
      success: true,
      revalidatedTags,
      revalidatedPaths,
      purged_at: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
