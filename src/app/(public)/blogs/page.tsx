"use client";

import { useRouter } from "next/navigation";
import { BlogsPage } from "@/views/BlogsPage";

export default function BlogsRoute() {
  const router = useRouter();
  return <BlogsPage navigate={(to: string) => router.push(to)} />;
}
