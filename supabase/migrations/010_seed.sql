-- Seed database with default settings, navigation, and initial site content

-- Site Settings
INSERT INTO site_settings (key, value, description) VALUES
('contact_info', '{
  "address": "Putalisadak, Kathmandu, Nepal",
  "phone": "+977-1-4412345, +977-9851000000",
  "email": "info@jyotieducations.edu.np",
  "office_hours": "Sun - Fri: 9:00 AM - 6:00 PM"
}', 'Jyoti Educations main contact details'),

('social_links', '{
  "facebook": "https://facebook.com/jyoti.np",
  "instagram": "https://instagram.com/jyoti.np",
  "linkedin": "https://linkedin.com/company/jyoti-nepal",
  "youtube": "https://youtube.com/c/jyoti"
}', 'Jyoti Educations official social handles'),

('form_destinations', '{
  "inquiry_email": "leads@jyotieducations.edu.np",
  "whatsapp_fallback": "+9779851000000"
}', 'Form submissions alert settings');

-- Default Navigation Items
INSERT INTO navigation_items (label, href, sort_order, is_cta, status) VALUES
('Home', '/', 1, false, 'published'),
('About Us', '/about', 2, false, 'published'),
('Services', '/services', 3, false, 'published'),
('Destinations', '/destinations', 4, false, 'published'),
('Test Preparation', '/test-preparation', 5, false, 'published'),
('Blogs', '/blogs', 6, false, 'published'),
('Contact Us', '/contact', 7, false, 'published'),
('Book Free Consultation', '/book-free-consultation', 8, true, 'published');

-- Test Preparations
INSERT INTO test_preparations (slug, name, summary, test_type, format, features, status) VALUES
('ielts', 'IELTS Academic & General', 'International English Language Testing System for study and migration.', 'language', '{"duration": "6 weeks", "cost": "Rs. 8,000"}', '["Interactive Mock Tests", "Certified Tutors", "Free Study Materials"]', 'published'),
('pte', 'PTE Academic', 'Pearson Test of English Academic, accepted by universities globally.', 'language', '{"duration": "4 weeks", "cost": "Rs. 9,000"}', '["AI-Scored Assessments", "Flexible Class Timings", "Latest Practice Templates"]', 'published'),
('toefl', 'TOEFL iBT', 'Test of English as a Foreign Language, accepted mostly in USA.', 'language', '{"duration": "6 weeks", "cost": "Rs. 8,500"}', '["Complete Audio Feedback", "Real Exam Simulators", "1-on-1 Speaking Practice"]', 'published'),
('sat', 'SAT Preparation', 'Scholastic Aptitude Test prep for US undergraduate admissions.', 'aptitude', '{"duration": "8 weeks", "cost": "Rs. 12,000"}', '["Math & English Specialists", "Section-wise Mock Tests", "Scholarship Guidance"]', 'published');

-- Entrance Programs
INSERT INTO entrance_programs (slug, name, summary, features, offer, status) VALUES
('cee', 'CEE Preparation', 'Common Entrance Examination for medical (MBBS/BDS) studies in Nepal.', '["Expert Medical Doctors", "Daily MCQ Practices", "Grand Weekly Tests"]', '{"duration": "12 weeks", "cost": "Rs. 18,000"}', 'published'),
('cmat', 'CMAT Preparation', 'Central Management Admission Test for BBA/BBM studies in TU/KU.', '["Quantitative Aptitude focus", "Verbal reasoning drills", "Past Paper Analysis"]', '{"duration": "8 weeks", "cost": "Rs. 10,000"}', 'published');

-- Services
INSERT INTO services (slug, name, summary, sort_order, status) VALUES
('career-counseling', 'One-on-One Career Counseling', 'Personalized counseling session to map out your academic potential.', 1, 'published'),
('university-selection', 'University & Course Selection', 'Help in finding the university matching your budget and profile.', 2, 'published'),
('documentation-assistance', 'Documentation & SOP Editing', 'Assistance in drafting Statements of Purpose and compiling documentation.', 3, 'published'),
('visa-preparation', 'Visa Interview Mentoring', 'Mock interview sessions and documentation checks for visa success.', 4, 'published'),
('pre-departure-briefing', 'Pre-Departure Briefing', 'Briefing about student life, accommodations, and work rules abroad.', 5, 'published');

-- Destinations
INSERT INTO destinations (slug, name, country_code, summary, hero_title, hero_body, cost_range, intake_badges, featured, status) VALUES
('australia', 'Australia', 'AU', 'Study in world-class cities with vibrant cultural diversity.', 'Study in Australia', 'Turn your educational dreams into reality in Australia.', '$20,000 - $45,000 AUD / Year', ARRAY['Feb', 'July', 'Nov'], true, 'published'),
('usa', 'United States', 'US', 'Access the largest network of top-ranking universities.', 'Study in USA', 'Unlock endless career and academic opportunities in America.', '$25,000 - $60,000 USD / Year', ARRAY['Spring (Jan)', 'Fall (Aug)'], true, 'published'),
('uk', 'United Kingdom', 'GB', 'Earn globally respected degrees in a historic academic culture.', 'Study in UK', 'Fast-track your career with flexible British study options.', '£15,000 - £35,000 GBP / Year', ARRAY['Jan', 'May', 'Sept'], true, 'published'),
('canada', 'Canada', 'CA', 'Benefit from top-tier education and generous post-study work routes.', 'Study in Canada', 'Immerse yourself in safe, welcoming, and high-quality study environments.', '$18,000 - $40,000 CAD / Year', ARRAY['Winter (Jan)', 'Fall (Sept)'], true, 'published'),
('new-zealand', 'New Zealand', 'NZ', 'Combine high-quality education with an unmatched standard of living.', 'Study in New Zealand', 'Discover hands-on, practical learning models in New Zealand.', '$22,000 - $42,000 NZD / Year', ARRAY['Feb', 'July'], false, 'published'),
('japan', 'Japan', 'JP', 'Immerse in technological innovations and traditional rich culture.', 'Study in Japan', 'Acquire cutting-edge knowledge in one of Asia''s leading economic giants.', '¥800,000 - ¥1,500,000 JPY / Year', ARRAY['April', 'October'], false, 'published');

-- Blog Categories
INSERT INTO blog_categories (slug, name, description) VALUES
('study-abroad', 'Study Abroad Guides', 'Tips and guides for studying in various countries'),
('test-prep', 'Test Prep Tips', 'How to ace IELTS, PTE, and SAT exams'),
('student-visa', 'Visa Advice', 'Step-by-step guidance on visa processes');

-- Blogs
INSERT INTO blog_posts (slug, title, excerpt, content, category_id, status, featured, published_at) VALUES
(
  'complete-guide-to-australian-student-visa',
  'The Complete Guide to Australian Student Visa (Subclass 500)',
  'Everything Nepalese students need to know about financial requirements, English proficiency, and GTE guidelines.',
  '{"blocks": [{"type": "paragraph", "text": "Australia remains one of the top destinations for international students from Nepal due to its quality education, lifestyle, and post-study work opportunities. However, applying for an Australian Student Visa (Subclass 500) requires meticulous preparation of financial documents, GTE (Genuine Temporary Entrant) statements, and health insurance."}]}',
  (SELECT id FROM blog_categories WHERE slug = 'student-visa'),
  'published',
  true,
  now()
),
(
  'how-to-score-8-plus-ielts-speaking',
  'How to Score Band 8.0+ in IELTS Speaking Section',
  'Proven strategies, practice tips, and vocabulary enhancements to boost your speaking performance.',
  '{"blocks": [{"type": "paragraph", "text": "Achieving a Band 8.0 or higher in the IELTS Speaking test is a common goal, yet it requires more than just fluent English. You need to understand the marking criteria: fluency & coherence, lexical resource, grammatical range & accuracy, and pronunciation."}]}',
  (SELECT id FROM blog_categories WHERE slug = 'test-prep'),
  'published',
  false,
  now()
);
