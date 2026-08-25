import { getDatabaseClient } from "../db/client";

export const isSupabaseConfigured = () => true;

export async function createSupabaseServerClient() {
  return getDatabaseClient() as any;
}
