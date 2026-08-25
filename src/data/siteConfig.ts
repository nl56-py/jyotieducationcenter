/**
 * Centralized Site Configuration & Branding for Jyoti Educations
 * Jyoti Education Corner Pvt. Ltd.
 */

export interface TeamMemberConfig {
  name: string;
  role: string;
  image: string;
  bio?: string;
  email?: string;
  phone?: string;
  badge?: string;
}

export interface SiteConfig {
  brandName: string;
  legalName: string;
  shortName: string;
  tagline: string;
  subTagline: string;
  headline: string;
  establishedYear: string;
  experienceYears: string;
  
  contact: {
    address: string;
    city: string;
    province: string;
    country: string;
    primaryPhone: string;
    secondaryPhone: string;
    mobile: string;
    whatsapp: string;
    email: string;
    infoEmail: string;
    admissionEmail: string;
    hours: string;
    workingDays: string;
    googleMapsUrl?: string;
  };

  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
    tiktok: string;
    youtube: string;
  };

  destinations: Array<{
    name: string;
    slug: string;
    code: string;
    region: string;
  }>;

  testPreps: Array<{
    name: string;
    slug: string;
    shortDesc: string;
  }>;

  team: TeamMemberConfig[];
  copyright: string;
}

export const siteConfig: SiteConfig = {
  brandName: "Jyoti Education Corner",
  legalName: "Jyoti Education Corner Pvt. Ltd.",
  shortName: "JEC",
  tagline: "Empowering Academic Excellence & Global Education",
  subTagline: "Well Managed for Your Success",
  headline: "Leading Multi-Destination International Education Consultancy in Nepal",
  establishedYear: "2015",
  experienceYears: "10+",

  contact: {
    address: "Damak, Jhapa, Nepal",
    city: "Damak",
    province: "Koshi Province",
    country: "Nepal",
    primaryPhone: "023-575541",
    secondaryPhone: "+977-23-575541",
    mobile: "986-1247784",
    whatsapp: "986-1247784",
    email: "info@jyotieducations.edu.np",
    infoEmail: "info@jyotieducations.edu.np",
    admissionEmail: "apply@jyotieducations.edu.np",
    hours: "7:00 AM – 6:00 PM",
    workingDays: "Sunday – Friday (Saturday Closed)",
    googleMapsUrl: "https://maps.google.com/?q=Jyoti+Education+Corner+Pvt.+Ltd.+Damak+Nepal",
  },

  socialLinks: {
    facebook: "https://facebook.com/jyotieducations",
    instagram: "https://instagram.com/jyotieducations",
    linkedin: "https://linkedin.com/company/jyotieducations",
    tiktok: "https://tiktok.com/@jyotieducations",
    youtube: "https://youtube.com/@jyotieducations",
  },

  destinations: [
    { name: "Australia", slug: "australia", code: "AU", region: "English Speaking" },
    { name: "United Kingdom", slug: "uk", code: "UK", region: "English Speaking" },
    { name: "United States", slug: "usa", code: "US", region: "English Speaking" },
    { name: "Canada", slug: "canada", code: "CA", region: "English Speaking" },
    { name: "New Zealand", slug: "new-zealand", code: "NZ", region: "English Speaking" },
    { name: "Germany", slug: "germany", code: "DE", region: "Europe" },
    { name: "Denmark", slug: "denmark", code: "DK", region: "Europe" },
    { name: "Finland", slug: "finland", code: "FI", region: "Europe" },
    { name: "Japan", slug: "japan", code: "JP", region: "Asia" },
    { name: "South Korea", slug: "south-korea", code: "KR", region: "Asia" },
    { name: "Lithuania", slug: "lithuania", code: "LT", region: "Europe" },
    { name: "Malta", slug: "malta", code: "MT", region: "Europe" },
    { name: "Dubai (UAE)", slug: "dubai", code: "AE", region: "Middle East" },
    { name: "India", slug: "india", code: "IN", region: "South Asia" },
  ],

  testPreps: [
    { name: "IELTS", slug: "ielts", shortDesc: "Comprehensive Academic & General Training IELTS preparation." },
    { name: "PTE Academic", slug: "pte", shortDesc: "Computer-delivered PTE preparation with AI scoring software." },
    { name: "TOEFL iBT", slug: "toefl", shortDesc: "Targeted TOEFL modules with regular practice tests." },
    { name: "Digital SAT", slug: "sat", shortDesc: "Expert strategies for Math & Verbal reasoning for US scholarships." },
    { name: "Japanese (JLPT / NAT)", slug: "japanese-jlpt", shortDesc: "Language proficiency from N5 to N2 with native guidance." },
  ],

  team: [
    {
      name: "Kedar Poudel",
      role: "Director",
      image: "/images/brand/leader-kedar-poudel.jpg",
      bio: "Over a decade of visionary leadership in higher education counseling, university tie-ups, and ethical student pathways.",
      badge: "Leadership",
      email: "director@jyotieducations.edu.np",
    },
    {
      name: "Chandra Kala Dahal",
      role: "Board of Director",
      image: "/images/brand/leader-chandra-kala.jpg",
      bio: "Strategic oversight, institutional governance, and compliance ensuring quality service benchmarks across all operations.",
      badge: "Governance",
      email: "chandrakala@jyotieducations.edu.np",
    },
    {
      name: "Narayan Poudel",
      role: "Manager",
      image: "/images/brand/leader-narayan-poudel.jpg",
      bio: "Managing daily administrative excellence, university liaison, documentation protocols, and counselor alignment.",
      badge: "Management",
      email: "manager@jyotieducations.edu.np",
    },
    {
      name: "Sherya Basnet",
      role: "Front Desk Officer",
      image: "/images/brand/leader-sherya-basnet.jpg",
      bio: "Welcoming students and parents with warm counseling intake, scheduling profile reviews, and initial guidance.",
      badge: "Student Relations",
      email: "frontdesk@jyotieducations.edu.np",
    },
  ],

  copyright: "© 2026 Jyoti Educations. All rights reserved.",
};
