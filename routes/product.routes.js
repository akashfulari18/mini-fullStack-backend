const express = require('express')
const { addproduct, getproducts, deleteproduct ,updateproduct} = require('../controller/product.controller')
const authorizer = require('../middleware/Authorizer')
const jwt = require('jsonwebtoken')
const ProductModel = require('../model/product.model')
require('dotenv').config()

const productRoute = express.Router()

productRoute.post("/add",authorizer,async(req,res)=>{

    const token= req.headers.token

    const secret = process.env.privateKey
    let decoded = jwt.verify(token,secret)
    console.log("decoded",decoded)
    try {
        
        const product = new ProductModel(req.body)
        
        const result =await product.save()

        res.status(200).send({data:result})
    } catch (err) {
        res.status(400).send({err:err.message})
    }
    
})

productRoute.get("/",getproducts)
productRoute.delete("/:id",authorizer,deleteproduct)
productRoute.patch("/:id",authorizer,updateproduct)

module.exports=productRoute