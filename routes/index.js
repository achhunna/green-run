const express = require('express');

const router = express.Router();

// Methods on the model for interaction with the Beer JSON file.
// Maybe a name change is in order ¯\_(ツ)_/¯
const beerModel = require('../models');


// There are a few more actions defined for routes in the index model.
// However be careful, they are brittle and might need some upkeep.
router.get('/', (req, res, next) => {
  const message = req.session.message ? req.session.message : null;
  delete req.session.message;
  beerModel.all((err, beers) => {
    const beersObj = JSON.parse(beers).value;
    let lastId = 0;
    const breweryList = beersObj.reduce((results, beer) => {
      lastId = lastId < beer.id ? beer.id : lastId;
      results[beer.breweryId] = beer.breweryName;
      return results;
    }, {});
    req.session.breweryList = breweryList;
    req.session.lastId = lastId + 1;
    res.render('index', {
      beers,
      title: 'Brewtopia 🍺',
      subTitle: 'Seller of the finest beers',
      message,
    });
  });
});

module.exports = router;
