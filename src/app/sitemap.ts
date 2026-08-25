import type { MetadataRoute } from "next";
import prisma from "@/lib/db/prisma";

const siteUrl = "https://jyotieducations.edu.np";
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
  let cleanPath = path.replace(/ /g, "%20");
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

  try {
    const services = await prisma.service.findMany({
      where: { status: "published" },
      select: { slug: true, updated_at: true, image: { select: { path: true } } },
    });

    const serviceEntries = (services || []).map((service) => {
      const imagePath = service.image?.path;
      return {
        url: `${siteUrl}/services/${service.slug}`,
        lastModified: service.updated_at ? new Date(service.updated_at) : now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        images: imagePath ? [formatImageUrl(imagePath)] : undefined,
      };
    });

    const destinations = await prisma.destination.findMany({
      where: { status: "published" },
      select: { slug: true, updated_at: true },
    });

    const destinationEntries = (destinations || []).map((country) => ({
      url: `${siteUrl}/destinations/${country.slug}`,
      lastModified: country.updated_at ? new Date(country.updated_at) : now,
      changeFrequency: "monthly" as const,
      priority: 0.78,
    }));

    const blogs = await prisma.blogPost.findMany({
      where: { status: "published" },
      select: { slug: true, updated_at: true, cover_image: { select: { path: true } } },
    });

    const blogEntries = (blogs || []).map((blog) => {
      const imagePath = blog.cover_image?.path;
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
    return staticEntries;
  }
}
