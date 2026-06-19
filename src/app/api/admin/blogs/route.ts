import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/guards";

const categorySlugMap: Record<string, string> = {
  "Study Abroad Guides": "study-abroad",
  "Test Prep Tips": "test-prep",
  "Visa Advice": "student-visa",
};

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

    // Query blog posts with their categories
    const { data: dbBlogs, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        blog_categories(name)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blogs:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // Format for UI consumption
    const mappedBlogs = dbBlogs.map((b: any) => ({
      id: b.id,
      slug: b.slug,
      title: b.title,
      excerpt: b.excerpt,
      category: b.blog_categories ? b.blog_categories.name : "Study Abroad Guides",
      status: b.status,
      featured: b.featured,
      published_at: b.published_at ? new Date(b.published_at).toLocaleDateString() : null,
      bodyText: typeof b.content === "object" && b.content?.blocks ? b.content.blocks[0]?.text || "" : b.content || "",
      seoTitle: b.seo_title,
      seoDesc: b.seo_description,
    }));

    return NextResponse.json(mappedBlogs);
  } catch (err: any) {
    console.error("Blogs API GET error:", err);
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
    const { slug, title, excerpt, category, status, featured, bodyText, seoTitle, seoDesc } = body;

    if (!title || !slug) {
      return NextResponse.json({ success: false, error: "Missing title or slug" }, { status: 400 });
    }

    // Get category ID from slug map
    const catSlug = categorySlugMap[category] || "study-abroad";
    const { data: catData } = await supabase
      .from("blog_categories")
      .select("id")
      .eq("slug", catSlug)
      .single();

    const authorAdminId = user.isMock ? null : user.id;

    // Structured JSONB content matching seed format
    const contentJson = {
      blocks: [
        {
          type: "paragraph",
          text: bodyText || "",
        },
      ],
    };

    const { data: newPost, error } = await supabase
      .from("blog_posts")
      .insert({
        slug,
        title,
        excerpt: excerpt || null,
        content: contentJson,
        category_id: catData ? catData.id : null,
        status: status || "draft",
        featured: !!featured,
        published_at: status === "published" ? new Date().toISOString() : null,
        author_admin_id: authorAdminId,
        seo_title: seoTitle || null,
        seo_description: seoDesc || null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, post: newPost });
  } catch (err: any) {
    console.error("Blogs API POST error:", err);
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
    const { id, slug, title, excerpt, category, status, featured, bodyText, seoTitle, seoDesc } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing blog post ID" }, { status: 400 });
    }

    const updates: any = {};
    if (slug !== undefined) updates.slug = slug;
    if (title !== undefined) updates.title = title;
    if (excerpt !== undefined) updates.excerpt = excerpt || null;
    if (featured !== undefined) updates.featured = !!featured;
    if (seoTitle !== undefined) updates.seo_title = seoTitle || null;
    if (seoDesc !== undefined) updates.seo_description = seoDesc || null;

    if (status !== undefined) {
      updates.status = status;
      if (status === "published") {
        updates.published_at = new Date().toISOString();
      } else if (status === "archived" || status === "draft") {
        updates.published_at = null;
      }
    }

    if (category !== undefined) {
      const catSlug = categorySlugMap[category] || "study-abroad";
      const { data: catData } = await supabase
        .from("blog_categories")
        .select("id")
        .eq("slug", catSlug)
        .single();
      if (catData) {
        updates.category_id = catData.id;
      }
    }

    if (bodyText !== undefined) {
      updates.content = {
        blocks: [
          {
            type: "paragraph",
            text: bodyText || "",
          },
        ],
      };
    }

    if (Object.keys(updates).length > 0) {
      const { error } = await supabase
        .from("blog_posts")
        .update(updates)
        .eq("id", id);

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Blogs API PUT error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
