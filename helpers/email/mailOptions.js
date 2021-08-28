const registrationEmail = (email, firstName, verificationLink) => {
    const content = {
        from: '"Pharma App" nodejsauthmailer@gmail.com',
        to: email,
        subject: 'Pharma App | Verify your account',
        text: `
                Welcome to Pharma!
                    
                Hello ${firstName},
                Welcome to Pharma app! To verify your e-mail address, please click the following link:
                ${verificationLink}`
            
    }
    return content;
}


const resetPasswordEmail = (email, firstName, verificationLink) => {
    const content = {
        from: '"Pharma App" nodejsauthmailer@gmail.com',
        to: email,
        subject: 'Pharma App | Password reset',
        text:`
            Hello, ${firstName},

            To reset your password for the Pharma App, click the following link:${verificationLink}
            
            If you did not forget your password, please ignore this e-mail.
            `
            
    }
    return content;
}

module.exports = {registrationEmail, resetPasswordEmail}