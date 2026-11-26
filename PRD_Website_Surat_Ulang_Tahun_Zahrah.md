# PRD — Website Surat Ulang Tahun Interaktif
## A Birthday Letter for Zahrah

**Penerima:** Zahrah Rahmadini  
**Tanggal lahir:** 20 Oktober 2005  
**Tujuan:** Membuat kejutan ulang tahun digital yang romantis, interaktif, responsif, dan mudah diedit.

---

## 1. Ringkasan Proyek

Website ini dirancang sebagai surat ulang tahun digital dari orang tercinta. Saat tautan dibuka, pengunjung melihat suasana malam dengan kembang api dan kue ulang tahun. Setelah menekan tombol pembuka, amplop terbuka dan menampilkan surat berisi ucapan, doa, serta foto kenangan. Website memiliki musik latar yang bisa diputar atau dijeda.

Semua konten harus mudah disesuaikan: nama, tanggal, kata-kata, foto, background, warna, animasi, dan backsound.

## 2. Tujuan Produk

1. Memberikan pengalaman ulang tahun digital yang romantis dan berkesan.
2. Menyampaikan ucapan, doa, dan harapan secara personal.
3. Menampilkan foto kenangan bersama.
4. Menambahkan musik yang bisa dipilih dan dikontrol.
5. Memungkinkan pemilik mengubah konten tanpa mengedit kode setiap kali.
6. Mendukung HP, tablet, dan desktop.
7. Dapat diterbitkan ke internet sehingga bisa dibagikan sebagai tautan.

## 3. Target Pengguna

- **Pemilik/admin:** Mengelola tulisan, foto, background, musik, dan tampilan.
- **Penerima:** Zahrah Rahmadini.
- **Pengunjung:** Siapa pun yang menerima tautan; pengunjung hanya bisa melihat surat, bukan mengeditnya.

## 4. Konsep Visual

- Warna utama: midnight blue, hitam elegan, emas, putih gading, dan merah muda lembut.
- Halaman pembuka: kembang api, kue ulang tahun dengan lilin, nama Zahrah, dan tombol “Buka Suratmu 💌”.
- Halaman surat: kertas krem dengan bayangan lembut dan foto kenangan sebagai background atau galeri.
- Animasi: amplop terbuka, transisi halus, kilauan atau partikel opsional.
- Tipografi: judul romantis dan isi surat yang nyaman dibaca.
- Desain harus responsif dan tidak membuat teks atau tombol terpotong.

## 5. Alur Pengguna

### Tahap 1 — Pembuka
1. Pengunjung membuka tautan.
2. Website menampilkan kembang api dan kue ulang tahun.
3. Nama “Zahrah Rahmadini” dan teks “Happy Birthday, Zahrah!” ditampilkan.
4. Terdapat tombol “Buka Suratmu 💌”.
5. Musik bisa dimulai setelah pengunjung menekan tombol, karena browser umumnya membatasi autoplay audio.

### Tahap 2 — Membuka Surat
1. Amplop muncul dan terbuka dengan animasi.
2. Kertas surat keluar.
3. Background berubah menjadi foto kenangan yang dapat diganti.
4. Musik tetap berjalan jika pemutar audio tidak dimulai ulang.

### Tahap 3 — Membaca Surat
Surat berisi sapaan, ucapan, doa, harapan, foto kenangan, dan penutup. Efek mengetik boleh digunakan, tetapi seluruh teks harus tetap bisa dibaca tanpa menunggu animasi.

### Tahap 4 — Penutup
Sediakan tombol “Baca Lagi”, “Putar Ulang Kejutan”, dan kontrol putar/jeda musik.

## 6. Contoh Ucapan Awal

**Untuk Zahrah, di hari spesialmu ❤️**

Happy birthday, Zahrah Rahmadini. Selamat bertambah usia, ya.

Hari ini adalah hari spesial karena seseorang yang begitu berharga hadir di dunia. Aku berharap di usia barumu ini, kamu selalu diberi kesehatan, kebahagiaan, ketenangan hati, dan kemudahan dalam setiap langkah yang kamu jalani.

Semoga semua hal baik yang sedang kamu perjuangkan perlahan menjadi nyata. Semoga setiap doa yang kamu simpan dalam diam menemukan jalannya, setiap lelahmu diganti dengan kebahagiaan, dan setiap air mata yang pernah jatuh digantikan dengan alasan untuk tersenyum.

Terima kasih sudah menjadi bagian dari cerita yang begitu berarti. Aku berharap kamu selalu dikelilingi orang-orang yang tulus menyayangimu, selalu punya alasan untuk bahagia, dan tidak pernah kehilangan semangat untuk mengejar impianmu.

Di hari ulang tahunmu ini, aku tidak bisa menjanjikan bahwa setiap hari akan selalu sempurna. Namun, aku berharap akan selalu ada banyak hal indah yang bisa kamu kenang, banyak doa baik yang menyertaimu, dan banyak alasan untuk merasa bahwa dirimu sangat berharga.

Selamat ulang tahun, Zahrah. Semoga dunia selalu punya cara untuk membuatmu tersenyum.

With love,  
Seseorang yang menyayangimu ❤️

> Seluruh contoh ucapan harus dapat diubah melalui panel admin atau file konfigurasi.

## 7. Kebutuhan Fungsional

- **FR-01 — Halaman pembuka:** Menampilkan nama penerima, kue, kembang api, dan tombol membuka surat.
- **FR-02 — Animasi surat:** Menampilkan amplop yang terbuka setelah tombol ditekan.
- **FR-03 — Pengelolaan ucapan:** Mengedit judul, sapaan, isi surat, doa, penutup, nama pengirim, dan tanggal.
- **FR-04 — Pengelolaan foto:** Mengunggah, mengganti, menghapus, dan mengurutkan foto.
- **FR-05 — Background:** Mengganti background pembuka dan halaman surat, termasuk posisi gambar dan tingkat gelap.
- **FR-06 — Musik:** Memilih file audio yang didukung browser atau menyematkan pemutar YouTube; mengatur volume dan putar/jeda.
- **FR-07 — Panel admin:** Menyediakan halaman khusus pemilik untuk mengelola konten.
- **FR-08 — Penyimpanan:** Menyimpan perubahan agar tetap ada setelah halaman dimuat ulang.
- **FR-09 — Pratinjau:** Melihat perubahan sebelum dipublikasikan.
- **FR-10 — Responsif:** Menyesuaikan tampilan untuk HP, tablet, dan desktop.
- **FR-11 — Berbagi:** Website dapat dipublikasikan pada hosting dan dibuka melalui tautan publik.

## 8. Panel Admin

Panel admin sebaiknya memiliki menu berikut:

1. **Identitas:** nama penerima, tanggal lahir, judul website, nama pengirim.
2. **Ucapan:** judul, isi surat, doa, dan penutup.
3. **Foto:** unggah, ganti, hapus, dan urutkan foto.
4. **Background:** gambar pembuka dan gambar halaman surat.
5. **Musik:** file audio atau tautan YouTube, volume, dan kontrol pemutaran.
6. **Tampilan:** warna, font, ukuran teks, dan jarak paragraf.
7. **Animasi:** aktif/nonaktifkan kembang api, lilin, amplop, efek mengetik, dan partikel.
8. **Pratinjau dan simpan:** periksa hasil lalu simpan perubahan.
9. **Keamanan:** login admin dan logout.

Pengunjung publik hanya boleh melihat website. Endpoint penyimpanan dan unggahan wajib memeriksa autentikasi admin dan memvalidasi file.

## 9. Kebutuhan Nonfungsional

- Animasi ringan dan tidak menghambat pembacaan.
- Mendukung browser modern.
- Teks dan tombol tetap terbaca di layar kecil.
- Password admin harus disimpan dengan hash, bukan teks biasa.
- Unggahan harus divalidasi jenis dan ukurannya.
- Foto dan pesan pribadi hanya ditampilkan sesuai pilihan publikasi pemilik.
- Sediakan kontrol musik yang jelas; jangan mengandalkan autoplay.
- Pertimbangkan opsi mengurangi animasi untuk kenyamanan pengguna.

## 10. Teknologi

- HTML5: struktur halaman.
- CSS3: tata letak dan animasi.
- JavaScript: interaksi, transisi, kontrol audio.
- PHP: panel admin dan penyimpanan konfigurasi.
- JSON: konfigurasi sederhana; MySQL opsional.
- XAMPP: server lokal selama pengembangan.
- Hosting yang mendukung PHP: publikasi website.

## 11. Struktur Folder yang Disarankan

```text
birthday-zahrah/
├── index.php
├── admin/
│   ├── index.php
│   ├── login.php
│   └── logout.php
├── api/
│   └── save-settings.php
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   ├── images/
│   │   ├── background-opening.jpg
│   │   ├── background-letter.jpg
│   │   └── memories/
│   └── audio/
│       └── birthday-song.mp3
├── data/
│   └── settings.json
└── README.md
```

Lindungi folder `data` dari akses publik langsung. Penyimpanan harus dilakukan melalui endpoint yang memeriksa sesi admin.

## 12. Kriteria Penerimaan

1. Halaman pembuka menampilkan identitas yang benar.
2. Kembang api dan kue terlihat.
3. Tombol membuka surat berfungsi.
4. Surat menampilkan ucapan, doa, dan foto.
5. Musik dapat diputar, dijeda, dan diganti.
6. Foto dan background dapat diganti tanpa mengedit kode.
7. Semua tulisan dapat diedit melalui panel admin.
8. Perubahan tersimpan setelah halaman dimuat ulang.
9. Website tampil baik di HP dan desktop.
10. Pengunjung tidak bisa mengubah konten.
11. Website dapat diakses melalui tautan publik setelah deployment.

## 13. Tahapan Pengembangan

1. Desain tampilan pembuka dan surat.
2. Bangun frontend HTML, CSS, dan JavaScript.
3. Tambahkan surat, galeri foto, dan transisi.
4. Integrasikan musik lokal dan/atau YouTube.
5. Buat panel admin untuk mengedit konten.
6. Implementasikan penyimpanan konfigurasi yang aman.
7. Uji fungsi, keamanan, browser, dan tampilan HP.
8. Deploy ke hosting dan uji tautan publik.

## 14. Catatan Deployment

- XAMPP hanya menjalankan website secara lokal; komputer lokal tidak otomatis menghasilkan tautan publik.
- Jika website memakai PHP dan panel admin, pilih hosting yang mendukung PHP dan MySQL bila diperlukan.
- Website statis bisa memakai hosting statis, tetapi panel admin PHP tidak akan berjalan di sana.
- Musik YouTube membutuhkan koneksi internet dan bergantung pada ketersediaan video serta kebijakan YouTube.
- Gunakan audio yang memiliki izin penggunaan.
- Sebelum membagikan tautan, uji website melalui HP dan browser lain.

## 15. Hasil Akhir

Website ulang tahun digital yang romantis, elegan, dan interaktif. Penerima melihat kembang api serta kue ulang tahun, membuka surat animatif, membaca ucapan dan doa, melihat foto kenangan, dan memutar musik pilihan.

Pemilik memiliki kendali atas nama, tanggal, tulisan, foto, background, warna, animasi, dan backsound melalui panel admin.

**Prinsip utama: satu website, banyak kemungkinan personalisasi, tanpa harus mengedit kode setiap kali ingin mengganti konten.**
