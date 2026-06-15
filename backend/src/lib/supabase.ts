import { createClient } from "@supabase/supabase-js";
import type { Env } from "../types/env";

export function getSupabase(env: Env) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });
}

export function toCamelCase(rows: Record<string, unknown>[]): Record<string, unknown>[] {
  return rows.map((row) => {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(row)) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      result[camelKey] = value;
    }
    return result;
  });
}
