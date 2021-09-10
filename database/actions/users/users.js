// Imports
const bcrypt = require('bcrypt')
const User = require('../../models/users')     // user model

// Async function that checks if user exists by email
const emailExists = async (email) => {
    const user = await User.findOne({email: email})

    return user;
}


// Async function that creates password hash
const passwordHashing = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    return hashedPassword;
}


// Async function that checks if user exists by verificationToken (to verify account)
const tokenExists = async (token) => {
    const user = await User.findOne({ verificationToken: token})

    return user;
}


// Async function that checks if user exists by resetToken (to reset password)
const resetTokenExists = async (token) => {
    const user = await User.findOne({ resetToken: token })

    return user
}




// Exports 
module.exports = { emailExists, passwordHashing, tokenExists, resetTokenExists }