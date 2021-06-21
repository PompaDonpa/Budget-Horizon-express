const express = require("express")
const transactions = express.Router()
const transactionBook = require('../models/transactionBook')

const validateUrl = (req, res, next) => { 
    const http = 'http://'
    const https = 'https://'
    let fullUrl = req.protocol + '://' + req.get('host') + req.url
    
    if (fullUrl.substring(0,7) === http || fullUrl.substring(0,8) === https){ 
        return next()
    }else{ 
        res.status(400).send('Sorry not found, you forgot to start your url with http:// or https://')
    }  
 }

 transactions.use(validateUrl)

 transactions.get('/', (req, res) => { 
     res.status(200).json(transactionBook)
  })

 transactions.get('/:idx', (req, res) => { 
     const { idx } = req.params
     if (transactionBook[idx]) { 
        res.status(200).json(transactionBook[idx])
      }else { 
          res.redirect('not-found')
       }
 })

 transactions.post('/', (req, res) => {
     const idx = transactionBook.length
     const newTransaction = {...req.body, idx}
    transactionBook.push(newTransaction)
    res.status(200).json(transactionBook[transactionBook.length - 1])
})

transactions.delete('/:idx', (req, res) => { 
    const { idx } = req.params
    if (idx > transactionBook.length - 1 ){ 
        res.status(400).send('Bad Request.!!')
     }else{
        captainLogs.splice(idx, 1)
        res.status(303).json(transactionBook[idx])
     }
    
})





  module.exports = transactions