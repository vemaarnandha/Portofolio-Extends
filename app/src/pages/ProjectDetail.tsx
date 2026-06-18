import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPortfolioById } from "@/lib/api";
import type { Portfolio } from "@/types";
import { ArrowLeft, ImageIcon } from "lucide-react";

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
        if (mounted) { if (response.success) setProject(response.data); else setError(response.message || "Proyek tidak ditemukan"); }
      } catch (err) { if (mounted) setError(err instanceof Error ? err.message : "Terjadi kesalahan"); }
      finally { if (mounted) setLoading(false); }
    }
    fetchProject();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return (<div className="mx-auto max-w-4xl px-4 py-24"><div className="animate-pulse space-y-6"><div className="h-8 bg-arcane-900/50 rounded w-32" /><div className="h-64 bg-arcane-900/50 rounded-2xl" /><div className="h-6 bg-arcane-900/50 rounded w-3/4" /><div className="h-4 bg-arcane-900/50 rounded w-full" /><div className="h-4 bg-arcane-900/50 rounded w-5/6" /></div></div>);
  if (error || !project) return (<div className="mx-auto max-w-4xl px-4 py-20 text-center animate-fade-from-abyss"><div className="glass-card p-12 max-w-lg mx-auto rounded-3xl"><p className="font-body text-xl text-blood-500 mb-6">{error || "Proyek tidak ditemukan"}</p><button onClick={() => navigate("/projects")} className="rounded-xl bg-arcane-500 px-6 py-2 text-sm font-body tracking-widest text-void-950 hover:bg-arcane-400 transition-all">Kembali ke Proyek</button></div></div>);

  return (
    <div className="min-h-screen py-24 relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <button onClick={() => navigate("/projects")} className="inline-flex items-center gap-2 text-sm font-body text-arcane-400 hover:text-arcane-200 transition-colors mb-8"><ArrowLeft className="h-4 w-4" /> Kembali ke Proyek</button>
        <div className="animate-fade-from-abyss">
          <div className="relative rounded-2xl overflow-hidden mb-8 glass-card p-0 h-[300px] sm:h-[400px]">
            {project.photoUrl && !imgFailed ? (<img src={project.photoUrl} alt={project.namaProject} className="w-full h-full object-cover" onError={() => setImgFailed(true)} />) : (<div className="w-full h-full flex items-center justify-center bg-arcane-900/30"><ImageIcon className="h-16 w-16 text-arcane-700/30" /></div>)}
          </div>
          <div className="flex flex-wrap gap-2 mb-6">{project.jobdesk?.split(',').map((tag, i) => (<span key={i} className="text-xs font-mono bg-arcane-500/10 border border-arcane-500/30 text-arcane-400 px-3 py-1 rounded-full">{tag.trim()}</span>))}</div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-arcane-100 mb-6">{project.namaProject}</h1>
          <div className="glass-card p-8 rounded-2xl"><p className="text-arcane-300/80 font-body leading-relaxed text-base sm:text-lg">{project.deskripsi}</p></div>
        </div>
      </div>
      <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-arcane-500/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-enchant-500/5 rounded-full blur-[120px] -z-10" />
    </div>
  );
}
