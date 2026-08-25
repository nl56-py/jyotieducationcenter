-- Seed Key Personnel as Admin Users
INSERT INTO admin_users (id, full_name, email, role, status) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a10', 'Kedar Poudel', 'kedar@jyotieducations.edu.np', 'super_admin', 'active'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Chandra Kala Dahal', 'chandrakala@jyotieducations.edu.np', 'super_admin', 'active'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Narayan Poudel', 'narayan@jyotieducations.edu.np', 'admin', 'active'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Sherya Basnet', 'sherya@jyotieducations.edu.np', 'editor', 'active')
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

-- Seed Team Members
-- Kedar Poudel — Director
-- Chandra Kala Dahal — Board of Director
-- Narayan Poudel — Manager
-- Sherya Basnet — Front Desk Officer
INSERT INTO team_members (slug, name, role_title, bio, email, phone, badge_text, sort_order, status, featured) VALUES
(
  'kedar-poudel',
  'Kedar Poudel',
  'Director',
  'Kedar Poudel is the founding Director of Jyoti Education Center, Damak. With over 15 years of experience in international education consulting, he has guided thousands of students from Eastern Nepal to prestigious universities across the UK, Australia, USA, Canada, Japan, South Korea, Finland, and beyond. His vision is to make quality education accessible to every aspiring student in the region. Under his leadership, JEC has grown from a single-room office to one of the most trusted educational consultancies in Jhapa district, holding MoEST license and ICEF membership. He personally oversees institutional partnerships, quality assurance, and strategic growth initiatives.',
  'kedar@jyotieducations.edu.np',
  '+977-9861247784',
  'Founder & Director',
  1, 'published', true
),
(
  'chandra-kala-dahal',
  'Chandra Kala Dahal',
  'Board of Director',
  'Chandra Kala Dahal serves as a Board of Director at Jyoti Education Center, bringing extensive governance experience and strategic insight to the organization. With a background in educational administration and community development, she plays a vital role in shaping institutional policies, quality benchmarks, and long-term growth strategies. Her commitment to women''s empowerment in education has been instrumental in encouraging female students from rural communities to pursue higher education abroad. She actively participates in partnership development with international universities and regulatory compliance with Nepal''s Ministry of Education, Science and Technology.',
  'chandrakala@jyotieducations.edu.np',
  '+977-9800000010',
  'Board Member',
  2, 'published', true
),
(
  'narayan-poudel',
  'Narayan Poudel',
  'Manager',
  'Narayan Poudel is the Operations Manager at Jyoti Education Center, responsible for the day-to-day management of counseling services, student file processing, and office coordination. With strong organizational skills and a deep understanding of university admission cycles across multiple countries, he ensures that every student application is tracked, deadlines are met, and documentation is error-free. He manages the team of counselors, coordinates with overseas university representatives, and oversees the logistics of pre-departure briefings.',
  'narayan@jyotieducations.edu.np',
  '+977-9800000011',
  'Operations Manager',
  3, 'published', true
),
(
  'sherya-basnet',
  'Sherya Basnet',
  'Front Desk Officer',
  'Sherya Basnet is the Front Desk Officer at Jyoti Education Center, serving as the first point of contact for all students and visitors. She manages appointment scheduling, walk-in inquiries, phone and email communications, and ensures a welcoming environment at the Damak office. With excellent interpersonal skills and fluency in Nepali and English, she provides initial guidance to prospective students about the services offered by JEC, helps them fill out inquiry forms, and connects them with the appropriate counselor based on their destination country and academic interests.',
  'sherya@jyotieducations.edu.np',
  '+977-9800000012',
  'Front Desk',
  4, 'published', true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  role_title = EXCLUDED.role_title,
  bio = EXCLUDED.bio,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  badge_text = EXCLUDED.badge_text,
  sort_order = EXCLUDED.sort_order,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

-- Seed Blogs (10 full-length articles)
INSERT INTO blog_posts (slug, title, excerpt, content, category_id, cover_image_id, author_admin_id, status, featured, published_at) VALUES
(
  'navigating-uk-visa-2026',
  'Navigating the New UK Visa Regulations in 2026: A Guide for Nepali Students',
  'A comprehensive breakdown of the updated UK Student Visa requirements, financial proof updates, and graduate route options for 2026 by Jyoti Education Center.',
  '{"blocks": [{"type": "heading", "text": "Understanding the 2026 UK Student Visa Landscape"}, {"type": "paragraph", "text": "The United Kingdom remains one of the most sought-after study destinations for Nepali students, and 2026 brings several important updates to the UK Visas and Immigration (UKVI) regulations. Whether you are planning to study at a Russell Group university or a modern institution, understanding the latest visa requirements is essential for a smooth application process."}, {"type": "heading", "text": "Key Changes in Financial Requirements"}, {"type": "paragraph", "text": "The maintenance fund requirements have been updated for 2026. Students studying in London now need to show at least GBP 1,334 per month, while those outside London need GBP 1,023 per month. The funds must be held for a consecutive 28-day period, and the closing balance date must fall within 31 days of the visa application date. Jyoti Education Center in Damak helps students prepare their bank statements and financial documentation well in advance to meet these requirements."}, {"type": "heading", "text": "Graduate Route (Post-Study Work) Updates"}, {"type": "paragraph", "text": "The Graduate Route continues to allow international students to stay and work in the UK for 2 years after completing their degree (3 years for PhD graduates). However, 2026 has introduced stricter checks on attendance records and academic progression. Universities must confirm that students have actively attended and completed their courses."}, {"type": "heading", "text": "CAS and Offer Letter Timeline"}, {"type": "paragraph", "text": "The Confirmation of Acceptance for Studies (CAS) must now be used within 6 months of issue. We recommend starting your application at least 4-5 months before your intended start date. At Jyoti Education Center, our counselors help you shortlist universities, prepare your Statement of Purpose, gather all required documents, and submit applications in a timely manner."}, {"type": "heading", "text": "Tips for a Successful UK Visa Application"}, {"type": "paragraph", "text": "First, ensure your IELTS or PTE scores meet the minimum requirements for your chosen course. Second, prepare a credible source of funds explanation showing your sponsor income, property, or business. Third, write a clear and honest Statement of Purpose. Our documentation team at JEC reviews every file before submission to minimize the risk of refusal."}, {"type": "paragraph", "text": "Contact Jyoti Education Center in Damak-05, Jhapa for personalized UK visa guidance. Call us at 023-575541 or 986-1247784."}]}',
  (SELECT id FROM blog_categories WHERE slug = 'student-visa'),
  (SELECT id FROM media_assets WHERE path = '/images/generated/blog_uk_visa.png'),
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a10',
  'published',
  true,
  now()
),
(
  'sop-writing-secrets',
  'How to Build a High-Value SOP: Secrets from a Documentation Lead',
  'Learn the precise outline and style tips from Jyoti Educations to write a Statement of Purpose that convinces university admissions and visa officers.',
  '{"blocks": [{"type": "heading", "text": "What is a Statement of Purpose?"}, {"type": "paragraph", "text": "A Statement of Purpose (SOP) is a personal essay that accompanies your university application and visa documentation. It is your opportunity to tell the admissions committee and visa officers who you are, what motivates you academically, why you have chosen a particular university and course, and what you plan to do after graduating."}, {"type": "heading", "text": "Structure of an Effective SOP"}, {"type": "paragraph", "text": "An effective SOP follows a five-paragraph structure: (1) An engaging opening with a personal story. (2) Your academic background with relevant coursework and grades. (3) Professional or extracurricular experience. (4) Why this university and country with specific reasons. (5) Future career goals with a clear, realistic plan."}, {"type": "heading", "text": "Common Mistakes to Avoid"}, {"type": "paragraph", "text": "Many students write generic SOPs. Avoid cliches and be specific. Do not copy from templates. Avoid excessive flattery without substance. Do not include false information. Keep the tone professional yet personal, and always proofread."}, {"type": "heading", "text": "How Jyoti Education Center Helps"}, {"type": "paragraph", "text": "Our documentation specialists work one-on-one with each student to craft a unique SOP. We start with a detailed interview, then help outline and draft the SOP with feedback on structure, content, tone, and language. Our team has helped hundreds of students secure admissions across the UK, Australia, USA, Canada, Finland, Japan, and South Korea."}, {"type": "paragraph", "text": "Visit our office at Damak-05, Jhapa or call 023-575541 to schedule a free SOP review session."}]}',
  (SELECT id FROM blog_categories WHERE slug = 'study-abroad'),
  (SELECT id FROM media_assets WHERE path = '/images/generated/blog_documentation.png'),
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a10',
  'published',
  false,
  now()
),
(
  'pte-vs-ielts-comparison',
  'PTE Academic vs IELTS: Which English Test is Right for You?',
  'An in-depth comparison of structure, scoring, and test-taking experience by Jyoti Test Preparation experts.',
  '{"blocks": [{"type": "heading", "text": "PTE Academic vs IELTS: An Overview"}, {"type": "paragraph", "text": "Both PTE and IELTS are widely accepted by universities and immigration authorities. They differ significantly in format, scoring methodology, and test-taking experience. Understanding these differences helps you choose the test that best suits your strengths."}, {"type": "heading", "text": "Test Format Comparison"}, {"type": "paragraph", "text": "IELTS has four sections: Listening, Reading, Writing, and Speaking (face-to-face). PTE Academic is entirely computer-based in a single session of about 3 hours with AI-driven scoring."}, {"type": "heading", "text": "Scoring and Results"}, {"type": "paragraph", "text": "IELTS uses a 9-band system with results in 3-13 days. PTE uses a 10-90 score range with results within 48 hours."}, {"type": "heading", "text": "Which Test Should You Choose?"}, {"type": "paragraph", "text": "Choose IELTS if you prefer face-to-face speaking or handwriting essays. Choose PTE if you prefer typing, want faster results, or feel more comfortable speaking to a computer."}, {"type": "heading", "text": "Preparation at Jyoti Education Center"}, {"type": "paragraph", "text": "We offer dedicated classes for both tests. Our IELTS classes include mock speaking interviews and timed writing workshops. Our PTE lab features individual computer stations simulating the actual test environment."}, {"type": "paragraph", "text": "Enroll today at Jyoti Education Center, Damak-05, Jhapa. Contact: 023-575541."}]}',
  (SELECT id FROM blog_categories WHERE slug = 'test-prep'),
  (SELECT id FROM media_assets WHERE path = '/images/generated/blog_test_prep.png'),
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a10',
  'published',
  false,
  now()
),
(
  'finland-nordic-education-choice',
  'The Rise of Finland: Why Nordic Education is Becoming the Top Choice',
  'Exploring Finland''s tuition fee waivers, English-taught programs, and part-time work privileges for international students.',
  '{"blocks": [{"type": "heading", "text": "Why Finland Is Emerging as a Top Study Destination"}, {"type": "paragraph", "text": "Finland offers world-class education, cutting-edge research facilities, and high quality of life with a unique combination of academic excellence and affordability."}, {"type": "heading", "text": "Tuition Fees and Scholarships"}, {"type": "paragraph", "text": "Fees range from EUR 4,000 to EUR 18,000 per year. Many universities offer scholarship waivers covering 50 to 100 percent of tuition."}, {"type": "heading", "text": "English-Taught Programs"}, {"type": "paragraph", "text": "LUT University, University of Oulu, Helsinki, Aalto, and Tampere offer numerous English programs in IT, Business, Engineering, and Health Sciences."}, {"type": "heading", "text": "Work Rights and Post-Study"}, {"type": "paragraph", "text": "Students can work up to 25 hours per week. After graduation, Finland offers a one-year residence permit extension for job seeking."}, {"type": "heading", "text": "How JEC Supports Finland-Bound Students"}, {"type": "paragraph", "text": "We provide end-to-end support from university selection to visa documentation and pre-departure briefings."}, {"type": "paragraph", "text": "Interested in Finland? Visit Jyoti Education Center, Damak-05, Jhapa or call 023-575541."}]}',
  (SELECT id FROM blog_categories WHERE slug = 'study-abroad'),
  (SELECT id FROM media_assets WHERE path = '/images/generated/blog_uk_visa.png'),
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
  'published',
  false,
  now()
),
(
  'usa-f1-visa-interview-prep',
  'Cracking the F-1 Visa Interview: Mock Preparation Strategies at Jyoti',
  'Common questions, confident answers, and financial documentation tips from Jyoti Education Center.',
  '{"blocks": [{"type": "heading", "text": "The F-1 Visa Interview: What to Expect"}, {"type": "paragraph", "text": "The consular officer assesses your academic intent, financial capability, ties to Nepal, and credibility within a 3-5 minute conversation. At JEC, we conduct intensive mock interview sessions."}, {"type": "heading", "text": "Most Common Questions"}, {"type": "paragraph", "text": "Officers ask about your university choice, course of study, funding plans, post-graduation intentions, and why the USA."}, {"type": "heading", "text": "Financial Documentation Tips"}, {"type": "paragraph", "text": "Show consistent bank balances, not sudden deposits. Provide business registration, tax returns, salary certificates, and property valuations as applicable."}, {"type": "heading", "text": "Mock Interview Practice"}, {"type": "paragraph", "text": "We simulate the actual embassy environment with recorded sessions and detailed feedback on body language, eye contact, and response clarity."}, {"type": "heading", "text": "Common Reasons for Denial"}, {"type": "paragraph", "text": "Insufficient funds, lack of ties to Nepal, inconsistent answers, and insufficient knowledge about the university are common reasons."}, {"type": "paragraph", "text": "Start your US journey with confidence. Contact Jyoti Education Center, Damak-05, Jhapa. Phone: 023-575541."}]}',
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
  'Lower cost of living, regional scholarship opportunities, and extended post-study work rights.',
  '{"blocks": [{"type": "heading", "text": "What Makes Regional Australia Special?"}, {"type": "paragraph", "text": "Regional campuses in Adelaide, Perth, Gold Coast, Hobart, and Canberra offer the same quality education as metropolitan counterparts with significant additional benefits."}, {"type": "heading", "text": "Lower Cost of Living"}, {"type": "paragraph", "text": "Costs can be 30-50 percent cheaper than Sydney or Melbourne, with students spending AUD 1,200-1,500 per month instead of AUD 2,000-2,500."}, {"type": "heading", "text": "Extended Post-Study Work Rights"}, {"type": "paragraph", "text": "Regional graduates get 3-4 years of post-study work rights compared to 2 years for metropolitan graduates."}, {"type": "heading", "text": "Scholarship Opportunities"}, {"type": "paragraph", "text": "Destination Australia scholarships up to AUD 15,000 per year plus university-specific merit scholarships are available."}, {"type": "heading", "text": "Popular Regional Universities"}, {"type": "paragraph", "text": "University of Adelaide, University of Tasmania, Charles Darwin University, James Cook University, and Federation University offer world-class programs with strong industry placements."}, {"type": "paragraph", "text": "Explore regional Australia pathways with Jyoti Education Center. Visit us at Damak-05, Jhapa or call 023-575541."}]}',
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
  'Score targets, daily practice plans, and resource guides from Jyoti SAT coaching.',
  '{"blocks": [{"type": "heading", "text": "Why the SAT Matters for US Scholarships"}, {"type": "paragraph", "text": "A strong SAT score is one of the most effective ways to secure merit-based scholarships at US universities."}, {"type": "heading", "text": "Understanding the Digital SAT Format"}, {"type": "paragraph", "text": "The adaptive digital SAT has Reading and Writing (54 questions) and Math (44 questions) sections. Total score: 400-1600."}, {"type": "heading", "text": "Effective Preparation Strategies"}, {"type": "paragraph", "text": "Start 3-4 months before your test date. Build fundamentals in algebra, geometry, and data analysis. Practice active reading and master grammar rules."}, {"type": "heading", "text": "Math Section Tips"}, {"type": "paragraph", "text": "Use the built-in Desmos calculator efficiently. Focus on linear equations, quadratic functions, ratios, and word problems."}, {"type": "heading", "text": "SAT Coaching at JEC"}, {"type": "paragraph", "text": "Our SAT program includes comprehensive materials, weekly mock tests, individual tutoring, and college counseling to achieve 1400+ scores."}, {"type": "paragraph", "text": "Register at Jyoti Education Center, Damak-05, Jhapa. Call: 023-575541 | 986-1247784."}]}',
  (SELECT id FROM blog_categories WHERE slug = 'test-prep'),
  (SELECT id FROM media_assets WHERE path = '/images/generated/blog_test_prep.png'),
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a10',
  'published',
  false,
  now()
),
(
  'korea-japan-language-pathways',
  'South Korea and Japan: Affordable Pathways via Language Programs',
  'A detailed look at the Japanese Language School pathway and Korean TOPIK language requirements.',
  '{"blocks": [{"type": "heading", "text": "East Asia: Affordable and Career-Oriented Education"}, {"type": "paragraph", "text": "Japan and South Korea offer affordable tuition, rich cultural experiences, and clear pathways from education to employment."}, {"type": "heading", "text": "The Japanese Language School Pathway"}, {"type": "paragraph", "text": "Students enroll in 1-2 year intensive Japanese language programs. During this period, they work part-time up to 28 hours per week and prepare for university entrance exams. Tuition: JPY 700,000-900,000 per year."}, {"type": "heading", "text": "Studying in South Korea"}, {"type": "paragraph", "text": "Korean universities offer 30-100 percent tuition scholarships. TOPIK is required for Korean-taught programs, but English-taught programs are increasing."}, {"type": "heading", "text": "JLPT and NAT Test Preparation"}, {"type": "paragraph", "text": "We offer dedicated Japanese language classes covering hiragana, katakana, kanji, grammar patterns, and conversational practice."}, {"type": "heading", "text": "Certificate of Eligibility (COE) Process"}, {"type": "paragraph", "text": "The COE requires financial documentation, academic transcripts, and a study plan. Our team handles the entire application process."}, {"type": "paragraph", "text": "Explore Japan and South Korea pathways at Jyoti Education Center, Damak-05. Call: 023-575541."}]}',
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
  'Tips on compiling references, translating credentials, and managing deadlines from Jyoti Education Center.',
  '{"blocks": [{"type": "heading", "text": "Why Applications Get Delayed or Rejected"}, {"type": "paragraph", "text": "Thousands of students experience delays or rejections due to avoidable mistakes."}, {"type": "heading", "text": "Pitfall 1: Incomplete Documentation"}, {"type": "paragraph", "text": "Missing transcripts, expired passport copies, unsigned recommendation letters, and improperly formatted financial documents are common. Always create a checklist."}, {"type": "heading", "text": "Pitfall 2: Generic SOPs"}, {"type": "paragraph", "text": "Mention specific professors, research groups, and course modules. Tailor each SOP to each university."}, {"type": "heading", "text": "Pitfall 3: Missing Deadlines"}, {"type": "paragraph", "text": "Start your application 6-8 months in advance. Popular programs fill up early."}, {"type": "heading", "text": "Pitfall 4: Weak References"}, {"type": "paragraph", "text": "Request references from people who know you well. Provide them your CV and program details."}, {"type": "heading", "text": "How JEC Prevents These Mistakes"}, {"type": "paragraph", "text": "Every student gets a dedicated counselor managing their entire application lifecycle with checklists, deadline tracking, and quality checks."}, {"type": "paragraph", "text": "Get expert guidance from Jyoti Education Center, Damak-05, Jhapa. Call: 023-575541."}]}',
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
  '{"blocks": [{"type": "heading", "text": "Why Pre-Departure Briefings Matter"}, {"type": "paragraph", "text": "The transition involves navigating unfamiliar systems, cultural differences, and practical challenges. We conduct comprehensive briefing sessions covering everything from airport procedures to setting up life abroad."}, {"type": "heading", "text": "Before You Leave Nepal"}, {"type": "paragraph", "text": "Keep important documents in carry-on. Make digital scans. Inform your bank. Exchange a small amount of foreign currency."}, {"type": "heading", "text": "Your First Week"}, {"type": "paragraph", "text": "Activate SIM card, open bank account, register with university, understand public transport, and locate grocery stores."}, {"type": "heading", "text": "Health Insurance"}, {"type": "paragraph", "text": "Maintain valid health cover (OSHC in Australia, IHS in UK). Register with a local GP. Keep insurance details accessible."}, {"type": "heading", "text": "Academic Culture"}, {"type": "paragraph", "text": "Western academics emphasize independent learning, critical thinking, and active participation. Plagiarism is taken extremely seriously."}, {"type": "heading", "text": "Staying Connected"}, {"type": "paragraph", "text": "Join Nepali student associations and university clubs. Most universities have international student support offices. JEC maintains contact even after students leave Nepal."}, {"type": "paragraph", "text": "Attend our next briefing at Jyoti Education Center, Damak-05. Call: 023-575541."}]}',
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
  'IELTS Preparation (Band 8.5)',
  'Thanks to the mock test analysis and personalized speaking reviews at Jyoti Education Corner, I scored a Band 8.5 in IELTS. The teachers are very supportive and highlight exactly where you need to improve.',
  (SELECT id FROM media_assets WHERE path = '/images/generated/student_male_1.png'),
  'published',
  1
),
(
  'Sneha Tamang',
  'PTE Academic (Score 79) - Australia',
  'Jyoti Education Center''s PTE classes are equipped with computer practice labs that simulate the actual exam environment. I achieved a score of 79, which helped me secure admission to a top Australian university!',
  (SELECT id FROM media_assets WHERE path = '/images/generated/student_female_1.png'),
  'published',
  2
),
(
  'Binod Adhikari',
  'CMAT Prep - Management Intake',
  'Cracking CMAT is all about time management. The quick-solving tips for quantitative ability and regular mock tests at Jyoti Educations gave me the confidence to score top marks.',
  (SELECT id FROM media_assets WHERE path = '/images/generated/student_male_1.png'),
  'published',
  3
),
(
  'Pooja Karki',
  'CEE Prep - Medical Entrance',
  'Jyoti''s medical entrance classes have excellent study materials. The faculty reviews past questions and helps simplify tough physics and chemistry concepts.',
  (SELECT id FROM media_assets WHERE path = '/images/generated/student_female_1.png'),
  'published',
  4
),
(
  'Roshan Thapa',
  'Engineering Prep - IOE Entrance',
  'Highly recommend Jyoti Education Center for IOE preparation. The teacher-student ratio is perfect, allowing for direct doubt-solving, and the weekly mock exams keep you on track.',
  (SELECT id FROM media_assets WHERE path = '/images/generated/student_male_1.png'),
  'published',
  5
),
(
  'Kriti Joshi',
  'IELTS Preparation (Band 7.5)',
  'I was struggling with my writing score, but the individual feedback sessions at Jyoti Education Corner completely transformed my approach. I scored a Band 7.5 on my first attempt!',
  (SELECT id FROM media_assets WHERE path = '/images/generated/student_female_1.png'),
  'published',
  6
),
(
  'Nischal Dahal',
  'PTE Academic - Australia',
  'Fantastic infrastructure and excellent instructors in Damak. The AI evaluation of speaking and reading during practice sessions at Jyoti made preparing for the PTE incredibly effective.',
  (SELECT id FROM media_assets WHERE path = '/images/generated/student_male_2.png'),
  'published',
  7
),
(
  'Anjali Shrestha',
  'SAT Prep - US Merit Scholarship',
  'Securing a US merit scholarship was my dream. The math-specific shortcuts and verbal reasoning tips taught at Jyoti Education Center helped me hit 1480 on my digital SAT.',
  (SELECT id FROM media_assets WHERE path = '/images/generated/student_female_2.png'),
  'published',
  8
),
(
  'Sandesh Giri',
  'CMAT Prep - Management',
  'The logical reasoning and verbal lessons were top notch. Jyoti counselors did a profile review along with the class, helping me choose the best management colleges.',
  (SELECT id FROM media_assets WHERE path = '/images/generated/student_male_2.png'),
  'published',
  9
),
(
  'Ritu Basnet',
  'CEE Prep - Medical Entrance',
  'Excellent test series and daily worksheets. Preparing alongside determined peers and certified mentors at Jyoti Education Center kept me motivated all through the preparation phase.',
  (SELECT id FROM media_assets WHERE path = '/images/generated/student_female_2.png'),
  'published',
  10
);
