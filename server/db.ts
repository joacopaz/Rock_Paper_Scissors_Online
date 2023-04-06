import { createClient } from "@supabase/supabase-js";

export const db = createClient(process.env.DB_URL!, process.env.DB_PUBLIC_KEY!);
