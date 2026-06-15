import { useEffect, useState } from "react";
import { getPortfolios } from "@/lib/api";
import type { Portfolio } from "@/types";
import { Loader2, ExternalLink, FolderOpen } from "lucide-react";

export default function Projects() {
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    async function fetchProjects() {
      try {
        setLoading(true); setError("");
        const response = await getPortfolios();
        if (mounted) {
          if (response.success) setProjects(response.data);
          else setError(response.message || "Gagal memuat data");
        }
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally { if (mounted) setLoading(false); }
    }
    fetchProjects();
    return () => { mounted = false; };
  }, []);

  if (loading) return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-arcane-500" />
    </div>
  );

  if (error) return (
    <div className="mx-auto max-w-7xl px-4 py-20 text-center animate-fade-from-abyss">
      <div className="rounded-lg border border-blood-500/20 bg-blood-500/10 p-6 text-blood-500">
        <p className="font-medium">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 text-sm underline hover:no-underline text-arcane-400">Coba lagi</button>
      </div>
    </div>
  );

  if (projects.length === 0) return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center animate-fade-from-abyss">
      <FolderOpen className="h-16 w-16 text-arcane-700/50 mb-4" />
      <h2 className="font-heading text-xl font-semibold tracking-[0.02em] text-arcane-300 mb-2">Belum Ada Project</h2>
      <p className="text-arcane-300/60 font-body">Project akan segera ditambahkan.</p>
    </div>
  );

  return (
    <div className="min-h-screen py-12 animate-fade-from-abyss">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl sm:text-[2.25rem] font-bold tracking-[0.05em] text-arcane-500 mb-4">
            Portfolio Project
          </h1>
          <p className="text-arcane-300/60 max-w-xl mx-auto font-body">
            Kumpulan project yang telah saya kerjakan.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group rounded-xl border border-arcane-900/50 bg-card overflow-hidden shadow-sm hover:shadow-lg hover:border-arcane-700 transition-all duration-300">
              <div className="aspect-video overflow-hidden bg-muted">
                <img src={project.photoUrl} alt={project.namaProject}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x450?text=No+Image"; }}
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-heading font-semibold text-lg tracking-[0.02em] text-arcane-300 line-clamp-1">
                    {project.namaProject}
                  </h3>
                  <ExternalLink className="h-4 w-4 text-arcane-700 flex-shrink-0 mt-1 group-hover:text-arcane-400 transition-colors" />
                </div>
                <p className="text-xs font-heading tracking-wider text-arcane-500 mb-3 uppercase">
                  {project.jobdesk}
                </p>
                <p className="text-sm text-arcane-300/60 font-body line-clamp-3">
                  {project.deskripsi}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
