import { Hono } from "hono";
import { getSupabase } from "../lib/supabase";
import { authMiddleware } from "../lib/auth-middleware";
import type { Env } from "../types/env";

const testimonialRoutes = new Hono<{ Bindings: Env }>();

// Public: GET approved testimonials only
testimonialRoutes.get("/", async (c) => {
  try {
    const supabase = getSupabase(c.env);
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_approved", true)
      .order("created_at", { ascending: true });
    if (error) throw error;
    return c.json({ success: true, data: data ?? [], message: "Testimonial berhasil diambil" });
  } catch (error) {
    console.error("Get testimonials error:", error);
    return c.json({ success: false, data: null, message: "Terjadi kesalahan server" }, 500);
  }
});

// Admin: GET all testimonials (including pending)
testimonialRoutes.get("/admin", authMiddleware, async (c) => {
  try {
    const supabase = getSupabase(c.env);
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return c.json({ success: true, data: data ?? [], message: "Testimonial berhasil diambil" });
  } catch (error) {
    console.error("Get admin testimonials error:", error);
    return c.json({ success: false, data: null, message: "Terjadi kesalahan server" }, 500);
  }
});

// Public: POST submit testimonial (needs approval)
testimonialRoutes.post("/", async (c) => {
  try {
    const body = await c.req.json<{ name: string; role: string; content: string }>();
    if (!body.name || !body.role || !body.content) {
      return c.json({ success: false, data: null, message: "Nama, role, dan konten wajib diisi" }, 400);
    }
    const supabase = getSupabase(c.env);
    const initials = body.name.split(" ").map((w: string) => w[0]).join("").substring(0, 2).toUpperCase();
    const { data, error } = await supabase
      .from("testimonials")
      .insert({
        name: body.name,
        role: body.role,
        content: body.content,
        initials,
        is_approved: false,
      })
      .select()
      .single();
    if (error) throw error;
    return c.json({ success: true, data, message: "Testimonial berhasil dikirim. Menunggu persetujuan admin." }, 201);
  } catch (error) {
    console.error("Submit testimonial error:", error);
    return c.json({ success: false, data: null, message: "Terjadi kesalahan server" }, 500);
  }
});

// Admin: PUT approve testimonial
testimonialRoutes.put("/:id/approve", authMiddleware, async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.json({ success: false, data: null, message: "ID tidak valid" }, 400);
    const supabase = getSupabase(c.env);
    const { data, error } = await supabase
      .from("testimonials")
      .update({ is_approved: true })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return c.json({ success: true, data, message: "Testimonial disetujui" });
  } catch (error) {
    console.error("Approve testimonial error:", error);
    return c.json({ success: false, data: null, message: "Terjadi kesalahan server" }, 500);
  }
});

// Admin: PUT reject testimonial
testimonialRoutes.put("/:id/reject", authMiddleware, async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.json({ success: false, data: null, message: "ID tidak valid" }, 400);
    const supabase = getSupabase(c.env);
    const { data, error } = await supabase
      .from("testimonials")
      .update({ is_approved: false })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return c.json({ success: true, data, message: "Testimonial ditolak" });
  } catch (error) {
    console.error("Reject testimonial error:", error);
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
