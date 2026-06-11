-- Enable Row Level Security (RLS) on all tables and define access policies

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE destination_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_preparations ENABLE ROW LEVEL SECURITY;
ALTER TABLE entrance_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

--------------------------------------------------------------------------------
-- 1. admin_users policies
--------------------------------------------------------------------------------
CREATE POLICY admin_users_read_self_or_admin ON admin_users
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role]));

CREATE POLICY admin_users_manage_super_admin ON admin_users
  FOR ALL TO authenticated
  USING (has_admin_role(ARRAY['super_admin'::admin_role]))
  WITH CHECK (has_admin_role(ARRAY['super_admin'::admin_role]));

--------------------------------------------------------------------------------
-- 2. audit_logs policies
--------------------------------------------------------------------------------
CREATE POLICY audit_logs_read_admin ON audit_logs
  FOR SELECT TO authenticated
  USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role]));

CREATE POLICY audit_logs_write_system ON audit_logs
  FOR INSERT TO authenticated, anon
  WITH CHECK (true); -- Usually inserted via security definer trigger or service role, but allow insert for safety

--------------------------------------------------------------------------------
-- 3. security_events policies
--------------------------------------------------------------------------------
CREATE POLICY security_events_read_admin ON security_events
  FOR SELECT TO authenticated
  USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role]));

CREATE POLICY security_events_write_system ON security_events
  FOR INSERT TO authenticated, anon
  WITH CHECK (true);

--------------------------------------------------------------------------------
-- 4. media_assets policies
--------------------------------------------------------------------------------
CREATE POLICY media_assets_read_public ON media_assets
  FOR SELECT TO authenticated, anon
  USING (true);

CREATE POLICY media_assets_manage_staff ON media_assets
  FOR ALL TO authenticated
  USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'editor'::admin_role]))
  WITH CHECK (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'editor'::admin_role]));

--------------------------------------------------------------------------------
-- 5. site_settings policies
--------------------------------------------------------------------------------
CREATE POLICY site_settings_read_public ON site_settings
  FOR SELECT TO authenticated, anon
  USING (true);

CREATE POLICY site_settings_manage_admin ON site_settings
  FOR ALL TO authenticated
  USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role]))
  WITH CHECK (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role]));

--------------------------------------------------------------------------------
-- 6. navigation_items policies
--------------------------------------------------------------------------------
CREATE POLICY navigation_items_read_public ON navigation_items
  FOR SELECT TO authenticated, anon
  USING (status = 'published' OR is_admin());

CREATE POLICY navigation_items_manage_admin ON navigation_items
  FOR ALL TO authenticated
  USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role]))
  WITH CHECK (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role]));

--------------------------------------------------------------------------------
-- 7. redirects policies
--------------------------------------------------------------------------------
CREATE POLICY redirects_read_public ON redirects
  FOR SELECT TO authenticated, anon
  USING (is_active = true OR is_admin());

CREATE POLICY redirects_manage_admin ON redirects
  FOR ALL TO authenticated
  USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role]))
  WITH CHECK (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role]));

--------------------------------------------------------------------------------
-- 8. CMS Public Tables (Select published or if admin, manage if editor/admin)
--------------------------------------------------------------------------------

-- Macro-like policies for general CMS tables:
-- pages, page_sections, destinations, destination_sections, universities, test_preparations, entrance_programs, services, team_members, testimonials, blog_categories, blog_posts, videos

-- pages
CREATE POLICY pages_select ON pages FOR SELECT TO authenticated, anon USING (status = 'published' OR is_admin());
CREATE POLICY pages_manage ON pages FOR ALL TO authenticated USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'editor'::admin_role]));

-- page_sections
CREATE POLICY page_sections_select ON page_sections FOR SELECT TO authenticated, anon USING (status = 'published' OR is_admin());
CREATE POLICY page_sections_manage ON page_sections FOR ALL TO authenticated USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'editor'::admin_role]));

-- destinations
CREATE POLICY destinations_select ON destinations FOR SELECT TO authenticated, anon USING (status = 'published' OR is_admin());
CREATE POLICY destinations_manage ON destinations FOR ALL TO authenticated USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'editor'::admin_role]));

-- destination_sections
CREATE POLICY destination_sections_select ON destination_sections FOR SELECT TO authenticated, anon USING (true); -- Child of destination, controlled by parent
CREATE POLICY destination_sections_manage ON destination_sections FOR ALL TO authenticated USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'editor'::admin_role]));

-- universities
CREATE POLICY universities_select ON universities FOR SELECT TO authenticated, anon USING (status = 'published' OR is_admin());
CREATE POLICY universities_manage ON universities FOR ALL TO authenticated USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'editor'::admin_role]));

-- test_preparations
CREATE POLICY test_preparations_select ON test_preparations FOR SELECT TO authenticated, anon USING (status = 'published' OR is_admin());
CREATE POLICY test_preparations_manage ON test_preparations FOR ALL TO authenticated USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'editor'::admin_role]));

-- entrance_programs
CREATE POLICY entrance_programs_select ON entrance_programs FOR SELECT TO authenticated, anon USING (status = 'published' OR is_admin());
CREATE POLICY entrance_programs_manage ON entrance_programs FOR ALL TO authenticated USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'editor'::admin_role]));

-- services
CREATE POLICY services_select ON services FOR SELECT TO authenticated, anon USING (status = 'published' OR is_admin());
CREATE POLICY services_manage ON services FOR ALL TO authenticated USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'editor'::admin_role]));

-- team_members
CREATE POLICY team_members_select ON team_members FOR SELECT TO authenticated, anon USING (status = 'published' OR is_admin());
CREATE POLICY team_members_manage ON team_members FOR ALL TO authenticated USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'editor'::admin_role]));

-- testimonials
CREATE POLICY testimonials_select ON testimonials FOR SELECT TO authenticated, anon USING (status = 'published' OR is_admin());
CREATE POLICY testimonials_manage ON testimonials FOR ALL TO authenticated USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'editor'::admin_role]));

-- blog_categories
CREATE POLICY blog_categories_select ON blog_categories FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY blog_categories_manage ON blog_categories FOR ALL TO authenticated USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'editor'::admin_role]));

-- blog_posts
CREATE POLICY blog_posts_select ON blog_posts FOR SELECT TO authenticated, anon USING (status = 'published' OR is_admin());
CREATE POLICY blog_posts_manage ON blog_posts FOR ALL TO authenticated USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'editor'::admin_role]));

-- videos
CREATE POLICY videos_select ON videos FOR SELECT TO authenticated, anon USING (status = 'published' OR is_admin());
CREATE POLICY videos_manage ON videos FOR ALL TO authenticated USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'editor'::admin_role]));

--------------------------------------------------------------------------------
-- 9. Lead and Booking tables (Private, access by counselor/admin/viewer, public can insert)
--------------------------------------------------------------------------------

-- leads
CREATE POLICY leads_insert_public ON leads FOR INSERT TO authenticated, anon WITH CHECK (true);
CREATE POLICY leads_select_staff ON leads FOR SELECT TO authenticated
  USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'counselor'::admin_role, 'viewer'::admin_role]));
CREATE POLICY leads_update_staff ON leads FOR UPDATE TO authenticated
  USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'counselor'::admin_role]))
  WITH CHECK (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'counselor'::admin_role]));
CREATE POLICY leads_delete_super ON leads FOR DELETE TO authenticated
  USING (has_admin_role(ARRAY['super_admin'::admin_role]));

-- lead_notes
CREATE POLICY lead_notes_select_staff ON lead_notes FOR SELECT TO authenticated
  USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'counselor'::admin_role, 'viewer'::admin_role]));
CREATE POLICY lead_notes_insert_staff ON lead_notes FOR INSERT TO authenticated
  WITH CHECK (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'counselor'::admin_role]));
CREATE POLICY lead_notes_manage_author ON lead_notes FOR ALL TO authenticated
  USING (author_admin_id = (SELECT id FROM admin_users WHERE user_id = auth.uid()));

-- lead_events
CREATE POLICY lead_events_select_staff ON lead_events FOR SELECT TO authenticated
  USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'counselor'::admin_role, 'viewer'::admin_role]));
CREATE POLICY lead_events_insert_system ON lead_events FOR INSERT TO authenticated, anon WITH CHECK (true);

-- consultation_bookings
CREATE POLICY bookings_insert_public ON consultation_bookings FOR INSERT TO authenticated, anon WITH CHECK (true);
CREATE POLICY bookings_select_staff ON consultation_bookings FOR SELECT TO authenticated
  USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'counselor'::admin_role, 'viewer'::admin_role]));
CREATE POLICY bookings_update_staff ON consultation_bookings FOR UPDATE TO authenticated
  USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'counselor'::admin_role]))
  WITH CHECK (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'counselor'::admin_role]));
CREATE POLICY bookings_delete_super ON consultation_bookings FOR DELETE TO authenticated
  USING (has_admin_role(ARRAY['super_admin'::admin_role]));

-- newsletter_subscribers
CREATE POLICY newsletter_insert_public ON newsletter_subscribers FOR INSERT TO authenticated, anon WITH CHECK (true);
CREATE POLICY newsletter_select_staff ON newsletter_subscribers FOR SELECT TO authenticated
  USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'counselor'::admin_role, 'viewer'::admin_role]));
CREATE POLICY newsletter_update_staff ON newsletter_subscribers FOR UPDATE TO authenticated
  USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'counselor'::admin_role]))
  WITH CHECK (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role, 'counselor'::admin_role]));
