const TermsSchema = require('../models/terms')
const mongoose = require('mongoose')

const insertTerms = async (terms) => {
    try {
        for (const term of terms) {
            await TermsSchema.create(term)    
        }
        
    } catch (error) {
        console.log(error)
    }
}


const checkTerms = async () => {
    return await TermsSchema.estimatedDocumentCount();

    }

module.exports = { insertTerms, checkTerms }