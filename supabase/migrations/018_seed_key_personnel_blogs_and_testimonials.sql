-- Seed Key Personnel as Admin Users
INSERT INTO admin_users (id, full_name, email, role, status) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Ravi Gupta', 'ravi@edumark.edu.np', 'super_admin', 'active'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Kabiraj Paudel', 'kabiraj@edumark.edu.np', 'admin', 'active'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Dipendra Mehta', 'dipendra@edumark.edu.np', 'editor', 'active'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'Tilak Thapa', 'tilak@edumark.edu.np', 'editor', 'active')
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  status = EXCLUDED.status;

-- Insert Generated Media Assets
INSERT INTO media_assets (bucket, path, file_name, mime_type, size_bytes, alt_text) VALUES
('public', '/images/generated/blog_uk_visa.png', 'blog_uk_visa.png', 'image/png', 997761, 'UK Student Visa Guide Cover'),
('public', '/images/generated/blog_test_prep.png', 'blog_test_prep.png', 'image/png', 773727, 'Language Test Preparation Guide Cover'),
('public', '/images/generated/blog_documentation.png', 'blog_documentation.png', 'image/png', 754099, 'Academic Documentation Guide Cover'),
('public', '/images/generated/blog_visa_guidance.png', 'blog_visa_guidance.png', 'image/png', 848184, 'Embassy Visa Interview Guide Cover'),
('public', '/images/generated/student_male_1.png', 'student_male_1.png', 'image/png', 738591, 'Male student portrait'),
('public', '/images/generated/student_female_1.png', 'student_female_1.png', 'image/png', 832265, 'Female student portrait 1'),
('public', '/images/generated/student_male_2.png', 'student_male_2.png', 'image/png', 899972, 'Male student portrait 2'),
('public', '/images/generated/student_female_2.png', 'student_female_2.png', 'image/png', 816482, 'Female student portrait 2')
ON CONFLICT (path) DO UPDATE SET
  file_name = EXCLUDED.file_name,
  mime_type = EXCLUDED.mime_type,
  size_bytes = EXCLUDED.size_bytes,
  alt_text = EXCLUDED.alt_text;

-- Seed Blogs
INSERT INTO blog_posts (slug, title, excerpt, content, category_id, cover_image_id, author_admin_id, status, featured, published_at) VALUES
(
  'navigating-uk-visa-2026',
  'Navigating the New UK Visa Regulations in 2026: A Guide for Nepali Students',
  'A comprehensive breakdown of the updated UK Student Visa requirements, financial proof updates, and graduate route options for 2026.',
  '{"blocks": [{"type": "paragraph", "text": "Staying compliant with the UK Visas and Immigration (UKVI) updates in 2026 is vital for Nepali students. The UK continues to offer world-class degrees, but key regulations regarding maintenance funds, source of income clarity, and the Graduate Route (PSW) have been adjusted. Ensure your academic credentials and bank balance statements are aligned with the new guidelines before submitting your application."}]}',
  (SELECT id FROM blog_categories WHERE slug = 'student-visa'),
  (SELECT id FROM media_assets WHERE path = '/images/generated/blog_uk_visa.png'),
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'published',
  true,
  now()
),
(
  'sop-writing-secrets',
  'How to Build a High-Value SOP: Secrets from a Documentation Lead',
  'Learn the precise outline and style tips to write a Statement of Purpose that convinces university admissions and visa officers.',
  '{"blocks": [{"type": "paragraph", "text": "Your Statement of Purpose (SOP) is the voice of your application. Admissions committees and visa officers look for authentic academic intent, clear career aspirations, and strong ties to your home country. Avoid copying templates; instead, write a structured narrative highlighting your achievements, choice of course/university, and a realistic post-study plan."}]}',
  (SELECT id FROM blog_categories WHERE slug = 'study-abroad'),
  (SELECT id FROM media_assets WHERE path = '/images/generated/blog_documentation.png'),
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
  'published',
  false,
  now()
),
(
  'pte-vs-ielts-comparison',
  'PTE Academic vs IELTS: Which English Test is Right for You?',
  'An in-depth comparison of structure, computer-grading versus human-grading, and scoring matrices to help you make an informed choice.',
  '{"blocks": [{"type": "paragraph", "text": "Choosing between IELTS and PTE Academic can make a significant difference in your study abroad timeline. While IELTS offers both paper-based and computer-delivered formats with human-graded speaking, PTE is entirely computer-based with AI-driven scoring. Analyze your strengths in speaking, typing, and listening to decide which exam pattern fits you best."}]}',
  (SELECT id FROM blog_categories WHERE slug = 'test-prep'),
  (SELECT id FROM media_assets WHERE path = '/images/generated/blog_test_prep.png'),
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
  'published',
  false,
  now()
),
(
  'finland-nordic-education-choice',
  'The Rise of Finland: Why Nordic Education is Becoming the Top Choice',
  'Exploring Finland''s tuition fee waivers, English-taught programs, and part-time work privileges for international students.',
  '{"blocks": [{"type": "paragraph", "text": "Finland has rapidly become a premier study destination for international students seeking high-quality, research-driven education. With English-taught Bachelor and Master programs, generous scholarship waivers, and post-study work rights, Finland offers a balanced student lifestyle in one of the safest and happiest nations globally."}]}',
  (SELECT id FROM blog_categories WHERE slug = 'study-abroad'),
  (SELECT id FROM media_assets WHERE path = '/images/generated/blog_uk_visa.png'),
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
  'published',
  false,
  now()
),
(
  'usa-f1-visa-interview-prep',
  'Cracking the F-1 Visa Interview: Mock Preparation Strategies',
  'Common questions asked by US consular officers, how to answer with confidence, and preparing your source-of-funds explanation.',
  '{"blocks": [{"type": "paragraph", "text": "The US F-1 visa interview is a short but critical conversation. Consular officers look for clarity on why you chose your specific university, your course details, how you plan to fund your education, and your post-graduation intentions. Practicing with mockup interviews can help you stay calm and answer concisely."}]}',
  (SELECT id FROM blog_categories WHERE slug = 'student-visa'),
  (SELECT id FROM media_assets WHERE path = '/images/generated/blog_visa_guidance.png'),
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
  'published',
  true,
  now()
),
(
  'regional-australia-career-pathways',
  'Why Regional Australia Offers Better Career Pathways for International Students',
  'Lower cost of living, regional scholarship opportunities, and extended post-study work rights in designated regional areas.',
  '{"blocks": [{"type": "paragraph", "text": "Studying in regional Australia is an excellent strategic choice. Beyond lower tuition and housing costs, regional campus graduates are eligible for extended Temporary Graduate visas (Subclass 485) and specialized regional scholarships, offering a clear and rewarding study-to-work roadmap."}]}',
  (SELECT id FROM blog_categories WHERE slug = 'study-abroad'),
  (SELECT id FROM media_assets WHERE path = '/images/generated/blog_uk_visa.png'),
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'published',
  false,
  now()
),
(
  'mastering-sat-scholarships',
  'Mastering the SAT: Essential Tips for Securing US Merit Scholarships',
  'Score targets, daily practice plans, and resource guides to excel in the digital SAT.',
  '{"blocks": [{"type": "paragraph", "text": "A strong SAT score is a key factor in securing merit-based scholarships in the USA. With the digital SAT transition, adaptive testing means prep needs to focus on time management, critical vocabulary, and high-frequency math concepts. Start early, take full-length Bluebook practice tests, and analyze every mistake."}]}',
  (SELECT id FROM blog_categories WHERE slug = 'test-prep'),
  (SELECT id FROM media_assets WHERE path = '/images/generated/blog_test_prep.png'),
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
  'published',
  false,
  now()
),
(
  'korea-japan-language-pathways',
  'South Korea and Japan: Affordable Pathways via Language Programs',
  'A detailed look at the Japanese Language School pathway and Korean TOPIK language requirements.',
  '{"blocks": [{"type": "paragraph", "text": "East Asian destinations like Japan and South Korea offer highly affordable, career-oriented education. Most students start with intensive language courses at accredited academies, which paves the way to university entry and local employment opportunities. Learning the language beforehand is your biggest asset."}]}',
  (SELECT id FROM blog_categories WHERE slug = 'study-abroad'),
  (SELECT id FROM media_assets WHERE path = '/images/generated/blog_test_prep.png'),
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
  'published',
  false,
  now()
),
(
  'avoiding-application-pitfalls',
  'Avoiding Common Pitfalls in University Applications',
  'Tips on compiling references, translating academic credentials, and managing application portal deadlines.',
  '{"blocks": [{"type": "paragraph", "text": "Many students face delays due to easily avoidable errors on their application forms. Missing document translations, poorly formatted recommendation letters, and late submissions are common issues. Create an application tracker, compile your documents early, and double-check all fields before hit submit."}]}',
  (SELECT id FROM blog_categories WHERE slug = 'study-abroad'),
  (SELECT id FROM media_assets WHERE path = '/images/generated/blog_documentation.png'),
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
  'published',
  false,
  now()
),
(
  'pre-departure-briefing-guide',
  'The Importance of Pre-Departure Briefings: What to Expect in Your First Month',
  'How to set up overseas student banking, locate accommodation, and transition to a new academic culture.',
  '{"blocks": [{"type": "paragraph", "text": "Moving to a new country is exciting but challenging. A pre-departure briefing covers essential logistics: carrying appropriate currency, opening student bank accounts, understanding health cover (OSHC/IHS), and mapping public transport. Start looking for housing early and connect with seniors for support."}]}',
  (SELECT id FROM blog_categories WHERE slug = 'study-abroad'),
  (SELECT id FROM media_assets WHERE path = '/images/generated/blog_documentation.png'),
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'published',
  false,
  now()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  category_id = EXCLUDED.category_id,
  cover_image_id = EXCLUDED.cover_image_id,
  author_admin_id = EXCLUDED.author_admin_id,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured,
  published_at = EXCLUDED.published_at,
  updated_at = now();

-- Seed Testimonials
INSERT INTO testimonials (student_name, destination, quote, image_id, status, sort_order) VALUES
(
  'Aarav Shrestha',
  'IELTS Preparation',
  'Thanks to the mock test analysis and personalized speaking reviews at EduMark, I scored a Band 8.5 in IELTS. The teachers are very supportive and highlight exactly where you need to improve.',
  (SELECT id FROM media_assets WHERE path = '/images/generated/student_male_1.png'),
  'published',
  1
),
(
  'Sneha Tamang',
  'PTE Academic',
  'EduMark''s PTE classes are equipped with computer practice labs that simulate the actual exam environment. I achieved a score of 79, which helped me secure admission to a top Australian university!',
  (SELECT id FROM media_assets WHERE path = '/images/generated/student_female_1.png'),
  'published',
  2
),
(
  'Binod Adhikari',
  'CMAT Prep',
  'Cracking CMAT is all about time management. The quick-solving tips for quantitative ability and regular mock tests at EduMark gave me the confidence to score top marks.',
  (SELECT id FROM media_assets WHERE path = '/images/generated/student_male_1.png'),
  'published',
  3
),
(
  'Pooja Karki',
  'CEE Prep',
  'EduMark''s medical entrance classes have excellent study materials. The faculty reviews past questions and helps simplify tough physics and chemistry concepts.',
  (SELECT id FROM media_assets WHERE path = '/images/generated/student_female_1.png'),
  'published',
  4
),
(
  'Roshan Thapa',
  'Engineering Prep',
  'Highly recommend EduMark for IOE preparation. The teacher-student ratio is perfect, allowing for direct doubt-solving, and the weekly mock exams keep you on track.',
  (SELECT id FROM media_assets WHERE path = '/images/generated/student_male_1.png'),
  'published',
  5
),
(
  'Kriti Joshi',
  'IELTS Preparation',
  'I was struggling with my writing score, but the individual feedback sessions at EduMark completely transformed my approach. I scored a Band 7.5 on my first attempt!',
  (SELECT id FROM media_assets WHERE path = '/images/generated/student_female_1.png'),
  'published',
  6
),
(
  'Nischal Dahal',
  'PTE Academic',
  'Fantastic infrastructure and excellent instructors. The AI evaluation of speaking and reading during practice sessions made preparing for the PTE incredibly effective.',
  (SELECT id FROM media_assets WHERE path = '/images/generated/student_male_2.png'),
  'published',
  7
),
(
  'Anjali Shrestha',
  'SAT Prep',
  'Securing a US merit scholarship was my dream. The math-specific shortcuts and verbal reasoning tips taught at EduMark helped me hit 1480 on my digital SAT.',
  (SELECT id FROM media_assets WHERE path = '/images/generated/student_female_2.png'),
  'published',
  8
),
(
  'Sandesh Giri',
  'CMAT Prep',
  'The logical reasoning and verbal lessons were top notch. EduMark counselors did a profile review along with the class, helping me choose the best colleges.',
  (SELECT id FROM media_assets WHERE path = '/images/generated/student_male_2.png'),
  'published',
  9
),
(
  'Ritu Basnet',
  'CEE Prep',
  'Excellent test series and daily worksheets. Preparing alongside determined peers and certified mentors at EduMark kept me motivated all through the preparation phase.',
  (SELECT id FROM media_assets WHERE path = '/images/generated/student_female_2.png'),
  'published',
  10
);
