const router = require('express').Router();
const { initTerms } = require('../../services/terms')


router.get('/getTerms', (req,res) => {
    const { page, size } = req.query
     

    initTerms({ page, size })
        .then(({data}) => {
            const terms = data._embedded.terms

            const termsData = terms.map(term => ({
                key: term.obo_id,
                label: term.label,
                synonyms: term.synonyms ? term.synonyms.join(', ') : '-',
                obo_id: term.obo_id,
                term_editor: term.annotation['term editor']
                 ? term.annotation['term editor'].join(', ')
                 : '-',
                has_children: term.has_children,
            }))
            console.log(termsData) /* */
        })
        .catch(err => res.status(400).send(err))
})

/* router.put('/updateTerm', (req, res) => {
 
}) */

module.exports = router;