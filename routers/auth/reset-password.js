// Imports
const router = require('express').Router();
const resetPassword = require('../../database/actions/users/resetPassword')
const { passwordSchema } = require('../../helpers/validation/validationSchemas')

// Router handler
const resetPass = (req, res, next) => {
    const { token, password, confirmPassword } = req.body
    console.log(token, password)

     resetPassword(token, password).
        then(() => {
            res.status(200).send({ message: 'Password has been reseted'})})
            .catch(next) 
}


router.post('/reset-password', passwordSchema , resetPass) // Validation Schema is included as a handler


module.exports = router