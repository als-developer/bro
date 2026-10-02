const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('drshadrack', {
    title: 'Dr. Shadrack Ahazi Sanga — Wasifu',
    page: 'drshadrack'
  });
});

module.exports = router;
