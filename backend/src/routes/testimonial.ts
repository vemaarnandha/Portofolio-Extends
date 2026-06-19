import { Hono } from "hono";
import { getSupabase } from "../lib/supabase";
import { authMiddleware } from "../lib/auth-middleware";
import type { Env } from "../types/env";

const testimonialRoutes = new Hono<{ Bindings: Env }>();

// Public: GET all testimonials
testimonialRoutes.get("/", async (c) => {
  try {
    const supabase = getSupabase(c.env);
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) throw error;
    return c.json({ success: true, data: data ?? [], message: "Testimonial berhasil diambil" });
  } catch (error) {
    console.error("Get testimonials error:", error);
    return c.json({ success: false, data: null, message: "Terjadi kesalahan server" }, 500);
  }
});

// Admin: POST create testimonial
testimonialRoutes.post("/", authMiddleware, async (c) => {
  try {
    const body = await c.req.json<{ name: string; role: string; content: string; initials?: string }>();
    if (!body.name || !body.role || !body.content) {
      return c.json({ success: false, data: null, message: "Nama, role, dan konten wajib diisi" }, 400);
    }
    const supabase = getSupabase(c.env);
    const initials = body.initials || body.name.split(" ").map((w: string) => w[0]).join("").substring(0, 2).toUpperCase();
    const { data, error } = await supabase
      .from("testimonials")
      .insert({ name: body.name, role: body.role, content: body.content, initials })
      .select()
      .single();
    if (error) throw error;
    return c.json({ success: true, data, message: "Testimonial berhasil ditambahkan" }, 201);
  } catch (error) {
    console.error("Create testimonial error:", error);
    return c.json({ success: false, data: null, message: "Terjadi kesalahan server" }, 500);
  }
});

// Admin: PUT update testimonial
testimonialRoutes.put("/:id", authMiddleware, async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.json({ success: false, data: null, message: "ID tidak valid" }, 400);
    const body = await c.req.json<{ name: string; role: string; content: string; initials?: string }>();
    if (!body.name || !body.role || !body.content) {
      return c.json({ success: false, data: null, message: "Nama, role, dan konten wajib diisi" }, 400);
    }
    const supabase = getSupabase(c.env);
    const initials = body.initials || body.name.split(" ").map((w: string) => w[0]).join("").substring(0, 2).toUpperCase();
    const { data, error } = await supabase
      .from("testimonials")
      .update({ name: body.name, role: body.role, content: body.content, initials })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return c.json({ success: true, data, message: "Testimonial berhasil diperbarui" });
  } catch (error) {
    console.error("Update testimonial error:", error);
    return c.json({ success: false, data: null, message: "Terjadi kesalahan server" }, 500);
  }
});

// Admin: DELETE testimonial
testimonialRoutes.delete("/:id", authMiddleware, async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.json({ success: false, data: null, message: "ID tidak valid" }, 400);
    const supabase = getSupabase(c.env);
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) throw error;
    return c.json({ success: true, data: null, message: "Testimonial berhasil dihapus" });
  } catch (error) {
    console.error("Delete testimonial error:", error);
    return c.json({ success: false, data: null, message: "Terjadi kesalahan server" }, 500);
  }
});

export default testimonialRoutes;
