var express = require('express');
var router = express.Router();
var db = require('../data/testCosmosDB');


  router.post('/api/testDB/office_create/', function(req, res, next) {
    let item = {};
    item.type = 'Office' || '' ;
    item.office_name = req.body.create_office_name || '' ;
    item.corporation_id = req.body.corporation_id || '' ;
  
    db.createItem(item, function(err, result) {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  });
 

module.exports = router;