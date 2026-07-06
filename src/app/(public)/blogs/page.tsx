import { createSupabaseServerClient } from "@/lib/supabase/server";
import { BlogsPage } from "@/views/BlogsPage";

export const dynamic = "force-dynamic";

export default async function BlogsRoute() {
  const supabase = await createSupabaseServerClient();
  let mappedBlogs: any[] = [];

  if (supabase) {
    const { data: dbBlogs } = await supabase
      .from("blog_posts")
      .select(`
        *,
        blog_categories(name),
        cover_image:media_assets!blog_posts_cover_image_id_fkey(path)
      `)
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (dbBlogs) {
      mappedBlogs = dbBlogs.map((b: any) => {
        // Calculate read time
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
          category: b.blog_categories ? b.blog_categories.name : "Study Abroad Guides",
          date: b.published_at 
            ? new Date(b.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) 
            : new Date(b.created_at).toLocaleDateString(),
          readTime,
          image: b.cover_image?.path || "/images/generated/study-hero.png",
        };
      });
    }
  }

  return <BlogsPage blogs={mappedBlogs as any} />;
}
