import { Code2, Database, Server, Palette, Terminal, Globe, Sparkles, Download } from "lucide-react";
import profileImage from "@/assets/foto_profil_img_about.jpg";

const skills = [
  { icon: Code2, label: "React & TypeScript", desc: "Pengembangan frontend modern" },
  { icon: Server, label: "Hono & Workers", desc: "Backend edge-ready" },
  { icon: Database, label: "Supabase & PostgreSQL", desc: "Database serverless" },
  { icon: Palette, label: "Tailwind CSS", desc: "Styling utility-first" },
  { icon: Terminal, label: "Vite", desc: "Build tooling cepat" },
  { icon: Globe, label: "REST API Design", desc: "Arsitektur API bersih" },
];

const experiences = [
  { title: "Reseller BGL CPS", company: "Freelance", period: "2021 - 2022", desc: "Menyediakan mata uang game, item farming, akun, dan jasa midman kepada komunitas gamer lokal. Mengelola transaksi dan membangun kepercayaan dengan pelanggan secara konsisten." },
  { title: "Reseller Account", company: "Freelance", period: "2022 - 2023", desc: "Membeli akun game, khususnya The Legends of Neverland, kemudian menjualnya kembali kepada komunitas yang membutuhkan. Mengembangkan kemampuan analisis pasar dan manajemen inventaris." },
  { title: "Insert Data", company: "Freelance", period: "2025 - 2025", desc: "Memindahkan catatan pembayaran dari format manual tulis tangan ke dalam bentuk digital. Meningkatkan efisiensi pencatatan dan memudahkan akses data bagi tim." },
];

export default function About() {
  return (
    <div className="min-h-screen py-24 relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-from-abyss">
          <div className="inline-flex items-center gap-2 rounded-full bg-arcane-500/10 px-4 py-1.5 text-xs font-body tracking-wider text-arcane-400 mb-6 uppercase border border-arcane-500/20">
            <Sparkles className="h-3 w-3" /> Tentang Saya
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-arcane-100 mb-6">
            Lebih dari Sekadar <span className="text-gradient">Kode</span>
          </h1>
          <p className="text-arcane-300/70 max-w-xl mx-auto font-body text-lg">
            Mengenal lebih dalam tentang pengembang di balik proyek ini.
          </p>
        </div>

        {/* Bento Profile Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="md:col-span-2 glass-card p-8 sm:p-10 rounded-3xl animate-fade-from-abyss">
            <h2 className="font-heading text-2xl font-bold text-arcane-100 mb-6 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-enchant-400" />
              Profil Saya
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-arcane-300/80 font-body leading-relaxed">
              <p>
                Saya adalah <span className="text-arcane-200 font-medium">Vema Arnandha</span>, seorang siswa SMK PGRI Wlingi yang sedang menjalani Praktik Kerja Lapangan (PKL) di <span className="text-enchant-400 font-medium">Arre Tech</span>.
              </p>
              <p>
                Berasal dari <span className="text-arcane-200 font-medium">Blitar, Jawa Timur</span>, saya memiliki minat kuat dalam pengembangan web fullstack. Dengan fokus pada ekosistem <span className="text-enchant-400 font-mono text-sm uppercase tracking-wider">React &amp; Cloudflare</span>, saya membangun aplikasi yang scalable dan siap menghadapi tantangan masa depan.
              </p>
              <p>
                Saya sedang membangun keahlian untuk karier profesional di bidang teknologi, dari Blitar untuk dunia.
              </p>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl flex flex-col items-center justify-center text-center animate-fade-from-abyss [animation-delay:100ms]">
            <div className="relative mb-6">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-arcane-500 to-enchant-600 p-[2px] shadow-glow">
                <div className="h-full w-full rounded-full bg-void-950 flex items-center justify-center overflow-hidden">
                  <img src={profileImage} alt="Profile" className="h-full w-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-lg bg-void-950 border border-arcane-800 flex items-center justify-center shadow-lg">
                <div className="h-2 w-2 rounded-full bg-eldritch-500 animate-ping" />
              </div>
            </div>
            <h3 className="font-heading text-lg font-bold text-arcane-100">Vema Arnandha</h3>
            <p className="text-xs font-body text-arcane-400 mt-1">Siswa PKL · Arre Tech</p>
            <a
              href="/cv-vema-arnandha.pdf"
              download
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-arcane-500 px-6 py-2.5 text-sm font-body font-semibold text-void-950 hover:bg-arcane-400 transition-all duration-300"
            >
              <Download className="h-4 w-4" />
              Unduh CV
            </a>
          </div>
        </div>

        {/* Tech Stack Grid */}
        <section className="mb-20">
          <h2 className="font-heading text-sm tracking-[0.3em] text-arcane-500 uppercase mb-10 text-center">Teknologi yang Digunakan</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {skills.map((skill, index) => (
              <div key={skill.label} className="glass-card p-6 rounded-2xl group hover:-translate-y-2 transition-all duration-500 animate-fade-from-abyss" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="h-10 w-10 rounded-xl bg-arcane-500/10 flex items-center justify-center text-arcane-400 group-hover:bg-arcane-500 group-hover:text-void-950 transition-all duration-300 mb-4">
                  <skill.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xs font-body font-semibold tracking-wider text-arcane-100 uppercase mb-2">{skill.label}</h3>
                <p className="text-xs text-arcane-300/70 font-body leading-tight">{skill.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="animate-fade-from-abyss [animation-delay:300ms]">
          <h2 className="font-heading text-sm tracking-[0.3em] text-arcane-500 uppercase mb-10 text-center">Pengalaman</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {experiences.map((exp, i) => (
              <div key={i} className="group relative pl-8 border-l border-arcane-900/50 hover:border-arcane-500 transition-colors duration-500">
                <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-arcane-900 group-hover:bg-enchant-500 group-hover:scale-150 transition-all duration-500 shadow-glow" />
                <div className="glass-card p-6 rounded-2xl hover:border-arcane-700/50 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-arcane-100">{exp.title}</h3>
                      <p className="text-xs font-body tracking-wider text-arcane-500 mt-1 uppercase">{exp.company}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-void-950 bg-arcane-400 px-3 py-1 rounded-full uppercase tracking-tighter self-start">{exp.period}</span>
                  </div>
                  <p className="text-sm text-arcane-300/70 font-body leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-arcane-500/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-enchant-500/5 rounded-full blur-[120px] -z-10" />
    </div>
  );
}
