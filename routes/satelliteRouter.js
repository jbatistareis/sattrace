var express = require('express');
var router = express.Router();

var satelliteModel = require('../models/satelliteModel.js');

// list all
router.get('/', function (req, res, next) {
  satelliteModel.findAll()
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
    .then((result) => res.status(200))
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

// export stelites list
router.get('/export/satellites/:id', function (req, res, next) {
  // TODO
});

module.exports = router;