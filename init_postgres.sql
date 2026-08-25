-- ==========================================================
-- Jyoti Education Corner (Jyoti Educations)
-- DirectAdmin 25 PostgreSQL Database Schema
-- ==========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS admin_users (
  id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR(191) UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(191) NOT NULL UNIQUE,
  password_hash VARCHAR(255) DEFAULT '',
  role VARCHAR(50) NOT NULL DEFAULT 'admin',
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  mfa_required BOOLEAN NOT NULL DEFAULT FALSE,
  last_seen_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS security_events (
  id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type VARCHAR(100) NOT NULL,
  severity VARCHAR(50) NOT NULL DEFAULT 'info',
  fingerprint VARCHAR(255),
  ip_hash VARCHAR(255),
  details JSONB,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS media_assets (
  id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  bucket VARCHAR(100) NOT NULL DEFAULT 'public',
  path VARCHAR(500) NOT NULL UNIQUE,
  file_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  size_bytes BIGINT NOT NULL DEFAULT 0,
  width INT,
  height INT,
  alt_text TEXT,
  caption TEXT,
  uploaded_by VARCHAR(36) REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_settings (
  id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(191) NOT NULL UNIQUE,
  value JSONB NOT NULL,
  description TEXT,
  updated_by VARCHAR(36),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS destinations (
  id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(191) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  country_code VARCHAR(10),
  summary TEXT,
  hero_title VARCHAR(255),
  hero_body TEXT,
  cost_range VARCHAR(100),
  intake_badges JSONB,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  seo_title VARCHAR(255),
  seo_description TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS universities (
  id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  destination_id VARCHAR(36) NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(100),
  ranking_notes TEXT,
  website_url VARCHAR(500),
  fees VARCHAR(100),
  courses TEXT,
  image VARCHAR(500),
  status VARCHAR(50) NOT NULL DEFAULT 'published',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS services (
  id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(191) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  label VARCHAR(255),
  summary TEXT,
  detail TEXT,
  body JSONB,
  image_id VARCHAR(36) REFERENCES media_assets(id) ON DELETE SET NULL,
  sort_order INT NOT NULL DEFAULT 0,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  seo_title VARCHAR(255),
  seo_description TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS team_members (
  id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(191) UNIQUE,
  name VARCHAR(255) NOT NULL,
  role_title VARCHAR(255) NOT NULL,
  bio TEXT,
  email VARCHAR(255),
  phone VARCHAR(50),
  badge_text VARCHAR(100),
  badge_icon VARCHAR(50),
  image_id VARCHAR(36) REFERENCES media_assets(id) ON DELETE SET NULL,
  sort_order INT NOT NULL DEFAULT 0,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  social_links JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_name VARCHAR(255) NOT NULL,
  destination VARCHAR(100),
  quote TEXT NOT NULL,
  image_id VARCHAR(36) REFERENCES media_assets(id) ON DELETE SET NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_categories (
  id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(191) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(191) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content JSONB NOT NULL,
  category_id VARCHAR(36) REFERENCES blog_categories(id) ON DELETE SET NULL,
  cover_image_id VARCHAR(36) REFERENCES media_assets(id) ON DELETE SET NULL,
  author_admin_id VARCHAR(36) REFERENCES admin_users(id) ON DELETE SET NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  seo_title VARCHAR(255),
  seo_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS homepage_popup_banners (
  id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  body TEXT,
  cta_label VARCHAR(100),
  cta_href VARCHAR(500),
  image_id VARCHAR(36) REFERENCES media_assets(id) ON DELETE SET NULL,
  display_mode VARCHAR(50) NOT NULL DEFAULT 'modal',
  starts_at TIMESTAMP WITH TIME ZONE,
  ends_at TIMESTAMP WITH TIME ZONE,
  frequency_key VARCHAR(100) DEFAULT 'homepage-popup',
  sort_order INT NOT NULL DEFAULT 0,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notices_events (
  id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(191) NOT NULL UNIQUE,
  type VARCHAR(50) NOT NULL DEFAULT 'notice',
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  body JSONB NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE,
  location VARCHAR(255),
  cta_label VARCHAR(100),
  cta_href VARCHAR(500),
  image_id VARCHAR(36) REFERENCES media_assets(id) ON DELETE SET NULL,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INT NOT NULL DEFAULT 0,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leads (
  id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  preferred_destination VARCHAR(100),
  course_interest VARCHAR(255),
  message TEXT,
  source VARCHAR(100) NOT NULL DEFAULT 'website',
  status VARCHAR(50) NOT NULL DEFAULT 'new',
  assigned_to VARCHAR(36) REFERENCES admin_users(id) ON DELETE SET NULL,
  spam_score REAL DEFAULT 0,
  ip_hash VARCHAR(255),
  user_agent_hash VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lead_notes (
  id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id VARCHAR(36) NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  author_admin_id VARCHAR(36) REFERENCES admin_users(id) ON DELETE SET NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lead_events (
  id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id VARCHAR(36) NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  event_type VARCHAR(100) NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS consultation_bookings (
  id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  preferred_destination VARCHAR(100),
  course_interest VARCHAR(255),
  preferred_date TIMESTAMP WITH TIME ZONE,
  preferred_time VARCHAR(50),
  message TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'requested',
  assigned_to VARCHAR(36) REFERENCES admin_users(id) ON DELETE SET NULL,
  lead_id VARCHAR(36) REFERENCES leads(id) ON DELETE SET NULL,
  ip_hash VARCHAR(255),
  user_agent_hash VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(191) NOT NULL UNIQUE,
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  source VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
