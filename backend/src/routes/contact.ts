import { Hono } from "hono";
import { getSupabase, toCamelCase } from "../lib/supabase";
import { authMiddleware } from "../lib/auth-middleware";
import type { Env } from "../types/env";

const contactRoutes = new Hono<{ Bindings: Env }>();

// POST /api/contact - Public
contactRoutes.post("/", async (c) => {
  try {
    const body = await c.req.json<{
      name: string;
      email: string;
      subject?: string;
      message: string;
      honeypot?: string; // Spam protection
    }>();

    // 1. Honeypot check
    if (body.honeypot) {
      console.log("Spam detected via honeypot");
      return c.json({ success: true, message: "Pesan terkirim!" }); // Fake success for bots
    }

    if (!body.name || !body.email || !body.message) {
      return c.json({ success: false, message: "Nama, email, dan pesan wajib diisi" }, 400);
    }

    const supabase = getSupabase(c.env);

    // 2. Save to DB
    const { data, error } = await supabase
      .from("contacts")
      .insert({
        name: body.name,
        email: body.email,
        subject: body.subject || "No Subject",
        message: body.message,
        is_read: false,
      })
      .select()
      .single();

    if (error) throw error;

    // 3. Send to Discord Webhook
    if (c.env.DISCORD_WEBHOOK_URL) {
      try {
        await fetch(c.env.DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            embeds: [
              {
                title: "📧 Pesan Kontak Baru",
                color: 0x9b6dd7, // Arcane Purple
                fields: [
                  { name: "Nama", value: body.name, inline: true },
                  { name: "Email", value: body.email, inline: true },
                  { name: "Subjek", value: body.subject || "-", inline: false },
                  { name: "Pesan", value: body.message, inline: false },
                ],
                footer: { text: "Portfolio Admin Notification" },
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        });
      } catch (discordError) {
        console.error("Failed to send to Discord:", discordError);
      }
    }

    return c.json({ success: true, message: "Pesan berhasil terkirim!" });
  } catch (error) {
    console.error("Contact submission error:", error);
    return c.json({ success: false, message: "Gagal mengirim pesan" }, 500);
  }
});

// GET /api/contact - Protected (Admin only)
contactRoutes.get("/", authMiddleware, async (c) => {
  try {
    const supabase = getSupabase(c.env);
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return c.json({ success: true, data: toCamelCase(data ?? []), message: "Data kontak berhasil diambil" });
  } catch (error) {
    console.error("Get contacts error:", error);
    return c.json({ success: false, message: "Terjadi kesalahan server" }, 500);
  }
});

// PUT /api/contact/read/:id - Mark single message as read
contactRoutes.put("/read/:id", authMiddleware, async (c) => {
  try {
    const id = Number(c.req.param("id"));
    const supabase = getSupabase(c.env);
    const { error } = await supabase
      .from("contacts")
      .update({ is_read: true })
      .eq("id", id);

    if (error) throw error;
    return c.json({ success: true, message: "Pesan ditandai sebagai dibaca" });
  } catch (error) {
    console.error("Mark read error:", error);
    return c.json({ success: false, message: "Gagal update pesan" }, 500);
  }
});

// PUT /api/contact/read-all - Mark all messages as read
contactRoutes.put("/read-all", authMiddleware, async (c) => {
  try {
    const supabase = getSupabase(c.env);
    const { error } = await supabase
      .from("contacts")
      .update({ is_read: true })
      .eq("is_read", false);

    if (error) throw error;
    return c.json({ success: true, message: "Semua pesan ditandai sebagai dibaca" });
  } catch (error) {
    console.error("Mark all read error:", error);
    return c.json({ success: false, message: "Gagal update pesan" }, 500);
  }
});

// DELETE /api/contact/:id - Protected
contactRoutes.delete("/:id", authMiddleware, async (c) => {
  try {
    const id = Number(c.req.param("id"));
    const supabase = getSupabase(c.env);
    const { error } = await supabase.from("contacts").delete().eq("id", id);

    if (error) throw error;
    return c.json({ success: true, message: "Pesan berhasil dihapus" });
  } catch (error) {
    console.error("Delete contact error:", error);
    return c.json({ success: false, message: "Gagal menghapus pesan" }, 500);
  }
});

export default contactRoutes;
