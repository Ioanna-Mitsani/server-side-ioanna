const { emailExists } = require('./users')

const crypto = require('crypto')

const sendEmail = require('../../../services/nodemailer')
const {resetPasswordEmail} = require('../../../helpers/email/mailOptions') 


const forgotPassword = async (email, origin) => {
    const user = await emailExists(email)

    if(!user) throw {
        status: 400,
        statusMessage: 'Please enter a correct e-mail address'
    }

    if(origin){
        const resetToken = crypto.randomBytes(40).toString('hex')
        user.resetToken = resetToken;
        await user.save();

        const resetLink = `${origin}/auth/reset-password?token=${resetToken}`

        sendEmail(resetPasswordEmail(email, user.firstName, resetLink))
            .catch((err) => console.log(err))
    }

}

module.exports = forgotPassword