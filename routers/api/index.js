// Importing
const router = require('express').Router();

// APIs
const terms = require('./terms')
const users = require('./users')

// Routing
router.use('/', terms)
router.use('/', users)

// Exports
module.exports = router;
