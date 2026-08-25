import { getDatabaseClient } from "../db/client";

export const isSupabaseConfigured = () => true;

export function createSupabaseAdminClient() {
  return getDatabaseClient() as any;
}
