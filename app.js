// Dependencies
const express = require("express")
const cors = require("cors")


// Configuration
const app = express()
const transactionController = require('./controllers/transactionController.js')

// MiddleWare
app.use(cors())
app.use(express.json())



// Routes 
app.get("/", (req, res) =>{ 
    res.send('Budget - Horizon')
 })

 app.use("/transactions", transactionController)

 app.get("*", (req,res) => { 
     res.status(404).send('Page not found.')
  })


// Export
 module.exports = app