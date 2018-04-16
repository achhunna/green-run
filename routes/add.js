const express = require('express');

const router = express.Router();

const beerModel = require('../models');

router.get('/', (req, res, next) => {
  const breweryList = req.session.breweryList ? req.session.breweryList : null;
  const lastId = req.session.lastId ? req.session.lastId : null;
  res.render('form', {
    title: 'Brewtopia 🍺',
    subTitle: 'Add Beer',
    breweryList,
    lastId,
  });
});

router.post('/', (req, res, next) => {
  const beer = {
    id: parseInt(req.body.id),
    name: req.body.name,
    activelyBrewed: req.body.activelyBrewed,
    ibu: parseInt(req.body.ibu),
    abv: Number(req.body.abv),
    flavors: req.body.flavors,
    lastTappedOn: req.body.lastTappedOn,
    breweryId: req.body.breweryId,
    breweryName: req.body.breweryName,
  };
  beerModel.create(beer, (err, message) => {
    req.session.message = message;
    res.redirect('/');
  });
});

module.exports = router;
