import { useEffect, useState } from "react";
import { getTestimonials } from "@/lib/api";
import type { Testimonial } from "@/types";
import { Quote } from "lucide-react";

const fallbackTestimonials: Testimonial[] = [
  {
    id: 0,
    name: "Budi Santoso",
    role: "Pemilik Toko Online",
    content: "Website yang dibuat sangat responsif dan mudah digunakan. Pelanggan saya jadi lebih mudah menemukan produk. Komunikasi selama pengerjaan juga sangat baik.",
    initials: "BS",
    createdAt: "",
  },
  {
    id: 0,
    name: "Rina Kusuma",
    role: "Mahasiswa Universitas Brawijaya",
    content: "Membantu saya membuat website portofolio yang terlihat profesional. Hasilnya melebihi ekspektasi dan selesai tepat waktu.",
    initials: "RK",
    createdAt: "",
  },
  {
    id: 0,
    name: "Ahmad Fauzi",
    role: "Koordinator PKL, Arre Tech",
    content: "Menunjukkan kemampuan teknis yang solid dan kemauan belajar yang tinggi. Kode yang ditulis bersih dan terstruktur dengan baik.",
    initials: "AF",
    createdAt: "",
  }
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    let mounted = true;
    async function fetchTestimonials() {
      try {
        const response = await getTestimonials();
        if (mounted && response.success && response.data.length > 0) {
          setTestimonials(response.data);
        } else if (mounted) {
          setTestimonials(fallbackTestimonials);
        }
      } catch {
        if (mounted) setTestimonials(fallbackTestimonials);
      }
    }
    fetchTestimonials();
    return () => { mounted = false; };
  }, []);

  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-sm tracking-[0.3em] text-arcane-500 uppercase mb-4">Apa Kata Mereka</h2>
          <h3 className="font-heading text-3xl sm:text-5xl font-bold text-center text-arcane-100 tracking-tight">Klien &amp; Rekan yang Pernah Bekerja Sama</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={t.id || i} className="glass-card p-8 rounded-2xl animate-fade-from-abyss" style={{ animationDelay: `${i * 100}ms` }}>
              <Quote className="h-8 w-8 text-arcane-500/30 mb-4" />
              <p className="text-arcane-300/70 font-body text-sm leading-relaxed mb-6">{t.content}</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-arcane-500 flex items-center justify-center text-void-950 font-heading text-xs font-bold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-body font-bold text-arcane-100">{t.name}</p>
                  <p className="text-xs text-arcane-400 font-body">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
