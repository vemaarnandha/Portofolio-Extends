# Portfolio Full-Stack Application

Aplikasi portfolio personal full-stack dengan React frontend (Vercel) dan Hono backend (Cloudflare Workers).

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | React 19 + TypeScript + Vite + Tailwind CSS |
| Backend | Hono + Cloudflare Workers |
| Database | Supabase (PostgreSQL) via @supabase/supabase-js |
| Storage | Supabase Storage (bucket `project-images`) |
| Auth | JWT manual (jose) + PBKDF2 password hashing |

## Struktur Folder

```
/mnt/agents/output/
├── app/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # Navbar, Footer, UI components
│   │   │   └── ui/         # ImageUploadField & UI components
│   │   ├── pages/          # Home, Projects, About, Contact, Admin
│   │   ├── lib/            # API client, Auth utilities
│   │   ├── types/          # TypeScript interfaces
│   │   ├── App.tsx         # Router
│   │   └── main.tsx        # Entry point
│   ├── .env.example
│   └── package.json
│
└── backend/                # Backend (Hono + Workers)
    ├── src/
    │   ├── routes/         # Auth & Portfolio routes
    │   ├── db/             # Type definitions (Portfolio, AdminUser)
    │   ├── lib/            # JWT, Session, Password, Supabase utils
    │   ├── types/          # Environment types
    │   └── index.ts        # Hono app entry
    ├── supabase-setup.sql  # Schema & seed SQL
    ├── wrangler.toml
    └── package.json
```

## Fitur

### Publik
- **Home** - Hero section dengan intro dan keahlian
- **Projects** - Grid kartu portfolio (fetch dari API)
- **About** - Profil, tech stack, dan pengalaman kerja
- **Contact** - Form kontak dengan validasi

### Admin (Protected)
- **/admin/login** - Form login dengan JWT
- **/admin/dashboard** - Tabel CRUD portfolio
- **/admin/portfolio/new** - Form tambah portfolio (dengan upload gambar drag-drop)
- **/admin/portfolio/:id/edit** - Form edit portfolio (dengan upload gambar drag-drop)

## Backend Endpoints

| Method | Endpoint | Auth | Keterangan |
|--------|----------|------|------------|
| POST | /api/auth/login | Public | Login admin (set cookie session) |
| GET | /api/auth/me | Cookie | Cek session valid |
| POST | /api/auth/refresh | Cookie | Refresh token |
| POST | /api/auth/logout | Cookie | Logout & hapus session |
| GET | /api/portfolio | Public | List semua portfolio |
| GET | /api/portfolio/:id | Public | Detail portfolio |
| POST | /api/portfolio | Session | Tambah portfolio |
| PUT | /api/portfolio/:id | Session | Update portfolio |
| DELETE | /api/portfolio/:id | Session | Hapus portfolio |
| POST | /api/portfolio/upload-image | Session | Upload gambar ke Supabase Storage (multipart) |
| DELETE | /api/portfolio/:id/image | Session | Hapus gambar dari storage & null-kan URL |

Response format: `{ success: boolean, data: any, message: string }`

## Setup & Development

### 1. Clone & Install Frontend

```bash
cd app
npm install

# Copy environment
cp .env.example .env.local
# Edit .env.local - isi VITE_API_URL dengan URL backend

# Run development
npm run dev     # http://localhost:5173
```

### 2. Setup Supabase Database

1. **Buat project** di https://supabase.com
2. **SQL Editor** → buka `backend/supabase-setup.sql`, jalankan semua query untuk membuat tabel `portfolio`, `admin_users`, dan `admin_sessions`
3. **Project Settings → API** — catet `Project URL` (SUPABASE_URL) dan `anon public` key (SUPABASE_ANON_KEY)
4. **Setup Storage** — Buat bucket `project-images` untuk upload gambar:

```sql
-- Di Supabase SQL Editor
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true);

-- Public read
CREATE POLICY "Allow public read"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

-- Authenticated write
CREATE POLICY "Allow authenticated upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'project-images' AND
  auth.role() = 'authenticated'
);
```

### 3. Generate Password Hash (untuk seed admin)

```bash
cd backend

# Generate hash untuk password (default: admin123)
npm run gen-hash
# Atau: npx tsx scripts/gen-hash.ts admin123

# Copy output hash, lalu jalankan di Supabase SQL Editor:
# INSERT INTO admin_users (email, password_hash) VALUES ('admin@portfolio.com', 'hash-disini');
```

> Hash di-generate dengan PBKDF2 (16-byte salt, 100,000 iterasi SHA-256) — compatible dengan Cloudflare Workers.

### 4. Setup Backend

```bash
cd backend
npm install

# Copy .dev.vars untuk local development
# Isi dengan SUPABASE_URL, SUPABASE_ANON_KEY, JWT_SECRET dari Supabase dashboard
cp .env.example .dev.vars
# Edit .dev.vars dengan credentials Supabase Anda

# Run development
npm run dev      # http://localhost:8787
```



## Deployment

### Frontend → Vercel

```bash
cd app
npm run build

# Deploy ke Vercel
npx vercel --prod

# Atau push ke GitHub, lalu connect repository di dashboard Vercel
```

**Environment Variables di Vercel:**
- `VITE_API_URL` = URL Cloudflare Workers Anda

### Backend → Cloudflare Workers

```bash
cd backend

# Set secrets (one-time)
npx wrangler secret put JWT_SECRET
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_ANON_KEY
npx wrangler secret put SUPABASE_SERVICE_ROLE

# Update CORS origin di wrangler.toml
# [vars]
# CORS_ORIGIN = "https://your-vercel-app.vercel.app"

# Deploy
npm run deploy
```

### Update CORS

Setelah deploy frontend, update `CORS_ORIGIN` di `wrangler.toml`:

```toml
[vars]
CORS_ORIGIN = "https://portfolio-yourname.vercel.app"
```

Lalu re-deploy backend.

## Default Credentials

| Email | Password |
|-------|----------|
| admin@portfolio.com | admin123 |

> Pastikan untuk mengganti password default setelah login pertama!

## Password Hashing

Menggunakan Web Crypto API (PBKDF2) - kompatibel dengan Cloudflare Workers:
- Salt: 16 bytes random
- Iterations: 100,000
- Hash: SHA-256
- Format: `saltHex:hashHex`

## Catatan Keamanan

1. **Jangan commit** file `.env`, `.dev.vars`, atau `wrangler.toml` yang sudah terisi secret ke repository publik
2. Gunakan `wrangler secret put` untuk production secrets
3. Session token disimpan di **HTTP-only cookie** (aman dari XSS)
4. Ganti password default admin segera setelah setup

## Commands Reference

| Command | Lokasi | Keterangan |
|---------|--------|------------|
| `npm run dev` | app/ | Dev server frontend (port 5173) |
| `npm run build` | app/ | Build production |
| `npm run dev` | backend/ | Dev server backend (port 8787) |
| `npm run deploy` | backend/ | Deploy ke Workers |
