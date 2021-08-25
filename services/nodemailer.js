// nodemailer service - transporter object
const nodemailer = require('nodemailer');
const {emailConfig}  = require('../helpers/email/mailConfig')

/* const mailOptions = {
  from: 'Node.js API <nodejsauthmailer@gmail.com>',
  to: 'ioanna.mitsani.72@gmail.com',
  Subject: 'Hello There!',
  text: 'Welcome to Pharma',
  html: '<body><p>Welcome to Pharma!</p></body>'
} */

const sendEmail = async () => {
  const transporter = nodemailer.createTransport(emailConfig);
  await transporter.sendMail({
  from: 'Node.js API <nodejsauthmailer@gmail.com>',
  to: '13-13099@saeinstitute.edu',
  Subject: 'Hello There!',
  text: 'Welcome to Pharma',
  html: '<body><p>Welcome to Pharma!</p></body>'
})
}
 
module.exports = sendEmail;
 
 
/*
**Important**
In my case, Gmail blocked my email for security issues. To make this work, I activated the less secured
app Gmail’s option:
Go to your Gmail account https://myaccount.google.com/
In the search input type less secure apps.
Select the first result and enable access to these apps.
*/
