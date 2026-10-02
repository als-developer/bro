const express = require('express');
const router = express.Router();

/* ──────── GET / (Welcome) ──────── */
router.get('/', (req, res) => {
  res.render('welcome', {
    title: 'Karibu — AiliFesolution (ALS)',
    page: 'welcome'
  });
});

/* ──────── GET /welcome ──────── */
router.get('/welcome', (req, res) => {
  res.render('welcome', {
    title: 'Karibu — AiliFesolution (ALS)',
    page: 'welcome'
  });
});

module.exports = router;
