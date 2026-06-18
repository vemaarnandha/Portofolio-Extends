import { Code2, Database, Server, Palette, Terminal, Globe, Sparkles } from "lucide-react";
import profileImage from "@/assets/foto_profil_img_about.jpg";

const skills = [
  { icon: Code2, label: "React & TypeScript", desc: "Frontend modern development" },
  { icon: Server, label: "Hono & Workers", desc: "Edge-ready backend" },
  { icon: Database, label: "Supabase & PostgreSQL", desc: "Serverless database" },
  { icon: Palette, label: "Tailwind CSS", desc: "Utility-first styling" },
  { icon: Terminal, label: "Vite", desc: "Fast build tooling" },
  { icon: Globe, label: "REST API Design", desc: "Clean API architecture" },
];

const experiences = [
  { title: "Reseller BGL CPS", company: "Freelance", period: "2021 - 2022", desc: "Menyediakan mata uang game, item farming, account, jasa midman." },
  { title: "Reseller Account", company: "Freelance ", period: "2022 - 2023", desc: "Membeli akun game khusunya game The Legends of Neverland dengan lalu menjualnya kembbali." },
  { title: "Insert data", company: "Freelance", period: "2025 - 2025", desc: "Memindahkan catatan pembayaran, yang sebelumnya manual(tulis kertas), ke dalam bentuk digital." },
];

export default function About() {
  return (
    <div className="min-h-screen py-24 relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-from-abyss">
          <div className="inline-flex items-center gap-2 rounded-full bg-arcane-500/10 px-4 py-1.5 text-[10px] font-heading tracking-[0.3em] text-arcane-400 mb-6 uppercase border border-arcane-500/20">
            <Sparkles className="h-3 w-3" /> The Origin
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-arcane-100 mb-6">
            Beyond the <span className="text-gradient">Code</span>
          </h1>
          <p className="text-arcane-300/60 max-w-xl mx-auto font-body text-lg">
            Mengenal lebih dalam tentang arsitek di balik layar kegelapan ini.
          </p>
        </div>

        {/* Bento Profile Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="md:col-span-2 glass-card p-8 sm:p-10 rounded-3xl animate-fade-from-abyss">
            <h2 className="font-heading text-2xl font-bold text-arcane-100 mb-6 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-enchant-400" />
              Profil Eksistensi
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-arcane-300/80 font-body leading-relaxed">
              <p>
                Saya adalah seorang <span className="text-arcane-200 font-medium">Fullstack Developer</span> dengan dedikasi tinggi dalam menciptakan solusi digital yang tidak hanya berfungsi dengan baik, tetapi juga memiliki estetika yang memukau.
              </p>
              <p>
                Dengan fokus pada ekosistem <span className="text-enchant-400 font-mono text-sm uppercase tracking-wider">React & Cloudflare</span>, saya membangun aplikasi yang scalable dan siap menghadapi tantangan masa depan.
              </p>
              <p className="text-sm sm:text-base italic border-l-2 border-arcane-800 pl-6 text-arcane-400/60">
                "Kreativitas adalah sihir yang nyata, dan kode adalah mantera yang menjadikannya kenyataan."
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
            <p className="text-xs font-mono text-arcane-500 uppercase tracking-widest mt-1">Available for Rituals</p>
          </div>
        </div>

        {/* Tech Stack Grid */}
        <section className="mb-20">
          <h2 className="font-heading text-sm tracking-[0.3em] text-arcane-500 uppercase mb-10 text-center">Essence of Power</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {skills.map((skill, index) => (
              <div key={skill.label} className="glass-card p-6 rounded-2xl group hover:-translate-y-2 transition-all duration-500 animate-fade-from-abyss" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="h-10 w-10 rounded-xl bg-arcane-500/10 flex items-center justify-center text-arcane-400 group-hover:bg-arcane-500 group-hover:text-void-950 transition-all duration-300 mb-4">
                  <skill.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-[10px] font-bold tracking-widest text-arcane-100 uppercase mb-2">{skill.label}</h3>
                <p className="text-[10px] text-arcane-300/40 font-body leading-tight">{skill.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="animate-fade-from-abyss [animation-delay:300ms]">
          <h2 className="font-heading text-sm tracking-[0.3em] text-arcane-500 uppercase mb-10 text-center">The Chronicle</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {experiences.map((exp, i) => (
              <div key={i} className="group relative pl-8 border-l border-arcane-900/50 hover:border-arcane-500 transition-colors duration-500">
                <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-arcane-900 group-hover:bg-enchant-500 group-hover:scale-150 transition-all duration-500 shadow-glow" />
                <div className="glass-card p-6 rounded-2xl hover:border-arcane-700/50 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-arcane-100">{exp.title}</h3>
                      <p className="text-xs font-heading tracking-widest text-arcane-500 mt-1 uppercase">{exp.company}</p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-void-950 bg-arcane-400 px-3 py-1 rounded-full uppercase tracking-tighter self-start">{exp.period}</span>
                  </div>
                  <p className="text-sm text-arcane-300/60 font-body leading-relaxed">{exp.desc}</p>
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
