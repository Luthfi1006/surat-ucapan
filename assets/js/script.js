// =============================================================================
// A BIRTHDAY LETTER FOR ZAHRAH (SWEET 21 - 20 OKTOBER 2026)
// Interactive Fireworks • 21 Candles • 3D Envelope • Guaranteed Audio Engine
// =============================================================================

let APP_DATA = null;
let isMusicPlaying = false;
let webAudioCtx = null;
let melodyInterval = null;

function getWhatsAppNumber() {
  let num = (APP_DATA && APP_DATA.whatsappNumber) ? APP_DATA.whatsappNumber : "62895333227653";
  num = num.toString().replace(/\D/g, "");
  if (num.startsWith("0")) {
    num = "62" + num.substring(1);
  }
  return num;
}

document.addEventListener("DOMContentLoaded", async () => {
  await initSettings();
  initBackgroundStars();
  initInteractiveFireworks();
  setupAudioEngine();
  setupCakeAndCandles();
  setupEnvelopeStage();
  setupWishes21();
  setupPolaroidGallery();
  setupReplySection();
  setupTouchSparks();
  setupClosingActions();
});

// -----------------------------------------------------------------------------
// 1. INISIALISASI PENGATURAN (JSON / FALLBACK CONFIG)
// -----------------------------------------------------------------------------
async function initSettings() {
  const fallback = {
    recipient: "Zahrah Rahmadini",
    birthDate: "20 Oktober 2005",
    currentDate: "20 Oktober 2026",
    age: 21,
    sender: "Seseorang yang selalu menyayangimu ❤️",
    whatsappNumber: "62895333227653",
    websiteTitle: "A Birthday Letter for Zahrah ✨ (Sweet 21)",
    opening: {
      tagline: "✨ 20 OKTOBER 2026 • HARI SPESIAL UNTUK SAYANGKU ✨",
      heroGreeting: "Happy 21st Birthday, Sayang! 🎂",
      dateDisplay: "20 Oktober 2026 • 21 Tahun",
      openButtonText: "Buka Suratmu 💌",
      hint: "✨ Nyalakan suaramu & sentuh langit malam untuk kembang api ✨",
      recipientDisplay: "Sayangku ❤️"
    },
    cake: {
      enabled: true,
      title: "Tiup Lilin 21 Tahunmu, Sayang! 🎂",
      subtitle: "Tutup matamu sejenak, bisikkan doa dan impian terindahmu di usia 21 ini, lalu sentuh lilinnya untuk meniup!",
      successMessage: "Doamu di usia ke-21 telah melesat menuju semesta. Semoga setiap langkahmu selalu dipeluk ketenangan, kesuksesan, dan kebahagiaan yang melimpah ya sayang. Amin paling serius! 💖"
    },
    letter: {
      sectionBadge: "A Letter From Your Beloved",
      headingMain: "Selamat Ulang Tahun ke-21, Sayang! 🎂",
      headingSub: "20 Oktober 2026 • Lembaran Baru yang Indah",
      titleLine1: "Untuk Zahrah Rahmadini",
      titleLine2: "di Usia ke-21 Tahunmu ❤️",
      greeting: "Happy 21st birthday sayangkuu. Selamat bertambah usia.",
      paragraphs: [
        "Hari ini, 20 Oktober 2026, adalah hari yang teramat istimewa untukmu, sayang. Tepat 21 tahun yang lalu, seorang perempuan berhati hangat, tulus, dan teramat berharga hadir ke dunia, membawa begitu banyak warna dan kebahagiaan.",
        "Memasuki usia 21 tahun adalah lembaran baru yang begitu indah dalam perjalanan hidupmu, sayangku. Di hari yang penuh berkah ini, aku berdoa dengan setulus hatiku, semoga kamu selalu dilimpahi kesehatan yang sempurna, ketenangan hati, pikiran yang damai, serta kemudahan dalam setiap urusan dan impian yang sedang kamu tuju.",
        "Semoga semua rencana baik yang kamu perjuangkan perlahan berbuah manis menjadi nyata. Semoga setiap rasa lelahmu dibayar tuntas dengan rasa bahagia, setiap doa yang kamu simpan dalam diam menemukan jalannya di waktu yang paling indah, dan setiap air mata yang pernah jatuh berganti menjadi ribuan alasan untuk tersenyum lepas.",
        "Terima kasih sudah bertahan, bertumbuh, dan selalu menjadi dirimu yang begitu kuat, hangat, dan luar biasa sampai hari ini. Bersamamu, hal-hal sederhana selalu terasa jauh lebih bermakna. Senyumanmu adalah hal favorit yang selalu ingin kujaga.",
        "Di usia ke-21 ini, mungkin dunia akan menghadirkan lembaran dan tantangan baru. Tapi ingatlah selalu ya sayang, kamu tidak pernah sendirian. Kamu selalu punya aku di sini yang siap mendengarkan, menggenggam tanganmu, dan selalu mendukung setiap langkah hebatmu.",
        "Selamat ulang tahun ke-21 ya, sayangku. Semoga semesta selalu punya cara terindah untuk membuatmu tersenyum bahagia hari ini dan seterusnya."
      ],
      closing: "With all my love & prayers,",
      signature: "Seseorang yang selalu menyayangimu ❤️"
    },
    wishesSection: {
      badge: "✨ Doa & Harapan Terbaik",
      title: "Harapan Indah untuk Usia 21 Tahunmu",
      subtitle: "Doa-doa tulus yang selalu kupanjatkan untuk setiap detik dan langkah perjalananmu ke depan, sayang:",
      items: [
        {
          icon: "🌱",
          title: "Ketenangan & Kebahagiaan Hati",
          desc: "Semoga hatimu selalu lapang, dipenuhi rasa damai, dan dijauhkan dari segala cemas di lembaran barumu ya sayang."
        },
        {
          icon: "🎓",
          title: "Kelancaran Impian & Masa Depan",
          desc: "Semoga setiap studi, karier, dan rencana besar yang sedang kamu rawat dibukakan pintu kemudahan dan kesuksesan gemilang."
        },
        {
          icon: "🛡️",
          title: "Kesehatan & Perlindungan Sempurna",
          desc: "Semoga kamu selalu dijaga dari segala lelah, diberikan tubuh yang sehat bugar, dan energi kebaikan setiap hari."
        },
        {
          icon: "💖",
          title: "Selalu Dikelilingi Ketulusan",
          desc: "Semoga di mana pun langkahmu berpijak, kamu selalu dipertemukan dengan orang-orang yang tulus menyayangimu apa adanya."
        }
      ]
    },
    memories: [
      {
        image: "assets/images/memories/foto1.jpg",
        caption: "Senyuman Manismu 🌸",
        date: "Momen Berharga",
        backNote: "Senyumanmu selalu punya cara ajaib untuk mengubah hari yang melelahkan jadi terasa penuh ketenangan, sayang."
      },
      {
        image: "assets/images/memories/foto2.jpg",
        caption: "Obrolan Hangat ☕",
        date: "Waktu Bersama",
        backNote: "Mendengarkan tawamu dan bercerita tentang hal-hal kecil adalah salah satu momen yang paling kusyukuri."
      },
      {
        image: "assets/images/memories/foto3.jpg",
        caption: "Tawa Lepas ✨",
        date: "Hari yang Cerah",
        backNote: "Semoga tawa bahagiamu ini tidak pernah pudar ya sayang, di usia ke-21 ini dan selamanya."
      },
      {
        image: "assets/images/memories/foto4.jpg",
        caption: "Binar Matamu yang Tulus 💫",
        date: "Setiap Hari",
        backNote: "Terima kasih sudah selalu menjadi dirimu yang hangat, tulus, dan luar biasa untukku."
      }
    ],
    music: {
      title: "Monokrom",
      artist: "Tulus",
      url: "assets/audio/monokrom.mp3",
      fallbackUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3"
    }
  };

  const localSaved = localStorage.getItem("zahrah_custom_settings");
  if (localSaved) {
    try { APP_DATA = JSON.parse(localSaved); } catch(e) {}
  }

  if (!APP_DATA) {
    try {
      const res = await fetch("data/settings.json");
      if (res.ok) {
        APP_DATA = await res.json();
      } else {
        APP_DATA = fallback;
      }
    } catch (err) {
      APP_DATA = fallback;
    }
  }

  renderDataToDom(APP_DATA);
}

function renderDataToDom(data) {
  document.title = data.websiteTitle || `A Birthday Letter for ${data.recipient} (Sweet 21)`;

  // Stage 1 Opening: TAMPILAN AWAL HANYA "SAYANGKU" TANPA NAMA DIA
  const recipientTitle = document.getElementById("opening-recipient-name");
  if (recipientTitle) {
    recipientTitle.textContent = "Sayangku ❤️";
  }

  const badgeTagline = document.getElementById("opening-badge-tagline");
  if (badgeTagline && data.opening?.tagline) {
    badgeTagline.textContent = "✨ 20 OKTOBER 2026 • HARI SPESIAL UNTUK SAYANGKU ✨";
  }

  const heroGreeting = document.getElementById("opening-hero-greeting");
  if (heroGreeting) {
    heroGreeting.textContent = "Happy 21st Birthday, Sayang! 🎂";
  }

  const dateEl = document.getElementById("opening-birth-date");
  if (dateEl) {
    dateEl.textContent = data.opening?.dateDisplay || "20 Oktober 2026 • 21 Tahun";
  }

  // Stage 3 Letter Header
  const secBadge = document.getElementById("letter-section-badge");
  if (secBadge) {
    secBadge.textContent = `📜 ${data.letter?.sectionBadge || "A LETTER FROM YOUR BELOVED"} • SWEET 21 📜`;
  }

  const headMain = document.getElementById("letter-heading-main");
  if (headMain) {
    headMain.textContent = data.letter?.headingMain || "Selamat Ulang Tahun ke-21, Sayang! 🎂";
  }

  const headSub = document.getElementById("letter-heading-sub");
  if (headSub) {
    headSub.textContent = data.letter?.headingSub || "20 Oktober 2026 • Lembaran Baru yang Indah";
  }

  // Parchment Title Lines (Nama Zahrah Rahmadini baru muncul di dalam surat)
  const titleLine1 = document.getElementById("parchment-title-line1");
  if (titleLine1) {
    titleLine1.textContent = data.letter?.titleLine1 || `Untuk ${data.recipient}`;
  }

  const titleLine2 = document.getElementById("parchment-title-line2");
  if (titleLine2) {
    titleLine2.textContent = data.letter?.titleLine2 || "di Usia ke-21 Tahunmu ❤️";
  }

  const letterGreeting = document.getElementById("parchment-greeting");
  if (letterGreeting) {
    letterGreeting.textContent = data.letter?.greeting || "Happy 21st birthday sayangkuu. Selamat bertambah usia.";
  }

  const letterBody = document.getElementById("parchment-body");
  if (letterBody && data.letter?.paragraphs) {
    letterBody.innerHTML = "";
    data.letter.paragraphs.forEach((pText) => {
      const p = document.createElement("p");
      p.textContent = pText;
      letterBody.appendChild(p);
    });
  }

  const letterClosing = document.getElementById("parchment-closing");
  if (letterClosing) letterClosing.textContent = data.letter?.closing || "With all my love & prayers,";

  const letterSign = document.getElementById("parchment-signature");
  if (letterSign) letterSign.textContent = data.letter?.signature || data.sender;

  // Wishes Section
  const wishesBadge = document.getElementById("wishes-badge-text");
  if (wishesBadge && data.wishesSection?.badge) wishesBadge.textContent = data.wishesSection.badge;

  const wishesTitle = document.getElementById("wishes-title-text");
  if (wishesTitle && data.wishesSection?.title) wishesTitle.textContent = data.wishesSection.title;

  const wishesSub = document.getElementById("wishes-subtitle-text");
  if (wishesSub && data.wishesSection?.subtitle) wishesSub.textContent = data.wishesSection.subtitle;

  // Music Widget Title
  const musicTitleEl = document.getElementById("music-track-title");
  if (musicTitleEl) {
    const artist = data.music?.artist ? ` - ${data.music.artist}` : "";
    musicTitleEl.textContent = `${data.music?.title || "Monokrom"}${artist}`;
  }

  const footerCredit = document.getElementById("footer-credit-text");
  if (footerCredit) {
    footerCredit.textContent = `Diciptakan dengan segenap cinta khusus untuk Sayangku oleh ${data.sender}`;
  }
}

// -----------------------------------------------------------------------------
// 2. KEMBANG API & BINTANG LANGIT MALAM (CANVAS)
// -----------------------------------------------------------------------------
let fireworksCanvas, fireworksCtx;
let fireworksParticles = [];
let rockets = [];
let fireworkAutoTimer = null;

function initBackgroundStars() {
  const canvas = document.getElementById("stars-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const stars = [];
  for (let i = 0; i < 90; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      delta: (Math.random() - 0.5) * 0.02
    });
  }

  function drawStars() {
    ctx.clearRect(0, 0, w, h);
    stars.forEach((s) => {
      s.alpha += s.delta;
      if (s.alpha <= 0.1 || s.alpha >= 0.9) s.delta = -s.delta;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 235, 179, ${s.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }
  drawStars();
}

function initInteractiveFireworks() {
  fireworksCanvas = document.getElementById("fireworks-canvas");
  if (!fireworksCanvas) return;
  fireworksCtx = fireworksCanvas.getContext("2d");

  let w = (fireworksCanvas.width = window.innerWidth);
  let h = (fireworksCanvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    w = fireworksCanvas.width = window.innerWidth;
    h = fireworksCanvas.height = window.innerHeight;
  });

  window.addEventListener("pointerdown", (e) => {
    if (e.target.closest("button") || e.target.closest("textarea") || e.target.closest(".wax-seal-badge") || e.target.closest("a")) {
      return;
    }
    launchRocket(e.clientX, e.clientY);
  });

  function animateFireworks() {
    fireworksCtx.fillStyle = "rgba(5, 8, 24, 0.22)";
    fireworksCtx.fillRect(0, 0, w, h);

    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i];
      r.x += r.vx;
      r.y += r.vy;
      r.vy += 0.05;

      fireworksCtx.beginPath();
      fireworksCtx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
      fireworksCtx.fillStyle = r.color;
      fireworksCtx.shadowColor = r.color;
      fireworksCtx.shadowBlur = 8;
      fireworksCtx.fill();

      if (r.vy >= -0.5 || r.y <= r.targetY) {
        createExplosion(r.x, r.y, r.color);
        rockets.splice(i, 1);
      }
    }

    for (let i = fireworksParticles.length - 1; i >= 0; i--) {
      const p = fireworksParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.96;
      p.vy *= 0.96;
      p.vy += 0.06;
      p.alpha -= p.decay;

      fireworksCtx.beginPath();
      fireworksCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      fireworksCtx.fillStyle = p.color.replace("ALPHA", p.alpha);
      fireworksCtx.shadowColor = p.color.replace("ALPHA", "1");
      fireworksCtx.shadowBlur = 6;
      fireworksCtx.fill();

      if (p.alpha <= 0) {
        fireworksParticles.splice(i, 1);
      }
    }

    requestAnimationFrame(animateFireworks);
  }

  animateFireworks();
  startAutoFireworks();
}

function launchRocket(targetX, targetY) {
  const startX = targetX + (Math.random() * 80 - 40);
  const startY = window.innerHeight;
  const speed = 12 + Math.random() * 3;
  const angle = Math.atan2(targetY - startY, targetX - startX);

  const colors = ["#ffd700", "#ff758f", "#70d6ff", "#e0aaff", "#ff9e00", "#ffffff"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  rockets.push({
    x: startX,
    y: startY,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    targetY: targetY,
    color: color
  });
}

function createExplosion(x, y, baseColor) {
  const count = 45;
  const colors = [
    "rgba(255, 215, 0, ALPHA)",
    "rgba(255, 117, 143, ALPHA)",
    "rgba(112, 214, 255, ALPHA)",
    "rgba(224, 170, 255, ALPHA)",
    "rgba(255, 255, 255, ALPHA)"
  ];
  const chosenColor = colors[Math.floor(Math.random() * colors.length)];

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 / count) * i + (Math.random() * 0.4);
    const speed = Math.random() * 5 + 1.5;
    fireworksParticles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 2 + 1.2,
      alpha: 1,
      decay: Math.random() * 0.02 + 0.015,
      color: chosenColor
    });
  }
}

function startAutoFireworks() {
  if (fireworkAutoTimer) clearInterval(fireworkAutoTimer);
  fireworkAutoTimer = setInterval(() => {
    const tx = window.innerWidth * (0.2 + Math.random() * 0.6);
    const ty = window.innerHeight * (0.15 + Math.random() * 0.35);
    launchRocket(tx, ty);
  }, 1600);
}

// -----------------------------------------------------------------------------
// 3. TAHAP 1: KUE ULANG TAHUN & DUAL LILIN ANGKA 21
// -----------------------------------------------------------------------------
function setupCakeAndCandles() {
  const cakeTrigger = document.getElementById("opening-cake-trigger");
  const flame2 = document.getElementById("candle-flame-2");
  const flame1 = document.getElementById("candle-flame-1");
  const smoke2 = document.getElementById("candle-smoke-2");
  const smoke1 = document.getElementById("candle-smoke-1");
  const hint = document.getElementById("cake-tap-hint-text");

  let blown = false;

  const blowCandles = () => {
    if (blown) return;
    blown = true;

    if (flame2) flame2.classList.add("extinguished");
    if (flame1) flame1.classList.add("extinguished");
    if (smoke2) smoke2.classList.add("active");
    if (smoke1) smoke1.classList.add("active");

    if (hint) {
      hint.textContent = "✨ Lilin 21 tahunmu telah ditiup! Doa terbaikmu melesat ke semesta ya sayang ✨";
      hint.style.color = "#ffd700";
    }

    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        launchRocket(
          window.innerWidth * (0.2 + Math.random() * 0.6),
          window.innerHeight * (0.15 + Math.random() * 0.3)
        );
      }, i * 200);
    }

    if (typeof confetti === "function") {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.65 },
        colors: ["#ffd700", "#ff8fab", "#70d6ff", "#ffffff", "#e0aaff"]
      });
    }
  };

  if (cakeTrigger) cakeTrigger.addEventListener("click", blowCandles);
}

// -----------------------------------------------------------------------------
// 4. TAHAP 2: BUKA SURAT DENGAN AMPLOP 3D
// -----------------------------------------------------------------------------
function setupEnvelopeStage() {
  const openTriggerBtn = document.getElementById("open-letter-trigger-btn");
  const modalOverlay = document.getElementById("envelope-modal-overlay");
  const envelopeCore = document.getElementById("envelope-core-box");
  const waxSeal = document.getElementById("wax-seal-button");
  const stageOpening = document.getElementById("stage-opening");
  const stageLetter = document.getElementById("stage-letter-main");
  const musicWidget = document.getElementById("music-floating-widget");

  let isOpened = false;

  const startEnvelopeSequence = () => {
    if (isOpened) return;
    isOpened = true;

    envelopeCore.classList.add("opened");

    // Langsung putar musik secara instan
    playAudioTrack();
    if (musicWidget) musicWidget.classList.remove("hidden");

    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        launchRocket(
          window.innerWidth * (0.2 + Math.random() * 0.6),
          window.innerHeight * (0.15 + Math.random() * 0.3)
        );
      }, i * 200);
    }

    if (typeof confetti === "function") {
      confetti({
        particleCount: 110,
        spread: 100,
        origin: { y: 0.55 },
        colors: ["#ffd700", "#fbe38e", "#ff8fab", "#ffffff"]
      });
    }

    setTimeout(() => {
      modalOverlay.classList.remove("active");
      stageOpening.classList.add("hidden");
      stageOpening.classList.remove("active");

      stageLetter.classList.remove("hidden");
      stageLetter.classList.add("active");

      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  };

  if (openTriggerBtn) {
    openTriggerBtn.addEventListener("click", () => {
      modalOverlay.classList.add("active");
      setTimeout(startEnvelopeSequence, 500);
    });
  }

  if (waxSeal) {
    waxSeal.addEventListener("click", startEnvelopeSequence);
  }
}

// -----------------------------------------------------------------------------
// 5. AUDIO ENGINE MANDIRI (HTML5 AUDIO + ROMANTIC WEB AUDIO SYNTH)
// -----------------------------------------------------------------------------
let audioPlayerEl = null;

function setupAudioEngine() {
  audioPlayerEl = document.getElementById("bg-audio-player");
  const toggleBtn = document.getElementById("music-toggle-btn");
  const cardPlayBtn = document.getElementById("card-play-music-btn");

  if (audioPlayerEl) {
    audioPlayerEl.volume = 0.9;
    audioPlayerEl.addEventListener("play", () => updateMusicUi(true));
    audioPlayerEl.addEventListener("pause", () => updateMusicUi(false));
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      if (isMusicPlaying) {
        pauseAudioTrack();
      } else {
        playAudioTrack();
      }
    });
  }

  if (cardPlayBtn) {
    cardPlayBtn.addEventListener("click", () => {
      if (isMusicPlaying) {
        pauseAudioTrack();
      } else {
        playAudioTrack();
      }
    });
  }
}

function updateMusicUi(playing) {
  isMusicPlaying = playing;
  const widget = document.getElementById("music-floating-widget");
  const statusEl = document.getElementById("music-play-status");
  const actionIcon = document.getElementById("music-action-icon");
  const cardBtnText = document.getElementById("card-play-music-text");
  const musicCard = document.getElementById("music-card-section");

  if (playing) {
    if (widget) widget.classList.add("playing");
    if (musicCard) musicCard.classList.add("playing");
    if (statusEl) statusEl.textContent = "Sedang diputar...";
    if (actionIcon) actionIcon.textContent = "⏸️";
    if (cardBtnText) cardBtnText.textContent = "⏸️ Jeda Musik";
  } else {
    if (widget) widget.classList.remove("playing");
    if (musicCard) musicCard.classList.remove("playing");
    if (statusEl) statusEl.textContent = "Musik dijeda";
    if (actionIcon) actionIcon.textContent = "▶️";
    if (cardBtnText) cardBtnText.textContent = "▶️ Putar Lagu 🎶";
  }
}

function playAudioTrack() {
  updateMusicUi(true);

  if (audioPlayerEl) {
    // Pastikan sumber audio diset dengan benar
    if (!audioPlayerEl.src || audioPlayerEl.src === window.location.href || audioPlayerEl.src.endsWith(".html")) {
      audioPlayerEl.src = "assets/audio/monokrom.mp3";
    }

    const playPromise = audioPlayerEl.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("Lagu Monokrom - Tulus berhasil diputar!");
        })
        .catch((e) => {
          console.warn("Coba varian nama file monokrom.mp3.mp3:", e);
          audioPlayerEl.src = "assets/audio/monokrom.mp3.mp3";
          audioPlayerEl.play().catch((err2) => {
            console.warn("Audio file blocked by browser, falling back to Web Audio Synth:", err2);
            startRomanticPianoSynth();
          });
        });
    }
  } else {
    startRomanticPianoSynth();
  }
}

function pauseAudioTrack() {
  updateMusicUi(false);

  if (audioPlayerEl) {
    audioPlayerEl.pause();
  }
  stopRomanticPianoSynth();
}

// Melodi piano lembut otomatis menggunakan Web Audio API
function startRomanticPianoSynth() {
  if (melodyInterval) return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;
  if (!webAudioCtx) webAudioCtx = new AudioCtx();
  if (webAudioCtx.state === "suspended") webAudioCtx.resume();

  // Nada melodi lembut romantis
  const melodyNotes = [
    { freq: 261.63, dur: 1.2 }, // C4
    { freq: 329.63, dur: 1.2 }, // E4
    { freq: 392.00, dur: 1.4 }, // G4
    { freq: 523.25, dur: 1.8 }, // C5
    { freq: 440.00, dur: 1.3 }, // A4
    { freq: 392.00, dur: 1.3 }, // G4
    { freq: 349.23, dur: 1.5 }  // F4
  ];
  let idx = 0;

  const playChordTone = () => {
    if (!isMusicPlaying) return;
    const item = melodyNotes[idx % melodyNotes.length];
    try {
      const osc = webAudioCtx.createOscillator();
      const gain = webAudioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(item.freq, webAudioCtx.currentTime);

      gain.gain.setValueAtTime(0.001, webAudioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, webAudioCtx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, webAudioCtx.currentTime + item.dur);

      osc.connect(gain);
      gain.connect(webAudioCtx.destination);
      osc.start();
      osc.stop(webAudioCtx.currentTime + item.dur);
    } catch(e) {}
    idx++;
  };

  playChordTone();
  melodyInterval = setInterval(playChordTone, 1000);
}

function stopRomanticPianoSynth() {
  if (melodyInterval) {
    clearInterval(melodyInterval);
    melodyInterval = null;
  }
}

// -----------------------------------------------------------------------------
// 6. TAHAP 3: DOA & HARAPAN DI USIA 21 TAHUN
// -----------------------------------------------------------------------------
function setupWishes21() {
  const container = document.getElementById("wishes-21-container");
  const items = APP_DATA?.wishesSection?.items || APP_DATA?.wishes21;
  if (!container || !items) return;

  container.innerHTML = "";
  items.forEach((wish) => {
    const card = document.createElement("div");
    card.className = "wish-item-card";
    card.innerHTML = `
      <span class="wish-item-icon">${wish.icon || "✨"}</span>
      <h4 class="wish-item-title">${wish.title}</h4>
      <p class="wish-item-desc">${wish.desc}</p>
    `;
    container.appendChild(card);
  });
}

// -----------------------------------------------------------------------------
// 7. TAHAP 3: GALERI FOTO POLAROID 3D
// -----------------------------------------------------------------------------
function setupPolaroidGallery() {
  const container = document.getElementById("polaroid-gallery-container");
  if (!container || !APP_DATA?.memories) return;

  container.innerHTML = "";
  APP_DATA.memories.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "polaroid-item";
    card.innerHTML = `
      <div class="polaroid-card-inner">
        <div class="polaroid-face-front">
          <div class="polaroid-photo-frame">
            <img src="${item.image}" alt="Kenangan ${index + 1}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop'">
          </div>
          <p class="polaroid-caption-text">${item.caption || "Momen Indah"}</p>
          <p class="polaroid-date-tag">${item.date || ""}</p>
          <p class="polaroid-flip-indicator">Ketuk untuk membalik 🔄</p>
        </div>
        <div class="polaroid-face-back">
          <span class="polaroid-back-icon">💌</span>
          <p class="polaroid-back-message">${item.backNote || "Kenangan terindah bersamamu, sayang."}</p>
          <span class="polaroid-back-tag">Pesan Rahasia #0${index + 1}</span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });

    container.appendChild(card);
  });
}

// -----------------------------------------------------------------------------
// 8. TAHAP 4: FORM BALASAN LANGSUNG KE WHATSAPP (0895333227653)
// -----------------------------------------------------------------------------
function setupReplySection() {
  const replyInput = document.getElementById("reply-text-box");
  const sendBtn = document.getElementById("send-reply-wa-btn");

  if (!sendBtn || !replyInput) return;

  sendBtn.addEventListener("click", () => {
    const val = replyInput.value.trim();
    if (!val) {
      alert("Tuliskan sepatah dua patah kata balasan terlebih dahulu ya, sayang... ❤️");
      replyInput.focus();
      return;
    }

    const encoded = encodeURIComponent(
      `Hai sayangku! ❤️\n\nIni balasan untuk surat ulang tahun ke-21 dari Zahrah:\n"${val}"\n\nTerima kasih banyak sudah membuatkan kejutan yang seindah ini di hari ulang tahunku! ✨🥰`
    );

    const targetPhone = getWhatsAppNumber();
    window.open(`https://wa.me/${targetPhone}?text=${encoded}`, "_blank");
  });
}

// -----------------------------------------------------------------------------
// 9. SENTUHAN & KLIK KILAU / PARTIKEL
// -----------------------------------------------------------------------------
function setupTouchSparks() {
  const sparks = ["✨", "💖", "🌸", "⭐", "💫", "❤️", "🎂"];

  window.addEventListener("click", (e) => {
    if (e.target.closest("button") || e.target.closest("textarea") || e.target.closest("input") || e.target.closest("a")) {
      return;
    }

    const span = document.createElement("span");
    span.className = "floating-sparkle";
    span.textContent = sparks[Math.floor(Math.random() * sparks.length)];
    span.style.left = `${e.clientX}px`;
    span.style.top = `${e.clientY}px`;
    document.body.appendChild(span);

    setTimeout(() => span.remove(), 1100);
  });
}

// -----------------------------------------------------------------------------
// 10. KONTROL PENUTUP (BACA LAGI & PUTAR ULANG KEJUTAN)
// -----------------------------------------------------------------------------
function setupClosingActions() {
  const readAgainBtn = document.getElementById("read-again-btn");
  const replaySurpriseBtn = document.getElementById("replay-surprise-btn");
  const stageOpening = document.getElementById("stage-opening");
  const stageLetter = document.getElementById("stage-letter-main");
  const envelopeCore = document.getElementById("envelope-core-box");

  if (readAgainBtn) {
    readAgainBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (replaySurpriseBtn) {
    replaySurpriseBtn.addEventListener("click", () => {
      stageLetter.classList.add("hidden");
      stageLetter.classList.remove("active");

      stageOpening.classList.remove("hidden");
      stageOpening.classList.add("active");

      if (envelopeCore) envelopeCore.classList.remove("opened");

      const flame2 = document.getElementById("candle-flame-2");
      const flame1 = document.getElementById("candle-flame-1");
      const smoke2 = document.getElementById("candle-smoke-2");
      const smoke1 = document.getElementById("candle-smoke-1");
      const hint = document.getElementById("cake-tap-hint-text");

      if (flame2) flame2.classList.remove("extinguished");
      if (flame1) flame1.classList.remove("extinguished");
      if (smoke2) smoke2.classList.remove("active");
      if (smoke1) smoke1.classList.remove("active");

      if (hint) {
        hint.textContent = "🕯️ Ketuk lilin 21 untuk meniup! 💨";
        hint.style.color = "var(--gold-light)";
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}



