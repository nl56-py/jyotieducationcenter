"use client";

import { useRouter } from "next/navigation";
import { DestinationsPage } from "@/views/DestinationsPage";

export default function DestinationsRoute() {
  const router = useRouter();
  return <DestinationsPage navigate={(to: string) => router.push(to)} />;
}
