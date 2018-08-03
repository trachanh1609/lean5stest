var express = require('express');
var router = express.Router();
var db = require('../data/reportCosmosDB');

/* GET report listing. */
router.get('/', function(req, res, next) {
  db.queryItems(function(err, results) {
    if(err) return next(err);
    res.send(results);
  });
});

// router.put('/', function(req, res, next) {
//   db.createCity(function(err, rowCount) {
//     if(err) return next(err);
//     res.send(`Added ${rowCount} records`);
//   });
// });

module.exports = router;