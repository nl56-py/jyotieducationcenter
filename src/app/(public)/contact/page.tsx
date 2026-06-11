"use client";

import { useRouter } from "next/navigation";
import { ContactPage } from "@/views/ContactPage";

export default function ContactRoute() {
  const router = useRouter();
  return <ContactPage navigate={(to: string) => router.push(to)} />;
}
