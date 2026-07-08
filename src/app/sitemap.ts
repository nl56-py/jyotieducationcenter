import type { MetadataRoute } from "next";
import { blogs } from "@/data/blogs";
import { countries } from "@/data/countries";
import { services } from "@/data/services";

const siteUrl = "https://edumark.edu.np";
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
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/book-free-consultation", priority: 0.9, changeFrequency: "weekly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const serviceEntries = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    images: [`${siteUrl}${service.image.replace(/ /g, "%20")}`],
  }));

  const destinationEntries = countries.map((country) => ({
    url: `${siteUrl}/destinations/${country.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.78,
  }));

  const blogEntries = blogs.map((blog) => ({
    url: `${siteUrl}/blogs/${blog.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
    images: blog.image ? [`${siteUrl}${blog.image}`] : undefined,
  }));

  return [...staticEntries, ...serviceEntries, ...destinationEntries, ...blogEntries];
}
