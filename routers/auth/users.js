// Imports
const router = require('express').Router();

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const User = require('../../database/models/users')
const registerSchema = require('../../helpers/validation/register')
const loginSchema = require('../../helpers/validation/login')
const passwordSchema = require('../../helpers/validation/password')
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
        const token = req.query.token

        const user = await User.findOne({ verificationToken: token })

        if(user){
            user.verified = Date.now()
            await user.save()
            res.status(200).send('Verification successful, you can now login')
        }else{
            res.status(400).send('Verification failed due to an invalid token')
    }
    
})

router.post('/login', async (req,res) => {
    const user = await User.findOne({ email: req.body.email })
    if(!user) return res.status(400).send('Incorrect email')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Incorrect password')

    if(!user.verified) return res.status(400).send('Account is not verified!')

    try{
        const { error } = await loginSchema.validateAsync(req.body)
        if(error) return res.status(400).send(error.details[0].message)
        else{
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
            res.header('auth-token', token).send(token)
        }
    } catch (error){
        res.status(500).send(error)
    }
})


router.post('/forgot-password', async (req, res) => {
    const user = await User.findOne({ email: req.body.email})
    if(!user) return res.status(400).send('Incorrect email')
    else{
        const origin = req.header('Origin')
        const token = user.verificationToken
        sendEmail({
            from: '"Pharma App" nodejsauthmailer@gmail.com',
            to: req.body.email,
            subject: 'Pharma App | Password reset',
            text:`To reset your password, click the following link:${origin}/auth/reset-password?token=${token}`
        }).catch((err) => console.log(err))
        res.status(200).send('E-mail sent!')    
    }
})

router.post('/reset-password', async (req, res) => {
    const token = req.query.token

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

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