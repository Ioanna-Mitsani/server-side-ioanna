const {passwordHashing, resetTokenExists } = require('./users')

const resetPassword = async (token, password) => {
    const user = await resetTokenExists(token)

    if(!user) throw {
        status: 400,
        statusMessage: 'Error occured while reseting password'
    }

    const hashedPassword = await passwordHashing(password)

    user.password = hashedPassword
    await user.save()
}

module.exports = resetPassword