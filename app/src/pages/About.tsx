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
  {
    title: "Fullstack Developer",
    company: "Freelance",
    period: "2023 - Sekarang",
    desc: "Membangun berbagai aplikasi web untuk klien dari berbagai industri menggunakan stack teknologi modern.",
  },
  {
    title: "Frontend Developer",
    company: "Tech Startup",
    period: "2021 - 2023",
    desc: "Mengembangkan UI/UX untuk produk SaaS dengan fokus pada performa dan aksesibilitas.",
  },
  {
    title: "Junior Web Developer",
    company: "Digital Agency",
    period: "2019 - 2021",
    desc: "Membuat website responsif dan landing page untuk berbagai brand lokal dan nasional.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold mb-4">Tentang Saya</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Seorang developer yang passionate dalam membangun aplikasi web modern dengan fokus pada kualitas kode dan pengalaman pengguna.
          </p>
        </div>

        {/* Bio */}
        <section className="mb-16">
          <div className="rounded-xl border bg-card p-8">
            <h2 className="text-xl font-semibold mb-4">Profil</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Saya adalah seorang fullstack developer dengan pengalaman lebih dari 5 tahun dalam membangun aplikasi web. Saya percaya bahwa kode yang baik adalah kode yang mudah dibaca, di-maintain, dan scalable.
              </p>
              <p>
                Spesialisasi saya berada pada ekosistem React dan TypeScript, dengan keahlian dalam membangun backend yang efisien menggunakan Hono dan Cloudflare Workers. Saya senang belajar teknologi baru dan selalu mencari cara untuk meningkatkan kualitas pekerjaan saya.
              </p>
              <p>
                Ketika tidak sedang coding, saya menulis blog teknologi, berkontribusi pada proyek open-source, dan berbagi pengetahuan dengan komunitas developer.
              </p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6">Tech Stack</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.label}
                className="flex items-start gap-4 rounded-lg border bg-card p-4 hover:shadow-sm transition-shadow"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                  <skill.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{skill.label}</h3>
                  <p className="text-xs text-muted-foreground">{skill.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Pengalaman Kerja</h2>
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="relative pl-8 border-l-2 border-primary/20 last:border-0"
              >
                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary/20 border-2 border-primary" />
                <div className="rounded-lg border bg-card p-5 -mt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <h3 className="font-semibold">{exp.title}</h3>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full w-fit">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-primary font-medium mb-2">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
