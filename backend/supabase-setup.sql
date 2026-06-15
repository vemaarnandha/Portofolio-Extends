-- ============================================================
-- SUPABASE SETUP SQL
-- Jalankan SQL ini di Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql/new)
-- ============================================================

-- 1. TABEL PORTFOLIO
CREATE TABLE IF NOT EXISTS portfolio (
  id SERIAL PRIMARY KEY,
  nama_project VARCHAR(255) NOT NULL,
  photo_url VARCHAR(500) NOT NULL,
  jobdesk VARCHAR(255) NOT NULL,
  deskripsi TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABEL ADMIN USERS
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. INDEX
CREATE INDEX IF NOT EXISTS idx_portfolio_created_at ON portfolio(created_at);

-- 4. NONAKTIFKAN RLS (karena auth dikelola JWT manual di backend)
ALTER TABLE portfolio DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- ============================================================
-- SEED DATA (UNCOMMENT setelah tabel dibuat)
-- ============================================================

-- Admin default (password: admin123)
-- GANTI 'REPLACE_WITH_GENERATED_HASH' dengan hash dari:
-- npx tsx scripts/gen-hash.ts admin123
-- ATAU
-- node scripts/gen-hash.mjs admin123
/*
INSERT INTO admin_users (email, password_hash) VALUES (
  'admin@portfolio.com',
  'REPLACE_WITH_GENERATED_HASH'
);

INSERT INTO portfolio (nama_project, photo_url, jobdesk, deskripsi) VALUES
('Website E-Commerce', 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800', 'Fullstack Developer', 'Membangun platform e-commerce lengkap dengan sistem pembayaran, manajemen produk, dan dashboard admin menggunakan React dan Node.js.'),
('Aplikasi Mobile Banking', 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800', 'Mobile Developer', 'Mengembangkan aplikasi mobile banking dengan fitur transfer, riwayat transaksi, dan notifikasi real-time menggunakan React Native.'),
('Dashboard Analytics', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', 'Frontend Developer', 'Membuat dashboard analytics interaktif dengan visualisasi data real-time, grafik dinamis, dan export laporan menggunakan D3.js dan Vue.');
*/
