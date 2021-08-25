const User = require('../models/users')
const bcrypt = require('bcrypt')

// checks if user is registered to db - filter: email
const userExists = async (email) => {
    const emailExists = await User.findOne({ email: email }).exec();
    return emailExists;
}

// user registration
const registerUser = async (fname, lname, email, password) => {
    // Password hashing with bcrypt lib
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
        firstName: fname,
        lastName: lname,
        email: email,
        password: hashedPassword,
    })

    await user.save();

}

// user credentials' validation for login
const loginValidation = async (email, password) => {
    const user = await User.findOne({email: email}).exec();
    const passwordValidation = await bcrypt.compare(password, user.password)

    return { user, passwordValidation}
}

module.exports = { userExists, registerUser, loginValidation }