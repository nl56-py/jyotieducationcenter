-- Migration 020: Seed Germany, Denmark, and New Zealand into destinations & universities

-- 1. Insert Germany if not exists
INSERT IGNORE INTO destinations (id, slug, name, country_code, summary, hero_title, hero_body, cost_range, intake_badges, featured, status, created_at, updated_at) VALUES
(
  UUID(),
  'germany',
  'Germany',
  'DE',
  'Tuition-free public universities, world-leading engineering programs, and 18-month job seeker visa.',
  'Study in Germany',
  'Germany is Europe''s economic powerhouse and a premier destination for higher education. Known for tuition-free public universities, world-leading engineering, technology, and research institutions, Germany offers an incredible return on investment for international students.',
  '€0 – €3,000 / year (Public) | €10,000 – €16,000 (Private)',
  '["Winter (September/October)", "Summer (March/April)"]',
  1,
  'published',
  NOW(),
  NOW()
),
(
  UUID(),
  'denmark',
  'Denmark',
  'DK',
  'High quality of life, innovative problem-based learning, and English-taught Master degrees.',
  'Study in Denmark',
  'Denmark offers a world-class education system focused on innovation, critical thinking, and collaborative learning. With English-taught degree programs, high living standards, and strong post-study career opportunities in Northern Europe, Denmark is a top choice.',
  '€6,000 – €16,000 / year',
  '["September (Autumn)", "February (Spring)"]',
  1,
  'published',
  NOW(),
  NOW()
),
(
  UUID(),
  'new-zealand',
  'New Zealand',
  'NZ',
  'Top-ranked universities, breathtaking lifestyle, and up to 3 years of post-study work visa.',
  'Study in New Zealand',
  'New Zealand combines academic excellence with an unmatched quality of life. All eight of New Zealand''s public universities rank in the top 3% globally, offering practical research, welcoming multicultural campuses, and generous post-study work rights.',
  'NZD 22,000 – 35,000 / year',
  '["February (Semester 1)", "July (Semester 2)"]',
  1,
  'published',
  NOW(),
  NOW()
);

-- 2. Update detailed JSON columns for Germany
UPDATE destinations SET
  intro_copy = '["Germany is Europe''s economic powerhouse and a premier destination for higher education. Known for tuition-free public universities, world-leading engineering, technology, and research institutions, Germany offers an incredible return on investment for international students.","Most public universities in Germany charge NO tuition fees to international students (only a minor semester contribution of €150-€350). Private universities offer specialized English-taught business and tech degrees.","After graduation, international students receive an 18-month job seeker visa to start their careers in Germany, with pathways to Permanent Residency (PR) after 2 years of work."]',
  why = '["Tuition-free education at public universities","18-month post-study work visa for job seeking","World-class engineering, IT, and automotive industries","High standard of living and safety in the Schengen Zone"]',
  courses_list = '[{"title":"1. Mechanical & Automotive Engineering","description":"Germany is the world capital of automotive engineering. Programs offer direct industrial training with brands like BMW, Mercedes, and Siemens."},{"title":"2. Computer Science & Data Analytics","description":"High-demand IT programs covering artificial intelligence, cybersecurity, software engineering, and cloud architecture."},{"title":"3. International Business & Supply Chain","description":"Focuses on European commerce, global logistics, and corporate management in Europe''s largest economy."},{"title":"4. Renewable Energy & Sustainability","description":"World-leading research in green technology, solar/wind energy systems, and circular economy."}]',
  requirements_detail = '{"academic":"Undergraduate: 13 years of education (high school + 1 year university in Nepal OR Studienkolleg foundation year). Postgraduate: 4-year Bachelor''s degree with minimum GPA 2.8+","english":"IELTS overall 6.5 (min 6.0 in each band) or PTE Academic 58+ for English-taught programs. German B1/B2 level recommended for daily life and work.","financial":"A blocked bank account (Sperrkonto) containing €11,208 for 1 year of living expenses is mandatory for the German student visa.","genuine":"Verification of academic authenticity (APS certificate for some applicants), motivation letter, and embassy interview clearance."}',
  intakes_list = '[{"title":"Winter Intake","period":"September / October","deadline":"May to July","desc":"The main academic intake offering maximum course availability across all public and private universities."},{"title":"Summer Intake","period":"March / April","deadline":"November to January","desc":"Secondary intake popular for postgraduate and master degree tracks."}]',
  costs_list = '[{"category":"Public University Tuition","range":"€0 – €1,500 / year","desc":"Free in most states; nominal semester contribution covers public transport."},{"category":"Private University Tuition","range":"€8,000 – €16,000 / year","desc":"Smaller class sizes, English-taught, faster admission cycles."},{"category":"Blocked Account (Living Expenses)","range":"€11,208 / year","desc":"Official government requirement for student visa (€934/month)."},{"category":"Health Insurance","range":"€110 – €130 / month","desc":"Mandatory public health insurance (TK, AOK) for students under 30."}]',
  scholarships_list = '[{"name":"DAAD Scholarships","details":"Germany''s official academic exchange scholarship covering full living expenses, travel allowance, and insurance for postgraduate students."},{"name":"Deutschlandstipendium","details":"Merit-based award offering €300 per month to top-performing international students at German universities."}]',
  faq = '[["Is public university tuition really free in Germany?","Yes, most public universities in Germany charge no tuition fees for undergraduate and master programs, except for a small semester fee of €150-€350 that includes a public transport pass."],["What is a Blocked Account (Sperrkonto)?","A blocked account is a special bank account in Germany where you deposit €11,208 to prove you can cover your living expenses for one year. You can withdraw €934 each month."],["Can I work while studying in Germany?","Yes, international students can work 120 full days or 240 half days per year (approx. 20 hours/week during semesters)."]]',
  universities_detail = '[{"name":"Technical University of Munich (TUM)","description":"Consistently ranked among Europe''s top technical universities.","fees":"€0 - €3,000 / year","courses":"Engineering, Informatics, Management","image":"/images/brand/logo.jpeg"},{"name":"IU International University of Applied Sciences","description":"Germany''s largest private university offering flexible English-taught degrees.","fees":"€8,000 - €12,000 / year","courses":"Computer Science, MBA, Data Science","image":"/images/brand/logo.jpeg"}]',
  universities = '["Technical University of Munich", "IU International University of Applied Sciences"]'
WHERE slug = 'germany';

-- 3. Update detailed JSON columns for Denmark
UPDATE destinations SET
  intro_copy = '["Denmark offers a world-class education system focused on innovation, critical thinking, and collaborative learning. With English-taught degree programs, high living standards, and strong post-study career opportunities in Northern Europe, Denmark is a top choice.","Danish universities emphasize problem-based learning where students work in teams to solve real-world industry challenges.","Graduates receive a 3-year post-study work permit to find employment in Denmark or across Europe."]',
  why = '["World-leading quality of life and safety","Problem-based learning method connected with Nordic industries","3-year post-study work permit for international graduates","Full access to European Schengen Zone"]',
  courses_list = '[{"title":"1. Information Technology & Software","description":"Nordic countries lead in digital innovation. Programs focus on software development, cloud systems, and UX/UI design."},{"title":"2. Business & Sustainable Economics","description":"Covers green economy, global commerce, and Nordic business leadership models."},{"title":"3. Environmental & Green Energy Engineering","description":"Denmark is a pioneer in wind energy and clean tech engineering."}]',
  requirements_detail = '{"academic":"Undergraduate: 12 years (+2) plus 1 year higher education or top grades. Postgraduate: 3-4 year Bachelor''s degree.","english":"IELTS 6.5 overall (min 6.0) or PTE Academic 58+.","financial":"Bank balance of approx. €6,000 to €8,000 to cover living expenses.","genuine":"Danish Residence Permit application with verified credentials and tuition proof."}',
  intakes_list = '[{"title":"Autumn Intake","period":"September","deadline":"March 15 (Kvote 2)","desc":"Main intake for international degrees."},{"title":"Spring Intake","period":"February","deadline":"September 1","desc":"Secondary intake for select Master programs."}]',
  costs_list = '[{"category":"Tuition Fees","range":"€6,000 – €16,000 / year","desc":"Varies by university and program level."},{"category":"Living Expenses","range":"€8,000 – €12,000 / year","desc":"Includes student housing, food, and transport in Copenhagen or Aarhus."}]',
  scholarships_list = '[{"name":"Danish Government Scholarships","details":"Highly competitive full or partial tuition fee waivers offered by state universities to non-EU students."}]',
  faq = '[["Why study in Denmark?","Denmark offers innovative group-based learning, high living standards, safe cities, and excellent career opportunities in Scandinavia."],["Can I work part-time in Denmark?","Yes, non-EU students can work up to 20 hours per week during studies and full-time during June, July, and August."]]',
  universities_detail = '[{"name":"University of Copenhagen","description":"Top-ranked Scandinavian research university.","fees":"€10,000 - €16,000 / year","courses":"Science, Health, Social Sciences","image":"/images/brand/logo.jpeg"},{"name":"Aarhus University","description":"Leading international university in Denmark.","fees":"€8,000 - €14,000 / year","courses":"Business, Tech, Environmental Science","image":"/images/brand/logo.jpeg"}]',
  universities = '["University of Copenhagen", "Aarhus University"]'
WHERE slug = 'denmark';

-- 4. Update detailed JSON columns for New Zealand
UPDATE destinations SET
  intro_copy = '["New Zealand combines academic excellence with an unmatched quality of life. All eight of New Zealand''s public universities rank in the top 3% globally, offering practical research, welcoming multicultural campuses, and generous post-study work rights.","The country is known for its practical education model, hands-on learning, and direct connections to local industries in agriculture, IT, tourism, and engineering.","Graduates of degree programs receive up to 3 years of Post-Study Work Visa (PSWV) with clear pathways to skilled migration."]',
  why = '["All 8 public universities rank in the top 3% globally","Up to 3-year Post-Study Work Visa (PSWV)","Safe, peaceful, and stunning natural environment","Part-time work rights and high minimum wage"]',
  courses_list = '[{"title":"1. Information Technology & Computer Science","description":"Focuses on cloud architecture, cybersecurity, and software engineering."},{"title":"2. Agriculture & Environmental Science","description":"World-leading research in sustainable farming, forestry, and environmental conservation."},{"title":"3. Tourism & Hospitality Management","description":"Practical training in a world-famous international tourism destination."}]',
  requirements_detail = '{"academic":"Undergraduate: 60%+ in +2 high school. Postgraduate: Bachelor''s degree with CGPA 2.6+.","english":"IELTS 6.0 overall (min 5.5) for UG; 6.5 (min 6.0) for PG. PTE Academic 50-58 is widely accepted.","financial":"NZD 20,000 per year for living expenses plus tuition fee proof in a approved bank account.","genuine":"Fee Paying Student Visa assessment including financial evidence, study plan, and medical checks."}',
  intakes_list = '[{"title":"Semester 1","period":"February","deadline":"October to December","desc":"Main intake with full course selection."},{"title":"Semester 2","period":"July","deadline":"April to May","desc":"Mid-year intake popular for postgraduate courses."}]',
  costs_list = '[{"category":"Undergraduate Tuition","range":"NZD 22,000 – 32,000 / year","desc":"Varies by university and subject area."},{"category":"Postgraduate Tuition","range":"NZD 26,000 – 38,000 / year","desc":"Master degrees typically take 1 to 2 years."},{"category":"Living Expenses","range":"NZD 20,000 / year","desc":"Official immigration guideline for living costs."}]',
  scholarships_list = '[{"name":"Manaaki New Zealand Scholarships","details":"Government scholarship for international students from developing countries covering full tuition, stipend, and travel."},{"name":"University Merit Scholarships","details":"Direct fee reductions of NZD 5,000 to NZD 10,000 for high academic achievers."}]',
  faq = '[["Why choose New Zealand?","New Zealand offers world-class education where all public universities are globally ranked, combined with a safe, welcoming environment and excellent post-study work rights."],["What is the post-study work visa in New Zealand?","Graduates of Bachelor degrees receive a 3-year Post-Study Work Visa (PSWV) allowing them to work for any employer in NZ."]]',
  universities_detail = '[{"name":"University of Auckland","description":"New Zealand''s highest-ranked university.","fees":"NZD 32,000 - 42,000 / year","courses":"Engineering, Business, IT, Health","image":"/images/brand/logo.jpeg"},{"name":"University of Otago","description":"Oldest university in New Zealand, renowned for medical and health sciences.","fees":"NZD 28,000 - 36,000 / year","courses":"Medicine, Health Sciences, Business","image":"/images/brand/logo.jpeg"}]',
  universities = '["University of Auckland", "University of Otago"]'
WHERE slug = 'new-zealand';
