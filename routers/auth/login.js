// Imports
const router = require('express').Router();
const userLogin = require('../../database/actions/users/userLogin')
const { loginValidation } = require('../../helpers/validation/validationSchemas')
const jwt = require('jsonwebtoken')

// Router handler
const login = async (req, res, next) => {
    const {email, password} = req.body
    
    userLogin(email, password)
    .then((user) => {
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
            res.status(200).send({ email: email, token: token })
        })
            .catch(next)
}


router.post('/login', loginValidation, login) // Validation Schema is included as a handler

module.exports = router