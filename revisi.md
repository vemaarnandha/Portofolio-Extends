# Revisi ExFolio — 17 Poin

**Tanggal:** 2026-06-19
**Status:** Selesai & Deployed

---

## Daftar Perubahan

### 1. Typography & Keterbacaan
- `font-heading` (Cinzel) hanya untuk h1, h2, dan brand ExFolio
- Label, navigation, tag, badge, form label pakai `font-body` (Inter)
- Opacity teks dinaikkan: `text-arcane-300/40` → `text-arcane-300/70`
- Ukuran minimum teks body: `text-sm` (14px)
- Tag/badge minimum: `text-xs` (12px)

### 2. Konsistensi Bahasa Indonesia
Seluruh konten terlihat pengunjung diterjemahkan ke Indonesia:

| Sebelum | Sesudah |
|---------|---------|
| Home, Projects, About, Contact | Beranda, Proyek, Tentang, Kontak |
| ENTER THE RIFT | Lihat Proyek Saya |
| SUMMON ME | Hubungi Saya |
| Technical Prowess | Kemampuan Teknis |
| Navigation / Connect | Navigasi / Hubungi |
| System Online | Dihapus |
| All rites reserved | Hak cipta dilindungi |
| Currently Active | Sedang Aktif |
| Identity / Essence / Objective / Manifesto | Nama / Email / Subjek / Pesan |
| RETRY RITUAL / Void Detected | Coba Lagi / Belum Ada Proyek |
| CHANNELING... / SUMMON ARCHITECT | Mengirim... / Kirim Pesan |
| Ritual Success! / Send Another Manifesto | Pesan Terkirim! / Kirim Pesan Lain |

### 3. Dark Fantasy Dihapus
Semua frasa bernuansa sihir/gelap diganti profesional:

| Sebelum | Sesudah |
|---------|---------|
| Architecture of Dreams | Siap Berkolaborasi |
| Crafting Digital Enchantment | Membangun Digital Pengalaman |
| Mastered Arcana | Keahlian Teknis |
| Essence of Power | Teknologi yang Digunakan |
| The Chronicle | Pengalaman |
| The Origin | Tentang Saya |
| Beyond the Code | Lebih dari Sekadar Kode |
| Profil Eksistensi | Profil Saya |
| Visionary Frontend / Edge Backend / Persistence | Frontend Modern / Backend Edge / Database |
| gerbang komunikasi / mantera / dimensi | saya siap / ide / inbox |
| Fullstack Architect | Fullstack Developer |

### 4. About Page Diperluas
- Paragraf profil: Vema Arnandha, siswa SMK PGRI Wlingi, PKL di Arre Tech, Blitar Jatim
- Status di kartu profil: `"Available for Rituals"` → `"Siswa PKL · Arre Tech"`
- Typo fixed: `"kembbali"` → `"kembali"`, `"khusunya"` → `"khususnya"`
- Deskripsi pengalaman diperjelas (minimal 2 kalimat per entry)

### 5. Tombol Admin Disembunyikan
- Tombol "Admin" / "Dashboard" di Navbar **dihapus**
- Logo ExFolio di **Footer** diubah `<Link to="/">` → `<Link to="/admin/login">`
- Klik logo = navigasi ke admin login secara diam-diam

### 6. Section Testimonial
- File baru: `src/components/Testimonials.tsx`
- 3 testimonial dummy (Budi Santoso, Rina Kusuma, Ahmad Fauzi)
- Grid 3 kolom (1 mobile, 3 desktop)
- Avatar inisial dengan background `arcane-500`
- Quote icon di atas setiap card
- Ditampilkan di `Home.tsx` setelah section Skills

### 7. Dark Mode Toggle
- File baru: `src/components/ThemeToggle.tsx` (next-themes)
- `main.tsx` di-wrap dengan `<ThemeProvider attribute="class" defaultTheme="dark">`
- Toggle di Navbar (desktop + mobile)
- Ikon Sun/Moon, animasi hover

### 8. Scroll Progress Bar
- Di `Navbar.tsx`, bar 2px fixed di paling atas
- Warna `arcane-500`, width = persentase scroll
- Update real-time saat scroll

### 9. Meta SEO
- `index.html`: `lang="id"`, title, description, keywords, OG tags
- Umami analytics placeholder (`GANTI_DENGAN_WEBSITE_ID_KAMU`)
- `html { scroll-behavior: smooth; }`

### 10. Active Nav Highlight
- `location.pathname` dibandingkan dengan path setiap nav
- Aktif: `text-arcane-100` + underline `w-full` + shadow
- Tidak aktif: `text-arcane-300/40`
- Berfungsi di desktop dan mobile

### 11. Project Detail Page
- File baru: `src/pages/ProjectDetail.tsx`
- Route: `/projects/:id` di `App.tsx`
- Tampilkan: judul, deskripsi, tech stack (parse dari `jobdesk`), gambar, tombol kembali
- Tombol "Demo segera hadir" (disabled placeholder)
- Error/empty state handled

### 12. Skeleton Loading
- File baru: `src/components/SkeletonCard.tsx`
- Digunakan di `Projects.tsx` saat loading (6 skeleton card)
- Ganti spinner `Loader2` yang sebelumnya
- Animasi `animate-pulse`

### 13. Download CV
- Tombol "Unduh CV" di About page (kartu profil)
- Link ke `/cv-vema-arnandha.pdf` (placeholder kosong di `public/`)
- Icon `Download` dari lucide-react

### 14. Filter Tech Stack
- Parse `jobdesk` (koma-separated) jadi array tag
- Tombol filter horizontal: "Semua" + setiap tag unik
- Aktif: `bg-arcane-500 text-void-950`
- Tidak aktif: border `arcane-800`, teks `arcane-400`
- Responsive: flex-wrap di mobile

### 15. Analytics Umami
- Script Umami di `index.html`
- Placeholder `data-website-id="GANTI_DENGAN_WEBSITE_ID_KAMU"`
- Privacy-friendly, tidak perlu cookie consent

### 16. Contact Form & Toast
- `sonner` toast di `Contact.tsx`: `toast.success()` / `toast.error()`
- `<Toaster />` di `App.tsx` (position: top-right, richColors)
- Semua label/placeholder/form ke bahasa Indonesia

### 17. Mobile Responsive
- Navbar: hamburger menu + ThemeToggle
- Hero: `text-4xl` di mobile, `text-6xl/8xl` di desktop
- Bento grid: 1 kolom mobile, 4 kolom desktop
- Testimonials: 1 kolom mobile, 3 desktop
- Filter: flex-wrap horizontal
- Contact: stack vertikal di mobile
- Footer: 1 kolom mobile, 4 desktop

---

## File Baru
| File | Deskripsi |
|------|-----------|
| `src/components/Testimonials.tsx` | Section testimonial klien |
| `src/components/SkeletonCard.tsx` | Skeleton loading card |
| `src/components/ThemeToggle.tsx` | Toggle dark/light mode |
| `src/pages/ProjectDetail.tsx` | Halaman detail proyek |
| `public/cv-vema-arnandha.pdf` | Placeholder CV (kosong) |

## File Diubah
| File | Perubahan |
|------|-----------|
| `index.html` | SEO meta, Umami, smooth scroll |
| `src/main.tsx` | ThemeProvider wrapper |
| `src/App.tsx` | Route `/projects/:id`, Toaster |
| `src/components/Navbar.tsx` | Scroll progress, active nav, ThemeToggle, hapus admin button, bahasa Indonesia |
| `src/components/Footer.tsx` | Logo ke admin, bahasa Indonesia, hapus System Online |
| `src/pages/Home.tsx` | Bahasa Indonesia, hapus dark fantasy, tambah Testimonials |
| `src/pages/About.tsx` | Konten diperluas, bahasa Indonesia, tombol CV |
| `src/pages/Contact.tsx` | Sonner toast, bahasa Indonesia, hapus dark fantasy |
| `src/pages/Projects.tsx` | Filter tech stack, skeleton loading, card clickable |

## Kriteria Selesai
- [x] Tidak ada teks Inggris yang terlihat pengunjung (kecuali nama teknologi)
- [x] Tidak ada frasa dark fantasy tersisa
- [x] Logo ExFolio di footer mengarah ke `/admin/login`
- [x] Section testimonial tampil di Home
- [x] Dark mode toggle berfungsi
- [x] Scroll progress bar terlihat saat scroll
- [x] Meta SEO diisi di index.html
- [x] Active nav highlight berfungsi
- [x] Project detail page bisa diakses dari daftar proyek
- [x] Skeleton loading tampil saat fetch data
- [x] Filter tech stack berfungsi di Projects
- [x] Tombol download CV ada di About
- [x] Contact form dengan sonner toast
- [x] `npm run build` berhasil tanpa error
- [x] Deployed ke Vercel production
