import jwt from "jsonwebtoken";
import { AdminRole } from "../supabase/types";

const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || "jyoti-educations-secret-key-2026-secure";

export interface TokenPayload {
  id: string;
  email: string;
  role: AdminRole;
  fullName: string;
}

export function signJwtToken(payload: TokenPayload, expiresIn: string = "7d"): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as any);
}

export function verifyJwtToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}
