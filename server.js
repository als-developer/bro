/* ═══════════════════════════════════════════════════ */
/* ═══════════ AILIFESOLUTION (ALS) SERVER ═════════ */
/* ═══════════ Dr. Shadrack Birthday Portal ═══════ */
/* ═══════════════════════════════════════════════════ */

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

/* ═══════════ MIDDLEWARE ═══════════ */
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

/* ═══════════ SESSION ═══════════ */
app.use(session({
  secret: process.env.SESSION_SECRET || 'als-secret-2026',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
    httpOnly: true,
    secure: false
  }
}));

/* ═══════════ VIEW ENGINE ═══════════ */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* ═══════════ STATIC FILES ═══════════ */
app.use(express.static(path.join(__dirname, 'public')));

/* ═══════════ GLOBAL VARIABLES ═══════════ */
app.use((req, res, next) => {
  res.locals.company = {
    name: process.env.COMPANY_NAME || 'AiliFesolution',
    short: process.env.COMPANY_SHORT || 'ALS'
  };
  res.locals.birthday = {
    name: process.env.BIRTHDAY_NAME || 'Dr. Shadrack Ahazi Sanga',
    date: process.env.BIRTHDAY_DATE || '2026-10-02',
    age: process.env.BIRTHDAY_AGE || 24
  };
  res.locals.currentPath = req.path;
  res.locals.isAdmin = req.session && req.session.isAdmin;
  next();
});

/* ═══════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════ */
/* ═══════════ SLASH ROUTES (PAGES) ════════════════ */
/* ═══════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════ */

/* ──────── WELCOME PAGE (/) ──────── */
app.use('/', require('./routes/index'));

/* ──────── /HOME ──────── */
app.use('/home', require('./routes/home'));

/* ──────── /HAPPYBIRTHDAY ──────── */
app.use('/happybirthday', require('./routes/happybirthday'));

/* ──────── /DR.SHADRACK ──────── */
app.use('/dr.shadrack', require('./routes/drshadrack'));

/* ──────── /GIFT ──────── */
app.use('/gift', require('./routes/gift'));

/* ──────── /ADMIN ──────── */
app.use('/admin', require('./routes/admin'));

/* ──────── /API ──────── */
app.use('/api', require('./routes/api'));

/* ──────── /AUTH ──────── */
app.use('/auth', require('./routes/auth'));

/* ═══════════════════════════════════════════════════ */
/* ═══════════ 404 ERROR PAGE ══════════════════════ */
/* ═══════════════════════════════════════════════════ */
app.use((req, res) => {
  res.status(404).render('404', {
    title: '404 - Ukurasa Haupatikani',
    message: 'Samahani, ukurasa uliouomba haupo!'
  });
});

/* ═══════════ ERROR HANDLER ═══════════ */
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Hitilafu ya server',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

/* ═══════════ START SERVER ═══════════ */
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║                                                      ║');
  console.log('║   🎂  AILIFESOLUTION (ALS) BIRTHDAY PORTAL  🎂      ║');
  console.log('║                                                      ║');
  console.log('║   🎉  Dr. Shadrack Ahazi Sanga — Miaka 24          ║');
  console.log('║                                                      ║');
  console.log('╚══════════════════════════════════════════════════════╝\n');
  console.log(`✅ Server running on: http://localhost:${PORT}`);
  console.log(`\n📌 AVAILABLE SLASHES/ROUTES:\n`);
  console.log(`   🏠  http://localhost:${PORT}/                    → Welcome`);
  console.log(`   🏠  http://localhost:${PORT}/welcome             → Welcome`);
  console.log(`   🏠  http://localhost:${PORT}/home                → Home`);
  console.log(`   🎂  http://localhost:${PORT}/happybirthday       → Happy Birthday`);
  console.log(`   ⚕️   http://localhost:${PORT}/dr.shadrack         → Dr. Shadrack`);
  console.log(`   🎁  http://localhost:${PORT}/gift                → Gift`);
  console.log(`   🔐  http://localhost:${PORT}/admin               → Admin Login`);
  console.log(`   📊  http://localhost:${PORT}/admin/dashboard     → Admin Dashboard`);
  console.log(`   🔌  http://localhost:${PORT}/api/gallery          → API Gallery`);
  console.log(`   🔌  http://localhost:${PORT}/api/blessings        → API Blessings\n`);
  console.log(`👤 Admin: ${process.env.ADMIN_USERNAME} / ${process.env.ADMIN_PASSWORD}`);
  console.log(`\n© 2026 AiliFesolution (ALS)\n`);
});

module.exports = app;
