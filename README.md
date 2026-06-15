# Portfolio Full-Stack Application

Aplikasi portfolio personal full-stack dengan React frontend (Vercel) dan Hono backend (Cloudflare Workers).

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui |
| Backend | Hono + Cloudflare Workers |
| Database | Supabase (PostgreSQL) via @supabase/supabase-js |
| Auth | JWT manual (jose) + PBKDF2 password hashing |

## Struktur Folder

```
/mnt/agents/output/
├── app/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # Navbar, Footer
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
    │   ├── db/             # Drizzle schema
    │   ├── lib/            # JWT & Password utilities
    │   ├── types/          # Environment types
    │   └── index.ts        # Hono app entry
    ├── migrations/         # SQL migrations
    ├── seed/               # Seed data
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
- **/admin/portfolio/new** - Form tambah portfolio
- **/admin/portfolio/:id/edit** - Form edit portfolio

## Backend Endpoints

| Method | Endpoint | Auth | Keterangan |
|--------|----------|------|------------|
| POST | /api/auth/login | Public | Login admin |
| GET | /api/portfolio | Public | List semua portfolio |
| GET | /api/portfolio/:id | Public | Detail portfolio |
| POST | /api/portfolio | JWT | Tambah portfolio |
| PUT | /api/portfolio/:id | JWT | Update portfolio |
| DELETE | /api/portfolio/:id | JWT | Hapus portfolio |

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
2. **SQL Editor** → buka `backend/supabase-setup.sql`, jalankan semua query untuk membuat tabel `portfolio` dan `admin_users`
3. **Project Settings → API** — catet `Project URL` (SUPABASE_URL) dan `anon public` key (SUPABASE_ANON_KEY)

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
3. JWT token disimpan di `localStorage` - pertimbangkan httpOnly cookie untuk production yang lebih aman
4. Ganti password default admin segera setelah setup

## Commands Reference

| Command | Lokasi | Keterangan |
|---------|--------|------------|
| `npm run dev` | app/ | Dev server frontend (port 5173) |
| `npm run build` | app/ | Build production |
| `npm run dev` | backend/ | Dev server backend (port 8787) |
| `npm run deploy` | backend/ | Deploy ke Workers |
