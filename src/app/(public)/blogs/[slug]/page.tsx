import { notFound } from "next/navigation";
import { BlogDetailPage } from "@/views/BlogDetailPage";
import db from "@/lib/db/client";

export const dynamic = "force-dynamic";

export default async function BlogDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch current blog post
  const { data: dbPost } = await db
    .from("blog_posts")
    .select("*, blog_categories(name, slug), media_assets(path)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!dbPost) {
    notFound();
  }

  // Parse paragraphs/blocks from content JSON or raw text
  let paragraphs: string[] = [];
  let blocks: any[] = [];
  
  if (typeof dbPost.content === "object" && dbPost.content?.blocks) {
    blocks = dbPost.content.blocks;
    paragraphs = blocks.map((block: any) => block.text || "");
  } else if (typeof dbPost.content === "string") {
    try {
      const parsed = JSON.parse(dbPost.content);
      if (parsed?.blocks) {
        blocks = parsed.blocks;
        paragraphs = blocks.map((block: any) => block.text || "");
      } else {
        paragraphs = [dbPost.content];
      }
    } catch (e) {
      paragraphs = [dbPost.content];
    }
  }

  const bodyText = paragraphs.join(" ");
  const words = bodyText.split(/\s+/).length;
  const readTime = `${Math.max(1, Math.ceil(words / 200))} min read`;

  const blog = {
    id: dbPost.id,
    slug: dbPost.slug,
    title: dbPost.title,
    excerpt: dbPost.excerpt || "",
    category: dbPost.blog_categories ? (dbPost.blog_categories.name || "Study Abroad Guides") : "Study Abroad Guides",
    date: dbPost.published_at 
      ? new Date(dbPost.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) 
      : new Date(dbPost.created_at || Date.now()).toLocaleDateString(),
    readTime,
    image: dbPost.media_assets?.path || dbPost.cover_image?.path || "/images/generated/study-hero.png",
    content: paragraphs,
    blocks: blocks.length > 0 ? blocks : undefined,
  };

  // Fetch related articles (excluding current post)
  let relatedBlogs: any[] = [];
  try {
    const { data: dbRelated } = await db
      .from("blog_posts")
      .select("*, blog_categories(name, slug)")
      .eq("status", "published")
      .neq("id", dbPost.id)
      .limit(3);

    if (dbRelated && Array.isArray(dbRelated)) {
      relatedBlogs = dbRelated.map((r: any) => ({
        slug: r.slug,
        title: r.title,
        category: r.blog_categories ? (r.blog_categories.name || "Study Abroad Guides") : "Study Abroad Guides",
      }));
    }
  } catch (e) {
    console.error("Error fetching related blogs:", e);
  }

  return <BlogDetailPage blog={blog} relatedBlogs={relatedBlogs as any} />;
}
