"use client";

import { useRouter } from "next/navigation";
import { Medical } from "@/views/medical";

export default function MedicalRoute() {
  const router = useRouter();
  return <Medical navigate={(to: string) => router.push(to)} />;
}
