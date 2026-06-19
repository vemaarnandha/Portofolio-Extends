import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPortfolios, deletePortfolio, getContactMessages } from "@/lib/api";
import { logout, isAuthenticated } from "@/lib/auth";
import type { Portfolio } from "@/types";
import { Loader2, Plus, Pencil, Trash2, AlertCircle, FolderOpen, LogOut, ExternalLink, Mail, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(true);
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

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
      try { setLoading(true); setError(""); const response = await getPortfolios(); if (mounted) { if (response.success) setProjects(response.data); else setError(response.message || "Gagal memuat data"); } }
      catch (err) { if (mounted) setError(err instanceof Error ? err.message : "Terjadi kesalahan"); }
      finally { if (mounted) setLoading(false); }
    }
    fetchData();
    return () => { mounted = false; };
  }, [authLoading, navigate]);

  useEffect(() => {
    if (authLoading) return;
    let mounted = true;
    async function fetchUnread() {
      try {
        const response = await getContactMessages();
        if (mounted && response.success) {
          setUnreadCount(response.data.filter((m) => !m.isRead).length);
        }
      } catch { /* ignore */ }
    }
    fetchUnread();
    return () => { mounted = false; };
  }, [authLoading]);

  async function handleDelete(id: number) {
    if (!confirm("Apakah Anda yakin ingin menghapus portfolio ini?")) return;
    setDeleteId(id); setDeleting(true);
    try { const response = await deletePortfolio(id); if (response.success) setProjects((prev) => prev.filter((p) => p.id !== id)); else setError(response.message || "Gagal menghapus"); }
    catch (err) { setError(err instanceof Error ? err.message : "Terjadi kesalahan"); }
    finally { setDeleting(false); setDeleteId(null); }
  }

  if (authLoading || loading) return (
    <div className="page-main flex min-h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-arcane-500" />
    </div>
  );

  return (
    <div className="page-main min-h-screen py-8 animate-fade-from-abyss">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-2xl font-bold tracking-[0.05em] text-arcane-500">Dashboard Admin</h1>
            <p className="text-sm text-arcane-300/60 font-body">Kelola portfolio project Anda</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/admin/messages"
              className="relative inline-flex items-center gap-2 rounded-lg border border-arcane-900/50 px-4 py-2 text-sm font-body tracking-wider text-arcane-300 hover:bg-arcane-900/50 hover:border-arcane-700 transition-all duration-200"
            >
              <Mail className="h-4 w-4" /> Pesan
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-blood-500 text-[10px] font-bold text-white flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>
            <Link to="/admin/testimonials"
              className="inline-flex items-center gap-2 rounded-lg border border-arcane-900/50 px-4 py-2 text-sm font-body tracking-wider text-arcane-300 hover:bg-arcane-900/50 hover:border-arcane-700 transition-all duration-200"
            >
              <Quote className="h-4 w-4" /> Testimonial
            </Link>
            <Link to="/projects" target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border border-arcane-900/50 px-4 py-2 text-sm font-heading tracking-wider text-arcane-300 hover:bg-arcane-900/50 hover:border-arcane-700 transition-all duration-200"
            >
              <ExternalLink className="h-4 w-4" /> Lihat Web
            </Link>
            <Link to="/admin/portfolio/new"
              className="inline-flex items-center gap-2 rounded-lg bg-arcane-500 px-4 py-2 text-sm font-heading tracking-wider font-semibold text-void-950 hover:bg-arcane-400 hover:shadow-glow active:scale-[0.97] transition-all duration-200"
            >
              <Plus className="h-4 w-4" /> Tambah Portfolio
            </Link>
            <button onClick={logout}
              className="inline-flex items-center gap-2 rounded-lg border border-blood-500/30 px-4 py-2 text-sm font-body tracking-wider text-blood-500 hover:bg-blood-500/10 transition-all duration-200"
            >
              <LogOut className="h-4 w-4" /> Keluar
            </button>
            <ThemeToggle />
          </div>
        </div>
        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-blood-500/20 bg-blood-500/10 p-4 text-sm text-blood-500">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />{error}
            <button onClick={() => setError("")} className="ml-auto underline hover:no-underline text-arcane-400">Tutup</button>
          </div>
        )}
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-arcane-900/50 bg-void-900 py-16 text-center">
            <FolderOpen className="h-12 w-12 text-arcane-700/50 mb-4" />
            <h3 className="font-heading text-lg font-semibold tracking-[0.02em] text-arcane-300 mb-2">Belum Ada Portfolio</h3>
            <p className="text-sm text-arcane-300/60 font-body mb-4">Mulai dengan menambahkan portfolio pertama Anda.</p>
            <Link to="/admin/portfolio/new"
              className="inline-flex items-center gap-2 rounded-lg bg-arcane-500 px-4 py-2 text-sm font-heading tracking-wider font-semibold text-void-950 hover:bg-arcane-400 hover:shadow-glow transition-all duration-200"
            >
              <Plus className="h-4 w-4" /> Tambah Portfolio
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border border-arcane-900/50 bg-void-900 overflow-hidden shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-arcane-900/50 bg-arcane-950/30">
                    <th className="px-4 py-3 text-left font-heading tracking-wider text-arcane-400 font-medium">No</th>
                    <th className="px-4 py-3 text-left font-heading tracking-wider text-arcane-400 font-medium">Gambar</th>
                    <th className="px-4 py-3 text-left font-heading tracking-wider text-arcane-400 font-medium">Nama Project</th>
                    <th className="px-4 py-3 text-left font-heading tracking-wider text-arcane-400 font-medium">Jobdesk</th>
                    <th className="px-4 py-3 text-left font-heading tracking-wider text-arcane-400 font-medium">Deskripsi</th>
                    <th className="px-4 py-3 text-right font-heading tracking-wider text-arcane-400 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-arcane-900/30">
                  {projects.map((item, index) => (
                    <tr key={item.id} className="hover:bg-arcane-950/20 transition-colors">
                      <td className="px-4 py-3 text-arcane-700 font-mono">{index + 1}</td>
                      <td className="px-4 py-3">
                        <img src={item.photoUrl} alt={item.namaProject}
                          className="h-12 w-16 rounded object-cover border border-arcane-900/50"
                          onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/64?text=N/A"; }}
                        />
                      </td>
                      <td className="px-4 py-3 font-heading tracking-wide text-arcane-300 font-medium">{item.namaProject}</td>
                      <td className="px-4 py-3 text-arcane-500/80 font-heading text-xs tracking-wider">{item.jobdesk}</td>
                      <td className="px-4 py-3 text-arcane-300/60 font-body max-w-xs truncate">{item.deskripsi}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex items-center gap-2">
                          <Link to={`/admin/portfolio/${item.id}/edit`}
                            className="inline-flex items-center gap-1 rounded-md border border-arcane-900/50 px-2.5 py-1.5 text-xs font-heading tracking-wider text-arcane-400 hover:bg-arcane-900/50 hover:border-arcane-700 transition-all duration-200"
                          >
                            <Pencil className="h-3.5 w-3.5" /> Edit
                          </Link>
                          <button onClick={() => handleDelete(item.id)} disabled={deleting && deleteId === item.id}
                            className="inline-flex items-center gap-1 rounded-md border border-blood-500/30 px-2.5 py-1.5 text-xs font-heading tracking-wider text-blood-500 hover:bg-blood-500/10 transition-all duration-200 disabled:opacity-50"
                          >
                            {deleting && deleteId === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
