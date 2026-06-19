import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminTestimonials, deleteTestimonial, approveTestimonial, rejectTestimonial } from "@/lib/api";
import { logout, isAuthenticated } from "@/lib/auth";
import type { Testimonial } from "@/types";
import { Loader2, Trash2, AlertCircle, ArrowLeft, LogOut, Quote, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function AdminTestimonials() {
  const navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState<number | null>(null);

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
        const response = await getAdminTestimonials();
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

  async function handleApprove(id: number) {
    setProcessing(id);
    try {
      const response = await approveTestimonial(id);
      if (response.success) {
        setTestimonials((prev) => prev.map((t) => t.id === id ? { ...t, isApproved: true } : t));
        toast.success("Testimonial disetujui");
      } else { setError(response.message || "Gagal menyetujui"); }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally { setProcessing(null); }
  }

  async function handleReject(id: number) {
    setProcessing(id);
    try {
      const response = await rejectTestimonial(id);
      if (response.success) {
        setTestimonials((prev) => prev.map((t) => t.id === id ? { ...t, isApproved: false } : t));
        toast.success("Testimonial ditolak");
      } else { setError(response.message || "Gagal menolak"); }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally { setProcessing(null); }
  }

  async function handleDelete(id: number) {
    if (!confirm("Hapus testimonial ini?")) return;
    setProcessing(id);
    try {
      const response = await deleteTestimonial(id);
      if (response.success) setTestimonials((prev) => prev.filter((t) => t.id !== id));
      else setError(response.message || "Gagal menghapus");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally { setProcessing(null); }
  }

  if (authLoading || loading) return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-arcane-500" />
    </div>
  );

  const pending = testimonials.filter((t) => !t.isApproved);
  const approved = testimonials.filter((t) => t.isApproved);

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
              <p className="text-sm text-arcane-300/60 font-body">{pending.length} menunggu persetujuan</p>
            </div>
          </div>
          <button onClick={logout}
            className="inline-flex items-center gap-2 rounded-lg border border-blood-500/30 px-4 py-2 text-sm font-body tracking-wider text-blood-500 hover:bg-blood-500/10 transition-all duration-200">
            <LogOut className="h-4 w-4" /> Keluar
          </button>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-blood-500/20 bg-blood-500/10 p-4 text-sm text-blood-500">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />{error}
            <button onClick={() => setError("")} className="ml-auto underline hover:no-underline text-arcane-400">Tutup</button>
          </div>
        )}

        {/* Pending Section */}
        {pending.length > 0 && (
          <div className="mb-8">
            <h2 className="font-body text-sm font-semibold tracking-wider text-arcane-400 uppercase mb-4">Menunggu Persetujuan</h2>
            <div className="grid gap-4">
              {pending.map((t) => (
                <div key={t.id} className="glass-card p-6 rounded-2xl border-amber-500/30 bg-amber-500/5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-arcane-500 flex items-center justify-center text-void-950 font-heading text-sm font-bold flex-shrink-0">
                      {t.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-body font-bold text-arcane-100">{t.name}</h3>
                        <span className="text-xs text-arcane-500">· {t.role}</span>
                      </div>
                      <p className="text-sm text-arcane-300/70 font-body">{t.content}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => handleApprove(t.id)} disabled={processing === t.id}
                        className="inline-flex items-center gap-1 rounded-md bg-eldritch-500/20 border border-eldritch-500/30 px-3 py-1.5 text-xs font-body tracking-wider text-eldritch-500 hover:bg-eldritch-500/30 transition-all">
                        <Check className="h-3.5 w-3.5" /> Setujui
                      </button>
                      <button onClick={() => handleReject(t.id)} disabled={processing === t.id}
                        className="inline-flex items-center gap-1 rounded-md border border-arcane-700 px-3 py-1.5 text-xs font-body tracking-wider text-arcane-400 hover:bg-arcane-700 hover:text-void-950 transition-all">
                        <X className="h-3.5 w-3.5" /> Tolak
                      </button>
                      <button onClick={() => handleDelete(t.id)} disabled={processing === t.id}
                        className="inline-flex items-center gap-1 rounded-md border border-blood-500/30 px-3 py-1.5 text-xs font-body tracking-wider text-blood-500 hover:bg-blood-500/10 transition-all">
                        {processing === t.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Approved Section */}
        <div>
          <h2 className="font-body text-sm font-semibold tracking-wider text-arcane-400 uppercase mb-4">Disetujui ({approved.length})</h2>
          {approved.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-arcane-900/50 bg-void-900 py-16 text-center">
              <Quote className="h-12 w-12 text-arcane-700/50 mb-4" />
              <h3 className="font-heading text-lg font-semibold text-arcane-300 mb-2">Belum Ada Testimonial Disetujui</h3>
            </div>
          ) : (
            <div className="grid gap-4">
              {approved.map((t) => (
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
                    <button onClick={() => handleReject(t.id)} disabled={processing === t.id}
                      className="inline-flex items-center gap-1 rounded-md border border-arcane-700 px-3 py-1.5 text-xs font-body tracking-wider text-arcane-400 hover:bg-arcane-700 hover:text-void-950 transition-all">
                      <X className="h-3.5 w-3.5" /> Batalkan
                    </button>
                    <button onClick={() => handleDelete(t.id)} disabled={processing === t.id}
                      className="inline-flex items-center gap-1 rounded-md border border-blood-500/30 px-3 py-1.5 text-xs font-body tracking-wider text-blood-500 hover:bg-blood-500/10 transition-all">
                      {processing === t.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
