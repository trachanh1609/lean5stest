const express = require('express');
const router = express.Router();

const citiesRouter = require('./cities');
const reportsRouter = require('./reports');
const corpRouter = require('./corporations');
const roomRouter = require('./rooms');
const questionRouter = require('./add_question');
const testDBRouter = require('./testDB');
const officeRouter = require('./officeRouter');

router.use('/cities', citiesRouter);
router.use('/reports', reportsRouter);
router.use('/corporations', corpRouter);
router.use('/rooms', roomRouter);
router.use('/add_question', questionRouter);
router.use('/testDB', testDBRouter);
router.use('/office_create', officeRouter);

module.exports = router;