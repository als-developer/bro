const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const DATA_DIR = path.join(__dirname, '..', 'data');

/* ═══════════ AUTH MIDDLEWARE ═══════════ */
function requireAuth(req, res, next) {
  if (req.session && req.session.isAdmin) return next();
  res.redirect('/admin');
}

/* ──────── GET /admin (Login Page) ──────── */
router.get('/', (req, res) => {
  if (req.session && req.session.isAdmin) {
    return res.redirect('/admin/dashboard');
  }
  res.render('admin', {
    title: 'Admin Login — AiliFesolution (ALS)',
    error: null
  });
});

/* ──────── POST /admin (Login) ──────── */
router.post('/', (req, res) => {
  const { username, password } = req.body;
  const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
  const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'shadrack2026';

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    req.session.isAdmin = true;
    req.session.username = username;
    return res.redirect('/admin/dashboard');
  }

  res.render('admin', {
    title: 'Admin Login — AiliFesolution (ALS)',
    error: '❌ Jina au neno la siri si sahihi!'
  });
});

/* ──────── GET /admin/dashboard ──────── */
router.get('/dashboard', requireAuth, (req, res) => {
  const gallery = readData('gallery.json');
  const timeline = readData('timeline.json');
  const blessings = readData('blessings.json');

  res.render('dashboard', {
    title: 'Dashboard — Dr. Shadrack',
    gallery,
    timeline,
    blessings,
    stats: {
      photos: gallery.length,
      timeline: timeline.length,
      blessings: blessings.length
    }
  });
});

/* ──────── GET /admin/logout ──────── */
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin');
});

/* ═══════════ HELPERS ═══════════ */
function readData(filename) {
  try {
    const filepath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filepath)) return [];
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
  } catch (e) {
    return [];
  }
}

module.exports = router;
