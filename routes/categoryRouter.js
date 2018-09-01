var express = require('express');
var router = express.Router();

var categoryModel = require('../models/categoryModel.js');

// list all
router.get('/', function (req, res, next) {
  categoryModel.findAll()
    .then((result) => res.json(result))
    .catch((error) => categoryModel.parseError(res, error));
});

// new, update
router.post('/', function (req, res, next) {
  if (!req.body.id)
    categoryModel.new(req.body)
      .then((result) => res.json(result))
      .catch((error) => categoryModel.parseError(res, error));
  else
    categoryModel.update(req.body)
      .then((result) => res.json(result))
      .catch((error) => categoryModel.parseError(res, error));
});

// delete
router.delete('/:id', function (req, res, next) {
  categoryModel.delete(req.params.id)
    .then((result) => res.status(200))
    .catch((error) => categoryModel.parseError(res, error));
});

module.exports = router;