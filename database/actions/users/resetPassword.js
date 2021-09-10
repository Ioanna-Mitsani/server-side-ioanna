// Imports
const {passwordHashing, resetTokenExists } = require('./users')

// Async function for /auth/reset-password router
const resetPassword = async (token, password) => {
    const user = await resetTokenExists(token)

    if(!user) throw {
        status: 400,
        statusMessage: 'Error occured while reseting password'
    } // Exceptiom

    const hashedPassword = await passwordHashing(password)

    // Save new password hash to user document
    user.password = hashedPassword
    await user.save()
}

// Exports
module.exports = resetPassword