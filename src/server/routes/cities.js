var express = require('express');
var router = express.Router();
var db = require('../data/citydb');

/* GET city listing. */
router.get('/', function(req, res, next) {
  db.queryCities(function(err, rowCount, rows) {
    if(err) return next(err);
    res.send(rows);
  });
});

// router.put('/', function(req, res, next) {
//   db.createCity(function(err, rowCount) {
//     if(err) return next(err);
//     res.send(`Added ${rowCount} records`);
//   });
// });

module.exports = router;