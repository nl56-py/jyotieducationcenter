"use client";

import { useRouter } from "next/navigation";
import { CMAT } from "@/views/CMAT";

export default function CMATRoute() {
  const router = useRouter();
  return <CMAT navigate={(to: string) => router.push(to)} />;
}
