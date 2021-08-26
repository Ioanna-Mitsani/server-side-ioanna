// Imports
const router = require('express').Router();

// API
const api = require('./api');
const auth = require('./auth')

// Router for API
router.use('/api', api)
router.use('/auth', auth)

// Export
module.exports = router;
