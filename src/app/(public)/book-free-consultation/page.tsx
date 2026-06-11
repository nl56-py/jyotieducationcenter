"use client";

import { useRouter } from "next/navigation";
import { BookingPage } from "@/views/BookingPage";

export default function BookingRoute() {
  const router = useRouter();
  return <BookingPage />;
}
