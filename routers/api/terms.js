// Imports
const router = require('express').Router();
const { getTerms } = require('../../database/actions/terms')
// const TermsSchema = require('../../database/models/terms')
// const {termSchema} = require('../../helpers/validation/validationSchemas')
const { updateTerm, createTerm, deleteTerm } = require('../../database/actions/terms')
// getTerms router - GET
router.get('/getTerms', (req, res) => {
    const {from, size} = req.query;

    getTerms(from, size)
        .then((data) =>
                res.status(200).send(data)
            )
        .catch((msg) => {
            res.status(500).send(msg)
        })
})


const updateTerms = (req, res, next) => {
    const {id} = req.params
    const {label, synonyms, term_editor, has_children} = req.body.term

    updateTerm(id, label, synonyms, term_editor, has_children)
        .then((term) => {
            res.status(200).json(term)
        })
            .catch(next)
}

router.put('/term/:id', updateTerms)

const deleteTerms = (req, res, next) => {
    const {id} = req.params

    deleteTerm(id)
        .then(() => {
            res.status(200).send({ message: 'Term deleted successfully'})
        })
            .catch(next)
}

router.delete('/term/:id', deleteTerms)

const createTerms = (req, res, next) => {
    const {key, label, synonyms, term_editor, has_children} = req.body

    createTerm(key, label, synonyms, term_editor, has_children)
        .then((term) => {
            res.status(200).json(term)
        })
            .catch(next)
}

router.post('/createTerm', createTerms)


module.exports = router;