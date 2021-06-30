const TermsSchema = require('../models/terms')

const insertTerms = async (terms) => {
    try {
        for (const term of terms) {
            await TermsSchema.create(term)    
        }
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = { insertTerms }