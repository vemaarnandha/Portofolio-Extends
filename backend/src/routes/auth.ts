import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { createClient } from "@libsql/client/web";
import { drizzle } from "drizzle-orm/libsql";
import { adminUsers } from "../db/schema";
import { hashPassword, verifyPassword } from "../lib/password";
import { createToken } from "../lib/jwt";
import type { Env } from "../types/env";

const auth = new Hono<{ Bindings: Env }>();

// POST /api/auth/login
auth.post("/login", async (c) => {
  try {
    const { email, password } = await c.req.json<{ email: string; password: string }>();

    if (!email || !password) {
      return c.json({ success: false, data: null, message: "Email dan password wajib diisi" }, 400);
    }

    const client = createClient({
      url: c.env.TURSO_DATABASE_URL,
      authToken: c.env.TURSO_AUTH_TOKEN,
    });
    const db = drizzle(client);

    const users = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
    const user = users[0];

    if (!user) {
      return c.json({ success: false, data: null, message: "Email atau password salah" }, 401);
    }

    const isValid = await verifyPassword(password, user.passwordHash);
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
