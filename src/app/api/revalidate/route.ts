import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");
    const tag = searchParams.get("tag");

    // 1. Verify Revalidation Secret Token (Security A02)
    if (!secret || secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid revalidation secret token" },
        { status: 401 }
      );
    }

    // 2. Validate tag param
    if (!tag) {
      return NextResponse.json(
        { error: "Bad Request: Missing tag parameter to revalidate" },
        { status: 400 }
      );
    }

    // 3. Trigger Next.js Data Cache Tag purging
    revalidateTag(tag, {});

    return NextResponse.json({ 
      revalidated: true, 
      tag, 
      purged_at: new Date().toISOString() 
    });
  } catch (error: any) {
    console.error("Cache revalidation route error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
