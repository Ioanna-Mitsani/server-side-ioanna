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

    return term
}

const createTerm = async (key, label, synonyms, term_editor, has_children) => {
    const term = await TermsSchema.findOne({ key: key })

    if(term) throw { status: 400, statusMessage: 'Term with this ID is already registered'}

    const newTerm = new TermsSchema({
        key: key,
        label: label,
        synonyms: synonyms,
        obo_id: key,
        term_editor: term_editor,
        has_children: has_children
    })
    return newTerm
}

const deleteTerm = async (id) => {
    const term = await TermsSchema.findOneAndDelete({ key: key })
    if(!term) throw { status: 404, statusMessage: 'Term not found!'}
}

// Exports
module.exports = { insertTerms, checkTerms, getTerms, updateTerm, createTerm, deleteTerm }