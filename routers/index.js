// Imports
const router = require('express').Router();

// APIs
const api = require('./api');
const auth = require('./auth')

// Routers for APIs
router.use('/api', api)
router.use('/auth', auth)

// Export
module.exports = router;
