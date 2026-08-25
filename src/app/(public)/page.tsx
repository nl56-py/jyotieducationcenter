import { HomePage } from "@/views/HomePage";
import db from "@/lib/db/client";

export const dynamic = "force-dynamic";

export default async function HomeRoute() {
  let testimonials: any[] = [];
  let destinations: any[] = [];
  let services: any[] = [];
  let blogs: any[] = [];
  let videos: any[] = [];

  try {
    const { data: tData } = await db.from("testimonials")
      .select("*, media_assets(path)")
      .eq("status", "published")
      .order("sort_order", { ascending: true });
    if (tData) testimonials = tData;
  } catch (e) {
    console.error("Error loading homepage testimonials:", e);
  }

  try {
    const { data: dData } = await db.from("destinations")
      .select("*")
      .eq("status", "published");
    if (dData) destinations = dData;
  } catch (e) {
    console.error("Error loading homepage destinations:", e);
  }

  try {
    const { data: sData } = await db.from("services")
      .select("*, media_assets(path)")
      .eq("status", "published")
      .order("sort_order", { ascending: true });
    if (sData) services = sData;
  } catch (e) {
    console.error("Error loading homepage services:", e);
  }

  try {
    const { data: bData } = await db.from("blog_posts")
      .select("*, blog_categories(name, slug), media_assets(path)")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(6);
    if (bData) blogs = bData;
  } catch (e) {
    console.error("Error loading homepage blogs:", e);
  }

  try {
    const { data: vData } = await db.from("videos")
      .select("*")
      .order("created_at", { ascending: false });
    if (vData) videos = vData;
  } catch (e) {
    console.error("Error loading homepage videos:", e);
  }

  return (
    <HomePage
      initialTestimonials={testimonials as any}
      initialDestinations={destinations as any}
      initialServices={services as any}
      initialBlogs={blogs as any}
      initialVideos={videos as any}
    />
  );
}
