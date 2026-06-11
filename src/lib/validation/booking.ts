import { z } from "zod";

export const BookingSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100, "Name cannot exceed 100 characters"),
  phone: z.string().min(7, "Phone number must be at least 7 digits").max(20, "Phone number is too long"),
  email: z.string().email("Invalid email address").or(z.literal("")).optional(),
  preferredDestination: z.string().optional(),
  courseInterest: z.string().optional(),
  preferredDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  preferredTime: z.string().min(2, "Please select a preferred time slot"),
  message: z.string().max(1000, "Message cannot exceed 1000 characters").optional(),
  honeypot: z.string().max(100).optional(),
});

export type BookingInput = z.infer<typeof BookingSchema>;
