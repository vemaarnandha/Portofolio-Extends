import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError("");
    if (!form.name || !form.email || !form.message) {
      setError("Nama, email, dan pesan wajib diisi."); return;
    }
    setSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSending(false); setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <div className="min-h-screen py-12 animate-fade-from-abyss">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl sm:text-[2.25rem] font-bold tracking-[0.05em] text-arcane-500 mb-4">
            Hubungi Saya
          </h1>
          <p className="text-arcane-300/60 max-w-xl mx-auto font-body">
            Punya ide project atau ingin berkolaborasi? Jangan ragu untuk menghubungi saya.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="rounded-xl border border-arcane-900/50 bg-card p-6 hover:shadow-lg hover:border-arcane-700 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-arcane-500/10 flex-shrink-0">
                  <Mail className="h-5 w-5 text-arcane-500" />
                </div>
                <div>
                  <h3 className="font-heading font-medium text-sm tracking-[0.02em] text-arcane-300 mb-1">Email</h3>
                  <p className="text-sm text-arcane-300/60 font-body">kologes4@gmail.com.com</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-arcane-900/50 bg-card p-6 hover:shadow-lg hover:border-arcane-700 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-arcane-500/10 flex-shrink-0">
                  <Phone className="h-5 w-5 text-arcane-500" />
                </div>
                <div>
                  <h3 className="font-heading font-medium text-sm tracking-[0.02em] text-arcane-300 mb-1">Telepon</h3>
                  <p className="text-sm text-arcane-300/60 font-body">+62 819-1663-5780</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-arcane-900/50 bg-card p-6 hover:shadow-lg hover:border-arcane-700 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-arcane-500/10 flex-shrink-0">
                  <MapPin className="h-5 w-5 text-arcane-500" />
                </div>
                <div>
                  <h3 className="font-heading font-medium text-sm tracking-[0.02em] text-arcane-300 mb-1">Lokasi</h3>
                  <p className="text-sm text-arcane-300/60 font-body">Blitar, Jatim, Indonesia</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-arcane-900/50 bg-card p-6 sm:p-8 shadow-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="h-12 w-12 text-eldritch-500 mb-4" />
                  <h3 className="font-heading text-lg font-semibold tracking-[0.02em] text-arcane-300 mb-2">Pesan Terkirim!</h3>
                  <p className="text-sm text-arcane-300/60 font-body mb-6">Terima kasih telah menghubungi saya. Saya akan membalas secepat mungkin.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 rounded-lg bg-arcane-500 px-4 py-2 text-sm font-heading tracking-wider text-void-950 hover:bg-arcane-400 hover:shadow-glow transition-all duration-200 active:scale-[0.97]"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="flex items-center gap-2 rounded-lg border border-blood-500/20 bg-blood-500/10 p-3 text-sm text-blood-500">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />{error}
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-heading tracking-wider text-arcane-300">Nama <span className="text-blood-500">*</span></label>
                      <input
                        id="name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-md border border-arcane-900 bg-void-900 px-3 py-2 text-sm text-arcane-200 placeholder:text-arcane-700 focus:outline-none focus:ring-2 focus:ring-rift-400 focus:border-arcane-500 focus:shadow-glow transition-all duration-200"
                        placeholder="Nama lengkap"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-heading tracking-wider text-arcane-300">Email <span className="text-blood-500">*</span></label>
                      <input
                        id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-md border border-arcane-900 bg-void-900 px-3 py-2 text-sm text-arcane-200 placeholder:text-arcane-700 focus:outline-none focus:ring-2 focus:ring-rift-400 focus:border-arcane-500 focus:shadow-glow transition-all duration-200"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-heading tracking-wider text-arcane-300">Subjek</label>
                    <input
                      id="subject" type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full rounded-md border border-arcane-900 bg-void-900 px-3 py-2 text-sm text-arcane-200 placeholder:text-arcane-700 focus:outline-none focus:ring-2 focus:ring-rift-400 focus:border-arcane-500 focus:shadow-glow transition-all duration-200"
                      placeholder="Subjek pesan"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-heading tracking-wider text-arcane-300">Pesan <span className="text-blood-500">*</span></label>
                    <textarea
                      id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-md border border-arcane-900 bg-void-900 px-3 py-2 text-sm text-arcane-200 placeholder:text-arcane-700 focus:outline-none focus:ring-2 focus:ring-rift-400 focus:border-arcane-500 focus:shadow-glow transition-all duration-200 resize-none"
                      placeholder="Tulis pesan Anda di sini..."
                    />
                  </div>
                  <button
                    type="submit" disabled={sending}
                    className="inline-flex items-center gap-2 rounded-lg bg-arcane-500 px-6 py-2.5 text-sm font-heading tracking-wider font-semibold text-void-950 hover:bg-arcane-400 hover:shadow-glow active:scale-[0.97] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <><div className="h-4 w-4 animate-spin rounded-full border-2 border-void-950/30 border-t-void-950" /> Mengirim...</>
                    ) : (<><Send className="h-4 w-4" /> Kirim Pesan</>)}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
