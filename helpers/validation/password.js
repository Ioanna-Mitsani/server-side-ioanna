const joi = require('joi')

const passwordSchema = joi.object({
    password: joi.string().min(6).required(),
    confirmPassword: joi.ref('password')
})

module.exports = passwordSchema;