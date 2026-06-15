import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { createClient } from "@libsql/client/web";
import { drizzle } from "drizzle-orm/libsql";
import { portfolio } from "../db/schema";
import { verifyToken } from "../lib/jwt";
import type { Env } from "../types/env";

interface JWTPayload {
  userId: number;
  email: string;
}

const portfolioRoutes = new Hono<{ Bindings: Env }>();

// Helper: get DB instance
function getDb(env: Env) {
  const client = createClient({
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  });
  return drizzle(client);
}

// Helper: verify JWT middleware
async function authMiddleware(c: any, next: any) {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ success: false, data: null, message: "Token tidak valid" }, 401);
  }

  const token = authHeader.substring(7);
  const payload = await verifyToken<JWTPayload>(token, c.env.JWT_SECRET);

  if (!payload) {
    return c.json({ success: false, data: null, message: "Token tidak valid atau sudah expired" }, 401);
  }

  c.set("user", payload);
  await next();
}

// GET /api/portfolio - Public
portfolioRoutes.get("/", async (c) => {
  try {
    const db = getDb(c.env);
    const items = await db.select().from(portfolio).orderBy(portfolio.createdAt);
    return c.json({ success: true, data: items, message: "Data portfolio berhasil diambil" });
  } catch (error) {
    console.error("Get portfolio error:", error);
    return c.json({ success: false, data: null, message: "Terjadi kesalahan server" }, 500);
  }
});

// GET /api/portfolio/:id - Public
portfolioRoutes.get("/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) {
      return c.json({ success: false, data: null, message: "ID tidak valid" }, 400);
    }

    const db = getDb(c.env);
    const items = await db.select().from(portfolio).where(eq(portfolio.id, id)).limit(1);

    if (items.length === 0) {
      return c.json({ success: false, data: null, message: "Portfolio tidak ditemukan" }, 404);
    }

    return c.json({ success: true, data: items[0], message: "Data portfolio berhasil diambil" });
  } catch (error) {
    console.error("Get portfolio by id error:", error);
    return c.json({ success: false, data: null, message: "Terjadi kesalahan server" }, 500);
  }
});

// POST /api/portfolio - Protected
portfolioRoutes.post("/", authMiddleware, async (c) => {
  try {
    const body = await c.req.json<{
      nama_project: string;
      photo_url: string;
      jobdesk: string;
      deskripsi: string;
    }>();

    if (!body.nama_project || !body.photo_url || !body.jobdesk || !body.deskripsi) {
      return c.json({ success: false, data: null, message: "Semua field wajib diisi" }, 400);
    }

    const db = getDb(c.env);
    const result = await db.insert(portfolio).values({
      namaProject: body.nama_project,
      photoUrl: body.photo_url,
      jobdesk: body.jobdesk,
      deskripsi: body.deskripsi,
    }).returning();

    return c.json({ success: true, data: result[0], message: "Portfolio berhasil ditambahkan" }, 201);
  } catch (error) {
    console.error("Create portfolio error:", error);
    return c.json({ success: false, data: null, message: "Terjadi kesalahan server" }, 500);
  }
});

// PUT /api/portfolio/:id - Protected
portfolioRoutes.put("/:id", authMiddleware, async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) {
      return c.json({ success: false, data: null, message: "ID tidak valid" }, 400);
    }

    const body = await c.req.json<{
      nama_project: string;
      photo_url: string;
      jobdesk: string;
      deskripsi: string;
    }>();

    if (!body.nama_project || !body.photo_url || !body.jobdesk || !body.deskripsi) {
      return c.json({ success: false, data: null, message: "Semua field wajib diisi" }, 400);
    }

    const db = getDb(c.env);
    const result = await db
      .update(portfolio)
      .set({
        namaProject: body.nama_project,
        photoUrl: body.photo_url,
        jobdesk: body.jobdesk,
        deskripsi: body.deskripsi,
      })
      .where(eq(portfolio.id, id))
      .returning();

    if (result.length === 0) {
      return c.json({ success: false, data: null, message: "Portfolio tidak ditemukan" }, 404);
    }

    return c.json({ success: true, data: result[0], message: "Portfolio berhasil diperbarui" });
  } catch (error) {
    console.error("Update portfolio error:", error);
    return c.json({ success: false, data: null, message: "Terjadi kesalahan server" }, 500);
  }
});

// DELETE /api/portfolio/:id - Protected
portfolioRoutes.delete("/:id", authMiddleware, async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) {
      return c.json({ success: false, data: null, message: "ID tidak valid" }, 400);
    }

    const db = getDb(c.env);
    const result = await db.delete(portfolio).where(eq(portfolio.id, id)).returning();

    if (result.length === 0) {
      return c.json({ success: false, data: null, message: "Portfolio tidak ditemukan" }, 404);
    }

    return c.json({ success: true, data: result[0], message: "Portfolio berhasil dihapus" });
  } catch (error) {
    console.error("Delete portfolio error:", error);
    return c.json({ success: false, data: null, message: "Terjadi kesalahan server" }, 500);
  }
});

export default portfolioRoutes;
