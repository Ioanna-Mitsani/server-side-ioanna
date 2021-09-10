// Imports
const crypto = require('crypto')
const User = require('../../models/users')
const sendEmail = require('../../../services/nodemailer')
const { emailExists, passwordHashing } = require('./users')
const { registrationEmail } = require('../../../helpers/email/mailOptions')

// Async function for /auth/register router
const userRegistration = async (firstName, lastName, email, password, origin) => {
    
   const userExists = await emailExists(email)

    if(userExists){
        throw { status: 400, statusMessage: 'Email already exists!'}
    }   // Exception

    // password hashing
    const hashedPassword = await passwordHashing(password)
        
    // generating a verification token
    const verificationToken = crypto.randomBytes(40).toString('hex')

    // creating a new user
    const user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        verificationToken: verificationToken
    })

    // Checking how many users exist in users collection and assigns a role accordingly
    const userCount = await User.countDocuments()
    if(userCount === 0){
        user.role = 'Admin'
    } else {
        user.role = 'User'
    }

    await user.save();
            
    
    // If origin exists, then verification link is generated
    if(origin){
    const verificationLink = `${origin}/auth/verify-email?token=${verificationToken}`
            
        // sending account verification email
    sendEmail(registrationEmail(email, firstName, verificationLink))
        .catch((err) => console.log(err))
    }

}

// Exports
module.exports = userRegistration