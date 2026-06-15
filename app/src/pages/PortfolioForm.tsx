import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPortfolio, updatePortfolio, getPortfolioById } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";
import { Loader2, AlertCircle, ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";

export default function PortfolioForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const [form, setForm] = useState({
    nama_project: "",
    photo_url: "",
    jobdesk: "",
    deskripsi: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEdit);
  const [error, setError] = useState("");

  // Check auth
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Fetch data if edit mode
  useEffect(() => {
    if (!isEdit) return;
    let mounted = true;
    async function fetchData() {
      try {
        setFetchLoading(true);
        const response = await getPortfolioById(Number(id));
        if (mounted && response.success) {
          const data = response.data;
          setForm({
            nama_project: data.namaProject,
            photo_url: data.photoUrl,
            jobdesk: data.jobdesk,
            deskripsi: data.deskripsi,
          });
        } else if (mounted) {
          setError(response.message || "Data tidak ditemukan");
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Terjadi kesalahan");
        }
      } finally {
        if (mounted) setFetchLoading(false);
      }
    }
    fetchData();
    return () => { mounted = false; };
  }, [id, isEdit]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.nama_project || !form.photo_url || !form.jobdesk || !form.deskripsi) {
      setError("Semua field wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      const response = isEdit
        ? await updatePortfolio(Number(id), form)
        : await createPortfolio(form);

      if (response.success) {
        navigate("/admin/dashboard");
      } else {
        setError(response.message || "Gagal menyimpan data");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  if (fetchLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Dashboard
        </Link>

        <h1 className="text-2xl font-bold mb-2">
          {isEdit ? "Edit Portfolio" : "Tambah Portfolio"}
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          {isEdit
            ? "Perbarui informasi portfolio yang sudah ada."
            : "Isi form di bawah untuk menambahkan portfolio baru."}
        </p>

        <div className="rounded-xl border bg-card p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="nama_project" className="text-sm font-medium">
                Nama Project <span className="text-destructive">*</span>
              </label>
              <input
                id="nama_project"
                name="nama_project"
                type="text"
                value={form.nama_project}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                placeholder="Website E-Commerce"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="photo_url" className="text-sm font-medium">
                URL Foto <span className="text-destructive">*</span>
              </label>
              <input
                id="photo_url"
                name="photo_url"
                type="url"
                value={form.photo_url}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                placeholder="https://example.com/image.jpg"
              />
              {form.photo_url && (
                <div className="mt-2 rounded-lg border overflow-hidden bg-muted">
                  <img
                    src={form.photo_url}
                    alt="Preview"
                    className="h-40 w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="jobdesk" className="text-sm font-medium">
                Jobdesk / Role <span className="text-destructive">*</span>
              </label>
              <input
                id="jobdesk"
                name="jobdesk"
                type="text"
                value={form.jobdesk}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                placeholder="Fullstack Developer"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="deskripsi" className="text-sm font-medium">
                Deskripsi <span className="text-destructive">*</span>
              </label>
              <textarea
                id="deskripsi"
                name="deskripsi"
                rows={5}
                value={form.deskripsi}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                placeholder="Jelaskan project ini secara detail..."
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    {isEdit ? "Update Portfolio" : "Simpan Portfolio"}
                  </>
                )}
              </button>
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center rounded-lg border px-6 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
              >
                Batal
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
