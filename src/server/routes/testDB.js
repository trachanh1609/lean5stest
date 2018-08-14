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

  router.get('/offices', function(req, res, next) {
    
    db.queryAllOffices(function(err, results) {
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

  router.get('/targets/:reportID', function(req, res, next) {
    let reportID = req.params.reportID;
    db.queryTargets(reportID, function(err, results) {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  });

  router.get('/questions/:reportID', function(req, res, next) {
    let reportID = req.params.reportID;
    db.queryQuestions(reportID, function(err, results) {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  });

  router.get('/questionText/:reportID', function(req, res, next) {
    let reportID = req.params.reportID;
    db.queryQuestionText(reportID, function(err, results) {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  });

  router.post('/new_audit/', function(req, res, next) {
    let item = {};
    item.type = 'Audit_case' ;
    item.date = Date.now();
    item.auditor = req.body.auditor || '' ;
    item.target_id = req.body.target_id || '' ;
    item.target_name = req.body.target_name || '' ;
    item.office_name = req.body.office_name || '' ;
    item.corporation_name = req.body.corporation_name || '' ;
    item.comment = req.body.comment || '' ;
  
    db.createItem(item, function(err, result) {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  });

  router.post('/result/', function(req, res, next) {
    let item = {};
    item.type = 'Results' ;
    item.audit_id = req.body.audit_id || '' ;
    item.question_id = req.body.question_id || '' ;
    item.grade = req.body.grade || '' ;
    item.comment = req.body.comment || '' ;
  
    db.createItem(item, function(err, result) {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  });

  router.post('/new_corporation/', function(req, res, next) {
    let item = {};
    item.type = req.body.type || '' ;
    item.corporation_name = req.body.corporation_name || '' ;
  
    db.createItem(item, function(err, result) {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  });

  router.post('/new_office/', function(req, res, next) {
    let item = {};
    item.type = req.body.type || '' ;
    item.office_name = req.body.office_name || '' ;
    item.corporation_id = req.body.corporation_id || '' ;
  
    db.createItem(item, function(err, result) {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  });

  router.post('/new_target/', function(req, res, next) {
    let item = {};
    item.type = req.body.type || '' ;
    item.target_name = req.body.target_name || '' ;
    item.office_id = req.body.office_id || '' ;

  
    db.createItem(item, function(err, result) {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  });

  router.post('/new_question/', function(req, res, next) {
    let item = {};
    item.type = req.body.type || '' ;
    item.question_text = req.body.question_text || '' ;
      
    db.createItem(item, function(err, result) {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  });

  router.post('/link/', function(req, res, next) {
    let item = {};
    item.type = req.body.type || '' ;
    item.question_id = req.body.question_id || '' ;
    item.target_id = req.body.target_id || '' ;
      
    db.createItem(item, function(err, result) {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  });

  // REPLACE a specific report. 
router.put('/updateResult/:reportID', function(req, res, next) {
  let item = {};
  item.id = req.params.reportID ;
  item.type = "Results" ;
  item.audit_id = req.body.audit_id || '' ;
  item.question_id = req.body.question_id || '' ;
  item.grade = req.body.grade || '' ;
  item.comment = req.body.comment || '' ;

  db.updateItem(item, function(err, result) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});



 

// Delete a specific report. 
router.delete('/delete/:reportID', function(req, res, next) {

  let reportID = req.params.reportID ;

  db.deleteItem(reportID, function(err, result) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = router;