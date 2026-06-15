import { Hono } from "hono";
import { getSupabase, toCamelCase } from "../lib/supabase";
import { verifyToken } from "../lib/jwt";
import type { Env } from "../types/env";

interface JWTPayload {
  userId: number;
  email: string;
}

const portfolioRoutes = new Hono<{ Bindings: Env }>();

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

portfolioRoutes.get("/", async (c) => {
  try {
    const supabase = getSupabase(c.env);
    const { data, error } = await supabase
      .from("portfolio")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw error;
    return c.json({ success: true, data: toCamelCase(data ?? []), message: "Data portfolio berhasil diambil" });
  } catch (error) {
    console.error("Get portfolio error:", error);
    return c.json({ success: false, data: null, message: "Terjadi kesalahan server" }, 500);
  }
});

portfolioRoutes.get("/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) {
      return c.json({ success: false, data: null, message: "ID tidak valid" }, 400);
    }

    const supabase = getSupabase(c.env);
    const { data, error } = await supabase
      .from("portfolio")
      .select("*")
      .eq("id", id)
      .limit(1);

    if (error) throw error;

    if (!data || data.length === 0) {
      return c.json({ success: false, data: null, message: "Portfolio tidak ditemukan" }, 404);
    }

    return c.json({ success: true, data: toCamelCase(data)[0], message: "Data portfolio berhasil diambil" });
  } catch (error) {
    console.error("Get portfolio by id error:", error);
    return c.json({ success: false, data: null, message: "Terjadi kesalahan server" }, 500);
  }
});

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

    const supabase = getSupabase(c.env);
    const { data, error } = await supabase
      .from("portfolio")
      .insert({
        nama_project: body.nama_project,
        photo_url: body.photo_url,
        jobdesk: body.jobdesk,
        deskripsi: body.deskripsi,
      })
      .select()
      .single();

    if (error) throw error;

    return c.json({ success: true, data: toCamelCase([data])[0], message: "Portfolio berhasil ditambahkan" }, 201);
  } catch (error) {
    console.error("Create portfolio error:", error);
    return c.json({ success: false, data: null, message: "Terjadi kesalahan server" }, 500);
  }
});

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

    const supabase = getSupabase(c.env);
    const { data, error } = await supabase
      .from("portfolio")
      .update({
        nama_project: body.nama_project,
        photo_url: body.photo_url,
        jobdesk: body.jobdesk,
        deskripsi: body.deskripsi,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return c.json({ success: false, data: null, message: "Portfolio tidak ditemukan" }, 404);
      }
      throw error;
    }

    return c.json({ success: true, data: toCamelCase([data])[0], message: "Portfolio berhasil diperbarui" });
  } catch (error) {
    console.error("Update portfolio error:", error);
    return c.json({ success: false, data: null, message: "Terjadi kesalahan server" }, 500);
  }
});

portfolioRoutes.delete("/:id", authMiddleware, async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) {
      return c.json({ success: false, data: null, message: "ID tidak valid" }, 400);
    }

    const supabase = getSupabase(c.env);
    const { data, error } = await supabase
      .from("portfolio")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return c.json({ success: false, data: null, message: "Portfolio tidak ditemukan" }, 404);
      }
      throw error;
    }

    return c.json({ success: true, data: toCamelCase([data])[0], message: "Portfolio berhasil dihapus" });
  } catch (error) {
    console.error("Delete portfolio error:", error);
    return c.json({ success: false, data: null, message: "Terjadi kesalahan server" }, 500);
  }
});

export default portfolioRoutes;
