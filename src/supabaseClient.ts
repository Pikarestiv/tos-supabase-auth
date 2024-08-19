import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qahgadlcnpftzdvylqrk.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhaGdhZGxjbnBmdHpkdnlscXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM4MTI4NzYsImV4cCI6MjAzOTM4ODg3Nn0.-DI7H6Ha5-VdXoC31jvLKdR2313LpbBZsbkrlVF6O64";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
