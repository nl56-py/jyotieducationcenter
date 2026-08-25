import db from "@/lib/db/client";
import { BlogsPage } from "@/views/BlogsPage";

export const dynamic = "force-dynamic";

export default async function BlogsRoute() {
  let mappedBlogs: any[] = [];

  try {
    const { data: dbBlogs } = await db
      .from("blog_posts")
      .select("*, blog_categories(name, slug), media_assets(path)")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (dbBlogs && Array.isArray(dbBlogs)) {
      mappedBlogs = dbBlogs.map((b: any) => {
        let bodyText = "";
        if (typeof b.content === "object" && b.content?.blocks) {
          bodyText = b.content.blocks.map((bl: any) => bl.text || "").join(" ");
        } else {
          bodyText = b.content || "";
        }
        const words = bodyText.split(/\s+/).length;
        const readTime = `${Math.max(1, Math.ceil(words / 200))} min read`;

        return {
          id: b.id,
          slug: b.slug,
          title: b.title,
          excerpt: b.excerpt || "",
          category: b.blog_categories ? (b.blog_categories.name || "Study Abroad Guides") : "Study Abroad Guides",
          date: b.published_at 
            ? new Date(b.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) 
            : new Date(b.created_at || Date.now()).toLocaleDateString(),
          readTime,
          image: b.media_assets?.path || b.cover_image?.path || "/images/generated/study-hero.png",
        };
      });
    }
  } catch (e) {
    console.error("Error fetching blogs for route:", e);
  }

  return <BlogsPage blogs={mappedBlogs as any} />;
}
