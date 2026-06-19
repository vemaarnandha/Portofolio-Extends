import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { sendContactMessage } from "@/lib/api";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", honeypot: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError("");
    if (!form.name || !form.email || !form.message) {
      setError("Nama, email, dan pesan wajib diisi."); return;
    }
    setSending(true);
    try {
      const response = await sendContactMessage(form);
      if (response.success) {
        setSubmitted(true);
        setForm({ name: "", email: "", subject: "", message: "", honeypot: "" });
        toast.success("Pesan berhasil dikirim! Saya akan membalas segera.");
      } else {
        setError(response.message || "Gagal mengirim pesan.");
        toast.error(response.message || "Gagal mengirim pesan. Silakan coba lagi.");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan server";
      setError(msg);
      toast.error(msg || "Gagal mengirim pesan. Silakan coba lagi.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="page-main min-h-screen py-24 relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 animate-fade-from-abyss">
          <div className="inline-flex items-center gap-2 rounded-full bg-arcane-500/10 px-4 py-1.5 text-xs font-body tracking-wider text-arcane-400 mb-6 uppercase border border-arcane-500/20">
            <Sparkles className="h-3 w-3" /> Hubungi
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-arcane-100 mb-6">
            Hubungi <span className="text-gradient">Saya</span>
          </h1>
          <p className="text-arcane-300/70 max-w-xl mx-auto font-body text-lg">
            Punya ide besar atau sekadar ingin bertukar ide? Saya siap.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Bento */}
          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: "kologes4@gmail.com", delay: "0ms" },
              { icon: Phone, label: "Telepon", value: "+62 819-1663-5780", delay: "100ms" },
              { icon: MapPin, label: "Lokasi", value: "Blitar, Jatim, Indonesia", delay: "200ms" },
            ].map((info) => (
              <div key={info.label} className="glass-card p-6 rounded-2xl animate-fade-from-abyss group hover:-translate-y-1 transition-all duration-300" style={{ animationDelay: info.delay }}>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-arcane-500/10 flex items-center justify-center text-arcane-400 group-hover:bg-arcane-500 group-hover:text-void-950 transition-all duration-300">
                    <info.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-body tracking-wider text-arcane-500 uppercase">{info.label}</h3>
                    <p className="text-sm text-arcane-100 font-body mt-1">{info.value}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Availability Box */}
            <div className="glass-card p-8 rounded-3xl bg-arcane-500/5 border-arcane-500/20 animate-fade-from-abyss [animation-delay:300ms]">
              <div className="flex items-center gap-3 mb-4 text-eldritch-400">
                <div className="h-2.5 w-2.5 rounded-full bg-eldritch-500 animate-breath shadow-glow" />
                <span className="text-xs font-mono tracking-wider uppercase">Sedang Aktif</span>
              </div>
              <p className="text-sm text-arcane-300/70 font-body leading-relaxed">
                Saya biasanya membalas dalam waktu <span className="text-arcane-100">24 jam</span>. Mari kita diskusi.
              </p>
            </div>
          </div>

          {/* Contact Form Glass Box */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8 sm:p-10 rounded-3xl animate-fade-from-abyss [animation-delay:400ms]">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="h-20 w-20 rounded-full bg-eldritch-500/10 flex items-center justify-center text-eldritch-500 mb-8 border border-eldritch-500/20">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-arcane-100 mb-4">Pesan Terkirim!</h3>
                  <p className="text-arcane-300/70 font-body mb-8 max-w-sm">Pesan Anda sudah diterima. Saya akan segera merespons.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="rounded-xl bg-arcane-500 px-8 py-3 text-sm font-body font-bold tracking-wider text-void-950 hover:bg-arcane-400 transition-all shadow-glow active:scale-95"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="hidden">
                    <input type="text" name="honeypot" value={form.honeypot} onChange={(e) => setForm({ ...form, honeypot: e.target.value })} tabIndex={-1} autoComplete="off" />
                  </div>

                  {error && (
                    <div className="flex items-center gap-3 rounded-xl border border-blood-500/20 bg-blood-500/5 p-4 text-sm text-blood-400">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />{error}
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-body tracking-wider text-arcane-500 uppercase ml-1">Nama</label>
                      <input
                        type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-xl border border-arcane-900 bg-void-950/50 px-4 py-3 text-sm text-arcane-100 focus:outline-none focus:border-arcane-500 focus:ring-1 focus:ring-arcane-500/30 transition-all duration-300"
                        placeholder="Nama Anda"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-body tracking-wider text-arcane-500 uppercase ml-1">Email</label>
                      <input
                        type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-xl border border-arcane-900 bg-void-950/50 px-4 py-3 text-sm text-arcane-100 focus:outline-none focus:border-arcane-500 focus:ring-1 focus:ring-arcane-500/30 transition-all duration-300"
                        placeholder="email@anda.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-body tracking-wider text-arcane-500 uppercase ml-1">Subjek</label>
                    <input
                      type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full rounded-xl border border-arcane-900 bg-void-950/50 px-4 py-3 text-sm text-arcane-100 focus:outline-none focus:border-arcane-500 focus:ring-1 focus:ring-arcane-500/30 transition-all duration-300"
                      placeholder="Tentang apa pesan ini?"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-body tracking-wider text-arcane-500 uppercase ml-1">Pesan</label>
                    <textarea
                      rows={6} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-xl border border-arcane-900 bg-void-950/50 px-4 py-3 text-sm text-arcane-100 focus:outline-none focus:border-arcane-500 focus:ring-1 focus:ring-arcane-500/30 transition-all duration-300 resize-none"
                      placeholder="Tulis pesan Anda di sini..."
                    />
                  </div>

                  <button
                    type="submit" disabled={sending}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl bg-arcane-500 px-10 py-4 text-sm font-body font-bold tracking-wider text-void-950 hover:bg-arcane-400 hover:shadow-arcane transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group active:scale-95"
                  >
                    {sending ? (
                      <><div className="h-4 w-4 animate-spin rounded-full border-2 border-void-950/30 border-t-void-950" /> Mengirim...</>
                    ) : (<><Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Kirim Pesan</>)}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Background Orbs */}
      <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-arcane-500/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-enchant-500/5 rounded-full blur-[120px] -z-10" />
    </div>
  );
}
