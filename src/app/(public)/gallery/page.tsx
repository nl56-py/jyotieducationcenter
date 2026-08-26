import { createSupabaseServerClient } from "@/lib/supabase/server";
import { GalleryPage } from "@/views/GalleryPage";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Photo Gallery — Jyoti Education Corner Pvt. Ltd.",
  description: "View photos of our offices, student success stories, events, and activities at Jyoti Educations.",
};

const DEFAULT_GALLERY_PHOTOS = [
  {
    id: "default-1",
    path: "/images/generated/counselling.png",
    fileName: "student-counselling.png",
    altText: "Jyoti Educations Counseling Session",
    caption: "Personalized Study Abroad Counseling Session",
  },
  {
    id: "default-2",
    path: "/images/generated/student-success.png",
    fileName: "student-success.png",
    altText: "Jyoti Educations Student Visa Success",
    caption: "Celebrating Student Visa Grant Success",
  },
  {
    id: "default-3",
    path: "/images/brochure/hero-background.jpg",
    fileName: "office-environment.jpg",
    altText: "Jyoti Educations Main Office & Study Center",
    caption: "Our State-of-the-Art Student Counseling Center",
  },
  {
    id: "default-4",
    path: "/images/Servicepage.png",
    fileName: "service-page.png",
    altText: "Abroad Study & Test Preparation Orientation",
    caption: "Comprehensive Pre-Departure & Test Prep Orientation",
  },
  {
    id: "default-5",
    path: "/images/about-hero.jpg",
    fileName: "about-hero.jpg",
    altText: "Counseling & Advising Team",
    caption: "Certified Counselors Assisting +2 & University Graduates",
  },
  {
    id: "default-6",
    path: "/images/entrance-main.jpg",
    fileName: "entrance-prep.jpg",
    altText: "Entrance Preparation Classes",
    caption: "Structured Classroom Preparation for CEE, CMAT & Engineering",
  },
];

export default async function GalleryRoute() {
  let photos: any[] = [];

  try {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { data: dbMedia, error } = await supabase
        .from("media_assets")
        .select("*")
        .like("mime_type", "image/%")
        .order("created_at", { ascending: false });

      if (!error && dbMedia && dbMedia.length > 0) {
        photos = dbMedia.map((m: any) => ({
          id: m.id,
          path: m.path,
          fileName: m.file_name,
          altText: m.alt_text || m.file_name,
          caption: m.caption || "",
          createdAt: m.created_at,
        }));
      }
    }
  } catch (e) {
    console.error("GalleryRoute DB fetch error:", e);
  }

  // Use default gallery photos if DB has no media uploaded or is offline
  if (photos.length === 0) {
    photos = DEFAULT_GALLERY_PHOTOS;
  }

  return <GalleryPage photos={photos as any} />;
}
