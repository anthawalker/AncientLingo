import { createClient } from "@supabase/supabase-js";

function getTrimmed(...keys: string[]) {
    for (const k of keys) {
        const v = process.env[k];
        if (typeof v === "string" && v.trim()) return v.trim();
    }
    throw new Error(`Missing Supabase env. Tried: ${keys.join(", ")}`);
}

const SUPABASE_URL = getTrimmed("NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_URL");
const SUPABASE_ANON_KEY = getTrimmed(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_ANON_KEY"
);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
