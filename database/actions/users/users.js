// Imports
const bcrypt = require('bcrypt')

const User = require('../../models/users')     // user model


const emailExists = async (email) => {
    const user = await User.findOne({email: email})

    return user;
}


const passwordHashing = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    return hashedPassword;
}

const tokenExists = async (token) => {
    const user = await User.findOne({ verificationToken: token})

    return user;
}

const resetTokenExists = async (token) => {
    const user = await User.findOne({ resetToken: token })

    return user
}











module.exports = { emailExists, passwordHashing, tokenExists, resetTokenExists }