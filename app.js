// Imports
const express = require('express');
const app = express();
const routes = require('./routers')

// Middleware
app.use(routes)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Test app listening on port ${process.env.SERVER_PORT}.`)
});