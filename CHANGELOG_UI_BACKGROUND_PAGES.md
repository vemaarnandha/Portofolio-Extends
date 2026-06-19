# Laporan Perubahan UI Background Pages (Light mode + hover “keemasan”)

Dokumentasi ini berisi **file yang diubah** beserta **isi sebelum** dan **isi sesudah** (diff ringkas berbasis blok kode).

> Catatan: yang diubah mengikuti kriteria:
> - **Background hanya pada area main content** tiap halaman (komponen seperti Navbar/Footer tidak disentuh).
> - Light mode background dibuat **agak kekuningan**.
> - Hover dibuat terasa **keemasan** (mengandalkan styling global yang sudah ada di `app/src/index.css` untuk hover warna arcane/honey).

---

## 1) `app/src/index.css`

### Sebelum
(isi sebelum tidak dicantumkan lengkap, karena perubahan spesifik hanya menambah class baru)

### Sesudah (tambahan baru di `@layer components`)
```css
@layer components {
  .page-main {
    background: hsl(var(--card) / 0.65);
  }

  .page-main::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: -1;
    background: radial-gradient(circle at 10% 10%, rgba(162, 136, 62, 0.10) 0%, transparent 50%),
      radial-gradient(circle at 90% 20%, rgba(130, 106, 55, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 50% 90%, rgba(162, 136, 62, 0.06) 0%, transparent 55%);
  }

  .page-main > * {
    position: relative;
    z-index: 10;
  }

  .dark .page-main {
    background: hsl(var(--card) / 0.6);
  }

  .glass-card {
    @apply bg-card/40 backdrop-blur-md border border-arcane-900/50 transition-all duration-300;
  }
}
```

---

## 2) `app/src/pages/Home.tsx`

### Sebelum
```tsx
<div className="min-h-screen">
```

### Sesudah
```tsx
<div className="page-main min-h-screen">
```

---

## 3) `app/src/pages/About.tsx`

### Sebelum
```tsx
<div className="min-h-screen py-24 relative overflow-hidden">
```

### Sesudah
```tsx
<div className="page-main min-h-screen py-24 relative overflow-hidden">
```

---

## 4) `app/src/pages/Projects.tsx`

### Sebelum
```tsx
<div className="min-h-screen py-24 relative overflow-hidden">
```

### Sesudah
```tsx
<div className="page-main min-h-screen py-24 relative overflow-hidden">
```

---

## 5) `app/src/pages/Contact.tsx`

### Sebelum
```tsx
<div className="min-h-screen py-24 relative overflow-hidden">
```

### Sesudah
```tsx
<div className="page-main min-h-screen py-24 relative overflow-hidden">
```

---

## 6) `app/src/pages/AdminLogin.tsx`

### Sebelum
```tsx
<div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
```

### Sesudah
```tsx
<div className="page-main min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
```

---

## 7) `app/src/pages/AdminDashboard.tsx`

### Sebelum (loading state)
```tsx
<div className="flex min-h-screen items-center justify-center">
```

### Sesudah (loading state)
```tsx
<div className="page-main flex min-h-screen items-center justify-center">
```

### Sebelum (wrapper utama)
```tsx
<div className="min-h-screen py-8 animate-fade-from-abyss">
```

### Sesudah (wrapper utama)
```tsx
<div className="page-main min-h-screen py-8 animate-fade-from-abyss">
```

---

## 8) `app/src/pages/AdminMessages.tsx`

### Sebelum (loading state)
```tsx
<div className="flex min-h-screen items-center justify-center">
```

### Sesudah (loading state)
```tsx
<div className="page-main flex min-h-screen items-center justify-center">
```

### Sebelum (wrapper utama)
```tsx
<div className="min-h-screen py-8 animate-fade-from-abyss">
```

### Sesudah (wrapper utama)
```tsx
<div className="page-main min-h-screen py-8 animate-fade-from-abyss">
```

---

## 9) `app/src/pages/PortfolioForm.tsx`

### Sebelum (loading state)
```tsx
<div className="flex min-h-screen items-center justify-center">
```

### Sesudah (loading state)
```tsx
<div className="page-main flex min-h-screen items-center justify-center">
```

### Sebelum (wrapper utama)
```tsx
<div className="min-h-screen py-24 relative overflow-hidden">
```

### Sesudah (wrapper utama)
```tsx
<div className="page-main min-h-screen py-24 relative overflow-hidden">
```

---

# Kesimpulan
Perubahan styling dilakukan dengan cara konsisten:
- Tambahkan `.page-main` di `app/src/index.css` untuk **background main content**.
- Ganti class wrapper pages agar background diterapkan **hanya** pada area main content.
- Hover “keemasan” mengikuti styling global background/hover yang sudah ada di `app/src/index.css` dan class Tailwind yang menggunakan token arcane/honey.
