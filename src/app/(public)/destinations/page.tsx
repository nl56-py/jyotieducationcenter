"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DestinationsRoute() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/destinations/uk");
  }, [router]);

  return null;
}

