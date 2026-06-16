import { Hono } from "hono";
import { getSupabase, getServiceSupabase, toCamelCase, IMAGE_ALLOWED_MIMES, IMAGE_MAX_SIZE, generateImagePath } from "../lib/supabase";
import { authMiddleware } from "../lib/auth-middleware";
import type { Env } from "../types/env";

const portfolioRoutes = new Hono<{ Bindings: Env }>();

// POST /api/portfolio/upload-image
portfolioRoutes.post("/upload-image", authMiddleware, async (c) => {
  try {
    const body = await c.req.parseBody();
    const file = body["image"] as File | null;
    const projectId = Number(body["projectId"] || 0);

    if (!file) {
      return c.json({ success: false, error: "File gambar tidak ditemukan" }, 400);
    }

    if (file.size > IMAGE_MAX_SIZE) {
      return c.json({ success: false, error: "File terlalu besar (maks 10MB)" }, 400);
    }

    if (!IMAGE_ALLOWED_MIMES.includes(file.type)) {
      return c.json({ success: false, error: "Tipe file tidak didukung. Gunakan JPG, PNG, WebP, atau GIF" }, 400);
    }

    const supabase = getServiceSupabase(c.env);
    const filePath = generateImagePath(projectId, file.type);

    const arrayBuffer = await file.arrayBuffer();
    const { data, error } = await supabase.storage
      .from("project-images")
      .upload(filePath, arrayBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Storage upload error:", error);
      return c.json({ success: false, error: "Gagal mengupload gambar" }, 500);
    }

    const { data: urlData } = supabase.storage
      .from("project-images")
      .getPublicUrl(filePath);

    return c.json({
      success: true,
      url: urlData.publicUrl,
      path: filePath,
    });
  } catch (error) {
    console.error("Upload image error:", error);
    return c.json({ success: false, error: "Terjadi kesalahan server" }, 500);
  }
});

// DELETE /api/portfolio/:id/image
portfolioRoutes.delete("/:id/image", authMiddleware, async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) {
      return c.json({ success: false, error: "ID tidak valid" }, 400);
    }

    const supabase = getSupabase(c.env);
    const { data: project, error: fetchError } = await supabase
      .from("portfolio")
      .select("photo_url")
      .eq("id", id)
      .limit(1);

    if (fetchError || !project || project.length === 0) {
      return c.json({ success: false, error: "Portfolio tidak ditemukan" }, 404);
    }

    const photoUrl = project[0].photo_url;
    if (!photoUrl) {
      return c.json({ success: true, message: "Tidak ada gambar untuk dihapus" });
    }

    const serviceSupabase = getServiceSupabase(c.env);
    const urlParts = photoUrl.split("/");
    const storageIndex = urlParts.indexOf("project-images");
    if (storageIndex !== -1) {
      const storagePath = urlParts.slice(storageIndex + 1).join("/");
      await serviceSupabase.storage
        .from("project-images")
        .remove([storagePath]);
    }

    const { error: updateError } = await supabase
      .from("portfolio")
      .update({ photo_url: null })
      .eq("id", id);

    if (updateError) throw updateError;

    return c.json({ success: true, url: null, path: null });
  } catch (error) {
    console.error("Delete image error:", error);
    return c.json({ success: false, error: "Terjadi kesalahan server" }, 500);
  }
});

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
