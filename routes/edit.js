const express = require('express');

const router = express.Router();

const beerModel = require('../models');

router.get('/:id', (req, res, next) => {
  const breweryList = req.session.breweryList ? req.session.breweryList : null;
  beerModel.get(parseInt(req.params.id, 10), (err, beer) => {
    res.render('form', {
      title: 'Brewtopia 🍺',
      subTitle: 'Edit Beer',
      beer,
      breweryList,
    });
  });
});

router.post('/', (req, res, next) => {
  const beer = {
    id: parseInt(req.body.id, 10),
    name: req.body.name,
    activelyBrewed: req.body.activelyBrewed,
    ibu: parseInt(req.body.ibu, 10),
    abv: Number(req.body.abv),
    flavors: req.body.flavors,
    lastTappedOn: req.body.lastTappedOn,
    breweryId: req.body.breweryId,
    breweryName: req.session.breweryList[req.body.breweryId],
  };
  beerModel.edit(parseInt(req.body.id, 10), beer, (err, message) => {
    req.session.message = message;
    res.redirect('/');
  });
});

module.exports = router;
