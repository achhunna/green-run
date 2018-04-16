const express = require('express');

const router = express.Router();

const beerModel = require('../models');

const moment = require('moment');

router.get('/:id', (req, res, next) => {
  const breweryList = req.session.breweryList ? req.session.breweryList : null;
  beerModel.get(parseInt(req.params.id), (err, beer) => {
    res.render('form', {
      title: 'Brewtopia 🍺',
      subTitle: 'Edit Beer',
      beer,
      moment,
      breweryList,
    });
  });
});

router.post('/', (req, res, next) => {
  const beer = {
    id: req.body.id,
    name: req.body.name,
    activelyBrewed: req.body.activelyBrewed,
    ibu: req.body.ibu,
    abv: req.body.abv,
    flavors: req.body.flavors,
    lastTappedOn: req.body.lastTappedOn,
    breweryId: req.body.breweryId,
    breweryName: req.session.breweryList[req.body.breweryId],
  };
  beerModel.edit(beer, (err, message) => {
    req.session.message = message;
    res.redirect('/');
  });
});

module.exports = router;
