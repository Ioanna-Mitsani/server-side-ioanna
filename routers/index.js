// Imports
const router = require('express').Router();

// API
const api = require('./api');

// Router for API
router.use('/api', api)

// Export
module.exports = router;
