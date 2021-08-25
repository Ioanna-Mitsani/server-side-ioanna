const router = require('express').Router();

// APIs
const users = require('./users')

// Routing
router.use('/', users)

// Exports
module.exports = router;