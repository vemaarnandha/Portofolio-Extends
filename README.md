# Portfolio Full-Stack Application

Aplikasi portfolio personal full-stack dengan React frontend (Vercel) dan Hono backend (Cloudflare Workers).

## Recent Enhancements

### UI/UX Modernization
- **Modernized Interface:** Implemented a high-end "Dark Fantasy Purple" aesthetic across all pages.
- **Bento Grid Layouts:** Redesigned Skills and Projects sections using modern Bento Grid layouts for better visual hierarchy.
- **Immersive Animations:** Integrated `framer-motion` for smooth page transitions and micro-interactions.
- **Visual Depth:** Added mesh gradient backgrounds and noise textures for a premium feel.
- **Improved Responsiveness:** Refined layouts for mobile and desktop consistency.

### Admin Messaging System
- **Notification System:** Added visual indicators for unread messages on the Admin Dashboard.
- **Message Management:** Implemented "Mark as Read" for individual messages and "Mark All as Read" for bulk actions.
- **Real-time Counters:** Dashboard header displays the count of unread messages.
- **Improved UI:** Admin message list uses state-based styling to differentiate read and unread messages.

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
- **/admin/messages** - Melihat pesan masuk dari form kontak
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
| POST | /api/contact | Public | Kirim pesan kontak (dengan honeypot protection) |
| GET | /api/contact | Session | List semua pesan masuk |
| DELETE | /api/contact/:id | Session | Hapus pesan masuk |

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

> **Urutan deploy:** Supabase → Backend (Workers) → Frontend (Vercel).
> Jangan terbalik, karena frontend butuh URL backend.

---

### A. Persiapan Akun & Tools

Sebelum mulai, pastikan kamu sudah punya:

| Platform | Keperluan | Daftar |
|----------|-----------|--------|
| **Supabase** | Database + Storage + Auth | https://supabase.com (bisa pakai GitHub) |
| **Cloudflare** | Backend hosting (Workers) | https://dash.cloudflare.com (bisa pakai GitHub) |
| **Vercel** | Frontend hosting | https://vercel.com (bisa pakai GitHub) |

**Tools yang harus terinstall di komputer:**

```bash
# Cek dulu
node --version   # minimal v18
npm --version    # minimal v9

# Pastikan Wrangler (CLI Cloudflare) sudah terinstall
npx wrangler --version

# Pastikan Vercel CLI sudah terinstall
npx vercel --version
```

Jika belum ada:

```bash
npm install -g wrangler vercel
```

---

### B. Setup Supabase

#### B1. Buat Project

1. Buka https://supabase.com → **Sign in** (pakai GitHub)
2. Klik **New project**
3. Isi:
   - **Name:** `portfolio` (atau bebas)
   - **Database Password:** buat password kuat — **simpan!**
   - **Region:** pilih yang terdekat (Singapore atau Tokyo)
4. Tunggu ~2 menit sampai provisioning selesai

#### B2. Dapatkan Credentials

1. Di dashboard Supabase, buka **Project Settings → API**
2. Cari dan catat 3 nilai ini:

| Nama | Letak | Contoh |
|------|-------|--------|
| `SUPABASE_URL` | **Project URL** | `https://xxx.supabase.co` |
| `SUPABASE_ANON_KEY` | **anon public** | `eyJhbGciOiJ...` |
| `SUPABASE_SERVICE_ROLE` | **service_role** (scroll ke bawah) | `eyJhbGciOiJ...` |

> **⚠️ Peringatan:** `service_role` punya akses penuh ke database. Jangan pernah diekspos ke frontend atau di-commit ke GitHub.

#### B3. Jalankan SQL Setup

1. Buka **SQL Editor** di sidebar kiri
2. Klik **New query**
3. Buka file `backend/supabase-setup.sql` — **copy semua isinya**
4. Paste ke SQL Editor
5. Klik **Run** (atau `Ctrl+Enter`)
6. Pastikan tidak ada error. Akan membuat 4 tabel:
   - `portfolio` — menyimpan data portfolio
   - `admin_users` — menyimpan admin login
   - `admin_sessions` — menyimpan session login
   - `contacts` — menyimpan pesan dari form kontak

#### B4. Buat Bucket Storage

**Cara 1 — Via Dashboard (mudah):**

1. Klik **Storage** di sidebar kiri
2. Klik **New bucket**
3. Isi:
   - **Name:** `project-images`
   - **Public bucket:** ✅ ceklis
4. Klik **Create bucket**
5. Setelah jadi, klik bucket → **Policies** → **New Policy**
6. Buat 2 policy:

| Policy | Type | Operation |
|--------|------|-----------|
| Public read | SELECT | `bucket_id = 'project-images'` |
| Authenticated upload | INSERT | `bucket_id = 'project-images' AND auth.role() = 'authenticated'` |

**Cara 2 — Via SQL Editor:**

Jalankan query ini:

```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true);

CREATE POLICY "Allow public read"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

CREATE POLICY "Allow authenticated upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'project-images' AND
  auth.role() = 'authenticated'
);
```

#### B5. Buat Admin User

```bash
cd backend
npm install
npm run gen-hash admin123
```

Akan keluar output seperti:

```
Hash: a1b2c3d4e5f6...:f1e2d3c4b5a6...
```

Copy hash tersebut, lalu jalankan di Supabase SQL Editor:

```sql
INSERT INTO admin_users (email, password_hash)
VALUES ('admin@portfolio.com', 'hash-disini');
```

---

### C. Deploy Backend ke Cloudflare Workers

#### C1. Login ke Cloudflare

```bash
cd backend

# Login via browser
npx wrangler login
```

Akan terbuka browser → klik **Allow** → kembali ke terminal.

#### C2. Set Secrets (sekali saja)

```bash
npx wrangler secret put JWT_SECRET
# ➜ Ketik: minimal 32 karakter, bebas. Contoh: my-super-secret-key-min-32-characters!!

npx wrangler secret put SUPABASE_URL
# ➜ Paste: https://xxx.supabase.co (dari step B2)

npx wrangler secret put SUPABASE_ANON_KEY
# ➜ Paste: eyJhbGciOiJ... (anon key dari step B2)

npx wrangler secret put SUPABASE_SERVICE_ROLE
# ➜ Paste: eyJhbGciOiJ... (service_role dari step B2)

npx wrangler secret put DISCORD_WEBHOOK_URL
# ➜ Paste: URL Webhook dari Discord Channel Anda
```

> **Catatan:** Secrets terenkripsi dan tidak bisa dibaca setelah disimpan. Simpan di password manager.

#### C3. Update CORS di wrangler.toml

Buka `backend/wrangler.toml`, ubah:

```toml
[vars]
CORS_ORIGIN = "https://namaproject.vercel.app"
# Ganti https://namaproject.vercel.app dengan domain Vercel-mu nanti
# Bisa diisi sementara dulu, nanti di-update lagi setelah frontend deploy
```

#### C4. Deploy

```bash
npm run deploy
```

Tunggu ~30 detik. Output akan seperti:

```
➜ Uploading...
➜ Published: https://portfolio-backend.xxx.workers.dev
```

**Catat URL ini!** Contoh: `https://portfolio-backend.your-name.workers.dev`

#### C5. Test Backend

Buka browser, akses URL backend:

```
https://portfolio-backend.your-name.workers.dev/
```

Harus muncul:

```json
{ "success": true, "data": null, "message": "Portfolio API is running" }
```

Test endpoint portfolio:

```
https://portfolio-backend.your-name.workers.dev/api/portfolio
```

Harus muncul:

```json
{ "success": true, "data": [], "message": "Data portfolio berhasil diambil" }
```

---

### D. Deploy Frontend ke Vercel

Kamu punya 2 opsi:

#### Opsi 1 — Via Vercel CLI (cepat, langsung dari terminal)

```bash
cd app

# Build dulu untuk test
npm run build

# Deploy
npx vercel --prod
```

Saat ditanya:

| Prompt | Jawab |
|--------|-------|
| Set up and deploy? | `Y` |
| Which scope? | Pilih akun Vercel kamu |
| Link to existing project? | `N` |
| Project name? | Enter saja (default) |
| Directory? | Enter saja (./) |
| Override settings? | `N` |

Setelah deploy selesai, **set environment variable**:

```bash
npx vercel env add VITE_API_URL production
# ➜ Paste: https://portfolio-backend.your-name.workers.dev
```

Lalu re-deploy:

```bash
npx vercel --prod
```

#### Opsi 2 — Via GitHub (auto-deploy)

1. Push project ke GitHub:

```bash
git add .
git commit -m "initial commit"
git remote add origin https://github.com/username/portfolio.git
git push -u origin main
```

2. Buka https://vercel.com → **Add New Project**
3. Import repository GitHub kamu
4. **Build Settings** — biarkan default (Vite auto-detected)
5. **Environment Variables:**

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://portfolio-backend.your-name.workers.dev` |

6. Klik **Deploy**
7. Tunggu ~2 menit

#### D1. Test Frontend

Buka URL Vercel:

```
https://namaproject.vercel.app
```

Coba:
- ✅ Halaman Home, Projects, About, Contact tampil
- ✅ Buka `/admin/login` → login dengan `admin@portfolio.com` / `admin123`
- ✅ Redirect ke Dashboard
- ✅ Bisa Tambah/Edit/Hapus portfolio + upload gambar

---

### E. Finalisasi CORS

Setelah frontend live, update **CORS origin** di backend:

Buka `backend/wrangler.toml`:

```toml
[vars]
CORS_ORIGIN = "https://namaproject.vercel.app"
# Ganti dengan domain Vercel aslimu
```

Re-deploy backend:

```bash
cd backend
npm run deploy
```

---

### F. Troubleshooting

| Masalah | Penyebab | Solusi |
|---------|----------|--------|
| `ServiceError: 10007` | Secrets belum diset | Jalankan `npx wrangler secret put ...` |
| Login gagal | Admin user belum dibuat | Jalankan INSERT di Supabase SQL Editor |
| Upload gambar error 500 | Bucket `project-images` belum dibuat | Buat bucket di Supabase Storage |
| Gambar tidak muncul | Storage policy belum di-set | Tambah policy SELECT untuk public |
| CORS error di browser | `CORS_ORIGIN` di wrangler.toml salah | Update dengan domain Vercel yang benar, re-deploy |
| Halaman kosong putih | `VITE_API_URL` salah atau backend down | Cek URL backend, test langsung di browser |
| Cookie tidak tersimpan | Frontend & backend beda domain | Pastikan `credentials: include` dan CORS benar |

---

### G. Maintenance

```bash
# Update backend
cd backend
npm run deploy

# Update frontend (via Vercel CLI)
cd app
npm run build
npx vercel --prod

# Lihat logs backend
npx wrangler tail

# Lihat logs di Supabase
# Dashboard → Database → Logs
```

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
