const express = require('express');
const router = express.Router();

const citiesRouter = require('./cities');
const reportsRouter = require('./reports');

router.use('/cities', citiesRouter);
router.use('/reports', reportsRouter);

module.exports = router;