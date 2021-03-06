var express = require('express');
var multer = require('multer');
var router = express.Router();

var tleModel = require('../models/tleModel.js');

function sendListAsFile(tles, res) {
  let content = '';
  for (let i = 0; i < tles.length; i++)
    content += tles[i].name.padEnd(24, ' ') + '\n' + tles[i].line1 + '\n' + tles[i].line2 + '\n';

  res.set({
    "Content-Type": "application/octet-stream",
    "charset": "utf-8",
    "Content-Disposition": "attachment; filename=\"export.txt\""
  });
  res.send(content);
}

// find all
router.get('/', function (req, res, next) {
  tleModel.findAll()
    .then((result) => res.json(result))
    .catch((error) => tleModel.parseError(res, error));
});

// find by category
router.get('/category/:id', function (req, res, next) {
  tleModel.findByCategory(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => tleModel.parseError(res, error));
});

// find by id
router.get('/', function (req, res, next) {
  tleModel.findById(req.query.id)
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

// import tle list
router.post('/import/:id', multer({ storage: multer.memoryStorage() }).single('file'), function (req, res, next) {
  let tles = [];
  let textData = ('' + req.file.buffer).split(/\r?\n/);

  try {
    for (let i = 0; i < textData.length; i += 3) {
      if (textData[i].match(/[^A-Za-z0-9]/)) {
        if (textData[i].match(/^0 /))
          textData[i] = textData[i].substring(2);

        if (textData[i].trim().length > 24)
          throw 'Error in line ' + (i + 1) + ': Name field length incorrect. Found ' + textData[i].trim().length + ', maximum is 24';

        if (textData[i + 1].trim().length != 69)
          throw 'Error in line ' + (i + 2) + ': Line 1 field length incorrect. Found ' + textData[i + 1].trim().length + ', required is 69';

        if (textData[i + 2].trim().length != 69)
          throw 'Error in line ' + (i + 3) + ': Line 2 field length incorrect. Found ' + textData[i + 2].trim().length + ', required is 69';

        tles.push(textData[i].trim());
        tles.push(textData[i + 1].trim());
        tles.push(textData[i + 2].trim());
        tles.push(req.params.id);
      }
    }
  } catch (error) {
    res.status(500);
    res.render('error', { message: String.fromCodePoint(0x26A0) + ' Parse error', error: { status: error } });
  }

  tleModel.import(tles)
    .then((result) => {
      res.status(200);
      res.render('message', { message: String.fromCodePoint(0x2714) + ' File imported' });
    })
    .catch((error) => tleModel.parseError(res, error));
});

// export category
router.get('/export/category/:id', function (req, res, next) {
  tleModel.findByCategory(req.params.id)
    .then((result) => sendListAsFile(result, res))
    .catch((error) => tleModel.parseError(res, error));
});

// export tle list
router.get('/export/list/', function (req, res, next) {
  tleModel.findById(req.query.id)
    .then((result) => sendListAsFile(result, res))
    .catch((error) => tleModel.parseError(res, error));
});

module.exports = router;