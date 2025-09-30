import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // don't persist session to localStorage
    storage: typeof window !== "undefined" ? window.sessionStorage : undefined, // keep session only for this browser tab
    autoRefreshToken: true, // refresh tokens while tab is open
    detectSessionInUrl: true, // allow magic link / OAuth callbacks
  },
});
