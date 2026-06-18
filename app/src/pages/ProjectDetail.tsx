import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPortfolioById } from "@/lib/api";
import type { Portfolio } from "@/types";
import { ArrowLeft, ExternalLink, ImageIcon, FolderOpen } from "lucide-react";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    async function fetchProject() {
      try {
        setLoading(true); setError("");
        const response = await getPortfolioById(Number(id));
        if (mounted) {
          if (response.success) setProject(response.data);
          else setError(response.message || "Proyek tidak ditemukan");
        }
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchProject();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return (
    <div className="min-h-screen py-24 relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-arcane-900/50 rounded w-32" />
          <div className="h-64 bg-arcane-900/50 rounded-2xl" />
          <div className="h-8 bg-arcane-900/50 rounded w-3/4" />
          <div className="h-4 bg-arcane-900/50 rounded w-full" />
          <div className="h-4 bg-arcane-900/50 rounded w-5/6" />
        </div>
      </div>
    </div>
  );

  if (error || !project) return (
    <div className="min-h-screen py-24 flex items-center justify-center">
      <div className="text-center">
        <FolderOpen className="h-16 w-16 text-arcane-700/30 mx-auto mb-4" />
        <p className="font-heading text-xl text-arcane-300 mb-4">{error || "Proyek tidak ditemukan"}</p>
        <button onClick={() => navigate("/projects")} className="rounded-xl bg-arcane-500 px-6 py-2 text-sm font-heading tracking-widest text-void-950 hover:bg-arcane-400 transition-all">
          Kembali ke Proyek
        </button>
      </div>
    </div>
  );

  const tags = project.jobdesk ? project.jobdesk.split(",").map(t => t.trim()).filter(Boolean) : [];

  return (
    <div className="min-h-screen py-24 relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <button
          onClick={() => navigate("/projects")}
          className="inline-flex items-center gap-2 text-sm font-body text-arcane-400 hover:text-arcane-200 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke Proyek
        </button>

        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden mb-8 bg-arcane-900/30">
          {project.photoUrl && !imgFailed ? (
            <img
              src={project.photoUrl}
              alt={project.namaProject}
              className="w-full h-64 sm:h-80 object-cover"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div className="w-full h-64 sm:h-80 flex items-center justify-center">
              <ImageIcon className="h-16 w-16 text-arcane-700/30" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="animate-fade-from-abyss">
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span key={tag} className="text-xs font-mono bg-arcane-500/10 border border-arcane-500/20 text-arcane-400 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-arcane-100 mb-6">
            {project.namaProject}
          </h1>

          <div className="glass-card p-8 rounded-2xl mb-8">
            <p className="text-arcane-300/80 font-body text-base leading-relaxed whitespace-pre-wrap">
              {project.deskripsi}
            </p>
          </div>

          <div className="flex gap-4">
            <div className="inline-flex items-center gap-2 rounded-xl border border-arcane-800 bg-void-950/50 px-6 py-3 text-sm font-body text-arcane-400 opacity-50 cursor-not-allowed">
              <ExternalLink className="h-4 w-4" /> Demo segera hadir
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-arcane-600/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-enchant-600/5 rounded-full blur-[100px] -z-10" />
    </div>
  );
}
