const router = require('express').Router();

const emailVerification = require('../../database/actions/users/emailVerification')



const verifyEmail = (req, res, next) => {
    const {token} = req.body

    emailVerification(token)
        .then(() => {
            res.status(200).send({ message: 'Verification was successful, you can now login'})
        })
            .catch(next)
}


router.post('/verify-email', verifyEmail)


module.exports = router