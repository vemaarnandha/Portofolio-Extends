import { getServiceSupabase } from "./supabase";
import type { Env } from "../types/env";

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;
const REFRESH_TOKEN_BYTES = 32;

export function generateRefreshToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(REFRESH_TOKEN_BYTES));
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function getSessionExpiry(): string {
  return new Date(Date.now() + SESSION_DURATION_MS).toISOString();
}

export async function createSession(
  env: Env,
  userId: number,
  userAgent: string,
  ipAddress: string
): Promise<{ refreshToken: string; expiresAt: string }> {
  const supabase = getServiceSupabase(env);
  const refreshToken = generateRefreshToken();
  const expiresAt = getSessionExpiry();

  const { error } = await supabase.from("admin_sessions").insert({
    user_id: userId,
    refresh_token: refreshToken,
    user_agent: userAgent,
    ip_address: ipAddress,
    expires_at: expiresAt,
  });

  if (error) throw error;
  return { refreshToken, expiresAt };
}

export async function findSessionByRefreshToken(
  env: Env,
  refreshToken: string
): Promise<{ id: number; userId: number; expiresAt: string } | null> {
  const supabase = getServiceSupabase(env);
  const { data } = await supabase
    .from("admin_sessions")
    .select("id, user_id, expires_at")
    .eq("refresh_token", refreshToken)
    .limit(1)
    .single();

  if (!data) return null;
  return { id: data.id, userId: data.user_id, expiresAt: data.expires_at };
}

export async function rotateSession(
  env: Env,
  sessionId: number
): Promise<string> {
  const supabase = getServiceSupabase(env);
  const newRefreshToken = generateRefreshToken();
  const expiresAt = getSessionExpiry();

  const { error } = await supabase
    .from("admin_sessions")
    .update({
      refresh_token: newRefreshToken,
      expires_at: expiresAt,
      last_active_at: new Date().toISOString(),
    })
    .eq("id", sessionId);

  if (error) throw error;
  return newRefreshToken;
}

export async function deleteSession(env: Env, sessionId: number): Promise<void> {
  const supabase = getServiceSupabase(env);
  await supabase.from("admin_sessions").delete().eq("id", sessionId);
}

export async function deleteAllUserSessions(env: Env, userId: number): Promise<void> {
  const supabase = getServiceSupabase(env);
  await supabase.from("admin_sessions").delete().eq("user_id", userId);
}
