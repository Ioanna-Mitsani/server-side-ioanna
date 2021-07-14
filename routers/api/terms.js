const router = require('express').Router();
const { getTerms } = require('../../database/actions/terms')

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
/* router.put('/updateTerm', (req, res) => {
 
}) */

module.exports = router;