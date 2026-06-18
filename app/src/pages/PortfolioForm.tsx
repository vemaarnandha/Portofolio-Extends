import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPortfolio, updatePortfolio, getPortfolioById, uploadProjectImage } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";
import { Loader2, AlertCircle, ArrowLeft, Save, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import ImageUploadField from "@/components/ui/image-upload";

export default function PortfolioForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const [authLoading, setAuthLoading] = useState(true);
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

  if (authLoading || fetchLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-arcane-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 relative overflow-hidden">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative z-10">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-[10px] font-heading tracking-[0.2em] text-arcane-500 hover:text-arcane-300 transition-colors mb-8 uppercase"
        >
          <ArrowLeft className="h-3 w-3" /> Kembali ke Dashboard
        </Link>

        <div className="mb-10 animate-fade-from-abyss">
          <div className="inline-flex items-center gap-2 rounded-full bg-arcane-500/10 px-4 py-1.5 text-[10px] font-heading tracking-[0.3em] text-arcane-400 mb-6 uppercase border border-arcane-500/20">
            <Sparkles className="h-3 w-3" /> Management
          </div>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-arcane-100">
            {isEdit ? "Edit Manifest" : "New Manifest"}
          </h1>
        </div>

        <div className="glass-card p-8 sm:p-10 rounded-3xl animate-fade-from-abyss [animation-delay:100ms]">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="flex items-center gap-3 rounded-xl border border-blood-500/20 bg-blood-500/5 p-4 text-sm text-blood-400">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-heading tracking-widest text-arcane-500 uppercase ml-1">Project Name</label>
              <input
                name="nama_project" type="text" value={form.nama_project} onChange={handleChange}
                className="w-full rounded-xl border border-arcane-900 bg-void-950/50 px-4 py-3 text-sm text-arcane-100 focus:outline-none focus:border-arcane-500 focus:ring-1 focus:ring-arcane-500/30 transition-all"
                placeholder="Ex: Enchanted Portfolio"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-heading tracking-widest text-arcane-500 uppercase ml-1">Artifact Image</label>
              <div className="glass-card p-4 rounded-xl border-dashed">
                <ImageUploadField
                  value={imagePreview}
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-heading tracking-widest text-arcane-500 uppercase ml-1">Role</label>
              <input
                name="jobdesk" type="text" value={form.jobdesk} onChange={handleChange}
                className="w-full rounded-xl border border-arcane-900 bg-void-950/50 px-4 py-3 text-sm text-arcane-100 focus:outline-none focus:border-arcane-500 focus:ring-1 focus:ring-arcane-500/30 transition-all"
                placeholder="Ex: Fullstack Developer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-heading tracking-widest text-arcane-500 uppercase ml-1">Description</label>
              <textarea
                name="deskripsi" rows={6} value={form.deskripsi} onChange={handleChange}
                className="w-full rounded-xl border border-arcane-900 bg-void-950/50 px-4 py-3 text-sm text-arcane-100 focus:outline-none focus:border-arcane-500 focus:ring-1 focus:ring-arcane-500/30 transition-all resize-none"
                placeholder="Detail the artifact..."
              />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit" disabled={loading}
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-arcane-500 px-8 py-4 text-xs font-heading font-bold tracking-[0.2em] text-void-950 hover:bg-arcane-400 hover:shadow-arcane transition-all duration-300 disabled:opacity-50 active:scale-95 uppercase"
              >
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> SAVING...</> : <><Save className="h-4 w-4" /> COMMIT MANIFEST</>}
              </button>
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-arcane-900/50 px-8 py-4 text-xs font-heading tracking-widest text-arcane-300 hover:bg-arcane-900/30 transition-all uppercase"
              >
                DISCARD
              </Link>
            </div>
          </form>
        </div>
      </div>
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-enchant-500/5 rounded-full blur-[120px] -z-10" />
    </div>
  );
}
