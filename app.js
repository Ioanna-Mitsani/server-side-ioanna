// Imports
const express = require('express');
const app = express();
const routes = require('./routers')
const cors = require('cors');
const { insertTerms, checkTerms } = require('./database/actions/terms');
const { initTerms } = require('./services/terms')
require ('./database/connection')

// Middleware
app.use(cors())
app.use('/', routes)

// Action checkTerms

checkTerms().
    then((count) => {

          if (count) return;
           
             initTerms()
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
            insertTerms(termsData)
          
    })
})
        .catch(err => res.status(400).send(err))
   

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Test app listening on port ${process.env.SERVER_PORT}.`)
});