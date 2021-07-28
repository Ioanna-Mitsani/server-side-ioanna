// Imports
const router = require('express').Router();
const User = require('../../database/models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const registerSchema = require('../../helpers/validation/register')
const loginSchema = require('../../helpers/validation/login')

// Sign up router - authentication methods
router.post('/register', async (req, res) => {
    const emailExists = await User.findOne({ email: req.body.email })

    if(emailExists){
        res.status(400).send('Email already exists.')
        return;
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
    })

    try {
        const { error } = await registerSchema.validateAsync(req.body)

        if(error){
            res.status(400).send(error.details[0].message)
            return;
        } else {
            const saveUser = await user.save();
            res.status(200).send('User created!')
        } 
    } catch(error) {
        res.status(500).send({error});
        }
    })


router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("User doesn't exist.")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send("Incorrect password")

    try{
        const { error } = await loginSchema.validateAsync(req.body)

        if(error) return res.status(400).send(error.details[0].message)
        else {
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)

            res.header('auth-token', token).send(token)        }
    } catch(error) {
        res.status(500).send(error)
    }
})


// Exports
module.exports = router;