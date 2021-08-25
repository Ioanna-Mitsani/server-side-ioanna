// Imports
const router = require('express').Router();

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../../database/models/users')
const registerSchema = require('../../helpers/validation/register')
const loginSchema = require('../../helpers/validation/login')
const sendMail = require('../../services/nodemailer')
const { userExists, registerUser, loginValidation, userExists, registerUser } = require('../../database/actions/users')

// Sign up router - authentication methods
router.post('/register', async (req, res) => {
    const {firstName, lastName, email, password} = req.body

    const userExists = await userExists(req.body.email)

    if(userExists){
        res.status(400).send('User already exists!')
        return;
    }
    
    try {
        const { error } = await registerSchema.validateAsync(req.body)

        if(error){
            res.status(400).send(error.details[0].message)
            return;
        } else {
            const registerUser = await registerUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password)
            sendMail().catch(err => console.log(err))
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
            const token = jwt.sign({ _id: User._id }, process.env.TOKEN_SECRET, {expiresIn: '1h'});

            res.header('auth-token', token).send(token)
        }
    } catch(error) {
        res.status(500).send(error)
    }
})


// Exports
module.exports = router;