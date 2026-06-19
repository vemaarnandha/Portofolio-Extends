import { useEffect, useState } from "react";
import { getTestimonials, submitTestimonial } from "@/lib/api";
import type { Testimonial } from "@/types";
import { Quote, Send, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

const fallbackTestimonials: Testimonial[] = [
  {
    id: 0,
    name: "Budi Santoso",
    role: "Pemilik Toko Online",
    content: "Website yang dibuat sangat responsif dan mudah digunakan. Pelanggan saya jadi lebih mudah menemukan produk. Komunikasi selama pengerjaan juga sangat baik.",
    initials: "BS",
    isApproved: true,
    createdAt: "",
  },
  {
    id: 0,
    name: "Rina Kusuma",
    role: "Mahasiswa Universitas Brawijaya",
    content: "Membantu saya membuat website portofolio yang terlihat profesional. Hasilnya melebihi ekspektasi dan selesai tepat waktu.",
    initials: "RK",
    isApproved: true,
    createdAt: "",
  },
  {
    id: 0,
    name: "Ahmad Fauzi",
    role: "Koordinator PKL, Arre Tech",
    content: "Menunjukkan kemampuan teknis yang solid dan kemauan belajar yang tinggi. Kode yang ditulis bersih dan terstruktur dengan baik.",
    initials: "AF",
    isApproved: true,
    createdAt: "",
  }
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", content: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.role || !form.content) return;
    setSubmitting(true);
    try {
      const response = await submitTestimonial(form);
      if (response.success) {
        setSubmitted(true);
        setForm({ name: "", role: "", content: "" });
        toast.success("Terima kasih! Testimonial Anda akan ditampilkan setelah disetujui.");
      } else {
        toast.error(response.message || "Gagal mengirim testimonial");
      }
    } catch {
      toast.error("Terjadi kesalahan saat mengirim");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-sm tracking-[0.3em] text-arcane-500 uppercase mb-4">Apa Kata Mereka</h2>
          <h3 className="font-heading text-3xl sm:text-5xl font-bold text-center text-arcane-100 tracking-tight">Klien &amp; Rekan yang Pernah Bekerja Sama</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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

        {/* Submit Testimonial */}
        <div className="text-center">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-arcane-800 bg-void-950/50 backdrop-blur-md px-6 py-3 text-sm font-body tracking-wider text-arcane-300 hover:bg-arcane-900/30 hover:border-arcane-600 transition-all duration-300 active:scale-95"
            >
              <Quote className="h-4 w-4" /> Berikan Testimonial
            </button>
          ) : (
            <div className="max-w-lg mx-auto glass-card p-8 rounded-3xl animate-fade-from-abyss">
              {submitted ? (
                <div className="text-center py-4">
                  <CheckCircle className="h-12 w-12 text-eldritch-500 mx-auto mb-4" />
                  <h4 className="font-heading text-xl font-bold text-arcane-100 mb-2">Terima Kasih!</h4>
                  <p className="text-sm text-arcane-300/70 font-body mb-4">Testimonial Anda telah dikirim dan menunggu persetujuan admin.</p>
                  <button onClick={() => { setSubmitted(false); setShowForm(false); }}
                    className="text-sm text-arcane-400 hover:text-arcane-200 transition-colors font-body">
                    Tutup
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h4 className="font-heading text-lg font-bold text-arcane-100 text-center mb-2">Kirim Testimonial</h4>
                  <div className="space-y-2">
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-arcane-900 bg-void-950/50 px-4 py-3 text-sm text-arcane-100 focus:outline-none focus:border-arcane-500 transition-all"
                      placeholder="Nama Anda" />
                  </div>
                  <div className="space-y-2">
                    <input type="text" required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                      className="w-full rounded-xl border border-arcane-900 bg-void-950/50 px-4 py-3 text-sm text-arcane-100 focus:outline-none focus:border-arcane-500 transition-all"
                      placeholder="Posisi / Perusahaan" />
                  </div>
                  <div className="space-y-2">
                    <textarea rows={4} required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
                      className="w-full rounded-xl border border-arcane-900 bg-void-950/50 px-4 py-3 text-sm text-arcane-100 focus:outline-none focus:border-arcane-500 transition-all resize-none"
                      placeholder="Tulis pengalaman Anda..." />
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setShowForm(false)}
                      className="flex-1 rounded-xl border border-arcane-800 px-4 py-3 text-sm font-body text-arcane-300 hover:bg-arcane-900/30 transition-all">
                      Batal
                    </button>
                    <button type="submit" disabled={submitting}
                      className="flex-1 rounded-xl bg-arcane-500 px-4 py-3 text-sm font-body font-bold text-void-950 hover:bg-arcane-400 transition-all disabled:opacity-50 inline-flex items-center justify-center gap-2">
                      {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      Kirim
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
