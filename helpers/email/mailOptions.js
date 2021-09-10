// Nodemailer config for verification email
const registrationEmail = (email, firstName, verificationLink) => {
    const content = {
        from: '"Pharma App" nodejsauthmailer@gmail.com',
        to: email,
        subject: 'Pharma App | Verify your account',
        text: `Welcome to Pharma!     
        Hello ${firstName},
        Welcome to Pharma app! To verify your e-mail address, please click the following link:
        ${verificationLink}`,
        html: `<body>
               <h3>Welcome to Pharma!</h3>     
                <p>Hello ${firstName},</p>
                <p>Welcome to Pharma app! To verify your e-mail address, please click
                <a href="${verificationLink}">here</a></p>
                </body>`
    }
    return content;
}

// Nodemailer config for reset password email
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


// Exports
module.exports = {registrationEmail, resetPasswordEmail}