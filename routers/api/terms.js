// Imports
const router = require('express').Router();
const { getTerms } = require('../../database/actions/terms')

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
/* router.put('/updateTerm', (req, res) => {
 
}) */

module.exports = router;