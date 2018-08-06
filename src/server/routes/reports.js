var express = require('express');
var router = express.Router();
var db = require('../data/reportCosmosDB');

/* GET report listing. */
router.get('/', function(req, res, next) {
  db.queryItems(function(err, results) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});


/* GET a specific report. */
router.get('/:reportID', function(req, res, next) {
  let reportID = req.params.reportID ;
  db.queryItem(reportID, function(err, result) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

/* POST , create a new item. */
router.post('/', function(req, res, next) {
  let item = {};
  item.name = req.body.name || '' ;
  item.category = req.body.category || '' ;

  db.createItem(item, function(err, result) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

// router.put('/', function(req, res, next) {
//   db.createCity(function(err, rowCount) {
//     if(err) return next(err);
//     res.send(`Added ${rowCount} records`);
//   });
// });

module.exports = router;