"use client";

import { useRouter } from "next/navigation";
import { CEE } from "@/views/CEE";

export default function CEERoute() {
  const router = useRouter();
  return <CEE navigate={(to: string) => router.push(to)} />;
}
