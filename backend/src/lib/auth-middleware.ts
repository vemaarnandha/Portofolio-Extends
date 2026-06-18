import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { verifyToken, createToken } from "./jwt";
import { findSessionByRefreshToken, rotateSession, deleteSession } from "./session";
import { getSupabase } from "./supabase";
import type { Env } from "../types/env";

export interface AuthUser {
  userId: number;
  email: string;
  sessionId?: number;
}

const JWT_EXPIRY = "15m";

async function setAuthCookies(c: any, userId: number, email: string) {
  const token = await createToken({ userId, email }, c.env.JWT_SECRET, JWT_EXPIRY);
  setCookie(c, "token", token, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    path: "/",
    maxAge: 15 * 60,
  });
}

export async function authMiddleware(c: any, next: any) {
  try {
    const token = getCookie(c, "token") || c.req.header("Authorization")?.replace("Bearer ", "");
    if (token) {
      const payload = await verifyToken<AuthUser>(token, c.env.JWT_SECRET);
      if (payload) {
        const expiresIn = (payload as any).exp - Math.floor(Date.now() / 1000);
        if (expiresIn < 120) {
          setAuthCookies(c, payload.userId, payload.email);
        }
        c.set("user", payload);
        return next();
      }
    }

    const refreshToken = getCookie(c, "refresh_token");
    if (!refreshToken) {
      return c.json({ success: false, data: null, message: "Sesi tidak valid, silakan login ulang" }, 401);
    }

    const session = await findSessionByRefreshToken(c.env, refreshToken);
    if (!session) {
      deleteCookie(c, "token", { path: "/" });
      deleteCookie(c, "refresh_token", { path: "/" });
      return c.json({ success: false, data: null, message: "Sesi tidak valid, silakan login ulang" }, 401);
    }

    if (new Date(session.expiresAt) < new Date()) {
      await deleteSession(c.env, session.id);
      deleteCookie(c, "token", { path: "/" });
      deleteCookie(c, "refresh_token", { path: "/" });
      return c.json({ success: false, data: null, message: "Sesi telah kedaluwarsa, silakan login ulang" }, 401);
    }

    const supabase = getSupabase(c.env);
    const { data: user } = await supabase
      .from("admin_users")
      .select("id, email")
      .eq("id", session.userId)
      .limit(1)
      .single() as any;

    if (!user) {
      return c.json({ success: false, data: null, message: "User tidak ditemukan" }, 401);
    }

    const newRefreshToken = await rotateSession(c.env, session.id);

    const newToken = await createToken({ userId: user.id, email: user.email }, c.env.JWT_SECRET, JWT_EXPIRY);
    setCookie(c, "token", newToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      path: "/",
      maxAge: 15 * 60,
    });
    setCookie(c, "refresh_token", newRefreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    c.set("user", { userId: user.id, email: user.email, sessionId: session.id });
    await next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return c.json({ success: false, data: null, message: "Terjadi kesalahan autentikasi" }, 500);
  }
}
