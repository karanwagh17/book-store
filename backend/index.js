const express =require("express")
const connection = require("./config/db")
require("dotenv").config()
const cors = require("cors")
const BookRouter = require("./Routes/BookStore.routes")
const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/book",BookRouter)




app.listen(process.env.port || 8090,async()=>{
  try {
    await connection
    console.log("server is connect ")
    console.log("server is running 8080")
  } catch (error) {
    
  }
})