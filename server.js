/* ═══════════════════════════════════════════════════════ */
/* ═══════════ AILIFESOLUTION (ALS) SERVER ════════════ */
/* ═══════════ Dr. Shadrack Birthday Portal ═══════════ */
/* ═══════════════ ALL-IN-ONE FILE ════════════════════ */
/* ═══════════════════════════════════════════════════════ */

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

/* ═══════════ CONFIG ═══════════ */
const CONFIG = {
  COMPANY_NAME: process.env.COMPANY_NAME || 'AiliFesolution',
  COMPANY_SHORT: process.env.COMPANY_SHORT || 'ALS',
  BIRTHDAY_NAME: process.env.BIRTHDAY_NAME || 'Dr. Shadrack Ahazi Sanga',
  BIRTHDAY_DATE: process.env.BIRTHDAY_DATE || '2026-10-02',
  BIRTHDAY_AGE: process.env.BIRTHDAY_AGE || 24,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || 'admin',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'shadrack2026'
};

/* ═══════════ DATA DIR (auto-create) ═══════════ */
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log('✅ Data folder imeundwa');
  } catch (e) {
    console.log('⚠️  Imeshindwa kuunda data folder:', e.message);
  }
}

/* ═══════════ HELPERS ═══════════ */
function readData(file) {
  try {
    const filepath = path.join(DATA_DIR, file);
    if (!fs.existsSync(filepath)) return [];
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
  } catch (e) { return []; }
}

function writeData(file, data) {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2));
    return true;
  } catch (e) {
    console.error('Write error:', e.message);
    return false;
  }
}

/* ═══════════ MIDDLEWARE ═══════════ */
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'als-secret-2026-shadrack',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, secure: false }
}));

/* ═══════════ STATIC FILES ═══════════ */
app.use(express.static(path.join(__dirname, 'public')));

/* ═══════════ REQUEST LOGGING ═══════════ */
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path}`);
  next();
});

/* ═══════════════════════════════════════════════════════ */
/* ═══════════════════ HTML HELPERS ═══════════════════ */
/* ═══════════════════════════════════════════════════════ */

const HEAD_HTML = `
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Poppins:wght@300;400;600;800;900&family=Cinzel:wght@700;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="/css/slashes.css">
<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/css/admin.css">
`;

const NAVBAR_HTML = `
<nav class="navbar" id="mainNav">
  <div class="logo">
    <span class="logo-icon">⚕️</span>
    <span class="logo-text">Dr. Shadrack</span>
    <span class="als-badge">ALS</span>
  </div>
  <ul class="nav-links" id="navLinks">
    <li><a href="/" class="nav-link">🏠 Welcome</a></li>
    <li><a href="/home" class="nav-link">🏠 Nyumbani</a></li>
    <li><a href="/happybirthday" class="nav-link">🎂 Birthday</a></li>
    <li><a href="/dr.shadrack" class="nav-link">⚕️ Dr. Shadrack</a></li>
    <li><a href="/gift" class="nav-link">🎁 Zawadi</a></li>
    <li><a href="/admin" class="nav-link">🔐 Admin</a></li>
  </ul>
  <button class="menu-toggle" id="menuToggle"><i class="fas fa-bars"></i></button>
</nav>
`;

const FOOTER_HTML = `
<footer class="footer glass">
  <div class="footer-logo">
    <div class="als-mini">
      <span class="als-mini-text">ALS</span>
      <span class="als-mini-sub">AiliFesolution</span>
    </div>
  </div>
  <h3>🎉 Happy 24th Birthday Dr. Shadrack Ahazi Sanga 🎉</h3>
  <p>Kuzaliwa: Octoba 2, 2002 | Sherehe: Octoba 2, 2026</p>
  <p class="small">Powered by <b>AiliFesolution (ALS)</b> © 2026</p>
  <p class="small">Made with ❤️, Fataki 🎆 na Mapenzi 💖</p>
</footer>
<audio id="bgMusic" loop><source src="/audio/birthday-song.mp3" type="audio/mpeg"></audio>
<script src="/js/slashes.js"></script>
<script src="/js/script.js"></script>
`;

const SLASHES_HTML = `
<div class="slash-super s1"></div><div class="slash-super s2"></div><div class="slash-super s3"></div>
<div class="slash-super s4"></div><div class="slash-super s5"></div><div class="slash-super s6"></div>
<div class="slash-super s7"></div><div class="slash-super s8"></div><div class="slash-super s9"></div>
<div class="slash-super s10"></div><div class="slash-super s11"></div><div class="slash-super s12"></div>
<div class="slash-super s13"></div><div class="slash-super s14"></div><div class="slash-super s15"></div>
<div class="slash-super s16"></div><div class="slash-super s17"></div><div class="slash-super s18"></div>
<div class="cross-slash cross-1"></div><div class="cross-slash cross-2"></div>
<div class="cross-slash cross-3"></div><div class="cross-slash cross-4"></div>
<div class="cross-slash cross-5"></div><div class="cross-slash cross-6"></div>
<div class="cross-slash cross-7"></div><div class="cross-slash cross-8"></div>
<div class="diag-slash dg-1"></div><div class="diag-slash dg-2"></div>
<div class="diag-slash dg-3"></div><div class="diag-slash dg-4"></div>
<div class="diag-slash dg-5"></div><div class="diag-slash dg-6"></div>
<div class="cine-burst b1"></div><div class="cine-burst b2"></div>
<div class="cine-burst b3"></div><div class="cine-burst b4"></div><div class="cine-burst b5"></div>
`;

/* ═══════════════════════════════════════════════════════ */
/* ═══════════════════ ROUTES / SLASHES ═══════════════ */
/* ═══════════════════════════════════════════════════════ */

/* ──────── / (WELCOME PAGE) ──────── */
app.get('/', (req, res) => {
  res.send(renderWelcome());
});

app.get('/welcome', (req, res) => {
  res.send(renderWelcome());
});

function renderWelcome() {
  return `<!DOCTYPE html>
<html lang="sw">
<head>${HEAD_HTML}<title>Welcome — AiliFesolution (ALS)</title></head>
<body class="page-welcome">
<div id="welcomePage">
  <div class="welcome-stars"></div>
  <div class="welcome-slash ws-1"></div>
  <div class="welcome-slash ws-2"></div>
  <div class="welcome-slash ws-3"></div>
  <div class="welcome-slash ws-4"></div>
  <div class="welcome-slash ws-5"></div>
  <div class="welcome-slash ws-6"></div>
  <div class="welcome-slash ws-7"></div>
  <div class="welcome-slash ws-8"></div>
  <div class="welcome-cross wc-1"></div>
  <div class="welcome-cross wc-2"></div>
  <div class="welcome-cross wc-3"></div>

  <div class="als-logo-intro">
    <div class="als-ring ring-1"></div>
    <div class="als-ring ring-2"></div>
    <div class="als-ring ring-3"></div>
    <div class="als-ring ring-4"></div>
    <div class="als-ring ring-5"></div>
    <div class="als-core">
      <span class="als-text">ALS</span>
      <span class="als-sub">AiliFesolution</span>
    </div>
  </div>

  <div class="welcome-content">
    <p class="welcome-small">🌟 POWERED BY 🌟</p>
    <h1 class="welcome-als">AILIFESOLUTION</h1>
    <p class="welcome-tag">Company • Innovation • Excellence</p>
    <div class="welcome-divider"></div>
    <p class="welcome-invite">Karibu Kwenye Sherehe ya Kidijitali ya</p>
    <h2 class="welcome-name">${CONFIG.BIRTHDAY_NAME}</h2>
    <p class="welcome-age">🎊 Miaka ${CONFIG.BIRTHDAY_AGE} ya Baraka 🎊</p>

    <div class="welcome-routes">
      <a href="/home" class="route-card"><i class="fas fa-home"></i><span>/home</span><small>Nyumbani</small></a>
      <a href="/happybirthday" class="route-card"><i class="fas fa-birthday-cake"></i><span>/happybirthday</span><small>Sherehe</small></a>
      <a href="/dr.shadrack" class="route-card"><i class="fas fa-user-md"></i><span>/dr.shadrack</span><small>Wasifu</small></a>
      <a href="/gift" class="route-card"><i class="fas fa-gift"></i><span>/gift</span><small>Zawadi</small></a>
      <a href="/admin" class="route-card"><i class="fas fa-lock"></i><span>/admin</span><small>Admin</small></a>
    </div>

    <a href="/home" class="btn-enter"><span>🚀 INGIA KWENYE SHEREHE</span><i class="fas fa-arrow-right"></i></a>
    <p class="welcome-footer">© 2026 AiliFesolution (ALS) — All Rights Reserved</p>
  </div>

  <div class="welcome-emoji emoji-1">🎂</div>
  <div class="welcome-emoji emoji-2">🎈</div>
  <div class="welcome-emoji emoji-3">🎁</div>
  <div class="welcome-emoji emoji-4">💐</div>
  <div class="welcome-emoji emoji-5">🎉</div>
  <div class="welcome-emoji emoji-6">⭐</div>
  <div class="welcome-emoji emoji-7">🩺</div>
  <div class="welcome-emoji emoji-8">👑</div>
</div>
<script src="/js/slashes.js"></script>
<script src="/js/script.js"></script>
</body>
</html>`;
}

/* ──────── /HOME ──────── */
app.get('/home', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="sw">
<head>${HEAD_HTML}<title>Nyumbani — Dr. Shadrack</title></head>
<body class="page-home">

<div id="cinematicIntro" class="active">
  ${SLASHES_HTML}
  <div class="cine-text">
    <div class="cine-line cl-1">🎊 HAPPY BIRTHDAY 🎊</div>
    <div class="cine-line cl-2">DR. SHADRACK</div>
    <div class="cine-line cl-2b">Ahazi Sanga</div>
    <div class="cine-line cl-3">⚕️ Miaka ${CONFIG.BIRTHDAY_AGE} ya Mafanikio ⚕️</div>
    <div class="cine-line cl-4">Octoba 2, 2002 → Octoba 2, 2026</div>
    <div class="cine-line cl-5">Powered by AiliFesolution (ALS)</div>
  </div>
  <div class="cine-flash"></div>
</div>

<canvas id="fireworks"></canvas>
<canvas id="confetti"></canvas>
<canvas id="flowers"></canvas>

${NAVBAR_HTML}

<section id="home" class="hero reveal-page">
  <div class="hero-content glass">
    <div class="crown">👑</div>
    <div class="balloons">
      <div class="balloon b1">🎈</div><div class="balloon b2">🎈</div>
      <div class="balloon b3">🎈</div><div class="balloon b4">🎈</div>
      <div class="balloon b5">🎈</div>
    </div>
    <p class="sub-title">🎉 Karibu kwenye Sherehe ya 🎉</p>
    <h1 class="main-title"><span class="shine">HAPPY BIRTHDAY</span></h1>
    <h2 class="name-title" data-text="Dr. Shadrack">DR. SHADRACK</h2>
    <p class="name-subtitle">Ahazi Sanga</p>
    <p class="age-badge">🎊 Miaka ${CONFIG.BIRTHDAY_AGE} 🎊</p>
    <p class="birth-info">Kuzaliwa: Octoba 2, 2002 → Leo: Octoba 2, 2026</p>
    <p class="tribute">⚕️ Daktari Bingwa | First Bro | Kiongozi wa Kesho ⚕️</p>
    <div class="hero-buttons">
      <a href="/dr.shadrack" class="btn btn-primary"><i class="fas fa-user-md"></i> Wasifu Wake</a>
      <a href="/gift" class="btn btn-secondary"><i class="fas fa-gift"></i> Zawadi</a>
    </div>
    <div class="birthday-cake">
      <div class="cake-flame"></div>
      <div class="cake-layer"></div>
      <div class="cake-layer"></div>
      <div class="cake-layer"></div>
    </div>
  </div>
</section>

<section class="countdown-section glass reveal">
  <h2>🎯 Siku Yako Kuu Inakaribia</h2>
  <div id="countdown" class="countdown">
    <div class="cd-box"><span id="days">00</span><p>Siku</p></div>
    <div class="cd-box"><span id="hours">00</span><p>Saa</p></div>
    <div class="cd-box"><span id="minutes">00</span><p>Dakika</p></div>
    <div class="cd-box"><span id="seconds">00</span><p>Sekunde</p></div>
  </div>
</section>

${FOOTER_HTML}
</body>
</html>`);
});

/* ──────── /HAPPYBIRTHDAY ──────── */
app.get('/happybirthday', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="sw">
<head>${HEAD_HTML}<title>Happy Birthday — Dr. Shadrack</title></head>
<body class="page-birthday">

<canvas id="fireworks"></canvas>
<canvas id="confetti"></canvas>
<canvas id="flowers"></canvas>

${NAVBAR_HTML}

<section class="page-hero">
  <div class="glass page-hero-content">
    <h1 class="main-title">🎂 HAPPY BIRTHDAY 🎂</h1>
    <h2 class="name-title">DR. SHADRACK</h2>
    <p class="name-subtitle">Ahazi Sanga</p>
    <p class="age-badge">🎊 Miaka ${CONFIG.BIRTHDAY_AGE} 🎊</p>
    <p class="tribute">Kuzaliwa: Octoba 2, 2002 | Sherehe: Octoba 2, 2026</p>
    <div class="action-buttons">
      <button id="fireBtn" class="btn btn-fire"><i class="fas fa-fire"></i> Zindua Fataki!</button>
      <button id="flowerBtn" class="btn btn-flower"><i class="fas fa-seedling"></i> Tupa Maua!</button>
      <button id="giftBtn" class="btn btn-gift"><i class="fas fa-gift"></i> Fungua Zawadi!</button>
      <button id="musicBtn" class="btn btn-music"><i class="fas fa-music"></i> Washa Muziki</button>
    </div>
  </div>
</section>

<section class="congrats-section reveal-page">
  <h2 class="section-title">🎊 HONGERA DR. SHADRACK! 🎊</h2>
  <div class="congrats-grid">
    <div class="congrats-card glass"><div class="icon">🩺</div><h3>Daktari Bingwa</h3><p>Weledi na upendo kwa wagonjwa!</p></div>
    <div class="congrats-card glass"><div class="icon">🏆</div><h3>Mafanikio</h3><p>Miaka ${CONFIG.BIRTHDAY_AGE} ya mafanikio!</p></div>
    <div class="congrats-card glass"><div class="icon">❤️</div><h3>Upendo</h3><p>Familia inakupenda!</p></div>
    <div class="congrats-card glass"><div class="icon">🌟</div><h3>Mustakabali</h3><p>Safari ndefu inakusubiri!</p></div>
  </div>
</section>

${FOOTER_HTML}
</body>
</html>`);
});

/* ──────── /DR.SHADRACK ──────── */
app.get('/dr.shadrack', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="sw">
<head>${HEAD_HTML}<title>Dr. Shadrack — Wasifu</title></head>
<body class="page-profile">

<canvas id="fireworks"></canvas>

${NAVBAR_HTML}

<section class="page-hero">
  <div class="glass page-hero-content">
    <div class="crown">⚕️</div>
    <h1 class="name-title">DR. SHADRACK</h1>
    <p class="name-subtitle">Ahazi Sanga</p>
    <p class="tribute">Daktari • Mtaalamu wa Afya • Kiongozi</p>
  </div>
</section>

<section class="congrats-section">
  <h2 class="section-title">📖 Wasifu & Maono</h2>
  <div class="congrats-grid">
    <div class="congrats-card glass">
      <div class="icon">🩺</div><h3>Kitaalamu</h3>
      <p>Daktari wa binadamu mwenye maono makubwa, anayeamini katika kutoa huduma ya afya yenye usawa, weledi, na upendo wa dhati.</p>
    </div>
    <div class="congrats-card glass">
      <div class="icon">👑</div><h3>Kifamilia</h3>
      <p>Kaka mkubwa (First Bro) wa mfano, msikilizaji mzuri, na mtu mwenye upendo usio na kikomo kwa familia yake.</p>
    </div>
    <div class="congrats-card glass">
      <div class="icon">🎯</div><h3>Malengo</h3>
      <p>Kuboresha huduma za dharura na kuleta mapinduzi ya kidijitali katika sekta ya afya.</p>
    </div>
    <div class="congrats-card glass">
      <div class="icon">💡</div><h3>Falsafa</h3>
      <p>"Kuwa daktari si kazi tu, ni wito wa kiungu wa kuleta matumaini pale penye maumivu."</p>
    </div>
  </div>
</section>

<section class="history-section glass">
  <h2 class="section-title">📖 Historia ya Maisha</h2>
  <div class="timeline">
    <div class="timeline-item left"><div class="content"><h3>2002 - Kuzaliwa 🎂</h3><p>Alizaliwa tarehe 2 Octoba 2002.</p></div></div>
    <div class="timeline-item right"><div class="content"><h3>2018 - Chuo Kikuu 🎓</h3><p>Alijiunga na chuo kusomea Udaktari.</p></div></div>
    <div class="timeline-item left"><div class="content"><h3>2023 - Kuwa Daktari 🩺</h3><p>Alihitimu kama Daktari halisi!</p></div></div>
    <div class="timeline-item right"><div class="content"><h3>2026 - Miaka ${CONFIG.BIRTHDAY_AGE} 🎉</h3><p>Tunasherehekea miaka ${CONFIG.BIRTHDAY_AGE}!</p></div></div>
  </div>
</section>

${FOOTER_HTML}
</body>
</html>`);
});

/* ──────── /GIFT ──────── */
app.get('/gift', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="sw">
<head>${HEAD_HTML}<title>Zawadi — Dr. Shadrack</title></head>
<body class="page-gift">

<canvas id="fireworks"></canvas>
<canvas id="confetti"></canvas>
<canvas id="flowers"></canvas>

${NAVBAR_HTML}

<section class="page-hero">
  <div class="glass page-hero-content">
    <h1 class="main-title">🎁 ZAWADI KWA DR. SHADRACK 🎁</h1>
    <p class="tribute">Fungua zawadi zako za upendo!</p>

    <div class="gifts-grid">
      <div class="gift-box glass" onclick="openGift(this, '🎁', 'Heri ya Kuzaliwa!')"><div class="gift-icon">🎁</div><p>Zawadi 1</p></div>
      <div class="gift-box glass" onclick="openGift(this, '💝', 'Upendo wa Familia!')"><div class="gift-icon">💝</div><p>Zawadi 2</p></div>
      <div class="gift-box glass" onclick="openGift(this, '💎', 'Mafanikio Tele!')"><div class="gift-icon">💎</div><p>Zawadi 3</p></div>
      <div class="gift-box glass" onclick="openGift(this, '👑', 'Heshima na Baraka!')"><div class="gift-icon">👑</div><p>Zawadi 4</p></div>
      <div class="gift-box glass" onclick="openGift(this, '🏆', 'Ushindi wa Miaka ${CONFIG.BIRTHDAY_AGE}!')"><div class="gift-icon">🏆</div><p>Zawadi 5</p></div>
      <div class="gift-box glass" onclick="openGift(this, '⭐', 'Nyota ya Kesho!')"><div class="gift-icon">⭐</div><p>Zawadi 6</p></div>
    </div>

    <button id="giftBtn" class="btn btn-gift" style="margin-top:30px;">
      <i class="fas fa-gift"></i> Fungua Zawadi Zote!
    </button>
  </div>
</section>

<section class="blessing-section glass reveal-page">
  <h2 class="section-title">✉️ Tuma Baraka Zako</h2>
  <form id="blessingForm" class="blessing-form">
    <input type="text" id="blessName" placeholder="Jina Lako" required>
    <select id="blessRelation" required>
      <option value="">Chagua Uhusiano...</option>
      <option value="Ndugu">Ndugu</option>
      <option value="Rafiki">Rafiki</option>
      <option value="Mzazi">Mzazi</option>
      <option value="Mgonjwa">Mgonjwa</option>
      <option value="Daktari Mwenzake">Daktari Mwenzake</option>
    </select>
    <textarea id="blessMsg" placeholder="Andika ujumbe wako..." rows="4" required></textarea>
    <button type="submit" class="btn btn-primary"><i class="fas fa-paper-plane"></i> Tuma Ujumbe</button>
  </form>
  <div id="blessingList" class="blessing-list"></div>
</section>

${FOOTER_HTML}

<script>
function openGift(el, emoji, message) {
  el.classList.add('opened');
  el.querySelector('.gift-icon').textContent = emoji;
  setTimeout(() => alert('🎉 ' + message), 300);
  if (typeof burstGifts === 'function') {
    const rect = el.getBoundingClientRect();
    burstGifts(rect.left + rect.width/2, rect.top);
  }
}
</script>
</body>
</html>`);
});

/* ──────── /ADMIN (LOGIN) ──────── */
app.get('/admin', (req, res) => {
  if (req.session && req.session.isAdmin) return res.redirect('/admin/dashboard');
  res.send(renderAdminLogin());
});

app.post('/admin', (req, res) => {
  const { username, password } = req.body;
  if (username === CONFIG.ADMIN_USERNAME && password === CONFIG.ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    req.session.username = username;
    return res.redirect('/admin/dashboard');
  }
  res.send(renderAdminLogin('❌ Jina au neno la siri si sahihi!'));
});

function renderAdminLogin(error = '') {
  return `<!DOCTYPE html>
<html lang="sw">
<head>${HEAD_HTML}<title>Admin Login — ALS</title></head>
<body>
<div id="adminIntro">
  <div class="slash slash-a"></div><div class="slash slash-b"></div>
  <div class="slash slash-c"></div><div class="slash slash-d"></div>
  <div class="slash slash-e"></div><div class="slash slash-f"></div>
  <div class="admin-intro-text">
    <h1>🔐 ADMIN ACCESS</h1>
    <p>Dr. Shadrack Birthday Portal</p>
    <p class="als-brand">Powered by AiliFesolution (ALS)</p>
  </div>
</div>

<div class="login-wrapper">
  <div class="login-box glass">
    <div class="lock-icon">🔒</div>
    <h1>Admin Login</h1>
    <p class="login-sub">Ingiza neno la siri kuingia</p>
    ${error ? `<p class="error-msg">${error}</p>` : ''}
    <form method="POST" action="/admin">
      <div class="input-group">
        <span class="input-icon">👤</span>
        <input type="text" name="username" placeholder="Jina la Admin" autocomplete="off" required>
      </div>
      <div class="input-group">
        <span class="input-icon">🔑</span>
        <input type="password" name="password" placeholder="Neno la Siri" required>
      </div>
      <button type="submit" class="btn-login">🚀 Ingia</button>
    </form>
    <p class="hint">💡 Default: <b>admin</b> / <b>shadrack2026</b></p>
    <a href="/" class="back-link">← Rudi kwenye Website</a>
  </div>
</div>

<script>setTimeout(()=>document.getElementById('adminIntro').classList.add('hide'),2500);</script>
</body>
</html>`;
}

/* ──────── /ADMIN/DASHBOARD ──────── */
function requireAuth(req, res, next) {
  if (req.session && req.session.isAdmin) return next();
  res.redirect('/admin');
}

app.get('/admin/dashboard', requireAuth, (req, res) => {
  const gallery = readData('gallery.json');
  const timeline = readData('timeline.json');
  const blessings = readData('blessings.json');

  res.send(`<!DOCTYPE html>
<html lang="sw">
<head>${HEAD_HTML}<title>Dashboard — Dr. Shadrack</title></head>
<body>
<div class="dashboard">
  <header class="dash-header glass">
    <h1>🎛️ Admin Dashboard — Dr. Shadrack</h1>
    <div class="dash-actions">
      <a href="/home" class="btn-dash">🏠 Tazama Site</a>
      <a href="/admin/logout" class="btn-dash danger">🚪 Toka</a>
    </div>
  </header>

  <div class="dash-grid">
    <div class="dash-card glass">
      <h2>📸 Ongeza Picha</h2>
      <input type="text" id="photoUrl" placeholder="URL ya picha (https://...)">
      <input type="text" id="photoCaption" placeholder="Maelezo">
      <button
