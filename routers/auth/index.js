const router = require('express').Router();

// APIs
const register = require('./register')
const verifyEmail = require('./verify-email')
const login = require('./login')
const forgotPassword = require('./forgot-password')
const resetPassword = require('./reset-password')

// Routing
router.use('/', register)
router.use('/', verifyEmail)
router.use('/', login)
router.use('/', forgotPassword)
router.use('/', resetPassword)

// Exports
module.exports = router;