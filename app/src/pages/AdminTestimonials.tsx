import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from "@/lib/api";
import { logout, isAuthenticated } from "@/lib/auth";
import type { Testimonial } from "@/types";
import { Loader2, Plus, Pencil, Trash2, AlertCircle, ArrowLeft, LogOut, X, Quote } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminTestimonials() {
  const navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", role: "", content: "", initials: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function checkAuth() {
      const authed = await isAuthenticated();
      if (mounted) {
        if (!authed) navigate("/admin/login");
        else setAuthLoading(false);
      }
    }
    checkAuth();
    return () => { mounted = false; };
  }, [navigate]);

  useEffect(() => {
    if (authLoading) return;
    let mounted = true;
    async function fetchData() {
      try {
        setLoading(true); setError("");
        const response = await getTestimonials();
        if (mounted) {
          if (response.success) setTestimonials(response.data);
          else setError(response.message || "Gagal memuat data");
        }
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally { if (mounted) setLoading(false); }
    }
    fetchData();
    return () => { mounted = false; };
  }, [authLoading]);

  function openCreate() {
    setEditingId(null);
    setForm({ name: "", role: "", content: "", initials: "" });
    setShowForm(true);
  }

  function openEdit(t: Testimonial) {
    setEditingId(t.id);
    setForm({ name: t.name, role: t.role, content: t.content, initials: t.initials });
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.role || !form.content) {
      setError("Nama, role, dan konten wajib diisi"); return;
    }
    setSaving(true);
    try {
      if (editingId) {
        const response = await updateTestimonial(editingId, form);
        if (response.success) {
          setTestimonials((prev) => prev.map((t) => t.id === editingId ? { ...t, ...form, initials: form.initials || form.name.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase() } : t));
        } else { setError(response.message || "Gagal memperbarui"); }
      } else {
        const response = await createTestimonial(form);
        if (response.success) {
          setTestimonials((prev) => [...prev, response.data]);
        } else { setError(response.message || "Gagal menambahkan"); }
      }
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally { setSaving(false); }
  }

  async function handleDelete(id: number) {
    if (!confirm("Hapus testimonial ini?")) return;
    try {
      const response = await deleteTestimonial(id);
      if (response.success) setTestimonials((prev) => prev.filter((t) => t.id !== id));
      else setError(response.message || "Gagal menghapus");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    }
  }

  if (authLoading || loading) return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-arcane-500" />
    </div>
  );

  return (
    <div className="min-h-screen py-8 animate-fade-from-abyss">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard" className="p-2 rounded-full hover:bg-arcane-900/50 text-arcane-400 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="font-heading text-2xl font-bold tracking-[0.05em] text-arcane-500">Testimonial</h1>
              <p className="text-sm text-arcane-300/60 font-body">Kelola testimonial klien</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={openCreate}
              className="inline-flex items-center gap-2 rounded-lg bg-arcane-500 px-4 py-2 text-sm font-body tracking-wider font-semibold text-void-950 hover:bg-arcane-400 hover:shadow-glow active:scale-[0.97] transition-all duration-200"
            >
              <Plus className="h-4 w-4" /> Tambah Testimonial
            </button>
            <button onClick={logout}
              className="inline-flex items-center gap-2 rounded-lg border border-blood-500/30 px-4 py-2 text-sm font-body tracking-wider text-blood-500 hover:bg-blood-500/10 transition-all duration-200"
            >
              <LogOut className="h-4 w-4" /> Keluar
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-blood-500/20 bg-blood-500/10 p-4 text-sm text-blood-500">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />{error}
            <button onClick={() => setError("")} className="ml-auto underline hover:no-underline text-arcane-400">Tutup</button>
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="glass-card p-8 rounded-3xl border-arcane-800/50 shadow-2xl w-full max-w-lg animate-fade-from-abyss">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-bold text-arcane-100">{editingId ? "Edit Testimonial" : "Tambah Testimonial"}</h2>
                <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-arcane-900/50 text-arcane-400 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-body tracking-wider text-arcane-500 uppercase">Nama</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-arcane-900 bg-void-950/50 px-4 py-3 text-sm text-arcane-100 focus:outline-none focus:border-arcane-500 transition-all" placeholder="Nama klien" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-body tracking-wider text-arcane-500 uppercase">Role</label>
                  <input type="text" required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full rounded-xl border border-arcane-900 bg-void-950/50 px-4 py-3 text-sm text-arcane-100 focus:outline-none focus:border-arcane-500 transition-all" placeholder="Posisi / Perusahaan" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-body tracking-wider text-arcane-500 uppercase">Inisial (opsional)</label>
                  <input type="text" value={form.initials} onChange={(e) => setForm({ ...form, initials: e.target.value })}
                    className="w-full rounded-xl border border-arcane-900 bg-void-950/50 px-4 py-3 text-sm text-arcane-100 focus:outline-none focus:border-arcane-500 transition-all" placeholder="Auto-generate jika kosong" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-body tracking-wider text-arcane-500 uppercase">Konten</label>
                  <textarea rows={4} required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="w-full rounded-xl border border-arcane-900 bg-void-950/50 px-4 py-3 text-sm text-arcane-100 focus:outline-none focus:border-arcane-500 transition-all resize-none" placeholder="Isi testimonial..." />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)}
                    className="flex-1 rounded-xl border border-arcane-800 px-4 py-3 text-sm font-body text-arcane-300 hover:bg-arcane-900/30 transition-all">
                    Batal
                  </button>
                  <button type="submit" disabled={saving}
                    className="flex-1 rounded-xl bg-arcane-500 px-4 py-3 text-sm font-body font-bold text-void-950 hover:bg-arcane-400 transition-all disabled:opacity-50">
                    {saving ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : editingId ? "Simpan" : "Tambah"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Testimonial List */}
        {testimonials.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-arcane-900/50 bg-void-900 py-16 text-center">
            <Quote className="h-12 w-12 text-arcane-700/50 mb-4" />
            <h3 className="font-heading text-lg font-semibold text-arcane-300 mb-2">Belum Ada Testimonial</h3>
            <p className="text-sm text-arcane-300/60 font-body mb-4">Tambahkan testimonial dari klien Anda.</p>
            <button onClick={openCreate}
              className="inline-flex items-center gap-2 rounded-lg bg-arcane-500 px-4 py-2 text-sm font-body tracking-wider font-semibold text-void-950 hover:bg-arcane-400 transition-all"
            >
              <Plus className="h-4 w-4" /> Tambah Testimonial
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {testimonials.map((t) => (
              <div key={t.id} className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-arcane-500 flex items-center justify-center text-void-950 font-heading text-sm font-bold flex-shrink-0">
                  {t.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-body font-bold text-arcane-100">{t.name}</h3>
                    <span className="text-xs text-arcane-500">· {t.role}</span>
                  </div>
                  <p className="text-sm text-arcane-300/70 font-body line-clamp-2">{t.content}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(t)}
                    className="inline-flex items-center gap-1 rounded-md border border-arcane-900/50 px-3 py-1.5 text-xs font-body tracking-wider text-arcane-400 hover:bg-arcane-900/50 hover:border-arcane-700 transition-all">
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button onClick={() => handleDelete(t.id)}
                    className="inline-flex items-center gap-1 rounded-md border border-blood-500/30 px-3 py-1.5 text-xs font-body tracking-wider text-blood-500 hover:bg-blood-500/10 transition-all">
                    <Trash2 className="h-3.5 w-3.5" /> Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
