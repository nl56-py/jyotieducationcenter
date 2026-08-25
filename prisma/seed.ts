import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { countries } from "../src/data/countries.js";
import { siteConfig } from "../src/data/siteConfig";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Jyoti Educations database on DirectAdmin...");

  // 1. Seed Super Admin User
  const adminPassword = await bcrypt.hash("Admin@12345", 10);
  const defaultAdmin = await prisma.adminUser.upsert({
    where: { email: "admin@jyotieducations.edu.np" },
    update: {
      password_hash: adminPassword,
      full_name: "Kedar Poudel (Director)",
      role: "super_admin",
      status: "active",
    },
    create: {
      email: "admin@jyotieducations.edu.np",
      password_hash: adminPassword,
      full_name: "Kedar Poudel (Director)",
      role: "super_admin",
      status: "active",
    },
  });
  console.log(`Created/updated super admin: ${defaultAdmin.email}`);

  // 2. Seed Team Members
  for (let i = 0; i < siteConfig.team.length; i++) {
    const member = siteConfig.team[i];
    await prisma.teamMember.upsert({
      where: { slug: member.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") },
      update: {
        name: member.name,
        role_title: member.role,
        bio: member.bio,
        sort_order: i + 1,
        status: "published",
      },
      create: {
        slug: member.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        name: member.name,
        role_title: member.role,
        bio: member.bio,
        sort_order: i + 1,
        status: "published",
      },
    });
  }
  console.log(`Seeded ${siteConfig.team.length} team members`);

  // 3. Seed Destinations and Universities
  for (let i = 0; i < countries.length; i++) {
    const c = countries[i];
    const destination = await prisma.destination.upsert({
      where: { slug: c.slug },
      update: {
        name: c.name,
        country_code: c.code,
        summary: c.highlight,
        hero_title: `Study in ${c.name}`,
        hero_body: c.introCopy ? c.introCopy.join("\n\n") : "",
        cost_range: c.cost,
        intake_badges: { intakes: c.intake },
        featured: i < 6,
        status: "published",
        published_at: new Date(),
      },
      create: {
        slug: c.slug,
        name: c.name,
        country_code: c.code,
        summary: c.highlight,
        hero_title: `Study in ${c.name}`,
        hero_body: c.introCopy ? c.introCopy.join("\n\n") : "",
        cost_range: c.cost,
        intake_badges: { intakes: c.intake },
        featured: i < 6,
        status: "published",
        published_at: new Date(),
      },
    });

    if (c.universitiesDetail && Array.isArray(c.universitiesDetail)) {
      for (const uni of c.universitiesDetail) {
        await prisma.university.create({
          data: {
            destination_id: destination.id,
            name: uni.name,
            ranking_notes: uni.description,
            fees: uni.fees,
            courses: uni.courses,
            image: uni.image,
            status: "published",
          },
        });
      }
    }
  }
  console.log(`Seeded ${countries.length} destination countries and universities`);

  // 4. Seed Services
  const defaultServices = [
    {
      slug: "career-counselling",
      name: "Career Counselling",
      label: "Personalized Guidance",
      summary: "One-on-one session to assess academic history, budget, and long-term career aspirations.",
      detail: "Our certified counselors evaluate student transcripts, strengths, and financial plans to match with the ideal destination.",
      sort_order: 1,
    },
    {
      slug: "admission-guidance",
      name: "Admission Guidance",
      label: "University Selection",
      summary: "Shortlisting the right universities and navigating offer letter requirements with ease.",
      detail: "We handle end-to-end university application submissions, document verification, and direct admissions communication.",
      sort_order: 2,
    },
    {
      slug: "visa-assistance",
      name: "Visa Assistance",
      label: "Document & Interview Prep",
      summary: "Flawless visa documentation review, financial verification, and rigorous mock interviews.",
      detail: "Step-by-step visa file compilation, source-of-funds verification, embassy appointment scheduling, and mock interviews.",
      sort_order: 3,
    },
    {
      slug: "test-preparation-support",
      name: "Test Preparation Support",
      label: "IELTS, PTE & TOEFL",
      summary: "Structured test preparation with certified faculty, mock tests, and personalized feedback.",
      detail: "Daily intensive classes for IELTS Academic, PTE Academic, TOEFL, and SAT with modern multimedia labs.",
      sort_order: 4,
    },
    {
      slug: "travel-accommodation",
      name: "Travel & Accommodation",
      label: "Settling In Overseas",
      summary: "Assisting with student housing, student flight bookings, and local logistics abroad.",
      detail: "Pre-departure coordination for student dormitories, private rentals, homestays, and airport pickups.",
      sort_order: 5,
    },
    {
      slug: "pre-departure-support",
      name: "Pre-Departure Support",
      label: "Orientation & Briefing",
      summary: "Detailed pre-departure briefings covering lifestyle, currency, culture, and arrival rules.",
      detail: "Comprehensive briefing on baggage rules, international currency cards, insurance coverage, and student networks.",
      sort_order: 6,
    },
  ];

  for (const s of defaultServices) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        name: s.name,
        label: s.label,
        summary: s.summary,
        detail: s.detail,
        sort_order: s.sort_order,
        status: "published",
        published_at: new Date(),
      },
      create: {
        slug: s.slug,
        name: s.name,
        label: s.label,
        summary: s.summary,
        detail: s.detail,
        sort_order: s.sort_order,
        status: "published",
        published_at: new Date(),
      },
    });
  }
  console.log(`Seeded ${defaultServices.length} services`);

  // 5. Seed Site Settings
  await prisma.siteSetting.upsert({
    where: { key: "site_info" },
    update: {
      value: {
        brandName: siteConfig.brandName,
        legalName: siteConfig.legalName,
        email: siteConfig.contact.infoEmail,
        phone: siteConfig.contact.primaryPhone,
        address: siteConfig.contact.address,
      },
      description: "Core website branding and contact details",
    },
    create: {
      key: "site_info",
      value: {
        brandName: siteConfig.brandName,
        legalName: siteConfig.legalName,
        email: siteConfig.contact.infoEmail,
        phone: siteConfig.contact.primaryPhone,
        address: siteConfig.contact.address,
      },
      description: "Core website branding and contact details",
    },
  });

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
