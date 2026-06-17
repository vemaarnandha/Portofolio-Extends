# AGENTS.md — Portfolio Full-Stack

## Two packages

| Package | Path | Tech | Dev command | Port |
|---------|------|------|-------------|------|
| Frontend | `app/` | React 19 + Vite + Tailwind + shadcn/ui | `npm run dev` | 5173 |
| Backend | `backend/` | Hono + Cloudflare Workers | `npm run dev` (wrangler) | 8787 |

## Key commands

```bash
# Frontend
cd app && npm run dev          # dev server with HMR, proxies /api -> localhost:8787
cd app && npm run build        # tsc -b && vite build (typecheck runs inside build)
cd app && npm run lint         # ESLint (flat config)

# Backend
cd backend && npm run dev      # wrangler dev on port 8787
cd backend && npm run deploy   # wrangler deploy to Cloudflare Workers
cd backend && npm run gen-hash # generate PBKDF2 hash for admin password

# No test framework configured (no vitest/jest/playwright found).
```

## Architecture

- **Frontend entry:** `app/src/main.tsx` (BrowserRouter wrapping App.tsx)
- **Backend entry:** `backend/src/index.ts` (Hono app, routes mounted at `/api/auth`, `/api/portfolio`)
- **Path alias:** `@/` → `app/src/` (configured in vite.config.ts + tsconfig.app.json)
- **shadcn/ui:** new-york style, CSS variables, lucide icons
- **Routing:** react-router v7 with BrowserRouter
- **Auth:** HTTP-only cookie session (JWT via `jose`), backend validates, no token stored in JS
- **Response format:** `{ success: boolean, data: any, message: string }`

## Configuration quirks

- Backend secrets go in `backend/.dev.vars` for local dev, but use `wrangler secret put` for production
- `CORS_ORIGIN` is a public wrangler `[vars]` (not a secret), set in `wrangler.toml`
- Backend requires `SUPABASE_SERVICE_ROLE` key — never expose it to frontend
- Password hash format: `saltHex:hashHex` (PBKDF2, 16-byte salt, 100k iterations SHA-256)
- Storage bucket name: `project-images` (Supabase Storage, public read + authenticated write)
- Deploy order: Supabase → Backend (Workers) → Frontend (Vercel)
- Full deploy guide with Supabase setup, CORS config, Vercel CLI, and troubleshooting is in `README.md` sections B–F

## Noteworthy files

- `frontend-skills.md` — complete dark fantasy design system (colors, typography, shadows, animations, component variants)
- `backend/supabase-setup.sql` — full DB schema (portfolio, admin_users, admin_sessions tables)
- `backend/scripts/gen-hash.ts` — PBKDF2 hash generator for admin password creation
- `opencode.jsonc` — loads `utena_persona.md` as agent persona, `git *` allowed, rest asks

## No CI/CD or formatter

- No `prettier` config — ESLint only for code quality
- No GitHub Actions workflows found
- No pre-commit hooks or commitlint
