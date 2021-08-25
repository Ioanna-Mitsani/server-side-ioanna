const router = require('express').Router();
const crypto = require('crypto')

router.post('/verify-email', (req, res) => {
    const origin = req.header('Origin')
    const token = crypto.randomBytes(40).toString('hex')
    const verificationLink = `${origin}/auth/verify-email?token=${token}`
})