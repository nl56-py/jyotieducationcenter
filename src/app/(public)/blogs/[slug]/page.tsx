import { notFound } from "next/navigation";
import { blogs } from "@/data/blogs";
import { BlogDetailPage } from "@/views/BlogDetailPage";

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return <BlogDetailPage blog={blog} />;
}
