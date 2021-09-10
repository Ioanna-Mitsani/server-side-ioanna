const joi = require('joi')
const { bodySchemaValidate, termSchemaValidate } = require('./schemaValidation')

const loginValidation = async (req, _, next) => {
    const schema = joi.object({
        email: joi.string().trim().min(6).required().email(),
        password: joi.string().trim().min(6).required(),  
})  
    bodySchemaValidate(req, next, schema)
}


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

const termSchema = (req, _, next) =>{
    const schema = joi.object({
        key: joi.string().required(),
        label: joi.string().required(),
        synonyms: joi.string(),
        obo_id: joi.string(),
        term_editor: joi.string(),
        has_children: joi.boolean()
    })

    termSchemaValidate(req, next, schema)
}
module.exports = {loginValidation, passwordSchema, registerSchema, termSchema};