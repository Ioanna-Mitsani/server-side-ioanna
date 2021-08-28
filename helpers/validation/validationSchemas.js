const joi = require('joi')

const loginSchema = joi.object({
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
})

const passwordSchema = joi.object({
    password: joi.string().min(6).required(),
    confirmPassword: joi.ref('password')
})

const registerSchema = joi.object({
    firstName: joi.string().min(3).required(),
    lastName: joi.string().min(3).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(8).required(),
    confirmPassword: joi.ref('password')
})

module.exports = {loginSchema, passwordSchema, registerSchema};