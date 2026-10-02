const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('happybirthday', {
    title: 'Happy Birthday — Dr. Shadrack',
    page: 'happybirthday'
  });
});

module.exports = router;
