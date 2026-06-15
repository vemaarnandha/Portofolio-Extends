import { Hono } from "hono";
import { getSupabase } from "../lib/supabase";
import { verifyPassword } from "../lib/password";
import { createToken } from "../lib/jwt";
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

    const token = await createToken({ userId: user.id, email: user.email }, c.env.JWT_SECRET);

    return c.json({
      success: true,
      data: { token, user: { id: user.id, email: user.email } },
      message: "Login berhasil",
    });
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ success: false, data: null, message: "Terjadi kesalahan server" }, 500);
  }
});

export default auth;
