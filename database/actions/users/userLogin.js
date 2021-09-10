const { emailExists } = require('./users')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const resetPassword = require('./resetPassword')

const userLogin = async (email, password) => {
    
    const user = await emailExists(email)

    const validPassword = await bcrypt.compare(password, user.password)
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)

    if(!user || !validPassword || !user.verified){
        throw {
        status: 400,
        statusMessage: 'Email or password are not correct'
    }} else {
        return token 
    }
}

module.exports = userLogin
   
           
 