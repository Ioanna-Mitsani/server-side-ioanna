const { emailExists } = require('./users')

const bcrypt = require('bcrypt')


const userLogin = async (email, password) => {
    
    const user = await emailExists(email)

    const validPassword = await bcrypt.compare(password, user.password)

    if(!user || !validPassword || !user.verified){
        throw {
        status: 400,
        statusMessage: 'Email or password are not correct'
    }}else{
       return user
    }
}

module.exports = userLogin
   
           
 