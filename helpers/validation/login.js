const joi = require('joi')

const loginSchema = joi.object({
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
})

module.exports = loginSchema;