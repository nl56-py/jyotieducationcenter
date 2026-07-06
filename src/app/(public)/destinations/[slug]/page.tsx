import { notFound } from "next/navigation";
import { countries } from "@/data/countries";
import { CountryDetailPage } from "@/views/CountryDetailPage";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";


export default async function DestinationDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = countries.find((c) => c.slug === slug);

  if (!country) {
    notFound();
  }

  // Fetch the latest dynamic values from Supabase (destinations table)
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data: dbDest } = await supabase
      .from("destinations")
      .select("cost_range, intake_badges, next_intake_label, next_intake_date, university_cost, universities_detail")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (dbDest) {
      // Merge values into the static country object
      if (dbDest.cost_range) {
        country.cost = dbDest.cost_range;
      }
      if (dbDest.intake_badges && dbDest.intake_badges.length > 0) {
        country.intake = dbDest.intake_badges.join(", ");
      }
      if (dbDest.university_cost) {
        (country as any).university_cost = dbDest.university_cost;
        
        // Also map to requirement detail for visa checks
        if (country.requirementsDetail) {
          country.requirementsDetail.financial = dbDest.university_cost;
        }

        // Also merge into tuition row in costs list if present
        if (country.costsList) {
          const tuitionIndex = country.costsList.findIndex(c => c.category.toLowerCase().includes("tuition"));
          if (tuitionIndex !== -1) {
            country.costsList[tuitionIndex].range = dbDest.university_cost;
          }
        }
      }
      if (dbDest.universities_detail && dbDest.universities_detail.length > 0) {
        country.universitiesDetail = dbDest.universities_detail as any;
        country.universities = dbDest.universities_detail.map((u: any) => u.name);
      }
    }
  }

  return <CountryDetailPage country={country} />;
}
