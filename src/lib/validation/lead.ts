import { z } from "zod";

export const LeadSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100, "Name cannot exceed 100 characters"),
  phone: z.string().min(7, "Phone number must be at least 7 digits").max(20, "Phone number is too long"),
  email: z.string().email("Invalid email address").or(z.literal("")).optional(),
  preferredDestination: z.string().optional(),
  courseInterest: z.string().optional(),
  message: z.string().max(1000, "Message cannot exceed 1000 characters").optional(),
  source: z.string().default("inquiry_form"),
  honeypot: z.string().max(100).optional(), // Honeypot spam protection
});

export type LeadInput = z.infer<typeof LeadSchema>;
