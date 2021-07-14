const TermsSchema = require('../models/terms')

const insertTerms = async (terms) => {
    try {
        return await TermsSchema.insertMany(terms)    
        
    } catch (error) {
        console.log(error)
    }
}


const checkTerms = async () => {
    return await TermsSchema.estimatedDocumentCount();
}

const getTerms = async (page, size) => {
    const pageInt = parseInt(page)
    const sizeInt = parseInt(size)

    
    return await TermsSchema.find().skip(pageInt*sizeInt).limit(sizeInt)
}


module.exports = { insertTerms, checkTerms, getTerms }