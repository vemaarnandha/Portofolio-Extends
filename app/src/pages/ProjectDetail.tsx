import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPortfolioById } from "@/lib/api";
import type { Portfolio } from "@/types";
import { ArrowLeft, Github, Calendar, Tag, ImageIcon } from "lucide-react";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchProject() {
      try {
        setLoading(true);
        setError("");
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
    if (id) fetchProject();
    return () => { mounted = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-arcane-500/30 border-t-arcane-500" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen py-24 flex flex-col items-center justify-center text-center px-4">
        <p className="font-body text-xl text-blood-500 mb-6">{error || "Proyek tidak ditemukan"}</p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 rounded-xl bg-arcane-500 px-6 py-2 text-sm font-body tracking-wider text-void-950 hover:bg-arcane-400 transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke Projects
        </Link>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="page-main min-h-screen py-24 relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Button */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-body text-arcane-400 hover:text-arcane-200 transition-colors mb-8 animate-fade-from-abyss"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke Projects
        </Link>

        {/* Hero Image */}
        <div className="animate-fade-from-abyss [animation-delay:100ms]">
          <div className="relative rounded-3xl overflow-hidden glass-card aspect-video flex items-center justify-center">
            {project.photoUrl && !imageFailed ? (
              <img
                src={project.photoUrl}
                alt={project.namaProject}
                className="w-full h-full object-cover"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <ImageIcon className="h-20 w-20 text-arcane-700/30" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-void-950/80 via-transparent to-transparent" />
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 space-y-6 animate-fade-from-abyss [animation-delay:200ms]">
          {/* Jobdesk Tags */}
          <div className="flex flex-wrap gap-2">
            {project.jobdesk.split(",").map((tag) => (
              <span
                key={tag.trim()}
                className="inline-flex items-center gap-1 rounded-full bg-arcane-500/10 border border-arcane-500/20 px-3 py-1 text-xs font-body tracking-wider text-arcane-400"
              >
                <Tag className="h-3 w-3" />
                {tag.trim()}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-arcane-100">
            {project.namaProject}
          </h1>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-arcane-400 font-body">
            <Calendar className="h-4 w-4" />
            {formatDate(project.createdAt)}
          </div>

          {/* Description */}
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="font-heading text-lg font-bold text-arcane-200 mb-4">Tentang Proyek Ini</h2>
            <p className="text-arcane-300/80 font-body leading-relaxed whitespace-pre-wrap">
              {project.deskripsi}
            </p>
          </div>

          {/* GitHub Link */}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-xl border border-arcane-700 bg-void-950/70 backdrop-blur-md px-6 py-3 text-sm font-body tracking-wider text-arcane-300 hover:bg-arcane-500 hover:text-void-950 hover:border-arcane-500 transition-all duration-300"
            >
              <Github className="h-5 w-5" /> Lihat di GitHub
            </a>
          )}
        </div>
      </div>

      {/* Background Glows */}
      <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-arcane-500/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/3 -left-20 w-[400px] h-[400px] bg-enchant-500/5 rounded-full blur-[120px] -z-10" />
    </div>
  );
}
