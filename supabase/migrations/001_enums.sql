-- Create custom enum types for Jyoti Educations

CREATE TYPE admin_role AS ENUM (
  'super_admin',
  'admin',
  'editor',
  'counselor',
  'viewer'
);

CREATE TYPE admin_status AS ENUM (
  'active',
  'suspended',
  'deleted'
);

CREATE TYPE content_status AS ENUM (
  'draft',
  'review',
  'published',
  'archived'
);

CREATE TYPE lead_status AS ENUM (
  'new',
  'contacted',
  'counseling_scheduled',
  'in_progress',
  'converted',
  'lost',
  'spam'
);

CREATE TYPE booking_status AS ENUM (
  'requested',
  'confirmed',
  'completed',
  'cancelled',
  'no_show'
);
