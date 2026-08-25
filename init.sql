-- ==========================================================
-- Jyoti Education Corner (Jyoti Educations)
-- DirectAdmin 25 (MariaDB 11.4 / MySQL 8.x) Database Schema
-- ==========================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(191) NULL UNIQUE,
  `full_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) DEFAULT '',
  `role` VARCHAR(50) NOT NULL DEFAULT 'admin',
  `status` VARCHAR(50) NOT NULL DEFAULT 'active',
  `mfa_required` TINYINT(1) NOT NULL DEFAULT 0,
  `last_seen_at` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `security_events` (
  `id` VARCHAR(36) NOT NULL,
  `event_type` VARCHAR(100) NOT NULL,
  `severity` VARCHAR(50) NOT NULL DEFAULT 'info',
  `fingerprint` VARCHAR(255) NULL,
  `ip_hash` VARCHAR(255) NULL,
  `details` JSON NULL,
  `resolved_at` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `media_assets` (
  `id` VARCHAR(36) NOT NULL,
  `bucket` VARCHAR(100) NOT NULL DEFAULT 'public',
  `path` VARCHAR(500) NOT NULL UNIQUE,
  `file_name` VARCHAR(255) NOT NULL,
  `mime_type` VARCHAR(100) NOT NULL,
  `size_bytes` BIGINT NOT NULL DEFAULT 0,
  `width` INT NULL,
  `height` INT NULL,
  `alt_text` TEXT NULL,
  `caption` TEXT NULL,
  `uploaded_by` VARCHAR(36) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`uploaded_by`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` VARCHAR(36) NOT NULL,
  `key` VARCHAR(191) NOT NULL UNIQUE,
  `value` JSON NOT NULL,
  `description` TEXT NULL,
  `updated_by` VARCHAR(36) NULL,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `destinations` (
  `id` VARCHAR(36) NOT NULL,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `country_code` VARCHAR(10) NULL,
  `summary` TEXT NULL,
  `hero_title` VARCHAR(255) NULL,
  `hero_body` TEXT NULL,
  `cost_range` VARCHAR(100) NULL,
  `intake_badges` JSON NULL,
  `featured` TINYINT(1) NOT NULL DEFAULT 0,
  `status` VARCHAR(50) NOT NULL DEFAULT 'draft',
  `seo_title` VARCHAR(255) NULL,
  `seo_description` TEXT NULL,
  `published_at` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `universities` (
  `id` VARCHAR(36) NOT NULL,
  `destination_id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `city` VARCHAR(100) NULL,
  `ranking_notes` TEXT NULL,
  `website_url` VARCHAR(500) NULL,
  `fees` VARCHAR(100) NULL,
  `courses` TEXT NULL,
  `image` VARCHAR(500) NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'published',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `services` (
  `id` VARCHAR(36) NOT NULL,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `label` VARCHAR(255) NULL,
  `summary` TEXT NULL,
  `detail` TEXT NULL,
  `body` JSON NULL,
  `image_id` VARCHAR(36) NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `status` VARCHAR(50) NOT NULL DEFAULT 'draft',
  `seo_title` VARCHAR(255) NULL,
  `seo_description` TEXT NULL,
  `published_at` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`image_id`) REFERENCES `media_assets`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `team_members` (
  `id` VARCHAR(36) NOT NULL,
  `slug` VARCHAR(191) NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `role_title` VARCHAR(255) NOT NULL,
  `bio` TEXT NULL,
  `email` VARCHAR(255) NULL,
  `phone` VARCHAR(50) NULL,
  `badge_text` VARCHAR(100) NULL,
  `badge_icon` VARCHAR(50) NULL,
  `image_id` VARCHAR(36) NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `status` VARCHAR(50) NOT NULL DEFAULT 'draft',
  `featured` TINYINT(1) NOT NULL DEFAULT 0,
  `social_links` JSON NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`image_id`) REFERENCES `media_assets`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` VARCHAR(36) NOT NULL,
  `student_name` VARCHAR(255) NOT NULL,
  `destination` VARCHAR(100) NULL,
  `quote` TEXT NOT NULL,
  `image_id` VARCHAR(36) NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'draft',
  `sort_order` INT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`image_id`) REFERENCES `media_assets`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `blog_categories` (
  `id` VARCHAR(36) NOT NULL,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `sort_order` INT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id` VARCHAR(36) NOT NULL,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `excerpt` TEXT NULL,
  `content` JSON NOT NULL,
  `category_id` VARCHAR(36) NULL,
  `cover_image_id` VARCHAR(36) NULL,
  `author_admin_id` VARCHAR(36) NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'draft',
  `featured` TINYINT(1) NOT NULL DEFAULT 0,
  `published_at` DATETIME NULL,
  `seo_title` VARCHAR(255) NULL,
  `seo_description` TEXT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`category_id`) REFERENCES `blog_categories`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`cover_image_id`) REFERENCES `media_assets`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`author_admin_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `homepage_popup_banners` (
  `id` VARCHAR(36) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `subtitle` VARCHAR(255) NULL,
  `body` TEXT NULL,
  `cta_label` VARCHAR(100) NULL,
  `cta_href` VARCHAR(500) NULL,
  `image_id` VARCHAR(36) NULL,
  `display_mode` VARCHAR(50) NOT NULL DEFAULT 'modal',
  `starts_at` DATETIME NULL,
  `ends_at` DATETIME NULL,
  `frequency_key` VARCHAR(100) NULL DEFAULT 'homepage-popup',
  `sort_order` INT NOT NULL DEFAULT 0,
  `status` VARCHAR(50) NOT NULL DEFAULT 'draft',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`image_id`) REFERENCES `media_assets`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `notices_events` (
  `id` VARCHAR(36) NOT NULL,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `type` VARCHAR(50) NOT NULL DEFAULT 'notice',
  `title` VARCHAR(255) NOT NULL,
  `excerpt` TEXT NULL,
  `body` JSON NOT NULL,
  `event_date` DATETIME NULL,
  `location` VARCHAR(255) NULL,
  `cta_label` VARCHAR(100) NULL,
  `cta_href` VARCHAR(500) NULL,
  `image_id` VARCHAR(36) NULL,
  `featured` TINYINT(1) NOT NULL DEFAULT 0,
  `sort_order` INT NOT NULL DEFAULT 0,
  `status` VARCHAR(50) NOT NULL DEFAULT 'draft',
  `published_at` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`image_id`) REFERENCES `media_assets`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `leads` (
  `id` VARCHAR(36) NOT NULL,
  `full_name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(255) NULL,
  `preferred_destination` VARCHAR(100) NULL,
  `course_interest` VARCHAR(255) NULL,
  `message` TEXT NULL,
  `source` VARCHAR(100) NOT NULL DEFAULT 'website',
  `status` VARCHAR(50) NOT NULL DEFAULT 'new',
  `assigned_to` VARCHAR(36) NULL,
  `spam_score` FLOAT NULL DEFAULT 0,
  `ip_hash` VARCHAR(255) NULL,
  `user_agent_hash` VARCHAR(255) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`assigned_to`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `lead_notes` (
  `id` VARCHAR(36) NOT NULL,
  `lead_id` VARCHAR(36) NOT NULL,
  `author_admin_id` VARCHAR(36) NULL,
  `note` TEXT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`author_admin_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `lead_events` (
  `id` VARCHAR(36) NOT NULL,
  `lead_id` VARCHAR(36) NOT NULL,
  `event_type` VARCHAR(100) NOT NULL,
  `metadata` JSON NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `consultation_bookings` (
  `id` VARCHAR(36) NOT NULL,
  `full_name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(255) NULL,
  `preferred_destination` VARCHAR(100) NULL,
  `course_interest` VARCHAR(255) NULL,
  `preferred_date` DATETIME NULL,
  `preferred_time` VARCHAR(50) NULL,
  `message` TEXT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'requested',
  `assigned_to` VARCHAR(36) NULL,
  `lead_id` VARCHAR(36) NULL,
  `ip_hash` VARCHAR(255) NULL,
  `user_agent_hash` VARCHAR(255) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`assigned_to`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `newsletter_subscribers` (
  `id` VARCHAR(36) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `status` VARCHAR(50) NOT NULL DEFAULT 'active',
  `source` VARCHAR(100) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default super admin ($2a$10$7KzP8v6O4UeQn8rWk0nQFe2S0sJv4iJ2B0s1i9a/c0e.c8f2o1yqe -> Admin@12345)
INSERT INTO `admin_users` (`id`, `full_name`, `email`, `password_hash`, `role`, `status`)
VALUES (
  'admin-jyoti-default-001',
  'Kedar Poudel (Director)',
  'admin@jyotieducations.edu.np',
  '$2a$10$iZtTzXk0.O.L7j7.M3.Y8.i.Q9YvOaC5H5.8b.m8T2b6vG6uK8YGi',
  'super_admin',
  'active'
) ON DUPLICATE KEY UPDATE `status`='active';

SET FOREIGN_KEY_CHECKS = 1;
