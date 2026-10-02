const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('gift', {
    title: 'Zawadi — Dr. Shadrack',
    page: 'gift'
  });
});

module.exports = router;
