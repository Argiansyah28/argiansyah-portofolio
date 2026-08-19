# Argiansyah Galih Permata — Personal Site

Situs portofolio statis. Tanpa framework, tanpa build step, tanpa dependency.
Cukup HTML, CSS, dan JavaScript biasa — jadi ringan dan cepat dibuka di HP.

## Urutan halaman

Hero → About → Experience → Skills → Projects → Contact

## Struktur file

```
.
├── index.html              # seluruh isi halaman
├── css/style.css           # semua styling + animasi
├── js/main.js              # scroll reveal, tab experience, menu HP
├── assets/
│   ├── argiansyah.webp     # foto utama (browser modern, 47 KB)
│   ├── argiansyah.png      # cadangan untuk browser lama
│   ├── favicon.svg         # ikon tab
│   ├── cv-argiansyah.pdf   # BELUM ADA — taruh CV Anda di sini
│   └── projects/           # gambar untuk kartu project
└── netlify.toml            # pengaturan cache & keamanan Netlify
```

## YANG WAJIB ANDA ISI DULU

Cari kata `TODO` di dalam `index.html`. Ada tiga:

1. **Experience ketiga** — masih berisi "Company name here". Ganti dengan magang
   atau pekerjaan pertama Anda, atau hapus saja kalau belum ada.
2. **Nomor WhatsApp** — di section Contact, masih `6281234567890`.
3. **File CV** — tombol "Resume" di pojok kanan atas mengarah ke
   `assets/cv-argiansyah.pdf`. Taruh file PDF Anda dengan nama itu.

## Cara mengganti gambar project

Simpan screenshot Anda ke `assets/projects/`, lalu ubah `src` pada `<img>` di
kartu yang bersangkutan di dalam `index.html`. Ukuran paling pas sekitar
16:10 (misalnya 1600 x 1000 piksel). File `.svg` yang ada sekarang cuma
placeholder — boleh ditimpa atau dihapus.

## Cara menambah experience baru

Setiap pekerjaan butuh dua bagian yang saling cocok:

1. `<button class="xp__tab" data-xp="nama-id" aria-controls="xp-nama-id">`
2. `<article class="xp__panel" id="xp-nama-id">`

Salin satu pasang, ganti `nama-id`-nya, selesai. Tidak perlu menyentuh JavaScript.

## Cara menambah project baru

Salin satu blok `<article class="card">` sampai `</article>`, lalu ganti isinya.
Animasi scroll ikut otomatis karena atribut `data-reveal`.

## Menambahkan tautan demo

Setiap kartu punya tautan "See live" yang disembunyikan. Isi `href`-nya dengan
URL demo Anda, lalu hapus kata `hidden` dari tag itu.

## Ganti warna

Semua warna ada di paling atas `css/style.css`, di blok `:root`. Mengubah
`--brass` dan `--maroon` saja sudah mengubah seluruh tampilan situs.

## Menjalankan di komputer sendiri

Klik dua kali `index.html`. Selesai — tidak perlu install apa pun.

## Deploy ke Netlify

Cara paling cepat, tanpa Git:

1. Kompres folder ini jadi satu file ZIP.
2. Buka https://app.netlify.com/drop
3. Seret file ZIP-nya ke halaman itu.
4. Situs langsung online. Ganti alamatnya di
   **Site configuration → Change site name**.

Lewat GitHub (auto-update tiap kali push):

1. Upload semua file ini ke repo GitHub baru.
2. Netlify → **Add new site → Import an existing project → GitHub**.
3. Build command: **kosongkan**. Publish directory: **`.`** (titik).
4. **Deploy**.
