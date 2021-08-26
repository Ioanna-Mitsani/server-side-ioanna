const joi = require('joi')

// User input validation process
const registerSchema = joi.object({
    firstName: joi.string().min(3).required(),
    lastName: joi.string().min(3).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(8).required(),
    confirmPassword: joi.ref('password')
})

module.exports = registerSchema

