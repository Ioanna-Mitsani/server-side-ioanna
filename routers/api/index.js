// Importing
const router = require('express').Router();

// APIs
const getTerms = require('./getTerms');
const termById = require('./terms');

// Routing
router.use('/getTerms', getTerms);
router.use('/term', termById);

// Exports
module.exports = router;
