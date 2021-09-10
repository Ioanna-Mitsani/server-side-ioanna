// Imports
const joi = require('joi')
const { bodySchemaValidate, paramsSchemaValidate } = require('./schemaValidation')

const loginValidation = async (req, _, next) => {
    const schema = joi.object({
        email: joi.string().trim().min(6).required().email(),
        password: joi.string().trim().min(6).required(),  
})  
    bodySchemaValidate(req, next, schema)
}

/* Below are all the validation schemas for /auth routers */

const passwordSchema = async (req, _, next) => {
    const schema = joi.object({
    token: joi.string(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.ref('password')
})
    bodySchemaValidate(req, next, schema)
}

const registerSchema = (req, _, next) => {
    const schema = joi.object({
    firstName: joi.string().trim().min(3).required(),
    lastName: joi.string().trim().min(3).required(),
    email: joi.string().trim().min(6).required().email(),
    password: joi.string().trim().min(8).required(),
    confirmPassword: joi.ref('password')
})

    bodySchemaValidate(req, next, schema)
}

const updTermSchema = (req, _, next) => {
    const schema = joi.object({
        label: joi.string().trim().min(3).required(),
        synonyms: joi.string().trim().required(),
        term_editor: joi.string().trim(),
        has_children: joi.boolean()
    })
    bodySchemaValidate(req, next, schema)
}


const deleteSchema = (req, _, next) => {
    const schema = joi.object({
        id: joi.string().required()
    })
    paramsSchemaValidate(req, next, schema)
}

module.exports = {loginValidation, passwordSchema, registerSchema, updTermSchema, deleteSchema };