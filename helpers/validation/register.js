const joi = require('joi')
const UserSchema = require('../database/models/users')

// User input validation process
const registerSchema = joi.object({
    firstName: joi.string().min(3).required(),
    lastName: joi.string().min(3).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(8).required()
})

module.exports = registerSchema

