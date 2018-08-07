var express = require('express');
var router = express.Router();
var db = require('../data/testCosmosDB');

/* GET - all details */
router.get('/', function(req, res, next) {
  db.queryAll(function(err, results) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

/* GET corporations listing. */
router.get('/corporations', function(req, res, next) {
    db.queryCorporations(function(err, results) {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  });

/* GET offices listing. */
router.get('/offices/:reportID', function(req, res, next) {
    let reportID = req.params.reportID;
    db.queryOffices(reportID, function(err, results) {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  });


  router.post('/new_audit/', function(req, res, next) {
    let item = {};
    item.type = req.body.type || '' ;
    item.document_number = req.body.document_number || '' ;
    item.date = Date.now();
    item.auditor = req.body.auditor || '' ;
    item.target = req.body.target || '' ;
    item.target_id = req.body.target_id || '' ;
    item.office = req.body.office || '' ;
    item.corporation = req.body.corporation || '' ;
  
    db.createAudit(item, function(err, result) {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  });
/* GET a specific report. */
/*
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

 POST , create a new item. 
router.post('/', function(req, res, next) {
  let item = {};
  item.name = req.body.name || '' ;
  item.category = req.body.category || '' ;
  item.date = Date.now();
  item.completed = false;

  db.createItem(item, function(err, result) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

 REPLACE a specific report. 
router.put('/:reportID', function(req, res, next) {
  let item = {};
  item.id = req.params.reportID ;
  item.name = req.body.name ;
  item.category = req.body.category ;
  item.date = Date.now();
  item.completed = req.body.completed ;

  db.updateItem(item, function(err, result) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

 Delete a specific report. 
router.delete('/:reportID', function(req, res, next) {

  let reportID = req.params.reportID ;

  db.deleteItem(reportID, function(err, result) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});
*/
module.exports = router;