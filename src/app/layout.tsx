import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "@/styles/frontend.css";
import { siteConfig } from "@/data/siteConfig";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jyotieducations.edu.np"),
  title: {
    default: `${siteConfig.brandName} | Empowering Academic Excellence & Global Education`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description:
    "Jyoti Education Corner in Damak, Jhapa, Nepal provides study abroad counselling, student visa assistance, university admissions, IELTS, PTE, TOEFL, SAT, and test preparation.",
  keywords: [
    "education consultancy in Damak Jhapa",
    "study abroad from Nepal",
    "Jyoti Education Corner",
    "Jyoti Educations",
    "visa assistance Nepal",
    "IELTS PTE classes Damak",
    "study in Australia UK USA Canada New Zealand Germany Europe",
    "student visa counselling Damak",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://jyotieducations.edu.np",
    siteName: siteConfig.brandName,
    title: `${siteConfig.brandName} | Study Abroad Consultancy Damak, Jhapa`,
    description:
      "Study abroad counselling, admission support, visa guidance, test preparation, and entrance preparation for Nepali students.",
    images: [
      {
        url: "/images/generated/study-hero.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.brandName} study abroad counselling in Nepal`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.brandName} | Study Abroad from Damak, Jhapa`,
    description:
      "Study abroad, visa assistance, admissions, IELTS, PTE, TOEFL, SAT, CEE, and CMAT support from Damak, Jhapa, Nepal.",
    images: ["/images/generated/study-hero.png"],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "education",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  "@id": "https://jyotieducations.edu.np/#organization",
  name: siteConfig.legalName,
  url: "https://jyotieducations.edu.np",
  logo: "https://jyotieducations.edu.np/favicon/android-chrome-512x512.png",
  image: "https://jyotieducations.edu.np/images/generated/study-hero.png",
  description:
    "Study abroad consultancy and test preparation center in Damak, Jhapa, Nepal.",
  telephone: siteConfig.contact.primaryPhone,
  email: siteConfig.contact.infoEmail,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Damak",
    addressLocality: "Damak",
    postalCode: "57217",
    addressRegion: "Koshi Province",
    addressCountry: "NP",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 26.6614,
    longitude: 87.6976,
  },
  areaServed: [
    { "@type": "Country", name: "Nepal" },
    { "@type": "City", name: "Damak" },
    { "@type": "AdministrativeArea", name: "Jhapa" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
  ],
  sameAs: [
    "https://jyotieducations.edu.np",
  ],
  knowsAbout: [
    "Study abroad counselling",
    "Student visa guidance",
    "IELTS preparation",
    "PTE preparation",
    "TOEFL preparation",
    "SAT preparation",
    "CEE preparation",
    "CMAT preparation",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://jyotieducations.edu.np/#website",
  url: "https://jyotieducations.edu.np",
  name: siteConfig.brandName,
  publisher: { "@id": "https://jyotieducations.edu.np/#organization" },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://jyotieducations.edu.np/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://jyotieducations.edu.np/#study-abroad-service",
  name: "Study Abroad Counselling and Visa Assistance",
  provider: { "@id": "https://jyotieducations.edu.np/#organization" },
  areaServed: { "@type": "Country", name: "Nepal" },
  serviceType: "Education consultancy",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Jyoti Educations Services",
    itemListElement: [
      "Educational counselling",
      "Career counselling",
      "Study abroad guidance",
      "Visa assistance",
      "University application support",
      "Scholarship guidance",
      "Test preparation",
      "Entrance preparation",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which study abroad destinations does Jyoti Educations support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Jyoti Educations supports study routes for the UK, USA, Australia, Canada, New Zealand, Germany, Denmark, Finland, Lithuania, South Korea, Japan, India, Malta, Dubai, and other suitable destinations.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Jyoti Education Corner located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Jyoti Education Corner Pvt. Ltd. is located in Damak, Jhapa, Nepal.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([localBusinessSchema, websiteSchema, serviceSchema, faqSchema]),
          }}
        />
        {children}
      </body>
    </html>
  );
}
