const express = require('express')
require("dotenv").config()
const app =express()
const connection = require("./db")
const productRoute = require('./routes/product.routes')
const userRoute = require('./routes/user.route')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use("/users",userRoute)
app.use("/products",productRoute)
app.listen(process.env.port,async()=>{
    
    try {
        await connection
        console.log("connected")

    } catch (err) {
        console.log("connection failed!")
    }
console.log(`Server is running at  ${process.env.port}`)
})