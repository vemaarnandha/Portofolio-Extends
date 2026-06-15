-- Seed akun admin pertama
-- Password: admin123
-- INSTRUKSI: Ganti password_hash di bawah dengan hash yang valid
--
-- Cara generate hash:
-- 1. Jalankan script: node -e "
--    async function h(p) {
--      const s = crypto.getRandomValues(new Uint8Array(16));
--      const k = await crypto.subtle.importKey('raw', new TextEncoder().encode(p), 'PBKDF2', false, ['deriveBits']);
--      const h = await crypto.subtle.deriveBits({name:'PBKDF2', salt:s, iterations:100000, hash:'SHA-256'}, k, 256);
--      const sh = Array.from(s).map(b=>b.toString(16).padStart(2,'0')).join('');
--      const hh = Array.from(new Uint8Array(h)).map(b=>b.toString(16).padStart(2,'0')).join('');
--      console.log(sh + ':' + hh);
--    }
--    h('admin123');
-- "
-- 2. Copy output hash ke bawah

INSERT OR IGNORE INTO admin_users (email, password_hash) VALUES (
  'admin@portfolio.com',
  'REPLACE_WITH_GENERATED_HASH'
);

-- Seed data portfolio (opsional, untuk testing)
INSERT OR IGNORE INTO portfolio (nama_project, photo_url, jobdesk, deskripsi) VALUES
('Website E-Commerce', 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800', 'Fullstack Developer', 'Membangun platform e-commerce lengkap dengan sistem pembayaran, manajemen produk, dan dashboard admin menggunakan React dan Node.js.'),
('Aplikasi Mobile Banking', 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800', 'Mobile Developer', 'Mengembangkan aplikasi mobile banking dengan fitur transfer, riwayat transaksi, dan notifikasi real-time menggunakan React Native.'),
('Dashboard Analytics', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', 'Frontend Developer', 'Membuat dashboard analytics interaktif dengan visualisasi data real-time, grafik dinamis, dan export laporan menggunakan D3.js dan Vue.');
