//Imports
const { emailExists } = require('./users')
const crypto = require('crypto')
const sendEmail = require('../../../services/nodemailer')
const {resetPasswordEmail} = require('../../../helpers/email/mailOptions') 

// Async function for /auth/forgot-password router
const forgotPassword = async (email, origin) => {
    const user = await emailExists(email)

    if(!user) throw {
        status: 400,
        statusMessage: 'Please enter a correct e-mail address'
    } //Exception


    // Check if origin header exists
    if(origin){
        // Create a resetToken for user and save document
        const resetToken = crypto.randomBytes(40).toString('hex')
        user.resetToken = resetToken;
        await user.save();

        // Link to reset password
        const resetLink = `${origin}/auth/reset-password?token=${resetToken}`

        // Send email with nodemailer, including the resetLink 
        sendEmail(resetPasswordEmail(email, user.firstName, resetLink))
            .catch((err) => console.log(err))
    }

}

//Exports
module.exports = forgotPassword