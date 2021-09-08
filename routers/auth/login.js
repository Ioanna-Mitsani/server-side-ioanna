const router = require('express').Router();

const jwt = require('jsonwebtoken')

const userLogin = require('../../database/actions/users/userLogin')

const { loginValidation } = require('../../helpers/validation/validationSchemas')

const login = (req, res, next) => {
    const {email, password} = req.body

    userLogin(email, password)
        .then(() => {
            res.status(200).send({ message: 'Login successful'})
            /* const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
            res.header('auth-token', token).send(token) */
        })
            .catch(next)
}


router.post('/login', loginValidation, login)

module.exports = router