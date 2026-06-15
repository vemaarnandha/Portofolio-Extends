import { Link } from "react-router-dom";
import { ArrowRight, Layers, Zap, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background pt-20 pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium text-primary mb-8 animate-fade-in">
            <Zap className="mr-1 h-3 w-3" />
            Fullstack Developer
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Halo, Saya <span className="text-primary">Developer</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10 leading-relaxed">
            Saya membangun aplikasi web modern yang cepat, responsif, dan scalable.
            Dari konsep hingga deployment, saya menghadirkan solusi digital terbaik.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90 transition-all"
            >
              Lihat Project
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-all"
            >
              Hubungi Saya
            </Link>
          </div>
        </div>
      </section>

      {/* Features / Skills */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Keahlian Saya</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Kombinasi teknologi modern dan best practices untuk menghasilkan kode berkualitas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Frontend Development</h3>
              <p className="text-sm text-muted-foreground">
                React, TypeScript, Tailwind CSS, dan Vite untuk UI yang responsif dan performant.
              </p>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Backend Development</h3>
              <p className="text-sm text-muted-foreground">
                Hono, Cloudflare Workers, dan tRPC untuk API yang cepat dan type-safe.
              </p>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Database & DevOps</h3>
              <p className="text-sm text-muted-foreground">
                Turso (libSQL), Drizzle ORM, dan deployment otomatis ke edge network.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
