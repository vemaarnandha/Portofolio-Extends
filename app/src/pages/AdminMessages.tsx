import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContactMessages, deleteContactMessage, markMessageAsRead, markAllMessagesAsRead } from "@/lib/api";
import { logout, isAuthenticated } from "@/lib/auth";
import type { ContactMessage } from "@/types";
import { Loader2, Trash2, AlertCircle, Mail, ArrowLeft, LogOut, Check, CheckCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminMessages() {
  const navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(true);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    async function checkAuth() {
      const authed = await isAuthenticated();
      if (mounted) {
        if (!authed) navigate("/admin/login");
        else setAuthLoading(false);
      }
    }
    checkAuth();
    return () => { mounted = false; };
  }, [navigate]);

  useEffect(() => {
    if (authLoading) return;
    let mounted = true;
    async function fetchData() {
      try {
        setLoading(true);
        setError("");
        const response = await getContactMessages();
        if (mounted) {
          if (response.success) setMessages(response.data);
          else setError(response.message || "Gagal memuat data");
        }
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchData();
    return () => { mounted = false; };
  }, [authLoading]);

  async function handleMarkRead(id: number) {
    const msg = messages.find((m) => m.id === id);
    if (msg?.isRead) return;
    setProcessing(id);
    try {
      const response = await markMessageAsRead(id);
      if (response.success) {
        setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, isRead: true } : m)));
      } else {
        setError(response.message || "Gagal menandai pesan");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setProcessing(null);
    }
  }

  async function handleMarkAllRead() {
    if (!confirm("Tandai semua pesan sebagai sudah dibaca?")) return;
    setLoading(true);
    try {
      const response = await markAllMessagesAsRead();
      if (response.success) {
        setMessages((prev) => prev.map((m) => ({ ...m, isRead: true })));
      } else {
        setError(response.message || "Gagal menandai semua pesan");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Apakah Anda yakin ingin menghapus pesan ini?")) return;
    setProcessing(id);
    try {
      const response = await deleteContactMessage(id);
      if (response.success) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      } else {
        setError(response.message || "Gagal menghapus");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setProcessing(null);
    }
  }

  if (authLoading || loading) return (
    <div className="page-main flex min-h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-arcane-500" />
    </div>
  );

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="page-main min-h-screen py-8 animate-fade-from-abyss">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard" className="p-2 rounded-full hover:bg-arcane-900/50 text-arcane-400 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="font-heading text-2xl font-bold tracking-[0.05em] text-arcane-500">Pesan Kontak</h1>
              <p className="text-sm text-arcane-300/60 font-body">Kotak masuk: {unreadCount} pesan belum dibaca</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={handleMarkAllRead} className="inline-flex items-center gap-2 rounded-lg border border-arcane-700 px-4 py-2 text-sm font-heading tracking-wider text-arcane-300 hover:bg-arcane-900/50 transition-all">
              <CheckCheck className="h-4 w-4" /> Tandai Semua Dibaca
            </button>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-lg border border-blood-500/30 px-4 py-2 text-sm font-heading tracking-wider text-blood-500 hover:bg-blood-500/10 transition-all">
              <LogOut className="h-4 w-4" /> Keluar
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-blood-500/20 bg-blood-500/10 p-4 text-sm text-blood-500">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />{error}
          </div>
        )}

        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-arcane-900/50 bg-void-900 py-16 text-center">
            <Mail className="h-12 w-12 text-arcane-700/50 mb-4" />
            <h3 className="font-heading text-lg font-semibold tracking-[0.02em] text-arcane-300 mb-2">Belum Ada Pesan</h3>
          </div>
        ) : (
          <div className="grid gap-6">
            {messages.map((item) => (
              <div key={item.id} className={`rounded-xl border p-6 transition-all duration-300 ${item.isRead ? "border-arcane-900/50 bg-void-900/50" : "border-arcane-700 bg-void-900 shadow-glow"}`}>
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4" onClick={() => handleMarkRead(item.id)}>
                  <div className="space-y-1 cursor-pointer">
                    <h3 className="font-heading text-lg text-arcane-300 flex items-center gap-2">
                      {!item.isRead && <span className="h-2 w-2 rounded-full bg-enchant-500" />}
                      {item.subject}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-arcane-500">
                      <span className="font-medium text-arcane-400">Dari: {item.name} ({item.email})</span>
                      <span>Diterima: {new Date(item.createdAt).toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!item.isRead && (
                      <button onClick={() => handleMarkRead(item.id)} className="inline-flex items-center gap-1 rounded-md border border-arcane-700 px-3 py-1.5 text-xs font-heading tracking-wider text-arcane-400 hover:bg-arcane-700 hover:text-void-950 transition-all">
                        <Check className="h-3.5 w-3.5" /> Tandai Dibaca
                      </button>
                    )}
                    <button onClick={() => handleDelete(item.id)} disabled={processing === item.id} className="inline-flex items-center gap-1 rounded-md border border-blood-500/30 px-3 py-1.5 text-xs font-heading tracking-wider text-blood-500 hover:bg-blood-500/10 transition-all">
                      {processing === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                      Hapus
                    </button>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-arcane-950/30 border border-arcane-900/30">
                  <p className="text-sm text-arcane-300/80 font-body whitespace-pre-wrap leading-relaxed">{item.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
