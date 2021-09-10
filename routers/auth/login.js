// Imports
const router = require('express').Router();
const userLogin = require('../../database/actions/users/userLogin')
const { loginValidation } = require('../../helpers/validation/validationSchemas')


// Router handler
const login = (req, res, next) => {
    const {email, password} = req.body

     userLogin(email, password)
        .then(() => {
            res.status(200).send({ message: 'Login successful'})
        })
            .catch(next)
}


router.post('/login', loginValidation, login) // Validation Schema is included as a handler

module.exports = router