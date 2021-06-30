// Imports
const express = require('express');
const app = express();
const routes = require('./routers')
const cors = require('cors')
require ('./database/connection')

// Middleware
app.use(cors())
app.use('/', routes)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Test app listening on port ${process.env.SERVER_PORT}.`)
});