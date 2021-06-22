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

transactions.get('/:id', (req, res) => { 
    const { id } = req.params
    let idx = -1
    transactionBook.forEach((item, index) =>{ 
        if (item.id === id){
            idx = index
            return
        }
    })

    if (transactionBook[idx]) {
        res.status(200).json(transactionBook[idx])
    }else { 
        res.redirect('/not-found')
    }
})

transactions.post('/', (req, res) => {
    transactionBook.push(req.body)
    res.status(200).json(transactionBook[transactionBook.length - 1])
})

transactions.put('/:id', (req, res) => { 
    let { id } = req.params
    let idx = -1
    transactionBook.forEach((item, index) =>{ 
        if (item.id === id){
            idx = index
            return
        }
    })

    if (idx > transactionBook.length - 1 ){ 
        res.status(400).send('Bad Request.!!')
     }else{
        transactionBook.splice(idx, 1, req.body)
        res.status(200).json(transactionBook[idx])
     }   
})

transactions.delete('/:id', (req, res) => { 
    const  { id } = req.params
    let idArray = id.split(',')
    let deletedArray = []
    let idx = -1
    let deletedTransaction = {}

    if (idArray.length > 1 ){
        idArray.forEach( arrayElement =>{ 
        transactionBook.forEach((item, index) =>{ 
            if (item.id === arrayElement){
                idx = index
                deletedTransaction = transactionBook.splice(idx, 1)
                deletedArray.push(deletedTransaction)
                return
            }
        })
    })
    res.status(200).json(deletedArray)
    } else if (idArray.length === 1) { 
        transactionBook.forEach((item, index) =>{ 
            if (item.id === id){
                idx = index
                deletedTransaction = transactionBook.splice(idx, 1)
                res.status(200).json(deletedTransaction)
                return
            }
        })
    } else { 
        res.status(400).send('Bad Request.!!')
    }  
})

  module.exports = transactions