import { createHash } from "crypto";

/**
 * Strips HTML tags and trims strings to prevent basic script injections
 */
export function sanitizeString(val: string): string {
  if (!val) return "";
  return val
    .replace(/<[^>]*>/g, "") // strip html tags
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

/**
 * Normalizes email address
 */
export function normalizeEmail(email: string): string {
  if (!email) return "";
  return email.trim().toLowerCase();
}

/**
 * Normalizes phone numbers by stripping non-numeric chars except leading +
 */
export function normalizePhone(phone: string): string {
  if (!phone) return "";
  const cleaned = phone.replace(/[^\d+]/g, "");
  return cleaned;
}

/**
 * Hashes sensitive details (like IP addresses, user agents, or emails for matching) to protect privacy in logs
 */
export function hashString(value: string, salt = "edumark-security-salt"): string {
  if (!value) return "";
  return createHash("sha256")
    .update(value + salt)
    .digest("hex");
}
