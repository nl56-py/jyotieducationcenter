import { notFound } from "next/navigation";
import { BlogDetailPage } from "@/views/BlogDetailPage";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";


export default async function BlogDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    notFound();
  }

  // Fetch current blog post
  const { data: dbPost } = await supabase
    .from("blog_posts")
    .select(`
      *,
      blog_categories(name),
      cover_image:media_assets!blog_posts_cover_image_id_fkey(path)
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!dbPost) {
    notFound();
  }

  // Parse paragraphs from content JSON or raw text
  let paragraphs: string[] = [];
  if (typeof dbPost.content === "object" && dbPost.content?.blocks) {
    paragraphs = dbPost.content.blocks.map((block: any) => block.text || "");
  } else if (dbPost.content) {
    paragraphs = [dbPost.content];
  }

  // Calculate read time
  const bodyText = paragraphs.join(" ");
  const words = bodyText.split(/\s+/).length;
  const readTime = `${Math.max(1, Math.ceil(words / 200))} min read`;

  const blog = {
    id: dbPost.id,
    slug: dbPost.slug,
    title: dbPost.title,
    excerpt: dbPost.excerpt || "",
    category: dbPost.blog_categories ? dbPost.blog_categories.name : "Study Abroad Guides",
    date: dbPost.published_at 
      ? new Date(dbPost.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) 
      : new Date(dbPost.created_at).toLocaleDateString(),
    readTime,
    image: dbPost.cover_image?.path || "/images/generated/study-hero.png",
    content: paragraphs,
  };

  // Fetch related articles (same category, excluding current post)
  let relatedBlogs: any[] = [];
  if (dbPost.category_id) {
    const { data: dbRelated } = await supabase
      .from("blog_posts")
      .select(`
        *,
        blog_categories(name)
      `)
      .eq("category_id", dbPost.category_id)
      .eq("status", "published")
      .neq("id", dbPost.id)
      .limit(3);

    if (dbRelated) {
      relatedBlogs = dbRelated.map((r: any) => ({
        slug: r.slug,
        title: r.title,
        category: r.blog_categories ? r.blog_categories.name : "Study Abroad Guides",
      }));
    }
  }

  return <BlogDetailPage blog={blog} relatedBlogs={relatedBlogs as any} />;
}
