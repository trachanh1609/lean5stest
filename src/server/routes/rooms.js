var express = require('express');
var router = express.Router();
var db = require('../data/roomdb');

router.get('/', function(req, res, next) {
  db.queryRooms(function(err, rowCount, rows) {
    if(err) return next(err);
    res.send(rows);
  });
});

module.exports = router;