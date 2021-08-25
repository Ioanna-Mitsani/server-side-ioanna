const emailConfig = {
  emailFrom: 'nodejsauthmailer@gmail.com',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    }
};

module.exports = {emailConfig};