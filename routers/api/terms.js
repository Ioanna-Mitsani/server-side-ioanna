// Imports
const router = require('express').Router();
const { getTerms } = require('../../database/actions/terms')
const TermsSchema = require('../../database/models/terms')

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

// * for future use
router.put('/term/:id', async (req, res) => {
    const id = req.params.id

    const term = await TermsSchema.findOne({ key: id })
    if(!term) return res.status(404).send('Term not found!')

    try{
    term.label = req.body.label
    term.synonyms = req.body.synonyms
    term.term_editor = req.body.term_editor
    term.has_children = req.body.has_children

    const updatedTerm = await term.save()
    res.status(200).send('Term was edited')
    } catch(error){
        res.status(400).send(error)
    }
    /* const term = await TermSchema.findOneAndUpdate({ key: id }, {
        label: req.body.label,
        synonyms: req.body.synonyms,
        term_editor: req.body.term_editor,
        has_children: req.body.has_children
    },
    { new: true }
    ) */


})

module.exports = router;