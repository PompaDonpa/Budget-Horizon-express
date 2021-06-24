// CONFIGURATION

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

const validatePost = (req, res, next) => { 
   
    const { transactionId, amount, from , flag, date, id } = req.body
    const repeatedId = transactionBook.filter(transaction => transaction.id === id)

    if (repeatedId.length){
        res.status(422).json({
            success: false,
            payload: "Bad ID, already in use.! Try again!",
        })
     }else if (transactionId === undefined ||
        amount === undefined ||
        from === undefined ||
        flag === undefined ||
        date === undefined ||
        id === undefined
    ){ 
        res.status(422).json({
            success: false,
            payload: "Bad Info.!!",
        })
    }else { 
        next()
    }
}


const validatePut = (req, res, next) =>{ 

    const { transactionId, amount, from , flag, date, id } = req.body

    if (transactionId === undefined ||
        amount === undefined ||
        from === undefined ||
        flag === undefined ||
        date === undefined ||
        id === undefined
    ){ 
        res.status(422).json({
            success: false,
            payload: "Bad Info.!!",
        })
    }else { 
    next()
    }
}


transactions.use(validateUrl)


// INDEX
transactions.get('/', (req, res) => { 
     res.status(200).json(transactionBook)
})


// SHOW
transactions.get('/:id', (req, res) => { 
    const { id } = req.params

    const isIndex = (transaction) => transaction.id === id
    const idx = transactionBook.findIndex(isIndex)

    if (transactionBook[idx]) {
        res.status(200).json(transactionBook[idx])
    }else { 
        res.redirect('/not-found')
    }
})


// CREATE
transactions.post('/', validatePost, (req, res) => {
    transactionBook.push(req.body)
    res.status(200).json(transactionBook[transactionBook.length - 1])
})


// UPDATE
transactions.put('/:id',validatePut, (req, res) => { 
    const { id } = req.params

    const isIndex = (transaction) => transaction.id === id
    const idx = transactionBook.findIndex(isIndex)

    if (idx > transactionBook.length - 1 || idx === -1){ 
        res.status(400).send('Bad Request.!!')
    }else{
        transactionBook.splice(idx, 1, req.body)
        res.status(200).json(transactionBook[idx])
    }   
})


// DELETE
transactions.delete('/:id', (req, res) => { 
    const  { id } = req.params
    const idArray = id.split(',')
    let deletedArray = []
    let deletedTransaction = {}

    const isUniqueIndex = (transaction) => transaction.id === idArray[0]
    const uniqueIdx = transactionBook.findIndex(isUniqueIndex)


    if (idArray.length > 1){

        idArray.forEach( idInArray =>{ 
            const isIndex = (transaction) => transaction.id === idInArray
            let idx = transactionBook.findIndex(isIndex)
            deletedTransaction = transactionBook.splice(idx, 1)
            deletedArray.push(...deletedTransaction)
        })
        res.status(200).json(deletedArray)
    }else if ((idArray.length === 1) && (uniqueIdx !== -1)) { 

        deletedTransaction = transactionBook.splice(uniqueIdx, 1)
        res.status(200).json(deletedTransaction)

    }else { 
        res.status(400).send('Bad Request.!!')
    }     
})

module.exports = transactions