const express = require('express')
const axios = require('axios')


const initTerms = async () => {
    
    return await axios.get(process.env.API_ENDPOINT)
            
}


module.exports = { initTerms }