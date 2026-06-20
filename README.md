# Portfolio Full-Stack Application

Aplikasi portfolio personal full-stack dengan React frontend (Vercel) dan Hono backend (Cloudflare Workers).

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | React 19 + TypeScript + Vite + Tailwind CSS |
| UI Components | shadcn/ui (new-york style) + Lucide icons |
| Backend | Hono + Cloudflare Workers |
| Database | Supabase (PostgreSQL) via `@supabase/supabase-js` |
| Storage | Supabase Storage (bucket `project-images`) |
| Auth | JWT manual (`jose`) + PBKDF2 password hashing |
| Routing | React Router v7 (BrowserRouter) |
| Forms | React Hook Form + Zod validation |
| Theme | `next-themes` (dark/light mode) |
| Animations | `framer-motion` + Tailwind CSS custom animations |

## Fitur

### Publik
- **Home** — Hero section, Bento Grid skills (Frontend, Backend, Database, Performance), Testimonials
- **Projects** — Portfolio grid dengan tag-based filtering, skeleton loading, link GitHub repo
- **About** — Profil, tech stack grid, pengalaman kerja, tombol unduh CV
- **Contact** — Form kontak dengan honeypot spam protection & toast notifications

### Admin (Protected)
- **/admin/login** — Login form dengan JWT
- **/admin/dashboard** — Tabel CRUD portfolio + badge jumlah pesan belum dibaca
- **/admin/messages** — Daftar pesan masuk dengan status read/unread, mark-read per pesan, mark-all-read
- **/admin/portfolio/new** — Form tambah portfolio (drag-drop upload gambar, input repo URL)
- **/admin/portfolio/:id/edit** — Form edit portfolio (drag-drop upload gambar, input repo URL)

### Fitur Tambahan
- **Dark/Light Mode** — Theme toggle di navbar, default dark
- **Scroll Progress Bar** — Progress bar 2px di atas navbar
- **Discord Webhook** — Notifikasi otomatis ke Discord saat ada pesan kontak baru
- **Image Upload** — Drag-and-drop dengan preview, validasi client-side (10MB max, JPEG/PNG/WebP/GIF)
- **Custom Design System** — Dark Fantasy Purple aesthetic, glassmorphism, gradient text, custom animations

## Struktur Folder

```
project-portofolio/
├── app/                        # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx      # Fixed navbar + scroll progress bar
│   │   │   ├── Footer.tsx      # Footer + social links
│   │   │   ├── ThemeToggle.tsx # Dark/light mode toggle
│   │   │   ├── SkeletonCard.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── ui/             # 43 shadcn/ui components
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── AdminLogin.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminMessages.tsx
│   │   │   └── PortfolioForm.tsx
│   │   ├── hooks/
│   │   │   └── use-mobile.ts
│   │   ├── lib/
│   │   │   ├── api.ts          # API client
│   │   │   ├── auth.ts         # Auth utilities
│   │   │   └── utils.ts        # cn() helper
│   │   ├── types/
│   │   │   └── index.ts        # TypeScript interfaces
│   │   ├── App.tsx             # Router
│   │   └── main.tsx            # Entry point
│   ├── .env.example
│   ├── .env.production         # VITE_API_URL kosong (relative URLs)
│   ├── vite.config.ts
│   └── package.json
│
└── backend/                    # Backend (Hono + Workers)
    ├── src/
    │   ├── routes/
    │   │   ├── auth.ts         # Login, logout, refresh, me
    │   │   ├── portfolio.ts    # CRUD + upload image
    │   │   └── contact.ts      # Submit, list, mark read, delete
    │   ├── db/
    │   │   └── schema.ts       # TypeScript type definitions
    │   ├── lib/
    │   │   ├── auth-middleware.ts
    │   │   ├── jwt.ts
    │   │   ├── password.ts     # PBKDF2 hashing
    │   │   ├── session.ts
    │   │   └── supabase.ts
    │   ├── types/
    │   │   └── env.ts          # Environment Bindings
    │   └── index.ts            # Hono app entry
    ├── scripts/
    │   ├── gen-hash.ts         # PBKDF2 hash generator (TypeScript)
    │   └── gen-hash.mjs        # PBKDF2 hash generator (JavaScript)
    ├── supabase-setup.sql      # Database schema
    ├── wrangler.toml
    └── package.json
```

## Backend Endpoints

| Method | Endpoint | Auth | Keterangan |
|--------|----------|------|------------|
| GET | `/` | Public | Health check |
| POST | `/api/auth/login | Public | Login admin, set cookie |
| POST | `/api/auth/refresh | Cookie | Refresh JWT |
| POST | `/api/auth/logout | Cookie | Logout & hapus session |
| GET | `/api/auth/me | Bearer | Cek session valid |
| GET | `/api/portfolio | Public | List semua portfolio |
| GET | `/api/portfolio/:id | Public | Detail portfolio |
| POST | `/api/portfolio | Bearer | Tambah portfolio |
| PUT | `/api/portfolio/:id | Bearer | Update portfolio |
| DELETE | `/api/portfolio/:id | Bearer | Hapus portfolio |
| POST | `/api/portfolio/upload-image | Bearer | Upload gambar (multipart) |
| DELETE | `/api/portfolio/:id/image | Bearer | Hapus gambar dari storage |
| POST | `/api/contact | Public | Kirim pesan (honeypot protection) |
| GET | `/api/contact | Bearer | List semua pesan |
| PUT | `/api/contact/read/:id | Bearer | Tandai pesan sudah dibaca |
| PUT | `/api/contact/read-all | Bearer | Tandai semua pesan sudah dibaca |
| DELETE | `/api/contact/:id | Bearer | Hapus pesan |

Response format: `{ success: boolean, data: any, message: string }`

## Database Schema

4 tabel (Semua RLS dimatikan, auth via JWT middleware):

- **portfolio** — id, nama_project, photo_url, jobdesk, deskripsi, repo_url, created_at
- **admin_users** — id, email, password_hash, created_at
- **admin_sessions** — id, user_id, refresh_token, user_agent, ip_address, expires_at, created_at, last_active_at
- **contacts** — id, name, email, subject, message, is_read, created_at

## Setup & Development

### 1. Clone & Install Frontend

```bash
cd app
npm install
cp .env.example .env.local
# Edit .env.local — isi VITE_API_URL dengan URL backend
npm run dev     # http://localhost:5173
```

### 2. Setup Supabase Database

1. **Buat project** di https://supabase.com
2. **SQL Editor** → jalankan `backend/supabase-setup.sql` untuk membuat semua tabel
3. **Project Settings → API** — catat `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE`
4. **Storage** — Buat bucket `project-images` (public) dengan policy SELECT (public) dan INSERT (authenticated)

### 3. Generate Password Hash

```bash
cd backend
npm run gen-hash              # default: admin123
npx tsx scripts/gen-hash.ts mypassword   # custom password
# Copy hash, lalu INSERT ke Supabase SQL Editor
```

### 4. Setup Backend

```bash
cd backend
npm install
cp .env.example .dev.vars
# Edit .dev.vars dengan credentials Supabase
npm run dev      # http://localhost:8787
```

### Environment Variables

**Backend (`backend/.dev.vars` untuk local, `wrangler secret put` untuk production):**

| Variable | Keterangan |
|----------|------------|
| `SUPABASE_URL` | Project URL dari Supabase |
| `SUPABASE_ANON_KEY` | Anon public key |
| `SUPABASE_SERVICE_ROLE` | Service role key (RAHASIA, jangan expo ke frontend) |
| `JWT_SECRET` | Minimal 32 karakter |
| `DISCORD_WEBHOOK_URL` | URL webhook Discord untuk notifikasi pesan |
| `CORS_ORIGIN` | Domain frontend (public var di wrangler.toml) |

**Frontend (`app/.env.local`):**

| Variable | Keterangan |
|----------|------------|
| `VITE_API_URL` | URL backend (localhost:8787 untuk dev, kosong untuk production) |

> **Note:** Di production, `VITE_API_URL` dikosongkan supaya frontend menggunakan relative URLs. Vercel rewrite rule mengarahkan `/api/*` ke backend Workers.

## Deployment

> **Urutan deploy:** Supabase → Backend (Workers) → Frontend (Vercel).

---

### A. Persiapan

| Platform | Keperluan |
|----------|-----------|
| **Supabase** | Database + Storage |
| **Cloudflare** | Backend hosting (Workers) |
| **Vercel** | Frontend hosting |

### B. Deploy Backend

```bash
cd backend

# Login Cloudflare
npx wrangler login

# Set secrets (sekali saja)
npx wrangler secret put JWT_SECRET
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_ANON_KEY
npx wrangler secret put SUPABASE_SERVICE_ROLE
npx wrangler secret put DISCORD_WEBHOOK_URL

# Update CORS_ORIGIN di wrangler.toml sesuai domain Vercel
# Deploy
npm run deploy
```

### C. Deploy Frontend

**Opsi 1 — Vercel CLI:**

```bash
cd app
npm run build
npx vercel --prod
npx vercel env add VITE_API_URL production    # isi URL backend Workers
npx vercel --prod                              # re-deploy
```

**Opsi 2 — GitHub (auto-deploy):**

Push ke GitHub → Import di Vercel → Set env var `VITE_API_URL` → Deploy.

### D. Finalisasi CORS

Update `CORS_ORIGIN` di `backend/wrangler.toml` dengan domain Vercel production, lalu `npm run deploy` ulang.

## Default Credentials

| Email | Password |
|-------|----------|
| admin@portfolio.com | admin123 |

> Ganti password default segera setelah login pertama!

## Commands Reference

| Command | Lokasi | Keterangan |
|---------|--------|------------|
| `npm run dev` | `app/` | Dev server frontend (port 5173, proxy /api → 8787) |
| `npm run build` | `app/` | Build production (tsc + vite build) |
| `npm run lint` | `app/` | ESLint |
| `npm run dev` | `backend/` | Dev server backend via wrangler (port 8787) |
| `npm run deploy` | `backend/` | Deploy ke Cloudflare Workers |
| `npm run gen-hash` | `backend/` | Generate PBKDF2 hash (default: admin123) |
| `npx wrangler tail` | `backend/` | Lihat logs backend |

## Keamanan

- Jangan commit file `.env`, `.dev.vars`, atau secret lainnya ke repository
- `SUPABASE_SERVICE_ROLE` hanya di backend — tidak pernah di-ekspose ke frontend
- Session token disimpan di HTTP-only cookie (aman dari XSS)
- Honeypot field di contact form untuk proteksi spam
- PBKDF2 (16-byte salt, 100k iterasi SHA-256) untuk password hashing

## Troubleshooting

| Masalah | Penyebab | Solusi |
|---------|----------|--------|
| `ServiceError: 10007` | Secrets belum diset | Jalankan `npx wrangler secret put ...` |
| Login gagal | Admin user belum dibuat | Jalankan INSERT di Supabase SQL Editor |
| Upload gambar error | Bucket belum dibuat | Buat bucket di Supabase Storage |
| CORS error | `CORS_ORIGIN` salah | Update wrangler.toml, re-deploy |
| Halaman kosong | `VITE_API_URL` salah | Cek env var, test backend langsung |
| Cookie tidak tersimpan | Beda domain | Pastikan CORS + `credentials: include` benar |
