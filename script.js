// =============================================================================
// SURAT ULANG TAHUN INTERAKTIF - LOGIC & INTERACTIONS
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
  initParticles();
  loadConfigData();
  setupEnvelopeInteractions();
  setupAudioPlayer();
  setupCakeInteractions();
  setupReasonsCarousel();
  setupClickHeartSparks();
  setupCoupons();
  setupReplySection();
  setupBackToTop();
});

// -----------------------------------------------------------------------------
// 1. MEMUAT DATA DARI CONFIG.JS KE HALAMAN WEB
// -----------------------------------------------------------------------------
function loadConfigData() {
  if (typeof CONFIG === "undefined") {
    console.error("CONFIG object not found! Check config.js");
    return;
  }

  // Cover Envelope
  const envelopeRecipient = document.getElementById("envelope-recipient-name");
  if (envelopeRecipient) {
    envelopeRecipient.textContent = `Untuk: ${CONFIG.partnerName || "Sayangku"}`;
  }

  // Hero Section
  const heroPartnerName = document.getElementById("hero-partner-name");
  if (heroPartnerName) {
    heroPartnerName.textContent = CONFIG.partnerName || "Sayangku";
  }

  const heroDate = document.getElementById("hero-date");
  if (heroDate) {
    heroDate.textContent = CONFIG.birthdayDate || "Hari Spesial Ini";
  }

  // Page Title
  document.title = `Selamat Ulang Tahun, ${CONFIG.partnerName || "Sayangku"} ❤️`;

  // Surat Romantis
  const letterGreeting = document.getElementById("letter-greeting");
  if (letterGreeting && CONFIG.letter?.greeting) {
    letterGreeting.textContent = CONFIG.letter.greeting;
  }

  const letterBody = document.getElementById("letter-body");
  if (letterBody && CONFIG.letter?.paragraphs) {
    letterBody.innerHTML = "";
    CONFIG.letter.paragraphs.forEach((pText) => {
      const p = document.createElement("p");
      p.textContent = pText;
      letterBody.appendChild(p);
    });
  }

  const letterClosing = document.getElementById("letter-closing");
  if (letterClosing && CONFIG.letter?.closing) {
    letterClosing.textContent = CONFIG.letter.closing;
  }

  const letterSignature = document.getElementById("letter-signature");
  if (letterSignature && CONFIG.letter?.signature) {
    letterSignature.textContent = CONFIG.letter.signature;
  }

  // Galeri Polaroid
  const polaroidContainer = document.getElementById("polaroid-container");
  if (polaroidContainer && CONFIG.polaroids && CONFIG.polaroids.length > 0) {
    polaroidContainer.innerHTML = "";
    CONFIG.polaroids.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "polaroid-card";
      card.innerHTML = `
        <div class="polaroid-inner">
          <div class="polaroid-front">
            <div class="polaroid-img-wrapper">
              <img src="${item.image}" alt="Kenangan ${index + 1}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop'">
            </div>
            <p class="polaroid-caption">${item.caption || "Momen Indah"}</p>
            <p class="polaroid-date">${item.date || ""}</p>
            <p class="polaroid-flip-hint">Ketuk untuk membalik 🔄</p>
          </div>
          <div class="polaroid-back">
            <span class="polaroid-back-heart">💌</span>
            <p class="polaroid-back-text">${item.backNote || "Kenangan terindah bersamamu."}</p>
            <span class="polaroid-back-note-tag">Pesan Rahasia #0${index + 1}</span>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        card.classList.toggle("flipped");
        triggerMiniSparkles(card);
      });

      polaroidContainer.appendChild(card);
    });
  }

  // Cake Titles
  if (CONFIG.cakeWish?.title) {
    const cakeTitle = document.getElementById("cake-title");
    if (cakeTitle) cakeTitle.textContent = CONFIG.cakeWish.title;
  }
  if (CONFIG.cakeWish?.subtitle) {
    const cakeSubtitle = document.getElementById("cake-subtitle");
    if (cakeSubtitle) cakeSubtitle.textContent = CONFIG.cakeWish.subtitle;
  }

  // Footer Credit
  const footerCredit = document.getElementById("footer-credit");
  if (footerCredit) {
    footerCredit.textContent = `Dibuat dengan cinta khusus untuk ${CONFIG.partnerName || "Sayangku"} oleh ${CONFIG.senderName || "Pacarmu"}`;
  }
}

// -----------------------------------------------------------------------------
// 2. INTERAKSI BUKA AMPLOP (ENVELOPE OPENING)
// -----------------------------------------------------------------------------
function setupEnvelopeInteractions() {
  const envelope = document.getElementById("envelope");
  const waxSeal = document.getElementById("wax-seal");
  const openBtn = document.getElementById("open-envelope-btn");
  const envelopeStage = document.getElementById("envelope-stage");
  const mainStage = document.getElementById("main-stage");
  const musicWidget = document.getElementById("music-widget");

  let isOpening = false;

  const triggerOpen = () => {
    if (isOpening) return;
    isOpening = true;

    // Animasi amplop membuka
    envelope.classList.add("open");

    // Efek kembang api / confetti pertama
    fireCelebrationConfetti();

    // Memulai musik latar
    playBackgroundMusic();

    // Munculkan widget musik di pojok
    if (musicWidget) {
      musicWidget.classList.remove("hidden");
    }

    // Transisi halus ke konten utama
    setTimeout(() => {
      envelopeStage.classList.add("hidden");
      envelopeStage.classList.remove("active");

      mainStage.classList.remove("hidden");
      mainStage.classList.add("active");

      // Gulir halus ke hero section
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Ledakan confetti perayaan
      setTimeout(fireCelebrationConfetti, 400);
    }, 1200);
  };

  if (waxSeal) waxSeal.addEventListener("click", triggerOpen);
  if (openBtn) openBtn.addEventListener("click", triggerOpen);
  if (envelope) {
    envelope.addEventListener("click", (e) => {
      if (!isOpening && e.target !== waxSeal) {
        triggerOpen();
      }
    });
  }
}

// -----------------------------------------------------------------------------
// 3. SISTEM MUSIK (MP3 + SYNTHESIZER FALLBACK)
// -----------------------------------------------------------------------------
let audioCtx = null;
let synthInterval = null;
let isPlaying = false;

function setupAudioPlayer() {
  const audio = document.getElementById("bg-audio");
  const toggleBtn = document.getElementById("music-toggle-btn");
  const widget = document.getElementById("music-widget");
  const titleEl = document.getElementById("widget-song-title");
  const statusEl = document.getElementById("widget-song-status");
  const actionIcon = document.getElementById("widget-action-icon");

  if (CONFIG.music?.title && titleEl) {
    titleEl.textContent = CONFIG.music.title;
  }

  if (CONFIG.music?.url) {
    audio.src = CONFIG.music.url;
  }

  toggleBtn.addEventListener("click", () => {
    if (isPlaying) {
      pauseBackgroundMusic();
    } else {
      playBackgroundMusic();
    }
  });
}

function playBackgroundMusic() {
  const audio = document.getElementById("bg-audio");
  const widget = document.getElementById("music-widget");
  const statusEl = document.getElementById("widget-song-status");
  const actionIcon = document.getElementById("widget-action-icon");

  isPlaying = true;
  if (widget) widget.classList.add("playing");
  if (statusEl) statusEl.textContent = "Sedang diputar...";
  if (actionIcon) actionIcon.textContent = "⏸️";

  // Coba putar audio element jika URL tersedia
  if (audio && audio.src && audio.src !== window.location.href) {
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Audio file play failed or blocked, falling back to Web Audio Synth:", err);
        startSynthMelody();
      });
    }
  } else {
    // Gunakan synth bawaan
    startSynthMelody();
  }
}

function pauseBackgroundMusic() {
  const audio = document.getElementById("bg-audio");
  const widget = document.getElementById("music-widget");
  const statusEl = document.getElementById("widget-song-status");
  const actionIcon = document.getElementById("widget-action-icon");

  isPlaying = false;
  if (widget) widget.classList.remove("playing");
  if (statusEl) statusEl.textContent = "Musik dijeda";
  if (actionIcon) actionIcon.textContent = "▶️";

  if (audio) {
    audio.pause();
  }
  stopSynthMelody();
}

// Romantic gentle piano chords synth generator (Fallback tanpa perlu file eksternal)
function startSynthMelody() {
  if (synthInterval) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  // Melodi romantis sederhana (C major / A minor soft progression: C - G - Am - F)
  const notes = [
    { freq: 261.63, dur: 1.5 }, // C4
    { freq: 329.63, dur: 1.5 }, // E4
    { freq: 392.00, dur: 1.5 }, // G4
    { freq: 523.25, dur: 2.0 }, // C5
    { freq: 392.00, dur: 1.5 }, // G4
    { freq: 329.63, dur: 1.5 }, // E4
    { freq: 440.00, dur: 2.0 }, // A4
    { freq: 349.23, dur: 1.5 }, // F4
  ];

  let noteIdx = 0;
  const playNextNote = () => {
    if (!isPlaying) return;
    const note = notes[noteIdx % notes.length];
    playSoftTone(note.freq, note.dur);
    noteIdx++;
  };

  playNextNote();
  synthInterval = setInterval(playNextNote, 1200);
}

function stopSynthMelody() {
  if (synthInterval) {
    clearInterval(synthInterval);
    synthInterval = null;
  }
}

function playSoftTone(freq, duration = 1.2) {
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Ignore audio context errors
  }
}

// -----------------------------------------------------------------------------
// 4. INTERAKSI TIUP LILIN KUE ULANG TAHUN
// -----------------------------------------------------------------------------
function setupCakeInteractions() {
  const flame = document.getElementById("candle-flame");
  const smoke = document.getElementById("candle-smoke");
  const blowBtn = document.getElementById("blow-candle-btn");
  const blowBtnText = document.getElementById("blow-btn-text");
  const wishResult = document.getElementById("wish-result");
  const relightBtn = document.getElementById("relight-candle-btn");
  const candleTrigger = document.getElementById("candle-trigger");

  let isBlownOut = false;

  const blowCandle = () => {
    if (isBlownOut) return;
    isBlownOut = true;

    // Padamkan api lilin
    flame.classList.add("extinguished");
    flame.classList.remove("lit");

    // Munculkan efek asap halus
    smoke.classList.add("active");

    // Ubah status tombol
    if (blowBtnText) blowBtnText.textContent = "Lilin Telah Padam! 🎉";
    if (blowBtn) blowBtn.disabled = true;

    // Ledakan Confetti Besar
    fireCelebrationConfetti();
    setTimeout(fireCelebrationConfetti, 350);

    // Tampilkan kartu permohonan terkabul
    setTimeout(() => {
      if (wishResult) {
        wishResult.classList.remove("hidden");
      }
    }, 600);
  };

  const relightCandle = () => {
    isBlownOut = false;
    flame.classList.remove("extinguished");
    flame.classList.add("lit");
    smoke.classList.remove("active");

    if (blowBtnText) blowBtnText.textContent = "Tiup Lilinnya 🕯️💨";
    if (blowBtn) blowBtn.disabled = false;
    if (wishResult) wishResult.classList.add("hidden");
  };

  if (blowBtn) blowBtn.addEventListener("click", blowCandle);
  if (candleTrigger) candleTrigger.addEventListener("click", blowCandle);
  if (relightBtn) relightBtn.addEventListener("click", relightCandle);
}

// -----------------------------------------------------------------------------
// 5. CAROUSEL ALASAN MENCINTAIMU
// -----------------------------------------------------------------------------
function setupReasonsCarousel() {
  const reasons = CONFIG.reasons || [
    "Senyumanmu yang selalu berhasil menerangi hari-hariku.",
    "Perhatian tulusmu yang membuatku merasa sangat berharga.",
    "Tawamu yang manis dan menggemaskan.",
    "Caramu mendengarkan semua cerita dan keluh kesahku.",
    "Kamu adalah rumah terbaik tempatku berpulang."
  ];

  let currentIndex = 0;
  const reasonCard = document.getElementById("reason-card");
  const reasonNumber = document.getElementById("reason-number");
  const reasonText = document.getElementById("reason-text");
  const counterText = document.getElementById("reason-counter-text");
  const prevBtn = document.getElementById("prev-reason-btn");
  const nextBtn = document.getElementById("next-reason-btn");

  const updateCard = () => {
    if (!reasonText) return;

    // Fade out effect
    reasonCard.style.opacity = "0";
    reasonCard.style.transform = "scale(0.96)";

    setTimeout(() => {
      reasonNumber.textContent = `Alasan #${currentIndex + 1}`;
      reasonText.textContent = `"${reasons[currentIndex]}"`;
      counterText.textContent = `${currentIndex + 1} / ${reasons.length}`;

      reasonCard.style.opacity = "1";
      reasonCard.style.transform = "scale(1)";
    }, 200);
  };

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % reasons.length;
      updateCard();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + reasons.length) % reasons.length;
      updateCard();
    });
  }

  // Initial load
  updateCard();
}

// -----------------------------------------------------------------------------
// 6. KUPON CINTA SPESIAL DENGAN WHATSAPP CLAIM
// -----------------------------------------------------------------------------
function setupCoupons() {
  const container = document.getElementById("coupons-container");
  if (!container || !CONFIG.coupons) return;

  container.innerHTML = "";

  CONFIG.coupons.forEach((coupon) => {
    const card = document.createElement("div");
    card.className = "coupon-card";
    card.id = coupon.id;

    card.innerHTML = `
      <div>
        <div class="coupon-top">
          <span class="coupon-icon">${coupon.icon || "🎁"}</span>
          <h4 class="coupon-title">${coupon.title}</h4>
        </div>
        <p class="coupon-desc">${coupon.desc}</p>
      </div>
      <div class="coupon-action">
        <button class="coupon-btn" data-title="${coupon.title}">
          <span>Klaim Kupon Ini 🎁</span>
        </button>
      </div>
    `;

    const btn = card.querySelector(".coupon-btn");
    btn.addEventListener("click", () => {
      card.classList.add("claimed");
      btn.innerHTML = "<span>Terklaim! ✅</span>";
      btn.disabled = true;

      fireCelebrationConfetti();

      // Buat tautan WhatsApp otomatis untuk menagih kupon
      const partnerName = CONFIG.partnerName || "Sayang";
      const message = encodeURIComponent(
        `Hai sayang! ❤️ Aku baru aja nge-klaim kupon "${coupon.title}" dari web ulang tahunku. Segera ditepati yaa! 🎁🥰`
      );
      
      const confirmSend = confirm(
        `Kupon "${coupon.title}" berhasil diklaim! 🎉\n\nMau kirim bukti klaim ini langsung ke chat WhatsApp pacarmu sekarang?`
      );

      if (confirmSend) {
        window.open(`https://wa.me/?text=${message}`, "_blank");
      }
    });

    container.appendChild(card);
  });
}

// -----------------------------------------------------------------------------
// 7. PESAN BALASAN KE WHATSAPP
// -----------------------------------------------------------------------------
function setupReplySection() {
  const replyInput = document.getElementById("reply-message");
  const sendBtn = document.getElementById("send-reply-btn");

  if (!sendBtn || !replyInput) return;

  sendBtn.addEventListener("click", () => {
    const text = replyInput.value.trim();
    if (!text) {
      alert("Tuliskan sepatah dua patah kata dulu ya sayang... ❤️");
      replyInput.focus();
      return;
    }

    const encoded = encodeURIComponent(
      `Hai sayangku! ❤️\n\nIni balasan pesan untuk surat ulang tahunmu:\n"${text}"\n\nMakasih banyak ya udah buatin web ini! 🥰`
    );

    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  });
}

// -----------------------------------------------------------------------------
// 8. EFEK KLIK / TAP FLOATING HEARTS & PARTICLES
// -----------------------------------------------------------------------------
function setupClickHeartSparks() {
  const heartIcons = ["❤️", "💖", "🌸", "✨", "💕", "🤍"];

  const createSpark = (x, y) => {
    const heart = document.createElement("div");
    heart.className = "floating-click-heart";
    heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1000);
  };

  window.addEventListener("click", (e) => {
    // Jangan muncul jika klik tombol tertentu
    if (e.target.closest("button") || e.target.closest("input") || e.target.closest("textarea")) {
      return;
    }
    createSpark(e.clientX, e.clientY);
  });
}

function triggerMiniSparkles(targetEl) {
  const rect = targetEl.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const heartIcons = ["✨", "💖", "🌸"];
  for (let i = 0; i < 4; i++) {
    const spark = document.createElement("div");
    spark.className = "floating-click-heart";
    spark.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    spark.style.left = `${centerX + (Math.random() * 60 - 30)}px`;
    spark.style.top = `${centerY + (Math.random() * 40 - 20)}px`;
    document.body.appendChild(spark);

    setTimeout(() => spark.remove(), 1000);
  }
}

// -----------------------------------------------------------------------------
// 9. LATAR BELAKANG PARTIKEL FLOATING HEARTS & STARS (CANVAS)
// -----------------------------------------------------------------------------
function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = 28;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 12 + 8,
      speedY: Math.random() * 0.7 + 0.3,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.25,
      type: Math.random() > 0.4 ? "heart" : "sparkle",
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.5
    });
  }

  function drawHeart(x, y, size, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 15, size / 15);
    ctx.fillStyle = `rgba(235, 120, 145, ${opacity})`;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-5, -7, -10, -5, -10, 0);
    ctx.bezierCurveTo(-10, 6, 0, 12, 0, 15);
    ctx.bezierCurveTo(0, 12, 10, 6, 10, 0);
    ctx.bezierCurveTo(10, -5, 5, -7, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  function drawSparkle(x, y, size, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = `rgba(247, 197, 159, ${opacity})`;
    ctx.beginPath();
    ctx.arc(0, 0, size / 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.y -= p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotSpeed;

      // Wrap around screen
      if (p.y < -30) {
        p.y = height + 20;
        p.x = Math.random() * width;
      }
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;

      if (p.type === "heart") {
        drawHeart(p.x, p.y, p.size, p.opacity);
      } else {
        drawSparkle(p.x, p.y, p.size, p.opacity);
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// -----------------------------------------------------------------------------
// 10. EFEK CONFETTI PERAYAAN
// -----------------------------------------------------------------------------
function fireCelebrationConfetti() {
  if (typeof confetti === "function") {
    // Confetti library tersedia
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff758f", "#ffcad4", "#ffd166", "#06d6a0", "#118ab2"]
    });
  } else {
    // Fallback jika CDN canvas-confetti belum siap
    for (let i = 0; i < 20; i++) {
      const spark = document.createElement("div");
      spark.className = "floating-click-heart";
      spark.textContent = ["🎉", "💖", "✨", "🎂"][Math.floor(Math.random() * 4)];
      spark.style.left = `${window.innerWidth * 0.5 + (Math.random() * 200 - 100)}px`;
      spark.style.top = `${window.innerHeight * 0.5 + (Math.random() * 200 - 100)}px`;
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 1200);
    }
  }
}

// -----------------------------------------------------------------------------
// 11. KEMBALI KE ATAS
// -----------------------------------------------------------------------------
function setupBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top-btn");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}
