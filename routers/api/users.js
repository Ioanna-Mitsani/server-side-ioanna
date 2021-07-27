// Imports
const router = require('express').Router();
const User = require('../../database/models/users')
const bcrypt = require('bcrypt')
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


// Exports
module.exports = router;