-- Simplified admin CMS additions: notices/events, homepage popups, service sections,
-- personnel metadata, and local video/media support.

CREATE TABLE IF NOT EXISTS homepage_popup_banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  body TEXT,
  cta_label TEXT,
  cta_href TEXT,
  image_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
  display_mode TEXT NOT NULL DEFAULT 'modal',
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  frequency_key TEXT DEFAULT 'homepage-popup',
  sort_order INTEGER NOT NULL DEFAULT 0,
  status content_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notices_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('notice', 'event')),
  title TEXT NOT NULL,
  excerpt TEXT,
  body JSONB NOT NULL DEFAULT '{}',
  event_date TIMESTAMPTZ,
  location TEXT,
  cta_label TEXT,
  cta_href TEXT,
  image_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
  featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  status content_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE services
  ADD COLUMN IF NOT EXISTS label TEXT,
  ADD COLUMN IF NOT EXISTS detail TEXT,
  ADD COLUMN IF NOT EXISTS image_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS seo_title TEXT,
  ADD COLUMN IF NOT EXISTS seo_description TEXT,
  ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS service_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  section_key TEXT NOT NULL,
  section_type TEXT NOT NULL,
  title TEXT,
  body JSONB NOT NULL DEFAULT '{}',
  media_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  status content_status NOT NULL DEFAULT 'published'
);

ALTER TABLE team_members
  ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS badge_text TEXT,
  ADD COLUMN IF NOT EXISTS badge_icon TEXT,
  ADD COLUMN IF NOT EXISTS social_links JSONB NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS metadata JSONB NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS featured BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE videos
  ADD COLUMN IF NOT EXISTS media_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS poster_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS external_url TEXT;

ALTER TABLE videos ALTER COLUMN provider DROP NOT NULL;
ALTER TABLE videos ALTER COLUMN provider_video_id DROP NOT NULL;

ALTER TABLE homepage_popup_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_sections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS homepage_popup_banners_select ON homepage_popup_banners;
CREATE POLICY homepage_popup_banners_select ON homepage_popup_banners
  FOR SELECT TO authenticated, anon USING (status = 'published' OR is_admin());

DROP POLICY IF EXISTS homepage_popup_banners_manage ON homepage_popup_banners;
CREATE POLICY homepage_popup_banners_manage ON homepage_popup_banners
  FOR ALL TO authenticated
  USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'editor'::admin_role]))
  WITH CHECK (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'editor'::admin_role]));

DROP POLICY IF EXISTS notices_events_select ON notices_events;
CREATE POLICY notices_events_select ON notices_events
  FOR SELECT TO authenticated, anon USING (status = 'published' OR is_admin());

DROP POLICY IF EXISTS notices_events_manage ON notices_events;
CREATE POLICY notices_events_manage ON notices_events
  FOR ALL TO authenticated
  USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'editor'::admin_role]))
  WITH CHECK (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'editor'::admin_role]));

DROP POLICY IF EXISTS service_sections_select ON service_sections;
CREATE POLICY service_sections_select ON service_sections
  FOR SELECT TO authenticated, anon USING (status = 'published' OR is_admin());

DROP POLICY IF EXISTS service_sections_manage ON service_sections;
CREATE POLICY service_sections_manage ON service_sections
  FOR ALL TO authenticated
  USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'editor'::admin_role]))
  WITH CHECK (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'editor'::admin_role]));

CREATE INDEX IF NOT EXISTS idx_homepage_popup_active
  ON homepage_popup_banners(status, starts_at, ends_at, sort_order);

CREATE INDEX IF NOT EXISTS idx_notices_events_public
  ON notices_events(type, status, featured, published_at DESC);

CREATE INDEX IF NOT EXISTS idx_service_sections_service_order
  ON service_sections(service_id, sort_order);

-- Media references used by seeded public content.
INSERT INTO media_assets (bucket, path, file_name, mime_type, size_bytes, alt_text)
VALUES
('public', '/images/services/educational-consulting.jpg', 'educational-consulting.jpg', 'image/jpeg', 0, 'Educational consulting session'),
('public', '/images/services/career-counselling.jpg', 'career-counselling.jpg', 'image/jpeg', 0, 'Career counselling service'),
('public', '/images/services/study-abroad-guidance.jpg', 'study-abroad-guidance.jpg', 'image/jpeg', 0, 'Study abroad guidance'),
('public', '/images/services/visa-assistance.jpg', 'visa-assistance.jpg', 'image/jpeg', 0, 'Visa assistance service'),
('public', '/images/services/university-application.jpg', 'university-application.jpg', 'image/jpeg', 0, 'University application support'),
('public', '/images/services/scholarship-guidance.jpg', 'scholarship-guidance.jpg', 'image/jpeg', 0, 'Scholarship guidance'),
('public', '/images/services/interview-preparation.jpg', 'interview-preparation.jpg', 'image/jpeg', 0, 'Interview preparation'),
('public', '/images/services/documentation-support.jpg', 'documentation-support.jpg', 'image/jpeg', 0, 'Documentation support'),
('public', '/images/services/admission-guidance.jpg', 'admission-guidance.jpg', 'image/jpeg', 0, 'Admission guidance'),
('public', '/images/services/test-prep.jpg', 'test-prep.jpg', 'image/jpeg', 0, 'Test preparation service'),
('public', '/images/services/travel-accommodation.jpg', 'travel-accommodation.jpg', 'image/jpeg', 0, 'Travel and accommodation support'),
('public', '/images/services/pre-departure.jpg', 'pre-departure.jpg', 'image/jpeg', 0, 'Pre-departure support'),
('public', '/images/brand/leader-ravi-gupta.jpg', 'leader-ravi-gupta.jpg', 'image/jpeg', 0, 'Ravi Gupta portrait'),
('public', '/images/brand/leader-kabiraj-paudel.jpg', 'leader-kabiraj-paudel.jpg', 'image/jpeg', 0, 'Kabiraj Paudel portrait'),
('public', '/images/brand/leader-dipendra-mehta.png', 'leader-dipendra-mehta.png', 'image/png', 0, 'Dipendra Mehta portrait'),
('public', '/images/brand/leader-tilak-thapa.jpg', 'leader-tilak-thapa.jpg', 'image/jpeg', 0, 'Tilak Thapa portrait'),
('public', '/videos/jyoti-campus.mp4', 'jyoti-campus.mp4', 'video/mp4', 0, 'Jyoti Educations campus video')
ON CONFLICT (path) DO UPDATE SET
  file_name = EXCLUDED.file_name,
  mime_type = EXCLUDED.mime_type,
  alt_text = EXCLUDED.alt_text;

INSERT INTO services (slug, name, label, summary, detail, body, image_id, sort_order, status, published_at)
VALUES
('educational-consulting', 'Educational Consulting', 'Education', 'Personalized advice to assess your profiles, identify courses of interest, and chart out your academic path.', 'Personalized advice to assess student profiles, clarify course interests, match academic backgrounds, and structure study plans.', '{"bullets":["Academic Profile Assessment","Course & Country Shortlisting","Intake & Timeline Planning","Parent Guidance Sessions"],"outcomes":["Shortlist of realistic paths","Understanding of admission criteria","Actionable planning timeline"]}', (SELECT id FROM media_assets WHERE path = '/images/services/educational-consulting.jpg'), 1, 'published', now()),
('career-counselling', 'Career Counseling', 'Clarity', 'Scientific and structured guidance mapping your psychological profile, skills, and values to modern global careers.', 'Profile-first sessions helping students map their interests, skills, and values to modern global career paths before making huge academic investments.', '{"bullets":["Psychometric Profile Mapping","Skill Gap Analysis","Career Path Identification","Industry & Job Market Briefings"],"outcomes":["Clear career goal matching","Informed course decisions","Personalized study-to-work path"]}', (SELECT id FROM media_assets WHERE path = '/images/services/career-counselling.jpg'), 2, 'published', now()),
('study-abroad-guidance', 'Study Abroad Guidance', 'Destinations', 'Country comparison, course shortlisting, cost-benefit analysis, and post-study work opportunity mappings.', 'Comprehensive evaluations comparing top global destinations on tuition fees, visa success rates, cost of living, and post-study work rights.', '{"bullets":["Multi-Country Comparisons","Cost of Living & Fee Analysis","Post-Study Work Options","Settle & PR Path Briefings"],"outcomes":["Optimized destination match","Detailed financial budget","Post-graduation visa path clarity"]}', (SELECT id FROM media_assets WHERE path = '/images/services/study-abroad-guidance.jpg'), 3, 'published', now()),
('visa-assistance', 'Visa Assistance', 'Visa', 'Comprehensive visa filing checklists, financial statement reviews, mock visa interview training, and strict compliance.', 'Expert visa documentation support focusing on source-of-funds clarity, academic consistency, and embassy guidelines across all supported countries.', '{"bullets":["Financial Document Verification","Visa Application Checklists","Mock Interview Sessions","Immigration Compliance Checks"],"outcomes":["High-accuracy visa submission","Prepared and confident interview answers","Clear understanding of visa rules"]}', (SELECT id FROM media_assets WHERE path = '/images/services/visa-assistance.jpg'), 4, 'published', now()),
('university-application', 'University Application Support', 'Admissions', 'Step-by-step assistance in preparing applications, managing deadlines, and coordinating with global university admissions.', 'End-to-end support for university admission portals, secure application tracking, offer letter follow-ups, and coordinator interactions.', '{"bullets":["Application Deadlines Tracking","Form Submission Support","University Communications","Admission Offer Tracking"],"outcomes":["Secured university offer letters","Timely submissions to DLIs","Direct communication lines with admissions"]}', (SELECT id FROM media_assets WHERE path = '/images/services/university-application.jpg'), 5, 'published', now()),
('scholarship-guidance', 'Scholarship Guidance', 'Scholarships', 'Help in identifying merit-based, need-based, and country-specific scholarships, as well as compiling strong portfolios.', 'Tailored portfolio reviews and application support for tuition fee waivers, merit awards, and university-sponsored grants.', '{"bullets":["Merit & Need Scholarship Finder","Portfolio & Profile Building","Essay & Statement Review","Application Deadlines Alerts"],"outcomes":["Optimized scholarship profile","Submission of funding proposals","Reduced financial burden"]}', (SELECT id FROM media_assets WHERE path = '/images/services/scholarship-guidance.jpg'), 6, 'published', now()),
('interview-preparation', 'Interview Preparation', 'Preparation', 'Dedicated mock interview rounds for visa officials, university admissions, and international scholarship panels.', 'Rigorous preparation classes focusing on confidence, key question responses, document familiarity, and professional body language.', '{"bullets":["Admissions Interview Prep","Embassy Visa Mock Rounds","Confidence & Body Language","Frequently Asked Questions"],"outcomes":["Improved communication confidence","Consistent visa storytelling","Reduced interview anxiety"]}', (SELECT id FROM media_assets WHERE path = '/images/services/interview-preparation.jpg'), 7, 'published', now()),
('documentation-support', 'Documentation Support', 'Documentation', 'SOP reviews, recommendation letter guidelines, CV curation, and translations of academic credentials.', 'Expert editing and alignment for Statements of Purpose, CV layouts, reference letters, and certified educational translations.', '{"bullets":["SOP Curation & Reviews","LOR Drafting Guidelines","CV Curation & Layouts","Academic Translation Checks"],"outcomes":["Compelling Statement of Purpose","Industry-grade professional CV","Fully compliant supporting files"]}', (SELECT id FROM media_assets WHERE path = '/images/services/documentation-support.jpg'), 8, 'published', now()),
('admission-guidance', 'Admission Guidance', 'Admissions', 'Step-by-step assistance in preparing applications, managing deadlines, and coordinating with global university admissions.', 'Comprehensive university admission guidance. We help you choose the right courses and universities, review your eligibility, and submit flawless applications.', '{"bullets":["University Selection","Entry Requirement Checks","Application Submission","Offer Letter Follow-ups"],"outcomes":["Secured university offer letters","Timely submissions","Direct admission support"]}', (SELECT id FROM media_assets WHERE path = '/images/services/admission-guidance.jpg'), 9, 'published', now()),
('test-preparation-support', 'Test Preparation', 'Test Prep', 'Comprehensive preparation classes for IELTS, PTE, TOEFL, and SAT with certified teachers and mock tests.', 'Get the best scores with our certified preparation classes. We provide study materials, regular mock tests, and personalized feedback.', '{"bullets":["Certified Instructors","Weekly Mock Tests","Interactive Study Material","Performance Analytics"],"outcomes":["Target test scores achieved","Test-taking confidence","Improved English proficiency"]}', (SELECT id FROM media_assets WHERE path = '/images/services/test-prep.jpg'), 10, 'published', now()),
('travel-accommodation', 'Travel & Accommodation', 'Logistics', 'Support with flight bookings, travel guidelines, and finding safe student housing or university hostels.', 'Complete support for travel planning, flight booking guidance, and finding affordable, safe student housing or hostel arrangements near your university.', '{"bullets":["Flight Booking Guidance","Baggage & Travel Rules","Hostel & Housing Finder","Roommate Matching Support"],"outcomes":["Confirmed travel tickets","Pre-booked accommodation","Smooth arrival coordination"]}', (SELECT id FROM media_assets WHERE path = '/images/services/travel-accommodation.jpg'), 11, 'published', now()),
('pre-departure-support', 'Pre-Departure Support', 'Orientation', 'Comprehensive briefing sessions to prepare you for life, academic culture, and part-time work in your destination country.', 'Interactive pre-departure briefing covering local culture, climate preparation, academic expectations, banking setups, and part-time work guidelines.', '{"bullets":["Cultural Adaptation Guidance","Academic Norms Briefing","Emergency Contact Setup","What to Pack Checklist"],"outcomes":["Complete departure readiness","Emergency contacts & tips","Smooth transition overseas"]}', (SELECT id FROM media_assets WHERE path = '/images/services/pre-departure.jpg'), 12, 'published', now())
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  label = EXCLUDED.label,
  summary = EXCLUDED.summary,
  detail = EXCLUDED.detail,
  body = EXCLUDED.body,
  image_id = EXCLUDED.image_id,
  sort_order = EXCLUDED.sort_order,
  status = EXCLUDED.status,
  published_at = EXCLUDED.published_at,
  updated_at = now();

INSERT INTO notices_events (slug, type, title, excerpt, body, event_date, location, cta_label, cta_href, featured, sort_order, status, published_at)
VALUES
('july-application-week', 'event', 'July Application Week', 'Free profile review for UK, Australia, Japan, Finland, and South Korea applicants.', '{"html":"<p>Bring your academic documents for university shortlisting, scholarship mapping, and visa timeline planning with Jyoti Educations counselors.</p>"}', now() + interval '10 days', 'Jyoti Educations Office', 'Book Free Consultation', '/book-free-consultation', true, 1, 'published', now()),
('ielts-pte-mock-test', 'notice', 'IELTS/PTE Mock Test Seats Open', 'Limited mock-test seats are available this week for language preparation students.', '{"html":"<p>Register early to receive speaking feedback, score analytics, and a counselor review.</p>"}', null, 'Jyoti Educations Test Lab', 'Reserve Seat', '/book-free-consultation', false, 2, 'published', now())
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body = EXCLUDED.body,
  event_date = EXCLUDED.event_date,
  location = EXCLUDED.location,
  cta_label = EXCLUDED.cta_label,
  cta_href = EXCLUDED.cta_href,
  featured = EXCLUDED.featured,
  sort_order = EXCLUDED.sort_order,
  status = EXCLUDED.status,
  published_at = EXCLUDED.published_at,
  updated_at = now();

INSERT INTO homepage_popup_banners (title, subtitle, body, cta_label, cta_href, display_mode, sort_order, status)
VALUES
('July Application Week is open', 'Free profile review and application timeline planning.', '<p>Meet Jyoti Educations counselors for destination comparison, university shortlisting, and visa document guidance.</p>', 'Book My Slot', '/book-free-consultation', 'modal', 1, 'published');

INSERT INTO team_members (slug, name, role_title, bio, image_id, sort_order, status, featured, badge_text, metadata)
VALUES
('ravi-gupta', 'Ravi Gupta', 'Founder / Director', 'Strategic leadership and institutional relationship development for international education pathways.', (SELECT id FROM media_assets WHERE path = '/images/brand/leader-ravi-gupta.jpg'), 1, 'published', true, 'Leadership', '{"focus":["University partnerships","Compliance","Student outcomes"]}'),
('kabiraj-paudel', 'Kabiraj Paudel', 'Senior Counselor', 'Student profile review, admission planning, and destination-fit guidance.', (SELECT id FROM media_assets WHERE path = '/images/brand/leader-kabiraj-paudel.jpg'), 2, 'published', true, 'Counseling', '{"focus":["Admissions","Career mapping","Parent guidance"]}'),
('dipendra-mehta', 'Dipendra Mehta', 'Documentation Lead', 'SOP, CV, recommendation, and application documentation support.', (SELECT id FROM media_assets WHERE path = '/images/brand/leader-dipendra-mehta.png'), 3, 'published', true, 'Documentation', '{"focus":["SOP review","Visa files","Application checks"]}'),
('tilak-thapa', 'Tilak Thapa', 'Test Preparation Coordinator', 'Language test readiness, mock-test planning, and student performance tracking.', (SELECT id FROM media_assets WHERE path = '/images/brand/leader-tilak-thapa.jpg'), 4, 'published', true, 'Test Prep', '{"focus":["IELTS","PTE","Mock tests"]}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  role_title = EXCLUDED.role_title,
  bio = EXCLUDED.bio,
  image_id = EXCLUDED.image_id,
  sort_order = EXCLUDED.sort_order,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured,
  badge_text = EXCLUDED.badge_text,
  metadata = EXCLUDED.metadata,
  updated_at = now();

INSERT INTO videos (title, description, provider, provider_video_id, media_id, category, status, sort_order)
VALUES
('Jyoti Educations Campus Walkthrough', 'A quick look at Jyoti Educations counseling and preparation spaces.', null, null, (SELECT id FROM media_assets WHERE path = '/videos/jyoti-campus.mp4'), 'Campus', 'published', 1)
ON CONFLICT (id) DO NOTHING;
