var express = require('express');
var router = express.Router();

var satelliteModel = require('../models/satelliteModel.js');

// list all
router.get('/', function(req, res, next) {
  // TODO
});

// details
router.get('/:id', function(req, res, next) {
  // TODO
});

// new
router.post('/', function(req, res, next) {
  // TODO
});

// delete
router.delete('/:id', function(req, res, next) {
  // TODO
});

// track
router.post('/:id/track', function(req, res, next) {
  // TODO
});

// find
router.post('/find', function(req, res, next) {
  // TODO
});

// export
router.get('/export', function(req, res, next) {
  // TODO
});

module.exports = router;