// Imports
const mongoose = require('mongoose')

// DB schema & model for 'users'
const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verificationToken: { type: String },
    verified: { type: Date },
    role: { type: String }
})

UserSchema.index({ email: 1 })

const model = mongoose.model('users', UserSchema)

// Exports
module.exports = model