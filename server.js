// Dependencies
const app =require("./app")


// Configuration
require("dotenv").config()
const PORT = process.env.PORT || 3001;


// Listener
app.listen(PORT, () => { 
    console.log("Budget-H Listening on PORT : ", PORT)
 })

