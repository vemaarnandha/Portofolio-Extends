import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPortfolio, updatePortfolio, getPortfolioById, uploadProjectImage } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";
import { Loader2, AlertCircle, ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";
import ImageUploadField from "@/components/ui/image-upload";

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEdit);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/admin/login");
    }
  }, [navigate]);

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
          if (data.photoUrl) {
            setImagePreview(data.photoUrl);
          }
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

  function handleImageChange(file: File | null, previewUrl?: string) {
    setImageFile(file);
    if (previewUrl) setImagePreview(previewUrl);
    if (!file) {
      setImagePreview(null);
      setForm((prev) => ({ ...prev, photo_url: "" }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.nama_project || !form.jobdesk || !form.deskripsi) {
      setError("Semua field wajib diisi.");
      return;
    }

    if (!imageFile && !form.photo_url) {
      setError("Gambar project wajib diupload.");
      return;
    }

    setLoading(true);
    try {
      let photoUrl = form.photo_url;

      if (imageFile) {
        const uploadRes = await uploadProjectImage(0, imageFile);
        if (!uploadRes.success) {
          setError(uploadRes.error || "Gagal upload gambar");
          setLoading(false);
          return;
        }
        photoUrl = uploadRes.url!;
      }

      const data = {
        nama_project: form.nama_project,
        photo_url: photoUrl,
        jobdesk: form.jobdesk,
        deskripsi: form.deskripsi,
      };

      const response = isEdit
        ? await updatePortfolio(Number(id), data)
        : await createPortfolio(data);

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
        <Loader2 className="h-8 w-8 animate-spin text-arcane-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 animate-fade-from-abyss">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-sm text-arcane-400 hover:text-arcane-300 transition-colors mb-6 font-heading tracking-wider"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Dashboard
        </Link>

        <h1 className="font-heading text-2xl font-bold tracking-[0.05em] text-arcane-500 mb-2">
          {isEdit ? "Edit Portfolio" : "Tambah Portfolio"}
        </h1>
        <p className="text-sm text-arcane-300/60 font-body mb-8">
          {isEdit
            ? "Perbarui informasi portfolio yang sudah ada."
            : "Isi form di bawah untuk menambahkan portfolio baru."}
        </p>

        <div className="rounded-xl border border-arcane-900/50 bg-void-900 p-6 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-blood-500/20 bg-blood-500/10 p-3 text-sm text-blood-500">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="nama_project" className="text-sm font-heading tracking-wider text-arcane-300">
                Nama Project <span className="text-blood-500">*</span>
              </label>
              <input
                id="nama_project"
                name="nama_project"
                type="text"
                value={form.nama_project}
                onChange={handleChange}
                className="w-full rounded-md border border-arcane-900 bg-void-950 px-3 py-2 text-sm text-arcane-200 placeholder:text-arcane-700 focus:outline-none focus:ring-2 focus:ring-rift-400 focus:border-arcane-500 focus:shadow-glow transition-all duration-200"
                placeholder="Website E-Commerce"
              />
            </div>

            <ImageUploadField
              value={imagePreview}
              onChange={handleImageChange}
            />

            <div className="space-y-2">
              <label htmlFor="jobdesk" className="text-sm font-heading tracking-wider text-arcane-300">
                Jobdesk / Role <span className="text-blood-500">*</span>
              </label>
              <input
                id="jobdesk"
                name="jobdesk"
                type="text"
                value={form.jobdesk}
                onChange={handleChange}
                className="w-full rounded-md border border-arcane-900 bg-void-950 px-3 py-2 text-sm text-arcane-200 placeholder:text-arcane-700 focus:outline-none focus:ring-2 focus:ring-rift-400 focus:border-arcane-500 focus:shadow-glow transition-all duration-200"
                placeholder="Fullstack Developer"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="deskripsi" className="text-sm font-heading tracking-wider text-arcane-300">
                Deskripsi <span className="text-blood-500">*</span>
              </label>
              <textarea
                id="deskripsi"
                name="deskripsi"
                rows={5}
                value={form.deskripsi}
                onChange={handleChange}
                className="w-full rounded-md border border-arcane-900 bg-void-950 px-3 py-2 text-sm text-arcane-200 placeholder:text-arcane-700 focus:outline-none focus:ring-2 focus:ring-rift-400 focus:border-arcane-500 focus:shadow-glow transition-all duration-200 resize-none"
                placeholder="Jelaskan project ini secara detail..."
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-arcane-500 px-6 py-2.5 text-sm font-heading tracking-wider font-semibold text-void-950 hover:bg-arcane-400 hover:shadow-glow active:scale-[0.97] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="inline-flex items-center gap-2 rounded-lg border border-arcane-900/50 px-6 py-2.5 text-sm font-heading tracking-wider text-arcane-300 hover:bg-arcane-900/50 hover:border-arcane-700 transition-all duration-200"
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
