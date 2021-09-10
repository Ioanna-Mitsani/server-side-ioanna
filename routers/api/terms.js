// Imports
const router = require('express').Router();
const { getTerms } = require('../../database/actions/terms')
const { updateTerm, createTerm, deleteTerm } = require('../../database/actions/terms')
const { updTermSchema, deleteSchema } = require('../../helpers/validation/validationSchemas')
// getTerms router - GET
router.get('/getTerms', (req, res, next) => {
    const {from, size} = req.query;

    getTerms(from, size)
        .then((data) =>
                res.status(200).send(data)
            )
        .catch(next)
})

// Update terms router
const updateTerms = (req, res, next) => {
    const {id} = req.params
    const {label, synonyms, term_editor, has_children} = req.body.term

    updateTerm(id, label, synonyms, term_editor, has_children)
        .then((term) => {
            res.status(200).json(term)
        })
            .catch(next)
}

router.put('/term/:id', updTermSchema, updateTerms)


// Delete terms router
const deleteTerms = (req, res, next) => {
    const {id} = req.params

    deleteTerm(id)
        .then(() => {
            res.status(200).send({ message: 'Term deleted successfully'})
        })
            .catch(next)
}

router.delete('/term/:id', deleteSchema, deleteTerms)


// Create terms router
const createTerms = (req, res, next) => {
    const {key, label, synonyms, term_editor, has_children} = req.body.term

    createTerm(key, label, synonyms, term_editor, has_children)
        .then(() => {
            res.status(200).send({ message: 'Term has been created'})
        })
            .catch(next)
}

router.post('/createTerm', createTerms)


// Exports
module.exports = router;