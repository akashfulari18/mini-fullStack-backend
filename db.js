const mongoose = require("mongoose")
require('dotenv').config()

const sonnection = mongoose.connect(process.env.mongoURL)

module.exports=mongoose.connection