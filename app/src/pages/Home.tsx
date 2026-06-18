import { Link } from "react-router-dom";
import { ArrowRight, Zap, Sparkles, Code2, Database, Layout } from "lucide-react";
import { useState } from "react";
import Testimonials from "@/components/Testimonials";

function BentoImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className="absolute inset-0 w-full h-full bg-void-800 flex items-center justify-center opacity-30">
        <span className="text-xs text-arcane-500 font-mono">Gambar tidak tersedia</span>
      </div>
    );
  }
  return (
    <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-all duration-500" onError={() => setError(true)} loading="lazy" />
  );
}

export default function Home() {
  const bentoSkills = [
    { title: "Frontend Modern", desc: "Membangun antarmuka yang menarik dengan React 19, TypeScript, dan Tailwind CSS.", tags: ['React 19', 'TypeScript', 'Tailwind', 'Vite'], icon: Layout, image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60" },
    { title: "Backend Edge", desc: "Hono & Cloudflare Workers untuk API secepat kilat di seluruh dunia.", icon: Code2, image: "https://images.unsplash.com/photo-1558494949-ef010bbbb317?w=800&auto=format&fit=crop&q=60" },
    { title: "Database", desc: "Supabase & PostgreSQL untuk penyimpanan data yang andal.", icon: Database, image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=60" },
    { title: "Optimasi Performa", desc: "Core Web Vitals & SEO adalah prioritas utama setiap proyek.", icon: Zap, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60" }
  ];
  return (
    <div className="min-h-screen">
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-arcane-800/50 bg-arcane-950/40 backdrop-blur-sm px-4 py-1.5 text-xs font-body tracking-widest text-arcane-400 mb-8 animate-fade-from-abyss uppercase">
            <Sparkles className="h-3.5 w-3.5 text-enchant-400 animate-pulse" /> Siap Berkolaborasi
          </div>
          <h1 className="font-heading text-4xl sm:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 animate-fade-from-abyss">
            Membangun Pengalaman <br /><span className="text-gradient">Digital</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-arcane-200/70 mb-12 leading-relaxed font-body animate-fade-from-abyss [animation-delay:200ms]">
            Halo, saya <span className="text-arcane-200 font-semibold">Vema Arnandha</span>. Fullstack Developer yang mengubah baris kode menjadi pengalaman digital yang menarik dan performant.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-from-abyss [animation-delay:400ms]">
            <Link to="/projects" className="group relative inline-flex items-center gap-2 rounded-xl bg-arcane-500 px-8 py-4 text-sm font-body tracking-widest font-bold text-void-950 overflow-hidden transition-all duration-300 hover:bg-arcane-400 hover:shadow-arcane active:scale-95">
              <span className="relative z-10 flex items-center gap-2">Lihat Proyek Saya <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></span>
              <div className="absolute inset-0 bg-gradient-to-r from-enchant-400 to-arcane-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl border border-arcane-800 bg-void-950/50 backdrop-blur-md px-8 py-4 text-sm font-body tracking-widest font-bold text-arcane-300 hover:bg-arcane-900/30 hover:border-arcane-600 transition-all duration-300 active:scale-95">
              Hubungi Saya
            </Link>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-arcane-500/5 rounded-full blur-[120px] -z-10 animate-glow-pulse" />
      </section>
      <section className="py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="font-heading text-sm tracking-[0.3em] text-arcane-500 uppercase mb-4 text-center">Keahlian Teknis</h2>
            <h3 className="font-heading text-3xl sm:text-5xl font-bold text-center text-arcane-100 tracking-tight">Kemampuan Saya</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
            <div className="md:col-span-2 md:row-span-2 bento-item group p-0 overflow-hidden relative">
              <BentoImage src={bentoSkills[0].image} alt="Frontend" />
              <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-void-950/40 to-transparent" />
              <div className="absolute top-6 right-6 p-3 rounded-xl bg-arcane-500/10 text-arcane-400 group-hover:bg-arcane-500 group-hover:text-void-950 transition-all duration-500">{(() => { const Icon = bentoSkills[0].icon; return <Icon className="h-8 w-8" />; })()}</div>
              <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                <h4 className="font-heading text-2xl font-bold text-arcane-100 mb-3">{bentoSkills[0].title}</h4>
                <p className="text-arcane-300/70 leading-relaxed font-body mb-4">{bentoSkills[0].desc}</p>
                <div className="flex flex-wrap gap-2">{bentoSkills[0].tags?.map(tag => (<span key={tag} className="text-xs font-mono bg-arcane-900/50 border border-arcane-800 px-2 py-1 rounded text-arcane-400">{tag}</span>))}</div>
              </div>
            </div>
            {bentoSkills.slice(1).map((skill, i) => (
              <div key={i} className="md:col-span-2 bento-item group p-0 overflow-hidden relative">
                <BentoImage src={skill.image} alt={skill.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-void-950/40 to-transparent" />
                <div className="absolute top-6 right-6 p-3 rounded-xl bg-arcane-500/10 text-arcane-400 group-hover:bg-arcane-500 group-hover:text-void-950 transition-all duration-500"><skill.icon className="h-6 w-6" /></div>
                <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                  <h4 className="font-heading text-xl font-bold text-arcane-100 mb-2">{skill.title}</h4>
                  <p className="text-sm text-arcane-300/70 font-body">{skill.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Testimonials />
    </div>
  );
}
