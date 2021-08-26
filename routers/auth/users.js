// Imports
const router = require('express').Router();

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const User = require('../../database/models/users')
const registerSchema = require('../../helpers/validation/register')
const loginSchema = require('../../helpers/validation/login')
const sendEmail = require('../../services/nodemailer');

// Sign up router - authentication methods
router.post('/register', async (req, res) => {
    const userExists = await User.findOne({ email:req.body.email })
    
    if(userExists){
        res.status(400).send('User already exists!')
        return;
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const verificationToken = crypto.randomBytes(40).toString('hex')

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        verificationToken: verificationToken
    })

    try {
        const { error } = await registerSchema.validateAsync(req.body)

        if(error){
            res.status(400).send(error.details[0].message)
            return;
        } else {
            const userCount = await User.countDocuments()
            if(userCount === 0){
                user.role = 'Admin'
            } else {
                user.role = 'User'
            }

            const saveUser = await user.save();

            
            const origin = req.header('Origin')
            const verificationLink = `${origin}/auth/verify-email?token=${verificationToken}`
            sendEmail({
                from: '"Pharma App" nodejsauthmailer@gmail.com',
                to: req.body.email,
                subject: 'Pharma App | Verify your account',
                text: `
                    Welcome to Pharma!
                    
                    Hello ${req.body.firstName},
                    Welcome to Pharma app! To verify your e-mail address, please click the following link:
                    ${verificationLink}`
            
            })
                .catch((err) => console.log(err))
            res.status(200).send('User created!')
        }
    } catch (error) {
        res.status(500).send(console.log(error))
    }
})

router.post('/verify-email', async (req, res) => {
    const params = new URLSearchParams()
    const token = params.get('token')

    const hasToken = await User.findOne({ verificationToken: token })

    if(hasToken){
        const user = await User.findOneAndUpdate({ verificationToken: token }, { verify: Date.now() }).exec()
        res.status(200).send('Your account has been verified')
    } else {
        res.status(400).send('Your account must be verified first. Please check your e-mails.')
    }

})

// Exports
module.exports = router;