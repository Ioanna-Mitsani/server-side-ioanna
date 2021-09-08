

// User sets a new password
/* router.post('/reset-password', async (req, res) => {
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
            const user = await User.findOne({ resetToken: token })

            user.password = hashedPassword
            await user.save()
        }
        res.status(200).send('Password has been reseted')
    } catch (error) {
        res.status(500).send(error)
    }
})
// Exports */
