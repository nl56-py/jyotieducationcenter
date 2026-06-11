"use client";

import { useRouter } from "next/navigation";
import { EntrancePage } from "@/views/EntrancePage";

export default function EntranceRoute() {
  const router = useRouter();
  return <EntrancePage navigate={(to: string) => router.push(to)} />;
}
