"use client";

import { useRouter } from "next/navigation";
import { Engineering } from "@/views/Engineering";

export default function EngineeringRoute() {
  const router = useRouter();
  return <Engineering navigate={(to: string) => router.push(to)} />;
}
