// Req.body validation error handling
const bodySchemaValidate = (req, next, schema) => {
    const { error, value } = schema.validate(req.body)
    if (error) {
        next({
            status: 400,
            statusMessage: error.details[0].message,
        })
    } else {
        req.body = value
        next();
    }
}

// Req.params validation error handling 
const paramsSchemaValidate = (req, next, schema) => {
    const { error, value } = schema.validate(req.params)
    if (error) {
        next({
            status: 400,
            statusMessage: error.details[0].message,
        })
    } else {
        req.params = value
        next();
    }
}

//Exports
module.exports = { bodySchemaValidate, paramsSchemaValidate}