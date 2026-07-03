import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "@/styles/frontend.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://edumark.edu.np"),
  title: {
    default: "EduMark Education Consultancy | Study Abroad from Biratnagar, Nepal",
    template: "%s | EduMark Education Consultancy",
  },
  description:
    "EduMark Education Consultancy in Biratnagar, Nepal helps students with study abroad counselling, visa assistance, admissions, IELTS, PTE, TOEFL, SAT, CEE, CMAT, and university applications.",
  keywords: [
    "education consultancy in Biratnagar",
    "study abroad from Nepal",
    "EduMark Education Consultancy",
    "visa assistance Nepal",
    "IELTS PTE classes Biratnagar",
    "abroad study consultancy Nepal",
    "student visa counselling",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://edumark.edu.np",
    siteName: "EduMark Education Consultancy",
    title: "EduMark Education Consultancy | Study Abroad from Biratnagar, Nepal",
    description:
      "Study abroad counselling, admission support, visa guidance, test preparation, and entrance preparation for Nepali students.",
    images: [
      {
        url: "/images/generated/study-hero.png",
        width: 1200,
        height: 630,
        alt: "EduMark Education Consultancy study abroad counselling in Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EduMark Education Consultancy | Study Abroad from Biratnagar",
    description:
      "Study abroad, visa assistance, admissions, IELTS, PTE, TOEFL, SAT, CEE, and CMAT support from Biratnagar, Nepal.",
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
  "@id": "https://edumark.edu.np/#organization",
  name: "EduMark Education Consultancy",
  url: "https://edumark.edu.np",
  logo: "https://edumark.edu.np/favicon/android-chrome-512x512.png",
  image: "https://edumark.edu.np/images/generated/study-hero.png",
  description:
    "Study abroad consultancy and test preparation center in Biratnagar, Nepal.",
  telephone: "+977-21-590823",
  email: "info@edumark.edu.np",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Araniko Bhawan, Traffic Chowk",
    addressLocality: "Biratnagar",
    postalCode: "56613",
    addressRegion: "Koshi Province",
    addressCountry: "NP",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 26.4525,
    longitude: 87.2718,
  },
  areaServed: [
    { "@type": "Country", name: "Nepal" },
    { "@type": "City", name: "Biratnagar" },
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
    "https://edumark.edu.np",
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
  "@id": "https://edumark.edu.np/#website",
  url: "https://edumark.edu.np",
  name: "EduMark Education Consultancy",
  publisher: { "@id": "https://edumark.edu.np/#organization" },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://edumark.edu.np/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://edumark.edu.np/#study-abroad-service",
  name: "Study Abroad Counselling and Visa Assistance",
  provider: { "@id": "https://edumark.edu.np/#organization" },
  areaServed: { "@type": "Country", name: "Nepal" },
  serviceType: "Education consultancy",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "EduMark Services",
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
      name: "Which study abroad destinations does EduMark support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EduMark supports study routes for the UK, USA, Australia, Finland, Lithuania, South Korea, Japan, India, Malta, Dubai, and other suitable destinations based on student profiles.",
      },
    },
    {
      "@type": "Question",
      name: "Where is EduMark Education Consultancy located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EduMark Education Consultancy is located at Araniko Bhawan, Traffic Chowk, Biratnagar-09, Nepal.",
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
