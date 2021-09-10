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


const updateTerm = async (id, label, synonyms, term_editor, has_children) => {
    const term = await TermsSchema.findOneAndUpdate({ key: id }, {
        label: label,
        synonyms: synonyms,
        term_editor: term_editor,
        has_children: has_children
    },
    {new: true})

    await term.save()
    if(!term) throw { status: 404, statusMessage: 'Term not found!'}

}

/* const createTerm = async (id, label, synonyms, obo_id, term_editor, has_children) => {
    const term = await TermsSchema.findOne({ key: id })

    if(term) throw { status: 400, statusMessage: 'Term with this ID is already registered'}

    const term = await new TermsSchema({

    })

 */
// Exports
module.exports = { insertTerms, checkTerms, getTerms, updateTerm }