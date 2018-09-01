var express = require('express');
var router = express.Router();

var satelliteModel = require('../models/tleModel.js');

// find all
router.get('/', function (req, res, next) {
  satelliteModel.findAll()
    .then((result) => res.json(result))
    .catch((error) => satelliteModel.parseError(res, error));
});

// find by category
router.get('/:id', function (req, res, next) {
  satelliteModel.findByCategory(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => satelliteModel.parseError(res, error));
});

// new, update
router.post('/', function (req, res, next) {
  if (!req.body.id)
    satelliteModel.new(req.body)
      .then((result) => res.json(result))
      .catch((error) => satelliteModel.parseError(res, error));
  else
    satelliteModel.update(req.body)
      .then((result) => res.json(result))
      .catch((error) => satelliteModel.parseError(res, error));
});

// delete
router.delete('/:id', function (req, res, next) {
  satelliteModel.delete(req.params.id)
    .then((result) => res.sendStatus(200))
    .catch((error) => satelliteModel.parseError(res, error));
});

// find
router.post('/find', function (req, res, next) {
  satelliteModel.find(req.body)
    .then((result) => res.json(result))
    .catch((error) => satelliteModel.parseError(res, error));
});

// track
router.post('/:id/track', function (req, res, next) {
  // TODO
});

// export category
router.get('/export/category/:id', function (req, res, next) {
  // TODO
});

// export tle list
router.get('/export/list/:id', function (req, res, next) {
  // TODO
});

module.exports = router;