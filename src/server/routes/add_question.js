var express = require('express');
var router = express.Router();
var db = require('../data/questiondb');

router.get('/', function(req, res, next) {
  db.queryAddQuestion(function(err, rowCount, rows) {
    if(err) return next(err);
    res.send(rows);
  });
});

module.exports = router;