var express = require('express');
var router = express.Router();

var tleModel = require('../models/tleModel.js');

// find all
router.get('/', function (req, res, next) {
  tleModel.findAll()
    .then((result) => res.json(result))
    .catch((error) => tleModel.parseError(res, error));
});

// find by category
router.get('/:id', function (req, res, next) {
  tleModel.findByCategory(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => tleModel.parseError(res, error));
});

// new, update
router.post('/', function (req, res, next) {
  if (!req.body.id)
    tleModel.new(req.body)
      .then((result) => res.json(result))
      .catch((error) => tleModel.parseError(res, error));
  else
    tleModel.update(req.body)
      .then((result) => res.json(result))
      .catch((error) => tleModel.parseError(res, error));
});

// delete
router.delete('/:id', function (req, res, next) {
  tleModel.delete(req.params.id)
    .then((result) => res.sendStatus(200))
    .catch((error) => tleModel.parseError(res, error));
});

// search
router.post('/search', function (req, res, next) {
  tleModel.search(req.body)
    .then((result) => res.json(result))
    .catch((error) => tleModel.parseError(res, error));
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