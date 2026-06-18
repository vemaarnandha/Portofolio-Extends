import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/lib/api";
import { LogIn, Loader2, AlertCircle, ArrowLeft } from "lucide-react";
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
    <div className="flex min-h-screen items-center justify-center bg-void-950 px-4">
      <div className="w-full max-w-md animate-fade-from-abyss">
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-arcane-400 hover:text-arcane-300 transition-colors mb-6 font-heading tracking-wider"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
          </Link>
          <h1 className="font-heading text-2xl font-bold tracking-[0.05em] text-arcane-500">Admin Login</h1>
          <p className="text-sm text-arcane-300/60 font-body mt-1">Masuk untuk mengelola portfolio</p>
        </div>
        <div className="rounded-xl border border-arcane-900/50 bg-void-900 p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-blood-500/20 bg-blood-500/10 p-3 text-sm text-blood-500">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />{error}
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-heading tracking-wider text-arcane-300">Email</label>
              <input
                id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-arcane-900 bg-void-950 px-3 py-2 text-sm text-arcane-200 placeholder:text-arcane-700 focus:outline-none focus:ring-2 focus:ring-rift-400 focus:border-arcane-500 focus:shadow-glow transition-all duration-200"
                placeholder="Masukan alamat email."
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-heading tracking-wider text-arcane-300">Password</label>
              <input
                id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-arcane-900 bg-void-950 px-3 py-2 text-sm text-arcane-200 placeholder:text-arcane-700 focus:outline-none focus:ring-2 focus:ring-rift-400 focus:border-arcane-500 focus:shadow-glow transition-all duration-200"
                placeholder="Masukan Password"
              />
            </div>
            <button
              type="submit" disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-arcane-500 px-4 py-2.5 text-sm font-heading tracking-wider font-semibold text-void-950 hover:bg-arcane-400 hover:shadow-glow active:scale-[0.97] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Memproses...</> : <><LogIn className="h-4 w-4" /> Masuk</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
