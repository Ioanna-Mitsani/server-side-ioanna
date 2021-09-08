const router = require('express').Router();

const userRegistration = require('../../database/actions/users/userRegistration')

const { registerSchema } = require('../../helpers/validation/validationSchemas')     // joi validator schemas for user inputs



const register = (req, res, next) => {
    const origin = req.header('Origin')
    const {firstName, lastName, email, password} = req.body

    userRegistration(firstName, lastName, email, password, origin)
        .then(() => 
            res.status(200).send({ message: 'Registration successful, please check your email for verification instructions'}))
            .catch(next)
}


router.post('/register', registerSchema, register)


module.exports = router