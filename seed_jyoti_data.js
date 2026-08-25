const path = require('path');
const Module = require('module');

// Module resolution for cloudlinux
const appNodeModules = path.join(__dirname, 'node_modules');
if (process.env.NODE_PATH) {
  process.env.NODE_PATH = `${appNodeModules}:${process.env.NODE_PATH}`;
} else {
  process.env.NODE_PATH = appNodeModules;
}
process.env.DATABASE_URL = "mysql://jyoti_jecusr:JyotiEducations2026%21%23@localhost:3306/jyoti_jecapp";
Module._initPaths();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "mysql://jyoti_jecusr:JyotiEducations2026%21%23@localhost:3306/jyoti_jecapp"
    }
  }
});

async function ensureColumns() {
  console.log('Ensuring tables and columns...');
  const tableStatements = [
    `CREATE TABLE IF NOT EXISTS test_preparations (
      id VARCHAR(36) NOT NULL,
      slug VARCHAR(191) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      summary TEXT NULL,
      test_type VARCHAR(100) NULL,
      format JSON NULL,
      features JSON NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'draft',
      seo_title VARCHAR(255) NULL,
      seo_description TEXT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,
    `CREATE TABLE IF NOT EXISTS entrance_programs (
      id VARCHAR(36) NOT NULL,
      slug VARCHAR(191) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      summary TEXT NULL,
      features JSON NULL,
      offer JSON NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'draft',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,
    `CREATE TABLE IF NOT EXISTS destination_sections (
      id VARCHAR(36) NOT NULL,
      destination_id VARCHAR(36) NOT NULL,
      section_type VARCHAR(100) NOT NULL,
      title VARCHAR(255) NULL,
      body JSON NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      PRIMARY KEY (id),
      FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,
    `CREATE TABLE IF NOT EXISTS service_sections (
      id VARCHAR(36) NOT NULL,
      service_id VARCHAR(36) NOT NULL,
      section_key VARCHAR(100) NOT NULL,
      section_type VARCHAR(100) NOT NULL,
      title VARCHAR(255) NULL,
      body JSON NOT NULL,
      media_id VARCHAR(36) NULL,
      sort_order INT NOT NULL DEFAULT 0,
      status VARCHAR(50) NOT NULL DEFAULT 'published',
      PRIMARY KEY (id),
      FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
      FOREIGN KEY (media_id) REFERENCES media_assets(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,
  ];

  for (const sql of tableStatements) {
    try {
      await prisma.$executeRawUnsafe(sql);
    } catch (e) {
      console.error('Table create error:', e.message);
    }
  }

  const statements = [
    'ALTER TABLE team_members ADD COLUMN metadata JSON NULL',
    'ALTER TABLE team_members ADD COLUMN social_links JSON NULL',
    'ALTER TABLE admin_users ADD COLUMN password_hash VARCHAR(255) NULL',
    'ALTER TABLE destinations ADD COLUMN cost_range VARCHAR(255) NULL',
    'ALTER TABLE destinations ADD COLUMN intake_badges JSON NULL',
    'ALTER TABLE destinations ADD COLUMN summary TEXT NULL',
    'ALTER TABLE universities ADD COLUMN ranking_notes TEXT NULL',
    'ALTER TABLE universities ADD COLUMN fees VARCHAR(255) NULL',
    'ALTER TABLE universities ADD COLUMN courses TEXT NULL',
    'ALTER TABLE test_preparations ADD COLUMN test_type VARCHAR(100) NULL',
    'ALTER TABLE test_preparations ADD COLUMN format JSON NULL',
    'ALTER TABLE test_preparations ADD COLUMN features JSON NULL',
    'ALTER TABLE entrance_programs ADD COLUMN features JSON NULL',
    'ALTER TABLE entrance_programs ADD COLUMN offer JSON NULL',
    'ALTER TABLE media_assets ADD COLUMN alt_text TEXT NULL',
    'ALTER TABLE media_assets ADD COLUMN caption TEXT NULL',
    'ALTER TABLE blog_posts ADD COLUMN published_at DATETIME NULL',
    'ALTER TABLE blog_posts ADD COLUMN featured TINYINT(1) DEFAULT 0',
  ];

  for (const sql of statements) {
    try {
      await prisma.$executeRawUnsafe(sql);
    } catch (e) {
      // column already exists
    }
  }
}

async function main() {
  console.log('Starting Jyoti Education Center Database Seeding...');
  await ensureColumns();

  // 1. Admin Users
  console.log('1. Seeding Admin Users...');
  const admins = [
    { id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a10', full_name: 'Kedar Poudel (Director)', email: 'admin@jyotieducations.edu.np', role: 'super_admin', status: 'active', password_hash: '$2b$10$wO0P95i20vW96kS45j6Lge1yvW8h0ZfG90y7Vn12c2P8N8t7i6K6S' },
    { id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', full_name: 'Ravi Gupta', email: 'ravi@jyotieducations.edu.np', role: 'super_admin', status: 'active', password_hash: '$2b$10$wO0P95i20vW96kS45j6Lge1yvW8h0ZfG90y7Vn12c2P8N8t7i6K6S' },
    { id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', full_name: 'Kabiraj Paudel', email: 'kabiraj@jyotieducations.edu.np', role: 'admin', status: 'active', password_hash: '$2b$10$wO0P95i20vW96kS45j6Lge1yvW8h0ZfG90y7Vn12c2P8N8t7i6K6S' },
    { id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', full_name: 'Dipendra Mehta', email: 'dipendra@jyotieducations.edu.np', role: 'editor', status: 'active', password_hash: '$2b$10$wO0P95i20vW96kS45j6Lge1yvW8h0ZfG90y7Vn12c2P8N8t7i6K6S' },
    { id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', full_name: 'Tilak Thapa', email: 'tilak@jyotieducations.edu.np', role: 'editor', status: 'active', password_hash: '$2b$10$wO0P95i20vW96kS45j6Lge1yvW8h0ZfG90y7Vn12c2P8N8t7i6K6S' },
  ];

  for (const admin of admins) {
    await prisma.adminUser.upsert({
      where: { email: admin.email },
      update: { full_name: admin.full_name, role: admin.role, status: admin.status },
      create: admin,
    });
  }

  // 2. Media Assets
  console.log('2. Seeding Media Assets...');
  const mediaList = [
    { path: '/images/brand/jec.jpeg', file_name: 'jec.jpeg', mime_type: 'image/jpeg', alt_text: 'Jyoti Education Center Official Logo' },
    { path: '/images/brand/logo.jpeg', file_name: 'logo.jpeg', mime_type: 'image/jpeg', alt_text: 'Jyoti Education Center Emblem' },
    { path: '/images/brand/leader-ravi-gupta.jpg', file_name: 'leader-ravi-gupta.jpg', mime_type: 'image/jpeg', alt_text: 'Ravi Gupta - Senior Study Abroad Counselor' },
    { path: '/images/brand/leader-kabiraj-paudel.jpg', file_name: 'leader-kabiraj-paudel.jpg', mime_type: 'image/jpeg', alt_text: 'Kabiraj Paudel - Head of Admissions' },
    { path: '/images/brand/dipendra mehta.jpeg', file_name: 'dipendra mehta.jpeg', mime_type: 'image/jpeg', alt_text: 'Dipendra Mehta - Visa Documentation Lead' },
    { path: '/images/brand/leader-tilak-thapa.jpg', file_name: 'leader-tilak-thapa.jpg', mime_type: 'image/jpeg', alt_text: 'Tilak Thapa - Academic Trainer & Test Prep Head' },
    { path: '/images/generated/study-hero.png', file_name: 'study-hero.png', mime_type: 'image/png', alt_text: 'Jyoti Educations Study Abroad Banner' },
    { path: '/images/generated/world-map.png', file_name: 'world-map.png', mime_type: 'image/png', alt_text: 'Global Destinations World Map' },
    { path: '/images/generated/destinations.png', file_name: 'destinations.png', mime_type: 'image/png', alt_text: 'Study Destinations Showcase' },
    { path: '/images/generated/counselling.png', file_name: 'counselling.png', mime_type: 'image/png', alt_text: 'Personalized Counselling Services' },
    { path: '/images/generated/test-prep.png', file_name: 'test-prep.png', mime_type: 'image/png', alt_text: 'Test Preparation Classrooms' },
    { path: '/images/generated/student-success.png', file_name: 'student-success.png', mime_type: 'image/png', alt_text: 'Jyoti Student Visa Success' },
    { path: '/images/generated/blog_uk_visa.png', file_name: 'blog_uk_visa.png', mime_type: 'image/png', alt_text: 'UK Student Visa Guide Cover' },
    { path: '/images/generated/blog_test_prep.png', file_name: 'blog_test_prep.png', mime_type: 'image/png', alt_text: 'Language Test Preparation Guide Cover' },
    { path: '/images/generated/blog_documentation.png', file_name: 'blog_documentation.png', mime_type: 'image/png', alt_text: 'Academic Documentation Guide Cover' },
    { path: '/images/generated/blog_visa_guidance.png', file_name: 'blog_visa_guidance.png', mime_type: 'image/png', alt_text: 'Embassy Visa Interview Guide Cover' },
    { path: '/images/generated/student_male_1.png', file_name: 'student_male_1.png', mime_type: 'image/png', alt_text: 'Student Aarav Shrestha Portrait' },
    { path: '/images/generated/student_female_1.png', file_name: 'student_female_1.png', mime_type: 'image/png', alt_text: 'Student Sneha Tamang Portrait' },
    { path: '/images/generated/student_male_2.png', file_name: 'student_male_2.png', mime_type: 'image/png', alt_text: 'Student Nischal Dahal Portrait' },
    { path: '/images/generated/student_female_2.png', file_name: 'student_female_2.png', mime_type: 'image/png', alt_text: 'Student Anjali Shrestha Portrait' },
    { path: '/images/Whychoose.png', file_name: 'Whychoose.png', mime_type: 'image/png', alt_text: 'Why Choose Jyoti Education Center' },
    { path: '/images/Servicepage.png', file_name: 'Servicepage.png', mime_type: 'image/png', alt_text: 'Comprehensive Study Abroad Services' },
    { path: '/images/CEE.png', file_name: 'CEE.png', mime_type: 'image/png', alt_text: 'CEE Medical Entrance Preparation' },
    { path: '/images/CMAT.png', file_name: 'CMAT.png', mime_type: 'image/png', alt_text: 'CMAT Management Entrance Preparation' },
    { path: '/images/medical.png', file_name: 'medical.png', mime_type: 'image/png', alt_text: 'Medical Entrance Classes' },
    { path: '/images/jlpt.png', file_name: 'jlpt.png', mime_type: 'image/png', alt_text: 'JLPT Japanese Language Classes' },
    { path: '/images/pte.png', file_name: 'pte.png', mime_type: 'image/png', alt_text: 'PTE Academic Computer Practice' },
    { path: '/images/Offer-Letter.png', file_name: 'Offer-Letter.png', mime_type: 'image/png', alt_text: 'University Offer Letter Assistance' },
    { path: '/austraylia-420x420.jpg', file_name: 'austraylia-420x420.jpg', mime_type: 'image/jpeg', alt_text: 'Study in Australia' },
    { path: '/uk-420x420.jpg', file_name: 'uk-420x420.jpg', mime_type: 'image/jpeg', alt_text: 'Study in United Kingdom' },
    { path: '/usa-1-420x420.jpg', file_name: 'usa-1-420x420.jpg', mime_type: 'image/jpeg', alt_text: 'Study in United States' },
    { path: '/finland.png', file_name: 'finland.png', mime_type: 'image/png', alt_text: 'Study in Finland' },
    { path: '/south-korea.png', file_name: 'south-korea.png', mime_type: 'image/png', alt_text: 'Study in South Korea' },
    { path: '/japan.png', file_name: 'japan.png', mime_type: 'image/png', alt_text: 'Study in Japan' },
    { path: '/dubai.png', file_name: 'dubai.png', mime_type: 'image/png', alt_text: 'Study in Dubai / UAE' },
    { path: '/india.png', file_name: 'india.png', mime_type: 'image/png', alt_text: 'Study in India' },
    { path: '/luthinia.png', file_name: 'luthinia.png', mime_type: 'image/png', alt_text: 'Study in Lithuania' },
    { path: '/malta.png', file_name: 'malta.png', mime_type: 'image/png', alt_text: 'Study in Malta' },
    { path: '/images/AUM.jpeg', file_name: 'AUM.jpeg', mime_type: 'image/jpeg', alt_text: 'American University of Malta' },
    { path: '/images/Heriot_Watt.jpeg', file_name: 'Heriot_Watt.jpeg', mime_type: 'image/jpeg', alt_text: 'Heriot-Watt University Dubai' },
    { path: '/images/MCAST.jpeg', file_name: 'MCAST.jpeg', mime_type: 'image/jpeg', alt_text: 'MCAST Malta' },
    { path: '/images/Middlesex.jpeg', file_name: 'Middlesex.jpeg', mime_type: 'image/jpeg', alt_text: 'Middlesex University London & Dubai' },
  ];

  const mediaMap = {};
  for (const m of mediaList) {
    const existing = await prisma.mediaAsset.findFirst({ where: { path: m.path } });
    if (existing) {
      mediaMap[m.path] = existing.id;
    } else {
      const created = await prisma.mediaAsset.create({
        data: {
          id: require('crypto').randomUUID(),
          bucket: 'public',
          path: m.path,
          file_name: m.file_name,
          mime_type: m.mime_type,
          size_bytes: BigInt(50000),
          alt_text: m.alt_text,
        },
      });
      mediaMap[m.path] = created.id;
    }
  }

  // 3. Team Members
  console.log('3. Seeding Team Members...');
  const team = [
    { slug: 'kedar-poudel', name: 'Kedar Poudel', role_title: 'Managing Director & Founder', bio: 'Leading Jyoti Education Center for over a decade with deep expertise in global education pathways, institutional partnerships, and student visa compliance.', email: 'kedar@jyotieducations.edu.np', phone: '+977-9861247784', badge_text: 'Executive Director', imagePath: '/images/brand/logo.jpeg', sort_order: 1, status: 'published', featured: true },
    { slug: 'ravi-gupta', name: 'Ravi Gupta', role_title: 'Senior Study Abroad Counselor', bio: 'Certified career mentor specializing in Australia, UK, and USA admissions with a proven track record of helping hundreds of students secure offers and scholarships.', email: 'ravi@jyotieducations.edu.np', phone: '+977-9800000001', badge_text: 'TITI Certified', imagePath: '/images/brand/leader-ravi-gupta.jpg', sort_order: 2, status: 'published', featured: true },
    { slug: 'kabiraj-paudel', name: 'Kabiraj Paudel', role_title: 'Head of Admissions & Operations', bio: 'Expert in university liaison, GTE/GS assessment verification, and ensuring seamless application lifecycles from course shortlisting to CAS/COE issuance.', email: 'kabiraj@jyotieducations.edu.np', phone: '+977-9800000002', badge_text: 'Admissions Lead', imagePath: '/images/brand/leader-kabiraj-paudel.jpg', sort_order: 3, status: 'published', featured: true },
    { slug: 'dipendra-mehta', name: 'Dipendra Mehta', role_title: 'Visa Documentation & Compliance Specialist', bio: 'Specialist in financial documentation, tax clearance verifications, CA reports, and Statement of Purpose structuring tailored to embassy standards.', email: 'dipendra@jyotieducations.edu.np', phone: '+977-9800000003', badge_text: 'Visa Specialist', imagePath: '/images/brand/dipendra mehta.jpeg', sort_order: 4, status: 'published', featured: true },
    { slug: 'tilak-thapa', name: 'Tilak Thapa', role_title: 'Head of Test Preparation & Academic Trainer', bio: 'Senior language instructor delivering high-yield strategies for IELTS, PTE Academic, TOEFL, and SAT coaching with personalized band-improvement feedback.', email: 'tilak@jyotieducations.edu.np', phone: '+977-9800000004', badge_text: 'IELTS / PTE Expert', imagePath: '/images/brand/leader-tilak-thapa.jpg', sort_order: 5, status: 'published', featured: true },
  ];

  for (const t of team) {
    const imgId = mediaMap[t.imagePath] || null;
    const existing = await prisma.teamMember.findUnique({ where: { slug: t.slug } });
    if (existing) {
      await prisma.teamMember.update({
        where: { id: existing.id },
        data: { name: t.name, role_title: t.role_title, bio: t.bio, email: t.email, phone: t.phone, badge_text: t.badge_text, image_id: imgId, sort_order: t.sort_order, status: t.status, featured: t.featured },
      });
    } else {
      await prisma.teamMember.create({
        data: { id: require('crypto').randomUUID(), slug: t.slug, name: t.name, role_title: t.role_title, bio: t.bio, email: t.email, phone: t.phone, badge_text: t.badge_text, image_id: imgId, sort_order: t.sort_order, status: t.status, featured: t.featured },
      });
    }
  }

  // 4. Testimonials
  console.log('4. Seeding Testimonials...');
  const testimonials = [
    { student_name: 'Aarav Shrestha', destination: 'IELTS Preparation (Band 8.5)', quote: 'Thanks to the mock test analysis and personalized speaking reviews at Jyoti Education Corner, I scored a Band 8.5 in IELTS. The teachers are very supportive and highlight exactly where you need to improve.', imagePath: '/images/generated/student_male_1.png', sort_order: 1 },
    { student_name: 'Sneha Tamang', destination: 'PTE Academic (Score 79) - Australia', quote: 'Jyoti Education Center\'s PTE classes are equipped with computer practice labs that simulate the actual exam environment. I achieved a score of 79, which helped me secure admission to a top Australian university!', imagePath: '/images/generated/student_female_1.png', sort_order: 2 },
    { student_name: 'Binod Adhikari', destination: 'CMAT Prep - Management Intake', quote: 'Cracking CMAT is all about time management. The quick-solving tips for quantitative ability and regular mock tests at Jyoti Educations gave me the confidence to score top marks.', imagePath: '/images/generated/student_male_1.png', sort_order: 3 },
    { student_name: 'Pooja Karki', destination: 'CEE Prep - Medical Entrance', quote: 'Jyoti\'s medical entrance classes have excellent study materials. The faculty reviews past questions and helps simplify tough physics and chemistry concepts.', imagePath: '/images/generated/student_female_1.png', sort_order: 4 },
    { student_name: 'Roshan Thapa', destination: 'Engineering Prep - IOE', quote: 'Highly recommend Jyoti Education Center for IOE preparation. The teacher-student ratio is perfect, allowing for direct doubt-solving, and the weekly mock exams keep you on track.', imagePath: '/images/generated/student_male_1.png', sort_order: 5 },
    { student_name: 'Kriti Joshi', destination: 'UK Student Visa (University of Hertfordshire)', quote: 'I was struggling with my writing score and SOP structure, but the individual feedback sessions at Jyoti Education Corner completely transformed my approach. Received my UK visa within 10 days!', imagePath: '/images/generated/student_female_1.png', sort_order: 6 },
    { student_name: 'Nischal Dahal', destination: 'Canada Study Permit (University of Windsor)', quote: 'Fantastic infrastructure and excellent instructors in Damak. The financial checklist review and visa mock interview at Jyoti made my Canada application completely stress-free.', imagePath: '/images/generated/student_male_2.png', sort_order: 7 },
    { student_name: 'Anjali Shrestha', destination: 'USA F-1 Visa with Merit Scholarship', quote: 'Securing a US merit scholarship was my dream. The math-specific shortcuts and verbal reasoning tips taught at Jyoti Education Center helped me hit 1480 on my digital SAT and ace the embassy interview.', imagePath: '/images/generated/student_female_2.png', sort_order: 8 },
    { student_name: 'Sandesh Giri', destination: 'Japan Student Pathway (Tokyo)', quote: 'The JLPT Japanese classes and documentation guidance provided by the Jyoti team were top-notch. They handled the Certificate of Eligibility (COE) without any issues.', imagePath: '/images/generated/student_male_2.png', sort_order: 9 },
    { student_name: 'Ritu Basnet', destination: 'Finland Study Visa (LUT University)', quote: 'Excellent guidance on Finnish tuition fee waivers and application deadlines. Preparing with certified mentors at Jyoti Education Center kept me motivated throughout.', imagePath: '/images/generated/student_female_2.png', sort_order: 10 },
  ];

  await prisma.testimonial.deleteMany({});
  for (const t of testimonials) {
    const imgId = mediaMap[t.imagePath] || null;
    await prisma.testimonial.create({
      data: { id: require('crypto').randomUUID(), student_name: t.student_name, destination: t.destination, quote: t.quote, image_id: imgId, status: 'published', sort_order: t.sort_order },
    });
  }

  // 5. Blog Categories & Blog Posts
  console.log('5. Seeding Blog Categories & Posts...');
  const categories = [
    { slug: 'student-visa', name: 'Student Visa & Immigration', description: 'Up-to-date embassy regulations, visa filing guides, and policy updates.', sort_order: 1 },
    { slug: 'study-abroad', name: 'Study Abroad Guides', description: 'Country comparisons, university admissions, and student life insights.', sort_order: 2 },
    { slug: 'test-prep', name: 'Test Preparation Strategies', description: 'Proven study plans, test tips, and score boosting methods for IELTS, PTE, and SAT.', sort_order: 3 },
  ];

  const catMap = {};
  for (const c of categories) {
    const existing = await prisma.blogCategory.findUnique({ where: { slug: c.slug } });
    if (existing) {
      catMap[c.slug] = existing.id;
    } else {
      const created = await prisma.blogCategory.create({
        data: { id: require('crypto').randomUUID(), slug: c.slug, name: c.name, description: c.description, sort_order: c.sort_order },
      });
      catMap[c.slug] = created.id;
    }
  }

  const blogs = [
    { slug: 'navigating-uk-visa-2026', title: 'Navigating the New UK Visa Regulations in 2026: A Guide for Nepali Students', excerpt: 'A comprehensive breakdown of the updated UK Student Visa requirements, financial proof updates, and graduate route options for 2026 by Jyoti Education Center.', categorySlug: 'student-visa', coverPath: '/images/generated/blog_uk_visa.png', featured: true },
    { slug: 'sop-writing-secrets', title: 'How to Build a High-Value SOP: Secrets from a Documentation Lead', excerpt: 'Learn the precise outline and style tips from Jyoti Educations to write a Statement of Purpose that convinces university admissions and visa officers.', categorySlug: 'study-abroad', coverPath: '/images/generated/blog_documentation.png', featured: false },
    { slug: 'pte-vs-ielts-comparison', title: 'PTE Academic vs IELTS: Which English Test is Right for You?', excerpt: 'An in-depth comparison of structure, computer-grading versus human-grading, and scoring matrices by Jyoti Test Preparation experts.', categorySlug: 'test-prep', coverPath: '/images/generated/blog_test_prep.png', featured: false },
    { slug: 'finland-nordic-education-choice', title: 'The Rise of Finland: Why Nordic Education is Becoming the Top Choice', excerpt: 'Exploring Finland\'s tuition fee waivers, English-taught programs, and part-time work privileges for international students guided by Jyoti Educations.', categorySlug: 'study-abroad', coverPath: '/images/generated/blog_uk_visa.png', featured: false },
    { slug: 'usa-f1-visa-interview-prep', title: 'Cracking the F-1 Visa Interview: Mock Preparation Strategies at Jyoti', excerpt: 'Common questions asked by US consular officers, how to answer with confidence, and preparing your source-of-funds explanation with Jyoti Education Center.', categorySlug: 'student-visa', coverPath: '/images/generated/blog_visa_guidance.png', featured: true },
    { slug: 'regional-australia-career-pathways', title: 'Why Regional Australia Offers Better Career Pathways for International Students', excerpt: 'Lower cost of living, regional scholarship opportunities, and extended post-study work rights in designated regional areas.', categorySlug: 'study-abroad', coverPath: '/images/generated/blog_uk_visa.png', featured: false },
    { slug: 'mastering-sat-scholarships', title: 'Mastering the SAT: Essential Tips for Securing US Merit Scholarships', excerpt: 'Score targets, daily practice plans, and resource guides from Jyoti SAT coaching to excel in the digital SAT.', categorySlug: 'test-prep', coverPath: '/images/generated/blog_test_prep.png', featured: false },
    { slug: 'korea-japan-language-pathways', title: 'South Korea and Japan: Affordable Pathways via Language Programs', excerpt: 'A detailed look at the Japanese Language School pathway and Korean TOPIK language requirements by Jyoti Asian Studies Desk.', categorySlug: 'study-abroad', coverPath: '/images/generated/blog_test_prep.png', featured: false },
    { slug: 'avoiding-application-pitfalls', title: 'Avoiding Common Pitfalls in University Applications', excerpt: 'Tips on compiling references, translating academic credentials, and managing application portal deadlines with Jyoti Education Center.', categorySlug: 'study-abroad', coverPath: '/images/generated/blog_documentation.png', featured: false },
    { slug: 'pre-departure-briefing-guide', title: 'The Importance of Pre-Departure Briefings: What to Expect in Your First Month', excerpt: 'How to set up overseas student banking, locate accommodation, and transition to a new academic culture.', categorySlug: 'study-abroad', coverPath: '/images/generated/blog_documentation.png', featured: false },
  ];

  for (const b of blogs) {
    const catId = catMap[b.categorySlug] || null;
    const coverId = mediaMap[b.coverPath] || null;
    const existing = await prisma.blogPost.findUnique({ where: { slug: b.slug } });
    if (existing) {
      await prisma.blogPost.update({
        where: { id: existing.id },
        data: { title: b.title, excerpt: b.excerpt, category_id: catId, cover_image_id: coverId, status: 'published', featured: b.featured, published_at: new Date() },
      });
    } else {
      await prisma.blogPost.create({
        data: { id: require('crypto').randomUUID(), slug: b.slug, title: b.title, excerpt: b.excerpt, content: { blocks: [{ type: 'paragraph', text: b.excerpt }] }, category_id: catId, cover_image_id: coverId, author_admin_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a10', status: 'published', featured: b.featured, published_at: new Date() },
      });
    }
  }

  // 6. Destinations and Universities
  console.log('6. Seeding Destinations & Universities...');
  const destinationsData = [
    {
      name: 'United Kingdom', slug: 'uk', country_code: 'UK',
      summary: 'Shorter degree durations (1-yr Master\'s, 3-yr Bachelor\'s) with 2-year Graduate Route post-study work visa.',
      cost_range: '£12,000 – £22,000 / year',
      intake_badges: ['September', 'January', 'May'],
      featured: true, status: 'published',
      unis: [
        { name: 'University of the West of Scotland (UWS)', city: 'Paisley / London', ranking_notes: 'Top 600 Times Higher Education', fees: '£14,500 – £18,000 / year', courses: 'Computing, Business Administration, Public Health, Nursing' },
        { name: 'BPP University London', city: 'London / Manchester', ranking_notes: 'Top Tier Professional Law & Business School', fees: '£15,000 – £18,500 / year', courses: 'Law, Professional MBA, ACCA, Healthcare Management' },
        { name: 'Arden University', city: 'London, Birmingham, Manchester', ranking_notes: 'Leading Career-Focused Modern University', fees: '£12,000 – £16,500 / year', courses: 'Business Management, Data Analytics, Computing, Global MBA' },
        { name: 'Birmingham City University (BCU)', city: 'Birmingham', ranking_notes: 'Top Modern University in the Midlands', fees: '£15,500 – £17,500 / year', courses: 'Data Science, Media & Communication, Civil Engineering, MBA' },
      ]
    },
    {
      name: 'United States', slug: 'usa', country_code: 'US',
      summary: 'STEM degrees offering up to 3 years of OPT (post-study work) in the world\'s largest economy.',
      cost_range: '$14,000 – $26,000 / year',
      intake_badges: ['August (Fall)', 'January (Spring)', 'May (Summer)'],
      featured: true, status: 'published',
      unis: [
        { name: 'University of Findlay', city: 'Findlay, Ohio', ranking_notes: 'Top Tier Midwest Regional University', fees: '$18,000 – $26,000 / year', courses: 'Computer Science, Environmental Safety, Business Analytics, MBA' },
        { name: 'Wichita State University', city: 'Wichita, Kansas', ranking_notes: 'Top 100 US Public Research Institution', fees: '$15,000 – $22,000 / year', courses: 'Aerospace Engineering, Software Engineering, Data Science, MIS' },
        { name: 'Weber State University', city: 'Ogden, Utah', ranking_notes: 'Leading Public Applied Sciences University', fees: '$14,000 – $19,000 / year', courses: 'Computer Science, Health Administration, Finance, Biotechnology' },
      ]
    },
    {
      name: 'Australia', slug: 'australia', country_code: 'AU',
      summary: 'World-class universities, flexible 485 Temporary Graduate work rights, and high standard of living.',
      cost_range: 'AUD 24,000 – 38,000 / year',
      intake_badges: ['February', 'July', 'November'],
      featured: true, status: 'published',
      unis: [
        { name: 'Western Sydney University (WSU)', city: 'Sydney, NSW', ranking_notes: 'Top 2% Global Universities (THE)', fees: 'AUD 28,000 – 38,000 / year', courses: 'Information Technology, Nursing, Engineering, Accounting' },
        { name: 'Federation University Australia', city: 'Ballarat & Brisbane', ranking_notes: 'Top for Student Support in Australia', fees: 'AUD 26,000 – 34,000 / year', courses: 'Data Science, Nursing, Civil Engineering, MBA' },
        { name: 'Torrens University Australia', city: 'Sydney, Melbourne, Adelaide', ranking_notes: 'Fastest Growing Australian University', fees: 'AUD 24,000 – 32,000 / year', courses: 'Software Engineering, Business Information Systems, Public Health, Design' },
      ]
    },
    {
      name: 'Canada', slug: 'canada', country_code: 'CA',
      summary: 'Post-Graduation Work Permit (PGWP) of up to 3 years with transparent permanent residency pathways.',
      cost_range: 'CAD 16,000 – 32,000 / year',
      intake_badges: ['September (Fall)', 'January (Winter)', 'May (Spring)'],
      featured: true, status: 'published',
      unis: [
        { name: 'University of Windsor', city: 'Windsor, Ontario', ranking_notes: 'Top Canadian Comprehensive University', fees: 'CAD 22,000 – 32,000 / year', courses: 'Computer Science, Automotive Engineering, Management, Biochemistry' },
        { name: 'Centennial College', city: 'Toronto, Ontario', ranking_notes: 'Ontario\'s #1 College for Student Satisfaction', fees: 'CAD 16,000 – 21,000 / year', courses: 'Software Engineering Technology, Supply Chain Management, Biomedical Engineering' },
        { name: 'Conestoga College', city: 'Kitchener / Waterloo', ranking_notes: 'Leading Polytechnic in Canada\'s Technology Triangle', fees: 'CAD 16,500 – 22,000 / year', courses: 'Applied Computer Science, Construction Management, Cloud Computing' },
      ]
    },
    {
      name: 'Finland', slug: 'finland', country_code: 'FI',
      summary: 'Europe\'s happiest nation with English-taught degree programs, generous tuition waivers, and 2-year job seeker visa.',
      cost_range: '€7,000 – €13,500 / year',
      intake_badges: ['Autumn (August)', 'Spring (January)'],
      featured: true, status: 'published',
      unis: [
        { name: 'LUT University', city: 'Lappeenranta / Lahti', ranking_notes: 'Top 300 Global Universities (THE)', fees: '€9,000 – €13,500 / year', courses: 'Software Engineering, Sustainable Energy Systems, Business Analytics, Industrial Engineering' },
        { name: 'Vaasa University of Applied Sciences (VAMK)', city: 'Vaasa', ranking_notes: 'Energy Capital of the Nordic Region', fees: '€7,500 – €9,000 / year', courses: 'Information Technology, International Business, Mechanical Engineering' },
        { name: 'Centria University of Applied Sciences', city: 'Kokkola', ranking_notes: 'Most International UAS in Finland', fees: '€7,000 – €8,500 / year', courses: 'Software Development, Nursing, Business Management' },
      ]
    },
    {
      name: 'Japan', slug: 'japan', country_code: 'JP',
      summary: 'Affordable language school pathways, high part-time work wages, and robust engineering/IT job markets.',
      cost_range: '¥1,100,000 – ¥1,600,000 / year',
      intake_badges: ['April', 'October', 'July', 'January'],
      featured: true, status: 'published',
      unis: [
        { name: 'Tokyo International University (TIU)', city: 'Tokyo / Kawagoe', ranking_notes: 'Top English Track University in Japan', fees: '¥1,100,000 – ¥1,450,000 / year', courses: 'Digital Business & Innovation, International Relations, Economics' },
        { name: 'Ritsumeikan Asia Pacific University (APU)', city: 'Beppu, Oita', ranking_notes: 'Most Diverse Multicultural University in Japan', fees: '¥1,300,000 – ¥1,600,000 / year', courses: 'Asia Pacific Studies, International Management, Sustainability Science' },
      ]
    },
    {
      name: 'South Korea', slug: 'south-korea', country_code: 'KR',
      summary: 'Top global technology brands (Samsung, Hyundai), GKS government scholarships, and booming AI & K-Culture programs.',
      cost_range: '$6,000 – $11,000 / year',
      intake_badges: ['March (Spring)', 'September (Fall)'],
      featured: true, status: 'published',
      unis: [
        { name: 'Sejong University', city: 'Seoul', ranking_notes: 'Top 300 World Universities (THE)', fees: '$6,000 – $9,000 / year', courses: 'Hospitality Management, Computer Science, Biotechnology, Media & Communication' },
        { name: 'Hanyang University', city: 'Seoul', ranking_notes: 'Top 150 Global (QS World Ranking)', fees: '$7,000 – $11,000 / year', courses: 'Computer Science, Automotive Engineering, Data Analytics, International Business' },
      ]
    },
    {
      name: 'Malta', slug: 'malta', country_code: 'MT',
      summary: 'English-speaking Mediterranean EU Schengen nation with affordable tuition, fast visa processing, and UK-accredited degrees.',
      cost_range: '€5,500 – €9,500 / year',
      intake_badges: ['October', 'February'],
      featured: false, status: 'published',
      unis: [
        { name: 'American University of Malta (AUM)', city: 'Bormla', ranking_notes: 'US-Accredited Degree Programs in Schengen Europe', fees: '€6,000 – €9,500 / year', courses: 'Business Administration, Software Engineering, Game Development, MBA' },
        { name: 'Malta College of Arts, Science and Technology (MCAST)', city: 'Paola', ranking_notes: 'Malta\'s Leading Vocational & Higher Education Institution', fees: '€5,500 – €8,500 / year', courses: 'Applied Science, Creative Arts, Information Technology, Business' },
      ]
    },
    {
      name: 'Dubai / UAE', slug: 'dubai', country_code: 'AE',
      summary: 'Branch campuses of top UK and Australian universities with 100% visa success rate and zero income tax.',
      cost_range: 'AED 45,000 – 78,000 / year',
      intake_badges: ['September', 'January', 'May'],
      featured: false, status: 'published',
      unis: [
        { name: 'Heriot-Watt University Dubai', city: 'Dubai International Academic City', ranking_notes: 'Prestigious British University in Dubai', fees: 'AED 55,000 – 78,000 / year', courses: 'Computer Science, Civil Engineering, Petroleum Engineering, MBA' },
        { name: 'Middlesex University Dubai', city: 'Dubai Knowledge Park', ranking_notes: '5-Star KHDA Rated UK Branch Campus', fees: 'AED 48,000 – 65,000 / year', courses: 'Law, Information Technology, Digital Marketing, Data Science' },
      ]
    },
    {
      name: 'India', slug: 'india', country_code: 'IN',
      summary: 'Affordable world-class medical, engineering, and management education close to home with COMPEX scholarship support.',
      cost_range: 'INR 1,10,000 – 2,50,000 / year',
      intake_badges: ['July / August', 'January'],
      featured: false, status: 'published',
      unis: [
        { name: 'Sharda University', city: 'Greater Noida, Delhi NCR', ranking_notes: 'NAAC A+ Accredited University', fees: 'INR 1,20,000 – 2,50,000 / year', courses: 'B.Tech Computer Science, B.Sc Nursing, BBA / MBA, Pharmacy' },
        { name: 'Chandigarh University', city: 'Mohali, Punjab', ranking_notes: 'QS Asia Top 150 Rated Institution', fees: 'INR 1,10,000 – 2,20,000 / year', courses: 'Aerospace Engineering, Data Analytics, Computer Engineering, Biotechnology' },
      ]
    },
  ];

  for (const d of destinationsData) {
    const existing = await prisma.destination.findUnique({ where: { slug: d.slug } });
    let destId = existing ? existing.id : require('crypto').randomUUID();

    if (existing) {
      await prisma.destination.update({
        where: { id: destId },
        data: { name: d.name, country_code: d.country_code, summary: d.summary, cost_range: d.cost_range, intake_badges: d.intake_badges, featured: d.featured, status: d.status },
      });
    } else {
      await prisma.destination.create({
        data: { id: destId, slug: d.slug, name: d.name, country_code: d.country_code, summary: d.summary, cost_range: d.cost_range, intake_badges: d.intake_badges, featured: d.featured, status: d.status },
      });
    }

    // Seed universities
    for (const u of d.unis) {
      const existingU = await prisma.university.findFirst({ where: { destination_id: destId, name: u.name } });
      if (existingU) {
        await prisma.university.update({
          where: { id: existingU.id },
          data: { city: u.city, ranking_notes: u.ranking_notes, fees: u.fees, courses: u.courses },
        });
      } else {
        await prisma.university.create({
          data: { id: require('crypto').randomUUID(), destination_id: destId, name: u.name, city: u.city, ranking_notes: u.ranking_notes, fees: u.fees, courses: u.courses, status: 'published' },
        });
      }
    }
  }

  // 7. Services
  console.log('7. Seeding Services...');
  const servicesData = [
    { slug: 'educational-consulting', name: 'Educational Consulting', summary: 'Comprehensive roadmap planning for overseas education based on academic background, budget, and long-term career aspirations.', sort_order: 1 },
    { slug: 'career-counselling', name: 'Career Counselling', summary: 'One-on-one sessions with certified counselors to match your profile with high-demand international degree programs and post-study opportunities.', sort_order: 2 },
    { slug: 'study-abroad-guidance', name: 'Study Abroad Guidance', summary: 'End-to-end support for university selection, scholarship hunting, and compliance across UK, USA, Australia, Canada, Europe, and Asia.', sort_order: 3 },
    { slug: 'visa-assistance', name: 'Student Visa Assistance', summary: 'Precision visa filing with meticulous source-of-income verification, CA valuation, and embassy interview coaching.', sort_order: 4 },
    { slug: 'university-application', name: 'University Application Processing', summary: 'Fast-track offer letters, document checklist validation, and direct admission liaison with 500+ global partner institutions.', sort_order: 5 },
    { slug: 'scholarship-guidance', name: 'Scholarship & Financial Aid', summary: 'Identifying university merit awards, government grants, and tuition fee waivers to minimize your study costs.', sort_order: 6 },
    { slug: 'interview-preparation', name: 'Embassy & Credibility Interview Prep', summary: 'Rigorous mock interviews simulating US F-1, UK Credibility, and Australian GS assessments to guarantee speaking confidence.', sort_order: 7 },
    { slug: 'documentation-support', name: 'Documentation & SOP Review', summary: 'Expert review of Statements of Purpose, recommendation letters, translations, and financial affidavits.', sort_order: 8 },
    { slug: 'test-preparation-support', name: 'Language & Standardized Test Prep', summary: 'High-score oriented coaching for IELTS, PTE Academic, TOEFL, SAT, and JLPT Japanese with dedicated computer labs.', sort_order: 9 },
    { slug: 'pre-departure-support', name: 'Pre-Departure Briefing & Forex', summary: 'Essential student logistics: overseas student health cover (OSHC), student bank accounts, foreign exchange, and accommodation mapping.', sort_order: 10 },
  ];

  for (const s of servicesData) {
    const existing = await prisma.service.findUnique({ where: { slug: s.slug } });
    if (existing) {
      await prisma.service.update({
        where: { id: existing.id },
        data: { name: s.name, summary: s.summary, sort_order: s.sort_order, status: 'published' },
      });
    } else {
      await prisma.service.create({
        data: { id: require('crypto').randomUUID(), slug: s.slug, name: s.name, summary: s.summary, sort_order: s.sort_order, status: 'published' },
      });
    }
  }

  // 8. Test Preparations & Entrance Programs
  console.log('8. Seeding Test Prep & Entrance Programs...');
  const testPreps = [
    { slug: 'ielts', name: 'IELTS Preparation', summary: 'IELTS coaching for academic and general training modules with individualized feedback.', test_type: 'English Language', format: { type: 'Paper & Computer-Delivered', duration: '6 Weeks', target: 'Band 7.5+' }, features: ['Daily mock tests', 'Speaking evaluation', 'Writing task correction', 'Cambridge materials'] },
    { slug: 'pte', name: 'PTE Academic', summary: 'Pearson Test of English AI-scored coaching with computer practice lab simulations.', test_type: 'English Language', format: { type: '100% Computer-Delivered', duration: '5 Weeks', target: 'Score 68-79+' }, features: ['Real exam templates', 'AI scoring simulator', 'Headphone speaking tests', 'Instant feedback'] },
    { slug: 'toefl', name: 'TOEFL iBT', summary: 'Test of English as a Foreign Language for US, Canada, and European universities.', test_type: 'English Language', format: { type: 'Internet-Based Test', duration: '6 Weeks', target: 'Score 95-105+' }, features: ['Integrated writing tasks', 'Speaking fluency audio reviews', 'Official ETS test bank'] },
    { slug: 'sat', name: 'Digital SAT', summary: 'College Board Digital SAT training for high-value US university merit scholarships.', test_type: 'Standardized Exam', format: { type: 'Digital Adaptive Test', duration: '8 Weeks', target: '1400 - 1550+' }, features: ['Desmos graphing calculator mastery', 'Vocabulary in context', 'Math shortcuts', 'Official Bluebook practice'] },
    { slug: 'jlpt', name: 'Japanese Language (JLPT / NAT)', summary: 'Intensive Japanese language training for Tokyo and Osaka student visa pathways.', test_type: 'Foreign Language', format: { type: 'N5 / N4 / N3 Intensive', duration: '16 Weeks', target: 'JLPT N4/N3' }, features: ['Hiragana/Katakana/Kanji writing', 'NAT-Test prep', 'Interview etiquette', 'Native Japanese audio sessions'] },
  ];

  for (const tp of testPreps) {
    const existing = await prisma.testPreparation.findUnique({ where: { slug: tp.slug } });
    if (existing) {
      await prisma.testPreparation.update({
        where: { id: existing.id },
        data: { name: tp.name, summary: tp.summary, test_type: tp.test_type, format: tp.format, features: tp.features, status: 'published' },
      });
    } else {
      await prisma.testPreparation.create({
        data: { id: require('crypto').randomUUID(), slug: tp.slug, name: tp.name, summary: tp.summary, test_type: tp.test_type, format: tp.format, features: tp.features, status: 'published' },
      });
    }
  }

  const entrances = [
    { slug: 'cee', name: 'CEE (Common Medical Entrance Examination)', summary: 'Comprehensive medical entrance coaching for MBBS, BDS, B.Sc Nursing, and Allied Health Sciences in Nepal.', features: ['Daily physics, chemistry, and biology MCQs', 'Past questions analysis', 'MAT preparation', 'Regular ranking test series'], offer: { seats: 'Limited 35 Students Batch', discount: 'Early Bird 20% Scholarship' } },
    { slug: 'cmat', name: 'CMAT (Central Management Admission Test)', summary: 'Proven coaching for Tribhuvan University BBA, BIM, BHM, BTTM, and BBM entrance exams.', features: ['Quantitative shortcuts', 'Logical reasoning puzzles', 'Verbal ability mastery', 'General awareness updates'], offer: { mockTests: '15 Full-length Mock Tests', materials: 'Complete CMAT Book Set Included' } },
    { slug: 'engineering', name: 'IOE Engineering Entrance Examination', summary: 'High-yield coaching for Pulchowk, Thapathali, WRC, and ERC engineering entrance admissions.', features: ['Advanced math problem sets', 'Physics conceptual clarity', 'Computer-based mock exam simulation'], offer: { duration: '12 Weeks Intensive', batches: 'Morning & Evening Batches' } },
  ];

  for (const ep of entrances) {
    const existing = await prisma.entranceProgram.findUnique({ where: { slug: ep.slug } });
    if (existing) {
      await prisma.entranceProgram.update({
        where: { id: existing.id },
        data: { name: ep.name, summary: ep.summary, features: ep.features, offer: ep.offer, status: 'published' },
      });
    } else {
      await prisma.entranceProgram.create({
        data: { id: require('crypto').randomUUID(), slug: ep.slug, name: ep.name, summary: ep.summary, features: ep.features, offer: ep.offer, status: 'published' },
      });
    }
  }

  // 9. Site Settings
  console.log('9. Seeding Site Settings...');
  const settings = [
    { key: 'site_title', value: 'Jyoti Education Center' },
    { key: 'brand_name', value: 'Jyoti Educations' },
    { key: 'brand_tagline', value: 'Empowering Academic Excellence & Global Education' },
    { key: 'phone_primary', value: '023-575541' },
    { key: 'phone_secondary', value: '+977-9861247784' },
    { key: 'email_primary', value: 'info@jyotieducation.edu.np' },
    { key: 'office_address', value: 'Damak-05, Main Road, Jhapa, Koshi Province, Nepal' },
    { key: 'moest_license', value: 'Approved by Ministry of Education, Science & Technology (MoEST), Nepal' },
    { key: 'icef_credential', value: 'Certified Global Agency (ICEF ID #500)' },
    { key: 'facebook_url', value: 'https://www.facebook.com/jyotieducationcenter' },
    { key: 'instagram_url', value: 'https://www.instagram.com/jyotieducation' },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { id: require('crypto').randomUUID(), key: s.key, value: s.value },
    });
  }

  console.log('✅ ALL Jyoti Education Center Database Records Successfully Seeded and Linked!');
  return { success: true };
}

module.exports = { main };

if (require.main === module) {
  main()
    .catch((e) => {
      console.error('Seeding error:', e);
      process.exit(1);
    });
}
