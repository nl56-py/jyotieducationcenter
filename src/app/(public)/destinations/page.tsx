"use client";

import { useRouter } from "next/navigation";
import { DestinationsPage } from "@/views/DestinationsPage";
import { useDestinationTransition } from "./layout";
import { countries } from "@/data/countries";

export default function DestinationsRoute() {
  const router = useRouter();
  const { startTransition } = useDestinationTransition();

  const handleNavigate = (to: string) => {
    // Extract country slug from URL (e.g., /destinations/uk -> uk)
    const parts = to.split("/");
    const slug = parts[parts.length - 1];
    const country = countries.find((c) => c.slug === slug);

    if (country) {
      startTransition(country, to);
    } else {
      router.push(to);
    }
  };

  return <DestinationsPage navigate={handleNavigate} />;
}

