const express = require("express")
const transactions = express.Router()
const transactionBook = require('../models/transactionBook')

const validateUrl = (req, res, next) => { 
    const http = 'http://'
    const https = 'https://'
    let fullUrl = req.protocol + '://' + req.get('host') + req.url
    
    if (fullUrl.substring(0,7) === http || fullUrl.substring(0,8) === http){ 
        return next()
    }else{ 
        res.status(400).send('Sorry not found, you forgot to start your url with http:// or https://')
    }  
 }