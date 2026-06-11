"use client";

import { useRouter } from "next/navigation";
import { ServicesPage } from "@/views/ServicesPage";

export default function ServicesRoute() {
  const router = useRouter();
  return <ServicesPage navigate={(to: string) => router.push(to)} />;
}
