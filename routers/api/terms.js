const router = require('express').Router();
const { getTerms } = require('../../database/actions/terms')
// const TermsSchema = require('../../database/models/terms')
// const mongoose = require('mongoose')

/* router.get('/getterms', (req, res) => {
    const {p, s} = req.query;

    const page = parseInt(p)
    const size = parseInt(s)

    TermsSchema.find()
        .skip(page * size)
            .limit(size)
                .exec((err, doc) => {
                    if(err){
                        res.status(500).send(err)
                    }else{
                    res.status(200).send({doc})}
                })
}) */

router.get('/getterms', (req, res) => {
    const {page, size} = req.query;

    getTerms(page, size)
        .then((data) => {
            try{
                res.status(200).send(data)
            }catch{
                res.status(500).send('Error!')
            }  
        })
}) 
/* router.put('/updateTerm', (req, res) => {
 
}) */

module.exports = router;