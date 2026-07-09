import { createSupabaseServerClient } from "@/lib/supabase/server";
import { GalleryPage } from "@/views/GalleryPage";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Photo Gallery — EduMark Pvt. Ltd.",
  description: "View photos of our offices, student success stories, events, and activities at EduMark.",
};

export default async function GalleryRoute() {
  const supabase = await createSupabaseServerClient();
  let photos: any[] = [];

  if (supabase) {
    const { data: dbMedia } = await supabase
      .from("media_assets")
      .select("*")
      .like("mime_type", "image/%")
      .order("created_at", { ascending: false });

    if (dbMedia) {
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

  return <GalleryPage photos={photos as any} />;
}
