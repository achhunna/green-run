const express = require('express');

const router = express.Router();

const beerModel = require('../models');

router.post('/', (req, res, next) => {
  beerModel.delete(parseInt(req.body.id), (err, message) => {
    req.session.message = message;
    res.redirect('/');
  });
});

module.exports = router;
