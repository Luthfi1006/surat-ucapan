<?php
session_start();
if (empty($_SESSION['zahrah_admin_logged_in'])) {
    header('Location: login.php');
    exit;
}

$settingsPath = __DIR__ . '/../data/settings.json';
$settingsJson = '{}';
if (file_exists($settingsPath)) {
    $settingsJson = file_get_contents($settingsPath);
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Panel Pengelolaan - Surat Ulang Tahun Zahrah (Sweet 21)</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Poppins', sans-serif;
      background: #090e24;
      color: #e2e8f0;
      padding: 30px 15px;
      min-height: 100vh;
    }
    .admin-container {
      max-width: 920px;
      margin: 0 auto;
      background: #11183c;
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 16px;
      padding: 35px 25px;
      box-shadow: 0 15px 40px rgba(0,0,0,0.6);
    }
    .header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding-bottom: 20px;
      margin-bottom: 25px;
      flex-wrap: wrap;
      gap: 15px;
    }
    .header-bar h1 { font-size: 1.6rem; color: #ffd700; }
    .nav-tabs { display: flex; gap: 10px; margin-bottom: 25px; flex-wrap: wrap; }
    .tab-btn {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.15);
      color: #cbd5e1;
      padding: 8px 18px;
      border-radius: 50px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 0.3s;
    }
    .tab-btn.active, .tab-btn:hover {
      background: linear-gradient(135deg, #ffd700 0%, #d4af37 100%);
      color: #0f172a;
      border-color: #ffd700;
    }
    .tab-content { display: none; }
    .tab-content.active { display: block; }
    .form-group { margin-bottom: 20px; }
    label { display: block; margin-bottom: 6px; font-size: 0.88rem; font-weight: 500; color: #f1f5f9; }
    input[type="text"], textarea {
      width: 100%;
      padding: 10px 14px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 8px;
      color: #fff;
      font-family: inherit;
      font-size: 0.95rem;
      outline: none;
    }
    input:focus, textarea:focus {
      border-color: #ffd700;
      box-shadow: 0 0 8px rgba(255, 215, 0, 0.3);
    }
    textarea { min-height: 100px; resize: vertical; }
    .help-note { font-size: 0.82rem; color: #a4b2d1; margin-top: 4px; }
    .info-box {
      background: rgba(212, 175, 55, 0.12);
      border-left: 4px solid #ffd700;
      padding: 15px 18px;
      border-radius: 6px;
      margin-bottom: 22px;
      font-size: 0.88rem;
      line-height: 1.6;
    }
    .info-box code {
      background: rgba(0,0,0,0.3);
      padding: 2px 6px;
      border-radius: 4px;
      color: #ffd700;
      font-family: monospace;
    }
    .wish-edit-card, .photo-edit-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 10px;
      padding: 18px;
      margin-bottom: 16px;
    }
    .btn {
      padding: 10px 22px;
      border-radius: 50px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.95rem;
      border: none;
      transition: all 0.3s;
    }
    .btn-gold { background: linear-gradient(135deg, #ffd700 0%, #d4af37 100%); color: #1a1200; }
    .btn-secondary { background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.2); }
    .btn-danger { background: #e63946; color: #fff; }
    .btn-sm { padding: 6px 14px; font-size: 0.8rem; }
    .bottom-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 35px;
      padding-top: 20px;
      border-top: 1px solid rgba(255,255,255,0.1);
      flex-wrap: wrap;
      gap: 15px;
    }
    .alert-box {
      padding: 12px 18px;
      border-radius: 8px;
      margin-bottom: 20px;
      display: none;
      font-size: 0.9rem;
    }
    .alert-success { background: rgba(46, 196, 182, 0.2); border: 1px solid #2ec4b6; color: #a7f3d0; }
  </style>
</head>
<body>

  <div class="admin-container">
    <div class="header-bar">
      <div>
        <h1>Panel Pengelolaan Surat Zahrah (Sweet 21) ✨</h1>
        <p style="font-size: 0.85rem; color: #94a3b8;">Ubah teks, doa & harapan, foto kenangan, dan musik sesuai keinginanmu.</p>
      </div>
      <div>
        <a href="../" target="_blank" class="btn btn-secondary">Lihat Web 👁️</a>
        <a href="logout.php" class="btn btn-danger">Keluar 🚪</a>
      </div>
    </div>

    <div id="status-alert" class="alert-box alert-success"></div>

    <div class="nav-tabs">
      <button class="tab-btn active" onclick="switchTab('tab-identity')">Identitas 👤</button>
      <button class="tab-btn" onclick="switchTab('tab-letter')">Isi Surat 📜</button>
      <button class="tab-btn" onclick="switchTab('tab-wishes')">Doa & Harapan ✨</button>
      <button class="tab-btn" onclick="switchTab('tab-photos')">Foto Kenangan 📸</button>
      <button class="tab-btn" onclick="switchTab('tab-music')">Musik Latar 🎵</button>
    </div>

    <!-- TAB 1: IDENTITAS -->
    <div id="tab-identity" class="tab-content active">
      <div class="form-group">
        <label>Nama Lengkap Penerima</label>
        <input type="text" id="cfg-recipient">
      </div>
      <div class="form-group">
        <label>Tanggal Lahir</label>
        <input type="text" id="cfg-birthDate">
      </div>
      <div class="form-group">
        <label>Tanggal Perayaan Sekarang</label>
        <input type="text" id="cfg-currentDate" placeholder="Contoh: 20 Oktober 2026">
      </div>
      <div class="form-group">
        <label>Nama Pengirim</label>
        <input type="text" id="cfg-sender">
      </div>
      <div class="form-group">
        <label>Nomor WhatsApp Pengirim (untuk menerima balasan)</label>
        <input type="text" id="cfg-whatsappNumber" placeholder="Contoh: 0895333227653">
      </div>
      <div class="form-group">
        <label>Judul Tab Website</label>
        <input type="text" id="cfg-websiteTitle">
      </div>
      <div class="form-group">
        <label>Sapaan di Pembuka (Hero)</label>
        <input type="text" id="cfg-heroGreeting">
      </div>
    </div>

    <!-- TAB 2: SURAT -->
    <div id="tab-letter" class="tab-content">
      <div class="form-group">
        <label>Pita Badge Atas (Bahasa Inggris)</label>
        <input type="text" id="cfg-sectionBadge" value="A Letter From Your Beloved">
      </div>
      <div class="form-group">
        <label>Judul Utama Halaman Surat</label>
        <input type="text" id="cfg-headingMain" value="Selamat Ulang Tahun ke-21, Sayang! 🎂">
      </div>
      <div class="form-group">
        <label>Subjudul Halaman Surat</label>
        <input type="text" id="cfg-headingSub" value="20 Oktober 2026 • Lembaran Baru yang Indah">
      </div>
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 15px;">
        <div class="form-group">
          <label>Judul Kertas Surat (Baris 1)</label>
          <input type="text" id="cfg-titleLine1" value="Untuk Zahrah Rahmadini">
          <p class="help-note">Ditaruh di baris atas.</p>
        </div>
        <div class="form-group">
          <label>Judul Kertas Surat (Baris 2)</label>
          <input type="text" id="cfg-titleLine2" value="di Usia ke-21 Tahunmu ❤️">
          <p class="help-note">Ditaruh di baris bawahnya tanpa koma.</p>
        </div>
      </div>
      <div class="form-group">
        <label>Sapaan Awal Surat</label>
        <input type="text" id="cfg-letterGreeting">
      </div>
      <div class="form-group">
        <label>Isi Paragraf Surat (Pisahkan tiap paragraf dengan enter / baris baru)</label>
        <textarea id="cfg-letterParagraphs" style="min-height: 250px;"></textarea>
      </div>
      <div class="form-group">
        <label>Kata Penutup</label>
        <input type="text" id="cfg-letterClosing">
      </div>
      <div class="form-group">
        <label>Tanda Tangan Surat</label>
        <input type="text" id="cfg-letterSignature">
      </div>
    </div>

    <!-- TAB 3: DOA & HARAPAN -->
    <div id="tab-wishes" class="tab-content">
      <div class="info-box">
        💡 <strong>Kustomisasi Fitur Doa & Harapan:</strong><br>
        Kamu bisa mengubah nama badge/fitur (misal: "Doa Tulusku", "Harapan Terbaik"), judul besar, subjudul, serta menambahkan atau mengedit isi setiap kartu doa di bawah!
      </div>
      <div class="form-group">
        <label>Nama Fitur / Label Badge</label>
        <input type="text" id="cfg-wishesBadge" placeholder="Contoh: ✨ Doa & Harapan Terbaik">
      </div>
      <div class="form-group">
        <label>Judul Bagian Doa</label>
        <input type="text" id="cfg-wishesTitle" placeholder="Contoh: Harapan Indah untuk Usia 21 Tahunmu">
      </div>
      <div class="form-group">
        <label>Subjudul / Pesan Pengantar</label>
        <input type="text" id="cfg-wishesSubtitle" placeholder="Contoh: Doa-doa tulus yang selalu kupanjatkan untukmu, sayang:">
      </div>

      <h4 style="color:#ffd700; margin: 25px 0 15px;">Daftar Kartu Doa & Harapan:</h4>
      <div id="wishes-items-container"></div>
      <button type="button" class="btn btn-secondary btn-sm" onclick="addNewWishItem()">+ Tambah Doa Baru</button>
    </div>

    <!-- TAB 4: FOTO KENANGAN -->
    <div id="tab-photos" class="tab-content">
      <div class="info-box">
        📸 <strong>Maksud dari "Foto Online" vs "Foto Lokal":</strong><br><br>
        <strong>1. Apa itu Foto Online?</strong><br>
        Foto online adalah foto yang sudah berada di internet dan memiliki link langsung yang bisa diakses siapa saja di browser.<br>
        <em>Contoh Foto Online:</em><br>
        • Link langsung: <code>https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600</code><br>
        • Link dari Imgur: <code>https://i.imgur.com/namafoto.jpg</code><br>
        • Link dari Postimages: <code>https://i.postimg.cc/contoh/foto.jpg</code><br><br>
        <strong>2. Apa itu Foto Lokal (Fotomu Berdua Sendiri)?</strong><br>
        Jika kamu punya foto sendiri di laptop, kamu <strong>tidak perlu upload ke web lain</strong>! Cukup masukkan file fotomu ke dalam folder: <code>assets/images/memories/</code> (misal: <code>foto1.jpg</code>). Lalu di kolom URL foto di bawah, ketikkan: <code>assets/images/memories/foto1.jpg</code>.
      </div>
      <div id="photos-container"></div>
    </div>

    <!-- TAB 5: MUSIK -->
    <div id="tab-music" class="tab-content">
      <div class="form-group">
        <label>Judul Lagu</label>
        <input type="text" id="cfg-musicTitle">
      </div>
      <div class="form-group">
        <label>Nama Penyanyi</label>
        <input type="text" id="cfg-musicArtist">
      </div>
      <div class="form-group">
        <label>ID Video YouTube (Default: Monokrom - Tulus)</label>
        <input type="text" id="cfg-musicYoutubeId" value="s5e_t7tB38E">
        <p class="help-note">Contoh: untuk link <code>https://www.youtube.com/watch?v=s5e_t7tB38E</code>, kodenya adalah <code>s5e_t7tB38E</code>.</p>
      </div>
    </div>

    <div class="bottom-actions">
      <button class="btn btn-secondary" onclick="exportJsonFile()">Unduh File settings.json 📥</button>
      <button class="btn btn-gold" onclick="saveSettingsToServer()">Simpan Semua Perubahan 💾</button>
    </div>
  </div>

  <script>
    let SETTINGS = <?php echo $settingsJson ?: '{}'; ?>;

    function switchTab(tabId) {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      event.target.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    }

    function populateForm() {
      document.getElementById('cfg-recipient').value = SETTINGS.recipient || '';
      document.getElementById('cfg-birthDate').value = SETTINGS.birthDate || '';
      document.getElementById('cfg-currentDate').value = SETTINGS.currentDate || '20 Oktober 2026';
      document.getElementById('cfg-sender').value = SETTINGS.sender || '';
      document.getElementById('cfg-whatsappNumber').value = SETTINGS.whatsappNumber || '0895333227653';
      document.getElementById('cfg-websiteTitle').value = SETTINGS.websiteTitle || '';
      document.getElementById('cfg-heroGreeting').value = SETTINGS.opening?.heroGreeting || '';

      document.getElementById('cfg-sectionBadge').value = SETTINGS.letter?.sectionBadge || 'A Letter From Your Beloved';
      document.getElementById('cfg-headingMain').value = SETTINGS.letter?.headingMain || 'Selamat Ulang Tahun ke-21, Sayang! 🎂';
      document.getElementById('cfg-headingSub').value = SETTINGS.letter?.headingSub || '20 Oktober 2026 • Lembaran Baru yang Indah';
      document.getElementById('cfg-titleLine1').value = SETTINGS.letter?.titleLine1 || 'Untuk Zahrah Rahmadini';
      document.getElementById('cfg-titleLine2').value = SETTINGS.letter?.titleLine2 || 'di Usia ke-21 Tahunmu ❤️';
      document.getElementById('cfg-letterGreeting').value = SETTINGS.letter?.greeting || '';
      document.getElementById('cfg-letterParagraphs').value = (SETTINGS.letter?.paragraphs || []).join('\n\n');
      document.getElementById('cfg-letterClosing').value = SETTINGS.letter?.closing || '';
      document.getElementById('cfg-letterSignature').value = SETTINGS.letter?.signature || '';

      document.getElementById('cfg-wishesBadge').value = SETTINGS.wishesSection?.badge || '✨ Doa & Harapan Terbaik';
      document.getElementById('cfg-wishesTitle').value = SETTINGS.wishesSection?.title || 'Harapan Indah untuk Usia 21 Tahunmu';
      document.getElementById('cfg-wishesSubtitle').value = SETTINGS.wishesSection?.subtitle || '';
      renderWishesList();

      renderPhotosList();

      document.getElementById('cfg-musicTitle').value = SETTINGS.music?.title || 'Monokrom';
      document.getElementById('cfg-musicArtist').value = SETTINGS.music?.artist || 'Tulus';
      document.getElementById('cfg-musicYoutubeId').value = SETTINGS.music?.youtubeId || 's5e_t7tB38E';
    }

    function renderWishesList() {
      const container = document.getElementById('wishes-items-container');
      container.innerHTML = '';
      const items = SETTINGS.wishesSection?.items || [];

      items.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = 'wish-edit-card';
        div.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <strong style="color:#ffd700;">Doa #${idx+1}</strong>
            <button type="button" class="btn btn-danger btn-sm" onclick="removeWishItem(${idx})">Hapus 🗑️</button>
          </div>
          <div style="display:grid; grid-template-columns: 80px 1fr; gap:10px; margin-bottom:10px;">
            <div>
              <label>Ikon</label>
              <input type="text" class="wish-icon-input" value="${item.icon || '✨'}" style="text-align:center;">
            </div>
            <div>
              <label>Judul Doa</label>
              <input type="text" class="wish-title-input" value="${item.title || ''}">
            </div>
          </div>
          <div>
            <label>Pesan Doa & Harapan</label>
            <textarea class="wish-desc-input" style="min-height:70px;">${item.desc || ''}</textarea>
          </div>
        `;
        container.appendChild(div);
      });
    }

    function addNewWishItem() {
      if (!SETTINGS.wishesSection) SETTINGS.wishesSection = { items: [] };
      if (!SETTINGS.wishesSection.items) SETTINGS.wishesSection.items = [];
      SETTINGS.wishesSection.items.push({
        icon: '💖',
        title: 'Harapan Baru',
        desc: 'Tuliskan doa indahmu untuk Zahrah di sini ya sayang.'
      });
      renderWishesList();
    }

    function removeWishItem(index) {
      if (confirm('Hapus doa ini?')) {
        SETTINGS.wishesSection.items.splice(index, 1);
        renderWishesList();
      }
    }

    function renderPhotosList() {
      const container = document.getElementById('photos-container');
      container.innerHTML = '';
      (SETTINGS.memories || []).forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = 'photo-edit-card';
        div.innerHTML = `
          <h4 style="color:#ffd700; margin-bottom:10px;">Foto Polaroid #${idx+1}</h4>
          <div class="form-group">
            <label>URL Gambar (Bisa link online atau path folder misal: assets/images/memories/foto1.jpg)</label>
            <input type="text" class="photo-img-input" value="${item.image || ''}">
          </div>
          <div class="form-group">
            <label>Judul / Caption Foto</label>
            <input type="text" class="photo-caption-input" value="${item.caption || ''}">
          </div>
          <div class="form-group">
            <label>Catatan Rahasia di Balik Foto</label>
            <input type="text" class="photo-note-input" value="${item.backNote || ''}">
          </div>
        `;
        container.appendChild(div);
      });
    }

    function gatherDataFromForm() {
      SETTINGS.recipient = document.getElementById('cfg-recipient').value;
      SETTINGS.birthDate = document.getElementById('cfg-birthDate').value;
      SETTINGS.currentDate = document.getElementById('cfg-currentDate').value;
      SETTINGS.sender = document.getElementById('cfg-sender').value;
      SETTINGS.whatsappNumber = document.getElementById('cfg-whatsappNumber').value;
      SETTINGS.websiteTitle = document.getElementById('cfg-websiteTitle').value;
      if (!SETTINGS.opening) SETTINGS.opening = {};
      SETTINGS.opening.heroGreeting = document.getElementById('cfg-heroGreeting').value;

      if (!SETTINGS.letter) SETTINGS.letter = {};
      SETTINGS.letter.sectionBadge = document.getElementById('cfg-sectionBadge').value;
      SETTINGS.letter.headingMain = document.getElementById('cfg-headingMain').value;
      SETTINGS.letter.headingSub = document.getElementById('cfg-headingSub').value;
      SETTINGS.letter.titleLine1 = document.getElementById('cfg-titleLine1').value;
      SETTINGS.letter.titleLine2 = document.getElementById('cfg-titleLine2').value;
      SETTINGS.letter.greeting = document.getElementById('cfg-letterGreeting').value;
      SETTINGS.letter.paragraphs = document.getElementById('cfg-letterParagraphs').value
        .split('\n')
        .map(p => p.trim())
        .filter(p => p.length > 0);
      SETTINGS.letter.closing = document.getElementById('cfg-letterClosing').value;
      SETTINGS.letter.signature = document.getElementById('cfg-letterSignature').value;

      if (!SETTINGS.wishesSection) SETTINGS.wishesSection = {};
      SETTINGS.wishesSection.badge = document.getElementById('cfg-wishesBadge').value;
      SETTINGS.wishesSection.title = document.getElementById('cfg-wishesTitle').value;
      SETTINGS.wishesSection.subtitle = document.getElementById('cfg-wishesSubtitle').value;

      const wishIcons = document.querySelectorAll('.wish-icon-input');
      const wishTitles = document.querySelectorAll('.wish-title-input');
      const wishDescs = document.querySelectorAll('.wish-desc-input');
      SETTINGS.wishesSection.items = [];
      wishIcons.forEach((inp, i) => {
        SETTINGS.wishesSection.items.push({
          icon: inp.value,
          title: wishTitles[i].value,
          desc: wishDescs[i].value
        });
      });

      const imgInputs = document.querySelectorAll('.photo-img-input');
      const capInputs = document.querySelectorAll('.photo-caption-input');
      const noteInputs = document.querySelectorAll('.photo-note-input');
      SETTINGS.memories = [];
      imgInputs.forEach((inp, i) => {
        SETTINGS.memories.push({
          image: inp.value,
          caption: capInputs[i].value,
          backNote: noteInputs[i].value,
          date: 'Momen Indah'
        });
      });

      if (!SETTINGS.music) SETTINGS.music = {};
      SETTINGS.music.title = document.getElementById('cfg-musicTitle').value;
      SETTINGS.music.artist = document.getElementById('cfg-musicArtist').value;
      SETTINGS.music.youtubeId = document.getElementById('cfg-musicYoutubeId').value;
      SETTINGS.music.youtubeUrl = `https://www.youtube.com/watch?v=${SETTINGS.music.youtubeId}`;

      return SETTINGS;
    }

    async function saveSettingsToServer() {
      const data = gatherDataFromForm();
      const alertBox = document.getElementById('status-alert');
      try {
        const res = await fetch('../api/save-settings.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success) {
          alertBox.style.display = 'block';
          alertBox.textContent = '✅ ' + result.message;
          setTimeout(() => alertBox.style.display = 'none', 3000);
        } else {
          alert('Gagal: ' + result.message);
        }
      } catch(err) {
        localStorage.setItem('zahrah_custom_settings', JSON.stringify(data));
        alertBox.style.display = 'block';
        alertBox.textContent = '✅ Pengaturan tersimpan ke memori browser!';
        setTimeout(() => alertBox.style.display = 'none', 3000);
      }
    }

    function exportJsonFile() {
      const data = gatherDataFromForm();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'settings.json';
      a.click();
    }

    document.addEventListener('DOMContentLoaded', populateForm);
  </script>
</body>
</html>
