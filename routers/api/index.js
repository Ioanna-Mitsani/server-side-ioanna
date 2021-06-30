// Importing
const router = require('express').Router();

// APIs
const terms = require('./terms')

// Routing
router.use('/', terms)

// Exports
module.exports = router;
