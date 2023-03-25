const express = require('express')
const mongoose=require('mongoose')
const { register, login,getusers } = require('../controller/user.controller')
const UserModel = require('../model/user.model')
const userRoute = express.Router()

userRoute.post("/register",register)
userRoute.get("/",getusers)
userRoute.post("/login",login)

module.exports=userRoute