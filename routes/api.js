const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

/* ═══════════ HELPERS ═══════════ */
function readData(file) {
  try {
    const filepath = path.join(DATA_DIR, file);
    if (!fs.existsSync(filepath)) return [];
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
  } catch { return []; }
}

function writeData(file, data) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2));
}

function requireAuth(req, res, next) {
  if (req.session && req.session.isAdmin) return next();
  res.status(401).json({ success: false, message: 'Lazima uwe admin!' });
}

/* ═══════════════════════════════════════════════ */
/* ═══════════════ GALLERY API ═════════════════ */
/* ═══════════════════════════════════════════════ */

// GET /api/gallery
router.get('/gallery', (req, res) => {
  res.json({ success: true, data: readData('gallery.json') });
});

// POST /api/gallery (Admin only)
router.post('/gallery', requireAuth, (req, res) => {
  const { url, caption } = req.body;
  if (!url) return res.status(400).json({ success: false, message: 'URL ya picha inahitajika' });

  const gallery = readData('gallery.json');
  const newItem = {
    id: Date.now(),
    url,
    caption: caption || 'Picha 🎉',
    createdAt: new Date().toISOString()
  };
  gallery.push(newItem);
  writeData('gallery.json', gallery);
  res.json({ success: true, data: newItem });
});

// DELETE /api/gallery/:id
router.delete('/gallery/:id', requireAuth, (req, res) => {
  const id = parseInt(req.params.id);
  let gallery = readData('gallery.json');
  gallery = gallery.filter(g => g.id !== id);
  writeData('gallery.json', gallery);
  res.json({ success: true });
});

/* ═══════════════════════════════════════════════ */
/* ═══════════════ TIMELINE API ════════════════ */
/* ═══════════════════════════════════════════════ */

router.get('/timeline', (req, res) => {
  res.json({ success: true, data: readData('timeline.json') });
});

router.post('/timeline', requireAuth, (req, res) => {
  const { year, title, text } = req.body;
  if (!year || !title || !text) {
    return res.status(400).json({ success: false, message: 'Jaza sehemu zote!' });
  }
  const timeline = readData('timeline.json');
  const newItem = { id: Date.now(), year, title, text, createdAt: new Date().toISOString() };
  timeline.push(newItem);
  writeData('timeline.json', timeline);
  res.json({ success: true, data: newItem });
});

router.delete('/timeline/:id', requireAuth, (req, res) => {
  const id = parseInt(req.params.id);
  let timeline = readData('timeline.json');
  timeline = timeline.filter(t => t.id !== id);
  writeData('timeline.json', timeline);
  res.json({ success: true });
});

/* ═══════════════════════════════════════════════ */
/* ═══════════════ BLESSINGS API ═══════════════ */
/* ═══════════════════════════════════════════════ */

router.get('/blessings', (req, res) => {
  const blessings = readData('blessings.json');
  res.json({ success: true, data: blessings.slice(-20).reverse() });
});

router.post('/blessings', (req, res) => {
  const { name, relation, msg } = req.body;
  if (!name || !relation || !msg) {
    return res.status(400).json({ success: false, message: 'Jaza sehemu zote!' });
  }
  const blessings = readData('blessings.json');
  const newItem = {
    id: Date.now(),
    name,
    relation,
    msg,
    date: new Date().toLocaleDateString('sw-TZ'),
    createdAt: new Date().toISOString()
  };
  blessings.push(newItem);
  writeData('blessings.json', blessings);
  res.json({ success: true, data: newItem });
});

router.delete('/blessings/:id', requireAuth, (req, res) => {
  const id = parseInt(req.params.id);
  let blessings = readData('blessings.json');
  blessings = blessings.filter(b => b.id !== id);
  writeData('blessings.json', blessings);
  res.json({ success: true });
});

/* ═══════════════════════════════════════════════ */
/* ═══════════════ STATS API ═══════════════════ */
/* ═══════════════════════════════════════════════ */

router.get('/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      photos: readData('gallery.json').length,
      timeline: readData('timeline.json').length,
      blessings: readData('blessings.json').length,
      company: process.env.COMPANY_NAME,
      birthday: process.env.BIRTHDAY_NAME,
      age: process.env.BIRTHDAY_AGE
    }
  });
});

module.exports = router;
