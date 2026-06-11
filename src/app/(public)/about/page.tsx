"use client";

import { useRouter } from "next/navigation";
import { AboutPage } from "@/views/AboutPage";

export default function AboutRoute() {
  const router = useRouter();
  return <AboutPage navigate={(to: string) => router.push(to)} />;
}
