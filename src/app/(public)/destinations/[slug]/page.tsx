import { notFound } from "next/navigation";
import { countries } from "@/data/countries";
import { CountryDetailPage } from "@/views/CountryDetailPage";

export async function generateStaticParams() {
  return countries.map((country) => ({
    slug: country.slug,
  }));
}

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

  // We pass a dummy navigate because CountryDetailPage only passes it down to InquiryBand
  return <CountryDetailPage country={country} />;
}
