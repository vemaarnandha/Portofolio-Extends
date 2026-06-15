# Portfolio Full-Stack Application

Aplikasi portfolio personal full-stack dengan React frontend (Vercel) dan Hono backend (Cloudflare Workers).

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui |
| Backend | Hono + Cloudflare Workers |
| Database | Turso (libSQL serverless) + Drizzle ORM |
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

### 2. Setup Turso Database

```bash
# Install Turso CLI: https://docs.turso.tech/reference/turso-cli

# Login dan buat database
turso auth login
turso db create portfolio-db

# Dapatkan connection URL
turso db show portfolio-db --url
# Output: libsql://portfolio-db-[user].turso.io

# Buat auth token
turso db tokens create portfolio-db
```

### 3. Jalankan Migration

```bash
# Connect ke Turso dan jalankan SQL
turso db shell portfolio-db < backend/migrations/0001_init.sql

# Seed data admin dan portfolio sample
turso db shell portfolio-db < backend/seed/seed.sql
```

> **Catatan**: Seed SQL memerlukan hash password yang valid. Untuk generate hash, jalankan fungsi `hashPassword()` dari `backend/src/lib/password.ts` di Node.js, lalu update seed file dengan hash yang benar.

### 4. Setup Backend

```bash
cd backend
npm install

# Copy dan edit wrangler.toml
cp .env.example .env
touch .dev.vars    # Untuk local dev secrets

# Isi secrets
npx wrangler secret put JWT_SECRET
npx wrangler secret put TURSO_AUTH_TOKEN
npx wrangler secret put TURSO_DATABASE_URL

# Atau untuk development local, buat file .dev.vars:
echo "JWT_SECRET=your-secret-key-min-32-characters" > .dev.vars
echo "TURSO_AUTH_TOKEN=your-turso-token" >> .dev.vars
echo "TURSO_DATABASE_URL=libsql://your-db.turso.io" >> .dev.vars

# Run development
npm run dev      # http://localhost:8787
```

### 5. Generate Password Hash (untuk seed)

```typescript
// save-as: scripts/gen-hash.ts
import { hashPassword } from "../backend/src/lib/password";

async function main() {
  const hash = await hashPassword("admin123");
  console.log(hash);
}

main();
```

Jalankan dengan `npx tsx scripts/gen-hash.ts`, lalu copy hash output ke seed.sql.

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
npx wrangler secret put TURSO_AUTH_TOKEN
npx wrangler secret put TURSO_DATABASE_URL

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
