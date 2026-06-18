import { useEffect, useState } from "react";
import { getPortfolios } from "@/lib/api";
import type { Portfolio } from "@/types";
import { Loader2, ExternalLink, FolderOpen, ImageIcon, Sparkles } from "lucide-react";

function ImageCard({ photoUrl, alt }: { photoUrl: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (!photoUrl || failed) {
    return <ImageIcon className="h-12 w-12 text-arcane-700/50" />;
  }

  return (
    <img
      src={photoUrl}
      alt={alt}
      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

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
      <div className="relative">
        <Loader2 className="h-12 w-12 animate-spin text-arcane-500" />
        <div className="absolute inset-0 blur-xl bg-arcane-500/20 animate-pulse" />
      </div>
    </div>
  );

  if (error) return (
    <div className="mx-auto max-w-7xl px-4 py-20 text-center animate-fade-from-abyss">
      <div className="glass-card p-12 max-w-lg mx-auto rounded-3xl border-blood-500/30">
        <p className="font-heading text-xl text-blood-500 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="rounded-xl bg-arcane-500 px-6 py-2 text-sm font-heading tracking-widest text-void-950 hover:bg-arcane-400 transition-all"
        >
          RETRY RITUAL
        </button>
      </div>
    </div>
  );

  if (projects.length === 0) return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center animate-fade-from-abyss px-4">
      <FolderOpen className="h-20 w-20 text-arcane-700/30 mb-6" />
      <h2 className="font-heading text-3xl font-bold text-arcane-100 mb-3">Void Detected</h2>
      <p className="text-arcane-300/60 font-body max-w-md">Gerbang portfolio ini masih kosong. Silakan tambahkan project melalui dashboard admin.</p>
    </div>
  );

  return (
    <div className="min-h-screen py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 animate-fade-from-abyss">
          <div className="inline-flex items-center gap-2 rounded-full bg-arcane-500/10 px-4 py-1.5 text-[10px] font-heading tracking-[0.3em] text-arcane-400 mb-6 uppercase border border-arcane-500/20">
            <Sparkles className="h-3 w-3" /> The Chronicle
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-arcane-100 mb-6">
            Project <span className="text-gradient">Gallery</span>
          </h1>
          <p className="text-arcane-300/60 max-w-xl mx-auto font-body text-lg">
            Kumpulan artefak digital dan eksplorasi teknis yang telah saya wujudkan.
          </p>
        </div>

        {/* Bento Grid for Projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] sm:auto-rows-[400px]">
          {projects.map((project, index) => {
            // Logic for Bento Spans
            const isBig = index % 5 === 0; // Every 5th item is large
            const isWide = index % 5 === 2; // Every 5th (+2) item is wide

            return (
              <div 
                key={project.id} 
                className={`group relative bento-item p-0 group ${
                  isBig ? 'md:col-span-2 md:row-span-2' : 
                  isWide ? 'md:col-span-2' : ''
                } animate-fade-from-abyss`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <ImageCard photoUrl={project.photoUrl} alt={project.namaProject} />
                  <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-void-950/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="text-[10px] font-mono tracking-widest bg-arcane-500 text-void-950 px-2 py-0.5 rounded uppercase font-bold">
                      {project.jobdesk}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-arcane-100 mb-2 flex items-center gap-2 group-hover:text-enchant-400 transition-colors">
                    {project.namaProject} <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
                  </h3>
                  <p className="text-sm sm:text-base text-arcane-300/70 font-body line-clamp-2 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {project.deskripsi}
                  </p>
                </div>

                {/* Interactive Border Overlay */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-arcane-500/30 rounded-2xl transition-all duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-arcane-600/5 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-enchant-600/5 rounded-full blur-[100px] -z-10 animate-pulse" />
    </div>
  );
}
