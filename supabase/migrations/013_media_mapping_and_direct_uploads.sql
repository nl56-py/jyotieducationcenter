-- Map local production media to content tables and configure direct Supabase uploads.
-- Public site domain: https://edumark.edu.np

ALTER TABLE services
  ADD COLUMN IF NOT EXISTS image_id UUID REFERENCES media_assets(id) ON DELETE SET NULL;

ALTER TABLE videos
  ADD COLUMN IF NOT EXISTS media_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS poster_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS external_url TEXT;

ALTER TABLE videos ALTER COLUMN provider DROP NOT NULL;
ALTER TABLE videos ALTER COLUMN provider_video_id DROP NOT NULL;

CREATE INDEX IF NOT EXISTS idx_services_image_id ON services(image_id);
CREATE INDEX IF NOT EXISTS idx_videos_media_id ON videos(media_id);
CREATE INDEX IF NOT EXISTS idx_videos_poster_id ON videos(poster_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_image_id ON testimonials(image_id);

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  true,
  104857600,
  ARRAY[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/avif',
    'video/mp4',
    'video/webm',
    'application/pdf'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS media_bucket_public_read ON storage.objects;
CREATE POLICY media_bucket_public_read ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'media');

DROP POLICY IF EXISTS media_bucket_admin_insert ON storage.objects;
CREATE POLICY media_bucket_admin_insert ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'media'
    AND public.has_admin_role(ARRAY['super_admin'::public.admin_role, 'admin'::public.admin_role, 'editor'::public.admin_role])
  );

DROP POLICY IF EXISTS media_bucket_admin_update ON storage.objects;
CREATE POLICY media_bucket_admin_update ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'media'
    AND public.has_admin_role(ARRAY['super_admin'::public.admin_role, 'admin'::public.admin_role, 'editor'::public.admin_role])
  )
  WITH CHECK (
    bucket_id = 'media'
    AND public.has_admin_role(ARRAY['super_admin'::public.admin_role, 'admin'::public.admin_role, 'editor'::public.admin_role])
  );

DROP POLICY IF EXISTS media_bucket_admin_delete ON storage.objects;
CREATE POLICY media_bucket_admin_delete ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'media'
    AND public.has_admin_role(ARRAY['super_admin'::public.admin_role, 'admin'::public.admin_role])
  );

INSERT INTO media_assets (bucket, path, file_name, mime_type, size_bytes, alt_text, caption)
VALUES
('public', 'https://edumark.edu.np/images/services/educational-consulting.jpg', 'educational-consulting.jpg', 'image/jpeg', 0, 'Educational consulting session at EduMark', 'Service card image'),
('public', 'https://edumark.edu.np/images/services/career-counselling.jpg', 'career-counselling.jpg', 'image/jpeg', 0, 'Career counselling at EduMark', 'Service card image'),
('public', 'https://edumark.edu.np/images/services/study-abroad-guidance.jpg', 'study-abroad-guidance.jpg', 'image/jpeg', 0, 'Study abroad guidance consultation', 'Service card image'),
('public', 'https://edumark.edu.np/images/services/visa-assistance.jpg', 'visa-assistance.jpg', 'image/jpeg', 0, 'Visa assistance service', 'Service card image'),
('public', 'https://edumark.edu.np/images/services/university-application.jpg', 'university-application.jpg', 'image/jpeg', 0, 'University application support', 'Service card image'),
('public', 'https://edumark.edu.np/images/services/scholarship-guidance.jpg', 'scholarship-guidance.jpg', 'image/jpeg', 0, 'Scholarship guidance support', 'Service card image'),
('public', 'https://edumark.edu.np/images/services/interview-preparation.jpg', 'interview-preparation.jpg', 'image/jpeg', 0, 'Interview preparation class', 'Service card image'),
('public', 'https://edumark.edu.np/images/services/documentation-support.jpg', 'documentation-support.jpg', 'image/jpeg', 0, 'Documentation support desk', 'Service card image'),
('public', 'https://edumark.edu.np/images/services/admission-guidance.jpg', 'admission-guidance.jpg', 'image/jpeg', 0, 'Admission guidance session', 'Service card image'),
('public', 'https://edumark.edu.np/images/services/test-prep.jpg', 'test-prep.jpg', 'image/jpeg', 0, 'Test preparation classroom', 'Service card image'),
('public', 'https://edumark.edu.np/images/services/travel-accommodation.jpg', 'travel-accommodation.jpg', 'image/jpeg', 0, 'Travel and accommodation support', 'Service card image'),
('public', 'https://edumark.edu.np/images/services/pre-departure.jpg', 'pre-departure.jpg', 'image/jpeg', 0, 'Pre-departure briefing', 'Service card image'),
('public', 'https://edumark.edu.np/images/brand/leader-ravi-gupta.jpg', 'leader-ravi-gupta.jpg', 'image/jpeg', 0, 'Ravi Gupta portrait', 'Team photo'),
('public', 'https://edumark.edu.np/images/brand/leader-kabiraj-paudel.jpg', 'leader-kabiraj-paudel.jpg', 'image/jpeg', 0, 'Kabiraj Paudel portrait', 'Team photo'),
('public', 'https://edumark.edu.np/images/brand/leader-dipendra-mehta.png', 'leader-dipendra-mehta.png', 'image/png', 0, 'Dipendra Mehta portrait', 'Team photo'),
('public', 'https://edumark.edu.np/images/brand/leader-tilak-thapa.jpg', 'leader-tilak-thapa.jpg', 'image/jpeg', 0, 'Tilak Thapa portrait', 'Team photo'),
('public', 'https://edumark.edu.np/images/generated/student-success.png', 'student-success.png', 'image/png', 0, 'Successful EduMark student', 'Testimonial fallback image'),
('public', 'https://edumark.edu.np/images/generated/study-hero.png', 'study-hero.png', 'image/png', 0, 'EduMark study abroad hero image', 'Homepage popup image'),
('public', 'https://edumark.edu.np/images/brochure/hero-background.jpg', 'hero-background.jpg', 'image/jpeg', 0, 'EduMark seminar and counselling background', 'Video poster image'),
('public', 'https://edumark.edu.np/videos/edumark-campus.mp4', 'edumark-campus.mp4', 'video/mp4', 0, 'EduMark campus walkthrough video', 'Video gallery media'),
('public', 'https://edumark.edu.np/videos/counseliing video .mp4', 'counseliing video .mp4', 'video/mp4', 0, 'EduMark counselling video', 'Video gallery media')
ON CONFLICT (path) DO UPDATE SET
  file_name = EXCLUDED.file_name,
  mime_type = EXCLUDED.mime_type,
  alt_text = EXCLUDED.alt_text,
  caption = EXCLUDED.caption;

UPDATE services SET image_id = (SELECT id FROM media_assets WHERE path = 'https://edumark.edu.np/images/services/educational-consulting.jpg') WHERE slug = 'educational-consulting';
UPDATE services SET image_id = (SELECT id FROM media_assets WHERE path = 'https://edumark.edu.np/images/services/career-counselling.jpg') WHERE slug = 'career-counselling';
UPDATE services SET image_id = (SELECT id FROM media_assets WHERE path = 'https://edumark.edu.np/images/services/study-abroad-guidance.jpg') WHERE slug = 'study-abroad-guidance';
UPDATE services SET image_id = (SELECT id FROM media_assets WHERE path = 'https://edumark.edu.np/images/services/visa-assistance.jpg') WHERE slug = 'visa-assistance';
UPDATE services SET image_id = (SELECT id FROM media_assets WHERE path = 'https://edumark.edu.np/images/services/university-application.jpg') WHERE slug = 'university-application';
UPDATE services SET image_id = (SELECT id FROM media_assets WHERE path = 'https://edumark.edu.np/images/services/scholarship-guidance.jpg') WHERE slug = 'scholarship-guidance';
UPDATE services SET image_id = (SELECT id FROM media_assets WHERE path = 'https://edumark.edu.np/images/services/interview-preparation.jpg') WHERE slug = 'interview-preparation';
UPDATE services SET image_id = (SELECT id FROM media_assets WHERE path = 'https://edumark.edu.np/images/services/documentation-support.jpg') WHERE slug = 'documentation-support';
UPDATE services SET image_id = (SELECT id FROM media_assets WHERE path = 'https://edumark.edu.np/images/services/admission-guidance.jpg') WHERE slug = 'admission-guidance';
UPDATE services SET image_id = (SELECT id FROM media_assets WHERE path = 'https://edumark.edu.np/images/services/test-prep.jpg') WHERE slug = 'test-preparation-support';
UPDATE services SET image_id = (SELECT id FROM media_assets WHERE path = 'https://edumark.edu.np/images/services/travel-accommodation.jpg') WHERE slug = 'travel-accommodation';
UPDATE services SET image_id = (SELECT id FROM media_assets WHERE path = 'https://edumark.edu.np/images/services/pre-departure.jpg') WHERE slug = 'pre-departure-support';

UPDATE team_members SET image_id = (SELECT id FROM media_assets WHERE path = 'https://edumark.edu.np/images/brand/leader-ravi-gupta.jpg') WHERE slug = 'ravi-gupta';
UPDATE team_members SET image_id = (SELECT id FROM media_assets WHERE path = 'https://edumark.edu.np/images/brand/leader-kabiraj-paudel.jpg') WHERE slug = 'kabiraj-paudel';
UPDATE team_members SET image_id = (SELECT id FROM media_assets WHERE path = 'https://edumark.edu.np/images/brand/leader-dipendra-mehta.png') WHERE slug = 'dipendra-mehta';
UPDATE team_members SET image_id = (SELECT id FROM media_assets WHERE path = 'https://edumark.edu.np/images/brand/leader-tilak-thapa.jpg') WHERE slug = 'tilak-thapa';

UPDATE testimonials
SET image_id = (SELECT id FROM media_assets WHERE path = 'https://edumark.edu.np/images/generated/student-success.png')
WHERE image_id IS NULL;

UPDATE homepage_popup_banners
SET image_id = (SELECT id FROM media_assets WHERE path = 'https://edumark.edu.np/images/generated/study-hero.png')
WHERE image_id IS NULL;

UPDATE notices_events
SET image_id = (SELECT id FROM media_assets WHERE path = 'https://edumark.edu.np/images/generated/study-hero.png')
WHERE image_id IS NULL;

INSERT INTO videos (title, description, provider, provider_video_id, external_url, media_id, poster_id, category, status, sort_order)
SELECT *
FROM (VALUES
(
  'EduMark Campus Walkthrough',
  'A quick look at EduMark counselling and preparation spaces.',
  'local',
  null,
  null,
  (SELECT id FROM media_assets WHERE path = 'https://edumark.edu.np/videos/edumark-campus.mp4'),
  (SELECT id FROM media_assets WHERE path = 'https://edumark.edu.np/images/brochure/hero-background.jpg'),
  'Campus',
  'published'::content_status,
  1
),
(
  'Counselling Session Highlights',
  'Student counselling moments and EduMark office guidance.',
  'local',
  null,
  null,
  (SELECT id FROM media_assets WHERE path = 'https://edumark.edu.np/videos/counseliing video .mp4'),
  (SELECT id FROM media_assets WHERE path = 'https://edumark.edu.np/images/generated/study-hero.png'),
  'Counselling',
  'published'::content_status,
  2
)) AS seeded(title, description, provider, provider_video_id, external_url, media_id, poster_id, category, status, sort_order)
WHERE NOT EXISTS (
  SELECT 1 FROM videos WHERE videos.title = seeded.title
);
