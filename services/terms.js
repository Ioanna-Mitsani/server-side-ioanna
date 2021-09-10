// Imports
const express = require('express')
const axios = require('axios')

// Initialization service: Fetches data from 3rd party API
const initTerms = async () => {
    return await axios.get(process.env.API_ENDPOINT)      
}

// Exports
module.exports = { initTerms }