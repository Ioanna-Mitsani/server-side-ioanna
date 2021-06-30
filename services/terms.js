const express = require('express')
const axios = require('axios')


const initTerms = async ({ page=1, size=10 }) => {
    
    return await axios.get(process.env.API_ENDPOINT, {
        params: {
            page,
            size
        }
    })
            
}


module.exports = { initTerms }