"use client";

import { useRouter } from "next/navigation";
import { VideosPage } from "@/views/VideosPage";

export default function VideosGalleryRoute() {
  const router = useRouter();
  return <VideosPage />;
}
