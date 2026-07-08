import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const siteUrl = "https://edumark.com.np";
const now = new Date();

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/destinations", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/test-preparation", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/entrance-preparations", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/blogs", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/videos-gallery", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/notices", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/events", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/book-free-consultation", priority: 0.9, changeFrequency: "weekly" as const },
];

function formatImageUrl(path: string): string {
  if (!path) return "";
  
  // Replace the old domain with the correct domain if absolute
  let cleanPath = path.replace(/edumark\.edu\.np/g, "edumark.com.np");
  
  // Remove spaces
  cleanPath = cleanPath.replace(/ /g, "%20");
  
  if (cleanPath.startsWith("http://") || cleanPath.startsWith("https://")) {
    return cleanPath;
  }
  
  if (cleanPath.startsWith("/")) {
    return `${siteUrl}${cleanPath}`;
  }
  
  return `${siteUrl}/${cleanPath}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const isConfigured = 
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder-project") &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!isConfigured) {
    return staticEntries;
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Fetch dynamic services
    const { data: services } = await supabase
      .from("services")
      .select(`
        slug,
        updated_at,
        media_assets:image_id ( path )
      `)
      .eq("status", "published");

    const serviceEntries = (services || []).map((service: any) => {
      const imagePath = service.media_assets?.path;
      return {
        url: `${siteUrl}/services/${service.slug}`,
        lastModified: service.updated_at ? new Date(service.updated_at) : now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        images: imagePath ? [formatImageUrl(imagePath)] : undefined,
      };
    });

    // Fetch dynamic destinations
    const { data: destinations } = await supabase
      .from("destinations")
      .select("slug, updated_at")
      .eq("status", "published");

    const destinationEntries = (destinations || []).map((country: any) => ({
      url: `${siteUrl}/destinations/${country.slug}`,
      lastModified: country.updated_at ? new Date(country.updated_at) : now,
      changeFrequency: "monthly" as const,
      priority: 0.78,
    }));

    // Fetch dynamic blogs
    const { data: blogs } = await supabase
      .from("blog_posts")
      .select(`
        slug,
        updated_at,
        media_assets:cover_image_id ( path )
      `)
      .eq("status", "published");

    const blogEntries = (blogs || []).map((blog: any) => {
      const imagePath = blog.media_assets?.path;
      return {
        url: `${siteUrl}/blogs/${blog.slug}`,
        lastModified: blog.updated_at ? new Date(blog.updated_at) : now,
        changeFrequency: "monthly" as const,
        priority: 0.65,
        images: imagePath ? [formatImageUrl(imagePath)] : undefined,
      };
    });

    return [...staticEntries, ...serviceEntries, ...destinationEntries, ...blogEntries];
  } catch (err) {
    console.error("Error generating dynamic sitemap:", err);
    return staticEntries;
  }
}

