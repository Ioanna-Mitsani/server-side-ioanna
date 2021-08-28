// Imports
const router = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const User = require('../../database/models/users')     // user model
const {loginSchema, registerSchema, passwordSchema } = require('../../helpers/validation/validationSchemas')     // joi validator schemas for user inputs

const { registrationEmail, resetPasswordEmail } = require('../../helpers/email/mailOptions') // email content for nodemailer service

const sendEmail = require('../../services/nodemailer'); // transporter object - nodemailer

// Sign up router - authentication methods
router.post('/register', async (req, res) => {
    // check if user exists
    const userExists = await User.findOne({ email:req.body.email })
    
    if(userExists){
        res.status(400).send('User already exists!')
        return;
    }

    // password hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // generating a verification token
    const verificationToken = crypto.randomBytes(40).toString('hex')

    // creating a new user
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        verificationToken: verificationToken
    })

    // validation of user inputs
    try {
        const { error } = await registerSchema.validateAsync(req.body)

        if(error){
            res.status(400).send(error.details[0].message)
            return;
        } else {
            // user creation with role assignment
            const userCount = await User.countDocuments()
            if(userCount === 0){
                user.role = 'Admin'
            } else {
                user.role = 'User'
            }

            const saveUser = await user.save();
            

            const origin = req.header('Origin')
            const verificationLink = `${origin}/auth/verify-email?token=${verificationToken}`
            
            // sending account verification email
            sendEmail(registrationEmail(req.body.email, req.body.firstName, verificationLink))
                .catch((err) => console.log(err))
            res.status(200).send('User created!')
        }
    } catch (error) {
        res.status(500).send(console.log(error))
    }
})


// E-mail verification router
router.post('/verify-email', async (req, res) => {
        const token = req.body.token

        const user = await User.findOne({ verificationToken: token })

        if(user){
            // if user has the token sent, verifies the user and updates the document
            user.verified = Date.now()
            await user.save()
            res.status(200).send('Verification successful, you can now login')
        }else{
            res.status(400).send('Verification failed due to an invalid token')
    } 
    
})


// Login router
router.post('/login', async (req,res) => {
    // checks if user exists
    const user = await User.findOne({ email: req.body.email })
    if(!user) return res.status(400).send('Incorrect email')

    // checks if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Incorrect password')


    // login is rejected if the account is not verified
    if(!user.verified) return res.status(400).send('Account is not verified!')

    try{
        // validating user inputs
        const { error } = await loginSchema.validateAsync(req.body)
        if(error) return res.status(400).send(error.details[0].message)
        else{
            // user logs in and JWT is sent to headers
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
            res.header('auth-token', token).send(token)
        }
    } catch (error){
        res.status(500).send(error)
    }
})


// User password reset
router.post('/forgot-password', async (req, res) => {
    // checks if user exists
    const user = await User.findOne({ email: req.body.email})
    if(!user) return res.status(400).send('Incorrect email')
    else{
        // email sent with password reset link
        const origin = req.header('Origin')
        const verificationToken = user.verificationToken
        const resetLink = `${origin}/auth/reset-password?token=${verificationToken}`
        sendEmail(resetPasswordEmail(req.body.email, req.body.firstName, resetLink)).catch((err) => console.log(err))
        res.status(200).send('E-mail sent!')    
    }
})


// User sets a new password
router.post('/reset-password', async (req, res) => {
    const token = req.body.token

    // password hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // user input validation
    try {
        const { error } = await passwordSchema.validateAsync(req.body)

        if(error){
            res.status(400).send(error.details[0].message)
            return;
        } else {
            const user = await User.findOne({ verificationToken: token })

            user.password = hashedPassword
            await user.save()
        }
        res.status(200).send('Password has been reseted')
    } catch (error) {
        res.status(500).send(error)
    }
})
// Exports
module.exports = router;