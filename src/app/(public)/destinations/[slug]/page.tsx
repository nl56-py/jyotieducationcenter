import { notFound } from "next/navigation";
import { countries } from "@/data/countries";
import { CountryDetailPage } from "@/views/CountryDetailPage";
import db from "@/lib/db/client";

export const dynamic = "force-dynamic";

export default async function DestinationDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 1. Find static country fallback or build empty base object
  let country: any = countries.find((c) => c.slug === slug);
  if (!country) {
    country = {
      slug,
      name: slug.toUpperCase(),
      code: slug.toUpperCase(),
      region: "Global Destination",
      accent: "#0A6DAA",
      flag: "/images/brand/logo.jpeg",
      intake: "",
      cost: "",
      programs: "",
      universities: [],
      highlight: "",
      why: [],
      visa: [],
      faq: [],
      introCopy: [],
      coursesList: [],
      requirementsDetail: { academic: "", english: "", financial: "", genuine: "" },
      intakesList: [],
      costsList: [],
      scholarshipsList: [],
      universitiesDetail: []
    };
  } else {
    // Clone static country object to prevent mutating global object
    country = JSON.parse(JSON.stringify(country));
  }

  // 2. Query live database record via mysql2 client
  try {
    const { data: dbDest } = await db
      .from("destinations")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (dbDest) {
      if (dbDest.name) country.name = dbDest.name;
      if (dbDest.summary) country.highlight = dbDest.summary;
      if (dbDest.cost_range) country.cost = dbDest.cost_range;
      
      if (dbDest.intake_badges && Array.isArray(dbDest.intake_badges)) {
        country.intake = dbDest.intake_badges.join(", ");
      }

      if (dbDest.universities_detail && Array.isArray(dbDest.universities_detail) && dbDest.universities_detail.length > 0) {
        country.universitiesDetail = dbDest.universities_detail;
        country.universities = dbDest.universities_detail.map((u: any) => u.name);
      } else if (dbDest.universities && Array.isArray(dbDest.universities) && dbDest.universities.length > 0) {
        country.universities = dbDest.universities;
      }

      if (dbDest.intro_copy && Array.isArray(dbDest.intro_copy) && dbDest.intro_copy.length > 0) {
        country.introCopy = dbDest.intro_copy;
      }
      if (dbDest.why && Array.isArray(dbDest.why) && dbDest.why.length > 0) {
        country.why = dbDest.why;
      }
      if (dbDest.courses_list && Array.isArray(dbDest.courses_list) && dbDest.courses_list.length > 0) {
        country.coursesList = dbDest.courses_list;
      }
      if (dbDest.requirements_detail && Object.keys(dbDest.requirements_detail).length > 0) {
        country.requirementsDetail = dbDest.requirements_detail;
      }
      if (dbDest.intakes_list && Array.isArray(dbDest.intakes_list) && dbDest.intakes_list.length > 0) {
        country.intakesList = dbDest.intakes_list;
      }
      if (dbDest.costs_list && Array.isArray(dbDest.costs_list) && dbDest.costs_list.length > 0) {
        country.costsList = dbDest.costs_list;
      }
      if (dbDest.scholarships_list && Array.isArray(dbDest.scholarships_list) && dbDest.scholarships_list.length > 0) {
        country.scholarshipsList = dbDest.scholarships_list;
      }
      if (dbDest.faq && Array.isArray(dbDest.faq) && dbDest.faq.length > 0) {
        country.faq = dbDest.faq;
      }
    } else if (!countries.some((c) => c.slug === slug)) {
      notFound();
    }
  } catch (err) {
    console.error("Error fetching destination details from database:", err);
  }

  return <CountryDetailPage country={country} />;
}
