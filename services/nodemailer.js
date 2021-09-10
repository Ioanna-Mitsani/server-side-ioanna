// nodemailer service - transporter object
const nodemailer = require('nodemailer');
const {emailConfig}  = require('../helpers/email/mailConfig')


const sendEmail = async ({from, to, subject, text}) => {
  const transporter = nodemailer.createTransport(emailConfig);
  await transporter.sendMail({from, to, subject, text})
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
