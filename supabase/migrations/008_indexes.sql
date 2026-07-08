-- Create performance and full-text search indexes

-- Foreign Key Indexes
CREATE INDEX idx_admin_users_user_id ON admin_users(user_id);
CREATE INDEX idx_media_assets_uploaded_by ON media_assets(uploaded_by);
CREATE INDEX idx_site_settings_updated_by ON site_settings(updated_by);
CREATE INDEX idx_navigation_items_parent_id ON navigation_items(parent_id);
CREATE INDEX idx_pages_og_image_id ON pages(og_image_id);
CREATE INDEX idx_page_sections_page_id ON page_sections(page_id);
CREATE INDEX idx_page_sections_media_id ON page_sections(media_id);
CREATE INDEX idx_destination_sections_destination_id ON destination_sections(destination_id);
CREATE INDEX idx_universities_destination_id ON universities(destination_id);
CREATE INDEX idx_team_members_image_id ON team_members(image_id);
CREATE INDEX idx_testimonials_image_id ON testimonials(image_id);
CREATE INDEX idx_blog_posts_category_id ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_cover_image_id ON blog_posts(cover_image_id);
CREATE INDEX idx_blog_posts_author_admin_id ON blog_posts(author_admin_id);
CREATE INDEX idx_videos_thumbnail_id ON videos(thumbnail_id);
CREATE INDEX idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX idx_lead_notes_lead_id ON lead_notes(lead_id);
CREATE INDEX idx_lead_notes_author_admin_id ON lead_notes(author_admin_id);
CREATE INDEX idx_lead_events_lead_id ON lead_events(lead_id);
CREATE INDEX idx_consultation_bookings_assigned_to ON consultation_bookings(assigned_to);
CREATE INDEX idx_consultation_bookings_lead_id ON consultation_bookings(lead_id);

-- Status and Sorting Indexes
CREATE INDEX idx_pages_status_published ON pages(status, published_at DESC);
CREATE INDEX idx_destinations_status_published ON destinations(status, published_at DESC);
CREATE INDEX idx_blog_posts_status_published ON blog_posts(status, published_at DESC);
CREATE INDEX idx_blog_posts_category_status_published ON blog_posts(category_id, status, published_at DESC);
CREATE INDEX idx_leads_status_created ON leads(status, created_at DESC);
CREATE INDEX idx_leads_assigned_status ON leads(assigned_to, status);
CREATE INDEX idx_consultation_bookings_status_date ON consultation_bookings(status, preferred_date);
CREATE INDEX idx_security_events_created ON security_events(created_at DESC);

-- Full-Text Search Support (using GIN indexes)
-- For English search on blogs, destinations, services, test-preps

CREATE INDEX idx_blog_posts_search ON blog_posts USING gin(
  to_tsvector('english', title || ' ' || COALESCE(excerpt, '') || ' ' || COALESCE(seo_title, '') || ' ' || COALESCE(seo_description, ''))
);

CREATE INDEX idx_destinations_search ON destinations USING gin(
  to_tsvector('english', name || ' ' || COALESCE(summary, '') || ' ' || COALESCE(hero_title, '') || ' ' || COALESCE(hero_body, ''))
);

CREATE INDEX idx_services_search ON services USING gin(
  to_tsvector('english', name || ' ' || COALESCE(summary, ''))
);

CREATE INDEX idx_test_preparations_search ON test_preparations USING gin(
  to_tsvector('english', name || ' ' || COALESCE(summary, ''))
);
