var express = require('express');
var router = express.Router();
var db = require('../data/corporationdb');

/* GET corporations listing. */
router.get('/', function(req, res, next) {
  db.queryCorporations(function(err, rowCount, rows) {
    if(err) return next(err);
    res.send(rows);
  });
});


module.exports = router;