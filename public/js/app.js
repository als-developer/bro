/* ═══════════ CINEMATIC INTRO AUTO-HIDE ═══════════ */
window.addEventListener('load', () => {
  const intro = document.getElementById('cinematicIntro');
  if (intro) {
    setTimeout(() => {
      intro.style.transition = 'opacity 1s';
      intro.style.opacity = '0';
      setTimeout(() => intro.remove(), 1100);
    }, 4500);
  }

  // Confetti + Fireworks start
  startConfetti();
  setTimeout(() => {
    for (let i = 0; i < 8; i++) setTimeout(() => randomFirework(), i * 300);
  }, 2000);
});

/* ═══════════ CONFETTI ═══════════ */
const confCanvas = document.getElementById('confetti');
let cctx, confetti = [];
if (confCanvas) {
  cctx = confCanvas.getContext('2d');
  resizeConfetti();
  window.addEventListener('resize', resizeConfetti);
}

function resizeConfetti() {
  if (confCanvas) {
    confCanvas.width = window.innerWidth;
    confCanvas.height = window.innerHeight;
  }
}

const colors = ['#ff2d95', '#00d9ff', '#ffd700', '#8b2fc9', '#00ff88', '#ff6b00', '#00bfff'];

function createConf() {
  for (let i = 0; i < 100; i++) {
    confetti.push({
      x: Math.random() * confCanvas.width,
      y: Math.random() * -confCanvas.height,
      w: Math.random() * 10 + 5,
      h: Math.random() * 8 + 4,
      c: colors[Math.floor(Math.random() * colors.length)],
      sy: Math.random() * 3 + 1.5,
      sx: Math.random() * 2 - 1,
      r: Math.random() * 360,
      rs: Math.random() * 6 - 3
    });
  }
}

function drawConfetti() {
  if (!cctx) return;
  cctx.clearRect(0, 0, confCanvas.width, confCanvas.height);
  confetti.forEach(p => {
    cctx.save();
    cctx.translate(p.x, p.y);
    cctx.rotate(p.r * Math.PI / 180);
    cctx.fillStyle = p.c;
    cctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
    cctx.restore();
    p.y += p.sy; p.x += p.sx; p.r += p.rs;
    if (p.y > confCanvas.height + 20) {
      p.y = -20;
      p.x = Math.random() * confCanvas.width;
    }
  });
  requestAnimationFrame(drawConfetti);
}

function startConfetti() {
  if (!confCanvas) return;
  createConf();
  drawConfetti();
  setInterval(() => {
    if (confetti.length < 250) {
      for (let i = 0; i < 20; i++) {
        confetti.push({
          x: Math.random() * confCanvas.width,
          y: -20,
          w: Math.random() * 10 + 5,
          h: Math.random() * 8 + 4,
          c: colors[Math.floor(Math.random() * colors.length)],
          sy: Math.random() * 3 + 1.5,
          sx: Math.random() * 2 - 1,
          r: Math.random() * 360,
          rs: Math.random() * 6 - 3
        });
      }
    }
  }, 3000);
}

/* ═══════════ FIREWORKS ═══════════ */
const fwCanvas = document.getElementById('fireworks');
let fctx, particles = [];
if (fwCanvas) {
  fctx = fwCanvas.getContext('2d');
  resizeFW();
  window.addEventListener('resize', resizeFW);
  animateFW();
}

function resizeFW() {
  if (fwCanvas) {
    fwCanvas.width = window.innerWidth;
    fwCanvas.height = window.innerHeight;
  }
}

class Particle {
  constructor(x, y, c) {
    this.x = x; this.y = y; this.c = c;
    const a = Math.random() * Math.PI * 2;
    const s = Math.random() * 6 + 2;
    this.vx = Math.cos(a) * s;
    this.vy = Math.sin(a) * s;
    this.life = 1;
    this.decay = Math.random() * 0.015 + 0.01;
    this.size = Math.random() * 3 + 1;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    this.vy += 0.05;
    this.vx *= 0.99; this.vy *= 0.99;
    this.life -= this.decay;
  }
  draw() {
    fctx.globalAlpha = this.life;
    fctx.fillStyle = this.c;
    fctx.beginPath();
    fctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    fctx.fill();
    fctx.globalAlpha = 1;
  }
}

function explode(x, y) {
  const c = colors[Math.floor(Math.random() * colors.length)];
  for (let i = 0; i < 70; i++) particles.push(new Particle(x, y, c));
}

function randomFirework() {
  if (!fwCanvas) return;
  explode(Math.random() * fwCanvas.width, Math.random() * fwCanvas.height * 0.6 + 50);
}

function burstFireworks() {
  for (let i = 0; i < 5; i++) setTimeout(() => randomFirework(), i * 150);
}

function animateFW() {
  if (!fctx) return;
  fctx.fillStyle = 'rgba(10, 8, 32, 0.15)';
  fctx.fillRect(0, 0, fwCanvas.width, fwCanvas.height);
  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => { p.update(); p.draw(); });
  if (Math.random() < 0.02) randomFirework();
  requestAnimationFrame(animateFW);
}

/* ═══════════ FLOWERS ═══════════ */
function burstFlowers() {
  const emojis = ['🌸', '🌺', '🌻', '🌷', '🌹', '💐'];
  for (let i = 0; i < 20; i++) {
    const el = document.createElement('div');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.cssText = `
      position: fixed;
      left: ${Math.random() * window.innerWidth}px;
      top: -50px;
      font-size: ${Math.random() * 20 + 25}px;
      pointer-events: none;
      z-index: 9999;
      transition: all ${Math.random() * 2 + 2}s linear;
      filter: drop-shadow(0 0 10px currentColor);
    `;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.top = window.innerHeight + 50 + 'px';
      el.style.transform = `rotate(${Math.random() * 720 - 360}deg)`;
    });
    setTimeout(() => el.remove(), 4000);
  }
}

/* ═══════════ GIFTS ═══════════ */
function burstGifts() {
  const emojis = ['🎁', '🎀', '💝', '🎊', '🎉', '🏆', '👑', '💎'];
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  for (let i = 0; i < 15; i++) {
    const el = document.createElement('div');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style
