// Dependencies
const express = require("express")
const cors = require("cors")


// Configuration
const app = express()
const transactionsController = require('./controllers/transactionController.js')


// Middleware
app.use( (req, res, next) => { 
    console.log(`[ Middleware is running! ]`)
    next()
})
app.use(express.json())
app.use(cors())



// Routes 
app.get("/", (req, res) =>{ 
    res.send('Budget - Horizon')
 })

 app.use("/transactions", transactionsController)

 app.get("*", (req,res) => { 
     res.status(404).send('Page not found.')
  })


// Export
 module.exports = app