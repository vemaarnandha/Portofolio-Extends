import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/lib/api";
import { LogIn, Loader2, AlertCircle, ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError("");
    if (!email || !password) { setError("Email dan password wajib diisi."); return; }
    setLoading(true);
    try {
      const response = await login(email, password);
      if (response.success) {
        navigate("/admin/dashboard");
      } else { setError(response.message || "Login gagal"); }
    } catch (err) { setError(err instanceof Error ? err.message : "Terjadi kesalahan saat login"); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-20 w-[400px] h-[400px] bg-arcane-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 -right-20 w-[400px] h-[400px] bg-enchant-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />

      <div className="w-full max-w-md animate-fade-from-abyss mt-16">
        <div className="mb-8 text-center space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[10px] font-heading tracking-[0.2em] text-arcane-500 hover:text-arcane-300 transition-colors uppercase"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Abyss
          </Link>
          <div className="inline-flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-arcane-500" />
            <h1 className="font-heading text-3xl font-bold tracking-tight text-arcane-100">Sanctum Access</h1>
          </div>
          <p className="text-sm text-arcane-300/60 font-body">Enter credentials to proceed</p>
        </div>

        <div className="glass-card p-8 rounded-3xl border-arcane-800/50 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-3 rounded-xl border border-blood-500/20 bg-blood-500/5 p-4 text-sm text-blood-400">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />{error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-[10px] font-heading tracking-widest text-arcane-500 uppercase ml-1">Essence (Email)</label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-arcane-900 bg-void-950/50 px-4 py-3 text-sm text-arcane-100 focus:outline-none focus:border-arcane-500 focus:ring-1 focus:ring-arcane-500/30 transition-all duration-300"
                placeholder="architect@domain.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-heading tracking-widest text-arcane-500 uppercase ml-1">Sigil (Password)</label>
              <input
                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-arcane-900 bg-void-950/50 px-4 py-3 text-sm text-arcane-100 focus:outline-none focus:border-arcane-500 focus:ring-1 focus:ring-arcane-500/30 transition-all duration-300"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit" disabled={loading}
              className="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-arcane-500 px-8 py-4 text-xs font-heading font-bold tracking-[0.2em] text-void-950 hover:bg-arcane-400 hover:shadow-arcane transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase active:scale-95"
            >
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> VERIFYING...</> : <><LogIn className="h-4 w-4" /> AUTHENTICATE</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
