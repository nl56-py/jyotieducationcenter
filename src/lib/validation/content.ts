import { z } from "zod";

export const BlogPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200, "Title is too long"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug must be alphanumeric with hyphens only"),
  excerpt: z.string().max(500, "Excerpt is too long").optional(),
  content: z.any(), // JSON block format
  categoryId: z.string().uuid("Invalid category ID").or(z.literal("")).nullable(),
  coverImageId: z.string().uuid("Invalid cover image").or(z.literal("")).nullable(),
  status: z.enum(["draft", "review", "published", "archived"]).default("draft"),
  featured: z.boolean().default(false),
  seoTitle: z.string().max(100, "SEO Title is too long").optional(),
  seoDescription: z.string().max(250, "SEO Description is too long").optional(),
});

export const DestinationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  countryCode: z.string().length(2, "Country code must be exactly 2 characters").optional(),
  summary: z.string().max(500).optional(),
  heroTitle: z.string().max(200).optional(),
  heroBody: z.string().max(1000).optional(),
  costRange: z.string().max(100).optional(),
  intakeBadges: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  status: z.enum(["draft", "review", "published", "archived"]).default("draft"),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const TestimonialSchema = z.object({
  studentName: z.string().min(2, "Student name must be at least 2 characters"),
  destination: z.string().optional(),
  quote: z.string().min(10, "Quote must be at least 10 characters").max(1000),
  imageId: z.string().uuid().or(z.literal("")).nullable(),
  status: z.enum(["draft", "review", "published", "archived"]).default("draft"),
  sortOrder: z.number().int().optional(),
});
