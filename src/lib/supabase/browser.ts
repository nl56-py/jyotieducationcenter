import { createBrowserClient } from "@supabase/ssr";

export const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !!(url && !url.includes("placeholder-project"));
};

export function createSupabaseBrowserClient() {
  if (!isSupabaseConfigured()) {
    // Return null or placeholder in mock mode
    return null;
  }
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
