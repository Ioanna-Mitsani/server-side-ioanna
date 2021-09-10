// Imports
const { emailExists } = require('./users')
const bcrypt = require('bcrypt')
const resetPassword = require('./resetPassword')

// Async function for /auth/login router
const userLogin = async (email, password) => {
    
    const user = await emailExists(email)

    // Check if the password provided matches the hash password stored in user document
    const validPassword = await bcrypt.compare(password, user.password)
    

    // Check if user exists - password is valid - user is verified to login
    if(!user || !validPassword || !user.verified){
        throw {
        status: 401,
        statusMessage: 'Email or password are not correct'
    }}
    return {user}
}

//Exports
module.exports = userLogin
   
           
 