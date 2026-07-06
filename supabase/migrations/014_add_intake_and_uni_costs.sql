-- Migration 014: Add intake and university cost columns to destinations table
ALTER TABLE destinations 
  ADD COLUMN IF NOT EXISTS next_intake_label TEXT,
  ADD COLUMN IF NOT EXISTS next_intake_date TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS university_cost TEXT;
