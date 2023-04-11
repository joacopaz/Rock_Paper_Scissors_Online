import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

export const db = createClient(process.env.DB_URL!, process.env.DB_PUBLIC_KEY!);
