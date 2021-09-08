const {tokenExists} = require('./users')

const emailVerification = async (token) => {

    const user = await tokenExists(token)

    if(!user){
        throw { status: 400, statusMessage: 'Verification failed'}
    }else{
        user.verified = Date.now()
        await user.save()
    }
}

module.exports = emailVerification
