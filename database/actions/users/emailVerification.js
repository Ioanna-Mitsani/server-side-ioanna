//Imports
const {tokenExists} = require('./users')

// Async function for /auth/verify-email router
const emailVerification = async (token) => {
    const user = await tokenExists(token)

    if(!user){ throw {
        status: 400,
        statusMessage: 'Verification failed'
    }  // Exception
    }else{
        user.verified = Date.now()  // Verify user with timestamp
        await user.save()
    }
}


//Exports
module.exports = emailVerification
