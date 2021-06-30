// Importing
const router = require('express').Router();

// APIs
/* const getTerms = require('./getTerms');
const termById = require('./term'); */
const terms = require('./terms')

// Routing
/* router.use('/getTerms', getTerms);
router.use('/term', termById); */

router.use('/', terms)

// Exports
module.exports = router;
