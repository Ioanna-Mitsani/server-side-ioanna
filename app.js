// Imports
const express = require('express');
const app = express();
const routes = require('./routers')
const cors = require('cors');
const { insertTerms, checkTerms } = require('./database/actions/terms');
const { initTerms } = require('./services/terms')
require ('./database/connection')
const compression = require('compression')
const helmet = require('helmet')
const morgan = require('morgan')
const mongooseMorgan = require('mongoose-morgan')
// Middleware
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.json())
 
morgan.token('status', ( _, res) => {
    return res?.statusCode;
  });
morgan.token('statusMessage', ( _, res) => {
    return res?.statusMessage;
  });

app.use(mongooseMorgan({
    collection: 'error_logs',
    connectionString: process.env.MONGO_URI,
    },
   {
    skip: function (req, res) {
        return res.statusCode < 400;
    }
    },
    ':date - :method - :url - status: :status - error_message: :statusMessage - :res[content-length] - :response-time ms'
))

app.use('/', routes)

app.use((err, req, res, next) => {
    res.statusCode = err.status; // we set in the response error property our custom error
    res.statusMessage = err.statusMessage
    next(err); // with next() we allow the middleware to proceed to the next available action / middleware (in our case at the error sender middleware)
});
 
// error sender

app.use((err, req, res, next) => {
    res.status(err.status).send({message: err.statusMessage});
});



// Action checkTerms: Checks if third party API data are registered to our database.
// If not, it initializes the process of mapping & importing them

checkTerms().
    then((count) => {

          if (count) return;
           
             initTerms()
                .then(({data}) => {
                    const terms = data._embedded.terms

                    // !! Helper
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
    console.log(`Test app listening on port ${process.env.SERVER_PORT}`)
});