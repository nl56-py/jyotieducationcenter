-- =====================================================
-- Jyoti Education Center - Updated Team & Full Blogs
-- Run in phpMyAdmin: jyoti_jecapp database
-- =====================================================

-- ===========================================
-- STEP 1: Delete old team members
-- ===========================================
DELETE FROM team_members;

-- ===========================================
-- STEP 2: Insert correct team members
-- ===========================================
INSERT INTO team_members (id, slug, name, role_title, bio, email, phone, badge_text, badge_icon, image_id, sort_order, status, featured, social_links, created_at, updated_at) VALUES
(
  UUID(),
  'kedar-poudel',
  'Kedar Poudel',
  'Director',
  'Kedar Poudel is the founding Director of Jyoti Education Center, Damak. With over 15 years of experience in international education consulting, he has guided thousands of students from Eastern Nepal to prestigious universities across the UK, Australia, USA, Canada, Japan, South Korea, Finland, and beyond. His vision is to make quality education accessible to every aspiring student in the region. Under his leadership, JEC has grown from a single-room office to one of the most trusted educational consultancies in Jhapa district, holding MoEST license and ICEF membership. He personally oversees institutional partnerships, quality assurance, and strategic growth initiatives.',
  'kedar@jyotieducations.edu.np',
  '+977-9861247784',
  'Founder & Director',
  NULL,
  (SELECT id FROM media_assets WHERE path = '/images/brand/logo.jpeg' LIMIT 1),
  1,
  'published',
  1,
  NULL,
  NOW(),
  NOW()
),
(
  UUID(),
  'chandra-kala-dahal',
  'Chandra Kala Dahal',
  'Board of Director',
  'Chandra Kala Dahal serves as a Board of Director at Jyoti Education Center, bringing extensive governance experience and strategic insight to the organization. With a background in educational administration and community development, she plays a vital role in shaping institutional policies, quality benchmarks, and long-term growth strategies. Her commitment to women''s empowerment in education has been instrumental in encouraging female students from rural communities to pursue higher education abroad. She actively participates in partnership development with international universities and regulatory compliance with Nepal''s Ministry of Education, Science and Technology.',
  'chandrakala@jyotieducations.edu.np',
  '+977-9800000010',
  'Board Member',
  NULL,
  (SELECT id FROM media_assets WHERE path = '/images/brand/logo.jpeg' LIMIT 1),
  2,
  'published',
  1,
  NULL,
  NOW(),
  NOW()
),
(
  UUID(),
  'narayan-poudel',
  'Narayan Poudel',
  'Manager',
  'Narayan Poudel is the Operations Manager at Jyoti Education Center, responsible for the day-to-day management of counseling services, student file processing, and office coordination. With strong organizational skills and a deep understanding of university admission cycles across multiple countries, he ensures that every student application is tracked, deadlines are met, and documentation is error-free. He manages the team of counselors, coordinates with overseas university representatives, and oversees the logistics of pre-departure briefings. His calm demeanor and problem-solving abilities make him the go-to person when students face last-minute challenges with their applications or visa processes.',
  'narayan@jyotieducations.edu.np',
  '+977-9800000011',
  'Operations Manager',
  NULL,
  (SELECT id FROM media_assets WHERE path = '/images/brand/logo.jpeg' LIMIT 1),
  3,
  'published',
  1,
  NULL,
  NOW(),
  NOW()
),
(
  UUID(),
  'sherya-basnet',
  'Sherya Basnet',
  'Front Desk Officer',
  'Sherya Basnet is the Front Desk Officer at Jyoti Education Center, serving as the first point of contact for all students and visitors. She manages appointment scheduling, walk-in inquiries, phone and email communications, and ensures a welcoming environment at the Damak office. With excellent interpersonal skills and fluency in Nepali and English, she provides initial guidance to prospective students about the services offered by JEC, helps them fill out inquiry forms, and connects them with the appropriate counselor based on their destination country and academic interests. Her warm and professional approach makes every student feel valued from their very first interaction.',
  'sherya@jyotieducations.edu.np',
  '+977-9800000012',
  'Front Desk',
  NULL,
  (SELECT id FROM media_assets WHERE path = '/images/brand/logo.jpeg' LIMIT 1),
  4,
  'published',
  1,
  NULL,
  NOW(),
  NOW()
);

-- ===========================================
-- STEP 3: Update admin_users table too
-- ===========================================
DELETE FROM admin_users WHERE id IN ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14');

UPDATE admin_users SET full_name = 'Kedar Poudel', email = 'kedar@jyotieducations.edu.np' WHERE id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a10';

INSERT IGNORE INTO admin_users (id, full_name, email, role, status) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Chandra Kala Dahal', 'chandrakala@jyotieducations.edu.np', 'super_admin', 'active'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Narayan Poudel', 'narayan@jyotieducations.edu.np', 'admin', 'active'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Sherya Basnet', 'sherya@jyotieducations.edu.np', 'editor', 'active');

-- ===========================================
-- STEP 4: Update blog posts with full content
-- ===========================================
UPDATE blog_posts SET content = '{"blocks": [
  {"type": "heading", "text": "Understanding the 2026 UK Student Visa Landscape"},
  {"type": "paragraph", "text": "The United Kingdom remains one of the most sought-after study destinations for Nepali students, and 2026 brings several important updates to the UK Visas and Immigration (UKVI) regulations. Whether you are planning to study at a Russell Group university or a modern institution, understanding the latest visa requirements is essential for a smooth application process."},
  {"type": "heading", "text": "Key Changes in Financial Requirements"},
  {"type": "paragraph", "text": "The maintenance fund requirements have been updated for 2026. Students studying in London now need to show at least £1,334 per month (up from £1,334 in previous years adjusted for inflation), while those outside London need £1,023 per month. The funds must be held for a consecutive 28-day period, and the closing balance date must fall within 31 days of the visa application date. Jyoti Education Center in Damak helps students prepare their bank statements and financial documentation well in advance to meet these requirements."},
  {"type": "heading", "text": "Graduate Route (Post-Study Work) Updates"},
  {"type": "paragraph", "text": "The Graduate Route continues to allow international students to stay and work in the UK for 2 years after completing their degree (3 years for PhD graduates). However, 2026 has introduced stricter checks on attendance records and academic progression. Universities must confirm that students have actively attended and completed their courses. This means maintaining good academic standing throughout your studies is more important than ever."},
  {"type": "heading", "text": "CAS and Offer Letter Timeline"},
  {"type": "paragraph", "text": "The Confirmation of Acceptance for Studies (CAS) must now be used within 6 months of issue. We recommend starting your application at least 4-5 months before your intended start date. At Jyoti Education Center, our counselors help you shortlist universities, prepare your Statement of Purpose, gather all required documents, and submit applications in a timely manner to secure your CAS well before the visa filing window."},
  {"type": "heading", "text": "Tips for a Successful UK Visa Application"},
  {"type": "paragraph", "text": "First, ensure your IELTS or PTE scores meet the minimum requirements for your chosen course — typically IELTS 6.0 overall with no band below 5.5 for undergraduate programs. Second, prepare a credible source of funds explanation showing your sponsor''s income, property, or business. Third, write a clear and honest Statement of Purpose that explains why you chose the UK, your specific university, and your career plans after graduation. Our documentation team at JEC reviews every file before submission to minimize the risk of refusal."},
  {"type": "paragraph", "text": "Contact Jyoti Education Center in Damak-05, Jhapa for personalized UK visa guidance and university selection support. Call us at 023-575541 or 986-1247784."}
]}' WHERE slug = 'navigating-uk-visa-2026';

UPDATE blog_posts SET content = '{"blocks": [
  {"type": "heading", "text": "What is a Statement of Purpose?"},
  {"type": "paragraph", "text": "A Statement of Purpose (SOP) is a personal essay that accompanies your university application and visa documentation. It is your opportunity to tell the admissions committee and visa officers who you are, what motivates you academically, why you have chosen a particular university and course, and what you plan to do after graduating. A well-written SOP can be the difference between an acceptance and a rejection, especially at competitive universities."},
  {"type": "heading", "text": "Structure of an Effective SOP"},
  {"type": "paragraph", "text": "An effective SOP typically follows a five-paragraph structure: (1) An engaging opening that introduces your academic interest and a personal story or experience that inspired your passion for the field. (2) Your academic background — highlight relevant coursework, projects, and grades, especially those related to your chosen program. (3) Professional or extracurricular experience — internships, volunteer work, leadership roles, or research projects that demonstrate your commitment. (4) Why this university and country — specific reasons such as faculty expertise, research facilities, course modules, or industry connections. (5) Future career goals — a clear, realistic plan for how this degree fits into your long-term professional aspirations and how you plan to contribute to Nepal after returning."},
  {"type": "heading", "text": "Common Mistakes to Avoid"},
  {"type": "paragraph", "text": "Many students make the mistake of writing generic SOPs that could apply to any university. Avoid clichés like ''Since childhood, I have always been fascinated by...'' Instead, be specific and authentic. Do not copy from online templates — admissions officers have read thousands of SOPs and can easily spot plagiarism. Avoid excessive flattery of the university without substance. Do not include false information about your grades or experiences. Keep the tone professional yet personal, and always proofread for grammar and spelling errors."},
  {"type": "heading", "text": "How Jyoti Education Center Helps"},
  {"type": "paragraph", "text": "At Jyoti Education Center, our documentation specialists work one-on-one with each student to craft a unique SOP. We start with a detailed interview to understand your background, motivations, and goals. Then we help you outline and draft the SOP, providing feedback on structure, content, tone, and language. We ensure that your SOP aligns with the specific requirements of your target university and visa office. Our team has helped hundreds of students from Damak and Eastern Nepal secure admissions to universities in the UK, Australia, USA, Canada, Finland, Japan, and South Korea."},
  {"type": "paragraph", "text": "Visit our office at Damak-05, Jhapa or call 023-575541 to schedule a free SOP review session with our documentation team."}
]}' WHERE slug = 'sop-writing-secrets';

UPDATE blog_posts SET content = '{"blocks": [
  {"type": "heading", "text": "PTE Academic vs IELTS: An Overview"},
  {"type": "paragraph", "text": "If you are planning to study abroad, one of the first decisions you will face is choosing between PTE Academic and IELTS as your English language proficiency test. Both tests are widely accepted by universities and immigration authorities in Australia, the UK, Canada, New Zealand, and many other countries. However, they differ significantly in format, scoring methodology, and test-taking experience. Understanding these differences can help you choose the test that best suits your strengths."},
  {"type": "heading", "text": "Test Format Comparison"},
  {"type": "paragraph", "text": "IELTS offers two delivery modes: paper-based and computer-delivered. The test has four sections — Listening (30 minutes), Reading (60 minutes), Writing (60 minutes), and Speaking (11-14 minutes face-to-face with an examiner). The Speaking test may be conducted on a different day. PTE Academic, on the other hand, is entirely computer-based and completed in a single session of about 3 hours. It combines skills in integrated tasks — for example, you might listen to a lecture and then summarize it in writing. The Speaking section is recorded via microphone and scored by AI."},
  {"type": "heading", "text": "Scoring and Results"},
  {"type": "paragraph", "text": "IELTS uses a 9-band scoring system, with each section scored individually and an overall band calculated as an average. Results are typically available within 13 days for paper-based and 3-5 days for computer-delivered. PTE uses a score range of 10-90, with results usually available within 48 hours. The AI-based scoring in PTE means there is no human bias, which some students find reassuring. However, it also means the system can be sensitive to pronunciation variations and microphone quality."},
  {"type": "heading", "text": "Which Test Should You Choose?"},
  {"type": "paragraph", "text": "Choose IELTS if you are comfortable with face-to-face speaking interactions, prefer handwriting your essays (paper-based), or are targeting UK universities that specifically require IELTS. Choose PTE if you prefer typing, want faster results, feel more comfortable speaking to a computer, or need a test with more flexible scheduling. Some students who struggle with IELTS Writing find PTE''s integrated writing tasks easier, while others who excel in conversation prefer IELTS Speaking."},
  {"type": "heading", "text": "Preparation at Jyoti Education Center"},
  {"type": "paragraph", "text": "At Jyoti Education Center in Damak, we offer dedicated preparation classes for both IELTS and PTE Academic. Our IELTS classes include mock speaking interviews with experienced examiners, timed writing workshops, and extensive reading and listening practice. Our PTE lab features individual computer stations with headsets that simulate the actual test environment, allowing students to practice speaking, reading aloud, and typing essays under real conditions. Our instructors help you identify your strengths and weaknesses and create a personalized study plan to achieve your target score."},
  {"type": "paragraph", "text": "Enroll today at Jyoti Education Center, Damak-05, Jhapa. Contact: 023-575541 or 986-1247784."}
]}' WHERE slug = 'pte-vs-ielts-comparison';

UPDATE blog_posts SET content = '{"blocks": [
  {"type": "heading", "text": "Why Finland Is Emerging as a Top Study Destination"},
  {"type": "paragraph", "text": "Finland has rapidly climbed the ranks to become one of the most attractive study destinations for international students, including those from Nepal. Known for its world-class education system, cutting-edge research facilities, and high quality of life, Finland offers a unique combination of academic excellence and affordability that few other countries can match. Finnish universities consistently rank among the top in global rankings, particularly in technology, engineering, environmental sciences, and education."},
  {"type": "heading", "text": "Tuition Fees and Scholarships"},
  {"type": "paragraph", "text": "While Finland introduced tuition fees for non-EU/EEA students in 2017, the fees remain significantly lower than those in the UK, USA, or Australia — typically ranging from EUR 4,000 to EUR 18,000 per year depending on the program and university. Many universities offer generous scholarship waivers covering 50% to 100% of tuition fees for meritorious students. Additionally, Finnish universities provide various grants and financial aid packages. At Jyoti Education Center, we help students identify and apply for these scholarship opportunities well in advance of application deadlines."},
  {"type": "heading", "text": "English-Taught Programs"},
  {"type": "paragraph", "text": "One of the biggest advantages of studying in Finland is the availability of high-quality English-taught programs at both Bachelor''s and Master''s levels. You do not need to learn Finnish to study there — although picking up basic Finnish can enhance your daily life experience. Universities like LUT University, University of Oulu, University of Helsinki, Aalto University, and Tampere University offer numerous programs in English across fields like Information Technology, Business Analytics, Environmental Engineering, Education, and Health Sciences."},
  {"type": "heading", "text": "Work Rights and Post-Study Opportunities"},
  {"type": "paragraph", "text": "International students in Finland can work up to 25 hours per week during the academic term and full-time during holidays. After graduation, Finland offers a one-year residence permit extension for job seeking, giving graduates ample time to find employment. The Finnish tech industry, in particular, actively recruits international talent, and many graduates find positions in companies like Nokia, Supercell, Wärtsilä, and numerous startups in the Helsinki-Espoo innovation corridor."},
  {"type": "heading", "text": "How JEC Supports Finland-Bound Students"},
  {"type": "paragraph", "text": "Jyoti Education Center has established connections with several Finnish universities and provides end-to-end support for students targeting Finland — from university selection and application filing to scholarship applications, visa documentation, and pre-departure briefings. Our counselors are well-versed in Finland''s unique admission process, which often includes entrance exams conducted online or at designated centers."},
  {"type": "paragraph", "text": "Interested in studying in Finland? Visit Jyoti Education Center, Damak-05, Jhapa or call 023-575541."}
]}' WHERE slug = 'finland-nordic-education-choice';

UPDATE blog_posts SET content = '{"blocks": [
  {"type": "heading", "text": "The F-1 Visa Interview: What to Expect"},
  {"type": "paragraph", "text": "The F-1 student visa interview at the US Embassy or Consulate is a critical step in your journey to studying in the United States. Unlike other visa processes that rely heavily on documentation, the US system places significant weight on the in-person interview. The consular officer will assess your academic intent, financial capability, ties to Nepal, and overall credibility — all within a conversation that typically lasts 3-5 minutes. Preparation is key, and at Jyoti Education Center in Damak, we conduct intensive mock interview sessions to ensure our students are fully prepared."},
  {"type": "heading", "text": "Most Common Questions Asked"},
  {"type": "paragraph", "text": "Consular officers typically ask questions in five categories: (1) Why did you choose this university? — Be specific about programs, faculty, research opportunities, or campus facilities. (2) Why this course of study? — Connect your academic background and career goals to the program. (3) How will you fund your education? — Clearly explain your sponsor''s source of income, show bank statements, and explain any loans or scholarships. (4) What will you do after graduation? — Express clear intent to return to Nepal and describe realistic career opportunities here. (5) Why the USA and not another country? — Explain what makes the US education system uniquely suited to your goals."},
  {"type": "heading", "text": "Financial Documentation Tips"},
  {"type": "paragraph", "text": "Your financial documentation is arguably the most scrutinized part of your application. Ensure your sponsor''s bank statements show a consistent balance — not a sudden large deposit. If your sponsor is a business owner, provide business registration documents, tax returns (PAN), and audited financial statements. If your sponsor is salaried, provide salary certificates and employment verification letters. Property valuations, fixed deposit certificates, and educational loan sanction letters can supplement your financial profile. Our documentation team at JEC reviews every financial document to ensure consistency and credibility."},
  {"type": "heading", "text": "Mock Interview Practice at JEC"},
  {"type": "paragraph", "text": "At Jyoti Education Center, we simulate the actual embassy interview environment. Students stand at a window counter, present their documents, and answer rapid-fire questions from our trained counselors who play the role of consular officers. We record these sessions and provide detailed feedback on body language, eye contact, response clarity, and confidence level. Students typically go through 3-5 mock sessions before their actual interview date. This rigorous preparation has contributed to our high visa approval rate for US-bound students."},
  {"type": "heading", "text": "Common Reasons for F-1 Visa Denial"},
  {"type": "paragraph", "text": "The most common reasons for denial include: inability to demonstrate sufficient funds, lack of strong ties to Nepal (no clear reason to return), choosing an unusual or irrelevant course of study that does not align with your academic background, giving inconsistent or rehearsed-sounding answers, and insufficient knowledge about the university or program. Our counselors at JEC address each of these potential red flags during the preparation phase."},
  {"type": "paragraph", "text": "Start your US journey with confidence. Contact Jyoti Education Center, Damak-05, Jhapa. Phone: 023-575541 | Mobile: 986-1247784."}
]}' WHERE slug = 'usa-f1-visa-interview-prep';

UPDATE blog_posts SET content = '{"blocks": [
  {"type": "heading", "text": "What Makes Regional Australia Special?"},
  {"type": "paragraph", "text": "When most students think of studying in Australia, they imagine Sydney, Melbourne, or Brisbane. However, some of the best opportunities for international students lie in regional Australia — areas designated by the Australian government that include cities like Adelaide, Perth, Gold Coast, Hobart, Canberra, Newcastle, Wollongong, and Geelong, among others. Regional campuses offer the same quality of education as their metropolitan counterparts but with significant additional benefits."},
  {"type": "heading", "text": "Lower Cost of Living"},
  {"type": "paragraph", "text": "One of the most compelling reasons to study in regional Australia is the significantly lower cost of living. Rent, groceries, transportation, and entertainment costs can be 30-50% cheaper than in Sydney or central Melbourne. A student in Adelaide or Hobart might spend AUD 1,200-1,500 per month on living expenses compared to AUD 2,000-2,500 in Sydney. This means your education becomes more affordable overall, reducing the financial burden on your family and allowing you to save from part-time work earnings."},
  {"type": "heading", "text": "Extended Post-Study Work Rights"},
  {"type": "paragraph", "text": "Graduates from regional institutions are eligible for an additional 1-2 years on their Temporary Graduate visa (Subclass 485). While a metropolitan Bachelor''s graduate gets 2 years, a regional graduate can receive 3-4 years of post-study work rights. This extended period gives you more time to gain Australian work experience, build professional networks, and potentially qualify for permanent residency through skilled migration pathways. This is a game-changing advantage that metropolitan campuses cannot offer."},
  {"type": "heading", "text": "Scholarship Opportunities"},
  {"type": "paragraph", "text": "Regional universities actively recruit international students and offer generous scholarships — including Destination Australia scholarships (up to AUD 15,000 per year), university-specific international merit scholarships, and course-fee waivers. At Jyoti Education Center, we maintain updated databases of all available regional scholarships and help students craft compelling scholarship applications that highlight academic achievement, leadership, and community involvement."},
  {"type": "heading", "text": "Popular Regional Universities"},
  {"type": "paragraph", "text": "Some excellent regional universities include the University of Adelaide (Group of Eight), University of Tasmania, Charles Darwin University, James Cook University, University of New England, University of Southern Queensland, and Federation University. These institutions offer world-class programs in nursing, IT, engineering, agriculture, environmental science, and business — all with strong industry placement programs."},
  {"type": "heading", "text": "How JEC Guides Regional Australia Applications"},
  {"type": "paragraph", "text": "Our Australia desk at Jyoti Education Center specializes in regional pathways. We help students select the right regional university based on their course preference, budget, and career goals. We handle the entire application process — from shortlisting to CoE (Confirmation of Enrollment) to GTE statement preparation and visa filing. Our counselors also provide detailed pre-departure briefings about regional city life, part-time job opportunities, and community support networks."},
  {"type": "paragraph", "text": "Explore regional Australia pathways with Jyoti Education Center. Visit us at Damak-05, Jhapa or call 023-575541."}
]}' WHERE slug = 'regional-australia-career-pathways';

UPDATE blog_posts SET content = '{"blocks": [
  {"type": "heading", "text": "Why the SAT Matters for US Scholarships"},
  {"type": "paragraph", "text": "The SAT (Scholastic Assessment Test) is a standardized test widely used for college admissions in the United States. While many US universities have adopted test-optional policies in recent years, a strong SAT score remains one of the most effective ways to secure merit-based scholarships. Universities like the University of Alabama, Arizona State University, University of Kentucky, and many others offer automatic scholarship packages based on SAT score thresholds — sometimes covering 50% to 100% of tuition fees. For Nepali students aiming for affordable US education, a high SAT score can save lakhs of rupees."},
  {"type": "heading", "text": "Understanding the Digital SAT Format"},
  {"type": "paragraph", "text": "The SAT transitioned to a fully digital format in 2024. The digital SAT is adaptive — meaning the difficulty of the second module in each section adjusts based on your performance in the first module. The test is shorter (about 2 hours 14 minutes) and consists of two sections: Reading and Writing (54 questions, 64 minutes) and Math (44 questions, 70 minutes). The total score ranges from 400 to 1600. A score of 1300+ is generally considered competitive for scholarships, while 1400+ opens doors to top-tier opportunities."},
  {"type": "heading", "text": "Effective Preparation Strategies"},
  {"type": "paragraph", "text": "Start your preparation at least 3-4 months before your test date. Focus on building strong fundamentals in algebra, geometry, and data analysis for the Math section. For Reading and Writing, practice active reading strategies, learn high-frequency vocabulary in context, and master grammar rules for Standard English Conventions. Take at least one full-length practice test every week under timed conditions. Analyze every mistake — categorize whether it was a content gap, a careless error, or a time management issue. Use official College Board Bluebook practice tests as your primary resource."},
  {"type": "heading", "text": "Math Section Tips"},
  {"type": "paragraph", "text": "The Math section allows a built-in Desmos calculator for all questions. Practice using Desmos efficiently — it can save significant time on graphing, equation solving, and data analysis questions. Focus on linear equations, systems of equations, quadratic functions, ratios and proportions, percentages, and basic statistics. About 35% of questions involve word problems, so practice translating English descriptions into mathematical equations quickly and accurately."},
  {"type": "heading", "text": "Reading and Writing Section Tips"},
  {"type": "paragraph", "text": "The Reading and Writing section now uses shorter passages with one question per passage. This means you need to read quickly and identify the main idea, tone, purpose, and evidence within 1-2 paragraphs. Practice identifying the author''s claim, distinguishing between similar answer choices, and recognizing rhetorical techniques. For grammar questions, master comma rules, subject-verb agreement, pronoun clarity, and parallel structure."},
  {"type": "heading", "text": "SAT Coaching at Jyoti Education Center"},
  {"type": "paragraph", "text": "Our SAT program at Jyoti Education Center in Damak runs in both weekday and weekend batches. We provide comprehensive study materials, weekly mock tests with score analysis, individual tutoring for weak areas, and college counseling to help you shortlist universities that match your score range and career interests. Our instructors have helped students achieve scores of 1400+ and secure scholarships worth thousands of dollars at US universities."},
  {"type": "paragraph", "text": "Register for our next SAT batch at Jyoti Education Center, Damak-05, Jhapa. Call: 023-575541 | 986-1247784."}
]}' WHERE slug = 'mastering-sat-scholarships';

UPDATE blog_posts SET content = '{"blocks": [
  {"type": "heading", "text": "East Asia: Affordable and Career-Oriented Education"},
  {"type": "paragraph", "text": "While Western destinations like the UK, USA, and Australia dominate the study abroad conversation, East Asian countries — particularly Japan and South Korea — offer exceptional value for Nepali students. These countries combine affordable tuition, rich cultural experiences, strong economies, and clear pathways from education to employment. At Jyoti Education Center, our Asian Studies Desk specializes in guiding students through the unique application processes for Japanese and Korean institutions."},
  {"type": "heading", "text": "The Japanese Language School Pathway"},
  {"type": "paragraph", "text": "The most popular route to studying in Japan is through a Japanese Language School. Students typically enroll in a 1-2 year intensive Japanese language program at an accredited school in cities like Tokyo, Osaka, Fukuoka, or Nagoya. During this period, you learn Japanese (targeting JLPT N2 or N1 proficiency), work part-time (up to 28 hours per week), and prepare for university entrance exams or vocational school admissions. After completing the language program, students can transition to universities, technical colleges, or enter the workforce directly. Tuition at language schools ranges from JPY 700,000 to 900,000 per year (approximately NPR 5-7 lakhs)."},
  {"type": "heading", "text": "Studying in South Korea"},
  {"type": "paragraph", "text": "South Korea offers excellent university programs in engineering, IT, business, and Korean language studies. Many Korean universities offer scholarships covering 30-100% of tuition for international students with strong academic records. The TOPIK (Test of Proficiency in Korean) is required for Korean-taught programs, but an increasing number of universities offer English-taught programs at the graduate level. Living costs in Korea are moderate — around KRW 800,000-1,200,000 per month (approximately NPR 50,000-75,000) including accommodation. Students can work part-time with a D-2 or D-4 visa."},
  {"type": "heading", "text": "JLPT and NAT Test Preparation"},
  {"type": "paragraph", "text": "For Japan-bound students, passing the JLPT (Japanese Language Proficiency Test) at N5 or N4 level is typically required before enrollment. At Jyoti Education Center, we offer dedicated Japanese language classes taught by experienced instructors. Our curriculum covers hiragana, katakana, basic kanji, grammar patterns, and conversational practice. We also conduct regular mock tests following the JLPT format. For students targeting NAT-TEST as an alternative, we provide equivalent preparation materials and practice sessions."},
  {"type": "heading", "text": "Certificate of Eligibility (COE) Process"},
  {"type": "paragraph", "text": "The Certificate of Eligibility (COE) is a critical document for Japan-bound students. It is issued by the Japanese Immigration Bureau and is required before you can apply for a student visa. The COE application involves detailed financial documentation showing your sponsor can support your studies, academic transcripts, language test results, and a study plan. Processing takes 2-3 months. Our team at JEC handles the entire COE application process, working directly with Japanese language schools to ensure timely submission and approval."},
  {"type": "paragraph", "text": "Explore Japan and South Korea pathways at Jyoti Education Center, Damak-05, Jhapa. Call: 023-575541 | 986-1247784."}
]}' WHERE slug = 'korea-japan-language-pathways';

UPDATE blog_posts SET content = '{"blocks": [
  {"type": "heading", "text": "Why Applications Get Delayed or Rejected"},
  {"type": "paragraph", "text": "Every year, thousands of Nepali students experience delays or outright rejections in their university applications due to avoidable mistakes. At Jyoti Education Center, we have reviewed hundreds of application files over the years and identified the most common pitfalls that students fall into. Understanding and avoiding these mistakes can save you months of wasted time and significantly improve your chances of securing an offer from your target university."},
  {"type": "heading", "text": "Pitfall 1: Incomplete or Incorrect Documentation"},
  {"type": "paragraph", "text": "The most frequent issue is submitting incomplete documentation. Every university has specific requirements — some need attested copies, others need notarized translations, and some require documents in a specific format (PDF, specific file size, etc.). Common oversights include missing transcripts from previous institutions, expired passport copies, unsigned recommendation letters, and improperly formatted financial documents. Always create a checklist for each university and double-check every document before submission."},
  {"type": "heading", "text": "Pitfall 2: Generic Statements of Purpose"},
  {"type": "paragraph", "text": "As discussed in our SOP guide, submitting a generic SOP that could apply to any university is a major red flag. Admissions officers want to see that you have researched their specific institution — mention particular professors, research groups, facilities, or course modules that attract you. Explain how your background connects to this specific program and what unique perspective you will bring to the classroom. Each SOP should be tailored to each university."},
  {"type": "heading", "text": "Pitfall 3: Missing Deadlines"},
  {"type": "paragraph", "text": "University application deadlines are strict, and many programs fill up early. Some universities operate on a rolling admissions basis, meaning the earlier you apply, the better your chances. Popular programs at top universities can close months before the official deadline. We recommend starting your application process at least 6-8 months before your intended start date. Create a timeline with all deadline dates and work backward to ensure each component (test scores, SOPs, references) is ready well in advance."},
  {"type": "heading", "text": "Pitfall 4: Weak Academic References"},
  {"type": "paragraph", "text": "Recommendation letters carry significant weight, yet many students treat them as an afterthought. Request references from professors or employers who know you well and can speak specifically about your abilities, work ethic, and potential. Provide your referees with your CV, SOP, and details about the program you are applying to so they can write targeted, detailed letters. Avoid generic letters that simply confirm your enrollment or employment dates."},
  {"type": "heading", "text": "Pitfall 5: Ignoring English Language Score Requirements"},
  {"type": "paragraph", "text": "Each university and program has minimum English language score requirements, and these can vary even between programs at the same university. Some programs require higher scores in specific components — for example, a nursing program might require IELTS Writing 7.0 while the overall requirement is 6.5. Failing to meet component scores is a common reason for conditional offers or rejections. Check the exact requirements for each program and aim to exceed them."},
  {"type": "heading", "text": "How JEC Prevents These Mistakes"},
  {"type": "paragraph", "text": "At Jyoti Education Center, every student is assigned a dedicated counselor who manages their entire application lifecycle. We maintain checklists for every university we work with, track all deadlines in our system, review every document for accuracy and completeness, and conduct quality checks before submission. Our systematic approach has resulted in consistently high offer rates for our students across all destination countries."},
  {"type": "paragraph", "text": "Avoid costly application mistakes. Get expert guidance from Jyoti Education Center, Damak-05, Jhapa. Call: 023-575541."}
]}' WHERE slug = 'avoiding-application-pitfalls';

UPDATE blog_posts SET content = '{"blocks": [
  {"type": "heading", "text": "Why Pre-Departure Briefings Matter"},
  {"type": "paragraph", "text": "Congratulations — you have received your visa and are about to embark on your international education journey! But the preparation does not end with your visa approval. The transition from Nepal to a new country involves navigating unfamiliar systems, cultural differences, and practical challenges that can feel overwhelming if you are not prepared. At Jyoti Education Center, we conduct comprehensive pre-departure briefing sessions for every student before they leave, covering everything from airport procedures to setting up your life abroad."},
  {"type": "heading", "text": "Before You Leave Nepal"},
  {"type": "paragraph", "text": "Start by organizing your documents — keep your passport, visa, offer letter, COE/CAS, insurance documents, and financial evidence in your carry-on bag, not in checked luggage. Make multiple photocopies and digital scans of every important document and store them in cloud storage (Google Drive or Dropbox). Inform your bank about your travel plans to avoid your debit card being blocked abroad. Exchange a small amount of foreign currency (AUD 500, GBP 300, or equivalent) for immediate expenses upon arrival — you can exchange more later at better rates."},
  {"type": "heading", "text": "Airport and Immigration"},
  {"type": "paragraph", "text": "At your destination airport, follow signs to the International Arrivals and Immigration area. Have your passport, visa, and offer letter ready. Immigration officers may ask basic questions: purpose of visit, length of stay, where you will be living, and how much money you are carrying. Answer honestly and briefly. After clearing immigration, collect your baggage and proceed through customs. If you are carrying any food items, medicines, or amounts over the currency declaration limit, declare them. Many airports have free Wi-Fi — use it to message your family that you have arrived safely."},
  {"type": "heading", "text": "Your First Week"},
  {"type": "paragraph", "text": "Your first week should focus on essential setup tasks: (1) Activate your local SIM card — purchase one at the airport or a nearby store for affordable local calls and data. (2) Open a student bank account — most countries require proof of address and your student ID; your university may have preferred banking partners. (3) Register with your university — complete enrollment, get your student ID, and attend orientation sessions. (4) Understand public transport — purchase weekly or monthly transit passes for buses, trains, or trams. (5) Grocery shopping — locate nearby supermarkets and Asian grocery stores for familiar food items."},
  {"type": "heading", "text": "Health Insurance and Medical Registration"},
  {"type": "paragraph", "text": "In Australia, you must have valid Overseas Student Health Cover (OSHC) throughout your stay. In the UK, the Immigration Health Surcharge (IHS) is paid as part of your visa application and gives you access to the NHS. Register with a local GP (General Practitioner) or university health service as soon as possible. Keep your insurance policy number and emergency contacts accessible at all times. If you take regular medication, carry a doctor''s letter explaining your prescription and bring a sufficient supply for the first few months."},
  {"type": "heading", "text": "Academic Culture Differences"},
  {"type": "paragraph", "text": "Western academic culture emphasizes independent learning, critical thinking, and active class participation. Professors expect you to read assigned materials before class, contribute to discussions, and manage your time independently. Plagiarism is taken extremely seriously — always cite your sources properly using the required referencing style (APA, Harvard, MLA, etc.). Most universities provide academic support services including writing centers, tutoring, and study skills workshops. Do not hesitate to use these resources — they are there to help you succeed."},
  {"type": "heading", "text": "Staying Connected and Getting Help"},
  {"type": "paragraph", "text": "Homesickness is natural and common. Stay connected with family through regular video calls, but also make an effort to build a social network in your new city. Join Nepali student associations, university clubs, sports teams, or volunteer groups. Most universities have dedicated international student support offices that can help with academic, financial, or personal issues. If you face any difficulties, do not hesitate to reach out to Jyoti Education Center — we maintain contact with our students even after they leave Nepal and are always available for guidance and support."},
  {"type": "paragraph", "text": "Attend our next pre-departure briefing session at Jyoti Education Center, Damak-05, Jhapa. Schedule: 023-575541 | 986-1247784."}
]}' WHERE slug = 'pre-departure-briefing-guide';
