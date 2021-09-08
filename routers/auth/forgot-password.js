const router = require('express').Router();

const forgotPassword = require('../../database/actions/users/forgotPassword')

const forgotPass = (req, res, next) => {
    const origin = req.header('Origin')
    const { email } = req.body

    forgotPassword(email, origin)
        .then(() => {
            res.status(200).send({message: 'Password reset link has been sent to your email account'})
        })
}

router.post('/forgot-password', forgotPass)

module.exports = router