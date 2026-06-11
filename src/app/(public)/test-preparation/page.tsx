"use client";

import { useRouter } from "next/navigation";
import { TestPreparationPage } from "@/views/TestPreparationPage";

export default function TestPreparationRoute() {
  const router = useRouter();
  return <TestPreparationPage navigate={(to: string) => router.push(to)} />;
}
