import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPortfolios, deletePortfolio } from "@/lib/api";
import { logout, isAuthenticated } from "@/lib/auth";
import type { Portfolio } from "@/types";
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  AlertCircle,
  FolderOpen,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Check auth
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Fetch data
  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        setLoading(true);
        setError("");
        const response = await getPortfolios();
        if (mounted) {
          if (response.success) {
            setProjects(response.data);
          } else {
            setError(response.message || "Gagal memuat data");
          }
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Terjadi kesalahan");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchData();
    return () => { mounted = false; };
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Apakah Anda yakin ingin menghapus portfolio ini?")) return;
    setDeleteId(id);
    setDeleting(true);
    try {
      const response = await deletePortfolio(id);
      if (response.success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } else {
        setError(response.message || "Gagal menghapus");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Dashboard Admin</h1>
            <p className="text-sm text-muted-foreground">
              Kelola portfolio project Anda
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/projects"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Lihat Web
            </Link>
            <Link
              to="/admin/portfolio/new"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Tambah Portfolio
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-lg border border-destructive/20 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Keluar
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
            <button onClick={() => setError("")} className="ml-auto underline hover:no-underline">
              Tutup
            </button>
          </div>
        )}

        {/* Table */}
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border bg-card py-16 text-center">
            <FolderOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Belum Ada Portfolio</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Mulai dengan menambahkan portfolio pertama Anda.
            </p>
            <Link
              to="/admin/portfolio/new"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Tambah Portfolio
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">ID</th>
                    <th className="px-4 py-3 text-left font-medium">Gambar</th>
                    <th className="px-4 py-3 text-left font-medium">Nama Project</th>
                    <th className="px-4 py-3 text-left font-medium">Jobdesk</th>
                    <th className="px-4 py-3 text-left font-medium">Deskripsi</th>
                    <th className="px-4 py-3 text-right font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {projects.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 text-muted-foreground">#{item.id}</td>
                      <td className="px-4 py-3">
                        <img
                          src={item.photoUrl}
                          alt={item.namaProject}
                          className="h-12 w-16 object-cover rounded-md"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/80x60?text=No+Image";
                          }}
                        />
                      </td>
                      <td className="px-4 py-3 font-medium">{item.namaProject}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {item.jobdesk}
                        </span>
                      </td>
                      <td className="px-4 py-3 max-w-xs">
                        <p className="truncate text-muted-foreground">{item.deskripsi}</p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/portfolio/${item.id}/edit`}
                            className="inline-flex items-center rounded-md border p-2 text-xs font-medium hover:bg-accent transition-colors"
                            title="Edit"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            disabled={deleting && deleteId === item.id}
                            className="inline-flex items-center rounded-md border border-destructive/20 p-2 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
                            title="Hapus"
                          >
                            {deleting && deleteId === item.id ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="h-3.5 w-3.5" />
                            )}
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
