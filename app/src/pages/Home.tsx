import { Link } from "react-router-dom";
import { ArrowRight, Layers, Zap, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-b from-void-950 via-arcane-950/30 to-void-950 pt-20 pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center rounded-full border border-arcane-800/50 bg-arcane-950/30 px-4 py-1.5 text-sm font-heading tracking-wider text-arcane-400 mb-8 animate-fade-from-abyss">
            <Zap className="mr-1.5 h-3.5 w-3.5 text-enchant-500" /> Fullstack Developer
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[0.05em] text-arcane-500 mb-6 animate-fade-from-abyss">
            Halo, Saya <span className="text-enchant-400">Vema arnandha</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-arcane-200/80 mb-10 leading-relaxed font-body animate-fade-from-abyss">
            Saya membangun aplikasi web modern yang cepat, responsif, dan scalable. Dari konsep hingga deployment, saya menghadirkan solusi digital terbaik.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-from-abyss">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-lg bg-arcane-500 px-6 py-3 text-sm font-heading tracking-wider font-semibold text-void-950 shadow-glow hover:bg-arcane-400 hover:shadow-arcane active:scale-[0.97] transition-all duration-200"
            >
              Lihat Project <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-arcane-700/50 px-6 py-3 text-sm font-heading tracking-wider font-semibold text-arcane-300 hover:bg-arcane-900/50 hover:border-arcane-600 active:scale-[0.97] transition-all duration-200"
            >
              Hubungi Saya
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-void-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-[1.875rem] font-semibold tracking-[0.03em] text-arcane-400 mb-4">
              Keahlian Saya
            </h2>
            <p className="text-arcane-300/60 max-w-xl mx-auto font-body">
              Kombinasi teknologi modern dan best practices untuk menghasilkan kode berkualitas.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-xl border border-arcane-900/50 bg-card p-6 shadow-sm hover:shadow-lg hover:border-arcane-700 transition-all duration-300">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-arcane-500/10">
                <Globe className="h-6 w-6 text-arcane-500" />
              </div>
              <h3 className="font-heading text-lg font-semibold tracking-[0.02em] text-arcane-300 mb-2">
                Frontend Development
              </h3>
              <p className="text-sm text-arcane-300/60 font-body">
                React, TypeScript, Tailwind CSS, dan Vite untuk UI yang responsif dan performant.
              </p>
            </div>
            <div className="rounded-xl border border-arcane-900/50 bg-card p-6 shadow-sm hover:shadow-lg hover:border-arcane-700 transition-all duration-300">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-arcane-500/10">
                <Layers className="h-6 w-6 text-arcane-500" />
              </div>
              <h3 className="font-heading text-lg font-semibold tracking-[0.02em] text-arcane-300 mb-2">
                Backend Development
              </h3>
              <p className="text-sm text-arcane-300/60 font-body">
                Hono, Cloudflare Workers, dan Supabase untuk API yang cepat dan aman.
              </p>
            </div>
            <div className="rounded-xl border border-arcane-900/50 bg-card p-6 shadow-sm hover:shadow-lg hover:border-arcane-700 transition-all duration-300">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-arcane-500/10">
                <Zap className="h-6 w-6 text-arcane-500" />
              </div>
              <h3 className="font-heading text-lg font-semibold tracking-[0.02em] text-arcane-300 mb-2">
                Database & DevOps
              </h3>
              <p className="text-sm text-arcane-300/60 font-body">
                Supabase (PostgreSQL) dan Cloudflare Workers untuk deployment otomatis ke edge network.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
