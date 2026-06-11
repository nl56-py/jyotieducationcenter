"use client";

import { useRouter } from "next/navigation";
import { HomePage } from "@/views/HomePage";

export default function HomeRoute() {
  const router = useRouter();

  const navigate = (to: string) => {
    router.push(to);
  };

  return <HomePage navigate={navigate} />;
}
