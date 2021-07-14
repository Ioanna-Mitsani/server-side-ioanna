const TermsSchema = require('../models/terms')

// insertTerms db action - used in app.js
const insertTerms = async (terms) => {
    try {
        return await TermsSchema.insertMany(terms)    
        
    } catch (error) {
        console.log(error)
    }
}

// checkTerms db action - used in app.js
const checkTerms = async () => {
    return await TermsSchema.estimatedDocumentCount();
}

// getTerms db action - Data pagination for the front-end
// See pharma-react swagger.yaml for more info
const getTerms = async (page, size) => {
    const pageInt = parseInt(page)
    const sizeInt = parseInt(size)

    
    const terms = await TermsSchema.find()
        .skip((pageInt-1)*sizeInt)
            .limit(sizeInt)
                .exec()
    
    const count = await TermsSchema.countDocuments();

    return {terms, count}
              
}

// Exports
module.exports = { insertTerms, checkTerms, getTerms }