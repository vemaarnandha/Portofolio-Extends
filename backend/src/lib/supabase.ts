import { createClient } from "@supabase/supabase-js";
import type { Env } from "../types/env";

export function getSupabase(env: Env) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });
}

export function getServiceSupabase(env: Env) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE, {
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

export const IMAGE_ALLOWED_MIMES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
export const IMAGE_MAX_SIZE = 10 * 1024 * 1024;

export function getImageExtension(mime: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  };
  return map[mime] || "jpg";
}

export function generateImagePath(projectId: number, mime: string): string {
  const ext = getImageExtension(mime);
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 10);
  return `projects/${projectId}/${timestamp}-${randomId}.${ext}`;
}
