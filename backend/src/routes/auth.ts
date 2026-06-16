import { Hono } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { getSupabase } from "../lib/supabase";
import { verifyPassword } from "../lib/password";
import { createToken, verifyToken } from "../lib/jwt";
import { createSession, findSessionByRefreshToken, rotateSession, deleteSession, deleteAllUserSessions } from "../lib/session";
import { authMiddleware } from "../lib/auth-middleware";
import type { Env } from "../types/env";
import type { AdminUser } from "../db/schema";

const auth = new Hono<{ Bindings: Env }>();

auth.post("/login", async (c) => {
  try {
    const { email, password } = await c.req.json<{ email: string; password: string }>();

    if (!email || !password) {
      return c.json({ success: false, data: null, message: "Email dan password wajib diisi" }, 400);
    }

    const supabase = getSupabase(c.env);
    const { data: users, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email)
      .limit(1);

    if (error) throw error;
    const user = users?.[0] as AdminUser | undefined;

    if (!user) {
      return c.json({ success: false, data: null, message: "Email atau password salah" }, 401);
    }

    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return c.json({ success: false, data: null, message: "Email atau password salah" }, 401);
    }

    const userAgent = c.req.header("User-Agent") || "";
    const ipAddress = c.req.header("CF-Connecting-IP") || c.req.header("X-Forwarded-For") || "";

    const { refreshToken, expiresAt } = await createSession(c.env, user.id, userAgent, ipAddress);

    const token = await createToken({ userId: user.id, email: user.email }, c.env.JWT_SECRET, "15m");

    setCookie(c, "token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      path: "/",
      maxAge: 15 * 60,
    });
    setCookie(c, "refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return c.json({
      success: true,
      data: { user: { id: user.id, email: user.email } },
      message: "Login berhasil",
    });
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ success: false, data: null, message: "Terjadi kesalahan server" }, 500);
  }
});

auth.post("/refresh", async (c) => {
  try {
    const refreshToken = getCookie(c, "refresh_token");
    if (!refreshToken) {
      return c.json({ success: false, data: null, message: "Refresh token tidak ditemukan" }, 401);
    }

    const session = await findSessionByRefreshToken(c.env, refreshToken);
    if (!session) {
      deleteCookie(c, "token", { path: "/" });
      deleteCookie(c, "refresh_token", { path: "/" });
      return c.json({ success: false, data: null, message: "Refresh token tidak valid" }, 401);
    }

    if (new Date(session.expiresAt) < new Date()) {
      await deleteSession(c.env, session.id);
      deleteCookie(c, "token", { path: "/" });
      deleteCookie(c, "refresh_token", { path: "/" });
      return c.json({ success: false, data: null, message: "Sesi telah kedaluwarsa" }, 401);
    }

    const supabase = getSupabase(c.env);
    const { data: user } = await supabase
      .from("admin_users")
      .select("id, email")
      .eq("id", session.userId)
      .limit(1)
      .single();

    if (!user) {
      return c.json({ success: false, data: null, message: "User tidak ditemukan" }, 401);
    }

    const newRefreshToken = await rotateSession(c.env, session.id);
    const token = await createToken({ userId: user.id, email: user.email }, c.env.JWT_SECRET, "15m");

    setCookie(c, "token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      path: "/",
      maxAge: 15 * 60,
    });
    setCookie(c, "refresh_token", newRefreshToken, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return c.json({
      success: true,
      data: { user: { id: user.id, email: user.email } },
      message: "Token berhasil diperbarui",
    });
  } catch (error) {
    console.error("Refresh error:", error);
    return c.json({ success: false, data: null, message: "Terjadi kesalahan server" }, 500);
  }
});

auth.post("/logout", async (c) => {
  try {
    const token = getCookie(c, "token");
    if (token) {
      const payload = await verifyToken<{ userId: number }>(token, c.env.JWT_SECRET);
      if (payload) {
        await deleteAllUserSessions(c.env, payload.userId);
      }
    }

    const refreshToken = getCookie(c, "refresh_token");
    if (refreshToken) {
      const session = await findSessionByRefreshToken(c.env, refreshToken);
      if (session) {
        await deleteSession(c.env, session.id);
      }
    }

    deleteCookie(c, "token", { path: "/" });
    deleteCookie(c, "refresh_token", { path: "/" });

    return c.json({ success: true, data: null, message: "Logout berhasil" });
  } catch (error) {
    console.error("Logout error:", error);
    return c.json({ success: false, data: null, message: "Terjadi kesalahan server" }, 500);
  }
});

auth.get("/me", authMiddleware, async (c: any) => {
  try {
    const user = c.get("user") as { userId: number; email: string } | undefined;
    if (!user) {
      return c.json({ success: false, data: null, message: "User tidak ditemukan" }, 401);
    }
    return c.json({
      success: true,
      data: { id: user.userId, email: user.email },
      message: "Session valid",
    });
  } catch (error) {
    console.error("Me error:", error);
    return c.json({ success: false, data: null, message: "Terjadi kesalahan server" }, 500);
  }
});

export default auth;
