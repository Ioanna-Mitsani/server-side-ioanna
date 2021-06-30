const mongoose = require('mongoose')

const TermsSchema = new mongoose.Schema({
    key: { type: String, unique: true, required: true },
    label: { type: String, required: true },
    synonyms: { type: String },
    obo_id: { type: String },
    term_editor: { type: String },
    has_children: { type: Boolean }
})

TermsSchema.index({ key: 1 })

const model = mongoose.model('terms', TermsSchema)

module.exports = model