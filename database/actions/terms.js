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

    if(!terms || !count) throw{ status: 400, statusMessage: 'Error on receiving the terms'}
    return {terms, count}
              
}


// Async function for /api/term/:id to update term info
const updateTerm = async (id, label, synonyms, term_editor, has_children) => {
    const term = await TermsSchema.findOneAndUpdate({ key: id }, {
        label: label,
        synonyms: synonyms,
        term_editor: term_editor,
        has_children: has_children
    },
    {new: true})

    await term.save()
    if(!term) throw { status: 404, statusMessage: 'Term not found'}

    return term
}


// Async function for /api/createTerm router to create new term
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

    await newTerm.save()
}


// Async function for /api/term/:id router to delete terms
const deleteTerm = async (id) => {
    const term = await TermsSchema.findOneAndDelete({ key: id })
    if(!term) throw { status: 404, statusMessage: 'Term not found!'}
}

// Exports
module.exports = { insertTerms, checkTerms, getTerms, updateTerm, createTerm, deleteTerm }