import { Code2, Database, Server, Palette, Terminal, Globe } from "lucide-react";

const skills = [
  { icon: Code2, label: "React & TypeScript", desc: "Frontend modern development" },
  { icon: Server, label: "Hono & Workers", desc: "Edge-ready backend" },
  { icon: Database, label: "Turso & Drizzle", desc: "Type-safe database" },
  { icon: Palette, label: "Tailwind CSS", desc: "Utility-first styling" },
  { icon: Terminal, label: "Vite", desc: "Fast build tooling" },
  { icon: Globe, label: "REST API Design", desc: "Clean API architecture" },
];

const experiences = [
  { title: "Fullstack Developer", company: "Freelance", period: "2023 - Sekarang", desc: "Membangun berbagai aplikasi web..." },
  { title: "Frontend Developer", company: "Tech Startup", period: "2021 - 2023", desc: "Mengembangkan UI/UX untuk produk SaaS..." },
  { title: "Junior Web Developer", company: "Digital Agency", period: "2019 - 2021", desc: "Membuat website responsif dan landing page..." },
];

export default function About() {
  return (
    <div className="min-h-screen py-12 animate-fade-from-abyss">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-heading text-3xl sm:text-[2.25rem] font-bold tracking-[0.05em] text-arcane-500 mb-4">
            Tentang Saya
          </h1>
          <p className="text-arcane-300/60 max-w-xl mx-auto font-body">
            Seorang developer yang passionate dalam membangun aplikasi web modern.
          </p>
        </div>
        <section className="mb-16">
          <div className="rounded-xl border border-arcane-900/50 bg-card p-8 shadow-sm hover:shadow-lg hover:border-arcane-700 transition-all duration-300">
            <h2 className="font-heading text-xl sm:text-[1.875rem] font-semibold tracking-[0.03em] text-arcane-400 mb-4">
              Profil
            </h2>
            <div className="space-y-3 text-arcane-300/70 font-body leading-relaxed">
              <p>Saya adalah seorang fullstack developer dengan pengalaman lebih dari 5 tahun...</p>
              <p>Spesialisasi saya berada pada ekosistem React dan TypeScript...</p>
              <p>Ketika tidak sedang coding, saya menulis blog teknologi...</p>
            </div>
          </div>
        </section>
        <section className="mb-16">
          <h2 className="font-heading text-xl sm:text-[1.875rem] font-semibold tracking-[0.03em] text-arcane-400 mb-6">
            Tech Stack
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div key={skill.label} className="flex items-start gap-4 rounded-lg border border-arcane-900/50 bg-card p-4 hover:shadow-md hover:border-arcane-700 transition-all duration-200">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-arcane-500/10 flex-shrink-0">
                  <skill.icon className="h-5 w-5 text-arcane-500" />
                </div>
                <div>
                  <h3 className="font-heading font-medium text-sm tracking-[0.02em] text-arcane-300">{skill.label}</h3>
                  <p className="text-xs text-arcane-300/60 font-body">{skill.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="font-heading text-xl sm:text-[1.875rem] font-semibold tracking-[0.03em] text-arcane-400 mb-6">
            Pengalaman Kerja
          </h2>
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <div key={i} className="relative pl-8 border-l-2 border-arcane-800/50 last:border-0">
                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-arcane-800 border-2 border-arcane-500" />
                <div className="rounded-lg border border-arcane-900/50 bg-card p-5 -mt-2 hover:shadow-md hover:border-arcane-700 transition-all duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <h3 className="font-heading font-semibold tracking-[0.02em] text-arcane-300">{exp.title}</h3>
                    <span className="text-xs text-arcane-500/80 bg-arcane-950/50 px-2 py-1 rounded-full font-body w-fit">{exp.period}</span>
                  </div>
                  <p className="text-sm text-arcane-500 font-heading tracking-wider mb-2">{exp.company}</p>
                  <p className="text-sm text-arcane-300/60 font-body">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
